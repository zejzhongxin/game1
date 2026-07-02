// 法宝系统
export class ArtifactSystem {
  constructor(gameState) {
    this.gameState = gameState;
    // 法宝品阶
    this.grades = ['法器', '灵器', '法宝', '古宝', '玄天之宝', '通天灵宝', '先天灵宝', '混沌至宝'];
    // 法宝类型
    this.types = ['attack', 'defense', 'assist', 'fly', 'space', 'formation', 'sense', 'special'];
  }

  // 装备法宝
  equip(artifactId, slot) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 检查栏位
    const slots = this.gameState.artifactSlots || { attack: [null, null], defense: [null], assist: [null, null], fly: [null], space: [null] };
    if (!slots[slot]) {
      return { success: false, text: '无效栏位' };
    }

    // 检查类型匹配
    if (artifact.type !== slot && slot !== 'assist') {
      return { success: false, text: '法宝类型不匹配' };
    }

    // 卸下原法宝
    const oldArtifactId = slots[slot][0];
    if (oldArtifactId) {
      const oldArtifact = this.gameState.artifacts.find(a => a.id === oldArtifactId);
      if (oldArtifact) {
        oldArtifact.equipped = false;
      }
    }

    // 装备新法宝
    slots[slot][0] = artifactId;
    artifact.equipped = true;
    this.gameState.artifactSlots = slots;

    // 应用属性
    this.applyArtifactBonus(artifact, true);

    // 成就统计
    this.gameState.stats.artifactsForged = (this.gameState.stats.artifactsForged || 0) + 1;

    return {
      success: true,
      text: `装备${artifact.name}`,
      artifact
    };
  }

  // 卸下法宝
  unequip(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact || !artifact.equipped) {
      return { success: false, text: '法宝未装备' };
    }

    // 找到栏位
    const slots = this.gameState.artifactSlots || {};
    for (const [slot, artifacts] of Object.entries(slots)) {
      const index = artifacts.indexOf(artifactId);
      if (index !== -1) {
        artifacts[index] = null;
        artifact.equipped = false;
        this.applyArtifactBonus(artifact, false);
        break;
      }
    }

    return {
      success: true,
      text: `卸下${artifact.name}`
    };
  }

  // 应用法宝属性
  applyArtifactBonus(artifact, equip) {
    const multiplier = equip ? 1 : -1;

    if (artifact.atk) {
      this.gameState.player.atk += artifact.atk * multiplier;
    }
    if (artifact.def) {
      this.gameState.player.def += artifact.def * multiplier;
    }
    if (artifact.hp) {
      this.gameState.player.maxHp += artifact.hp * multiplier;
      if (equip) {
        this.gameState.player.hp += artifact.hp;
      }
    }
    if (artifact.mp) {
      this.gameState.player.maxMp += artifact.mp * multiplier;
      if (equip) {
        this.gameState.player.mp += artifact.mp;
      }
    }
    if (artifact.speed) {
      this.gameState.player.spd += artifact.speed * multiplier;
    }
  }

  // 法宝融合
  fuse(artifactId1, artifactId2) {
    const artifact1 = this.gameState.artifacts.find(a => a.id === artifactId1);
    const artifact2 = this.gameState.artifacts.find(a => a.id === artifactId2);

    if (!artifact1 || !artifact2) {
      return { success: false, text: '法宝不存在' };
    }
    if (artifactId1 === artifactId2) {
      return { success: false, text: '不能融合同一件法宝' };
    }

    if (artifact1.grade !== artifact2.grade) {
      return { success: false, text: '法宝品阶不同' };
    }

    // 融合概率
    const roll = Math.random() * 100;

    if (roll < 40) {
      // 完全成功
      const newAtk = Math.floor((artifact1.atk + artifact2.atk) * 1.1);
      const newDef = Math.floor((artifact1.def + artifact2.def) * 1.1);

      // 移除第二个法宝
      const index = this.gameState.artifacts.indexOf(artifact2);
      this.gameState.artifacts.splice(index, 1);

      // 更新第一个法宝
      artifact1.atk = newAtk;
      artifact1.def = newDef;
      artifact1.name = `强化${artifact1.name}`;

      return {
        success: true,
        text: '融合成功！法宝属性大幅提升',
        artifact: artifact1
      };
    } else if (roll < 75) {
      // 部分成功
      const newAtk = Math.floor(Math.max(artifact1.atk, artifact2.atk) * 1.05);
      const newDef = Math.floor(Math.max(artifact1.def, artifact2.def) * 1.05);

      const index = this.gameState.artifacts.indexOf(artifact2);
      this.gameState.artifacts.splice(index, 1);

      artifact1.atk = newAtk;
      artifact1.def = newDef;

      return {
        success: true,
        text: '融合部分成功，属性小幅提升',
        artifact: artifact1
      };
    } else {
      // 失败
      const index1 = this.gameState.artifacts.indexOf(artifact1);
      const index2 = this.gameState.artifacts.indexOf(artifact2);
      this.gameState.artifacts.splice(Math.max(index1, index2), 1);
      this.gameState.artifacts.splice(Math.min(index1, index2), 1);

      return {
        success: false,
        text: '融合失败，两件法宝损毁'
      };
    }
  }

  // 法宝献祭
  sacrifice(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 根据品阶给予增益
    const gradeIndex = Math.max(0, this.grades.indexOf(artifact.grade));
    const effects = [
      { hp: 0.3, mp: 0, atk: 0, duration: 0 },
      { hp: 0.5, mp: 0.3, atk: 0.2, duration: 3 },
      { hp: 0.8, mp: 0.5, atk: 0.3, duration: 5 },
      { hp: 1.0, mp: 1.0, atk: 0.5, duration: 10 },
      { hp: 1.0, mp: 1.0, atk: 1.0, duration: 15 },
      { hp: 1.0, mp: 1.0, atk: 2.0, duration: 20 },
      { hp: 1.0, mp: 1.0, atk: 3.0, duration: 30 },
      { hp: 1.0, mp: 1.0, atk: 5.0, duration: 50 }
    ];

    const effect = effects[Math.min(gradeIndex, effects.length - 1)];

    // 应用增益
    const healAmount = Math.floor(this.gameState.player.maxHp * effect.hp);
    const mpAmount = Math.floor(this.gameState.player.maxMp * effect.mp);

    this.gameState.player.hp = Math.min(this.gameState.player.hp + healAmount, this.gameState.player.maxHp);
    this.gameState.player.mp = Math.min(this.gameState.player.mp + mpAmount, this.gameState.player.maxMp);

    // 临时攻击加成
    if (effect.atk > 0) {
      this.gameState.buffs = this.gameState.buffs || [];
      this.gameState.buffs.push({
        type: 'artifact_sacrifice',
        atkBonus: Math.floor(this.gameState.player.atk * effect.atk),
        duration: effect.duration
      });
      this.gameState.player.atk += Math.floor(this.gameState.player.atk * effect.atk);
    }

    // 移除法宝
    const index = this.gameState.artifacts.indexOf(artifact);
    this.gameState.artifacts.splice(index, 1);

    return {
      success: true,
      text: `献祭${artifact.name}，恢复${healAmount}HP${effect.atk > 0 ? `，攻击+${Math.floor(this.gameState.player.atk * effect.atk)}` : ''}`,
      effect
    };
  }

  // 法宝温养
  nurture(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 消耗时间
    const days = Math.max(1, Math.floor(this.gameState.player.realmIdx * 0.5));
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    // 增加成长度（钳制不超过突破阈值）
    const maxExp = 100;
    artifact.exp = Math.min((artifact.exp || 0) + Math.floor(Math.random() * 11) + 5, maxExp);

    // 检查是否可以突破
    if (artifact.exp >= maxExp && (artifact.level || 1) < 10) {
      artifact.exp = 0; // 突破后重置
      artifact.level = (artifact.level || 1) + 1;

      // 提升属性
      artifact.atk = Math.floor(artifact.atk * 1.1);
      artifact.def = Math.floor(artifact.def * 1.1);

      return {
        success: true,
        text: `温养成功，${artifact.name}突破至${artifact.level}级`,
        breakthrough: true,
        artifact
      };
    }

    return {
      success: true,
      text: `温养${days}天，成长度+${Math.floor(artifact.exp)}`,
      artifact
    };
  }

  // === 本命法宝系统 ===

  // 绑定本命法宝
  bindMainArtifact(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 检查是否已有本命法宝
    if (this.gameState.mainArtifact) {
      return { success: false, text: '已有本命法宝，请先更换' };
    }

    // 绑定本命法宝
    artifact.isMainArtifact = true;
    artifact.mastery = 0; // 熟练度
    artifact.growth = 0; // 成长值
    this.gameState.mainArtifact = artifactId;

    return {
      success: true,
      text: `${artifact.name}已绑定为本命法宝！`,
      artifact
    };
  }

  // 更换本命法宝（代价极大）
  changeMainArtifact(newArtifactId) {
    const newArtifact = this.gameState.artifacts.find(a => a.id === newArtifactId);
    if (!newArtifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 检查是否有本命法宝
    if (!this.gameState.mainArtifact) {
      return { success: false, text: '没有本命法宝' };
    }

    const oldArtifact = this.gameState.artifacts.find(a => a.id === this.gameState.mainArtifact);
    if (oldArtifact) {
      // 解除旧本命法宝绑定
      oldArtifact.isMainArtifact = false;
      oldArtifact.mastery = undefined;
      oldArtifact.growth = undefined;
    }

    // 更换代价：神识-30%，寿元-10年
    this.gameState.player.sense = Math.floor(this.gameState.player.sense * 0.7);
    this.gameState.player.lifespan = Math.max(1, this.gameState.player.lifespan - 10 * 360);

    // 绑定新本命法宝
    newArtifact.isMainArtifact = true;
    newArtifact.mastery = 0;
    newArtifact.growth = 0;
    this.gameState.mainArtifact = newArtifactId;

    return {
      success: true,
      text: `更换本命法宝为${newArtifact.name}！神识-30%，寿元-10年`,
      artifact: newArtifact
    };
  }

  // 本命法宝专用温养（GDD: 消耗天数=当前境界打坐天数×0.5）
  nurtureMainArtifact() {
    if (!this.gameState.mainArtifact) {
      return { success: false, text: '没有本命法宝' };
    }

    const artifact = this.gameState.artifacts.find(a => a.id === this.gameState.mainArtifact);
    if (!artifact) {
      return { success: false, text: '本命法宝不存在' };
    }

    // 消耗时间：当前境界打坐天数×0.5
    const days = Math.max(1, Math.floor(this.gameState.player.realmIdx * 0.5));
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    // 增加成长度（5~15%）
    const growthGain = Math.floor(Math.random() * 11) + 5;
    artifact.growth = Math.min(100, (artifact.growth || 0) + growthGain);

    // 增加熟练度（1~3）
    const masteryGain = Math.floor(Math.random() * 3) + 1;
    artifact.mastery = Math.min(100, (artifact.mastery || 0) + masteryGain);

    // 检查是否可以突破品阶
    if (artifact.growth >= 100) {
      const gradeIndex = this.grades.indexOf(artifact.grade);
      if (gradeIndex < this.grades.length - 1) {
        // 尝试突破（成功率受熟练度影响）
        const successRate = 50 + (artifact.mastery || 0) * 0.5;
        if (Math.random() * 100 < successRate) {
          // 突破成功
          artifact.grade = this.grades[gradeIndex + 1];
          artifact.growth = 0;
          artifact.mastery = Math.floor((artifact.mastery || 0) * 0.5); // 熟练度减半
          artifact.atk = Math.floor(artifact.atk * 1.3);
          artifact.def = Math.floor(artifact.def * 1.3);

          return {
            success: true,
            text: `温养${days}天，${artifact.name}突破为${artifact.grade}！`,
            breakthrough: true,
            artifact
          };
        } else {
          // 突破失败，成长值归零
          artifact.growth = 0;
          return {
            success: true,
            text: `温养${days}天，突破失败，成长值归零`,
            breakthrough: false,
            artifact
          };
        }
      }
    }

    return {
      success: true,
      text: `温养${days}天，成长度+${growthGain}%(${artifact.growth}%)，熟练度+${masteryGain}(${artifact.mastery || 0})`,
      artifact
    };
  }

  // 获取本命法宝信息
  getMainArtifactInfo() {
    if (!this.gameState.mainArtifact) {
      return null;
    }

    const artifact = this.gameState.artifacts.find(a => a.id === this.gameState.mainArtifact);
    if (!artifact) {
      return null;
    }

    return {
      ...artifact,
      growth: artifact.growth || 0,
      mastery: artifact.mastery || 0,
      nextGrade: this.grades[this.grades.indexOf(artifact.grade) + 1] || '已达最高'
    };
  }

  // 获取法宝列表
  getArtifacts() {
    return this.gameState.artifacts || [];
  }

  // 获取装备栏
  getSlots() {
    return this.gameState.artifactSlots || {
      attack: [null, null],
      defense: [null],
      assist: [null, null],
      fly: [null],
      space: [null]
    };
  }

  // 本命法宝突破（GDD: 本命法宝可以突破品阶）
  breakthroughArtifact(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 检查是否可以突破
    const gradeIndex = this.grades.indexOf(artifact.grade);
    if (gradeIndex >= this.grades.length - 1) {
      return { success: false, text: '已达最高品阶' };
    }

    // 检查突破材料
    const materials = this.getBreakthroughMaterials(artifact.grade);
    for (const mat of materials) {
      if (!this.hasItem(mat.id, mat.count)) {
        return { success: false, text: `缺少${mat.name}x${mat.count}` };
      }
    }

    // 消耗材料
    for (const mat of materials) {
      this.removeItem(mat.id, mat.count);
    }

    // 突破成功
    artifact.grade = this.grades[gradeIndex + 1];
    artifact.atk = Math.floor(artifact.atk * 1.5);
    artifact.def = Math.floor(artifact.def * 1.5);

    return {
      success: true,
      text: `${artifact.name}突破为${artifact.grade}！`,
      artifact
    };
  }

  // 获取突破材料
  getBreakthroughMaterials(grade) {
    const materials = {
      '法器': [{ id: 'iron', count: 10, name: '玄铁' }],
      '灵器': [{ id: 'iron', count: 20, name: '玄铁' }, { id: 'spirit_crystal', count: 5, name: '灵晶' }],
      '法宝': [{ id: 'spirit_crystal', count: 20, name: '灵晶' }, { id: 'demon_core', count: 5, name: '妖丹' }],
      '古宝': [{ id: 'demon_core', count: 20, name: '妖丹' }, { id: 'void_stone', count: 5, name: '虚空石' }],
      '玄天之宝': [{ id: 'void_stone', count: 20, name: '虚空石' }, { id: 'chaos_stone', count: 5, name: '混沌石' }],
      '通天灵宝': [{ id: 'chaos_stone', count: 20, name: '混沌石' }, { id: 'true_blood', count: 5, name: '真灵之血' }],
      '先天灵宝': [{ id: 'true_blood', count: 20, name: '真灵之血' }, { id: 'origin_crystal', count: 5, name: '本源结晶' }]
    };
    return materials[grade] || [];
  }

  // 法宝封印（GDD: 法宝可以封印）
  sealArtifact(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    if (artifact.sealed) {
      return { success: false, text: '法宝已封印' };
    }

    artifact.sealed = true;
    artifact.sealLevel = 1;

    // 封印后属性减半
    artifact.atk = Math.floor(artifact.atk * 0.5);
    artifact.def = Math.floor(artifact.def * 0.5);

    return {
      success: true,
      text: `${artifact.name}已封印，属性减半`,
      artifact
    };
  }

  // 法宝解封（GDD: 法宝可以解封）
  unsealArtifact(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    if (!artifact.sealed) {
      return { success: false, text: '法宝未封印' };
    }

    // 解封成功率：70%
    if (Math.random() < 0.7) {
      artifact.sealed = false;
      artifact.sealLevel = 0;

      // 解封后属性恢复
      artifact.atk = Math.floor(artifact.atk * 2);
      artifact.def = Math.floor(artifact.def * 2);

      return {
        success: true,
        text: `${artifact.name}解封成功！属性恢复`,
        artifact
      };
    } else {
      // 解封失败，封印加固
      artifact.sealLevel = Math.min(artifact.sealLevel + 1, 9);
      return {
        success: false,
        text: `解封失败，封印加固至${artifact.sealLevel}层`
      };
    }
  }

  // 法宝共鸣（GDD: 收集特定组合激活额外效果）
  checkResonance() {
    const artifacts = this.gameState.artifacts.filter(a => a.equipped);
    const resonances = [];

    // 青竹蜂云剑 + 虚天鼎 → 剑气护体+10%防御
    if (artifacts.some(a => a.id === 'qingzhu_sword') && artifacts.some(a => a.id === 'xutian_ding')) {
      resonances.push({
        name: '剑气护体',
        effect: '防御+10%',
        bonus: { def: 0.1 }
      });
    }

    // 72口青竹蜂云剑 → 大庚剑阵（需要72口，这里简化为3口）
    const qingzhuCount = artifacts.filter(a => a.id === 'qingzhu_sword').length;
    if (qingzhuCount >= 3) {
      resonances.push({
        name: '大庚剑阵',
        effect: '攻击+50%',
        bonus: { atk: 0.5 }
      });
    }

    // 五件同属性古宝 → 五行轮转大阵
    const ancientArtifacts = artifacts.filter(a => a.grade === '古宝');
    if (ancientArtifacts.length >= 5) {
      resonances.push({
        name: '五行轮转大阵',
        effect: '全属性+20%',
        bonus: { atk: 0.2, def: 0.2 }
      });
    }

    return resonances;
  }

  // 法宝自爆（GDD: 最后手段，自爆造成法宝攻击×5伤害）
  selfDestructArtifact(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    // 自爆伤害：法宝攻击×5
    const damage = artifact.atk * 5;

    // 反噬：气血扣30%
    const hpCost = Math.floor(this.gameState.player.maxHp * 0.3);
    this.gameState.player.hp = Math.max(1, this.gameState.player.hp - hpCost);

    // 如果是本命法宝，神识永久-50%
    if (artifact.isMainArtifact) {
      this.gameState.player.sense = Math.floor(this.gameState.player.sense * 0.5);
    }

    // 移除法宝
    const index = this.gameState.artifacts.indexOf(artifact);
    this.gameState.artifacts.splice(index, 1);

    return {
      success: true,
      text: `${artifact.name}自爆！造成${damage}点伤害，自身损失${hpCost}HP${artifact.isMainArtifact ? '，神识永久-50%' : ''}`,
      damage,
      hpCost
    };
  }

  // 法宝损坏检查（GDD: 耐久归零后失效）
  checkDurability() {
    const artifacts = this.gameState.artifacts || [];
    const damaged = [];

    for (const artifact of artifacts) {
      if (artifact.durability !== undefined && artifact.durability <= 0) {
        artifact.broken = true;
        damaged.push(artifact);
      }
    }

    return damaged;
  }

  // 修复法宝
  repairArtifact(artifactId) {
    const artifact = this.gameState.artifacts.find(a => a.id === artifactId);
    if (!artifact) {
      return { success: false, text: '法宝不存在' };
    }

    if (!artifact.broken) {
      return { success: false, text: '法宝未损坏' };
    }

    // 修复材料
    const materials = [
      { id: 'iron', count: 5, name: '玄铁' },
      { id: 'spirit_crystal', count: 2, name: '灵晶' }
    ];

    for (const mat of materials) {
      if (!this.hasItem(mat.id, mat.count)) {
        return { success: false, text: `缺少${mat.name}x${mat.count}` };
      }
    }

    // 消耗材料
    for (const mat of materials) {
      this.removeItem(mat.id, mat.count);
    }

    // 修复
    artifact.broken = false;
    artifact.durability = 100;

    return {
      success: true,
      text: `${artifact.name}修复成功`,
      artifact
    };
  }

  // 检查物品
  hasItem(itemId, count) {
    const inventory = this.gameState.inventory || [];
    const item = inventory.find(i => i.id === itemId);
    return item && item.count >= count;
  }

  // 移除物品
  removeItem(itemId, count) {
    const inventory = this.gameState.inventory || [];
    const item = inventory.find(i => i.id === itemId);
    if (!item || item.count < count) return false;

    item.count -= count;
    if (item.count <= 0) {
      const index = inventory.indexOf(item);
      inventory.splice(index, 1);
    }

    return true;
  }
}
