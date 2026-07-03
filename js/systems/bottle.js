// 掌天瓶系统 - 完整版（GDD一比一还原）
export class BottleSystem {
  constructor(gameState) {
    this.gameState = gameState;
    
    // 10种绿液用途定义（GDD第650-653行）
    this.usages = {
      // ①催熟灵草(1滴+对应年份)
      ripen_herb: {
        id: 'ripen_herb',
        name: '催熟灵草',
        icon: ' ',
        cost: 1,
        desc: '消耗1滴绿液，灵草立即成熟',
        cooldown: 0
      },
      // ②催熟灵果树(5滴·年份翻倍)
      ripen_fruit: {
        id: 'ripen_fruit',
        name: '催熟灵果树',
        icon: ' ',
        cost: 5,
        desc: '消耗5滴绿液，灵果树年份翻倍',
        cooldown: 0
      },
      // ③灌溉灵田(1滴/块·肥沃+10%/7天)
      irrigate: {
        id: 'irrigate',
        name: '灌溉灵田',
        icon: ' ',
        cost: 1,
        desc: '消耗1滴绿液/块，肥沃度+10%，持续7天',
        cooldown: 0
      },
      // ④炼丹辅料(1滴·品质+1档)
      alchemy_aid: {
        id: 'alchemy_aid',
        name: '炼丹辅料',
        icon: ' ',
        cost: 1,
        desc: '消耗1滴绿液，丹药品质+1档',
        cooldown: 0
      },
      // ⑤涂抹法宝(3滴·0.5%+1品阶)
      artifact_enhance: {
        id: 'artifact_enhance',
        name: '涂抹法宝',
        icon: '⚔️',
        cost: 3,
        desc: '消耗3滴绿液，0.5%概率法宝+1品阶',
        cooldown: 0
      },
      // ⑥疗伤(1滴·恢复30%HP+解毒)
      heal: {
        id: 'heal',
        name: '疗伤',
        icon: '❤️',
        cost: 1,
        desc: '消耗1滴绿液，恢复30%HP+解毒',
        cooldown: 0
      },
      // ⑦灵力速充(1滴·恢复50%灵力)
      mp: {
        id: 'mp',
        name: '灵力速充',
        icon: ' ',
        cost: 1,
        desc: '消耗1滴绿液，恢复50%灵力',
        cooldown: 0
      },
      // ⑧灵兽喂养(1滴·成长+15%·忠诚+3)
      beast_feed: {
        id: 'beast_feed',
        name: '灵兽喂养',
        icon: ' ',
        cost: 1,
        desc: '消耗1滴绿液，灵兽成长+15%，忠诚+3',
        cooldown: 0
      },
      // ⑨口服修炼(1滴稀释·修为+50·丹毒1·冷却7天)
      cultivate: {
        id: 'cultivate',
        name: '口服修炼',
        icon: ' ',
        cost: 1,
        desc: '消耗1滴绿液，修为+50，丹毒+1',
        cooldown: 7
      },
      // ⑩提升突破率(3滴·+5%)
      breakthrough: {
        id: 'breakthrough',
        name: '提升突破率',
        icon: '⚡',
        cost: 3,
        desc: '消耗3滴绿液，突破率+5%',
        cooldown: 0
      }
    };
    
    // 冷却状态
    this.cooldowns = gameState.bottleCooldowns || {};

    // 器灵记忆碎片数据（GDD: 2~3个大事件）
    this.memoryFragments = [
      {
        id: 'memory_1',
        name: '第一任主人',
        desc: '"第一任主人是个很凶的大叔，他总是一个人对着瓶子发呆。"',
        condition: { type: 'favor', value: 30 },
        unlocked: false
      },
      {
        id: 'memory_2',
        name: '掌天瓶的真相',
        desc: '"掌天瓶是一颗种子……混沌青莲的第七颗莲子。"',
        condition: { type: 'level', value: 5 },
        unlocked: false
      },
      {
        id: 'memory_3',
        name: '上一任主人',
        desc: '"上一任主人冲击道祖失败……他在等我。"',
        condition: { type: 'realm', value: 14 },
        unlocked: false
      }
    ];
  }

  // 检查是否已获得掌天瓶
  hasBottle() {
    return this.gameState.bottle && this.gameState.bottle.obtained;
  }

  // 获取掌天瓶（GDD: 需要通过特定任务获得）
  obtain() {
    if (this.hasBottle()) {
      return { success: false, text: '已获得掌天瓶' };
    }

    // 检查是否满足获取条件
    if (this.gameState.player.realmIdx < 2) {
      return { success: false, text: '境界不足，需要筑基期以上' };
    }

    // 检查是否完成前置任务
    const hasQuestItem = this.gameState.inventory.find(i => i.id === 'bottle_quest_item');
    if (!hasQuestItem) {
      return { success: false, text: '需要完成掌天瓶前置任务' };
    }

    this.gameState.bottle = {
      obtained: true,
      greenLiquid: 0,
      maxGreenLiquid: 10,
      spiritFields: [],
      spiritFieldSlots: 3,
      spiritFieldWarehouse: [],
      spiritMaidFavor: 0,
      evolveLevel: 0,
      // 灵果树系统
      fruitTrees: [],
      fruitTreeSlots: 2,
      // 灵田肥沃度
      fieldFertility: {},
      // 器灵记忆碎片
      memoryFragments: [],
      // 升级进度
      upgradeExp: 0
    };

    return {
      success: true,
      text: '获得掌天瓶！三日后将凝聚出第一滴绿液'
    };
  }

  // 掌天瓶升级条件（GDD: 掌天瓶可以升级）
  upgradeBottle() {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const bottle = this.gameState.bottle;
    const maxLevel = 10;

    if (bottle.evolveLevel >= maxLevel) {
      return { success: false, text: '已达最高等级' };
    }

    // 升级需要的经验
    const expNeeded = (bottle.evolveLevel + 1) * 100;
    if (bottle.upgradeExp < expNeeded) {
      return { success: false, text: `经验不足，需要${expNeeded}经验` };
    }

    // 检查升级材料
    const materials = this.getUpgradeMaterials(bottle.evolveLevel);
    for (const mat of materials) {
      if (!this.hasItem(mat.id, mat.count)) {
        return { success: false, text: `缺少${mat.name}x${mat.count}` };
      }
    }

    // 消耗材料
    for (const mat of materials) {
      this.removeItem(mat.id, mat.count);
    }

    // 升级
    bottle.evolveLevel++;
    bottle.upgradeExp -= expNeeded;
    bottle.maxGreenLiquid = 10 + bottle.evolveLevel * 5;
    bottle.spiritFieldSlots = 3 + bottle.evolveLevel;
    bottle.fruitTreeSlots = 2 + Math.floor(bottle.evolveLevel / 2);

    return {
      success: true,
      text: `掌天瓶升级到${bottle.evolveLevel}级！绿液上限+5，灵田+1`,
      level: bottle.evolveLevel
    };
  }

  // 获取升级材料
  getUpgradeMaterials(level) {
    const materials = [
      [{ id: 'spirit_crystal', count: 10, name: '灵晶' }],
      [{ id: 'spirit_crystal', count: 30, name: '灵晶' }, { id: 'demon_core', count: 5, name: '妖丹' }],
      [{ id: 'demon_core', count: 20, name: '妖丹' }, { id: 'void_stone', count: 5, name: '虚空石' }],
      [{ id: 'void_stone', count: 20, name: '虚空石' }, { id: 'chaos_stone', count: 5, name: '混沌石' }],
      [{ id: 'chaos_stone', count: 20, name: '混沌石' }, { id: 'true_blood', count: 5, name: '真灵之血' }],
      [{ id: 'true_blood', count: 20, name: '真灵之血' }, { id: 'origin_crystal', count: 5, name: '本源结晶' }],
      [{ id: 'origin_crystal', count: 20, name: '本源结晶' }, { id: 'chaos_fragment', count: 5, name: '混沌至宝碎片' }],
      [{ id: 'chaos_fragment', count: 20, name: '混沌至宝碎片' }, { id: 'origin_law', count: 2, name: '本源法则' }],
      [{ id: 'origin_law', count: 10, name: '本源法则' }, { id: 'lunhui_stone', count: 5, name: '轮回石' }],
      [{ id: 'lunhui_stone', count: 20, name: '轮回石' }, { id: 'immortal_stone', count: 10000, name: '仙灵石' }]
    ];
    return materials[level] || materials[0];
  }

  // 器灵记忆碎片（GDD: 器灵有记忆碎片，需要特定条件解锁）
  unlockMemoryFragment(fragmentId) {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const bottle = this.gameState.bottle;
    const fragment = this.memoryFragments.find(f => f.id === fragmentId);

    if (!fragment) {
      return { success: false, text: '记忆碎片不存在' };
    }

    if (fragment.unlocked) {
      return { success: false, text: '该记忆碎片已解锁' };
    }

    // 检查解锁条件
    if (!this.checkMemoryCondition(fragment.condition)) {
      return { success: false, text: '未满足解锁条件' };
    }

    // 解锁记忆碎片
    fragment.unlocked = true;
    bottle.memoryFragments.push(fragmentId);

    return {
      success: true,
      text: `解锁记忆碎片：${fragment.name}`,
      fragment
    };
  }

  // 检查记忆解锁条件
  checkMemoryCondition(condition) {
    switch (condition.type) {
      case 'realm':
        return this.gameState.player.realmIdx >= condition.value;
      case 'favor':
        return this.gameState.bottle.spiritMaidFavor >= condition.value;
      case 'level':
        return this.gameState.bottle.evolveLevel >= condition.value;
      case 'quest':
        return this.gameState.quests?.includes(condition.value);
      default:
        return false;
    }
  }

  // 获取记忆碎片列表
  getMemoryFragments() {
    return this.memoryFragments;
  }

  // 增加升级经验
  addUpgradeExp(exp) {
    if (!this.hasBottle()) return;
    this.gameState.bottle.upgradeExp = (this.gameState.bottle.upgradeExp || 0) + exp;
  }

  // 凝聚绿液
  condense() {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const bottle = this.gameState.bottle;

    if (bottle.greenLiquid >= bottle.maxGreenLiquid) {
      return { success: false, text: '绿液已满' };
    }

    // 每天凝聚1滴
    bottle.greenLiquid = Math.min(bottle.greenLiquid + 1, bottle.maxGreenLiquid);

    return {
      success: true,
      text: `凝聚成功，绿液+1（当前${bottle.greenLiquid}/${bottle.maxGreenLiquid}）`
    };
  }

  // 获取所有用途状态
  getAllUsagesStatus() {
    const currentDay = this.gameState.gameTime?.totalDays || 0;
    
    return Object.values(this.usages).map(usage => {
      // 检查冷却
      const cooldownEnd = this.cooldowns[usage.id] || 0;
      const onCooldown = currentDay < cooldownEnd;
      const cooldownRemaining = onCooldown ? cooldownEnd - currentDay : 0;
      
      // 检查绿液是否充足
      const bottle = this.gameState.bottle || {};
      const hasEnough = (bottle.greenLiquid || 0) >= usage.cost;
      
      return {
        ...usage,
        onCooldown,
        cooldownRemaining,
        hasEnough,
        available: !onCooldown && hasEnough
      };
    });
  }

  // 使用绿液
  useGreenLiquid(usageId, options = {}) {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const usage = this.usages[usageId];
    if (!usage) {
      return { success: false, text: '未知的用途' };
    }

    const bottle = this.gameState.bottle;
    const currentDay = this.gameState.gameTime?.totalDays || 0;

    // 检查冷却
    const cooldownEnd = this.cooldowns[usageId] || 0;
    if (currentDay < cooldownEnd) {
      return { success: false, text: `冷却中，还需${cooldownEnd - currentDay}天` };
    }

    // 检查绿液是否充足
    if (bottle.greenLiquid < usage.cost) {
      return { success: false, text: `绿液不足，需要${usage.cost}滴` };
    }

    // 消耗绿液
    bottle.greenLiquid -= usage.cost;

    // 设置冷却
    if (usage.cooldown > 0) {
      this.cooldowns[usageId] = currentDay + usage.cooldown;
      this.gameState.bottleCooldowns = this.cooldowns;
    }

    // 执行效果
    let result = { success: true, usage: usage.name };

    switch (usageId) {
      case 'ripen_herb':
        result = this.ripenHerb();
        break;
      case 'ripen_fruit':
        result = this.ripenFruitTree();
        break;
      case 'irrigate':
        result = this.irrigateField(options.fieldIndex || 0);
        break;
      case 'alchemy_aid':
        result = this.alchemyAid();
        break;
      case 'artifact_enhance':
        result = this.artifactEnhance();
        break;
      case 'heal':
        result = this.heal();
        break;
      case 'mp':
        result = this恢复MP();
        break;
      case 'beast_feed':
        result = this.feedBeast();
        break;
      case 'cultivate':
        result = this.cultivate();
        break;
      case 'breakthrough':
        result = this.enhanceBreakthrough();
        break;
      default:
        result = { success: false, text: '未知用途' };
    }

    result.text = `消耗${usage.cost}滴绿液，${result.text}`;
    return result;
  }

  // ①催熟灵草(1滴+对应年份)
  ripenHerb() {
    const herbs = this.gameState.inventory.filter(i => 
      i.id === 'herb' || i.id === 'purple_fungus' || i.id === 'spirit_herb'
    );
    
    if (herbs.length === 0) {
      return { success: false, text: '没有可催熟的灵草' };
    }
    
    // 催熟第一个灵草
    const herb = herbs[0];
    const gain = 3 + Math.floor(Math.random() * 3); // 3~5份
    herb.count += gain;
    
    return {
      success: true,
      text: `催熟${herb.name}，获得${gain}份`
    };
  }

  // ②催熟灵果树(5滴·年份翻倍)
  ripenFruitTree() {
    const bottle = this.gameState.bottle;
    
    if (!bottle.fruitTrees || bottle.fruitTrees.length === 0) {
      return { success: false, text: '没有灵果树' };
    }
    
    // 催熟第一个灵果树
    const tree = bottle.fruitTrees[0];
    tree.years *= 2;
    
    return {
      success: true,
      text: `催熟${tree.name}，年份翻倍至${tree.years}年`
    };
  }

  // ③灌溉灵田(1滴/块·肥沃+10%/7天)
  irrigateField(fieldIndex) {
    const bottle = this.gameState.bottle;
    
    if (fieldIndex >= bottle.spiritFieldSlots) {
      return { success: false, text: '灵田不存在' };
    }
    
    // 设置肥沃度
    bottle.fieldFertility = bottle.fieldFertility || {};
    bottle.fieldFertility[fieldIndex] = {
      bonus: 0.1, // +10%
      duration: 7, // 7天
      startTime: this.gameState.gameTime.totalDays
    };
    
    return {
      success: true,
      text: `灌溉灵田${fieldIndex + 1}，肥沃度+10%，持续7天`
    };
  }

  // ④炼丹辅料(1滴·品质+1档)
  alchemyAid() {
    // 设置炼丹品质加成
    this.gameState.alchemyBonus = (this.gameState.alchemyBonus || 0) + 1;
    
    return {
      success: true,
      text: '炼丹品质+1档'
    };
  }

  // ⑤涂抹法宝(3滴·0.5%+1品阶)
  artifactEnhance() {
    // 0.5%概率法宝+1品阶
    if (Math.random() < 0.005) {
      // 成功
      const artifacts = this.gameState.artifacts || [];
      if (artifacts.length > 0) {
        const artifact = artifacts[0];
        artifact.grade = this.upgradeGrade(artifact.grade);
        return {
          success: true,
          text: `涂抹成功！${artifact.name}晋升为${artifact.grade}`
        };
      }
    }
    
    return {
      success: true,
      text: '涂抹法宝，但未触发晋升'
    };
  }

  // 升级品阶
  upgradeGrade(grade) {
    const grades = ['凡器', '法器', '灵器', '法宝', '古宝', '玄天', '通天灵宝', '先天灵宝', '混沌至宝'];
    const index = grades.indexOf(grade);
    if (index < grades.length - 1) {
      return grades[index + 1];
    }
    return grade;
  }

  // ⑥疗伤(1滴·恢复30%HP+解毒)
  heal() {
    const player = this.gameState.player;
    const healAmount = Math.floor(player.maxHp * 0.3);
    player.hp = Math.min(player.hp + healAmount, player.maxHp);
    
    // 解毒
    if (player.poison > 0) {
      player.poison = 0;
      return {
        success: true,
        text: `恢复${healAmount}HP，解除所有毒素`
      };
    }
    
    return {
      success: true,
      text: `恢复${healAmount}HP`
    };
  }

  // ⑦灵力速充(1滴·恢复50%灵力)
  恢复MP() {
    const player = this.gameState.player;
    const mpAmount = Math.floor(player.maxMp * 0.5);
    player.mp = Math.min(player.mp + mpAmount, player.maxMp);
    
    return {
      success: true,
      text: `恢复${mpAmount}灵力`
    };
  }

  // ⑧灵兽喂养(1滴·成长+15%·忠诚+3)
  feedBeast() {
    const beasts = this.gameState.beasts || [];
    
    if (beasts.length === 0) {
      return { success: false, text: '没有灵兽' };
    }
    
    // 喂养第一个灵兽
    const beast = beasts[0];
    beast.growth = (beast.growth || 0) + 0.15;
    beast.loyalty = Math.min((beast.loyalty || 0) + 3, 100);
    
    return {
      success: true,
      text: `喂养${beast.name}，成长+15%，忠诚+3`
    };
  }

  // ⑨口服修炼(1滴稀释·修为+50·丹毒1·冷却7天)
  cultivate() {
    const player = this.gameState.player;
    const maxExp = window.gameData?.REALMS?.[player.realmIdx]?.maxExp || 999999;
    player.exp = Math.min(player.exp + 50, maxExp);
    player.poison = (player.poison || 0) + 1;
    
    return {
      success: true,
      text: '修为+50，丹毒+1'
    };
  }

  // ⑩提升突破率(3滴·+5%)
  enhanceBreakthrough() {
    this.gameState.breakthroughBonus = (this.gameState.breakthroughBonus || 0) + 5;
    
    return {
      success: true,
      text: '突破率+5%'
    };
  }

  // 种植灵田
  plant(fieldIndex, herbId) {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const bottle = this.gameState.bottle;

    if (fieldIndex >= bottle.spiritFieldSlots) {
      return { success: false, text: '灵田不存在' };
    }

    // 检查灵草
    const herb = this.gameState.inventory.find(i => i.id === herbId);
    if (!herb || herb.count <= 0) {
      return { success: false, text: '灵草不足' };
    }

    // 消耗灵草
    herb.count--;
    if (herb.count <= 0) {
      this.gameState.inventory.splice(this.gameState.inventory.indexOf(herb), 1);
    }

    // 种植
    bottle.spiritFields[fieldIndex] = {
      herbId,
      plantTime: this.gameState.gameTime.totalDays,
      growTime: 7,
      ripe: false
    };

    return {
      success: true,
      text: `种植成功，预计7天后成熟`
    };
  }

  // 收获灵田
  harvest(fieldIndex) {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const bottle = this.gameState.bottle;
    const field = bottle.spiritFields[fieldIndex];

    if (!field) {
      return { success: false, text: '此田未种植' };
    }

    // 检查是否成熟
    const daysPassed = this.gameState.gameTime.totalDays - field.plantTime;
    if (daysPassed < field.growTime) {
      return { success: false, text: `还需${field.growTime - daysPassed}天成熟` };
    }

    // 收获
    const harvestCount = 5 + Math.floor(Math.random() * 6);
    this.addItem(field.herbId, harvestCount);

    // 清空灵田
    bottle.spiritFields[fieldIndex] = null;

    return {
      success: true,
      text: `收获${harvestCount}份${field.herbId}`
    };
  }

  // 自动收获（器灵功能）
  autoHarvest() {
    if (!this.hasBottle()) return;

    const bottle = this.gameState.bottle;

    // 器灵好感度≥60开启自动收获
    if (bottle.spiritMaidFavor < 60) return;

    bottle.spiritFields.forEach((field, index) => {
      if (field) {
        const daysPassed = this.gameState.gameTime.totalDays - field.plantTime;
        if (daysPassed >= field.growTime) {
          this.harvest(index);
        }
      }
    });
  }

  // 器灵互动
  interactWithSpiritMaid(action) {
    if (!this.hasBottle()) {
      return { success: false, text: '未获得掌天瓶' };
    }

    const bottle = this.gameState.bottle;

    switch (action) {
      case 'chat':
        bottle.spiritMaidFavor = Math.min(bottle.spiritMaidFavor + 3, 100);
        return { success: true, text: '与器灵聊天，好感度+3' };

      case 'feed':
        // 消耗魂晶
        const crystal = this.gameState.inventory.find(i => i.id === 'soul_crystal');
        if (!crystal || crystal.count <= 0) {
          return { success: false, text: '魂晶不足' };
        }
        crystal.count--;
        bottle.spiritMaidFavor = Math.min(bottle.spiritMaidFavor + 10, 100);
        return { success: true, text: '喂食魂晶，好感度+10' };

      case 'ignore':
        bottle.spiritMaidFavor = Math.max(bottle.spiritMaidFavor - 5, 0);
        return { success: true, text: '长时间不理器灵，好感度-5' };

      default:
        return { success: false, text: '未知操作' };
    }
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

  // 获取掌天瓶信息
  getInfo() {
    if (!this.hasBottle()) {
      return null;
    }

    const bottle = this.gameState.bottle;

    return {
      greenLiquid: bottle.greenLiquid,
      maxGreenLiquid: bottle.maxGreenLiquid,
      spiritFieldSlots: bottle.spiritFieldSlots,
      spiritFields: bottle.spiritFields,
      fruitTreeSlots: bottle.fruitTreeSlots || 2,
      fruitTrees: bottle.fruitTrees || [],
      spiritMaidFavor: bottle.spiritMaidFavor,
      spiritMaidStatus: bottle.spiritMaidFavor >= 80 ? '亲密' :
                        bottle.spiritMaidFavor >= 60 ? '友好' :
                        bottle.spiritMaidFavor >= 30 ? '普通' : '冷淡'
    };
  }
}