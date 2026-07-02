// 秘境副本系统 - 完整版（GDD一比一还原）
export class DungeonSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 11个秘境定义（GDD: 人界5/灵界3/仙界2+1隐藏）
    this.dungeons = [
      // === 人界5大秘境 ===
      {
        id: 'xuejin_realm',
        name: '血色禁地',
        region: 'renjie',
        cd: 30, // 每30年开启
        minRealmIdx: 2, // 筑基
        maxRealmIdx: 3, // 金丹
        layers: 3,
        desc: '每30年开启，稀有灵药、结丹契机',
        entry: 'xuejin',
        entryCost: null, // 无特殊消耗
        layersData: [
          { name: '外围', enemies: ['normal'], events: ['herb', 'beast', 'blood_flower'], boss: null },
          { name: '中层', enemies: ['strong'], events: ['treasure', 'blood_pool', 'beast'], boss: '守护灵兽' },
          { name: '核心', enemies: ['boss'], events: ['heritage', 'treasure'], boss: '血色禁地守护兽' }
        ],
        rewards: ['稀有灵药', '结丹契机', '大衍诀线索'],
        lastOpenDay: 0
      },
      {
        id: 'xiaohuan_realm',
        name: '小寰天秘境',
        region: 'luanxing',
        cd: 50,
        minRealmIdx: 3, // 金丹
        maxRealmIdx: 4, // 元婴
        layers: 5,
        desc: '每50年开启，古宝、万年灵药',
        entry: 'xiaohuan',
        entryCost: null,
        layersData: [
          { name: '第一层', enemies: ['normal'], events: ['herb', 'spirit_beast'], boss: null },
          { name: '第二层', enemies: ['normal'], events: ['treasure', 'cave'], boss: null },
          { name: '第三层', enemies: ['strong'], events: ['beast', 'treasure'], boss: '幻雾蝶王' },
          { name: '第四层', enemies: ['strong'], events: ['heritage', 'ancient'], boss: '秘境石人' },
          { name: '第五层', enemies: ['boss'], events: ['treasure'], boss: '万载灵药守护兽' }
        ],
        rewards: ['古宝', '万年灵药'],
        lastOpenDay: 0
      },
      {
        id: 'xutian_realm',
        name: '虚天殿',
        region: 'luanxing',
        cd: 100,
        minRealmIdx: 4, // 元婴
        maxRealmIdx: 5, // 化神
        layers: 7,
        desc: '每100年开启，虚天鼎、玄天之宝',
        entry: 'xutian',
        entryCost: null,
        layersData: [
          { name: '外殿', enemies: ['normal'], events: ['treasure', 'ancient'], boss: null },
          { name: '内殿', enemies: ['normal'], events: ['heritage', 'trap'], boss: null },
          { name: '偏殿', enemies: ['strong'], events: ['skill', 'treasure'], boss: null },
          { name: '冰火道', enemies: ['strong'], events: ['environment', 'boss'], boss: '冰火双煞' },
          { name: '虚天鼎室', enemies: ['boss'], events: ['heritage'], boss: '虚天鼎守护灵' },
          { name: '隐藏层', enemies: ['boss'], events: ['heritage', 'treasure'], boss: null },
          { name: '出口', enemies: ['normal'], events: [], boss: null }
        ],
        rewards: ['虚天鼎', '青元剑诀', '玄天之宝'],
        lastOpenDay: 0
      },
      {
        id: 'kunwu_realm',
        name: '昆吾山封印',
        region: 'dajin',
        cd: 0, // 随时（需钥匙）
        minRealmIdx: 4, // 元婴
        maxRealmIdx: 5, // 化神
        layers: 4,
        desc: '需钥匙触发，封印古宝、魔道传承',
        entry: 'kunwu',
        entryCost: { id: 'kunwu_key', count: 1 }, // 需钥匙
        layersData: [
          { name: '外围', enemies: ['normal'], events: ['demon', 'trap'], boss: null },
          { name: '封印核心', enemies: ['strong'], events: ['forbidden', 'heritage'], boss: '封印守卫' },
          { name: '魔窟', enemies: ['strong'], events: ['demon', 'treasure'], boss: '魔化妖将' },
          { name: '深渊', enemies: ['boss'], events: ['heritage'], boss: '古魔分身' }
        ],
        rewards: ['梵圣真魔功残篇', '封印古宝'],
        lastOpenDay: 0
      },
      {
        id: 'xinggong_realm',
        name: '星宫秘境',
        region: 'luanxing',
        cd: 100,
        minRealmIdx: 3, // 金丹
        maxRealmIdx: 4, // 元婴
        layers: 3,
        desc: '乱星海特殊秘境，星辰功法、星石',
        entry: 'tianxing',
        entryCost: null,
        layersData: [
          { name: '星辰通道', enemies: ['normal'], events: ['star_stone', 'treasure'], boss: null },
          { name: '星宫大殿', enemies: ['strong'], events: ['heritage', 'skill'], boss: '星宫守卫' },
          { name: '星核室', enemies: ['boss'], events: ['heritage'], boss: '星辰古兽' }
        ],
        rewards: ['星辰功法', '星石'],
        lastOpenDay: 0
      },

      // === 灵界3大秘境 ===
      {
        id: 'guangling_realm',
        name: '广灵洞天',
        region: 'lingjie',
        cd: 0, // 随时（需令牌）
        minRealmIdx: 7, // 合体
        maxRealmIdx: 8, // 大乘
        layers: 5,
        desc: '需令牌进入，通天灵宝、古修传承、广灵道经',
        entry: 'guangling',
        entryCost: { id: 'guangling_token', count: 1 },
        layersData: [
          { name: '洞天外围', enemies: ['normal'], events: ['heritage', 'spirit_vein'], boss: null },
          { name: '剑道试炼', enemies: ['strong'], events: ['heritage'], boss: '传承幻象·剑' },
          { name: '体道试炼', enemies: ['strong'], events: ['heritage'], boss: '传承幻象·体' },
          { name: '法道试炼', enemies: ['strong'], events: ['heritage'], boss: '传承幻象·法' },
          { name: '核心传承', enemies: ['boss'], events: ['heritage'], boss: '广灵道尊残魂' }
        ],
        rewards: ['广灵道经', '通天灵宝'],
        lastOpenDay: 0
      },
      {
        id: 'leiming_realm',
        name: '雷鸣秘境',
        region: 'lingjie',
        cd: 200,
        minRealmIdx: 7, // 合体
        maxRealmIdx: 8, // 大乘
        layers: 4,
        desc: '每200年开启，天雷竹、雷属性至宝',
        entry: 'leiming',
        entryCost: null,
        layersData: [
          { name: '雷域外围', enemies: ['normal'], events: ['environment', 'treasure'], boss: null },
          { name: '雷暴区', enemies: ['strong'], events: ['body_refine', 'environment'], boss: '雷灵兽' },
          { name: '天雷竹林', enemies: ['strong'], events: ['heritage', 'treasure'], boss: '天雷竹守卫' },
          { name: '雷劫圣地', enemies: ['boss'], events: ['heritage'], boss: '雷劫古兽' }
        ],
        rewards: ['天雷竹', '雷属性至宝'],
        lastOpenDay: 0
      },
      {
        id: 'xueshen_realm',
        name: '血神秘境',
        region: 'lingjie',
        cd: 1000,
        minRealmIdx: 8, // 大乘
        maxRealmIdx: 9, // 渡劫
        layers: 6,
        desc: '神血引动，真灵之血、血脉进化',
        entry: 'xuejin', // 复用血禁山脉入口
        entryCost: null,
        layersData: [
          { name: '血域入口', enemies: ['normal'], events: ['blood_flower', 'beast'], boss: null },
          { name: '血池', enemies: ['normal'], events: ['body_refine', 'blood_pool'], boss: null },
          { name: '血色走廊', enemies: ['strong'], events: ['heritage', 'treasure'], boss: '血晶傀儡' },
          { name: '血魔殿堂', enemies: ['strong'], events: ['heritage', 'combat'], boss: '血魔分身' },
          { name: '血神祭坛', enemies: ['boss'], events: ['heritage'], boss: '血神守护' },
          { name: '核心', enemies: ['boss'], events: ['heritage'], boss: '血神秘典守护者' }
        ],
        rewards: ['真灵之血', '血脉进化'],
        lastOpenDay: 0
      },

      // === 仙界2大秘境 ===
      {
        id: 'yuanchu_realm',
        name: '源初秘境',
        region: 'xianjie',
        cd: 10000,
        minRealmIdx: 10, // 真仙
        maxRealmIdx: 13, // 大罗
        layers: 9,
        desc: '每万年开启，混沌至宝、本源法则、混沌造化诀',
        entry: 'yuanchu',
        entryCost: null,
        layersData: [
          { name: '混沌入口', enemies: ['normal'], events: ['chaos', 'treasure'], boss: null },
          { name: '混沌迷雾', enemies: ['normal'], events: ['environment', 'secret'], boss: null },
          { name: '本源回廊', enemies: ['strong'], events: ['heritage', 'treasure'], boss: '本源守护者' },
          { name: '法则殿堂', enemies: ['strong'], events: ['heritage', 'combat'], boss: null },
          { name: '混沌核心', enemies: ['strong'], events: ['heritage'], boss: '混沌古兽' },
          { name: '源初之地', enemies: ['boss'], events: ['heritage'], boss: '源初之灵' },
          { name: '混沌深渊', enemies: ['boss'], events: ['heritage'], boss: null },
          { name: '本源之海', enemies: ['boss'], events: ['heritage'], boss: null },
          { name: '造化之地', enemies: ['boss'], events: ['heritage'], boss: '混沌造化守护者' }
        ],
        rewards: ['混沌造化诀', '混沌至宝', '本源法则'],
        lastOpenDay: 0
      },
      {
        id: 'lunhui_realm',
        name: '轮回秘境',
        region: 'xianjie',
        cd: 0, // 轮回殿开放时
        minRealmIdx: 13, // 大罗
        maxRealmIdx: 14, // 道祖
        layers: 6,
        desc: '轮回殿开放，轮回法则、大轮回术、不死之身',
        entry: 'lunhui',
        entryCost: null,
        layersData: [
          { name: '轮回入口', enemies: ['normal'], events: ['heritage', 'combat'], boss: null },
          { name: '前世幻境', enemies: ['strong'], events: ['heritage', 'environment'], boss: null },
          { name: '轮回通道', enemies: ['strong'], events: ['heritage', 'combat'], boss: '轮回守卫' },
          { name: '六道殿', enemies: ['boss'], events: ['heritage'], boss: '轮回使' },
          { name: '轮回核心', enemies: ['boss'], events: ['heritage'], boss: '轮回殿主' },
          { name: '超脱之地', enemies: ['boss'], events: ['heritage'], boss: null }
        ],
        rewards: ['大轮回术', '轮回法则', '不死之身'],
        lastOpenDay: 0
      }
    ];
  }

  // === 获取可用秘境列表 ===
  getAvailableDungeons() {
    const player = this.gameState.player;
    const currentDay = this.gameState.gameTime.totalDays;

    return this.dungeons.map(d => {
      const inRange = player.realmIdx >= d.minRealmIdx && player.realmIdx <= d.maxRealmIdx + 1;
      const cdReady = d.cd === 0 || (currentDay - d.lastOpenDay) >= d.cd;
      const hasKey = !d.entryCost || this.hasItem(d.entryCost.id, d.entryCost.count);
      const atLocation = !d.entry || this.gameState.currentLocation === d.entry;
      const available = inRange && cdReady && hasKey && atLocation;

      // 获取入口地点名称
      const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
      const entryLoc = allLocations.find(l => l.id === d.entry);
      const entryName = entryLoc?.name || d.entry;

      let status = '可用';
      if (!atLocation) status = `需前往${entryName}`;
      else if (!inRange) status = player.realmIdx < d.minRealmIdx ? '境界不足' : '已过时';
      else if (!cdReady) status = `冷却中(${d.cd - (currentDay - d.lastOpenDay)}天)`;
      else if (!hasKey) {
        const itemNames = {
          'kunwu_key': '昆吾山钥匙',
          'blood_realm_token': '血色禁地令牌',
          'guangling_token': '广灵洞天令牌'
        };
        const itemName = itemNames[d.entryCost.id] || d.entryCost.id;
        status = `需要${itemName}`;
      }

      return {
        ...d,
        available,
        status,
        inRange,
        cdReady,
        hasKey,
        atLocation,
        entryName
      };
    });
  }

  // === 进入秘境 ===
  enterDungeon(dungeonId) {
    const dungeon = this.dungeons.find(d => d.id === dungeonId);
    if (!dungeon) return { success: false, text: '秘境不存在' };

    const player = this.gameState.player;

    // 检查是否在秘境入口所在地
    if (dungeon.entry && this.gameState.currentLocation !== dungeon.entry) {
      // 找到入口地点名称
      const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
      const entryLoc = allLocations.find(l => l.id === dungeon.entry);
      const entryName = entryLoc?.name || dungeon.entry;
      return { success: false, text: `需要先前往${entryName}才能进入${dungeon.name}` };
    }

    // 检查境界
    if (player.realmIdx < dungeon.minRealmIdx) {
      return { success: false, text: `境界不足，需要${window.gameData?.REALMS?.[dungeon.minRealmIdx]?.name || '?'}以上` };
    }

    // 检查冷却
    const currentDay = this.gameState.gameTime.totalDays;
    if (dungeon.cd > 0 && (currentDay - dungeon.lastOpenDay) < dungeon.cd) {
      const remaining = dungeon.cd - (currentDay - dungeon.lastOpenDay);
      return { success: false, text: `秘境冷却中，还需${remaining}天` };
    }

    // 检查钥匙/令牌
    if (dungeon.entryCost) {
      if (!this.hasItem(dungeon.entryCost.id, dungeon.entryCost.count)) {
        const itemNames = {
          'kunwu_key': '昆吾山钥匙',
          'blood_realm_token': '血色禁地令牌',
          'guangling_token': '广灵洞天令牌'
        };
        const itemName = itemNames[dungeon.entryCost.id] || dungeon.entryCost.id;
        return { success: false, text: `需要${itemName}` };
      }
      this.removeItem(dungeon.entryCost.id, dungeon.entryCost.count);
    }

    // 进入秘境
    this.gameState.currentDungeon = {
      id: dungeon.id,
      name: dungeon.name,
      currentLayer: 0,
      totalLayers: dungeon.layers,
      explored: 0,
      maxExplore: 3, // 每层最多探索3次
      completed: false
    };

    dungeon.lastOpenDay = currentDay;

    return {
      success: true,
      text: `进入${dungeon.name}！当前在第1层：${dungeon.layersData[0].name}`,
      dungeon: this.gameState.currentDungeon
    };
  }

  // === 探索当前层 ===
  exploreLayer() {
    const current = this.gameState.currentDungeon;
    if (!current) return { success: false, text: '你不在任何秘境中' };

    const dungeon = this.dungeons.find(d => d.id === current.id);
    if (!dungeon) return { success: false, text: '秘境数据异常' };

    if (current.explored >= current.maxExplore) {
      return { success: false, text: '本层探索次数已用完，请前往下一层' };
    }

    const layer = dungeon.layersData[current.currentLayer];
    if (!layer) return { success: false, text: '层数异常' };

    current.explored++;

    // 随机事件
    const events = layer.events || [];
    const enemies = layer.enemies || ['normal'];

    // 60%事件 / 30%战斗 / 10%空
    const roll = Math.random();
    let result;

    if (roll < 0.6 && events.length > 0) {
      // 触发事件
      const eventKey = events[Math.floor(Math.random() * events.length)];
      const event = window.gameData?.EVENTS?.[eventKey];
      if (event) {
        result = {
          type: 'event',
          text: event.text,
          reward: event.reward
        };
      } else {
        result = { type: 'nothing', text: '探索了一圈，什么也没发现。' };
      }
    } else if (roll < 0.9) {
      // 触发战斗
      const enemyType = enemies[Math.floor(Math.random() * enemies.length)];
      result = {
        type: 'combat',
        enemyType,
        text: `遭遇${enemyType}级敌人！`
      };
    } else {
      result = { type: 'nothing', text: '探索了一圈，什么也没发现。' };
    }

    return {
      success: true,
      ...result,
      layer: layer.name,
      remaining: current.maxExplore - current.explored
    };
  }

  // === 前往下一层 ===
  nextLayer() {
    const current = this.gameState.currentDungeon;
    if (!current) return { success: false, text: '你不在任何秘境中' };

    const dungeon = this.dungeons.find(d => d.id === current.id);
    if (!dungeon) return { success: false, text: '秘境数据异常' };

    // 检查是否有BOSS
    const layer = dungeon.layersData[current.currentLayer];
    if (layer && layer.boss) {
      return {
        success: false,
        text: `需要击败本层BOSS：${layer.boss}才能前进`,
        needBoss: true,
        bossName: layer.boss
      };
    }

    if (current.currentLayer >= dungeon.layers - 1) {
      return { success: false, text: '已经是最后一层了' };
    }

    current.currentLayer++;
    current.explored = 0;
    const newLayer = dungeon.layersData[current.currentLayer];

    return {
      success: true,
      text: `进入第${current.currentLayer + 1}层：${newLayer.name}`,
      layer: newLayer
    };
  }

  // === 挑战BOSS ===
  challengeBoss() {
    const current = this.gameState.currentDungeon;
    if (!current) return { success: false, text: '你不在任何秘境中' };

    const dungeon = this.dungeons.find(d => d.id === current.id);
    if (!dungeon) return { success: false, text: '秘境数据异常' };

    const layer = dungeon.layersData[current.currentLayer];
    if (!layer || !layer.boss) {
      return { success: false, text: '本层没有BOSS' };
    }

    // 返回BOSS信息，由战斗系统处理
    return {
      success: true,
      bossName: layer.boss,
      enemyType: 'boss',
      text: `挑战BOSS：${layer.boss}！`
    };
  }

  // === 击败BOSS后 ===
  onBossDefeated() {
    const current = this.gameState.currentDungeon;
    if (!current) return;

    const dungeon = this.dungeons.find(d => d.id === current.id);
    if (!dungeon) return;

    const layer = dungeon.layersData[current.currentLayer];
    if (layer) {
      layer.boss = null; // 标记BOSS已击败
    }

    // 如果是最后一层，标记秘境完成
    if (current.currentLayer >= dungeon.layers - 1) {
      current.completed = true;
      // 成就统计
      this.gameState.stats.dungeonsCleared = (this.gameState.stats.dungeonsCleared || 0) + 1;
      if (dungeon.id === 'xutian') {
        this.gameState.stats.xutianCleared = true;
      }
      return {
        type: 'dungeon_complete',
        text: `恭喜通关${dungeon.name}！`,
        rewards: dungeon.rewards
      };
    }

    return {
      type: 'boss_defeated',
      text: `击败${layer.boss || 'BOSS'}！可以前往下一层了。`
    };
  }

  // === 离开秘境 ===
  leaveDungeon() {
    const current = this.gameState.currentDungeon;
    if (!current) return { success: false, text: '你不在任何秘境中' };

    const dungeon = this.dungeons.find(d => d.id === current.id);
    const completed = current.completed;
    const name = dungeon?.name || '秘境';

    this.gameState.currentDungeon = null;

    return {
      success: true,
      text: completed ? `通关${name}，满载而归！` : `离开了${name}。`,
      completed
    };
  }

  // === 获取秘境状态 ===
  getStatus() {
    const current = this.gameState.currentDungeon;
    if (!current) return null;

    const dungeon = this.dungeons.find(d => d.id === current.id);
    const layer = dungeon?.layersData?.[current.currentLayer];

    return {
      ...current,
      dungeonName: dungeon?.name,
      layerName: layer?.name,
      hasBoss: !!layer?.boss,
      bossName: layer?.boss,
      canNext: current.explored >= current.maxExplore || !layer?.boss
    };
  }

  // === 辅助方法 ===
  hasItem(id, count = 1) {
    const item = this.gameState.inventory.find(i => i.id === id);
    return item && item.count >= count;
  }

  removeItem(id, count = 1) {
    const item = this.gameState.inventory.find(i => i.id === id);
    if (!item) return false;
    item.count -= count;
    if (item.count <= 0) {
      this.gameState.inventory.splice(this.gameState.inventory.indexOf(item), 1);
    }
    return true;
  }
}
