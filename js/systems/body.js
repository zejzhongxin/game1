// 炼体系统
export class BodySystem {
  constructor(gameState) {
    this.gameState = gameState;
    // 炼体境界
    this.realms = [
      { name: '铜皮', maxLevel: 10, baseValue: 10, coefficient: 1.0 },
      { name: '铁骨', maxLevel: 10, baseValue: 80, coefficient: 1.4 },
      { name: '银髓', maxLevel: 10, baseValue: 600, coefficient: 1.8 },
      { name: '金身', maxLevel: 10, baseValue: 4000, coefficient: 2.2 },
      { name: '玉骨', maxLevel: 10, baseValue: 25000, coefficient: 2.6 },
      { name: '圣体', maxLevel: 10, baseValue: 150000, coefficient: 3.0 },
      { name: '梵圣真身', maxLevel: 10, baseValue: 1000000, coefficient: 3.4 }
    ];
  }

  // 获取当前炼体境界
  getCurrentRealm() {
    const bodyData = this.gameState.player.body || { realmIdx: 0, level: 1, exp: 0 };
    return this.realms[bodyData.realmIdx];
  }

  // 获取升级所需经验
  getRequiredExp(level, realmIdx) {
    const realm = this.realms[realmIdx];
    const triangle = level * (level + 1) / 2;
    return Math.floor(realm.baseValue * triangle * realm.coefficient);
  }

  // 获取突破所需经验
  getBreakthroughExp(realmIdx) {
    const realm = this.realms[realmIdx];
    const totalExp = this.getRequiredExp(realm.maxLevel, realmIdx);
    return Math.floor(totalExp * 1.5);
  }

  // 炼体修炼
  train(days) {
    const bodyData = this.gameState.player.body || { realmIdx: 0, level: 1, exp: 0 };
    const realm = this.realms[bodyData.realmIdx];

    // 基础炼体值
    let baseGain = days * 10;

    // 悟性加成
    // 满级后仍可积累exp用于突破，但不再升级
    if (bodyData.level >= realm.maxLevel) {
      // 仍可获得基础经验用于突破积累
      baseGain = Math.max(1, Math.floor(baseGain * 0.5));
    } else {
      baseGain *= (1 + this.gameState.player.fortune * 0.01);
    }

    baseGain *= (1 + this.gameState.player.fortune * 0.01);

    // 功法加成
    if (this.gameState.skills.main?.id === 'fansheng') {
      baseGain *= 1.5;
    }

    bodyData.exp += Math.floor(baseGain);

    // 检查升级
    while (bodyData.level < realm.maxLevel) {
      const required = this.getRequiredExp(bodyData.level, bodyData.realmIdx);
      if (bodyData.exp >= required) {
        bodyData.exp -= required;
        bodyData.level++;
        this.applyLevelBonus(bodyData);
      } else {
        break;
      }
    }

    this.gameState.player.body = bodyData;

    return Math.floor(baseGain);
  }

  // 应用升级奖励
  applyLevelBonus(bodyData) {
    // 每级增加属性
    const hpBonus = 20 * (bodyData.realmIdx + 1);
    const defBonus = 5 * (bodyData.realmIdx + 1);

    this.gameState.player.maxHp += hpBonus;
    this.gameState.player.hp += hpBonus;
    this.gameState.player.def += defBonus;
  }

  // 突破炼体境界
  breakthrough() {
    const bodyData = this.gameState.player.body || { realmIdx: 0, level: 1, exp: 0 };
    const realm = this.realms[bodyData.realmIdx];

    if (bodyData.level < realm.maxLevel) {
      return { success: false, reason: '当前境界未满级' };
    }

    const requiredExp = this.getBreakthroughExp(bodyData.realmIdx);
    if (bodyData.exp < requiredExp) {
      return { success: false, reason: `需要${requiredExp}炼体值` };
    }

    if (bodyData.realmIdx >= this.realms.length - 1) {
      return { success: false, reason: '已达最高境界' };
    }

    // 消耗经验
    bodyData.exp -= requiredExp;

    // 突破
    bodyData.realmIdx++;
    bodyData.level = 1;

    // 大幅提升属性
    const bonusRealm = this.realms[bodyData.realmIdx];
    const hpBonus = bonusRealm.baseValue;
    const defBonus = Math.floor(bonusRealm.baseValue * 0.3);
    const atkBonus = Math.floor(bonusRealm.baseValue * 0.2);

    this.gameState.player.maxHp += hpBonus;
    this.gameState.player.hp = this.gameState.player.maxHp;
    this.gameState.player.def += defBonus;
    this.gameState.player.atk += atkBonus;

    this.gameState.player.body = bodyData;

    return {
      success: true,
      newRealm: bonusRealm.name,
      hpBonus,
      defBonus,
      atkBonus
    };
  }

  // 获取炼体信息
  getInfo() {
    const bodyData = this.gameState.player.body || { realmIdx: 0, level: 1, exp: 0 };
    const realm = this.realms[bodyData.realmIdx];
    const required = this.getRequiredExp(bodyData.level, bodyData.realmIdx);
    const breakthroughExp = this.getBreakthroughExp(bodyData.realmIdx);

    return {
      realm: realm.name,
      level: bodyData.level,
      maxLevel: realm.maxLevel,
      exp: bodyData.exp,
      required,
      breakthroughExp,
      canBreakthrough: bodyData.level >= realm.maxLevel && bodyData.exp >= breakthroughExp
    };
  }
}
