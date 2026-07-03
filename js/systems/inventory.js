// 背包系统
export class InventorySystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  // 使用物品
  useItem(itemId) {
    const item = this.gameState.inventory.find(i => i.id === itemId);
    if (!item || item.count <= 0) return null;

    const { ITEMS } = window.gameData;
    const itemData = [...(ITEMS.pills || []), ...(ITEMS.materials || [])].find(i => i.id === itemId);

    if (!itemData) return null;

    let result = null;

    switch (item.type) {
      case 'pill':
        result = this.usePill(item, itemData);
        break;
      case 'talisman':
        result = this.useTalisman(item, itemData);
        break;
      default:
        return null;
    }

    if (result) {
      item.count--;
      if (item.count <= 0) {
        const index = this.gameState.inventory.indexOf(item);
        this.gameState.inventory.splice(index, 1);
      }
    }

    return result;
  }

  // 使用丹药
  usePill(item, itemData) {
    const player = this.gameState.player;

    switch (itemData.effect.type) {
      case 'heal':
        const healAmount = Math.floor(player.maxHp * itemData.effect.value);
        player.hp = Math.min(player.hp + healAmount, player.maxHp);
        return { type: 'heal', value: healAmount, text: `恢复${healAmount}气血` };

      case 'mp':
        const mpAmount = Math.floor(player.maxMp * itemData.effect.value);
        player.mp = Math.min(player.mp + mpAmount, player.maxMp);
        return { type: 'mp', value: mpAmount, text: `恢复${mpAmount}灵力` };

      case 'exp':
        const maxExp = window.gameData?.REALMS?.[player.realmIdx]?.maxExp || 999999;
        player.exp = Math.min(player.exp + itemData.effect.value, maxExp);
        return { type: 'exp', value: itemData.effect.value, text: `修为+${itemData.effect.value}` };

      case 'breakthrough':
        this.gameState.breakthroughPill = { bonus: itemData.effect.value };
        return { type: 'breakthrough', text: `突破${itemData.effect.realm}期成功率+${itemData.effect.value}%` };

      case 'wash_root':
        // 洗灵丹：重新随机灵根五行数值
        const newRoot = window.game?.generateRoot();
        if (newRoot) {
          player.root = newRoot;
          return { type: 'wash_root', text: `灵根重铸！新灵根：${newRoot.type.name}（${newRoot.mainElement}）` };
        }
        return { type: 'wash_root', text: '灵根重铸失败' };

      case 'protect':
        // 护脉丹：下次突破失败不扣修为
        this.gameState.breakthroughProtect = true;
        return { type: 'protect', text: '获得护脉效果，下次突破失败不扣修为' };

      case 'auto_heal':
        // 护心丹/涅槃丹：濒死自动恢复
        this.gameState.player.buffs = this.gameState.player.buffs || [];
        this.gameState.player.buffs.push({
          type: 'auto_heal',
          value: itemData.effect.value,
          cooldown: itemData.effect.cooldown || 0,
          name: itemData.name
        });
        return { type: 'auto_heal', text: `获得${itemData.name}效果，濒死时自动恢复${Math.floor(itemData.effect.value * 100)}%HP` };

      case 'revive':
        // 轮回丹：满状态复活
        this.gameState.player.buffs = this.gameState.player.buffs || [];
        this.gameState.player.buffs.push({
          type: 'revive',
          value: itemData.effect.value,
          name: itemData.name
        });
        return { type: 'revive', text: `获得${itemData.name}效果，死亡时满状态复活` };

      default:
        return null;
    }
  }

  // 使用符箓
  useTalisman(item, itemData) {
    if (itemData.effect === 'teleport') {
      this.gameState.currentLocation = this.gameState.lastTown || 'tiancheng';
      return { type: 'teleport', text: '传送至城镇' };
    }

    if (itemData.effect === 'hide') {
      this.gameState.player.buffs = this.gameState.player.buffs || [];
      this.gameState.player.buffs.push({ type: 'hide', duration: itemData.duration });
      return { type: 'hide', text: `隐藏气息${itemData.duration}天` };
    }

    if (itemData.effect === 'proxy' || itemData.effect === 'lunhui_proxy') {
      // 替身符/轮回替身符：添加保命buff
      this.gameState.player.buffs = this.gameState.player.buffs || [];
      this.gameState.player.buffs.push({
        type: 'proxy',
        value: itemData.effect.value || 0.5,
        name: itemData.name
      });
      return { type: 'proxy', text: `激活${itemData.name}，可替身承受致命伤害` };
    }

    if (itemData.effect === 'seal' || itemData.effect === 'seal_magic') {
      // 封印符：封印敌人
      return { type: 'seal', duration: itemData.duration, text: `封印敌人${itemData.duration}回合` };
    }

    return { type: 'talisman', data: itemData };
  }

  // 添加物品
  addItem(id, count = 1) {
    const { ITEMS } = window.gameData;
    const itemData = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || []), ...(ITEMS.specials || [])].find(i => i.id === id);

    const existing = this.gameState.inventory.find(i => i.id === id);
    if (existing) {
      existing.count += count;
    } else {
      this.gameState.inventory.push({
        id,
        name: itemData?.name || id,
        icon: itemData?.icon || ' ',
        type: itemData?.type || 'material',
        count
      });
    }
    
    const itemName = itemData?.name || id;
    
    // 重量检查：超重警告
    if (window.game?.systems?.weight) {
      const weightResult = window.game.systems.weight.checkOverweight();
      if (weightResult?.overweight) {
        return { success: true, text: `获得${itemName} x${count}，⚠️超重(${weightResult.penalty?.name})` };
      }
    }
    
    return { success: true, text: `获得${itemName} x${count}` };
  }

  // 移除物品
  removeItem(id, count = 1) {
    // 使用重量系统移除
    if (window.game?.systems?.weight) {
      return window.game.systems.weight.removeItem(id, count);
    }
    
    const item = this.gameState.inventory.find(i => i.id === id);
    if (!item) return false;

    item.count -= count;
    if (item.count <= 0) {
      const index = this.gameState.inventory.indexOf(item);
      this.gameState.inventory.splice(index, 1);
    }

    return true;
  }

  // 检查是否有足够物品
  hasItem(id, count = 1) {
    const item = this.gameState.inventory.find(i => i.id === id);
    return item && item.count >= count;
  }

  // 获取物品数量
  getItemCount(id) {
    const item = this.gameState.inventory.find(i => i.id === id);
    return item ? item.count : 0;
  }

  // 购买物品
  buyItem(id, price) {
    if (this.gameState.player.spiritStones < price) {
      return { success: false, reason: '灵石不足' };
    }

    this.gameState.player.spiritStones -= price;
    this.addItem(id);

    return { success: true, text: `购买成功，花费${price}灵石` };
  }

  // 出售物品
  sellItem(id, price) {
    if (!this.hasItem(id)) {
      return { success: false, reason: '物品不足' };
    }

    this.removeItem(id);
    this.gameState.player.spiritStones += price;

    return { success: true, text: `出售成功，获得${price}灵石` };
  }
}
