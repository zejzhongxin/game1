// 修炼系统
export class CultivationSystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  // 获取修炼速度
  getCultivationSpeed() {
    const player = this.gameState.player;
    const baseSpeed = 1.0;
    const rootMultiplier = player.root.type.mult;
    const comprehensionBonus = 1 + player.comprehension * 0.005;
    const skillBonus = this.getSkillBonus();
    const locationBonus = this.getLocationBonus();

    return baseSpeed * rootMultiplier * comprehensionBonus * skillBonus * locationBonus;
  }

  // 获取功法加成
  getSkillBonus() {
    const mainSkill = this.gameState.skills.main;
    if (!mainSkill) return 1.0;

    const skillData = window.gameData?.SKILLS?.main?.find(s => s.id === mainSkill.id);
    return skillData ? skillData.cultivationBonus : 1.0;
  }

  // 获取地点加成
  getLocationBonus() {
    const location = this.gameState.currentLocation;
    if (!location) return 1.0;

    // 灵气浓郁的地方加成更高
    const bonuses = {
      'qingyun': 1.0,
      'heifeng': 1.1,
      'tiancheng': 1.2,
      'huangfeng': 1.3,
      'xuejin': 1.5,
      'tianjin': 1.8,
      'tianxing': 2.0,
      'dajin_city': 2.5,
      'feitai': 3.0,
      'tianyuan': 4.0,
      'feitian_pool': 5.0,
      'tianting': 6.0
    };

    return bonuses[location] || 1.0;
  }

  // 修炼随机事件表
  static MEDITATE_EVENTS = [
    { type: 'epiphany',    name: '天人合一', text: '修炼中突然进入玄妙状态，天地灵气涌入体内！',    chance: 0.03, multi: 3,  lifespanBonus: 0.1 },
    { type: 'insight',     name: '灵光一现', text: '修炼中灵光乍现，对功法领悟更深一层。',            chance: 0.10, multi: 1.5 },
    { type: 'heart_demon', name: '心魔干扰', text: '修炼中突遭心魔侵扰，修为不进反退。',              chance: 0.08, multi: 0.7 },
  ];

  // 打坐修炼（时间推进由TimeSystem处理）
  meditate(days, maxExp) {
    const speed = this.getCultivationSpeed();
    let expGain = Math.floor(speed * days * 5);
    // 随机波动 ±20%
    expGain = Math.floor(expGain * (0.8 + Math.random() * 0.4));

    const effectiveMax = maxExp || 999999;
    const player = this.gameState.player;

    // 重伤debuff检查（修炼速度-50%）
    const injuredBuff = player.buffs?.find(b => b.type === 'injured');
    if (injuredBuff) {
      expGain = Math.floor(expGain * (1 + injuredBuff.value));
    }

    // 转修期检查（GDD: 切换功法需要10天转修期，修炼速度-50%）
    const transmuteBuff = player.buffs?.find(b => b.type === 'transmute');
    if (transmuteBuff) {
      expGain = Math.floor(expGain * 0.5);
    }

    // 随机修炼事件（倍率在钳制前应用，钳制确保不溢出）
    const roll = Math.random();
    let event = null;
    let cumulative = 0;
    for (const evt of CultivationSystem.MEDITATE_EVENTS) {
      cumulative += evt.chance;
      if (roll < cumulative) {
        event = evt;
        break;
      }
    }

    if (event) {
      expGain = Math.floor(expGain * event.multi);
      // 天人合一额外加寿命
      if (event.lifespanBonus) {
        player.lifespan += event.lifespanBonus;
      }
      // 心魔干扰: 重伤1天
      if (event.type === 'heart_demon') {
        player.buffs = player.buffs || [];
        player.buffs.push({ type: 'injured', duration: 1, effect: 'cultivation_speed', value: -0.5 });
      }
    }

    // 修为上限钳制（必须在事件倍率之后）
    if (player.exp + expGain > effectiveMax) {
      expGain = Math.max(0, effectiveMax - player.exp);
    }

    // 二次保险：写入后不得超出上限
    player.exp = Math.min(player.exp + expGain, effectiveMax);

    // 灵力消耗（GDD: 打坐每秒消耗灵力）
    const mpCost = Math.floor(player.maxMp * 0.02 * days);
    player.mp = Math.max(0, player.mp - mpCost);

    return { expGain, event };
  }

  // 闭关修炼（1.17倍加成）
  retreat(days, maxExp) {
    const effectiveMax = maxExp || 999999;
    const player = this.gameState.player;
    const result = this.meditate(days, effectiveMax);
    if (player.exp >= effectiveMax) return result; // 已满不追加
    const bonusExp = Math.floor(result.expGain * 0.17);
    player.exp = Math.min(player.exp + bonusExp, effectiveMax);
    return { expGain: result.expGain + bonusExp, event: result.event };
  }

  // 神识修炼
  trainSense(days) {
    const senseGain = Math.floor(days * 2 * (1 + this.gameState.player.comprehension * 0.01));
    this.gameState.player.sense += senseGain;
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    return senseGain;
  }

  // 炼体修炼
  trainBody(days) {
    const bodyGain = Math.floor(days * 3 * (1 + this.gameState.player.fortune * 0.01));
    this.gameState.player.bodyExp = (this.gameState.player.bodyExp || 0) + bodyGain;
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    return bodyGain;
  }
}
