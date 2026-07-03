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

    // 检查是否可以升级并返回新Rank
    const newRank = this.checkRankUp();

    return {
      success: true,
      text: `贡献+${amount}`,
      contribution: this.gameState.sect.contribution,
      rank: newRank || undefined
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

  // 获取宗门任务（每日随机刷新2~4个）
  getSectQuests() {
    if (!this.gameState.sect) return [];
    
    const player = this.gameState.player;
    const realmIdx = player.realmIdx || 0;
    
    const allQuests = [
      { id: 'sect_patrol', name: '巡逻宗门', description: '消耗3天时间巡逻宗门周边区域', type: 'time', cost: { days: 3 }, reward: { contribution: 8, exp: 15 } },
      { id: 'sect_hunt', name: '猎杀妖兽', description: '击败2只妖兽并提交兽丹', type: 'combat', cost: { item: 'beast_core', count: 1 }, reward: { contribution: 25, exp: 60 } },
      { id: 'sect_gather', name: '采集灵草', description: '收集5株灵草贡献宗门', type: 'gather', cost: { item: 'herb', count: 5 }, reward: { contribution: 18, exp: 35 } },
      { id: 'sect_duel', name: '同门切磋', description: '与同门切磋，先半血者败。胜+30贡献，败+15贡献', type: 'duel', cost: { days: 1 }, reward: { contribution: 30, exp: 50 } },
      { id: 'sect_offering', name: '献宝', description: '上交紫芝/玄铁等珍贵材料', type: 'offering', cost: { item: 'purple_fungus', count: 1 }, reward: { contribution: 35, exp: 20 } },
      { id: 'sect_iron', name: '矿脉采集', description: '收集3块玄铁', type: 'gather', cost: { item: 'iron', count: 3 }, reward: { contribution: 30, exp: 25 } },
      { id: 'sect_elite_hunt', name: '精英讨伐', description: '击败精英妖兽', type: 'elite_combat', cost: {}, reward: { contribution: 40, exp: 100 }, minRealm: 2 },
    ];
    
    // 过滤境界不足的任务
    const available = allQuests.filter(q => !q.minRealm || realmIdx >= q.minRealm);
    
    // 随机选2~4个
    const count = Math.min(2 + Math.floor(Math.random() * 3), available.length);
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // 接受宗门任务
  acceptSectQuest(questId) {
    if (!this.gameState.sect) return { success: false, text: '未加入宗门' };
    if (this.gameState.sect.activeQuest) return { success: false, text: '已有进行中的任务' };
    
    const quests = this.getSectQuests();
    const quest = quests.find(q => q.id === questId);
    if (!quest) return { success: false, text: '任务不存在' };
    
    this.gameState.sect.activeQuest = { id: quest.id, name: quest.name, type: quest.type, cost: quest.cost, reward: quest.reward, progress: 0 };
    return { success: true, text: `接受任务：${quest.name}`, quest };
  }

  // 完成宗门任务
  completeSectQuest() {
    if (!this.gameState.sect?.activeQuest) {
      return { success: false, text: '没有进行中的任务' };
    }
    
    const quest = this.gameState.sect.activeQuest;
    const cost = quest.cost;
    const player = this.gameState.player;
    
    // 根据类型检查条件
    switch (quest.type) {
      case 'time':
        // 巡逻：纯时间消耗，由调用方处理
        break;
      case 'duel':
        // 切磋由前端独立的切磋系统处理，不走completeSectQuest
        return { success: false, text: '请通过切磋界面完成任务' };
      case 'gather':
      case 'offering':
        // 献宝/采集：检查背包物品
        const invItem = this.gameState.inventory.find(i => i.id === cost.item);
        if (!invItem || invItem.count < cost.count) {
          return { success: false, text: `背包中${cost.item}不足${cost.count}个` };
        }
        // 扣除物品
        invItem.count -= cost.count;
        if (invItem.count <= 0) {
          const idx = this.gameState.inventory.indexOf(invItem);
          this.gameState.inventory.splice(idx, 1);
        }
        break;
      case 'combat':
      case 'elite_combat':
        // 战斗类：由前端探索触发完成
        if (quest.progress < 2) {
          return { success: false, text: `击杀进度 ${quest.progress}/2，继续探索宗门区域` };
        }
        break;
      case 'exp_sacrifice':
        // 传道：扣修为
        if (player.exp < cost.exp) {
          return { success: false, text: `修为不足${cost.exp}` };
        }
        player.exp -= cost.exp;
        break;
    }
    
    // 发放奖励
    const addResult = this.addContribution(quest.reward.contribution);
    if (quest.reward.exp > 0) {
      const maxExp = window.gameData?.REALMS?.[player.realmIdx]?.maxExp || 999999;
      player.exp = Math.min(player.exp + quest.reward.exp, maxExp);
    }
    
    const rewardText = quest.reward.contribution > 0 ? `贡献+${quest.reward.contribution}` : '';
    const expText = quest.reward.exp > 0 ? `，修为+${quest.reward.exp}` : '';
    
    // 清除活跃任务
    this.gameState.sect.activeQuest = null;
    
    return {
      success: true,
      text: `完成任务：${quest.name}！${rewardText}${expText}`,
      rank: addResult.rank,
      reward: quest.reward
    };
  }

  // 标记战斗任务进度
  advanceCombatQuest() {
    if (!this.gameState.sect?.activeQuest) return;
    const quest = this.gameState.sect.activeQuest;
    if (quest.type === 'combat' || quest.type === 'elite_combat') {
      quest.progress++;
    }
  }

  // 开始切磋（生成对手）
  startDuel() {
    const player = this.gameState.player;
    const realmIdx = player.realmIdx || 0;
    const { REALMS } = window.gameData;
    const realm = REALMS[realmIdx] || {};
    
    // 根据境界生成同门弟子
    const hpMult = 0.5 + Math.random() * 0.3; // 50~80%玩家血量
    const atkMult = 0.4 + Math.random() * 0.3; // 40~70%玩家攻击
    const defMult = 0.5 + Math.random() * 0.3; // 50~80%玩家防御
    
    const names = ['赵师兄', '钱师弟', '孙师兄', '李师姐', '周师兄', '吴师妹', '郑师弟', '王师兄', '冯师姐', '陈师弟'];
    const name = names[Math.floor(Math.random() * names.length)];
    
    // 估算玩家ATK
    const baseAtk = (player.atk || 10) + (realmIdx * 5);
    const baseDef = (player.def || 5) + (realmIdx * 2);
    const baseHp = player.maxHp || 100;
    
    const opponent = {
      name: name,
      maxHp: Math.floor(baseHp * hpMult),
      hp: Math.floor(baseHp * hpMult),
      atk: Math.floor(baseAtk * atkMult),
      def: Math.floor(baseDef * defMult),
      realm: realm.name || '未知'
    };
    
    return opponent;
  }

  // 执行一轮切磋
  executeDuelRound(attackerHp, attackerMaxHp, attackerAtk, attackerDef, 
                    defenderHp, defenderMaxHp, defenderAtk, defenderDef) {
    // 攻击方攻击
    const dmgRaw = Math.max(1, attackerAtk - Math.floor(defenderDef * 0.5));
    const dmgVar = Math.floor(dmgRaw * (0.8 + Math.random() * 0.4));
    defenderHp = Math.max(0, defenderHp - dmgVar);
    
    const log = `造成${dmgVar}点伤害！（${defenderHp}/${defenderMaxHp}）`;
    
    // 检查是否低于一半
    const defenderLost = defenderHp <= Math.floor(defenderMaxHp / 2);
    
    return { 
      defenderHp, 
      attackerHp,
      log, 
      defenderLost,
      roundEnd: defenderLost
    };
  }

  // 兑换宗门物品
  exchange(itemId) {
    if (!this.gameState.sect) {
      return { success: false, text: '你没有加入任何宗门' };
    }

    // 宗门商店物品（价格已翻倍，需通过做任务积累贡献）
    const shopItems = [
      { id: 'herb', name: '灵草', cost: 15 },
      { id: 'purple_fungus', name: '紫芝', cost: 60 },
      { id: 'beast_core', name: '兽丹', cost: 50 },
      { id: 'iron', name: '玄铁', cost: 40 },
      { id: 'heal_pill', name: '金创药', cost: 25 },
      { id: 'mp_pill', name: '回灵丹', cost: 70 }
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

  // 获取宗门专属功法列表
  getSectSkills() {
    if (!this.gameState.sect) return [];
    
    const { SECTS, SKILLS } = window.gameData;
    const sectData = SECTS.find(s => s.id === this.gameState.sect.id);
    if (!sectData || !sectData.skills) return [];
    
    // 从所有功法中匹配宗门功法ID
    const allSkills = [...(SKILLS.main || []), ...(SKILLS.sub || []), ...(SKILLS.combat || [])];
    return sectData.skills.map(skillId => {
      const skill = allSkills.find(s => s.id === skillId);
      return skill || { id: skillId, name: skillId, grade: '?', desc: '功法数据缺失', source: sectData.name };
    });
  }

  // 学习宗门功法
  learnSectSkill(skillId) {
    if (!this.gameState.sect) {
      return { success: false, text: '你没有加入任何宗门' };
    }
    
    const skills = this.getSectSkills();
    const skill = skills.find(s => s.id === skillId);
    if (!skill) {
      return { success: false, text: '该功法不属于你的宗门' };
    }
    
    // 检查是否已学习（检查所有数组）
    if (!this.gameState.skills) this.gameState.skills = { main: null, sub: [], combat: [] };
    if (this.gameState.skills.main?.id === skillId) {
      return { success: false, text: `你已装备了${skill.name}` };
    }
    if (this.gameState.skills.sub?.some(s => s.id === skillId)) {
      return { success: false, text: `你已经学习了${skill.name}` };
    }
    if (this.gameState.skills.combat?.some(s => s.id === skillId)) {
      return { success: false, text: `你已经学习了${skill.name}` };
    }
    
    // 消耗贡献（按品阶定价）
    const gradeCost = { '黄级': 80, '玄级': 200, '地级': 500, '天级': 1500, '灵级': 3000, '仙级': 5000, '神级': 10000 };
    const cost = gradeCost[skill.grade] || 80;
    if (this.gameState.sect.contribution < cost) {
      return { success: false, text: `宗门贡献不足（需${cost}，当前${this.gameState.sect.contribution}）` };
    }
    
    this.gameState.sect.contribution -= cost;
    
    // 根据功法类型放入对应数组
    const { SKILLS } = window.gameData;
    const isMain = SKILLS.main?.some(s => s.id === skillId);
    const isSub = SKILLS.sub?.some(s => s.id === skillId);
    
    let skillType;
    if (isMain) {
      // 主修功法：设为当前装备（如果还没装备的话）
      if (!this.gameState.skills.main) {
        this.gameState.skills.main = { id: skillId, name: skill.name, grade: skill.grade, level: 1, exp: 0 };
      } else {
        this.gameState.skills.sub.push({ id: skillId, name: skill.name, grade: skill.grade, level: 1, exp: 0 });
      }
      skillType = '主修';
    } else if (isSub) {
      this.gameState.skills.sub.push({ id: skillId, name: skill.name, grade: skill.grade, level: 1, exp: 0 });
      skillType = '辅修';
    } else {
      this.gameState.skills.combat = this.gameState.skills.combat || [];
      this.gameState.skills.combat.push({ id: skillId, name: skill.name, grade: skill.grade, level: 1, exp: 0 });
      skillType = '招式';
    }
    
    return { 
      success: true, 
      text: `成功学习${skillType}功法：${skill.name}！（消耗${cost}贡献）`,
      skill,
      skillType
    };
  }
}
