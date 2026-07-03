// 交易系统 - 完整版（GDD一比一还原）
export class TradeSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // === 各城市商店数据（GDD完整商品列表） ===
    this.shops = {
      // 青云山·杂货铺
      qingyun_misc: {
        name: '青云山·杂货铺', location: 'qingyun', type: 'misc',
        items: [
          { id: 'herb', name: '灵草', price: 5 },
          { id: 'detox_grass', name: '解毒草', price: 8 },
          { id: 'beast_bone', name: '兽骨', price: 8 },
          { id: 'paper', name: '符纸(普)', price: 1, note: '十张' },
          { id: 'paper', name: '符纸', price: 1 }
        ]
      },
      // 天南城·丹药铺
      tiancheng_pill: {
        name: '天南城·丹药铺', location: 'tiancheng', type: 'pill',
        items: [
          { id: 'peiyuan', name: '培元丹', price: 15 },
          { id: 'juqi', name: '聚气散', price: 45 },
          { id: 'heal_pill', name: '金创药', price: 8 },
          { id: 'stop_bleed', name: '止血散', price: 6 },
          { id: 'mp_pill', name: '回灵丹', price: 30 },
          { id: 'qingxin_pill', name: '清心丸', price: 8 },
          { id: 'bigu', name: '辟谷丹', price: 10 },
          { id: 'light_body', name: '轻身丹', price: 25 },
          { id: 'detox', name: '解毒散', price: 12 },
          { id: 'bone_pill', name: '壮骨丸', price: 22 },
          { id: 'eye_pill', name: '明目丹', price: 18 },
          { id: 'yangqi', name: '养气丸', price: 25 }
        ]
      },
      // 天南城·法器阁
      tiancheng_artifact: {
        name: '天南城·法器阁', location: 'tiancheng', type: 'artifact',
        items: [
          { id: 'iron_sword', name: '铁剑', price: 100 },
          { id: 'wood_sword', name: '木剑', price: 80 },
          { id: 'iron_shield', name: '铁盾', price: 120 },
          { id: 'stone_hammer', name: '石锤', price: 90 },
          { id: 'jade_pendant', name: '聚灵玉佩', price: 120 },
          { id: 'green_sword', name: '青锋剑', price: 300 },
          { id: 'xuantie_sword', name: '玄铁剑', price: 500 },
          { id: 'fly_boat', name: '飞行舟', price: 400 },
          { id: 'space_bag', name: '乾坤袋', price: 350 }
        ]
      },
      // 天南城·符箓店
      tiancheng_talisman: {
        name: '天南城·符箓店', location: 'tiancheng', type: 'talisman',
        items: [
          { id: 'fire_talisman', name: '火球符', price: 10 },
          { id: 'ice_talisman', name: '冰锥符', price: 12 },
          { id: 'shield_talisman', name: '护身符', price: 10 },
          { id: 'hide_talisman', name: '隐匿符', price: 15 },
          { id: 'light_talisman', name: '轻身符', price: 8 },
          { id: 'illuminate_talisman', name: '照明符', price: 8 },
          { id: 'message_talisman', name: '传讯符', price: 3 },
          { id: 'gather_talisman', name: '聚灵符', price: 12 }
        ]
      },
      // 天南城·功法阁
      tiancheng_skill: {
        name: '天南城·功法阁', location: 'tiancheng', type: 'skill',
        items: [
          { id: 'basic_art', name: '基础吐纳法(黄·无)', price: 200 },
          { id: 'qingmu', name: '青木诀(黄·木)', price: 300 },
          { id: 'liehuo', name: '烈火功(黄·火)', price: 300 },
          { id: 'houTu', name: '厚土功(黄·土)', price: 300 },
          { id: 'xuanshui', name: '玄水功(黄·水)', price: 300 },
          { id: 'luoyan', name: '罗烟步(玄·身法)', price: 500 },
          { id: 'fireball', name: '火球术(黄·攻击)', price: 250 },
          { id: 'ice_cone', name: '冰锥术(黄·攻击)', price: 250 }
        ]
      },
      // 天南城·百宝楼
      tiancheng_rare: {
        name: '天南城·百宝楼', location: 'tiancheng', type: 'rare',
        items: [
          { id: 'golden_bell', name: '金钟罩', price: 500 },
          { id: 'fly_boat', name: '飞行舟', price: 800 },
          { id: 'space_bag', name: '乾坤袋', price: 500 },
          { id: 'fire_flag', name: '烈火旗', price: 600 },
          { id: 'ice_crystal', name: '冰晶珠', price: 600 },
          { id: 'thunder_ring', name: '雷霆环', price: 700 },
          { id: 'ancient_mirror', name: '古铜镜', price: 400 },
          { id: 'xuantie_sword', name: '玄铁飞剑', price: 500 }
        ]
      },
      // 天南城·杂货铺
      tiancheng_misc: {
        name: '天南城·杂货铺', location: 'tiancheng', type: 'misc',
        items: [
          { id: 'herb', name: '灵草', price: 5 },
          { id: 'detox_grass', name: '解毒草', price: 8 },
          { id: 'wind_grass', name: '风铃草', price: 8 },
          { id: 'clear_flower', name: '清目花', price: 6 },
          { id: 'shadow_flower', name: '影花草', price: 12 },
          { id: 'yang_flower', name: '阳花草', price: 10 },
          { id: 'mushroom', name: '迷幻菇', price: 15 },
          { id: 'thorn_fruit', name: '尖刺果', price: 10 },
          { id: 'spring_water', name: '灵泉水', price: 8 },
          { id: 'beast_bone', name: '兽骨', price: 8 },
          { id: 'paper', name: '符纸(普)', price: 1, note: '十张' },
          { id: 'paper', name: '符纸', price: 1 }
        ]
      },
      // 黄枫谷·丹药铺
      huangfeng_pill: {
        name: '黄枫谷·丹药铺', location: 'huangfeng', type: 'pill',
        items: [
          { id: 'peiyuan', name: '培元丹', price: 15 },
          { id: 'juqi', name: '聚气散', price: 45 },
          { id: 'heal_pill', name: '金创药', price: 8 },
          { id: 'mp_pill', name: '回灵丹', price: 30 },
          { id: 'bone_pill', name: '壮骨丸', price: 22 },
          { id: 'zhuji', name: '筑基丹', price: 200, limit: 1 },
          { id: 'ningshen', name: '凝神丹', price: 80 }
        ]
      },
      // 黄枫谷·杂货铺
      huangfeng_misc: {
        name: '黄枫谷·杂货铺', location: 'huangfeng', type: 'misc',
        items: [
          { id: 'herb', name: '灵草', price: 5 },
          { id: 'beast_bone', name: '兽骨', price: 8 },
          { id: 'paper', name: '符纸(普)', price: 1, note: '十张' },
          { id: 'iron', name: '铁精', price: 25, limit: 5 }
        ]
      },
      // 天星城·丹药铺
      tianxing_pill: {
        name: '天星城·丹药铺', location: 'tianxing', type: 'pill',
        items: [
          { id: 'ningbi', name: '凝碧丹', price: 350 },
          { id: 'dan_gold', name: '结金丹', price: 800, limit: 1 },
          { id: 'zengyuan', name: '增元丹', price: 550 },
          { id: 'humai', name: '护脉丹', price: 200 },
          { id: 'pozhang_gold', name: '破障丹(金丹)', price: 600 },
          { id: 'jushen', name: '聚神丹', price: 250 },
          { id: 'jiaoxue', name: '蛟血丹', price: 750 },
          { id: 'tengyun', name: '腾云丹', price: 200 },
          { id: 'huxin', name: '护心丹', price: 500 }
        ]
      },
      // 天星城·法器阁
      tianxing_artifact: {
        name: '天星城·法器阁', location: 'tianxing', type: 'artifact',
        items: [
          { id: 'xuantie_sword', name: '玄铁飞剑', price: 500 },
          { id: 'golden_shield', name: '金光盾', price: 800 },
          { id: 'thunder_ring', name: '雷霆环', price: 900 },
          { id: 'purple_hammer', name: '紫电锤', price: 1500 },
          { id: 'ice_crystal', name: '冰晶珠', price: 800 },
          { id: 'space_ring', name: '须弥戒', price: 2000 },
          { id: 'fire_flag', name: '烈火旗', price: 1000 },
          { id: 'formation_flag', name: '阵旗', price: 1500 }
        ]
      },
      // 天星城·符箓店
      tianxing_talisman: {
        name: '天星城·符箓店', location: 'tianxing', type: 'talisman',
        items: [
          { id: 'fire_talisman2', name: '烈焰符', price: 50 },
          { id: 'ice_talisman2', name: '玄冰符', price: 55 },
          { id: 'thunder_talisman2', name: '紫雷符', price: 60 },
          { id: 'fire_talisman3', name: '天火符', price: 300, limit: 2 },
          { id: 'ice_talisman3', name: '玄冰神符', price: 400, limit: 2 }
        ]
      },
      // 天星城·功法阁
      tianxing_skill: {
        name: '天星城·功法阁', location: 'tianxing', type: 'skill',
        items: [
          { id: 'qingmu', name: '青木诀(黄·木)', price: 500 },
          { id: 'liehuo', name: '烈火功(黄·火)', price: 550 },
          { id: 'houTu', name: '厚土功(黄·土)', price: 500 },
          { id: 'xuanshui', name: '玄水功(黄·水)', price: 550 },
          { id: 'qingxin', name: '清心诀(玄·木)', price: 800 },
          { id: 'miaoyin', name: '妙音天诀(玄·神识)', price: 900 }
        ]
      },
      // 天星城·杂货铺
      tianxing_misc: {
        name: '天星城·杂货铺', location: 'tianxing', type: 'misc',
        items: [
          { id: 'purple_fungus', name: '紫芝', price: 30 },
          { id: 'cold_jade', name: '玉髓', price: 80 },
          { id: 'beast_core', name: '兽丹', price: 20 },
          { id: 'demon_core', name: '妖丹', price: 300 },
          { id: 'paper2', name: '符纸(中)', price: 5 }
        ]
      },
      // 天星城·百宝楼
      tianxing_rare: {
        name: '天星城·百宝楼', location: 'tianxing', type: 'rare',
        items: [
          { id: 'fly_boat', name: '飞行舟', price: 2000 },
          { id: 'ice_crystal', name: '冰晶珠', price: 1500 },
          { id: 'soul_mirror', name: '天罗镜', price: 5000 },
          { id: 'chaos_bell', name: '混沌钟', price: 8000 },
          { id: 'space_ring', name: '须弥戒', price: 3000 }
        ]
      },
      // 大晋皇都·丹药铺
      dajin_pill: {
        name: '大晋皇都·丹药铺', location: 'dajin_city', type: 'pill',
        items: [
          { id: 'huaying', name: '化婴丹', price: 3500, limit: 1 },
          { id: 'lianshen', name: '炼神丹', price: 2000 },
          { id: 'tianyuan', name: '天元丹', price: 2500 },
          { id: 'taiqing', name: '太清丹', price: 4000 },
          { id: 'jingang', name: '金刚丹', price: 5000 },
          { id: 'pojie_yuanying', name: '破界丹(元婴)', price: 3500 },
          { id: 'qudu_yuanying', name: '祛毒丹(元婴)', price: 1500 },
          { id: 'liehun', name: '裂魂丹', price: 5000 }
        ]
      },
      // 大晋皇都·法器阁
      dajin_artifact: {
        name: '大晋皇都·法器阁', location: 'dajin_city', type: 'artifact',
        items: [
          { id: 'golden_shield', name: '金光盾', price: 5000 },
          { id: 'soul_mirror', name: '天罗镜', price: 8000 },
          { id: 'star_sword', name: '星辰剑', price: 10000 },
          { id: 'chaos_shield', name: '混沌盾', price: 12000 },
          { id: 'purple_hammer', name: '紫电锤', price: 8000 },
          { id: 'void_boat', name: '虚空飞舟', price: 15000 },
          { id: 'nine_palace', name: '九宫天乾符', price: 10000 },
          { id: 'space_ring', name: '须弥戒', price: 5000 }
        ]
      },
      // 大晋皇都·符箓店
      dajin_talisman: {
        name: '大晋皇都·符箓店', location: 'dajin_city', type: 'talisman',
        items: [
          { id: 'fire_talisman4', name: '焚天符', price: 3000, limit: 2 },
          { id: 'ice_talisman4', name: '绝对零度符', price: 3500, limit: 2 }
        ]
      },
      // 大晋皇都·功法阁
      dajin_skill: {
        name: '大晋皇都·功法阁', location: 'dajin_city', type: 'skill',
        items: [
          { id: 'fansheng_remnant', name: '梵圣真魔功·残篇(地)', price: 5000 },
          { id: 'dayan', name: '大衍诀(天)', price: 8000 },
          { id: 'sanzhuan', name: '三转重元功(天)', price: 10000 },
          { id: 'moxiang', name: '魔相金身(地)', price: 4000 }
        ]
      },
      // 大晋皇都·杂货铺
      dajin_misc: {
        name: '大晋皇都·杂货铺', location: 'dajin_city', type: 'misc',
        items: [
          { id: 'thunder_wood', name: '雷击木', price: 150 },
          { id: 'soul_wood', name: '养魂木叶', price: 100 },
          { id: 'diamond', name: '金刚石', price: 300 },
          { id: 'ancient_fungus', name: '万年灵芝', price: 250 },
          { id: 'void_stone', name: '虚空石', price: 500 },
          { id: 'crane_feather', name: '云鹤羽', price: 40 },
          { id: 'soul_crystal', name: '魂晶', price: 600 }
        ]
      },
      // 灵界·天渊城·丹药铺（灵晶货币）
      tianyuan_pill: {
        name: '天渊城·丹药铺', location: 'tianyuan', type: 'pill', currency: 'spirit_crystal',
        items: [
          { id: 'xuling', name: '虚灵丹', price: 10 },
          { id: 'hehe', name: '合和丹', price: 30 },
          { id: 'due', name: '渡厄丹', price: 60 },
          { id: 'ancient_milk_pill', name: '万年灵乳(炼)', price: 10 },
          { id: 'yanghun_spirit', name: '养魂丹(灵界)', price: 60 },
          { id: 'taiyi', name: '太一丹(灵界)', price: 75 }
        ]
      },
      // 仙界·天庭城·丹药铺（仙灵石货币）
      tianting_pill: {
        name: '天庭城·丹药铺', location: 'tianting', type: 'pill', currency: 'immortal_stone',
        items: [
          { id: 'feixian', name: '飞仙丹(仙界)', price: 400 },
          { id: 'hongmeng_pill', name: '鸿蒙丹', price: 1500 },
          { id: 'wudao', name: '悟道丹', price: 3000 }
        ]
      }
    };

    // === 拍卖会数据 ===
    this.auctionData = {
      cd: 10, // 每10年举办
      entryFee: 1000, // 入场费
      lastAuctionDay: 0,
      // NPC竞价者5种
      npcBidders: [
        { name: '宗门长老', wealthMultiplier: 1.5, preference: '功法', style: '截胡' },
        { name: '富家散修', wealthMultiplier: 1.0, preference: '法宝', style: '跟价' },
        { name: '神秘人', wealthMultiplier: 2.0, preference: '特殊', style: '气势' },
        { name: '商会代表', wealthMultiplier: 1.2, preference: '材料', style: '冷静' },
        { name: '新手修士', wealthMultiplier: 0.5, preference: '低端', style: '热血' }
      ]
    };

    // === 黑市数据 ===
    this.blackMarketData = {
      levels: [
        { name: '天南★', safety: 0.5, maxGrade: '法宝', location: 'tiancheng' },
        { name: '乱星海★★', safety: 0.4, maxGrade: '古宝', location: 'tianxing' },
        { name: '大晋★★★', safety: 0.3, maxGrade: '玄天碎片', location: 'dajin_city' },
        { name: '灵界★★★★', safety: 0.2, maxGrade: '通天灵宝', location: 'tianyuan' },
        { name: '仙界★★★★★★★', safety: 0.1, maxGrade: '先天灵宝', location: 'tianting' }
      ],
      // 熟客度
      familiarity: 0,
      familiarityLevels: [
        { req: 100, benefit: '9折优惠' },
        { req: 300, benefit: '优质货源' },
        { req: 500, benefit: 'VIP房间' },
        { req: 1000, benefit: '黑市拍卖会' },
        { req: 2000, benefit: '禁忌情报' }
      ]
    };
  }

  // === 获取当前城市可用商店 ===
  getShopsForLocation(locationId) {
    return Object.values(this.shops).filter(shop => shop.location === locationId);
  }

  // === 获取商店商品（含折扣/浮动·按年刷新） ===
  getShopItems(shopId) {
    const shop = this.shops[shopId];
    if (!shop) return [];

    const year = Math.floor(this.gameState.gameTime.totalDays / 360); // 当前游戏年份

    return shop.items.map(item => ({
      ...item,
      price: this.applyPriceFluctuation(item.price, this._hashSeed(item.id, shopId, year))
    }));
  }

  // === 哈希函数（对输入变化高度敏感） ===
  _hashSeed(itemId, shopId, year) {
    // 组合：年份作为高倍率权重确保不同年份差异大
    let h = (year * 2654435761) & 0x7fffffff;
    const str = itemId + '_' + shopId;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h + str.charCodeAt(i)) & 0x7fffffff;
    }
    return (h % 10000) / 10000;
  }

  // === 物价浮动（按价格区间不同幅度，按年刷新） ===
  applyPriceFluctuation(basePrice, seed) {
    // 价格区间决定浮动幅度（廉价品波动大，贵重品波动小）
    let range;
    if (basePrice <= 10)      range = 0.30;
    else if (basePrice <= 100) range = 0.25;
    else if (basePrice <= 1000) range = 0.20;
    else                       range = 0.15;

    // seed 已经是 0~1 的确定性值，直接使用
    const r = (seed != null) ? seed : Math.random();

    const fluctuation = (1 - range) + r * range * 2;
    return Math.max(1, Math.round(basePrice * fluctuation));
  }

  // === 购买物品 ===
  buyItem(shopId, itemId, count = 1) {
    const shop = this.shops[shopId];
    if (!shop) return { success: false, text: '商店不存在' };

    // 检查是否在该商店所在城市
    if (shop.location !== this.gameState.currentLocation) {
      const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
      const loc = allLocations.find(l => l.id === shop.location);
      return { success: false, text: `需要前往${loc?.name || shop.location}才能在该商店购买` };
    }

    const shopItem = shop.items.find(i => i.id === itemId);
    if (!shopItem) return { success: false, text: '物品不存在' };

    // 检查限购
    if (shopItem.limit) {
      const bought = this.state?.shopLimits?.[shopId]?.[itemId] || 0;
      if (bought >= shopItem.limit) {
        return { success: false, text: `已达购买限制(${shopItem.limit})` };
      }
    }

    // 计算价格（与显示一致，按年浮动）
    const year = Math.floor(this.gameState.gameTime.totalDays / 360);
    const price = this.applyPriceFluctuation(shopItem.price, this._hashSeed(itemId, shopId, year)) * count;
    const currency = shop.currency || 'stone';

    // 检查货币
    if (currency === 'stone') {
      if (this.gameState.player.spiritStones < price) {
        return { success: false, text: `灵石不足，需要${price}灵石` };
      }
      this.gameState.player.spiritStones -= price;
    } else if (currency === 'spirit_crystal') {
      if (this.gameState.player.spiritCrystals < price) {
        return { success: false, text: `灵晶不足，需要${price}灵晶` };
      }
      this.gameState.player.spiritCrystals -= price;
    } else if (currency === 'immortal_stone') {
      if (this.gameState.player.immortalStones < price) {
        return { success: false, text: `仙灵石不足，需要${price}仙灵石` };
      }
      this.gameState.player.immortalStones -= price;
    }

    // 记录限购
    this.state = this.state || {};
    this.state.shopLimits = this.state.shopLimits || {};
    this.state.shopLimits[shopId] = this.state.shopLimits[shopId] || {};
    this.state.shopLimits[shopId][itemId] = (this.state.shopLimits[shopId][itemId] || 0) + count;

    // 添加物品
    this.addItemToInventory(itemId, count, shopItem.name);

    return { success: true, text: `购买${shopItem.name} x${count}，花费${price}${currency === 'stone' ? '灵石' : currency === 'spirit_crystal' ? '灵晶' : '仙灵石'}` };
  }

  // === 出售物品 ===
  sellItem(itemId, count = 1) {
    const item = this.gameState.inventory.find(i => i.id === itemId);
    if (!item || item.count < count) {
      return { success: false, text: '物品不足' };
    }

    // 获取物品数据
    const { ITEMS } = window.gameData;
    const itemData = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || [])].find(i => i.id === itemId);

    // 计算售价（GDD: 材料售价约为购买价的40%）
    const sellPrice = Math.floor((itemData?.sellPrice || itemData?.cost || 10) * 0.4 * count);

    // 消耗物品
    item.count -= count;
    if (item.count <= 0) {
      this.gameState.inventory.splice(this.gameState.inventory.indexOf(item), 1);
    }

    // 增加灵石
    this.gameState.player.spiritStones += sellPrice;

    return { success: true, text: `出售${item.name || itemId} x${count}，获得${sellPrice}灵石` };
  }

  // === 加入购物车（简化版：直接购买） ===

  // === 拍卖会系统 ===

  // 检查拍卖会是否可参加
  canAttendAuction() {
    const currentDay = this.gameState.gameTime.totalDays;
    const remaining = this.auctionData.cd - (currentDay - this.auctionData.lastAuctionDay);
    return { canAttend: remaining <= 0, remaining };
  }

  // 参加拍卖会
  attendAuction() {
    const check = this.canAttendAuction();
    if (!check.canAttend) {
      return { success: false, text: `拍卖会还需${check.remaining}天开启` };
    }

    // 检查入场费
    if (this.gameState.player.spiritStones < this.auctionData.entryFee) {
      return { success: false, text: `入场费不足，需要${this.auctionData.entryFee}灵石` };
    }

    this.gameState.player.spiritStones -= this.auctionData.entryFee;
    this.auctionData.lastAuctionDay = this.gameState.gameTime.totalDays;

    // 生成拍品列表（随机从当前区域高价值物品中选）
    const auctionItems = this.generateAuctionItems();

    return {
      success: true,
      text: `参加拍卖会，入场费${this.auctionData.entryFee}灵石`,
      items: auctionItems
    };
  }

  // 生成拍品
  generateAuctionItems() {
    const { ITEMS } = window.gameData;
    const allItems = [...(ITEMS.pills || []), ...(ITEMS.artifacts || [])];
    const highValue = allItems.filter(i => (i.cost || i.price || 0) > 1000);

    const count = 3 + Math.floor(Math.random() * 5);
    const items = [];
    for (let i = 0; i < Math.min(count, highValue.length); i++) {
      const item = highValue[Math.floor(Math.random() * highValue.length)];
      items.push({
        id: item.id,
        name: item.name,
        startingPrice: (item.cost || item.price || 1000) * 2,
        currentPrice: (item.cost || item.price || 1000) * 2,
        bidCount: 0
      });
    }
    return items;
  }

  // 竞拍
  bid(auctionItem, bidPrice) {
    if (bidPrice <= auctionItem.currentPrice) {
      return { success: false, text: '出价必须高于当前价格' };
    }

    if (this.gameState.player.spiritStones < bidPrice) {
      return { success: false, text: '灵石不足' };
    }

    // NPC竞争（50%概率被NPC出价）
    if (Math.random() < 0.5) {
      const npc = this.auctionData.npcBidders[Math.floor(Math.random() * this.auctionData.npcBidders.length)];
      const npcBid = Math.floor(bidPrice * (1 + Math.random() * 0.3));
      auctionItem.currentPrice = npcBid;
      auctionItem.bidCount++;
      return { success: false, text: `${npc.name}出价${npcBid}灵石！` };
    }

    // 成功拍得
    this.gameState.player.spiritStones -= bidPrice;
    this.addItemToInventory(auctionItem.id, 1, auctionItem.name);

    return { success: true, text: `以${bidPrice}灵石拍得${auctionItem.name}！` };
  }

  // === 黑市系统 ===

  // 检查黑市入口是否已发现
  hasBlackMarketAccess() {
    const state = this.gameState.blackMarket || {};
    return state.accessDiscovered || false;
  }

  // 尝试发现黑市入口
  discoverBlackMarket() {
    if (this.hasBlackMarketAccess()) {
      return { success: true, text: '你已经知道黑市入口了' };
    }

    // 基础发现率8%（GDD）
    let discoveryRate = 0.08;
    discoveryRate += (this.gameState.player.fortune || 10) * 0.002;

    if (Math.random() < discoveryRate) {
      this.gameState.blackMarket = this.gameState.blackMarket || {};
      this.gameState.blackMarket.accessDiscovered = true;
      this.gameState.blackMarket.familiarity = 0;

      // 确定黑市等级（按当前位置）
      const level = this.blackMarketData.levels.find(l => l.location === this.gameState.currentLocation);
      this.gameState.blackMarket.level = level || this.blackMarketData.levels[0];

      return { success: true, text: '你发现了黑市入口！' };
    }

    return { success: false, text: '没有找到黑市入口' };
  }

  // 进入黑市
  enterBlackMarket() {
    if (!this.hasBlackMarketAccess()) {
      return { success: false, text: '你不知道黑市入口在哪里' };
    }

    const bm = this.gameState.blackMarket;
    const level = bm.level || this.blackMarketData.levels[0];

    // 安全检查（GDD: 被劫概率 = 1 - safety）
    if (Math.random() > level.safety) {
      // 被劫！
      const stoneLoss = Math.floor(this.gameState.player.spiritStones * 0.3);
      this.gameState.player.spiritStones -= stoneLoss;
      return {
        success: false,
        text: `前往黑市途中被劫！损失${stoneLoss}灵石`,
        robbed: true
      };
    }

    bm.familiarity = (bm.familiarity || 0) + 1;

    // 确定折扣
    let discount = 1.0;
    for (const lvl of this.blackMarketData.familiarityLevels) {
      if (bm.familiarity >= lvl.req) discount = 0.9;
    }

    return { success: true, text: `进入${level.name}黑市`, discount, level };
  }

  // === 辅助方法 ===
  addItemToInventory(id, count, name) {
    const existing = this.gameState.inventory.find(i => i.id === id);
    if (existing) {
      existing.count += count;
    } else {
      this.gameState.inventory.push({
        id,
        name: name || id,
        type: 'item',
        count
      });
    }
  }
}
