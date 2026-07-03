// 探索系统
export class ExplorationSystem {
  constructor(gameState) {
    this.gameState = gameState;
    this.eventTextCounts = {}; // 追踪每个事件文本变体的使用次数
  }

  // 按权重加权随机选择事件
  _weightedSelect(events, availableKeys) {
    // 只取当前地点可用的事件
    const candidates = availableKeys
      .map(key => ({ key, event: events[key] }))
      .filter(c => c.event);

    if (candidates.length === 0) return null;

    // 计算总权重
    const totalWeight = candidates.reduce((sum, c) => sum + (c.event.chance || 0.1), 0);
    let roll = Math.random() * totalWeight;

    for (const c of candidates) {
      roll -= (c.event.chance || 0.1);
      if (roll <= 0) return c.key;
    }

    // 保底返回第一个
    return candidates[0].key;
  }

  // 获取事件文本（带变体循环）
  _getEventText(eventKey, event) {
    const { EVENT_TEXT_VARIANTS } = window.gameData;
    const variants = EVENT_TEXT_VARIANTS?.[eventKey];

    if (!variants || variants.length === 0) {
      return event.text;
    }

    // 按使用次数循环取变体
    const count = this.eventTextCounts[eventKey] || 0;
    this.eventTextCounts[eventKey] = count + 1;
    return variants[count % variants.length];
  }

  // 探索区域
  explore(location) {
    const { EVENTS, EVENT_LOCATION_TYPES } = window.gameData;
    const availableKeys = location.events || [];

    // 按地点类型过滤事件池
    const locationType = location.type || 'wild';
    const typedKeys = availableKeys.filter(key => {
      const eventType = EVENT_LOCATION_TYPES?.[key];
      // 如果事件没有类型标注，默认可用；否则匹配地点类型
      return !eventType || eventType === locationType || 
             (locationType === 'danger' && eventType === 'danger') ||
             (locationType === 'secret' && eventType === 'secret');
    });

    // 使用过滤后的事件池，如果为空则退回原始事件池
    const eventKeys = typedKeys.length > 0 ? typedKeys : availableKeys;

    // 加权随机选择
    const eventKey = this._weightedSelect(EVENTS, eventKeys);
    if (!eventKey) {
      return { text: '什么也没发生。', reward: null };
    }

    const event = EVENTS[eventKey];

    // 检查境界是否足够
    if (location.realmIdx > this.gameState.player.realmIdx + 1) {
      return {
        text: '此地太危险了，你的境界不足以应对。',
        reward: { type: 'warning' }
      };
    }

    // 使用文本变体
    const eventText = this._getEventText(eventKey, event);
    const result = { text: eventText, reward: null };

    if (event.reward) {
      switch (event.reward.type) {
        case 'item':
          result.reward = this.handleItemReward(event.reward);
          break;
        case 'combat':
          result.reward = this.handleCombatReward(event.reward);
          break;
        case 'damage':
          result.reward = this.handleDamageReward(event.reward);
          break;
        case 'buff':
          result.reward = this.handleBuffReward(event.reward);
          break;
        case 'shop':
          result.reward = { type: 'shop' };
          break;
        case 'skill':
          result.reward = this.handleSkillReward();
          break;
        case 'treasure':
          result.reward = this.handleTreasureReward();
          break;
        case 'root_mutation':
          result.reward = this.handleRootMutation(event.reward);
          break;
        case 'puzzle':
          result.reward = { type: 'puzzle', text: '一道古老的谜题等待解开。' };
          break;
        case 'heritage':
          result.reward = { type: 'heritage', text: '你触发了传承试炼。' };
          break;
        case 'secret':
          result.reward = { type: 'secret' };
          break;
        case 'ancient':
          result.reward = { type: 'ancient' };
          break;
        case 'forbidden':
          result.reward = { type: 'forbidden', text: '禁制之力让你无法靠近。' };
          break;
        case 'teleport':
          result.reward = { type: 'teleport' };
          break;
        case 'environment':
          result.reward = { type: 'environment' };
          break;
        default:
          result.reward = event.reward;
      }
    }

    // 消耗时间
    const days = 3;
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    return result;
  }

  // 处理物品奖励
  handleItemReward(reward) {
    const { id, count } = reward;
    this.addItem(id, count);
    return { type: 'item', id, count };
  }

  // 处理战斗奖励
  handleCombatReward(reward) {
    return { type: 'combat', enemy: reward.enemy };
  }

  // 处理伤害
  handleDamageReward(reward) {
    const damage = Math.floor(this.gameState.player.maxHp * reward.percent / 100);
    this.gameState.player.hp = Math.max(this.gameState.player.hp - damage, 0);
    return { type: 'damage', value: damage };
  }

  // 处理增益
  handleBuffReward(reward) {
    if (reward.stat === 'maxMp') {
      this.gameState.player.maxMp += reward.value;
      this.gameState.player.mp += reward.value;
    }
    return { type: 'buff', stat: reward.stat, value: reward.value };
  }

  // 处理功法奖励
  handleSkillReward() {
    const { SKILLS } = window.gameData;
    const allSkills = [...SKILLS.main, ...SKILLS.sub, ...SKILLS.combat];
    const mainId = this.gameState.skills.main?.id;
    const available = allSkills.filter(s =>
      s.id !== mainId &&
      !this.gameState.skills.sub?.some(sub => sub.id === s.id) &&
      !this.gameState.skills.combat?.some(c => c.id === s.id)
    );

    if (available.length === 0) return { type: 'nothing' };

    const skill = available[Math.floor(Math.random() * available.length)];
    
    // 根据功法类型放入对应数组
    const isMain = SKILLS.main?.some(s => s.id === skill.id);
    const isSub = SKILLS.sub?.some(s => s.id === skill.id);
    
    if (isMain) {
      this.gameState.skills.main = { ...skill, level: 1, exp: 0 };
    } else if (isSub) {
      this.gameState.skills.sub = this.gameState.skills.sub || [];
      this.gameState.skills.sub.push({ ...skill, level: 1, exp: 0 });
    } else {
      this.gameState.skills.combat = this.gameState.skills.combat || [];
      this.gameState.skills.combat.push({ ...skill, level: 1, exp: 0 });
    }

    return { type: 'skill', skill };
  }

  // 处理宝藏奖励
  handleTreasureReward() {
    const treasures = [
      { id: 'herb', count: 10 },
      { id: 'purple_fungus', count: 5 },
      { id: 'beast_core', count: 3 },
      { id: 'iron', count: 5 },
      { id: 'stone', count: 100 }
    ];

    const treasure = treasures[Math.floor(Math.random() * treasures.length)];
    this.addItem(treasure.id, treasure.count);

    return { type: 'treasure', ...treasure };
  }

  // 处理灵根变异
  handleRootMutation(reward) {
    const player = this.gameState.player;
    const { from, to } = reward;

    // 变异灵根
    const root = player.root;
    const oldElement = root.mainElement;
    const oldValue = root.elements[oldElement];

    // 将原属性值转移到新属性
    root.elements[to] = oldValue;
    root.elements[oldElement] = Math.max(0, oldValue - 30);

    // 处理特殊变异（天火/岩需要映射到五行）
    const elementMap = {
      '雷': '金', // 雷映射到金
      '冰': '水', // 冰映射到水
      '风': '木', // 风映射到木
      '天火': '火', // 天火映射到火
      '岩': '土'  // 岩映射到土
    };
    const mappedElement = elementMap[to] || to;

    // 重新计算主属性
    let maxVal = 0;
    let newMain = oldElement;
    for (const [el, val] of Object.entries(root.elements)) {
      if (val > maxVal) {
        maxVal = val;
        newMain = el;
      }
    }
    root.mainElement = newMain;

    // 重新统计≥20%的元素
    const highEls = Object.entries(root.elements).filter(([el, val]) => val >= 20).map(([el]) => el);
    root.mainElements = highEls.length > 0 ? highEls : ['无'];

    // 重新判定灵根类型
    let newType;
    if (maxVal >= 80) newType = { name: '天灵根', mult: 3.0, bonus: 20 };
    else if (highEls.length === 2) newType = { name: '双灵根', mult: 1.8, bonus: 12 };
    else if (highEls.length === 3) newType = { name: '三灵根', mult: 1.2, bonus: 5 };
    else if (highEls.length === 4) newType = { name: '四灵根', mult: 0.8, bonus: -5 };
    else if (highEls.length === 5) newType = { name: '杂灵根', mult: 0.6, bonus: -10 };
    else newType = { name: '伪灵根', mult: 0.5, bonus: -20 };
    root.type = newType;

    return {
      type: 'root_mutation',
      from: oldElement,
      to,
      mappedElement,
      newType: root.type.name,
      text: `灵根变异！${oldElement}属性变异为${to}（${mappedElement}），新灵根：${root.type.name}`
    };
  }

  // 添加物品
  addItem(id, count) {
    const { ITEMS } = window.gameData;
    const itemData = [...(ITEMS.pills || []), ...(ITEMS.materials || [])].find(i => i.id === id);

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
  }
}
