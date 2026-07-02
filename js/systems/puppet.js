// 傀儡系统
export class PuppetSystem {
  constructor(gameState) {
    this.gameState = gameState;
    // 傀儡品阶
    this.grades = [
      { name: '初级', realm: '练气', combatPower: 1, energyCost: 1 },
      { name: '中级', realm: '筑基', combatPower: 3, energyCost: 3 },
      { name: '高级', realm: '金丹', combatPower: 10, energyCost: 7 },
      { name: '顶级', realm: '元婴', combatPower: 30, energyCost: 15 },
      { name: '上古', realm: '化神', combatPower: 100, energyCost: 30 },
      { name: '通天', realm: '炼虚', combatPower: 300, energyCost: 60 }
    ];
  }

  // 获取傀儡列表
  getPuppets() {
    return this.gameState.puppets || [];
  }

  // 制作傀儡
  craft(gradeIndex) {
    const grade = this.grades[gradeIndex];
    if (!grade) {
      return { success: false, text: '无效品阶' };
    }

    // 检查材料
    const materials = this.getMaterials(gradeIndex);
    for (const material of materials) {
      const item = this.gameState.inventory.find(i => i.id === material.id);
      if (!item || item.count < material.count) {
        return { success: false, text: '材料不足' };
      }
    }

    // 消耗材料
    for (const material of materials) {
      const item = this.gameState.inventory.find(i => i.id === material.id);
      item.count -= material.count;
      if (item.count <= 0) {
        this.gameState.inventory.splice(this.gameState.inventory.indexOf(item), 1);
      }
    }

    // 制作成功率
    let successRate = 60;
    successRate += (this.gameState.puppetLevel || 0) * 2;
    successRate -= gradeIndex * 5;

    const roll = Math.random() * 100;
    if (roll >= successRate) {
      return { success: false, text: '制作失败，材料损毁' };
    }

    // 创建傀儡
    const puppet = {
      id: 'puppet_' + Date.now(),
      name: `${grade.name}傀儡`,
      grade: gradeIndex,
      gradeName: grade.name,
      hp: 100 * (gradeIndex + 1),
      maxHp: 100 * (gradeIndex + 1),
      atk: 20 * (gradeIndex + 1),
      def: 10 * (gradeIndex + 1),
      energy: 100,
      maxEnergy: 100,
      mode: 'balanced',
      deployed: false,
      task: null
    };

    // 大成功
    if (roll < 5) {
      puppet.atk *= 2;
      puppet.def *= 2;
      puppet.name = `强化${puppet.name}`;
    }

    this.gameState.puppets = this.gameState.puppets || [];
    this.gameState.puppets.push(puppet);

    return {
      success: true,
      text: `制作成功！获得${puppet.name}`,
      puppet
    };
  }

  // 获取材料
  getMaterials(gradeIndex) {
    const materialSets = [
      [{ id: 'iron', count: 5 }, { id: 'herb', count: 3 }],
      [{ id: 'iron', count: 15 }, { id: 'herb', count: 10 }, { id: 'beast_core', count: 1 }],
      [{ id: 'iron', count: 30 }, { id: 'herb', count: 20 }, { id: 'beast_core', count: 5 }],
      [{ id: 'iron', count: 50 }, { id: 'purple_fungus', count: 10 }, { id: 'demon_core', count: 3 }],
      [{ id: 'iron', count: 100 }, { id: 'purple_fungus', count: 30 }, { id: 'demon_core', count: 10 }],
      [{ id: 'iron', count: 200 }, { id: 'purple_fungus', count: 50 }, { id: 'demon_core', count: 20 }]
    ];

    return materialSets[gradeIndex] || materialSets[0];
  }

  // 设置模式
  setMode(puppetId, mode) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    puppet.mode = mode;
    return {
      success: true,
      text: `${puppet.name}切换为${mode}模式`
    };
  }

  // 部署傀儡
  deploy(puppetId, task) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    if (puppet.energy < 10) {
      return { success: false, text: '能量不足' };
    }

    puppet.deployed = true;
    puppet.task = task;

    return {
      success: true,
      text: `${puppet.name}已部署，执行${task}`
    };
  }

  // 收回傀儡
  recall(puppetId) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    puppet.deployed = false;
    puppet.task = null;

    return {
      success: true,
      text: `${puppet.name}已收回`
    };
  }

  // 灌注能量
  charge(puppetId) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    const grade = this.grades[puppet.grade];
    const days = grade.energyCost;

    // 消耗时间
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    // 恢复能量
    puppet.energy = puppet.maxEnergy;

    return {
      success: true,
      text: `灌注${days}天，${puppet.name}能量已满`
    };
  }

  // 灵石驱动
  chargeWithStones(puppetId, stones) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    if (this.gameState.player.spiritStones < stones) {
      return { success: false, text: '灵石不足' };
    }

    this.gameState.player.spiritStones -= stones;

    // 1灵石=10能量
    const energyGain = stones * 10;
    puppet.energy = Math.min(puppet.energy + energyGain, puppet.maxEnergy);

    return {
      success: true,
      text: `消耗${stones}灵石，${puppet.name}能量+${energyGain}`
    };
  }

  // 傀儡劳作
  work(puppetId, task) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    if (puppet.energy < 20) {
      return { success: false, text: '能量不足' };
    }

    puppet.deployed = true;
    puppet.task = task;

    // 消耗能量
    puppet.energy -= 20;

    // 根据任务给予奖励
    const rewards = {
      mine: { id: 'iron', count: Math.floor(puppet.atk / 10) },
      gather: { id: 'herb', count: Math.floor(puppet.atk / 10) },
      patrol: { exp: Math.floor(puppet.atk * 0.5) }
    };

    const reward = rewards[task];
    if (reward) {
      if (reward.id) {
        this.addItem(reward.id, reward.count);
      }
      if (reward.exp) {
        const maxExp = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.maxExp || 999999;
        this.gameState.player.exp = Math.min(this.gameState.player.exp + reward.exp, maxExp);
      }
    }

    return {
      success: true,
      text: `${puppet.name}执行${task}任务`,
      reward
    };
  }

  // 傀儡AI行为（GDD: 傀儡有AI行为树）
  aiAction(puppetId) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet || !puppet.deployed) {
      return null;
    }

    // 能量检查
    if (puppet.energy < 10) {
      return { type: 'rest', text: `${puppet.name}能量不足，需要休息` };
    }

    // 根据模式执行不同行为
    switch (puppet.mode) {
      case 'aggressive':
        // 攻击模式：优先攻击
        return this.aiAttack(puppet);
      case 'defensive':
        // 防御模式：优先防御
        return this.aiDefend(puppet);
      case 'balanced':
        // 平衡模式：根据情况选择
        return this.aiBalanced(puppet);
      case 'gather':
        // 采集模式：自动采集资源
        return this.aiGather(puppet);
      default:
        return this.aiBalanced(puppet);
    }
  }

  // AI攻击行为
  aiAttack(puppet) {
    puppet.energy -= 10;
    const damage = puppet.atk;
    return {
      type: 'attack',
      damage,
      text: `${puppet.name}发起攻击，造成${damage}伤害`
    };
  }

  // AI防御行为
  aiDefend(puppet) {
    puppet.energy -= 5;
    return {
      type: 'defend',
      defense: puppet.def * 2,
      text: `${puppet.name}进入防御状态，防御力翻倍`
    };
  }

  // AI平衡行为
  aiBalanced(puppet) {
    // 50%概率攻击，50%概率防御
    if (Math.random() < 0.5) {
      return this.aiAttack(puppet);
    } else {
      return this.aiDefend(puppet);
    }
  }

  // AI采集行为
  aiGather(puppet) {
    puppet.energy -= 15;

    // 随机采集资源
    const resources = [
      { id: 'iron', count: Math.floor(puppet.atk / 10) },
      { id: 'herb', count: Math.floor(puppet.atk / 10) },
      { id: 'purple_fungus', count: Math.floor(puppet.atk / 20) }
    ];

    const resource = resources[Math.floor(Math.random() * resources.length)];
    this.addItem(resource.id, resource.count);

    return {
      type: 'gather',
      text: `${puppet.name}采集到${resource.id} x${resource.count}`
    };
  }

  // 傀儡守家功能（GDD: 傀儡可以守家）
  guardHome(puppetId) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) {
      return { success: false, text: '傀儡不存在' };
    }

    if (puppet.energy < 30) {
      return { success: false, text: '能量不足，无法守家' };
    }

    puppet.deployed = true;
    puppet.task = 'guard';
    puppet.mode = 'defensive';

    // 消耗能量
    puppet.energy -= 30;

    // 设置守家buff（防御力+50%持续24小时）
    this.gameState.buffs = this.gameState.buffs || [];
    this.gameState.buffs.push({
      type: 'guard',
      defenseBonus: 0.5,
      duration: 24,
      source: puppet.name
    });

    return {
      success: true,
      text: `${puppet.name}开始守家，防御力+50%持续24小时`
    };
  }

  // 傀儡战斗协助
  combatAssist(puppetId) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet || !puppet.deployed) {
      return null;
    }

    if (puppet.energy < 20) {
      return null;
    }

    // 消耗能量
    puppet.energy -= 20;

    // 协助攻击
    const damage = Math.floor(puppet.atk * 0.5);
    return {
      type: 'assist',
      damage,
      text: `${puppet.name}协助攻击，造成${damage}伤害`
    };
  }

  // 添加物品
  addItem(id, count) {
    const existing = this.gameState.inventory.find(i => i.id === id);
    if (existing) {
      existing.count += count;
    } else {
      this.gameState.inventory.push({
        id,
        name: id,
        type: 'material',
        count
      });
    }
  }

  // 战斗中傀儡行动
  combatAction(puppet) {
    if (!puppet.deployed || puppet.hp <= 0 || puppet.energy <= 0) return null;

    puppet.energy -= 5;

    const mode = puppet.mode;
    let action;

    switch (mode) {
      case 'aggressive':
        action = { type: 'attack', damage: puppet.atk * 1.5, text: `${puppet.name}全力攻击` };
        break;
      case 'defensive':
        action = { type: 'defense', reduction: 0.5, text: `${puppet.name}进入防御模式` };
        break;
      case 'balanced':
      default:
        action = { type: 'attack', damage: puppet.atk, text: `${puppet.name}攻击` };
        break;
    }

    return action;
  }

  // 获取傀儡信息
  getInfo(puppetId) {
    const puppet = this.gameState.puppets.find(p => p.id === puppetId);
    if (!puppet) return null;

    return {
      ...puppet,
      grade: this.grades[puppet.grade],
      energyPercent: (puppet.energy / puppet.maxEnergy * 100).toFixed(1)
    };
  }
}
