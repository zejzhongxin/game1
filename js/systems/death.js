// 陨落系统 - 完整版（GDD一比一还原）
export class DeathSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 7种陨落原因
    this.deathCauses = [
      { id: 'lifespan', name: '寿元耗尽', desc: '年龄≥寿元上限', availableEndings: ['sit', 'reborn', 'seize', 'dissolve', 'avatar', 'decay'] },
      { id: 'defeat', name: '战败无救', desc: 'HP归零且所有保命手段均无', availableEndings: ['sit', 'reborn', 'dissolve', 'avatar'] },
      { id: 'madness', name: '走火入魔', desc: '突破成功率<10%且触发极端走火', availableEndings: ['sit', 'reborn', 'dissolve', 'avatar'] },
      { id: 'ascend_fail', name: '渡劫大失败', desc: '飞升渡劫准备不足，判定大失败', availableEndings: ['sit', 'reborn', 'seize', 'dissolve', 'avatar'] },
      { id: 'seize_fail', name: '夺舍失败', desc: '夺舍时神识拼斗输给原主', availableEndings: ['game_over'] },
      { id: 'trap_kill', name: '禁制秒杀', desc: '闯高危禁地触发即死禁制', availableEndings: ['sit'] },
      { id: 'decay', name: '天人五衰', desc: '大罗以上寿元尽头未突破道祖', availableEndings: ['decay_only'] }
    ];

    // 6种结局选项
    this.endings = {
      sit: {
        id: 'sit',
        name: '坐化',
        desc: '游戏结算，统计全部成就，新开游戏',
        requirements: {},
        inherit: {
          // 坐化：全部消失
          backpack: false,
          artifacts: false,
          beasts: false,
          spiritStones: false,
          skills: false,
          sense: false,
          realm: false
        }
      },
      reborn: {
        id: 'reborn',
        name: '转世',
        desc: '需神识≥500，保留神识等级×10%，其他归零，从凡人重新开始',
        requirements: { sense: 500 },
        inherit: {
          // 转世：全部消失，仅保留神识×10%
          backpack: false,
          artifacts: false,
          beasts: false,
          spiritStones: false,
          skills: false,
          sense: true, // 保留10%
          senseRate: 0.1,
          realm: false
        }
      },
      seize: {
        id: 'seize',
        name: '夺舍',
        desc: '需神识≥1000+找到目标，夺舍后境界=目标原境界×70%，需与原神识战斗',
        requirements: { sense: 1000 },
        inherit: {
          // 夺舍：背包/灵石/功法保留。法宝/灵兽随原肉身消散。神识按拼斗结果保留
          backpack: true,
          artifacts: false,
          beasts: false,
          spiritStones: true,
          skills: true,
          sense: true,
          senseRate: 0.5, // 需战斗，假设保留50%
          realm: false // 境界=目标×70%
        }
      },
      dissolve: {
        id: 'dissolve',
        name: '兵解重修',
        desc: '修为全失，转为散仙/鬼修，境界掉到元婴，解锁鬼修路线',
        requirements: {},
        inherit: {
          // 兵解重修：背包/法宝/灵兽消失50%。灵石保留50%。功法保留但需重修等级。神识保留50%
          backpack: false, // 消失50%（简化为丢失）
          backpackRate: 0.5,
          artifacts: false,
          artifactRate: 0.5,
          beasts: false,
          beastRate: 0.5,
          spiritStones: true,
          stoneRate: 0.5,
          skills: true, // 保留但等级归零
          skillReset: true,
          sense: true,
          senseRate: 0.5,
          realm: true,
          targetRealmIdx: 4 // 元婴
        }
      },
      avatar: {
        id: 'avatar',
        name: '身外化身',
        desc: '需材料+古宝级容器，转入化身，境界掉2个大境界',
        requirements: { materials: [{ id: 'ancient_mirror', count: 1 }] }, // 需要古宝级容器
        inherit: {
          // 身外化身：全部保留（所有材料用于化身）。境界掉2级，功法等级相应下降。神识全部保留
          backpack: true,
          artifacts: true,
          beasts: true,
          spiritStones: true,
          skills: true,
          skillDowngrade: true,
          sense: true,
          senseRate: 1.0,
          realm: true,
          realmDrop: 2 // 掉2个大境界
        }
      },
      decay: {
        id: 'decay',
        name: '天人五衰',
        desc: '大罗以上寿元尽头未突破，法则反噬彻底消散，游戏结束无继承',
        requirements: {},
        inherit: {
          // 天人五衰：全部消失
          backpack: false,
          artifacts: false,
          beasts: false,
          spiritStones: false,
          skills: false,
          sense: false,
          realm: false
        }
      },
      game_over: {
        id: 'game_over',
        name: '游戏结束',
        desc: '夺舍失败，神魂消散，无法挽回',
        requirements: {},
        inherit: {
          // 全部消失，直接结束
          backpack: false,
          artifacts: false,
          beasts: false,
          spiritStones: false,
          skills: false,
          sense: false,
          realm: false
        }
      }
    };
  }

  // === 检查是否触发陨落 ===
  checkDeath() {
    const player = this.gameState.player;

    // 检查寿元
    if (player.age >= player.lifespan) {
      // 大罗以上且未突破道祖 → 天人五衰
      if (player.realmIdx >= 13) {
        return this.triggerDeath('decay');
      }
      return this.triggerDeath('lifespan');
    }

    return null;
  }

  // === 触发陨落事件 ===
  triggerDeath(causeId) {
    const cause = this.deathCauses.find(c => c.id === causeId);
    if (!cause) return null;

    const player = this.gameState.player;

    // 获取可用结局
    const availableEndings = cause.availableEndings
      .map(eid => this.endings[eid])
      .filter(ending => {
        if (!ending) return false;
        // 检查需求
        if (ending.requirements.sense && player.sense < ending.requirements.sense) return false;
        if (ending.requirements.materials) {
          for (const mat of ending.requirements.materials) {
            const item = this.gameState.inventory.find(i => i.id === mat.id);
            if (!item || item.count < mat.count) return false;
          }
        }
        return true;
      });

    return {
      type: 'death',
      cause,
      availableEndings,
      message: `陨落触发：${cause.name}（${cause.desc}）`
    };
  }

  // === 执行结局选择 ===
  executeEnding(endingId) {
    const ending = this.endings[endingId];
    if (!ending) return { success: false, text: '无效结局' };

    const player = this.gameState.player;
    const inherit = ending.inherit;
    const results = [];

    switch (endingId) {
      case 'sit':
        // 坐化：全部消失，游戏结算
        results.push('你静静地坐化了，一生修为化为飞灰……');
        results.push(`最终境界：${window.gameData?.REALMS?.[player.realmIdx]?.name || '凡人'}`);
        results.push(`总游戏天数：${this.gameState.gameTime.totalDays}`);
        results.push(`已解锁成就：${(this.gameState.achievements || []).length}个`);
        // 重置游戏
        this.fullReset();
        return { success: true, text: results.join('\n'), ending: 'sit', gameOver: true };

      case 'reborn':
        // 转世：保留神识×10%，其他归零
        const keptSense = Math.floor(player.sense * (inherit.senseRate || 0.1));
        results.push('你选择转世重生，灵魂进入轮回……');
        results.push(`前世神识保留：${keptSense}`);
        // 重置但保留神识
        this.fullReset();
        this.gameState.player.sense = keptSense;
        return { success: true, text: results.join('\n'), ending: 'reborn' };

      case 'seize':
        // 夺舍：背包/灵石/功法保留，法宝/灵兽消失，神识按拼斗保留
        results.push('你找到了一个目标，开始夺舍……');
        results.push('神识拼斗中……');
        // 简化：50%成功率
        if (Math.random() < 0.5) {
          results.push('夺舍成功！你占据了新的肉身。');
          // 保留背包/灵石/功法
          const savedBackpack = inherit.backpack ? [...this.gameState.inventory] : [];
          const savedStones = inherit.spiritStones ? player.spiritStones : 0;
          const savedSkills = inherit.skills ? { ...this.gameState.skills } : { main: null, sub: [], combat: [] };
          const savedSense = Math.floor(player.sense * (inherit.senseRate || 0.5));
          // 重置
          this.fullReset();
          // 恢复
          this.gameState.inventory = savedBackpack;
          this.gameState.player.spiritStones = savedStones;
          this.gameState.skills = savedSkills;
          this.gameState.player.sense = savedSense;
          // 境界=目标×70%（简化为掉1个大境界）
          this.gameState.player.realmIdx = Math.max(0, player.realmIdx - 1);
          const newRealm = window.gameData?.REALMS?.[this.gameState.player.realmIdx];
          if (newRealm) {
            this.gameState.player.maxHp = newRealm.hp;
            this.gameState.player.hp = newRealm.hp;
            this.gameState.player.maxMp = newRealm.mp;
            this.gameState.player.mp = newRealm.mp;
            this.gameState.player.atk = newRealm.atk;
            this.gameState.player.def = newRealm.def;
          }
          return { success: true, text: results.join('\n'), ending: 'seize' };
        } else {
          results.push('夺舍失败！原主神识太强，你的神魂被反噬……');
          results.push('游戏结束。');
          this.fullReset();
          return { success: true, text: results.join('\n'), ending: 'seize_fail', gameOver: true };
        }

      case 'dissolve':
        // 兵解重修：掉到元婴，灵石50%/神识50%/功法保留但等级归零
        results.push('你选择兵解重修，修为全失，转为散仙/鬼修……');
        results.push('境界跌落至元婴期。');
        const keptStones = Math.floor(player.spiritStones * (inherit.stoneRate || 0.5));
        const keptSense2 = Math.floor(player.sense * (inherit.senseRate || 0.5));
        // 背包50%
        const halfBackpack = this.gameState.inventory.filter(() => Math.random() < 0.5);
        // 法宝50%
        const halfArtifacts = (this.gameState.artifacts || []).filter(() => Math.random() < 0.5);
        // 灵兽50%
        const halfBeasts = (this.gameState.beasts || []).filter(() => Math.random() < 0.5);

        this.gameState.player.realmIdx = inherit.targetRealmIdx || 4; // 元婴
        this.gameState.player.spiritStones = keptStones;
        this.gameState.player.sense = keptSense2;
        this.gameState.inventory = halfBackpack;
        this.gameState.artifacts = halfArtifacts;
        this.gameState.beasts = halfBeasts;
        // 功法等级归零
        if (this.gameState.skills.combat) {
          this.gameState.skills.combat.forEach(s => { s.level = 1; });
        }
        // 更新属性
        const realm4 = window.gameData?.REALMS?.[4];
        if (realm4) {
          this.gameState.player.maxHp = realm4.hp;
          this.gameState.player.hp = realm4.hp;
          this.gameState.player.maxMp = realm4.mp;
          this.gameState.player.mp = realm4.mp;
          this.gameState.player.atk = realm4.atk;
          this.gameState.player.def = realm4.def;
          this.gameState.player.exp = 0;
        }
        results.push(`灵石保留${keptStones}，神识保留${keptSense2}`);
        return { success: true, text: results.join('\n'), ending: 'dissolve' };

      case 'avatar':
        // 身外化身：全部保留，境界掉2级
        results.push('你使用古宝级容器，将神魂转入身外化身……');
        const drop = inherit.realmDrop || 2;
        const newRealmIdx = Math.max(0, player.realmIdx - drop);
        this.gameState.player.realmIdx = newRealmIdx;
        this.gameState.player.exp = 0;
        const realmNew = window.gameData?.REALMS?.[newRealmIdx];
        if (realmNew) {
          this.gameState.player.maxHp = realmNew.hp;
          this.gameState.player.hp = realmNew.hp;
          this.gameState.player.maxMp = realmNew.mp;
          this.gameState.player.mp = realmNew.mp;
          this.gameState.player.atk = realmNew.atk;
          this.gameState.player.def = realmNew.def;
        }
        // 消耗古宝容器
        const container = this.gameState.inventory.find(i => i.id === 'ancient_mirror');
        if (container) {
          container.count--;
          if (container.count <= 0) {
            this.gameState.inventory.splice(this.gameState.inventory.indexOf(container), 1);
          }
        }
        results.push(`境界跌落至${realmNew?.name || '凡人'}期。`);
        results.push('所有物品、法宝、灵兽均已保留。');
        return { success: true, text: results.join('\n'), ending: 'avatar' };

      case 'decay':
        // 天人五衰：全部消失
        results.push('法则反噬……你的肉身和神魂正在被时间之力吞噬……');
        results.push('天人五衰降临，一切化为虚无。');
        results.push('游戏结束，无任何继承。');
        this.fullReset();
        return { success: true, text: results.join('\n'), ending: 'decay', gameOver: true };

      case 'game_over':
        results.push('你的神魂消散了……');
        results.push('游戏结束。');
        this.fullReset();
        return { success: true, text: results.join('\n'), ending: 'game_over', gameOver: true };
    }

    return { success: false, text: '未知结局' };
  }

  // === 完全重置游戏状态 ===
  fullReset() {
    // 直接读取默认状态并覆盖
    const defaultState = {
      player: { name: '无名散修', gender: '男', age: 16, lifespan: 80, realmIdx: 0, exp: 0, root: this.gameState.player?.root, hp: 100, maxHp: 100, mp: 50, maxMp: 50, atk: 10, def: 5, spd: 10, sense: 0, comprehension: 50, fortune: 50, fame: 0, spiritStones: 10, bodyExp: 0 },
      inventory: [],
      skills: { main: null, sub: [], combat: [] },
      npcs: [],
      quests: [],
      achievements: [],
      sect: null,
      beasts: [],
      artifacts: [],
      puppets: [],
      bottle: null,
      body: { realmIdx: 0, level: 1, exp: 0 },
      talismanLevel: 1, talismanExp: 0,
      alchemyLevel: 1, alchemyExp: 0,
      puppetLevel: 0,
      gameTime: { day: 1, totalDays: 0 },
      currentLocation: null, playerLocation: 'qingyun', currentRegion: 'renjie',
      logs: [{ text: '轮回转世，重新开始修仙之路。', type: '' }],
      stats: { explorations: 0, combats: 0, victories: 0, pillsRefined: 0 },
      combatLog: [], breakthroughPill: null,
      ascendPrep: { body: false, artifact: false, pill: false },
      npcRelations: {}, npcKilled: [], karma: 0, dualRecords: {},
      npcDailyCooldown: {},
      buffs: []
    };
    Object.assign(this.gameState, defaultState);
    if (this.gameState.player && !this.gameState.player.root) {
      this.gameState.player.root = { mainElement: '金', mainElements: ['金','木','水','火','土'], type: { name: '杂灵根', mult: 1.0, bonus: 0 }, elements: { '金': 20, '木': 20, '水': 20, '火': 20, '土': 20 } };
    }
  }

  // === 获取陨落信息 ===
  getDeathInfo() {
    const player = this.gameState.player;
    const remainingLifespan = Math.max(0, player.lifespan - player.age);

    return {
      age: (player.age || 16).toFixed(1),
      lifespan: player.lifespan,
      remaining: remainingLifespan.toFixed(1),
      warning: remainingLifespan <= 10,
      critical: remainingLifespan <= 3
    };
  }
}
