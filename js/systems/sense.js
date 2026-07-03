// 神识系统 - 完整版（GDD一比一还原）
export class SenseSystem {
  constructor(gameState) {
    this.gameState = gameState;
    // 神识等级
    this.levels = [
      { name: '凡人级', maxSense: 10 },
      { name: '练气级', maxSense: 30 },
      { name: '筑基级', maxSense: 80 },
      { name: '金丹级', maxSense: 200 },
      { name: '元婴级', maxSense: 500 },
      { name: '化神级', maxSense: 1200 },
      { name: '炼虚级', maxSense: 3000 },
      { name: '合体级', maxSense: 8000 },
      { name: '大乘级', maxSense: 20000 },
      { name: '渡劫级', maxSense: 50000 },
      { name: '真仙级', maxSense: 200000 },
      { name: '金仙级', maxSense: 1000000 },
      { name: '太乙级', maxSense: 5000000 },
      { name: '大罗级', maxSense: 20000000 },
      { name: '道祖级', maxSense: 100000000 }
    ];
    
    // 4种修炼方式（GDD第969-978行）
    this.trainMethods = {
      // 冥想：消耗5天，神识+3~8，风险无
      meditation: {
        id: 'meditation',
        name: '冥想',
        icon: ' ',
        days: 5,
        minGain: 3,
        maxGain: 8,
        risk: '无',
        riskChance: 0,
        cooldown: 0,
        requirement: null
      },
      // 魂海探索：消耗20天，神识+12~30，风险低概率魂兽
      soul_exploration: {
        id: 'soul_exploration',
        name: '魂海探索',
        icon: ' ',
        days: 20,
        minGain: 12,
        maxGain: 30,
        risk: '低概率魂兽',
        riskChance: 0.15, // 15%概率触发魂兽入侵
        cooldown: 0,
        requirement: null
      },
      // 神识冲穴：消耗30天，神识+40~80，风险失败反噬需休养
      soul_breakthrough: {
        id: 'soul_breakthrough',
        name: '神识冲穴',
        icon: '⚡',
        days: 30,
        minGain: 40,
        maxGain: 80,
        risk: '失败反噬需休养',
        riskChance: 0.25, // 25%概率反噬
        cooldown: 10, // 冷却10天
        requirement: null
      },
      // 凝神修炼：消耗凝神丹×1，神识+60，风险无
      focus_cultivation: {
        id: 'focus_cultivation',
        name: '凝神修炼',
        icon: '✨',
        days: 0, // 不消耗天数，消耗物品
        minGain: 60,
        maxGain: 60,
        risk: '无',
        riskChance: 0,
        cooldown: 0,
        requirement: { item: 'focus_pill', count: 1 } // 需要凝神丹
      }
    };
    
    // 冷却状态
    this.cooldowns = gameState.senseCooldowns || {};
  }

  // 获取当前神识等级
  getCurrentLevel() {
    const sense = this.gameState.player.sense;
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (sense >= this.levels[i].maxSense * 0.1) {
        return this.levels[i];
      }
    }
    return this.levels[0];
  }

  // 获取修炼方式信息
  getTrainMethodInfo(methodId) {
    return this.trainMethods[methodId] || null;
  }

  // 获取所有修炼方式状态
  getAllMethodsStatus() {
    const currentDay = this.gameState.gameTime?.totalDays || 0;
    
    return Object.values(this.trainMethods).map(method => {
      // 检查冷却
      const cooldownEnd = this.cooldowns[method.id] || 0;
      const onCooldown = currentDay < cooldownEnd;
      const cooldownRemaining = onCooldown ? cooldownEnd - currentDay : 0;
      
      // 检查需求
      let requirementMet = true;
      let requirementText = '';
      if (method.requirement) {
        if (method.requirement.item) {
          const hasItem = this.hasItem(method.requirement.item);
          requirementMet = hasItem;
          // 物品名称映射
          const itemNames = {
            'focus_pill': '凝神丹'
          };
          const itemName = itemNames[method.requirement.item] || method.requirement.item;
          requirementText = hasItem ? '' : `需要${itemName}`;
        }
      }
      
      return {
        ...method,
        onCooldown,
        cooldownRemaining,
        requirementMet,
        requirementText,
        available: !onCooldown && requirementMet
      };
    });
  }

  // 执行修炼
  train(methodId) {
    const method = this.trainMethods[methodId];
    if (!method) {
      return { success: false, text: '未知的修炼方式' };
    }

    // 神识上限：不能超过当前修为境界对应神识的2倍（同境界两倍封顶）
    const realmSense = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.sense || 10;
    const senseCap = Math.max(realmSense * 2, 10);
    if (this.gameState.player.sense >= senseCap) {
      return { success: false, text: `神识已达修为上限（${senseCap}），请先突破境界` };
    }
    
    const currentDay = this.gameState.gameTime?.totalDays || 0;
    
    // 检查冷却
    const cooldownEnd = this.cooldowns[method.id] || 0;
    if (currentDay < cooldownEnd) {
      return { success: false, text: `冷却中，还需${cooldownEnd - currentDay}天` };
    }
    
    // 检查需求
    if (method.requirement) {
      if (method.requirement.item) {
        if (!this.hasItem(method.requirement.item)) {
          return { success: false, text: `缺少${method.requirement.item}` };
        }
      }
    }
    
    // 消耗物品
    if (method.requirement?.item) {
      this.removeItem(method.requirement.item, method.requirement.count || 1);
    }
    
    // 消耗天数
    if (method.days > 0) {
      this.gameState.gameTime.day += method.days;
      this.gameState.gameTime.totalDays += method.days;
      this.gameState.player.age += method.days / 360;
    }
    
    // 计算收益
    let gain = Math.floor(Math.random() * (method.maxGain - method.minGain + 1)) + method.minGain;
    
    // 悟性加成
    gain = Math.floor(gain * (1 + this.gameState.player.comprehension * 0.01));
    
    // 功法加成
    if (this.gameState.skills?.sub?.some(s => s.id === 'dayan')) {
      gain = Math.floor(gain * 1.5);
    }
    
    // 应用收益（钳制不超过境界上限）
    const beforeSense = this.gameState.player.sense;
    this.gameState.player.sense = Math.min(beforeSense + gain, senseCap);
    
    // 设置冷却
    if (method.cooldown > 0) {
      this.cooldowns[method.id] = currentDay + method.days + method.cooldown;
      this.gameState.senseCooldowns = this.cooldowns;
    }
    
    // 检查风险
    let riskResult = null;
    if (method.riskChance > 0 && Math.random() < method.riskChance) {
      riskResult = this.triggerRisk(method);
    }
    
    return {
      success: true,
      method: method.name,
      days: method.days,
      gain,
      risk: riskResult,
      text: `${method.name}${method.days > 0 ? `${method.days}天` : ''}，神识+${gain}${riskResult ? `，${riskResult.text}` : ''}`
    };
  }

  // 触发风险
  triggerRisk(method) {
    switch (method.id) {
      case 'soul_exploration':
        // 魂海探索：低概率魂兽入侵
        return this.triggerSoulBeast();
      case 'soul_breakthrough':
        // 神识冲穴：失败反噬
        return this.triggerBacklash();
      default:
        return null;
    }
  }

  // 魂兽入侵事件
  triggerSoulBeast() {
    const playerSense = this.gameState.player.sense;
    const beastSense = Math.floor(playerSense * (0.8 + Math.random() * 0.4)); // 魂兽神识80%~120%
    
    // 神识对抗
    if (playerSense >= beastSense) {
      // 成功抵御
      const bonus = Math.floor(beastSense * 0.1); // 击杀魂兽获得额外神识
      this.gameState.player.sense += bonus;
      return {
        type: 'soul_beast_win',
        text: `遭遇魂兽入侵！神识对抗成功，击杀魂兽，神识+${bonus}`,
        beastSense,
        bonus
      };
    } else {
      // 失败被反噬
      const loss = Math.floor(playerSense * 0.2); // 损失20%神识
      this.gameState.player.sense = Math.max(1, this.gameState.player.sense - loss);
      return {
        type: 'soul_beast_lose',
        text: `遭遇魂兽入侵！神识对抗失败，被魂兽反噬，神识-${loss}`,
        beastSense,
        loss
      };
    }
  }

  // 神识冲穴反噬
  triggerBacklash() {
    const playerSense = this.gameState.player.sense;
    const loss = Math.floor(playerSense * 0.3); // 损失30%神识
    this.gameState.player.sense = Math.max(1, this.gameState.player.sense - loss);
    
    // 设置休养状态（修炼速度减半3天）
    this.gameState.buffs = this.gameState.buffs || [];
    this.gameState.buffs.push({
      type: 'sense_backlash',
      duration: 3,
      effect: { cultivationSpeed: 0.5 }
    });
    
    return {
      type: 'backlash',
      text: `神识冲穴失败！反噬严重，神识-${loss}，需休养3天`,
      loss
    };
  }

  // 神识探查
  probe(targetSense) {
    const playerSense = this.gameState.player.sense;

    if (playerSense >= targetSense * 2) {
      return { success: true, level: 'perfect', text: '完美探查，获得全部信息' };
    } else if (playerSense >= targetSense) {
      return { success: true, level: 'good', text: '探查成功，获得部分信息' };
    } else if (playerSense >= targetSense * 0.5) {
      return { success: true, level: 'partial', text: '勉强探查，获得少量信息' };
    } else {
      // 探查失败惩罚
      const penalty = this.getFailPenalty();
      return { success: false, level: 'fail', text: `探查失败！${penalty.text}`, penalty };
    }
  }

  // 获取失败惩罚
  getFailPenalty() {
    const penalties = [
      { type: 'backlash', text: '神识反噬，神识-30%', value: 0.3 },
      { type: 'beast', text: '惊动妖兽，强制战斗', value: 0 },
      { type: 'trap', text: '触发禁制，气血-20%', value: 0.2 },
      { type: 'lost', text: '迷失方向，额外消耗5天', value: 5 },
      { type: 'tracked', text: '被追踪，暴露位置', value: 0 }
    ];

    const penalty = penalties[Math.floor(Math.random() * penalties.length)];

    // 应用惩罚
    switch (penalty.type) {
      case 'backlash':
        this.gameState.player.sense = Math.floor(this.gameState.player.sense * (1 - penalty.value));
        break;
      case 'trap':
        this.gameState.player.hp = Math.floor(this.gameState.player.hp * (1 - penalty.value));
        break;
      case 'lost':
        this.gameState.gameTime.day += penalty.value;
        this.gameState.gameTime.totalDays += penalty.value;
        this.gameState.player.age += penalty.value / 360;
        break;
    }

    return penalty;
  }

  // 神识拼斗
  battle(enemySense) {
    const playerSense = this.gameState.player.sense;
    const ratio = playerSense / enemySense;

    // 神识技能
    const skills = [
      { name: '平刺', cost: 0.05, power: 0.8 },
      { name: '重击', cost: 0.15, power: 1.5 },
      { name: '魂刺', cost: 0.02, power: 3.0, permanent: true },
      { name: '壁垒', cost: 0.03, power: 0.3, defense: true },
      { name: '震慑', cost: 0.10, power: 2.0, stun: true }
    ];

    return {
      playerSense,
      enemySense,
      ratio,
      skills,
      advantage: ratio > 1 ? 'player' : ratio < 1 ? 'enemy' : 'equal'
    };
  }

  // 获取神识信息
  getInfo() {
    const sense = this.gameState.player.sense;
    const level = this.getCurrentLevel();

    return {
      sense,
      level: level.name,
      maxSense: level.maxSense,
      percentage: Math.min((sense / level.maxSense) * 100, 100)
    };
  }

  // 辅助方法：检查物品
  hasItem(itemId) {
    const inventory = this.gameState.inventory || [];
    return inventory.some(i => i.id === itemId && i.count > 0);
  }

  // 辅助方法：移除物品
  removeItem(itemId, count = 1) {
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