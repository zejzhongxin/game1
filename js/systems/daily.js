// 日常任务系统 - 完整版（GDD一比一还原）
export class DailySystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 日常任务数据（GDD原文）
    this.dailyQuests = {
      // 天南城·日常（练气~筑基推荐）
      tiancheng: [
        {
          id: 'hunt_wolf',
          name: '猎妖',
          description: '猎杀黑风狼x5',
          target: 'kill',
          targetId: '黑风狼',
          targetCount: 5,
          currentCount: 0,
          rewards: { stone: 80, contribution: 10 },
          minRealm: 1, // 练气
          maxRealm: 2  // 筑基
        },
        {
          id: 'gather_herb',
          name: '采集',
          description: '采集灵草x10',
          target: 'gather',
          targetId: 'herb',
          targetCount: 10,
          currentCount: 0,
          rewards: { stone: 50, items: [{ id: 'herb', count: 3 }] },
          minRealm: 1,
          maxRealm: 2
        },
        {
          id: 'deliver_letter',
          name: '送信',
          description: '天南城到黄枫谷送信',
          target: 'travel',
          targetLocation: 'huangfeng',
          currentCount: 0,
          rewards: { stone: 30, exp: 50 },
          minRealm: 1,
          maxRealm: 2
        }
      ],

      // 天星城·日常（金丹~元婴推荐）
      tianxing: [
        {
          id: 'hunt_shark',
          name: '猎妖',
          description: '猎杀锯齿鲨x3',
          target: 'kill',
          targetId: '锯齿鲨',
          targetCount: 3,
          currentCount: 0,
          rewards: { crystal: 2, stone: 200 },
          minRealm: 3, // 金丹
          maxRealm: 4  // 元婴
        },
        {
          id: 'gather_purple',
          name: '采集',
          description: '采集紫芝x5',
          target: 'gather',
          targetId: 'purple_fungus',
          targetCount: 5,
          currentCount: 0,
          rewards: { stone: 150, contribution: 20 },
          minRealm: 3,
          maxRealm: 4
        },
        {
          id: 'escort_ship',
          name: '护送',
          description: '商船到魁星岛',
          target: 'travel',
          targetLocation: 'kuixing',
          currentCount: 0,
          rewards: { stone: 300, items: [{ id: 'herb', count: 5, random: true }] },
          minRealm: 3,
          maxRealm: 4
        }
      ],

      // 大晋皇都·日常（元婴~化神推荐）
      dajin_city: [
        {
          id: 'hunt_wolf2',
          name: '猎妖',
          description: '猎杀疾风狼x3',
          target: 'kill',
          targetId: '疾风狼',
          targetCount: 3,
          currentCount: 0,
          rewards: { stone: 500, items: [{ id: 'demon_core', count: 1 }] },
          minRealm: 4, // 元婴
          maxRealm: 5  // 化神
        },
        {
          id: 'explore_ruins',
          name: '探索',
          description: '探索古战场遗迹外围',
          target: 'explore',
          targetLocation: 'guzhan',
          currentCount: 0,
          rewards: { stone: 400, items: [{ id: 'ancient_fungus', count: 1, chance: 0.3 }] },
          minRealm: 4,
          maxRealm: 5
        },
        {
          id: 'bounty_rebel',
          name: '悬赏',
          description: '击杀叛修',
          target: 'kill',
          targetId: '叛修',
          targetCount: 1,
          currentCount: 0,
          rewards: { stone: 800, fame: 10 },
          minRealm: 4,
          maxRealm: 5
        }
      ],

      // 灵界·天渊城·日常（炼虚~合体推荐）
      tianyuan: [
        {
          id: 'hunt_vanguard',
          name: '猎妖',
          description: '猎杀异族先锋x3',
          target: 'kill',
          targetId: '异族先锋',
          targetCount: 3,
          currentCount: 0,
          rewards: { crystal: 10, contribution: 50 },
          minRealm: 6, // 炼虚
          maxRealm: 7  // 合体
        },
        {
          id: 'patrol_wall',
          name: '巡逻',
          description: '城墙防守巡逻',
          target: 'patrol',
          targetCount: 1,
          currentCount: 0,
          rewards: { crystal: 8, contribution: 30 },
          minRealm: 6,
          maxRealm: 7
        },
        {
          id: 'scout_enemy',
          name: '侦察',
          description: '侦察异族动向',
          target: 'scout',
          targetCount: 1,
          currentCount: 0,
          rewards: { crystal: 15, items: [{ id: 'intelligence', count: 1 }] },
          minRealm: 6,
          maxRealm: 7
        }
      ],

      // 仙界·天庭城·日常（真仙~金仙推荐）
      tianting: [
        {
          id: 'hunt_beast',
          name: '猎妖',
          description: '猎杀金源兽x1',
          target: 'kill',
          targetId: '金源兽',
          targetCount: 1,
          currentCount: 0,
          rewards: { immortal_stone: 30, items: [{ id: 'immortal_core', count: 1 }] },
          minRealm: 10, // 真仙
          maxRealm: 11  // 金仙
        },
        {
          id: 'gather_herb2',
          name: '采集',
          description: '采集仙灵草x10',
          target: 'gather',
          targetId: 'immortal_herb',
          targetCount: 10,
          currentCount: 0,
          rewards: { immortal_stone: 20 },
          minRealm: 10,
          maxRealm: 11
        },
        {
          id: 'guard_duty',
          name: '巡值',
          description: '天庭戍卫',
          target: 'patrol',
          targetCount: 1,
          currentCount: 0,
          rewards: { immortal_stone: 50, contribution: 30 },
          minRealm: 10,
          maxRealm: 11
        }
      ],

      // 青云山·日常（凡人~练气推荐）
      qingyun: [
        {
          id: 'hunt_rat',
          name: '除害',
          description: '猎杀灵鼠x3',
          target: 'kill',
          targetId: '灵鼠',
          targetCount: 3,
          currentCount: 0,
          rewards: { stone: 30, exp: 20 },
          minRealm: 0, // 凡人
          maxRealm: 1  // 练气
        },
        {
          id: 'gather_firewood',
          name: '采集',
          description: '采集灵草x5',
          target: 'gather',
          targetId: 'herb',
          targetCount: 5,
          currentCount: 0,
          rewards: { stone: 20, items: [{ id: 'herb', count: 2 }] },
          minRealm: 0,
          maxRealm: 1
        }
      ],

      // 天渊城·日常（炼虚~合体推荐）
      tianyuan_city: [
        {
          id: 'hunt_demon',
          name: '猎魔',
          description: '猎杀妖族x3',
          target: 'kill',
          targetId: '妖族',
          targetCount: 3,
          currentCount: 0,
          rewards: { crystal: 5, exp: 500 },
          minRealm: 6, // 炼虚
          maxRealm: 7  // 合体
        },
        {
          id: 'escort_convoy',
          name: '护送',
          description: '护送商队到万妖山脉',
          target: 'travel',
          targetLocation: 'wanyao',
          currentCount: 0,
          rewards: { crystal: 8, items: [{ id: 'rare_herb', count: 3 }] },
          minRealm: 6,
          maxRealm: 7
        },
        {
          id: 'gather_spirit_ore',
          name: '采集',
          description: '采集灵矿x10',
          target: 'gather',
          targetId: 'spirit_ore',
          targetCount: 10,
          currentCount: 0,
          rewards: { crystal: 4 },
          minRealm: 6,
          maxRealm: 7
        }
      ],

      // 圣岛·日常（大乘推荐）
      shengdao: [
        {
          id: 'hunt_ancient_beast',
          name: '猎杀古兽',
          description: '猎杀远古妖兽x1',
          target: 'kill',
          targetId: '远古妖兽',
          targetCount: 1,
          currentCount: 0,
          rewards: { crystal: 15, items: [{ id: 'ancient_core', count: 1 }] },
          minRealm: 8, // 大乘
          maxRealm: 9  // 渡劫
        },
        {
          id: 'gather_heavenly_herb',
          name: '采集天材',
          description: '采集仙灵草x5',
          target: 'gather',
          targetId: 'immortal_herb',
          targetCount: 5,
          currentCount: 0,
          rewards: { crystal: 10 },
          minRealm: 8,
          maxRealm: 9
        }
      ]
    };

    // 当前接受的日常任务
    this.activeQuests = [];
    // 每日完成计数（每天最多完成3个）
    this.dailyCompleted = 0;
    this.maxDailyCompleted = 3;
    // 上次刷新时间（-1表示首次加载）
    this.lastRefreshDay = -1;
  }

  // === 刷新日常任务 ===
  refreshDailyQuests() {
    const currentDay = Math.floor((this.gameState.gameTime.totalDays || 0) / 360);

    // 首次进入或新的一天时刷新任务
    if (this.lastRefreshDay === -1 || currentDay > this.lastRefreshDay) {
      this.activeQuests = [];
      this.dailyCompleted = 0;
      this.lastRefreshDay = currentDay;

      // 根据玩家所在位置和境界生成可用任务
      this.generateAvailableQuests();
    }
  }

  // === 生成当前可用任务 ===
  generateAvailableQuests() {
    const location = this.gameState.currentLocation;
    const realmIdx = this.gameState.player.realmIdx;

    // 从对应城市获取任务（也支持附近城市的任务）
    let quests = this.dailyQuests[location] || [];

    // 如果当前地点没有日常任务，显示所有可用任务
    if (quests.length === 0) {
      quests = Object.values(this.dailyQuests).flat();
    }

    this.activeQuests = quests
      .filter(q => realmIdx >= q.minRealm && realmIdx <= q.maxRealm)
      .map(q => ({
        ...q,
        currentCount: 0,
        completed: false,
        accepted: false
      }));
  }

  // === 获取可用任务列表 ===
  getAvailableQuests() {
    this.refreshDailyQuests();
    return this.activeQuests.filter(q => !q.completed);
  }

  // === 接受任务 ===
  acceptQuest(questId) {
    if (this.dailyCompleted >= this.maxDailyCompleted) {
      return { success: false, text: '今日已完成3个日常任务，明天再来！' };
    }

    const quest = this.activeQuests.find(q => q.id === questId);
    if (!quest) {
      return { success: false, text: '任务不存在' };
    }

    if (quest.accepted) {
      return { success: false, text: '任务已接受' };
    }

    if (quest.completed) {
      return { success: false, text: '任务已完成' };
    }

    quest.accepted = true;
    return { success: true, text: `接取任务：${quest.name} - ${quest.description}` };
  }

  // === 更新任务进度 ===
  updateQuestProgress(type, targetId, count = 1) {
    const results = [];

    this.activeQuests.forEach(quest => {
      if (!quest.accepted || quest.completed) return;

      let progressMade = false;

      switch (quest.target) {
        case 'kill':
          if (quest.targetId === targetId) {
            quest.currentCount += count;
            progressMade = true;
          }
          break;
        case 'gather':
          if (quest.targetId === targetId) {
            quest.currentCount += count;
            progressMade = true;
          }
          break;
        case 'explore':
          if (quest.targetLocation === targetId) {
            quest.currentCount += count;
            progressMade = true;
          }
          break;
        case 'travel':
        case 'patrol':
        case 'scout':
          quest.currentCount += count;
          progressMade = true;
          break;
      }

      if (progressMade) {
        results.push({
          questId: quest.id,
          name: quest.name,
          progress: `${Math.min(quest.currentCount, quest.targetCount || 1)}/${quest.targetCount || 1}`,
          completed: quest.currentCount >= (quest.targetCount || 1)
        });

        // 检查是否完成
        if (quest.currentCount >= (quest.targetCount || 1)) {
          quest.completed = true;
          this.completeQuest(quest);
        }
      }
    });

    return results;
  }

  // === 完成任务并发放奖励 ===
  completeQuest(quest) {
    this.dailyCompleted++;

    // 发放奖励
    if (quest.rewards.stone) {
      this.gameState.player.spiritStones = (this.gameState.player.spiritStones || 0) + quest.rewards.stone;
    }
    if (quest.rewards.crystal) {
      this.gameState.player.spiritCrystals = (this.gameState.player.spiritCrystals || 0) + quest.rewards.crystal;
    }
    if (quest.rewards.immortal_stone) {
      this.gameState.player.immortalStones = (this.gameState.player.immortalStones || 0) + quest.rewards.immortal_stone;
    }
    if (quest.rewards.exp) {
      const maxExp = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.maxExp || 999999;
      this.gameState.player.exp = Math.min(this.gameState.player.exp + quest.rewards.exp, maxExp);
    }
    if (quest.rewards.fame) {
      this.gameState.player.fame = (this.gameState.player.fame || 0) + quest.rewards.fame;
    }
    if (quest.rewards.contribution) {
      if (this.gameState.sect) {
        this.gameState.sect.contribution += quest.rewards.contribution;
      }
    }
    if (quest.rewards.items) {
      quest.rewards.items.forEach(item => {
        this.addItemToInventory(item.id, item.count);
      });
    }
  }

  // === 获取任务状态 ===
  getStatus() {
    return {
      dailyCompleted: this.dailyCompleted,
      maxDailyCompleted: this.maxDailyCompleted,
      remaining: this.maxDailyCompleted - this.dailyCompleted,
      activeQuests: this.activeQuests.filter(q => q.accepted && !q.completed),
      availableQuests: this.activeQuests.filter(q => !q.accepted && !q.completed)
    };
  }

  // === 辅助方法 ===
  addItemToInventory(id, count) {
    const existing = this.gameState.inventory.find(i => i.id === id);
    if (existing) {
      existing.count += count;
    } else {
      this.gameState.inventory.push({
        id,
        name: id,
        type: 'item',
        count
      });
    }
  }
}
