// 异火/丹炉系统 - 完整版（GDD一比一还原）
export class ForgeSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // === 异火体系（GDD: 7种） ===
    this.strangeFires = [
      {
        id: 'earth_flame',
        name: '地脉之火',
        grade: '★☆',
        stars: 2,
        alchemyBonus: 0.05,
        qualityBonus: 0,
        specialEffect: null,
        desc: '+5%成功率',
        obtainMethod: '地火秘境收服',
        location: 'tianjin'
      },
      {
        id: 'beast_flame',
        name: '兽炎',
        grade: '★★',
        stars: 4,
        alchemyBonus: 0.08,
        qualityBonus: 0.1,
        specialEffect: { type: 'alchemy_bonus', value: 0.1 },
        desc: '+8%成功率，+10%炼丹',
        obtainMethod: '击杀火妖王',
        location: 'yaohuang'
      },
      {
        id: 'bone_cold',
        name: '骨灵冷火',
        grade: '★★★',
        stars: 6,
        alchemyBonus: 0.12,
        qualityBonus: 0.1,
        specialEffect: { type: 'yin_pill_bonus', value: 0.2 },
        desc: '+12%成功率，+10%极品，阴丹+20%',
        obtainMethod: '古战场深处',
        location: 'guzhan'
      },
      {
        id: 'purple_crystal',
        name: '紫晶焰',
        grade: '★★★★',
        stars: 8,
        alchemyBonus: 0.15,
        qualityBonus: 0.12,
        specialEffect: { type: 'time_reduce', value: 0.2 },
        desc: '+15%成功率，+12%极品，时间-20%',
        obtainMethod: '火山深处',
        location: 'leiming'
      },
      {
        id: 'nether_flame',
        name: '九幽魔焰',
        grade: '★★★★★',
        stars: 10,
        alchemyBonus: 0.20,
        qualityBonus: 0.15,
        specialEffect: { type: 'demon_bonus', value: 0.3, penalty: 0.2 },
        desc: '+20%成功率，+15%极品，魔道+30%正道-20%',
        obtainMethod: '魔渊最深处',
        location: 'wanmo'
      },
      {
        id: 'solar_flame',
        name: '太阳真火',
        grade: '★★★★★★',
        stars: 12,
        alchemyBonus: 0.25,
        qualityBonus: 0.20,
        specialEffect: { type: 'thunder_light_bonus', value: 0.3 },
        desc: '+25%成功率，+20%极品，光明雷属+30%',
        obtainMethod: '大能传承或仙界',
        location: 'tianting'
      },
      {
        id: 'chaos_flame',
        name: '混沌圣焰',
        grade: '★★★★★★★',
        stars: 14,
        alchemyBonus: 0.35,
        qualityBonus: 0.30,
        specialEffect: { type: 'guarantee_high', minQuality: '上品' },
        desc: '+35%成功率，+30%极品，必上品以上',
        obtainMethod: '道祖级',
        location: 'hundun'
      }
    ];

    // === 丹炉品阶（GDD: 8级） ===
    this.furnaces = [
      { id: 'basic', name: '普通药鼎', grade: '凡器', bonus: 0, desc: '无加成' },
      { id: 'yellow', name: '黄铜丹炉', grade: '法器', bonus: 0.05, desc: '+5%成功率' },
      { id: 'xuantie', name: '玄铁丹炉', grade: '灵器', bonus: 0.10, desc: '+10%成功率' },
      { id: 'zijin', name: '紫金炉', grade: '法宝', bonus: 0.15, desc: '+15%成功率' },
      { id: 'dihuo', name: '地火炉', grade: '古宝', bonus: 0.22, desc: '+22%成功率' },
      { id: 'tianhuo', name: '天火鼎', grade: '玄天', bonus: 0.30, desc: '+30%成功率' },
      { id: 'qiankun', name: '乾坤炉', grade: '通天灵宝', bonus: 0.40, desc: '+40%成功率' },
      { id: 'zaohua', name: '造化神炉', grade: '先天灵宝', bonus: 0.60, desc: '+60%成功率，必定极品，概率大成功x2', special: true }
    ];

    // === 丹药品质体系（GDD） ===
    this.pillQualities = [
      { name: '废丹', multiplier: 0, desc: '品质极差，无效果' },
      { name: '下品', multiplier: 0.8, desc: '效果80%' },
      { name: '中品', multiplier: 1.0, desc: '标准效果' },
      { name: '上品', multiplier: 1.3, desc: '效果130%' },
      { name: '极品', multiplier: 1.8, desc: '效果180%' },
      { name: '圣品', multiplier: 3.0, desc: '效果300%，仅特殊条件' }
    ];

    // 玩家当前异火
    this.equippedFire = null;
    // 玩家当前丹炉
    this.equippedFurnace = this.furnaces[0]; // 默认普通药鼎

    // 异火获取事件池（探索/战斗触发）
    this.fireEvents = [
      { fireId: 'earth_flame', chance: 0.05, location: 'tianjin', desc: '你发现了地脉之火！' },
      { fireId: 'beast_flame', chance: 0.03, location: 'yaohuang', desc: '击败火妖王后获得了兽炎！' },
      { fireId: 'bone_cold', chance: 0.02, location: 'guzhan', desc: '在古战场深处发现了骨灵冷火！' },
      { fireId: 'purple_crystal', chance: 0.01, location: 'leiming', desc: '火山深处有一团紫色火焰在跳动！' },
      { fireId: 'nether_flame', chance: 0.005, location: 'wanmo', desc: '魔渊最深处，九幽魔焰正在燃烧！' },
      { fireId: 'solar_flame', chance: 0.001, location: 'tianting', desc: '一道金色火焰从天而降！' },
      { fireId: 'chaos_flame', chance: 0.0001, location: 'hundun', desc: '混沌之中，一团七彩火焰浮现！' }
    ];
  }

  // === 检查探索是否触发异火事件 ===
  checkFireEvent(locationId) {
    const events = this.fireEvents.filter(e => e.location === locationId);

    for (const event of events) {
      // 检查是否已拥有
      const owned = this.gameState.ownedFires || [];
      if (owned.includes(event.fireId)) continue;

      // 检查概率
      if (Math.random() < event.chance) {
        return this.obtainFire(event.fireId);
      }
    }

    return null;
  }

  // === 获取可用异火列表 ===
  getAvailableFires() {
    return this.strangeFires;
  }

  // === 获取可用丹炉列表 ===
  getAvailableFurnaces() {
    return this.furnaces;
  }

  // === 装备异火 ===
  equipFire(fireId) {
    const fire = this.strangeFires.find(f => f.id === fireId);
    if (!fire) return { success: false, text: '异火不存在' };

    // 检查是否已获得
    const owned = this.gameState.ownedFires || [];
    if (!owned.includes(fireId)) {
      return { success: false, text: '你还没有获得这个异火' };
    }

    this.equippedFire = fire;
    return { success: true, text: `装备${fire.name}，炼丹成功率+${(fire.alchemyBonus * 100).toFixed(0)}%` };
  }

  // === 卸下异火 ===
  unequipFire() {
    if (!this.equippedFire) return { success: false, text: '没有装备异火' };
    const name = this.equippedFire.name;
    this.equippedFire = null;
    return { success: true, text: `卸下${name}` };
  }

  // === 装备丹炉 ===
  equipFurnace(furnaceId) {
    const furnace = this.furnaces.find(f => f.id === furnaceId);
    if (!furnace) return { success: false, text: '丹炉不存在' };

    const owned = this.gameState.ownedFurnaces || [];
    if (!owned.includes(furnaceId)) {
      return { success: false, text: '你还没有获得这个丹炉' };
    }

    this.equippedFurnace = furnace;
    return { success: true, text: `装备${furnace.name}，炼丹成功率+${(furnace.bonus * 100).toFixed(0)}%` };
  }

  // === 收服异火（特殊事件触发） ===
  obtainFire(fireId) {
    const fire = this.strangeFires.find(f => f.id === fireId);
    if (!fire) return { success: false, text: '异火不存在' };

    this.gameState.ownedFires = this.gameState.ownedFires || [];
    if (this.gameState.ownedFires.includes(fireId)) {
      return { success: false, text: '你已经拥有这个异火' };
    }

    this.gameState.ownedFires.push(fireId);
    return { success: true, text: `成功收服${fire.name}！` };
  }

  // === 获得丹炉 ===
  obtainFurnace(furnaceId) {
    const furnace = this.furnaces.find(f => f.id === furnaceId);
    if (!furnace) return { success: false, text: '丹炉不存在' };

    this.gameState.ownedFurnaces = this.gameState.ownedFurnaces || [];
    if (this.gameState.ownedFurnaces.includes(furnaceId)) {
      return { success: false, text: '你已经拥有这个丹炉' };
    }

    this.gameState.ownedFurnaces.push(furnaceId);
    return { success: true, text: `获得${furnace.name}！` };
  }

  // === 计算炼丹成功率（GDD: 基础+丹炉+异火+丹术+悟性） ===
  calcAlchemySuccessRate(recipeGrade) {
    let rate = 50; // 基础成功率

    // 丹炉加成
    if (this.equippedFurnace) {
      rate += this.equippedFurnace.bonus * 100;
    }

    // 异火加成
    if (this.equippedFire) {
      rate += this.equippedFire.alchemyBonus * 100;
    }

    // 丹术等级加成（每级+3%）
    const alchemyLevel = this.gameState.alchemyLevel || 1;
    rate += alchemyLevel * 3;

    // 悟性加成
    const comprehension = this.gameState.player.comprehension || 10;
    rate += Math.min(comprehension * 0.1, 15);

    // 品质惩罚
    const gradePenalty = { '凡级': 0, '灵级': 10, '地级': 20, '天级': 30, '仙级': 40 };
    rate -= gradePenalty[recipeGrade] || 0;

    return Math.min(Math.max(rate, 20), 95);
  }

  // === 计算丹药品质（GDD: 丹炉+异火+丹术+药材年份+大成功） ===
  calcPillQuality() {
    let roll = Math.random() * 100;
    let bonus = 0;

    // 丹炉加成（提升中位值）
    if (this.equippedFurnace) {
      bonus += this.equippedFurnace.bonus * 20;
    }

    // 异火加成（提升上品+）
    if (this.equippedFire) {
      bonus += this.equippedFire.qualityBonus * 100;
    }

    // 丹术等级加成（每10级保底+1档）
    const alchemyLevel = this.gameState.alchemyLevel || 1;
    bonus += Math.floor(alchemyLevel / 10) * 5;

    roll += bonus;

    // 造化神炉特殊效果：必定极品以上
    if (this.equippedFurnace?.special) {
      roll = Math.max(roll, 85);
    }

    // 混沌圣焰特殊效果：必上品以上
    if (this.equippedFire?.id === 'chaos_flame') {
      roll = Math.max(roll, 70);
    }

    // 判定品质
    if (roll >= 95) return this.pillQualities[5]; // 圣品
    if (roll >= 80) return this.pillQualities[4]; // 极品
    if (roll >= 60) return this.pillQualities[3]; // 上品
    if (roll >= 35) return this.pillQualities[2]; // 中品
    if (roll >= 15) return this.pillQualities[1]; // 下品
    return this.pillQualities[0]; // 废丹
  }

  // === 获取当前装备信息 ===
  getEquippedInfo() {
    return {
      fire: this.equippedFire,
      furnace: this.equippedFurnace,
      ownedFires: this.gameState.ownedFires || [],
      ownedFurnaces: this.gameState.ownedFurnaces || []
    };
  }
}
