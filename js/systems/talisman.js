// 制符系统
export class TalismanSystem {
  constructor(gameState) {
    this.gameState = gameState;
    // 制符术等级
    this.levels = [
      { name: '符徒', level: 1, successBonus: 3, canCraft: '灵符', upgradeExp: 5 },
      { name: '符师', level: 4, successBonus: 9, canCraft: '宝符', upgradeExp: 10 },
      { name: '符大师', level: 7, successBonus: 18, canCraft: '古符', upgradeExp: 20 },
      { name: '符宗师', level: 11, successBonus: 30, canCraft: '天符', upgradeExp: 40 },
      { name: '符圣', level: 16, successBonus: 45, canCraft: '仙符', upgradeExp: 80 }
    ];

    // 符箓配方
    this.recipes = {
      // 灵符
      fire_talisman: { name: '火球符', grade: '灵符', materials: [{ id: 'paper', count: 1 }, { id: 'fire_stone', count: 1 }], successRate: 75, exp: 3 },
      ice_talisman: { name: '冰锥符', grade: '灵符', materials: [{ id: 'paper', count: 1 }, { id: 'cold_jade', count: 1 }], successRate: 72, exp: 3 },
      thunder_talisman: { name: '雷击符', grade: '灵符', materials: [{ id: 'paper', count: 1 }, { id: 'thunder_wood', count: 1 }], successRate: 68, exp: 4 },
      shield_talisman: { name: '护身符', grade: '灵符', materials: [{ id: 'paper', count: 1 }, { id: 'herb', count: 2 }], successRate: 80, exp: 2 },
      hide_talisman: { name: '隐匿符', grade: '灵符', materials: [{ id: 'paper', count: 1 }, { id: 'herb', count: 1 }], successRate: 75, exp: 3 },
      escape_talisman: { name: '传送符', grade: '灵符', materials: [{ id: 'paper', count: 1 }, { id: 'space_shard', count: 1 }], successRate: 55, exp: 5 },
      // 宝符
      fire_talisman2: { name: '烈焰符', grade: '宝符', materials: [{ id: 'paper2', count: 1 }, { id: 'fire_stone', count: 3 }], successRate: 60, exp: 8 },
      ice_talisman2: { name: '玄冰符', grade: '宝符', materials: [{ id: 'paper2', count: 1 }, { id: 'cold_jade', count: 3 }], successRate: 58, exp: 8 },
      thunder_talisman2: { name: '紫雷符', grade: '宝符', materials: [{ id: 'paper2', count: 1 }, { id: 'thunder_wood', count: 3 }], successRate: 55, exp: 10 }
    };
  }

  // 获取制符等级
  getCurrentLevel() {
    const level = this.gameState.talismanLevel || 1;
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (level >= this.levels[i].level) {
        return this.levels[i];
      }
    }
    return this.levels[0];
  }

  // 获取成功率
  getSuccessRate(recipeId) {
    const recipe = this.recipes[recipeId];
    if (!recipe) return 0;

    let rate = recipe.successRate;

    // 制符等级加成
    const level = this.getCurrentLevel();
    rate += level.successBonus;

    // 悟性加成
    rate += Math.min((this.gameState.player.comprehension || 50) * 0.1, 15);

    return Math.min(Math.max(rate, 20), 95);
  }

  // 制作符箓
  craft(recipeId) {
    const recipe = this.recipes[recipeId];
    if (!recipe) {
      return { success: false, text: '配方不存在' };
    }

    // 检查材料
    for (const material of recipe.materials) {
      const item = this.gameState.inventory.find(i => i.id === material.id);
      if (!item || item.count < material.count) {
        return { success: false, text: '材料不足' };
      }
    }

    // 消耗材料
    for (const material of recipe.materials) {
      const item = this.gameState.inventory.find(i => i.id === material.id);
      item.count -= material.count;
      if (item.count <= 0) {
        this.gameState.inventory.splice(this.gameState.inventory.indexOf(item), 1);
      }
    }

    // 计算成功率
    const rate = this.getSuccessRate(recipeId);
    const roll = Math.random() * 100;

    if (roll < rate) {
      // 成功
      const existing = this.gameState.inventory.find(i => i.id === recipeId);
      if (existing) {
        existing.count++;
      } else {
        this.gameState.inventory.push({
          id: recipeId,
          name: recipe.name,
          icon: ' ',
          type: 'talisman',
          count: 1
        });
      }

      // 增加经验
      this.addExp(recipe.exp);

      // 成就统计
      this.gameState.stats.talismansCrafted = (this.gameState.stats.talismansCrafted || 0) + 1;

      return {
        success: true,
        text: `制作成功！获得${recipe.name}`,
        item: recipe
      };
    } else {
      return {
        success: false,
        text: '制作失败，材料损毁'
      };
    }
  }

  // 添加经验
  addExp(exp) {
    const currentLevel = this.getCurrentLevel();
    const nextLevel = this.levels.find(l => l.level > currentLevel.level);
    if (!nextLevel) return false; // 满级不再获取经验

    this.gameState.talismanExp = (this.gameState.talismanExp || 0) + exp;

    if (nextLevel) {
      const requiredExp = nextLevel.upgradeExp;
      if (this.gameState.talismanExp >= requiredExp) {
        this.gameState.talismanExp -= requiredExp;
        this.gameState.talismanLevel = nextLevel.level;
        return true;
      }
    }

    return false;
  }

  // 获取制符信息
  getInfo() {
    const level = this.getCurrentLevel();
    const nextLevel = this.levels.find(l => l.level > level.level);

    return {
      level: level.name,
      levelNum: this.gameState.talismanLevel || 1,
      canCraft: level.canCraft,
      exp: this.gameState.talismanExp || 0,
      nextLevelExp: nextLevel?.upgradeExp || 0
    };
  }

  // 获取可用配方
  getAvailableRecipes() {
    const level = this.getCurrentLevel();
    return Object.entries(this.recipes)
      .filter(([_, recipe]) => {
        const gradeIndex = ['灵符', '宝符', '古符', '天符', '仙符'].indexOf(recipe.grade);
        const levelIndex = this.levels.indexOf(level);
        return gradeIndex <= levelIndex;
      })
      .map(([id, recipe]) => ({
        id,
        ...recipe,
        successRate: this.getSuccessRate(id)
      }));
  }
}
