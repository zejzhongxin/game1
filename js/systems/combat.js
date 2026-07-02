// 战斗系统 - 完整版（GDD一比一还原）
export class CombatSystem {
  constructor(gameState) {
    this.gameState = gameState;
    this.inCombat = false;
    this.enemy = null;
    this.turn = 0;
    this.log = [];
    this.isPlayerTurn = true;
    this.enemyType = 'normal'; // weak/normal/strong/boss/sect
    this.isNpcCombat = false; // 是否对修士战斗
    this.defenseThisTurn = false; // 本回合是否防御
    this.shieldHp = 0; // 护盾HP

    // 觉醒效果状态
    this.awakenCooldowns = {}; // 觉醒效果冷却时间
    this.activeAwakenEffects = {}; // 当前激活的觉醒效果

    // 属性克制表（五行）
    this.elementChart = {
      'metal': { strong: 'wood', weak: 'fire' },
      'wood': { strong: 'earth', weak: 'metal' },
      'earth': { strong: 'water', weak: 'wood' },
      'water': { strong: 'fire', weak: 'earth' },
      'fire': { strong: 'metal', weak: 'water' }
    };

    // 觉醒效果类型定义
    this.awakenEffectTypes = {
      // 无敌效果
      'invincible': { type: 'buff', duration: 0, cooldown: 10, trigger: 'manual' },
      // 复活效果
      'rebirth': { type: 'passive', duration: 0, cooldown: 30, trigger: 'on_death' },
      // 范围攻击
      'aoe_damage': { type: 'attack', duration: 0, cooldown: 5, trigger: 'manual' },
      // 范围控制
      'aoe_stun': { type: 'control', duration: 2, cooldown: 8, trigger: 'manual' },
      'aoe_freeze': { type: 'control', duration: 2, cooldown: 8, trigger: 'manual' },
      'aoe_paralyze': { type: 'control', duration: 2, cooldown: 8, trigger: 'manual' },
      'aoe_seal': { type: 'control', duration: 1, cooldown: 10, trigger: 'manual' },
      // 吸血效果
      'lifesteal': { type: 'buff', duration: 3, cooldown: 6, trigger: 'on_attack' },
      'aoe_lifesteal': { type: 'buff', duration: 0, cooldown: 10, trigger: 'manual' },
      // 反伤效果
      'counter_damage': { type: 'buff', duration: 3, cooldown: 6, trigger: 'on_hit' },
      // 减伤效果
      'damage_reduction': { type: 'buff', duration: 3, cooldown: 6, trigger: 'on_hit' },
      // 属性加成
      'all_stats': { type: 'buff', duration: 3, cooldown: 8, trigger: 'manual' },
      'damage_boost': { type: 'buff', duration: 3, cooldown: 6, trigger: 'on_attack' },
      // 控制免疫
      'control_immunity': { type: 'buff', duration: 1, cooldown: 10, trigger: 'manual' },
      // 即死效果
      'instant_kill_chance': { type: 'attack', duration: 0, cooldown: 15, trigger: 'on_attack' },
      // 毒伤效果
      'burn_damage': { type: 'debuff', duration: 3, cooldown: 4, trigger: 'on_attack' },
      'freeze_chance': { type: 'debuff', duration: 2, cooldown: 5, trigger: 'on_attack' },
      'paralyze_chance': { type: 'debuff', duration: 2, cooldown: 5, trigger: 'on_attack' }
    };
  }

  // 开始战斗
  startCombat(enemyType) {
    const { ENEMIES } = window.gameData;
    const enemies = ENEMIES[enemyType] || ENEMIES.normal;
    this.enemy = { ...enemies[Math.floor(Math.random() * enemies.length)] };
    this.enemy.maxHp = this.enemy.hp; // 记录最大HP用于显示
    this.inCombat = true;
    this.turn = 0;
    this.log = [`遭遇${this.enemy.name}！`];
    this.isPlayerTurn = true;
    this.defenseThisTurn = false;
    this.shieldHp = 0;
    this.enemyType = enemyType;
    this.isNpcCombat = (enemyType === 'sect');
    
    // 重置觉醒效果状态
    this.awakenCooldowns = {};
    this.activeAwakenEffects = {};
    
    return this.enemy;
  }

  // === 觉醒效果系统 ===
  
  // 获取玩家功法觉醒效果
  getPlayerAwakenEffects() {
    const effects = [];
    const skills = this.gameState.skills;
    
    // 主修功法觉醒效果
    if (skills.main && skills.main.awakenEffects) {
      const level = skills.main.level || 1;
      for (let i = 3; i <= level; i++) {
        const effectKey = `Lv.${i}`;
        if (skills.main.awakenEffects[effectKey]) {
          effects.push({
            skillId: skills.main.id,
            skillName: skills.main.name,
            level: i,
            ...skills.main.awakenEffects[effectKey]
          });
        }
      }
    }
    
    // 辅修功法觉醒效果
    if (skills.sub && Array.isArray(skills.sub)) {
      skills.sub.forEach(skill => {
        if (skill.awakenEffects) {
          const level = skill.level || 1;
          for (let i = 3; i <= level; i++) {
            const effectKey = `Lv.${i}`;
            if (skill.awakenEffects[effectKey]) {
              effects.push({
                skillId: skill.id,
                skillName: skill.name,
                level: i,
                ...skill.awakenEffects[effectKey]
              });
            }
          }
        }
      });
    }
    
    // 战斗技能觉醒效果
    if (skills.combat && Array.isArray(skills.combat)) {
      skills.combat.forEach(skill => {
        if (skill.awakenEffects) {
          const level = skill.level || 1;
          for (let i = 3; i <= level; i++) {
            const effectKey = `Lv.${i}`;
            if (skill.awakenEffects[effectKey]) {
              effects.push({
                skillId: skill.id,
                skillName: skill.name,
                level: i,
                ...skill.awakenEffects[effectKey]
              });
            }
          }
        }
      });
    }
    
    return effects;
  }

  // 检查觉醒效果是否可用
  canUseAwakenEffect(effectName) {
    // 检查冷却时间
    if (this.awakenCooldowns[effectName] && this.awakenCooldowns[effectName] > 0) {
      return { canUse: false, reason: `冷却中（剩余${this.awakenCooldowns[effectName]}回合）` };
    }
    
    // 检查觉醒效果类型
    const effectType = this.awakenEffectTypes[effectName];
    if (!effectType) {
      return { canUse: false, reason: '未知的觉醒效果' };
    }
    
    // 检查触发条件
    if (effectType.trigger === 'manual' && !this.isPlayerTurn) {
      return { canUse: false, reason: '非玩家回合无法使用' };
    }
    
    return { canUse: true };
  }

  // 使用觉醒效果
  useAwakenEffect(effectName, target = null) {
    const check = this.canUseAwakenEffect(effectName);
    if (!check.canUse) {
      return { success: false, text: check.reason };
    }
    
    const effectType = this.awakenEffectTypes[effectName];
    const player = this.gameState.player;
    
    // 根据效果类型处理
    switch (effectType.type) {
      case 'buff':
        return this.applyAwakenBuff(effectName, effectType);
      case 'attack':
        return this.applyAwakenAttack(effectName, effectType, target);
      case 'control':
        return this.applyAwakenControl(effectName, effectType);
      case 'debuff':
        return this.applyAwakenDebuff(effectName, effectType);
      default:
        return { success: false, text: '未知的效果类型' };
    }
  }

  // 应用觉醒Buff
  applyAwakenBuff(effectName, effectType) {
    const player = this.gameState.player;
    player.buffs = player.buffs || [];
    
    // 检查是否已有相同buff
    const existingBuff = player.buffs.find(b => b.type === effectName);
    if (existingBuff) {
      return { success: false, text: '该buff已激活' };
    }
    
    // 应用buff
    const buff = {
      type: effectName,
      name: effectName,
      duration: effectType.duration,
      remainingTurns: effectType.duration,
      value: this.getAwakenEffectValue(effectName)
    };
    
    player.buffs.push(buff);
    
    // 设置冷却时间
    this.awakenCooldowns[effectName] = effectType.cooldown;
    
    this.log.push(`觉醒效果【${effectName}】激活！持续${effectType.duration}回合`);
    return { success: true, text: `觉醒效果【${effectName}】激活！` };
  }

  // 应用觉醒攻击
  applyAwakenAttack(effectName, effectType, target) {
    const player = this.gameState.player;
    let totalDamage = 0;
    let effectText = '';
    
    switch (effectName) {
      case 'aoe_damage':
        // 全体攻击
        totalDamage = this.calcPhysicalDamage(player.atk * 2, 1.0, this.enemy.def);
        this.enemy.hp -= totalDamage;
        effectText = `释放觉醒攻击，对${this.enemy.name}造成${totalDamage}点伤害！`;
        break;
        
      case 'instant_kill_chance':
        // 即死效果
        const killChance = this.getAwakenEffectValue(effectName);
        if (Math.random() < killChance) {
          this.enemy.hp = 0;
          effectText = `觉醒效果触发即死！${this.enemy.name}被消灭！`;
        } else {
          totalDamage = this.calcPhysicalDamage(player.atk * 1.5, 1.0, this.enemy.def);
          this.enemy.hp -= totalDamage;
          effectText = `觉醒攻击未触发即死，造成${totalDamage}点伤害`;
        }
        break;
        
      default:
        return { success: false, text: '未知的攻击效果' };
    }
    
    // 设置冷却时间
    this.awakenCooldowns[effectName] = effectType.cooldown;
    
    this.log.push(effectText);
    return { success: true, text: effectText, damage: totalDamage };
  }

  // 应用觉醒控制
  applyAwakenControl(effectName, effectType) {
    const enemy = this.enemy;
    
    // 检查控制免疫
    if (enemy.controlImmunity) {
      return { success: false, text: `${enemy.name}免疫控制效果` };
    }
    
    // 应用控制效果
    let controlText = '';
    switch (effectName) {
      case 'aoe_stun':
        enemy.stunTurns = (enemy.stunTurns || 0) + effectType.duration;
        controlText = `${enemy.name}被眩晕${effectType.duration}回合！`;
        break;
      case 'aoe_freeze':
        enemy.debuffs = enemy.debuffs || [];
        enemy.debuffs.push({
          name: '冰冻',
          duration: effectType.duration,
          remainingTurns: effectType.duration,
          speedReduce: 0.5
        });
        controlText = `${enemy.name}被冰冻${effectType.duration}回合！`;
        break;
      case 'aoe_paralyze':
        enemy.debuffs = enemy.debuffs || [];
        enemy.debuffs.push({
          name: '麻痹',
          duration: effectType.duration,
          remainingTurns: effectType.duration,
          skipChance: 0.3
        });
        controlText = `${enemy.name}被麻痹${effectType.duration}回合！`;
        break;
      case 'aoe_seal':
        enemy.stunTurns = (enemy.stunTurns || 0) + effectType.duration;
        controlText = `${enemy.name}被封印${effectType.duration}回合！`;
        break;
      default:
        return { success: false, text: '未知的控制效果' };
    }
    
    // 设置冷却时间
    this.awakenCooldowns[effectName] = effectType.cooldown;
    
    this.log.push(controlText);
    return { success: true, text: controlText };
  }

  // 应用觉醒Debuff
  applyAwakenDebuff(effectName, effectType) {
    const enemy = this.enemy;
    enemy.debuffs = enemy.debuffs || [];
    
    // 检查是否已有相同debuff
    const existingDebuff = enemy.debuffs.find(d => d.name === effectName);
    if (existingDebuff) {
      return { success: false, text: `${enemy.name}已有该debuff` };
    }
    
    // 应用debuff
    const debuff = {
      name: effectName,
      duration: effectType.duration,
      remainingTurns: effectType.duration,
      value: this.getAwakenEffectValue(effectName)
    };
    
    enemy.debuffs.push(debuff);
    
    // 设置冷却时间
    this.awakenCooldowns[effectName] = effectType.cooldown;
    
    const effectNames = {
      'burn_damage': '灼烧',
      'freeze_chance': '冰冻',
      'paralyze_chance': '麻痹'
    };
    
    const effectNameCN = effectNames[effectName] || effectName;
    this.log.push(`${enemy.name}陷入${effectNameCN}状态！`);
    return { success: true, text: `${enemy.name}陷入${effectNameCN}状态！` };
  }

  // 获取觉醒效果数值
  getAwakenEffectValue(effectName) {
    const player = this.gameState.player;
    const effects = this.getPlayerAwakenEffects();
    
    // 查找对应的觉醒效果
    for (const effect of effects) {
      if (effect.effect && effect.effect.type === effectName) {
        return effect.effect.value || 0;
      }
    }
    
    // 默认值
    const defaultValues = {
      'invincible': 1,
      'rebirth': 0.5,
      'lifesteal': 0.2,
      'counter_damage': 0.1,
      'damage_reduction': 0.2,
      'all_stats': 0.3,
      'damage_boost': 0.3,
      'control_immunity': 1,
      'instant_kill_chance': 0.3,
      'burn_damage': 0.1,
      'freeze_chance': 0.3,
      'paralyze_chance': 0.3
    };
    
    return defaultValues[effectName] || 0;
  }

  // 减少觉醒效果冷却时间（每回合调用）
  reduceAwakenCooldowns() {
    for (const effectName in this.awakenCooldowns) {
      if (this.awakenCooldowns[effectName] > 0) {
        this.awakenCooldowns[effectName]--;
      }
    }
  }

  // 减少觉醒buff持续时间（每回合调用）
  reduceAwakenBuffDuration() {
    const player = this.gameState.player;
    if (!player.buffs) return;
    
    player.buffs = player.buffs.filter(buff => {
      if (buff.remainingTurns !== undefined) {
        buff.remainingTurns--;
        if (buff.remainingTurns <= 0) {
          this.log.push(`【${buff.name}】效果结束`);
          return false;
        }
      }
      return true;
    });
  }

  // === 伤害计算公式（GDD: 物理/法术/神识三种） ===
  calcPhysicalDamage(atk, skillMul, def) {
    return Math.max(Math.floor(atk * (skillMul || 1.0) - def * 0.5), 1);
  }

  calcMagicDamage(mp, skillMul, def) {
    return Math.max(Math.floor(mp * (skillMul || 1.0) - def * 0.3), 1);
  }

  calcSenseDamage(sense, skillMul, senseResist) {
    return Math.max(Math.floor(sense * (skillMul || 1.0) - (senseResist || 0) * 0.5), 1);
  }

  // === 属性克制（GDD: 被克-25%，克制+25%） ===
  getElementMultiplier(attackElement, defendElement) {
    if (!attackElement || !defendElement || attackElement === 'none') return 1.0;
    const chart = this.elementChart[attackElement];
    if (!chart) return 1.0;
    if (chart.strong === defendElement) return 1.25; // 克制+25%
    if (chart.weak === defendElement) return 0.75;   // 被克-25%
    return 1.0;
  }

  // === 闪避判定（GDD: 闪避率 = 神识×0.15% + 身法功法加成） ===
  checkDodge(defender, attacker) {
    const dodgeRate = Math.min((defender.sense || 10) * 0.0015 + (defender.dodgeBonus || 0), 0.5);
    return Math.random() < dodgeRate;
  }

  // === 暴击判定（GDD: 暴击率 = 机缘×0.2% + 功法加成） ===
  checkCrit(attacker) {
    const critRate = Math.min((attacker.fortune || 10) * 0.002 + (attacker.critBonus || 0), 0.5);
    return Math.random() < critRate;
  }

  // === 玩家攻击 ===
  playerAttack() {
    if (!this.inCombat || !this.isPlayerTurn) return null;
    this.turn++;
    this.defenseThisTurn = false;

    const player = this.gameState.player;

    // 闪避判定
    if (this.checkDodge(this.enemy, player)) {
      this.log.push(`${this.enemy.name}闪避了你的攻击！`);
    } else {
      // 暴击判定
      const isCrit = this.checkCrit(player);
      // 考虑破甲debuff：降低敌人防御
      const debuffStats = this.getEnemyDebuffStats();
      const effectiveDef = Math.floor(this.enemy.def * (1 - (debuffStats.defReduce || 0)));
      let damage = this.calcPhysicalDamage(player.atk, 1.0, effectiveDef);

      // 属性克制
      const playerElement = this.getPlayerElement();
      const elemMul = this.getElementMultiplier(playerElement, this.enemy.element);
      damage = Math.floor(damage * elemMul);

      // 标记debuff：额外受伤+
      if (debuffStats.dmgTakenPlus) {
        damage = Math.floor(damage * (1 + debuffStats.dmgTakenPlus));
        this.log.push(`标记生效！额外造成${Math.floor(damage * debuffStats.dmgTakenPlus/(1+debuffStats.dmgTakenPlus))}点伤害`);
      }

      // 暴击1.5倍
      if (isCrit) {
        damage = Math.floor(damage * 1.5);
        this.log.push(`暴击！你攻击${this.enemy.name}，造成${damage}点伤害！`);
      } else {
        this.log.push(`你攻击${this.enemy.name}，造成${damage}点伤害。`);
      }

      this.enemy.hp -= damage;

      // 吸血检查（法宝效果：吸血10%）
      const artifacts = this.gameState.artifacts || [];
      const equippedArtifacts = artifacts.filter(a => a.equipped);
      for (const artifact of equippedArtifacts) {
        if (artifact.special === 'lifesteal') {
          const healAmount = Math.floor(damage * 0.1);
          player.hp = Math.min(player.hp + healAmount, player.maxHp);
          this.log.push(`${artifact.name}吸血！恢复${healAmount}HP`);
        }
      }
    }

    if (this.enemy.hp <= 0) {
      return this.onEnemyDefeated();
    }

    // 灵兽自动行动
    this.beastAutoAction();

    // 傀儡自动行动
    this.puppetAutoAction();

    // 敌人回合
    return this.enemyTurn();
  }

  // === 使用技能 ===
  useSkill(skill) {
    if (!this.inCombat || !this.isPlayerTurn) return null;
    const player = this.gameState.player;
    if (player.mp < skill.mpCost) return null;
    this.turn++;
    this.defenseThisTurn = false;

    player.mp -= skill.mpCost;

    // 闪避判定
    if (this.checkDodge(this.enemy, player)) {
      this.log.push(`${this.enemy.name}闪避了${skill.name}！`);
    } else {
      const isCrit = this.checkCrit(player);
      // 破甲debuff效果
      const debuffStats = this.getEnemyDebuffStats();
      const effectiveDef = Math.floor(this.enemy.def * (1 - (debuffStats.defReduce || 0)));
      let damage = this.calcPhysicalDamage(player.atk, skill.damage, effectiveDef);

      // 属性克制
      const elemMul = this.getElementMultiplier(skill.element || 'none', this.enemy.element);
      damage = Math.floor(damage * elemMul);

      // 标记debuff
      if (debuffStats.dmgTakenPlus) {
        damage = Math.floor(damage * (1 + debuffStats.dmgTakenPlus));
      }

      if (isCrit) {
        damage = Math.floor(damage * 1.5);
        this.log.push(`暴击！${skill.name}造成${damage}点伤害！`);
      } else {
        this.log.push(`你释放${skill.name}，造成${damage}点伤害。`);
      }

      // 技能特殊效果（灼烧/冰冻/麻痹等）
      this.applySkillEffect(skill);

      this.enemy.hp -= damage;
    }

    if (this.enemy.hp <= 0) {
      return this.onEnemyDefeated();
    }

    this.beastAutoAction();
    this.puppetAutoAction();
    return this.enemyTurn();
  }

  // === 使用符箓 ===
  useTalisman(talisman) {
    if (!this.inCombat || !this.isPlayerTurn) return null;
    this.turn++;
    this.defenseThisTurn = false;

    // 护盾类符箓
    if (talisman.effect === 'shield') {
      this.shieldHp += Math.floor(this.gameState.player.maxHp * talisman.value);
      this.log.push(`你使用${talisman.name}，获得${this.shieldHp}点护盾。`);
    }

    // 伤害类符箓
    if (talisman.damage) {
      const damage = this.calcPhysicalDamage(this.gameState.player.atk, talisman.damage, this.enemy.def);
      this.enemy.hp -= damage;
      this.log.push(`你使用${talisman.name}，造成${damage}点伤害。`);
    }

    // 控制类符箓
    if (talisman.effect === 'seal' || talisman.effect === 'bind') {
      this.enemy.stunTurns = (this.enemy.stunTurns || 0) + (talisman.duration || 2);
      this.log.push(`${this.enemy.name}被封印${talisman.duration}回合！`);
    }

    if (this.enemy.hp <= 0) {
      return this.onEnemyDefeated();
    }

    this.beastAutoAction();
    this.puppetAutoAction();
    return this.enemyTurn();
  }

  // === 防御（GDD: 本回合减伤50%） ===
  defend() {
    if (!this.inCombat || !this.isPlayerTurn) return null;
    this.turn++;
    this.defenseThisTurn = true;

    this.log.push('你选择防御，本回合减伤50%。');

    this.beastAutoAction();
    this.puppetAutoAction();
    return this.enemyTurn();
  }

  // === 逃跑（GDD: 逃跑概率 = 机缘×0.3% + 身法功法加成，缠绕时无法逃跑） ===
  escape() {
    if (!this.inCombat) return false;

    // 缠绕debuff检查：无法逃跑
    const debuffStats = this.getEnemyDebuffStats();
    if (debuffStats.hasBind) {
      this.log.push('你被缠绕困住，无法逃跑！');
      return this.enemyTurn();
    }

    this.turn++;

    const chance = Math.min(0.3 + this.gameState.player.fortune * 0.003 + (this.gameState.player.escapeBonus || 0), 0.9);
    if (Math.random() < chance) {
      this.log.push('逃跑成功！');
      this.inCombat = false;
      return { type: 'escape', success: true };
    }

    this.log.push('逃跑失败！');
    return this.enemyTurn();
  }

  // === 敌人回合 ===
  enemyTurn() {
    const player = this.gameState.player;

    // 敌人debuff影响
    const debuffStats = this.getEnemyDebuffStats();

    // 麻痹检查：概率跳过行动
    if (debuffStats.hasParalyze && Math.random() < 0.3) {
      this.log.push(`${this.enemy.name}陷入麻痹，无法行动！`);
      this.isPlayerTurn = true;
      return this.checkBattleContinues();
    }

    // 混乱检查：概率攻击自己
    if (debuffStats.hasConfuse && Math.random() < 0.2) {
      const selfDmg = Math.floor(this.enemy.atk * 0.8);
      this.enemy.hp -= selfDmg;
      this.log.push(`${this.enemy.name}陷入混乱，攻击了自己！造成${selfDmg}点伤害。`);
      return this.checkBattleContinues();
    }

    // 敌人被眩晕检查
    if (this.enemy.stunTurns > 0) {
      this.enemy.stunTurns--;
      this.log.push(`${this.enemy.name}处于封印状态，无法行动！`);
      return this.checkBattleContinues();
    }

    // 修士AI决策（GDD: 5条规则）
    if (this.isNpcCombat) {
      return this.npcAiAction();
    }

    // 妖兽普通攻击（应用虚弱debuff）
    const atkStats = this.getEnemyDebuffStats();
    const effectiveAtk = Math.floor(this.enemy.atk * (1 - (atkStats.atkReduce || 0)));
    let enemyDamage = this.calcPhysicalDamage(effectiveAtk, 1.0, player.def);

    // 防御减伤
    if (this.defenseThisTurn) {
      enemyDamage = Math.floor(enemyDamage * 0.5);
    }

    // 护盾抵消
    if (this.shieldHp > 0) {
      const absorbed = Math.min(this.shieldHp, enemyDamage);
      this.shieldHp -= absorbed;
      enemyDamage -= absorbed;
      if (this.shieldHp > 0) {
        this.log.push(`护盾吸收了${absorbed}点伤害，剩余护盾${this.shieldHp}。`);
      } else {
        this.log.push(`护盾吸收了${absorbed}点伤害后破碎！`);
      }
    }

    player.hp -= enemyDamage;
    this.log.push(`${this.enemy.name}攻击你，造成${enemyDamage}点伤害。`);

    // 反伤检查（法宝效果：反伤10%）
    const artifacts = this.gameState.artifacts || [];
    const equippedArtifacts = artifacts.filter(a => a.equipped);
    for (const artifact of equippedArtifacts) {
      if (artifact.special === 'counter') {
        const counterDamage = Math.floor(enemyDamage * 0.1);
        this.enemy.hp -= counterDamage;
        this.log.push(`${artifact.name}反伤！造成${counterDamage}点伤害`);
      }
    }

    // 检查玩家是否死亡 → 6层保命判定
    if (player.hp <= 0) {
      return this.checkSurvival();
    }

    return this.checkBattleContinues();
  }

  // === 修士AI决策（GDD: 5条规则） ===
  npcAiAction() {
    const enemy = this.enemy;
    const player = this.gameState.player;
    const hpPercent = enemy.hp / (enemy.maxHp || enemy.hp);

    // ① HP<20% → 60%逃跑 / 30%吃药 / 10%拼死一击
    if (hpPercent < 0.2) {
      const roll = Math.random();
      if (roll < 0.6) {
        const escapeChance = 0.3 + (enemy.realmIdx - player.realmIdx) * 0.1;
        if (Math.random() < escapeChance) {
          this.log.push(`${this.enemy.name}逃跑成功！`);
          this.inCombat = false;
          return { type: 'enemy_escape', log: this.log };
        }
        this.log.push(`${this.enemy.name}尝试逃跑但失败了！`);
      } else if (roll < 0.9) {
        const debuffStats = this.getEnemyDebuffStats();
        let heal = Math.floor((enemy.maxHp || 200) * 0.3);
        if (debuffStats.healReduce) { heal = Math.floor(heal * (1 - debuffStats.healReduce)); }
        enemy.hp += heal;
        this.log.push(`${this.enemy.name}使用丹药，恢复${heal}HP！`);
      } else {
        let damage = this.calcPhysicalDamage(enemy.atk, 2.0, player.def);
        player.hp -= damage;
        this.log.push(`${this.enemy.name}拼死一击！造成${damage}点伤害！`);
      }
    }
    // ② HP<50%且有丹药 → 30%概率吃药回血（心魔减半）
    else if (hpPercent < 0.5 && Math.random() < 0.3) {
      const debuffStats = this.getEnemyDebuffStats();
      let heal = Math.floor((enemy.maxHp || 200) * 0.3);
      if (debuffStats.healReduce) { heal = Math.floor(heal * (1 - debuffStats.healReduce)); }
      enemy.hp += heal;
      this.log.push(`${this.enemy.name}使用丹药，恢复${heal}HP！`);
    }
    // ③ 有法宝技能且可用 → 40%概率使用（沉默时不可用）
    else if (enemy.skill && Math.random() < 0.4) {
      const debuffStats = this.getEnemyDebuffStats();
      if (debuffStats.hasSilence) {
        this.log.push(`${this.enemy.name}被沉默，无法使用技能！`);
      } else {
        let damage = this.calcPhysicalDamage(enemy.atk, enemy.skill.damage || 2.0, player.def);
        if (this.defenseThisTurn) damage = Math.floor(damage * 0.5);
        player.hp -= damage;
        this.log.push(`${this.enemy.name}释放${enemy.skill.name || '法宝技能'}，造成${damage}点伤害！`);
      }
    }
    // ⑤ 普通攻击（应用虚弱debuff）
    else {
      const debuffStats = this.getEnemyDebuffStats();
      const effectiveAtk = Math.floor(enemy.atk * (1 - (debuffStats.atkReduce || 0)));
      let damage = this.calcPhysicalDamage(effectiveAtk, 1.0, player.def);
      if (this.defenseThisTurn) damage = Math.floor(damage * 0.5);
      player.hp -= damage;
      this.log.push(`${this.enemy.name}攻击你，造成${damage}点伤害。`);
    }

    // 检查玩家是否死亡 → 6层保命判定
    if (player.hp <= 0) {
      return this.checkSurvival();
    }

    return this.checkBattleContinues();
  }

  // === 灵兽自动行动（GDD: 不占玩家操作，忠诚≥50才出战） ===
  beastAutoAction() {
    const beasts = this.gameState.beasts || [];
    const activeBeasts = beasts.filter(b => b.active && b.hp > 0 && b.loyalty >= 50);

    activeBeasts.forEach(beast => {
      if (beast.type === 'swarm') {
        const totalAtk = Math.floor(beast.atkPerUnit * Math.pow(beast.count, 0.6));
        const damage = Math.max(totalAtk - this.enemy.def * 0.3, 1);
        this.enemy.hp -= damage;
        this.log.push(`灵兽·${beast.name}(${beast.count}只)攻击，造成${damage}伤害`);
      } else {
        const damage = Math.max(beast.atk - this.enemy.def * 0.3, 1);
        this.enemy.hp -= damage;
        this.log.push(`灵兽·${beast.name}攻击，造成${damage}伤害`);
      }
    });
  }

  // === 傀儡自动行动（GDD: 不占玩家操作） ===
  puppetAutoAction() {
    const puppets = this.gameState.puppets || [];
    const deployedPuppets = puppets.filter(p => p.deployed && p.hp > 0 && p.energy > 0);

    deployedPuppets.forEach(puppet => {
      puppet.energy -= 5;
      const mode = puppet.mode || 'balanced';
      let damage;
      let actionText;

      switch (mode) {
        case 'attack':
          damage = Math.floor(puppet.atk * 1.5);
          actionText = `${puppet.name}全力攻击`;
          break;
        case 'defense':
          damage = 0;
          actionText = `${puppet.name}进入防御模式`;
          this.shieldHp += Math.floor(puppet.def * 2);
          break;
        default: // balanced
          damage = puppet.atk;
          actionText = `${puppet.name}攻击`;
          break;
      }

      if (damage > 0) {
        const finalDamage = Math.max(damage - this.enemy.def * 0.3, 1);
        this.enemy.hp -= finalDamage;
        this.log.push(`${actionText}，造成${finalDamage}伤害`);
      } else {
        this.log.push(actionText);
      }
    });
  }

  // === 6层保命判定（GDD核心） ===
  checkSurvival() {
    const player = this.gameState.player;

    // ① 涅槃Buff？
    if (player.buffs && player.buffs.some(b => b.type === 'nirvana')) {
      player.hp = Math.floor(player.maxHp * 0.5);
      player.buffs = player.buffs.filter(b => b.type !== 'nirvana');
      this.log.push('涅槃Buff触发！恢复50%HP，继续战斗！');
      return { type: 'continue', log: this.log, survival: 'nirvana' };
    }

    // ①.5 护心丹/涅槃丹效果？
    if (player.buffs && player.buffs.some(b => b.type === 'auto_heal')) {
      const buff = player.buffs.find(b => b.type === 'auto_heal');
      player.hp = Math.floor(player.maxHp * buff.value);
      player.buffs = player.buffs.filter(b => b.type !== 'auto_heal');
      this.log.push(`${buff.name}触发！恢复${Math.floor(buff.value * 100)}%HP，继续战斗！`);
      return { type: 'continue', log: this.log, survival: 'auto_heal' };
    }

    // ①.6 轮回丹效果？
    if (player.buffs && player.buffs.some(b => b.type === 'revive')) {
      player.hp = player.maxHp;
      player.mp = player.maxMp;
      player.buffs = player.buffs.filter(b => b.type !== 'revive');
      this.log.push('轮回丹触发！满状态复活，继续战斗！');
      return { type: 'continue', log: this.log, survival: 'revive' };
    }

    // ①.7 替身符效果？
    if (player.buffs && player.buffs.some(b => b.type === 'proxy')) {
      const buff = player.buffs.find(b => b.type === 'proxy');
      player.hp = Math.floor(player.maxHp * buff.value);
      player.buffs = player.buffs.filter(b => b.type !== 'proxy');
      this.log.push(`${buff.name}触发！替身承受致命伤害，恢复${Math.floor(buff.value * 100)}%HP！`);
      return { type: 'continue', log: this.log, survival: 'proxy' };
    }

    // ② 背包有涅槃丹/轮回替身符？
    const nirvanaPill = this.gameState.inventory.find(i => i.id === 'niepan');
    if (nirvanaPill) {
      nirvanaPill.count--;
      if (nirvanaPill.count <= 0) {
        this.gameState.inventory.splice(this.gameState.inventory.indexOf(nirvanaPill), 1);
      }
      player.hp = player.maxHp;
      this.log.push('涅槃丹触发！满状态复活，继续战斗！');
      return { type: 'continue', log: this.log, survival: 'nirvana_pill' };
    }
    const lunhuiProxy = this.gameState.inventory.find(i => i.id === 'lunhui_proxy_talisman');
    if (lunhuiProxy) {
      lunhuiProxy.count--;
      if (lunhuiProxy.count <= 0) {
        this.gameState.inventory.splice(this.gameState.inventory.indexOf(lunhuiProxy), 1);
      }
      player.hp = Math.floor(player.maxHp * 0.3);
      this.log.push('轮回替身符触发！恢复30%HP，继续战斗！');
      return { type: 'continue', log: this.log, survival: 'lunhui_proxy' };
    }

    // ③ 掌天瓶绿液≥3滴？
    if (this.gameState.bottle && this.gameState.bottle.greenLiquid >= 3) {
      this.gameState.bottle.greenLiquid -= 3;
      player.hp = Math.floor(player.maxHp * 0.25);
      this.log.push('掌天瓶绿液护主！消耗3滴，恢复25%HP！');
      return { type: 'continue', log: this.log, survival: 'bottle' };
    }

    // ④ 梵圣真魔功·肉身重生触发？（30%概率）
    if (this.gameState.skills.main && this.gameState.skills.main.id === 'fansheng_full' && Math.random() < 0.3) {
      player.hp = Math.floor(player.maxHp * 0.3);
      this.log.push('梵圣真魔功·肉身重生触发！恢复30%HP！');
      return { type: 'continue', log: this.log, survival: 'rebirth' };
    }

    // ⑤ 灵兽主动挡刀？（灵兽HP-30%）
    const activeBeast = (this.gameState.beasts || []).find(b => b.active && b.hp > 0 && b.loyalty >= 50);
    if (activeBeast) {
      activeBeast.hp = Math.floor(activeBeast.hp * 0.7);
      player.hp = 1;
      this.log.push(`${activeBeast.name}主动挡刀！灵兽HP-30%，你勉强存活！`);
      return { type: 'continue', log: this.log, survival: 'beast' };
    }

    // ⑥ 以上全无 → 战败
    return this.defeat();
  }

  // === 敌人被击败（GDD: 击败vs击杀三选一） ===
  onEnemyDefeated() {
    this.inCombat = false;
    const exp = this.enemy.exp || 0;
    // 钳制修为不超过上限
    const maxExp = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.maxExp || 999999;
    this.gameState.player.exp = Math.min(this.gameState.player.exp + exp, maxExp);
    this.log.push(`击败${this.enemy.name}！获得${exp}修为。`);

    // 掉落物品
    const loot = [];
    if (this.enemy.loot) {
      this.enemy.loot.forEach(item => {
        if (Math.random() < (item.chance || 1)) {
          const count = item.count || 1;
          loot.push({ id: item.id, count });
          this.log.push(`获得${item.id} x${count}`);
        }
      });
    }

    // 击败vs击杀三选一（仅修士战斗）
    if (this.isNpcCombat) {
      return {
        type: 'npc_victory',
        exp,
        loot,
        log: this.log,
        choices: ['放走', '搜刮', '击杀']
      };
    }

    return { type: 'victory', exp, loot, log: this.log };
  }

  // === 击败vs击杀选择（GDD: 三种结果） ===
  handleKillChoice(choice) {
    const enemy = this.enemy;
    const player = this.gameState.player;

    switch (choice) {
      case 'release': // 放走
        this.log.push('你选择放走对方。');
        return { type: 'victory', log: this.log };

      case 'loot': // 搜刮
        const stoneLoot = Math.floor((enemy.stones || 100) * (0.2 + Math.random() * 0.1));
        player.spiritStones += stoneLoot;
        this.log.push(`搜刮获得${stoneLoot}灵石。`);
        return { type: 'victory', log: this.log, stones: stoneLoot };

      case 'kill': // 击杀（GDD: 获灵石50~100%+1件装备(50%)+背包50~80% + 击杀连锁后果）
        const stoneKill = Math.floor((enemy.stones || 100) * (0.5 + Math.random() * 0.5));
        player.spiritStones += stoneKill;
        this.log.push(`击杀获得${stoneKill}灵石。`);

        // 50%概率获得装备
        if (Math.random() < 0.5) {
          this.log.push('获得了对方的装备！');
        }

        // 击杀连锁后果（GDD: 正道-15/魔道+5 或 魔道-15/正道+5）
        if (enemy.type === '正道') {
          player.fame = (player.fame || 0) - 15;
          this.log.push('击杀正道修士，正道名望-15');
        } else if (enemy.type === '魔道') {
          player.fame = (player.fame || 0) + 5;
          this.log.push('击杀魔道修士，魔道名望+5');
        }

        return { type: 'victory', log: this.log, stones: stoneKill, killed: true };
    }

    return { type: 'victory', log: this.log };
  }

  // === 战败处理（GDD: 灵石-10%/回城/重伤3天/灵兽傀儡濒死） ===
  defeat() {
    this.inCombat = false;
    const player = this.gameState.player;

    // 灵石扣除10%
    const stoneLoss = Math.floor(player.spiritStones * 0.1);
    player.spiritStones -= stoneLoss;

    // 传送回最近安全城镇
    const townMap = { 'renjie': 'tiancheng', 'luanxing': 'tianxing', 'dajin': 'dajin_city', 'lingjie': 'tianyuan', 'xianjie': 'tianting' };
    this.gameState.currentLocation = townMap[this.gameState.currentRegion] || 'tiancheng';

    // 重伤debuff（修炼速度-50%，持续3天）
    player.buffs = player.buffs || [];
    player.buffs.push({ type: 'injured', duration: 3, effect: 'cultivation_speed', value: -0.5 });

    // 灵兽/傀儡濒死
    (this.gameState.beasts || []).forEach(b => {
      if (b.active) b.hp = Math.max(1, Math.floor(b.hp * 0.1));
    });
    (this.gameState.puppets || []).forEach(p => {
      if (p.deployed) p.energy = 0;
    });

    player.hp = 1;
    player.exp = Math.floor(player.exp * 0.9);

    this.log.push('你被击败了...');
    this.log.push(`灵石-${stoneLoss}，已传送回${this.gameState.currentLocation}。`);
    this.log.push('获得重伤状态（修炼速度-50%，持续3天）。');

    return { type: 'defeat', log: this.log, stoneLoss };
  }

  // === 检查战斗是否继续 ===
  checkBattleContinues() {
    if (this.enemy.hp <= 0) {
      return this.onEnemyDefeated();
    }
    
    // 减少觉醒效果冷却时间
    this.reduceAwakenCooldowns();
    
    // 减少觉醒buff持续时间
    this.reduceAwakenBuffDuration();
    
    // 处理敌人debuff效果
    this.processEnemyDebuffs();
    this.reduceEnemyDebuffs();
    
    return { type: 'continue', log: this.log };
  }

  // === 获取玩家主属性元素 ===
  getPlayerElement() {
    const root = this.gameState.player.root;
    if (!root || !root.mainElement) return 'none';
    const elemMap = { '金': 'metal', '木': 'wood', '水': 'water', '火': 'fire', '土': 'earth' };
    return elemMap[root.mainElement] || 'none';
  }

  // === 技能效果施加（GDD: 灼烧/冰冻/麻痹/中毒/破甲/沉默/混乱/虚弱/噬灵/标记/缠绕/心魔） ===
  applySkillEffect(skill) {
    if (!skill.effect) return;
    this.enemy.debuffs = this.enemy.debuffs || [];

    const effectMap = {
      'burn': { name: '灼烧', duration: 3, damagePercent: 0.05 },
      'freeze': { name: '冰冻', duration: 2, speedReduce: 0.5 },
      'paralyze': { name: '麻痹', duration: 2, skipChance: 0.3 },
      'poison': { name: '中毒', duration: 4, damagePercent: 0.08 },
      'armorBreak': { name: '破甲', duration: 3, defReduce: 0.4 },
      'silence': { name: '沉默', duration: 2, noSkill: true },
      'confuse': { name: '混乱', duration: 2, selfHitChance: 0.2 },
      'weak': { name: '虚弱', duration: 3, atkReduce: 0.3 },
      'mpDrain': { name: '噬灵', duration: 3, mpDrain: 0.1 },
      'mark': { name: '标记', duration: 2, dmgTakenPlus: 0.25 },
      'bind': { name: '缠绕', duration: 2, cantEscape: true, speedZero: true },
      'heartDemon': { name: '心魔', duration: 3, healReduce: 0.5 }
    };

    const effect = effectMap[skill.effect];
    if (effect) {
      this.enemy.debuffs.push({ ...effect, remainingTurns: effect.duration });
      this.log.push(`${this.enemy.name}陷入了${effect.name}状态！`);
    }
  }

  // === 每回合递减敌人debuff剩余时间 ===
  reduceEnemyDebuffs() {
    if (!this.enemy.debuffs) return;
    const expired = [];
    for (let i = this.enemy.debuffs.length - 1; i >= 0; i--) {
      this.enemy.debuffs[i].remainingTurns--;
      if (this.enemy.debuffs[i].remainingTurns <= 0) {
        expired.push(this.enemy.debuffs[i].name);
        this.enemy.debuffs.splice(i, 1);
      }
    }
    if (expired.length > 0) {
      this.log.push(`${this.enemy.name}的${expired.join('、')}状态已消失。`);
    }
  }

  // === 处理敌人debuff tick效果（灼烧/中毒/噬灵每回合扣血扣蓝） ===
  processEnemyDebuffs() {
    if (!this.enemy.debuffs) return;
    for (const debuff of this.enemy.debuffs) {
      if (debuff.damagePercent) {
        const tickDmg = Math.floor(this.enemy.maxHp * debuff.damagePercent);
        this.enemy.hp -= tickDmg;
        this.log.push(`${debuff.name}发作，${this.enemy.name}受到${tickDmg}点伤害。`);
      }
      if (debuff.mpDrain) {
        const mpLoss = Math.floor((this.enemy.maxMp || 50) * debuff.mpDrain);
        this.enemy.mp = Math.max(0, (this.enemy.mp || 0) - mpLoss);
        const player = this.gameState.player;
        const mpSteal = Math.floor(mpLoss * 0.5);
        player.mp = Math.min(player.maxMp, player.mp + mpSteal);
        this.log.push(`噬灵生效！${this.enemy.name}灵力-${mpLoss}，你吸取了${mpSteal}灵力。`);
      }
    }
  }

  // === 获取敌人当前debuff效果汇总（用于战斗计算） ===
  getEnemyDebuffStats() {
    if (!this.enemy.debuffs) return {};
    const stats = { defReduce: 0, atkReduce: 0, dmgTakenPlus: 0, healReduce: 0, hasBind: false, hasSilence: false, hasConfuse: false, hasParalyze: false };
    for (const d of this.enemy.debuffs) {
      if (d.defReduce) stats.defReduce = Math.max(stats.defReduce, d.defReduce);
      if (d.atkReduce) stats.atkReduce = Math.max(stats.atkReduce, d.atkReduce);
      if (d.dmgTakenPlus) stats.dmgTakenPlus = Math.max(stats.dmgTakenPlus, d.dmgTakenPlus);
      if (d.healReduce) stats.healReduce = Math.max(stats.healReduce, d.healReduce);
      if (d.cantEscape) stats.hasBind = true;
      if (d.noSkill) stats.hasSilence = true;
      if (d.selfHitChance) stats.hasConfuse = true;
      if (d.skipChance) stats.hasParalyze = true;
    }
    return stats;
  }

  // === 获取当前战斗状态 ===
  getStatus() {
    return {
      inCombat: this.inCombat,
      enemy: this.enemy,
      turn: this.turn,
      log: this.log,
      shieldHp: this.shieldHp
    };
  }
}
