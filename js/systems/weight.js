// 背包重量系统 - 负重上限/超重惩罚/储物法宝
export class WeightSystem {
  constructor(gameState) {
    this.gameState = gameState;
    
    // 各境界负重上限（GDD原文）
    this.weightLimits = {
      0: 10,      // 凡人
      1: 25,      // 练气
      2: 50,      // 筑基
      3: 100,     // 金丹
      4: 200,     // 元婴
      5: 350,     // 化神
      6: 600,     // 炼虚
      7: 1000,    // 合体
      8: 2000,    // 大乘
      9: 3500,    // 渡劫
      10: 10000,  // 真仙
      11: 50000,  // 金仙
      12: 200000, // 太乙
      13: 1000000, // 大罗
      14: Infinity // 道祖
    };
    
    // 超重惩罚等级（GDD原文）
    this.weightPenalties = [
      { min: 0, max: 1.0, name: '正常', effects: {} },
      { min: 1.0, max: 1.2, name: '轻度超重', effects: { speed: -0.2, dodge: -0.1 } },
      { min: 1.2, max: 1.5, name: '中度超重', effects: { speed: -0.4, dodge: -0.2, defense: -0.1 } },
      { min: 1.5, max: 2.0, name: '重度超重', effects: { speed: -0.6, allStats: -0.2 } },
      { min: 2.0, max: 3.0, name: '严重超重', effects: { noCombat: true, slowMove: true } },
      { min: 3.0, max: Infinity, name: '无法移动', effects: { cannotMove: true } }
    ];
    
    // 物品重量表（示例）
    this.itemWeights = {
      // 丹药
      'heal_pill': 0.1,
      'mp_pill': 0.1,
      'peiyuan': 0.2,
      'zhuji': 0.5,
      'dan_gold': 1.0,
      'huaying': 2.0,
      'huashen': 5.0,
      'focus_pill': 0.3, // 凝神丹
      
      // 材料
      'herb': 0.05,
      'beast_core': 0.1,
      'iron': 0.2,
      'stone': 0.01,
      'spirit_crystal': 0.05,
      'immortal_stone': 0.1,
      
      // 符箓
      'fire_talisman': 0.05,
      'ice_talisman': 0.05,
      'shield_talisman': 0.1,
      'hide_talisman': 0.1,
      'light_talisman': 0.1,
      'thunder_talisman': 0.1,
      'teleport_talisman': 0.5,
      
      // 法宝（基础）
      'iron_sword': 1.0,
      'iron_shield': 2.0,
      'wood_sword': 0.8,
      'stone_hammer': 1.5,
      'jade_pendant': 0.3,
      'xuantie_sword': 2.0,
      
      // 功法
      'skill_scroll': 0.3,  // 此ID未在items.js中使用，保留作为功法书权重
      
      // 事件链物品
      'treasure_map_1': 0.1,
      'treasure_map_2': 0.1,
      'treasure_map_3': 0.1,
      'realm_clue_1': 0.1,
      'realm_clue_2': 0.1,
      'realm_clue_3': 0.1,
      'blood_realm_token': 0.2,
      'seal_fragment_1': 0.3,
      'seal_fragment_2': 0.3,
      'seal_fragment_3': 0.3,
      'kunwu_key': 0.5,
      'guangling_token': 0.5,
      'xutian_ding_recipe': 0.2,
      'fansheng_remnant': 0.3,
      'guangling_jing': 0.5
    };
    
    // 储物法宝类型
    this.storageArtifacts = {
      'storage_ring': { name: '储物戒指', capacity: 50, weight: 0.5 },
      'storage_bag': { name: '储物袋', capacity: 100, weight: 1.0 },
      'storage_box': { name: '储物箱', capacity: 200, weight: 2.0 },
      'storage_palace': { name: '须弥宫殿', capacity: 1000, weight: 5.0 }
    };
  }
  
  // 获取当前负重上限
  getWeightLimit() {
    const realmIdx = this.gameState.player.realmIdx || 0;
    let baseLimit = this.weightLimits[realmIdx] || 10;

    // 空间法宝加成（增加背包容量）
    const artifacts = this.gameState.artifacts || [];
    for (const artifact of artifacts) {
      if (artifact.equipped && artifact.type === 'space') {
        baseLimit += artifact.slots || 0;
      }
    }

    return baseLimit;
  }
  
  // 计算当前负重
  calculateWeight() {
    let totalWeight = 0;
    const inventory = this.gameState.inventory || [];
    
    for (const item of inventory) {
      const itemWeight = this.getItemWeight(item.id);
      totalWeight += itemWeight * item.count;
    }
    
    // 加上装备的法宝重量
    const artifacts = this.gameState.artifacts || [];
    for (const artifact of artifacts) {
      if (artifact.equipped) {
        totalWeight += artifact.weight || 0;
      }
    }
    
    // 加上储物法宝的重量（但不算内部物品）
    const storageArtifacts = this.gameState.storageArtifacts || [];
    for (const storage of storageArtifacts) {
      totalWeight += storage.weight || 0;
    }
    
    return totalWeight;
  }
  
  // 获取物品重量
  getItemWeight(itemId) {
    // 检查是否是储物法宝（内部物品不计重）
    if (this.storageArtifacts[itemId]) {
      return this.storageArtifacts[itemId].weight;
    }
    
    return this.itemWeights[itemId] || 0.1; // 默认0.1
  }
  
  // 检查是否超重
  checkOverweight() {
    const currentWeight = this.calculateWeight();
    const weightLimit = this.getWeightLimit();
    const weightRatio = currentWeight / weightLimit;
    
    // 找到对应的惩罚等级
    for (const penalty of this.weightPenalties) {
      if (weightRatio >= penalty.min && weightRatio < penalty.max) {
        return {
          overweight: weightRatio > 1.0,
          ratio: weightRatio,
          current: currentWeight,
          limit: weightLimit,
          penalty,
          effects: penalty.effects
        };
      }
    }
    
    return {
      overweight: false,
      ratio: weightRatio,
      current: currentWeight,
      limit: weightLimit,
      penalty: this.weightPenalties[0],
      effects: {}
    };
  }
  
  // 应用超重惩罚到属性
  applyWeightPenalties() {
    const overweightStatus = this.checkOverweight();
    if (!overweightStatus.overweight) return;
    
    const effects = overweightStatus.effects;
    const player = this.gameState.player;
    
    // 临时存储原始属性
    player._originalStats = player._originalStats || {
      speed: player.speed,
      dodge: player.dodge,
      defense: player.defense
    };
    
    // 应用惩罚
    if (effects.speed) {
      player.speed = Math.floor(player._originalStats.speed * (1 + effects.speed));
    }
    if (effects.dodge) {
      player.dodge = Math.floor((player._originalStats.dodge || 0) * (1 + effects.dodge));
    }
    if (effects.defense) {
      player.defense = Math.floor(player._originalStats.defense * (1 + effects.defense));
    }
    if (effects.allStats) {
      player.speed = Math.floor(player._originalStats.speed * (1 + effects.allStats));
      player.attack = Math.floor((player.attack || 0) * (1 + effects.allStats));
      player.defense = Math.floor((player._originalStats.defense || 0) * (1 + effects.allStats));
    }
  }
  
  // 恢复原始属性
  restoreOriginalStats() {
    const player = this.gameState.player;
    if (player._originalStats) {
      player.speed = player._originalStats.speed;
      player.dodge = player._originalStats.dodge;
      player.defense = player._originalStats.defense;
      delete player._originalStats;
    }
  }
  
  // 检查是否可以移动
  canMove() {
    const overweightStatus = this.checkOverweight();
    return !overweightStatus.effects.cannotMove;
  }
  
  // 检查是否可以战斗
  canCombat() {
    const overweightStatus = this.checkOverweight();
    return !overweightStatus.effects.noCombat;
  }
  
  // 获取超重状态描述
  getWeightStatusText() {
    const overweightStatus = this.checkOverweight();
    const ratio = overweightStatus.ratio;
    
    if (ratio <= 1.0) {
      return `负重：${overweightStatus.current.toFixed(1)}/${overweightStatus.limit} (${(ratio * 100).toFixed(0)}%)`;
    } else {
      return `超重：${overweightStatus.current.toFixed(1)}/${overweightStatus.limit} (${(ratio * 100).toFixed(0)}%) ${overweightStatus.penalty.name}`;
    }
  }
  
  // 添加物品到背包
  addItem(itemId, count = 1) {
    // 检查添加后是否超重
    const currentWeight = this.calculateWeight();
    const itemWeight = this.getItemWeight(itemId) * count;
    const weightLimit = this.getWeightLimit();
    
    if (currentWeight + itemWeight > weightLimit * 3) {
      return { success: false, text: '背包已满，无法携带更多物品' };
    }
    
    // 添加物品
    const inventory = this.gameState.inventory || [];
    const existing = inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
      if (!existing.name || !existing.type) {
        // 补充缺失的名称和类型
        const gameData = window.gameData || {};
        const ITEMS = gameData.ITEMS || {};
        const allItems = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || []), ...(ITEMS.specials || [])];
        const itemData = allItems.find(i => i.id === itemId);
        if (itemData) {
          existing.name = existing.name || itemData.name || itemId;
          existing.type = existing.type || itemData.type || 'material';
          existing.icon = existing.icon || itemData.icon || '📦';
        }
      }
    } else {
      // 查找物品的完整数据
      const gameData = window.gameData || {};
      const ITEMS = gameData.ITEMS || {};
      const allItems = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || []), ...(ITEMS.specials || [])];
      const itemData = allItems.find(i => i.id === itemId);
      inventory.push({ 
        id: itemId, 
        count, 
        name: itemData?.name || itemId,
        type: itemData?.type || 'material',
        icon: itemData?.icon || '📦'
      });
    }
    this.gameState.inventory = inventory;
    
    // 获取物品名
    const gameData = window.gameData || {};
    const ITEMS = gameData.ITEMS || {};
    const allItems = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || []), ...(ITEMS.specials || [])];
    const itemData = allItems.find(i => i.id === itemId);
    const itemName = itemData?.name || itemId;

    // 检查超重警告
    const overweightStatus = this.checkOverweight();
    if (overweightStatus.overweight) {
      return { 
        success: true, 
        text: `获得${itemName} x${count}`,
        warning: `背包超重！${overweightStatus.penalty.name}`
      };
    }
    
    return { success: true, text: `获得${itemName} x${count}` };
  }
  
  // 从背包移除物品
  removeItem(itemId, count = 1) {
    const inventory = this.gameState.inventory || [];
    const existing = inventory.find(i => i.id === itemId);
    
    if (!existing || existing.count < count) {
      return { success: false, text: '物品不足' };
    }
    
    existing.count -= count;
    if (existing.count <= 0) {
      const index = inventory.indexOf(existing);
      inventory.splice(index, 1);
    }
    
    this.gameState.inventory = inventory;
    
    // 移除后检查是否恢复
    const overweightStatus = this.checkOverweight();
    if (!overweightStatus.overweight) {
      this.restoreOriginalStats();
    }
    
    return { success: true, text: `移除${itemId} x${count}` };
  }
  
  // 获取储物法宝列表
  getStorageArtifacts() {
    return this.gameState.storageArtifacts || [];
  }
  
  // 添加储物法宝
  addStorageArtifact(artifactId) {
    const storageInfo = this.storageArtifacts[artifactId];
    if (!storageInfo) return { success: false, text: '未知的储物法宝' };
    
    const storageArtifacts = this.gameState.storageArtifacts || [];
    if (storageArtifacts.some(s => s.id === artifactId)) {
      return { success: false, text: '已拥有该储物法宝' };
    }
    
    storageArtifacts.push({
      id: artifactId,
      name: storageInfo.name,
      capacity: storageInfo.capacity,
      weight: storageInfo.weight,
      items: []
    });
    
    this.gameState.storageArtifacts = storageArtifacts;
    return { success: true, text: `获得${storageInfo.name}` };
  }
  
  // 计算储物法宝总容量
  getStorageCapacity() {
    const storageArtifacts = this.gameState.storageArtifacts || [];
    return storageArtifacts.reduce((total, s) => total + s.capacity, 0);
  }
  
  // 计算储物法宝内物品总重量
  getStorageWeight() {
    const storageArtifacts = this.gameState.storageArtifacts || [];
    let totalWeight = 0;
    
    for (const storage of storageArtifacts) {
      for (const item of storage.items || []) {
        totalWeight += this.getItemWeight(item.id) * item.count;
      }
    }
    
    return totalWeight;
  }
}