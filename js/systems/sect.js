// 宗门系统
export class SectSystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  // 加入宗门
  join(sectId) {
    const { SECTS, LOCATIONS } = window.gameData;
    const sect = SECTS.find(s => s.id === sectId);

    if (!sect) {
      return { success: false, text: '宗门不存在' };
    }

    // 检查是否已有宗门
    if (this.gameState.sect) {
      return { success: false, text: '你已经加入了宗门' };
    }

    // 检查玩家是否在宗门所在位置
    const currentLocation = this.gameState.playerLocation;
    if (currentLocation !== sect.location) {
      // 查找宗门位置名称
      const allLocations = Object.values(LOCATIONS || {}).flat();
      const locData = allLocations.find(l => l.id === sect.location);
      const locName = locData?.name || sect.location;
      return { success: false, text: `需要前往${locName}才能加入${sect.name}` };
    }

    this.gameState.sect = {
      id: sect.id,
      name: sect.name,
      contribution: 0,
      rank: '外门弟子'
    };

    return {
      success: true,
      text: `成功加入${sect.name}`,
      sect
    };
  }

  // 离开宗门
  leave() {
    if (!this.gameState.sect) {
      return { success: false, text: '你没有加入任何宗门' };
    }

    const oldSect = this.gameState.sect.name;
    this.gameState.sect = null;

    return {
      success: true,
      text: `已离开${oldSect}`
    };
  }

  // 增加贡献
  addContribution(amount) {
    if (!this.gameState.sect) {
      return { success: false, text: '你没有加入任何宗门' };
    }

    this.gameState.sect.contribution += amount;

    // 检查是否可以升级
    this.checkRankUp();

    return {
      success: true,
      text: `贡献+${amount}`,
      contribution: this.gameState.sect.contribution
    };
  }

  // 检查升级
  checkRankUp() {
    const contribution = this.gameState.sect.contribution;
    const ranks = [
      { name: '外门弟子', required: 0 },
      { name: '内门弟子', required: 100 },
      { name: '核心弟子', required: 500 },
      { name: '长老', required: 2000 },
      { name: '太上长老', required: 10000 }
    ];

    for (let i = ranks.length - 1; i >= 0; i--) {
      if (contribution >= ranks[i].required) {
        if (this.gameState.sect.rank !== ranks[i].name) {
          this.gameState.sect.rank = ranks[i].name;
          return ranks[i].name;
        }
        break;
      }
    }

    return null;
  }

  // 获取宗门任务
  getSectQuests() {
    if (!this.gameState.sect) {
      return [];
    }

    const { SECTS } = window.gameData;
    const sect = SECTS.find(s => s.id === this.gameState.sect.id);

    // 宗门任务
    const quests = [
      { id: 'sect_hunt', name: '猎杀妖兽', description: '猎杀指定数量的妖兽', reward: { contribution: 20, exp: 50 } },
      { id: 'sect_gather', name: '采集灵草', description: '采集指定数量的灵草', reward: { contribution: 15, exp: 30 } },
      { id: 'sect_patrol', name: '巡逻宗门', description: '巡逻宗门周边区域', reward: { contribution: 10, exp: 20 } },
      { id: 'sect_duel', name: '同门切磋', description: '与同门弟子切磋', reward: { contribution: 25, exp: 40 } }
    ];

    return quests;
  }

  // 完成宗门任务
  completeSectQuest(questId) {
    if (!this.gameState.sect) {
      return { success: false, text: '你没有加入任何宗门' };
    }

    const quests = this.getSectQuests();
    const quest = quests.find(q => q.id === questId);

    if (!quest) {
      return { success: false, text: '任务不存在' };
    }

    // 发放奖励（钳制修为）
    this.addContribution(quest.reward.contribution);
    const maxExp = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.maxExp || 999999;
    this.gameState.player.exp = Math.min(this.gameState.player.exp + quest.reward.exp, maxExp);

    return {
      success: true,
      text: `完成${quest.name}，贡献+${quest.reward.contribution}，修为+${quest.reward.exp}`,
      reward: quest.reward
    };
  }

  // 兑换宗门物品
  exchange(itemId) {
    if (!this.gameState.sect) {
      return { success: false, text: '你没有加入任何宗门' };
    }

    // 宗门商店物品
    const shopItems = [
      { id: 'herb', name: '灵草', cost: 5 },
      { id: 'purple_fungus', name: '紫芝', cost: 20 },
      { id: 'beast_core', name: '兽丹', cost: 30 },
      { id: 'iron', name: '玄铁', cost: 15 },
      { id: 'heal_pill', name: '金创药', cost: 10 },
      { id: 'mp_pill', name: '回灵丹', cost: 25 }
    ];

    const item = shopItems.find(i => i.id === itemId);

    if (!item) {
      return { success: false, text: '物品不存在' };
    }

    if (this.gameState.sect.contribution < item.cost) {
      return { success: false, text: '贡献不足' };
    }

    // 消耗贡献
    this.gameState.sect.contribution -= item.cost;

    // 添加物品
    const existing = this.gameState.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count++;
    } else {
      this.gameState.inventory.push({
        id: itemId,
        name: item.name,
        type: 'material',
        count: 1
      });
    }

    return {
      success: true,
      text: `兑换${item.name}，贡献-${item.cost}`,
      contribution: this.gameState.sect.contribution
    };
  }

  // 获取宗门信息
  getInfo() {
    if (!this.gameState.sect) {
      return null;
    }

    const { SECTS } = window.gameData;
    const sect = SECTS.find(s => s.id === this.gameState.sect.id);

    return {
      ...this.gameState.sect,
      type: sect?.type,
      specialty: sect?.specialty
    };
  }
}
