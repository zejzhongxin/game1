// 功法升级系统
export class SkillUpgradeSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 功法品阶经验系数
    this.gradeExpMultiplier = {
      '黄级': 100,
      '玄级': 200,
      '地级': 400,
      '天级': 800,
      '灵级': 1600,
      '仙级': 3200,
      '神级': 6400
    };

    // 升级灵石消耗
    this.upgradeCost = {
      2: 50,
      3: 100,
      4: 200,
      5: 400,
      6: 800,
      7: 1600,
      8: 3200,
      9: 6400,
      10: 12800
    };

    // 觉醒效果（从功法数据中读取）
    // 默认觉醒效果（当功法没有定义awakenEffects时使用）
    this.defaultAwakenEffects = {
      3: { name: '效果强化', desc: '基础效果+50%', bonus: 0.5 },
      5: { name: '效果扩展', desc: '解锁第2个被动效果', bonus: 1.0 },
      7: { name: '效果质变', desc: '效果类型升级', bonus: 1.5 },
      10: { name: '完全觉醒', desc: '解锁终极效果，属性大幅提升', bonus: 2.0 }
    };
  }

  // 获取功法经验需求
  getExpRequired(grade, level) {
    const baseExp = this.gradeExpMultiplier[grade] || 100;
    return baseExp * level;
  }

  // 获取升级灵石消耗
  getUpgradeCost(nextLevel) {
    return this.upgradeCost[nextLevel] || 0;
  }

  // 获取突破材料（Lv.5和Lv.10需要）
  getBreakthroughMaterials(grade, level) {
    if (level !== 5 && level !== 10) return null;

    const gradeMaterials = {
      '黄级': { id: 'insight_yellow', name: '黄级感悟丹' },
      '玄级': { id: 'insight_xuan', name: '玄级感悟丹' },
      '地级': { id: 'insight_di', name: '地级感悟丹' },
      '天级': { id: 'insight_tian', name: '天级感悟丹' },
      '灵级': { id: 'insight_ling', name: '灵级感悟丹' },
      '仙级': { id: 'insight_xian', name: '仙级感悟丹' },
      '神级': { id: 'insight_shen', name: '神级感悟丹' }
    };

    const material = gradeMaterials[grade];
    if (!material) return null;

    if (level === 5) {
      return [{ id: material.id, name: material.name, count: 3 }];
    } else { // level === 10
      return [
        { id: material.id, name: material.name, count: 5 },
        { id: 'soul_crystal', name: '灵魂水晶', count: 1 }
      ];
    }
  }

  // 检查是否可以升级
  canUpgrade(skillId, skillType) {
    const skill = this.getSkill(skillId, skillType);
    if (!skill) return { canUpgrade: false, reason: '功法不存在' };

    const level = skill.level || 1;
    if (level >= 10) return { canUpgrade: false, reason: '已达最高等级' };

    // 检查经验
    const expRequired = this.getExpRequired(skill.grade, level);
    const currentExp = skill.exp || 0;
    if (currentExp < expRequired) {
      return { canUpgrade: false, reason: `经验不足(${currentExp}/${expRequired})` };
    }

    // 检查灵石
    const cost = this.getUpgradeCost(level + 1);
    if (this.gameState.player.spiritStones < cost) {
      return { canUpgrade: false, reason: `灵石不足(${this.gameState.player.spiritStones}/${cost})` };
    }

    // 检查突破材料（Lv.5和Lv.10）
    const materials = this.getBreakthroughMaterials(skill.grade, level);
    if (materials) {
      for (const mat of materials) {
        const count = this.getItemCount(mat.id);
        if (count < mat.count) {
          return { canUpgrade: false, reason: `材料不足：${mat.name}x${mat.count}` };
        }
      }
    }

    return { canUpgrade: true };
  }

  // 升级功法
  upgradeSkill(skillId, skillType) {
    const check = this.canUpgrade(skillId, skillType);
    if (!check.canUpgrade) {
      return { success: false, text: check.reason };
    }

    const skill = this.getSkill(skillId, skillType);
    const level = skill.level || 1;
    const nextLevel = level + 1;

    // 消耗灵石
    const cost = this.getUpgradeCost(nextLevel);
    this.gameState.player.spiritStones -= cost;

    // 消耗突破材料（Lv.5和Lv.10）
    const materials = this.getBreakthroughMaterials(skill.grade, level);
    if (materials) {
      for (const mat of materials) {
        this.removeItem(mat.id, mat.count);
      }
    }

    // 升级
    skill.level = nextLevel;
    skill.exp = 0; // 升级后经验归零

    // 计算觉醒效果（从功法数据中读取）
    let awakenEffect = null;
    if (skill.awakenEffects && skill.awakenEffects[`Lv.${nextLevel}`]) {
      awakenEffect = skill.awakenEffects[`Lv.${nextLevel}`];
      skill.awakened = nextLevel;
    } else if (this.defaultAwakenEffects[nextLevel]) {
      awakenEffect = this.defaultAwakenEffects[nextLevel];
      skill.awakened = nextLevel;
    }

    // 应用属性加成
    this.applySkillBonus(skill, nextLevel);

    return {
      success: true,
      text: `${skill.name}升级至Lv.${nextLevel}！${awakenEffect ? `解锁${awakenEffect.name}！` : ''}`,
      level: nextLevel,
      awakenEffect
    };
  }

  // 应用功法属性加成（包含觉醒效果）
  applySkillBonus(skill, level) {
    const bonus = 1 + (level - 1) * 0.05; // 每级+5%

    // 主修功法加成
    if (skill.cultivationBonus) {
      skill.currentCultivationBonus = skill.cultivationBonus * bonus;
    }

    // 战斗技能加成
    if (skill.damage) {
      skill.currentDamage = skill.damage * bonus;
    }

    // 应用觉醒效果
    if (skill.awakenEffects) {
      const awakenLevel = `Lv.${level}`;
      if (skill.awakenEffects[awakenLevel]) {
        const effect = skill.awakenEffects[awakenLevel];
        // 这里可以添加觉醒效果的应用逻辑
        // 例如：根据effect.type应用不同的效果
        console.log(`觉醒效果应用：${effect.name} - ${effect.desc}`);
      }
    }
  }

  // 获取功法经验（修炼时调用）
  gainExp(skillId, skillType, days) {
    const skill = this.getSkill(skillId, skillType);
    if (!skill) return 0;

    const level = skill.level || 1;
    if (level >= 10) return 0; // 满级不再获取经验

    const grade = skill.grade || '黄级';
    const baseExp = this.gradeExpMultiplier[grade] || 100;
    const expGain = Math.floor(baseExp * days * 0.1); // 每天获得10%基础经验

    const expRequired = this.getExpRequired(grade, level);
    skill.exp = Math.min((skill.exp || 0) + expGain, expRequired); // 溢出截断

    return expGain;
  }

  // 使用感悟丹获得经验
  useInsightPill(skillId, skillType, pillId) {
    const { ITEMS } = window.gameData;
    const pill = [...(ITEMS.pills || [])].find(p => p.id === pillId);
    if (!pill || !pill.effect || pill.effect.type !== 'skill_exp') {
      return { success: false, text: '无效的感悟丹' };
    }

    // 检查是否拥有
    const count = this.getItemCount(pillId);
    if (count <= 0) {
      return { success: false, text: `没有${pill.name}` };
    }

    const skill = this.getSkill(skillId, skillType);
    if (!skill) {
      return { success: false, text: '功法不存在' };
    }

    const level = skill.level || 1;
    if (level >= 10) {
      return { success: false, text: '功法已达满级' };
    }

    // 检查品阶匹配
    const gradeOrder = ['黄级', '玄级', '地级', '天级', '灵级', '仙级', '神级'];
    const skillGradeIdx = gradeOrder.indexOf(skill.grade);
    const pillGradeIdx = gradeOrder.indexOf(pill.grade);

    if (pillGradeIdx < skillGradeIdx) {
      return { success: false, text: `${pill.name}品阶不足，无法用于${skill.grade}功法` };
    }

    // 消耗感悟丹
    this.removeItem(pillId, 1);

    // 获得经验
    const expGain = pill.effect.value;
    const expRequired = this.getExpRequired(skill.grade, skill.level || 1);
    skill.exp = Math.min((skill.exp || 0) + expGain, expRequired); // 溢出截断

    return {
      success: true,
      text: `使用${pill.name}，${skill.name}经验+${expGain}(${skill.exp}/${this.getExpRequired(skill.grade, skill.level || 1)})`,
      expGain
    };
  }

  // 获取功法详情（包含升级信息）
  getSkillUpgradeInfo(skillId, skillType) {
    const skill = this.getSkill(skillId, skillType);
    if (!skill) return null;

    const level = skill.level || 1;
    const exp = skill.exp || 0;
    const expRequired = this.getExpRequired(skill.grade, level);
    const cost = this.getUpgradeCost(level + 1);
    const materials = this.getBreakthroughMaterials(skill.grade, level);
    // 获取觉醒效果（从功法数据中读取）
    let awakenEffect = null;
    if (skill.awakenEffects && skill.awakenEffects[`Lv.${level + 1}`]) {
      awakenEffect = skill.awakenEffects[`Lv.${level + 1}`];
    } else if (this.defaultAwakenEffects[level + 1]) {
      awakenEffect = this.defaultAwakenEffects[level + 1];
    }

    // 计算当前加成
    const bonus = 1 + (level - 1) * 0.05;

    return {
      level,
      exp,
      expRequired,
      expPercent: Math.min((exp / expRequired) * 100, 100),
      cost,
      canUpgrade: this.canUpgrade(skillId, skillType).canUpgrade,
      materials,
      awakenEffect,
      currentBonus: bonus,
      nextBonus: 1 + level * 0.05
    };
  }

  // 获取功法
  getSkill(skillId, skillType) {
    const skills = this.gameState.skills;
    if (skillType === 'main') {
      return skills.main?.id === skillId ? skills.main : null;
    } else if (skillType === 'sub') {
      return skills.sub?.find(s => s.id === skillId) || null;
    } else if (skillType === 'combat') {
      return skills.combat?.find(s => s.id === skillId) || null;
    }
    return null;
  }

  // 获取物品数量
  getItemCount(itemId) {
    const item = this.gameState.inventory.find(i => i.id === itemId);
    return item ? item.count : 0;
  }

  // 移除物品
  removeItem(itemId, count = 1) {
    const item = this.gameState.inventory.find(i => i.id === itemId);
    if (item) {
      item.count -= count;
      if (item.count <= 0) {
        const index = this.gameState.inventory.indexOf(item);
        this.gameState.inventory.splice(index, 1);
      }
    }
  }
}
