// 炼丹系统
export class AlchemySystem {
  constructor(gameState) {
    this.gameState = gameState;
    this.level = 1;
    this.exp = 0;
  }

  // 获取炼丹成功率
  getSuccessRate(recipe) {
    let rate = 50;

    // 炼丹等级加成
    rate += this.level * 3;

    // 悟性加成
    rate += Math.min(this.gameState.player.comprehension * 0.1, 15);

    // 品质惩罚
    const gradePenalty = {
      '凡级': 0, '灵级': 10, '地级': 20, '天级': 30, '仙级': 40
    };
    rate -= gradePenalty[recipe.grade] || 0;

    return Math.min(Math.max(rate, 20), 95);
  }

  // 炼丹
  refine(recipeId) {
    const { ITEMS } = window.gameData;
    const recipe = ITEMS.pills.find(p => p.id === recipeId);

    if (!recipe) {
      return { success: false, text: '配方不存在' };
    }

    // 检查材料
    for (const material of recipe.materials) {
      if (!this.gameState.inventory.some(i => i.id === material.id && i.count >= material.count)) {
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
    const rate = this.getSuccessRate(recipe);
    const roll = Math.random() * 100;

    if (roll < rate) {
      // 成功
      const quality = this.calcQuality();
      this.gameState.inventory.push({
        id: recipe.id,
        name: recipe.name,
        icon: ' ',
        type: 'pill',
        count: 1,
        quality
      });

      // 增加炼丹经验
      this.addExp(recipe.grade);

      return {
        success: true,
        text: `炼丹成功！获得${recipe.name}（${quality}品质）`,
        quality
      };
    } else {
      // 失败
      return {
        success: false,
        text: '炼丹失败，材料损毁'
      };
    }
  }

  // 计算品质
  calcQuality() {
    const roll = Math.random() * 100;

    if (roll < 2) return '极品';
    if (roll < 10) return '上品';
    if (roll < 30) return '中品';
    return '下品';
  }

  // 添加经验
  addExp(grade) {
    if (this.level >= 10) return false; // 满级不再获取经验

    const expMap = {
      '凡级': 10, '灵级': 30, '地级': 80, '天级': 200, '仙级': 500
    };

    this.exp += expMap[grade] || 10;

    // 升级
    const levelUpExp = this.level * 100;
    if (this.exp >= levelUpExp) {
      this.level++;
      this.exp -= levelUpExp;
      this.gameState.alchemyLevel = this.level;
      return true;
    }

    return false;
  }

  // 获取炼丹信息
  getInfo() {
    return {
      level: this.level,
      exp: this.exp,
      nextLevelExp: this.level * 100,
      successRateBonus: this.level * 3
    };
  }
}
