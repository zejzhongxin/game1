// 事件链系统 - 5个事件链，多步骤衔接事件
export class EventChainSystem {
  constructor(gameState) {
    this.gameState = gameState;
    
    // 5个事件链定义
    this.chains = {
      // 事件链1·废弃洞府→藏宝图
      abandoned_cave: {
        id: 'abandoned_cave',
        name: '废弃洞府的宝藏',
        description: '废弃洞府中隐藏着古老的宝藏，需要集齐3个碎片才能找到入口',
        steps: [
          { id: 1, name: '碎片1', location: 'qingyun', chance: 0.3, reward: { item: 'treasure_map_1', count: 1 } },
          { id: 2, name: '碎片2', location: 'qingyun', chance: 0.3, reward: { item: 'treasure_map_2', count: 1 } },
          { id: 3, name: '碎片3', location: 'qingyun', chance: 0.3, reward: { item: 'treasure_map_3', count: 1 } }
        ],
        completionReward: { unlock: 'hidden_cave', fame: 20 },
        requiredItems: ['treasure_map_1', 'treasure_map_2', 'treasure_map_3']
      },
      
      // 事件链2·酒馆情报→秘境线索
      tavern_intel: {
        id: 'tavern_intel',
        name: '酒馆的秘密情报',
        description: '在酒馆中听到关于秘境的传闻，需要收集线索找到秘境入口',
        steps: [
          { id: 1, name: '线索1', location: 'tiancheng', chance: 0.4, reward: { item: 'realm_clue_1', count: 1 } },
          { id: 2, name: '线索2', location: 'tiancheng', chance: 0.3, reward: { item: 'realm_clue_2', count: 1 } },
          { id: 3, name: '线索3', location: 'tiancheng', chance: 0.2, reward: { item: 'realm_clue_3', count: 1 } }
        ],
        completionReward: { unlock: 'secret_realm_entrance', fame: 15 },
        requiredItems: ['realm_clue_1', 'realm_clue_2', 'realm_clue_3']
      },
      
      // 事件链3·血禁山脉→血色禁地
      blood_mountain: {
        id: 'blood_mountain',
        name: '血色禁地的资格',
        description: '首次进入血禁山脉时会触发送信任务，完成后获得血色禁地准入资格',
        steps: [
          { id: 1, name: '送信任务', location: 'xuejin', chance: 0.5, reward: { item: 'blood_realm_token', count: 1 } }
        ],
        completionReward: { unlock: 'xuejin_access', fame: 25 }
      },
      
      // 事件链4·万妖山脉→妖族友好
      monster_mountain: {
        id: 'monster_mountain',
        name: '妖族的友谊',
        description: '在万妖山脉连续3次选择和平离开，可以获得妖族好感',
        steps: [
          { id: 1, name: '和平离开1', location: 'wanyao', chance: 0.6, reward: { faction: 'beast', favor: 10 } },
          { id: 2, name: '和平离开2', location: 'wanyao', chance: 0.5, reward: { faction: 'beast', favor: 10 } },
          { id: 3, name: '和平离开3', location: 'wanyao', chance: 0.4, reward: { faction: 'beast', favor: 10 } }
        ],
        completionReward: { unlock: 'beast_trading', fame: 30 },
        requiredFavor: { beast: 50 }
      },
      
      // 事件链5·昆吾山→封印逐步松动
      kunwu_seal: {
        id: 'kunwu_seal',
        name: '昆吾山封印',
        description: '昆吾山封印正在松动，需要收集封印碎片来修复',
        steps: [
          { id: 1, name: '碎片1', location: 'kunwu', chance: 0.3, reward: { item: 'seal_fragment_1', count: 1 } },
          { id: 2, name: '碎片2', location: 'kunwu', chance: 0.3, reward: { item: 'seal_fragment_2', count: 1 } },
          { id: 3, name: '碎片3', location: 'kunwu', chance: 0.3, reward: { item: 'seal_fragment_3', count: 1 } }
        ],
        completionReward: { unlock: 'kunwu_artifact', fame: 40 },
        requiredItems: ['seal_fragment_1', 'seal_fragment_2', 'seal_fragment_3']
      }
    };
    
    // 玩家事件链进度
    this.progress = gameState.eventChainProgress || {};
  }
  
  // 检查事件链是否触发
  checkTrigger(locationId) {
    const triggers = [];
    
    for (const chainId in this.chains) {
      const chain = this.chains[chainId];
      const progress = this.progress[chainId] || { step: 0, completed: false };
      
      if (progress.completed) continue;
      
      for (const step of chain.steps) {
        if (step.id === progress.step + 1 && step.location === locationId) {
          // 检查概率
          if (Math.random() < step.chance) {
            triggers.push({
              chainId,
              chain,
              step
            });
          }
        }
      }
    }
    
    return triggers;
  }
  
  // 执行事件链步骤
  executeStep(chainId, stepId) {
    const chain = this.chains[chainId];
    if (!chain) return { success: false, text: '事件链不存在' };
    
    const progress = this.progress[chainId] || { step: 0, completed: false };
    if (progress.completed) return { success: false, text: '事件链已完成' };
    
    const step = chain.steps.find(s => s.id === stepId);
    if (!step) return { success: false, text: '步骤不存在' };
    
    // 发放奖励
    if (step.reward.item) {
      this.addItem(step.reward.item, step.reward.count);
    }
    
    if (step.reward.faction && step.reward.favor) {
      this.addFavor(step.reward.faction, step.reward.favor);
    }
    
    // 更新进度
    progress.step = stepId;
    this.progress[chainId] = progress;
    this.gameState.eventChainProgress = this.progress;
    
    // 检查是否完成（按已完成步骤数判定）
    if (progress.step >= chain.steps.length) {
      return this.completeChain(chainId);
    }
    
    return {
      success: true,
      text: `获得${step.name}（${stepId}/${chain.steps.length}）`,
      progress: `${chain.name}进度：${stepId}/${chain.steps.length}`
    };
  }
  
  // 完成事件链
  completeChain(chainId) {
    const chain = this.chains[chainId];
    if (!chain) return { success: false, text: '事件链不存在' };
    
    const progress = this.progress[chainId];
    if (!progress) return { success: false, text: '进度不存在' };
    
    // 检查是否满足完成条件
    if (chain.requiredItems) {
      for (const itemId of chain.requiredItems) {
        if (!this.hasItem(itemId)) {
          return { success: false, text: `缺少${itemId}` };
        }
      }
    }
    
    if (chain.requiredFavor) {
      for (const [faction, favor] of Object.entries(chain.requiredFavor)) {
        if ((this.gameState.factions?.[faction] || 0) < favor) {
          return { success: false, text: `${faction}好感度不足` };
        }
      }
    }
    
    // 发放完成奖励
    if (chain.completionReward.unlock) {
      this.gameState.unlocked = this.gameState.unlocked || [];
      this.gameState.unlocked.push(chain.completionReward.unlock);
    }
    
    if (chain.completionReward.fame) {
      this.gameState.player.fame += chain.completionReward.fame;
    }
    
    // 标记完成
    progress.completed = true;
    this.progress[chainId] = progress;
    this.gameState.eventChainProgress = this.progress;
    
    return {
      success: true,
      text: `${chain.name}完成！获得${chain.completionReward.unlock || '特殊奖励'}`,
      completion: true,
      reward: chain.completionReward
    };
  }
  
  // 获取事件链进度
  getProgress(chainId) {
    const chain = this.chains[chainId];
    if (!chain) return null;
    
    const progress = this.progress[chainId] || { step: 0, completed: false };
    
    return {
      ...chain,
      currentStep: progress.step,
      completed: progress.completed,
      totalSteps: chain.steps.length,
      progressText: `${progress.step}/${chain.steps.length}`
    };
  }
  
  // 获取所有事件链状态
  getAllChainsStatus() {
    return Object.values(this.chains).map(chain => ({
      ...this.getProgress(chain.id)
    }));
  }
  
  // 辅助方法：添加物品
  addItem(itemId, count) {
    const inventory = this.gameState.inventory || [];
    const existing = inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
    } else {
      inventory.push({ id: itemId, count });
    }
    this.gameState.inventory = inventory;
  }
  
  // 辅助方法：检查物品
  hasItem(itemId) {
    const inventory = this.gameState.inventory || [];
    return inventory.some(i => i.id === itemId && i.count > 0);
  }
  
  // 辅助方法：添加好感度
  addFavor(faction, favor) {
    this.gameState.factions = this.gameState.factions || {};
    this.gameState.factions[faction] = (this.gameState.factions[faction] || 0) + favor;
  }
}