// 突破系统
export class BreakthroughSystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  // 检查是否可以突破
  canBreakthrough() {
    const { REALMS } = window.gameData;
    const player = this.gameState.player;

    if (player.realmIdx >= REALMS.length - 1) return false;
    return player.exp >= REALMS[player.realmIdx].maxExp;
  }

  // 计算突破成功率
  calcSuccessRate() {
    const player = this.gameState.player;
    let rate = 40;

    // 灵根加成
    rate += player.root.type.bonus;

    // 悟性加成
    rate += Math.min(player.comprehension * 0.2, 20);

    // 机缘加成
    rate += Math.min(player.fortune * 0.15, 15);

    // 丹药加成
    if (this.gameState.breakthroughPill) {
      rate += this.gameState.breakthroughPill.bonus;
    }

    // 功法加成
    const skillBonus = this.getSkillBonus();
    rate += skillBonus;

    // 神识加成
    const senseReq = this.getSenseRequirement();
    if (player.sense >= senseReq * 2) {
      rate += 10;
    } else if (player.sense >= senseReq) {
      rate += 5;
    }

    return Math.min(Math.max(rate, 10), 95);
  }

  // 获取功法加成
  getSkillBonus() {
    const mainSkill = this.gameState.skills.main;
    if (!mainSkill) return 0;

    // 特定功法对特定境界有加成
    const bonuses = {
      'qingyuan': 5,
      'fansheng': 10,
      'guangling': 15
    };

    return bonuses[mainSkill.id] || 0;
  }

  // 获取神识要求
  getSenseRequirement() {
    const { REALMS } = window.gameData;
    return REALMS[this.gameState.player.realmIdx].sense;
  }

  // 尝试突破
  attempt() {
    if (!this.canBreakthrough()) {
      return { success: false, reason: '修为不足' };
    }

    const rate = this.calcSuccessRate();
    const roll = Math.random() * 100;

    if (roll < rate) {
      return this.success();
    } else {
      // 检查是否走火入魔
      if (rate < 40 && Math.random() < 0.2) {
        return this.goneWrong();
      }
      return this.fail();
    }
  }

  // 突破成功
  success() {
    const { REALMS, BREAKTHROUGH_MULTIPLIER } = window.gameData;
    const player = this.gameState.player;
    const oldRealm = REALMS[player.realmIdx].name;

    player.realmIdx++;
    const newRealm = REALMS[player.realmIdx];

    // 更新属性
    const multiplier = BREAKTHROUGH_MULTIPLIER[player.realmIdx - 1] || 2.0;
    player.maxHp = newRealm.hp;
    player.hp = newRealm.hp;
    player.maxMp = newRealm.mp;
    player.mp = newRealm.mp;
    player.atk = newRealm.atk;
    player.def = newRealm.def;
    player.spd = newRealm.spd;
    player.sense = Math.max(player.sense, newRealm.sense); // 突破后神识不低于境界要求
    player.exp = 0;

    // 增加寿元
    player.lifespan = newRealm.lifespan;

    return {
      success: true,
      oldRealm,
      newRealm: newRealm.name,
      multiplier
    };
  }

  // 突破失败
  fail() {
    const player = this.gameState.player;

    // 检查护脉丹效果（下次突破失败不扣修为）
    if (this.gameState.breakthroughProtect) {
      this.gameState.breakthroughProtect = false;
      return {
        success: false,
        reason: '突破失败，但护脉丹生效，不扣修为',
        expLoss: 0,
        protected: true
      };
    }

    player.exp = Math.floor(player.exp * 0.5);

    return {
      success: false,
      reason: '突破失败，修为扣50%',
      expLoss: 0.5
    };
  }

  // 走火入魔
  goneWrong() {
    const player = this.gameState.player;
    player.exp = Math.floor(player.exp * 0.3);
    player.hp = Math.floor(player.hp * 0.5);
    player.mp = Math.floor(player.mp * 0.5);

    return {
      success: false,
      reason: '走火入魔！修为扣70%，气血灵力减半',
      goneWrong: true
    };
  }

  // 飞升准备期：3步行动
  prepareAscend(action) {
    const prep = this.gameState.ascendPrep;
    const player = this.gameState.player;

    switch (action) {
      case 'body':
        if (prep.body) return { success: false, text: '肉身已加固。' };
        const stoneCost = 5000;
        if (player.spiritStones < stoneCost) return { success: false, text: `灵石不足（需要${stoneCost}）。` };
        player.spiritStones -= stoneCost;
        prep.body = true;
        this.gameState.gameTime.day += 10;
        this.gameState.gameTime.totalDays += 10;
        player.age += 10 / 360;
        return { success: true, text: '肉身加固完成！天雷伤害-20%。' };

      case 'artifact':
        if (prep.artifact) return { success: false, text: '法宝已准备。' };
        const hasArtifact = (this.gameState.artifacts || []).some(a => a.grade === '法宝' || a.grade === '古宝');
        if (!hasArtifact) return { success: false, text: '背包中没有法宝可用（需要法宝级或以上）。' };
        prep.artifact = true;
        this.gameState.gameTime.day += 5;
        this.gameState.gameTime.totalDays += 5;
        player.age += 5 / 360;
        return { success: true, text: '防御法宝准备完毕！可用法宝抵挡天雷。' };

      case 'pill':
        if (prep.pill) return { success: false, text: '渡劫丹已炼制。' };
        const hasPill = (this.gameState.inventory || []).some(i => i.id === 'ascendPill' || i.name === '渡劫丹');
        if (!hasPill) return { success: false, text: '背包中没有渡劫丹（通过炼丹系统炼制）。' };
        prep.pill = true;
        this.gameState.gameTime.day += 7;
        this.gameState.gameTime.totalDays += 7;
        player.age += 7 / 360;
        return { success: true, text: '渡劫丹准备完毕！全阶段伤害-10%。' };

      default:
        return { success: false, text: '未知准备行动。' };
    }
  }

  // 飞升渡劫
  ascendTrial() {
    const player = this.gameState.player;
    const prep = this.gameState.ascendPrep;

    // 计算准备减伤
    let bodyReduction = prep.body ? 0.2 : 0;
    let artifactBlock = prep.artifact;
    let pillReduction = prep.pill ? 0.1 : 0;

    // 渡劫4阶段
    const stages = [
      { name: '天雷降临', damage: 0.5, method: '抗住天雷或用法宝抵挡' },
      { name: '心魔骤起', damage: 0.3, method: '神识对抗' },
      { name: '灵气枯竭', damage: 0.2, method: '灵力恢复停滞' },
      { name: '天降甘霖', damage: 0, method: '成功飞升' }
    ];

    let totalDamage = 0;
    const results = [];

    for (const stage of stages) {
      let stageDamage = stage.damage;

      // 天雷阶段：法宝可挡
      if (stage.name === '天雷降临' && artifactBlock) {
        stageDamage = Math.max(0, stageDamage - 0.25);
        if (stageDamage === 0) {
          results.push({ stage: stage.name, damage: 0, survived: true, note: '法宝抵挡了天雷！' });
          continue;
        }
      }

      // 减伤计算
      stageDamage = stageDamage * (1 - bodyReduction - pillReduction);

      const damage = Math.floor(player.maxHp * stageDamage);
      player.hp -= damage;
      totalDamage += damage;

      results.push({
        stage: stage.name,
        damage,
        survived: player.hp > 0
      });

      if (player.hp <= 0) {
        return {
          success: false,
          reason: `渡劫失败于${stage.name}`,
          stages: results
        };
      }
    }

    // 重置准备状态
    this.gameState.ascendPrep = { body: false, artifact: false, pill: false };

    return {
      success: true,
      reason: '渡劫成功，飞升！',
      stages: results
    };
  }
}
