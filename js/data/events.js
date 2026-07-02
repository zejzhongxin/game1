// 事件数据
export const EVENTS = {
  // 普通野外事件
  herb: { text: '你发现了一片灵草，小心采集后收入囊中。', reward: { type: 'item', id: 'herb', count: 3 }, chance: 0.3 },
  beast_weak: { text: '一只弱小的妖兽向你扑来！', reward: { type: 'combat', enemy: 'weak' }, chance: 0.2 },
  beast: { text: '一只妖兽挡住了去路！', reward: { type: 'combat', enemy: 'normal' }, chance: 0.2 },
  beast_strong: { text: '一只强大的妖兽出现了！', reward: { type: 'combat', enemy: 'strong' }, chance: 0.1 },
  cave: { text: '你发现了一个废弃洞府，搜索后发现了一些物品。', reward: { type: 'item', id: 'stone', count: 50 }, chance: 0.12 },
  spring: { text: '石缝中渗出一股灵泉，散发着淡淡的灵气。', reward: { type: 'buff', stat: 'maxMp', value: 3 }, chance: 0.08 },
  mine: { text: '你发现了一处矿脉，采集了一些矿石。', reward: { type: 'item', id: 'iron', count: 3 }, chance: 0.1 },
  trap: { text: '你触发了一个陷阱！', reward: { type: 'damage', percent: 15 }, chance: 0.05 },
  npc: { text: '你遇到了一位散修，交谈后获得了情报。', reward: { type: 'fame', value: 5 }, chance: 0.08 },
  nothing: { text: '转了一圈，什么也没发现。', reward: null, chance: 0.02 },
  // 城镇事件
  shop: { text: '你来到了坊市，可以购买物品。', reward: { type: 'shop' }, chance: 0.25 },
  auction: { text: '拍卖会即将开始，是否参加？', reward: { type: 'auction' }, chance: 0.08 },
  quest: { text: '告示板上贴着新的任务。', reward: { type: 'quest' }, chance: 0.15 },
  black_market: { text: '有人向你兜售来历不明的物品。', reward: { type: 'black_market' }, chance: 0.1 },
  // 宗门事件
  sect: { text: '你来到了宗门驻地。', reward: { type: 'sect' }, chance: 0.25 },
  skill: { text: '你在藏经阁发现了一部功法。', reward: { type: 'skill' }, chance: 0.2 },
  sect_quest: { text: '宗门发布了新的任务。', reward: { type: 'sect_quest' }, chance: 0.15 },
  duel: { text: '一名同门邀请你切磋。', reward: { type: 'combat', enemy: 'sect' }, chance: 0.15 },
  lecture: { text: '长老今日开坛讲学。', reward: { type: 'exp_bonus', value: 1.5, duration: 7 }, chance: 0.12 },
  // 秘境事件
  secret: { text: '你进入了秘境，四周充满了灵气。', reward: { type: 'secret' }, chance: 0.2 },
  boss: { text: '一只强大的守护兽挡住了去路！', reward: { type: 'combat', enemy: 'boss' }, chance: 0.15 },
  treasure: { text: '你发现了一个宝箱！', reward: { type: 'treasure' }, chance: 0.2 },
  forbidden: { text: '一道禁制挡住了去路。', reward: { type: 'puzzle' }, chance: 0.15 },
  heritage: { text: '你发现了前人留下的传承！', reward: { type: 'heritage' }, chance: 0.1 },
  ancient: { text: '你进入了古老的遗迹。', reward: { type: 'ancient' }, chance: 0.2 },
  // 特殊事件
  environment: { text: '环境恶劣，需要小心应对。', reward: { type: 'environment' }, chance: 0.3 },
  body_refine: { text: '这里适合炼体修炼。', reward: { type: 'body_exp', value: 100 }, chance: 0.2 },
  demon: { text: '魔气弥漫，需要运功抵抗。', reward: { type: 'debuff', stat: 'mp', value: 0.1 }, chance: 0.2 },
  chaos: { text: '混沌之力涌动，修炼速度大增！', reward: { type: 'buff', stat: 'cultivation', value: 3, duration: 3 }, chance: 0.15 },
  time: { text: '时间在这里流动异常。', reward: { type: 'time_anomaly' }, chance: 0.1 },
  final: { text: '你来到了轮回殿，面对最终的考验。', reward: { type: 'final' }, chance: 1.0 },
  
  // 额外事件 - 补充至50+种
  // 野外事件
  spirit_spring: { text: '你发现了一处灵泉，饮用后灵力上限永久+3。', reward: { type: 'buff', stat: 'maxMp', value: 3 }, chance: 0.05 },
  ancient_tree: { text: '一棵古树引起了你的注意，树上结着奇异的果实。', reward: { type: 'item', id: 'herb', count: 10 }, chance: 0.03 },
  meteorite: { text: '一块陨石从天而降，里面似乎有稀有矿石。', reward: { type: 'item', id: 'iron', count: 10 }, chance: 0.02 },
  fairy_light: { text: '远处出现一道奇异的光芒，似乎有什么宝物。', reward: { type: 'treasure' }, chance: 0.05 },
  spirit_beast_track: { text: '你发现了灵兽的足迹，似乎就在附近。', reward: { type: 'beast' }, chance: 0.08 },
  abandoned_camp: { text: '你发现了一个被遗弃的营地，里面还有一些物品。', reward: { type: 'item', id: 'herb', count: 5 }, chance: 0.06 },
  mysterious_cave: { text: '一个神秘的洞穴出现在你面前。', reward: { type: 'secret' }, chance: 0.04 },
  ancient_inscription: { text: '你发现了一块古老的石碑，上面刻着修炼心得。', reward: { type: 'exp', value: 100 }, chance: 0.03 },

  // 灵根变异事件
  root_mutation_thunder: { text: '渡劫时被天雷劈中，你的金属性灵根变异为雷灵根！', reward: { type: 'root_mutation', from: '金', to: '雷' }, chance: 0.01 },
  root_mutation_ice: { text: '跌入万年冰窟，你的水属性灵根变异为冰灵根！', reward: { type: 'root_mutation', from: '水', to: '冰' }, chance: 0.01 },
  root_mutation_wood: { text: '吸收了千年灵木的精华，你的木属性灵根变异为风灵根！', reward: { type: 'root_mutation', from: '木', to: '风' }, chance: 0.01 },
  root_mutation_fire: { text: '吞噬了地心之火，你的火属性灵根变异为天火灵根！', reward: { type: 'root_mutation', from: '火', to: '天火' }, chance: 0.01 },
  root_mutation_earth: { text: '吸收了大地龙脉之力，你的土属性灵根变异为岩灵根（强化）！', reward: { type: 'root_mutation', from: '土', to: '岩' }, chance: 0.01 },
  
  // 城镇事件
  street_fight: { text: '街上有两名修士在比试，围观的人很多。', reward: { type: 'exp', value: 50 }, chance: 0.1 },
  tea_house: { text: '你来到茶馆，听到了一些有趣的消息。', reward: { type: 'fame', value: 3 }, chance: 0.08 },
  medicine_shop: { text: '药铺里有稀有的丹药出售。', reward: { type: 'shop' }, chance: 0.1 },
  artifact_shop: { text: '法器阁里有不错的法宝。', reward: { type: 'shop' }, chance: 0.1 },
  talisman_shop: { text: '符箓店里有各种符箓。', reward: { type: 'shop' }, chance: 0.1 },
  
  // 宗门事件
  sect_gathering: { text: '宗门正在举行聚会，同门们都在交流修炼心得。', reward: { type: 'exp', value: 80 }, chance: 0.08 },
  sect_mission: { text: '宗门发布了一个紧急任务。', reward: { type: 'sect_quest' }, chance: 0.1 },
  sect_tournament: { text: '宗门正在举行比武大会。', reward: { type: 'combat', enemy: 'sect' }, chance: 0.05 },
  sect_elder: { text: '长老正在传授功法。', reward: { type: 'skill' }, chance: 0.03 },
  
  // 秘境事件
  ancient_formation: { text: '你发现了一个古老的阵法。', reward: { type: 'puzzle' }, chance: 0.1 },
  spirit_vein: { text: '你发现了一条灵脉，灵气非常浓郁。', reward: { type: 'buff', stat: 'cultivation', value: 2, duration: 7 }, chance: 0.05 },
  ancient_artifact: { text: '你发现了一件古老的法宝。', reward: { type: 'heritage' }, chance: 0.03 },
  forbidden_zone: { text: '这里被强大的禁制封锁。', reward: { type: 'forbidden' }, chance: 0.08 },
  
  // 灵界事件
  spirit_realm_gate: { text: '你发现了一个通往灵界其他区域的传送门。', reward: { type: 'teleport' }, chance: 0.05 },
  alien_invasion: { text: '异族正在入侵，需要支援！', reward: { type: 'combat', enemy: 'strong' }, chance: 0.1 },
  spirit_market: { text: '灵界集市正在举行，各种稀有物品。', reward: { type: 'shop' }, chance: 0.1 },
  
  // 仙界事件
  immortal_feast: { text: '仙界正在举行蟠桃会。', reward: { type: 'buff', stat: 'all', value: 1.5, duration: 30 }, chance: 0.02 },
  chaos_rift: { text: '混沌裂缝出现了，里面有大机缘。', reward: { type: 'secret' }, chance: 0.05 },
  law_insight: { text: '你感受到了法则的波动。', reward: { type: 'exp', value: 10000 }, chance: 0.03 },
  reincarnation_gate: { text: '轮回之门出现了。', reward: { type: 'final' }, chance: 0.01 },

  // 通用事件（跨地点触发）
  combat: { text: '你遭遇了敌人！', reward: { type: 'combat', enemy: 'normal' }, chance: 0.3 },
  spirit_beast: { text: '你发现了灵兽的踪迹！', reward: { type: 'beast' }, chance: 0.15 },
  alchemy: { text: '这里适合炼丹，发现了稀有药材。', reward: { type: 'item', id: 'herb', count: 5 }, chance: 0.1 }
};

// 事件按地点类型分类（用于探索系统按类型过滤事件池）
export const EVENT_LOCATION_TYPES = {
  // 普通野外事件
  herb: 'wild', beast_weak: 'wild', beast: 'wild', beast_strong: 'wild',
  cave: 'wild', spring: 'wild', mine: 'wild', trap: 'wild', npc: 'wild',
  nothing: 'wild', environment: 'wild', body_refine: 'wild',
  spirit_spring: 'wild', ancient_tree: 'wild', meteorite: 'wild',
  fairy_light: 'wild', spirit_beast_track: 'wild', abandoned_camp: 'wild',
  mysterious_cave: 'wild', ancient_inscription: 'wild',
  root_mutation_thunder: 'wild', root_mutation_ice: 'wild',
  root_mutation_wood: 'wild', root_mutation_fire: 'wild', root_mutation_earth: 'wild',
  // 城镇事件
  shop: 'town', auction: 'town', quest: 'town', black_market: 'town',
  street_fight: 'town', tea_house: 'town', medicine_shop: 'town',
  artifact_shop: 'town', talisman_shop: 'town',
  // 宗门事件
  sect: 'sect', skill: 'sect', sect_quest: 'sect', duel: 'sect',
  lecture: 'sect', sect_gathering: 'sect', sect_mission: 'sect',
  sect_tournament: 'sect', sect_elder: 'sect',
  // 秘境事件
  secret: 'secret', boss: 'secret', treasure: 'secret', forbidden: 'secret',
  heritage: 'secret', ancient: 'secret', ancient_formation: 'secret',
  spirit_vein: 'secret', ancient_artifact: 'secret', forbidden_zone: 'secret',
  // 危险/特殊事件
  demon: 'danger', chaos: 'danger', time: 'danger', final: 'danger',
  spirit_realm_gate: 'danger', alien_invasion: 'danger', spirit_market: 'danger',
  immortal_feast: 'danger', chaos_rift: 'danger', law_insight: 'danger',
  reincarnation_gate: 'danger'
};

// 事件文本变体池（每事件3套文本，防重复）
export const EVENT_TEXT_VARIANTS = {
  herb: [
    '你拨开一丛茂密的灌木，发现了一片灵草。',
    '山壁上几株灵草在风中轻轻摇曳。',
    '石缝里长着一小片灵草，叶片上灵气充沛。'
  ],
  beast_weak: [
    '一只弱小的妖兽向你扑来！',
    '草丛中窜出一只低阶妖兽。',
    '一只刚成年的妖兽拦住了路。'
  ],
  beast: [
    '一只妖兽挡住了去路！',
    '前方传来妖兽的低吼声。',
    '一只妖兽警惕地盯着你。'
  ],
  cave: [
    '你发现了一个废弃洞府，搜索后发现了一些物品。',
    '山壁上有个隐蔽的洞口，里面似乎有人住过。',
    '一处被藤蔓遮掩的洞府引起了你的注意。'
  ],
  spring: [
    '石缝中渗出一股灵泉，散发着淡淡的灵气。',
    '你发现了一处灵气充沛的泉水。',
    '潺潺泉水从岩壁流出，灵气逼人。'
  ],
  trap: [
    '你触发了一个陷阱！',
    '脚下突然一空，有人在此设了陷阱！',
    '一道机关被触动，你中了埋伏！'
  ],
  npc: [
    '你遇到了一位散修，交谈后获得了情报。',
    '前方有一位修士正在打坐，见你来了主动打招呼。',
    '一位赶路的修士停下来和你闲聊了几句。'
  ],
  shop: [
    '你来到了坊市，可以购买物品。',
    '热闹的坊市中各色摊位琳琅满目。',
    '坊市里人来人往，好不热闹。'
  ],
  black_market: [
    '有人向你兜售来历不明的物品。',
    '一个黑衣人悄悄走近，问你是否需要"特殊渠道"的货。',
    '角落里有人低声叫卖，眼神闪烁不定。'
  ],
  treasure: [
    '你发现了一个宝箱！',
    '角落里有一个上锁的宝箱。',
    '一道微弱的光芒从宝箱缝隙中透出。'
  ],
  forbidden: [
    '一道禁制挡住了去路。',
    '前方被强大的禁制封锁，无法通行。',
    '古老的禁制散发着令人心悸的气息。'
  ]
};

// 敌人数据
export const ENEMIES = {
  weak: [
    { name: '山野狼', hp: 30, atk: 8, def: 3, exp: 10, loot: [{ id: 'herb', chance: 0.5 }] },
    { name: '毒腹蛇', hp: 20, atk: 10, def: 2, exp: 12, loot: [{ id: 'herb', chance: 0.3 }] },
    { name: '黑纹豹', hp: 60, atk: 15, def: 5, exp: 20, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '百年山魈', hp: 80, atk: 18, def: 6, exp: 25, loot: [{ id: 'herb', chance: 0.4 }, { id: 'beast_core', chance: 0.1 }] },
    { name: '风吼蝠', hp: 40, atk: 18, def: 2, exp: 15, loot: [{ id: 'herb', chance: 0.3 }] },
    { name: '云纹鹿', hp: 150, atk: 20, def: 8, exp: 30, loot: [{ id: 'herb', chance: 0.7 }] },
    { name: '妖化灵猴', hp: 220, atk: 50, def: 10, exp: 40, loot: [{ id: 'herb', chance: 0.5 }] }
  ],
  normal: [
    // 人界·天南大陆
    { name: '黑风狼', hp: 70, atk: 20, def: 4, exp: 30, loot: [{ id: 'beast_core', chance: 0.2 }] },
    { name: '毒纹蛛', hp: 50, atk: 22, def: 3, exp: 25, loot: [{ id: 'herb', chance: 0.4 }] },
    { name: '石甲龟', hp: 120, atk: 12, def: 15, exp: 35, loot: [{ id: 'iron', chance: 0.3 }] },
    { name: '血蝙蝠', hp: 80, atk: 25, def: 3, exp: 20, loot: [{ id: 'herb', chance: 0.3 }] },
    { name: '铁羽鹰', hp: 200, atk: 50, def: 10, exp: 40, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '巡逻傀儡', hp: 250, atk: 35, def: 25, exp: 40, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '禁制守卫', hp: 600, atk: 70, def: 30, exp: 90, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '机关石兽', hp: 800, atk: 60, def: 40, exp: 100, loot: [{ id: 'iron', chance: 0.6 }] },
    // 人界·乱星海
    { name: '锯齿鲨', hp: 500, atk: 80, def: 15, exp: 80, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '电光水母', hp: 300, atk: 90, def: 5, exp: 70, loot: [{ id: 'beast_core', chance: 0.2 }] },
    { name: '巨钳蟹', hp: 600, atk: 70, def: 30, exp: 90, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '石傀', hp: 700, atk: 50, def: 35, exp: 85, loot: [{ id: 'iron', chance: 0.6 }] },
    { name: '矿洞毒蛛', hp: 400, atk: 85, def: 10, exp: 75, loot: [{ id: 'poison_grass', chance: 0.5 }] },
    { name: '藤妖', hp: 600, atk: 70, def: 20, exp: 80, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '幻雾蝶', hp: 250, atk: 60, def: 8, exp: 60, loot: [{ id: 'herb', chance: 0.4 }] },
    { name: '血纹蟒', hp: 250, atk: 45, def: 12, exp: 100, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '毒血蝎', hp: 150, atk: 50, def: 8, exp: 90, loot: [{ id: 'poison_grass', chance: 0.6 }] },
    { name: '青木蟒', hp: 180, atk: 30, def: 10, exp: 60, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '铁背龟', hp: 1500, atk: 60, def: 55, exp: 120, loot: [{ id: 'iron', chance: 0.7 }] },
    { name: '血瞳猿', hp: 1800, atk: 160, def: 20, exp: 150, loot: [{ id: 'beast_core', chance: 0.4 }] },
    { name: '铁甲蟹', hp: 1000, atk: 80, def: 40, exp: 100, loot: [{ id: 'iron', chance: 0.6 }] },
    { name: '魔化骨兵', hp: 1500, atk: 140, def: 15, exp: 130, loot: [{ id: 'poison_grass', chance: 0.4 }] },
    { name: '巡海夜叉', hp: 700, atk: 100, def: 20, exp: 90, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '蟹将', hp: 1200, atk: 90, def: 40, exp: 110, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '蛟', hp: 1000, atk: 120, def: 25, exp: 150, loot: [{ id: 'beast_core', chance: 0.4 }] },
    // 人界·大晋
    { name: '疾风狼', hp: 1500, atk: 170, def: 15, exp: 140, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '草原巨蜥', hp: 3500, atk: 150, def: 40, exp: 180, loot: [{ id: 'beast_core', chance: 0.4 }] },
    { name: '冰原熊', hp: 4000, atk: 220, def: 40, exp: 200, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '阴魂', hp: 800, atk: 120, def: 10, exp: 100, loot: [{ id: 'soul_crystal', chance: 0.2 }] },
    { name: '骷髅战将', hp: 2000, atk: 150, def: 30, exp: 160, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '魔化巨蝠', hp: 1800, atk: 160, def: 15, exp: 150, loot: [{ id: 'poison_grass', chance: 0.4 }] },
    { name: '千年藤妖', hp: 2500, atk: 140, def: 30, exp: 170, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '慕兰勇士', hp: 2500, atk: 200, def: 25, exp: 220, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '雪女', hp: 3000, atk: 240, def: 20, exp: 250, loot: [{ id: 'cold_jade', chance: 0.6 }] },
    { name: '古战魂', hp: 3000, atk: 200, def: 20, exp: 280, loot: [{ id: 'soul_crystal', chance: 0.4 }] },
    { name: '封印守卫', hp: 3000, atk: 130, def: 65, exp: 300, loot: [{ id: 'iron', chance: 0.7 }] },
    { name: '魔化妖将', hp: 4000, atk: 250, def: 35, exp: 350, loot: [{ id: 'demon_core', chance: 0.5 }] },
    { name: '万年木灵', hp: 5000, atk: 200, def: 40, exp: 400, loot: [{ id: 'ancient_fungus', chance: 0.4 }] },
    { name: '低阶心魔', hp: 2000, atk: 200, def: 15, exp: 200, loot: [{ id: 'soul_crystal', chance: 0.3 }] },
    { name: '魔界甲士', hp: 5000, atk: 280, def: 45, exp: 350, loot: [{ id: 'demon_core', chance: 0.4 }] },
    // 灵界
    { name: '虚空兽', hp: 8000, atk: 400, def: 60, exp: 500, loot: [{ id: 'void_crystal', chance: 0.3 }] },
    { name: '秘境石人', hp: 1200, atk: 80, def: 50, exp: 100, loot: [{ id: 'iron', chance: 0.6 }] },
    { name: '金甲傀儡', hp: 2500, atk: 120, def: 60, exp: 200, loot: [{ id: 'iron', chance: 0.7 }] },
    { name: '冰火双煞', hp: 1800, atk: 160, def: 25, exp: 180, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '金翅鹏', hp: 2000, atk: 180, def: 25, exp: 200, loot: [{ id: 'beast_core', chance: 0.6 }] },
    { name: '血修', hp: 2000, atk: 170, def: 20, exp: 170, loot: [{ id: 'poison_grass', chance: 0.4 }] },
    { name: '海族祭祀', hp: 900, atk: 130, def: 15, exp: 120, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '驯兽师', hp: 500, atk: 60, def: 20, exp: 80, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '妖化灵猴', hp: 220, atk: 50, def: 10, exp: 60, loot: [{ id: 'herb', chance: 0.4 }] },
    { name: '金毛狈', hp: 400, atk: 75, def: 18, exp: 80, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '陨铁矿傀儡', hp: 3000, atk: 100, def: 70, exp: 200, loot: [{ id: 'iron', chance: 0.8 }] },
    { name: '流窜匪修', hp: 6000, atk: 350, def: 40, exp: 600, loot: [{ id: 'stone', count: 200 }] },
    { name: '异族密探', hp: 8000, atk: 400, def: 35, exp: 800, loot: [{ id: 'stone', count: 500 }] },
    { name: '异族先锋', hp: 10000, atk: 500, def: 50, exp: 1000, loot: [{ id: 'spirit_crystal', chance: 0.3 }] },
    { name: '角蚩族战士', hp: 15000, atk: 600, def: 70, exp: 1500, loot: [{ id: 'spirit_crystal', chance: 0.4 }] },
    { name: '巡山小妖', hp: 10000, atk: 450, def: 40, exp: 800, loot: [{ id: 'demon_core', chance: 0.3 }] },
    { name: '化形妖修', hp: 20000, atk: 700, def: 80, exp: 2000, loot: [{ id: 'demon_core', chance: 0.4 }] },
    { name: '碧鳞蟒', hp: 30000, atk: 650, def: 60, exp: 3000, loot: [{ id: 'demon_core', chance: 0.5 }] },
    { name: '浮游灵石', hp: 10000, atk: 300, def: 20, exp: 500, loot: [{ id: 'spirit_crystal', chance: 0.3 }] },
    { name: '暗噬虫', hp: 5000, atk: 400, def: 20, exp: 400, loot: [{ id: 'demon_core', chance: 0.3 }] },
    { name: '地煞灵', hp: 40000, atk: 700, def: 100, exp: 5000, loot: [{ id: 'demon_core', chance: 0.4 }] },
    { name: '游荡残魂', hp: 20000, atk: 600, def: 20, exp: 2000, loot: [{ id: 'soul_crystal', chance: 0.3 }] },
    { name: '血灵蝠', hp: 8000, atk: 500, def: 15, exp: 600, loot: [{ id: 'demon_core', chance: 0.3 }] },
    { name: '血晶傀儡', hp: 50000, atk: 700, def: 80, exp: 5000, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '雷灵兽', hp: 80000, atk: 1200, def: 80, exp: 8000, loot: [{ id: 'thunder_stone', chance: 0.4 }] },
    { name: '迷雾幻灵', hp: 50000, atk: 800, def: 30, exp: 5000, loot: [{ id: 'spirit_crystal', chance: 0.3 }] },
    { name: '魔化骨龙', hp: 120000, atk: 1500, def: 150, exp: 12000, loot: [{ id: 'demon_core', chance: 0.4 }] },
    // 仙界
    { name: '金甲守卫', hp: 150000, atk: 3000, def: 300, exp: 15000, loot: [{ id: 'immortal_stone', count: 30 }] },
    { name: '金源兽', hp: 300000, atk: 5000, def: 400, exp: 30000, loot: [{ id: 'immortal_stone', count: 100 }] },
    { name: '冰晶兽', hp: 400000, atk: 4500, def: 350, exp: 40000, loot: [{ id: 'immortal_stone', count: 50 }] },
    { name: '天兵守卫', hp: 200000, atk: 3500, def: 200, exp: 20000, loot: [{ id: 'immortal_stone', count: 20 }] },
    { name: '混沌兽', hp: 800000, atk: 10000, def: 200, exp: 80000, loot: [{ id: 'immortal_stone', count: 100 }] },
    { name: '虚空吞噬者', hp: 3000000, atk: 20000, def: 400, exp: 300000, loot: [{ id: 'immortal_stone', count: 300 }] },
    { name: '时痕兽', hp: 5000000, atk: 30000, def: 1000, exp: 500000, loot: [{ id: 'immortal_stone', count: 500 }] },
    { name: '轮回守卫', hp: 10000000, atk: 50000, def: 2000, exp: 1000000, loot: [{ id: 'immortal_stone', count: 1000 }] }
  ],
  strong: [
    // 人界·天南大陆
    { name: '黑风鹫', hp: 200, atk: 35, def: 8, exp: 80, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '赤焰蟒', hp: 250, atk: 45, def: 12, exp: 100, loot: [{ id: 'beast_core', chance: 0.6 }, { id: 'fire_stone', chance: 0.2 }] },
    { name: '傀儡守卫', hp: 300, atk: 40, def: 20, exp: 120, loot: [{ id: 'iron', chance: 0.8 }] },
    { name: '血纹蟒', hp: 250, atk: 45, def: 12, exp: 100, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '毒血蝎', hp: 150, atk: 50, def: 8, exp: 90, loot: [{ id: 'poison_grass', chance: 0.6 }] },
    { name: '石灵', hp: 500, atk: 30, def: 35, exp: 150, loot: [{ id: 'iron', chance: 0.8 }] },
    { name: '鬼面蜈蚣', hp: 350, atk: 55, def: 12, exp: 130, loot: [{ id: 'poison_grass', chance: 0.7 }] },
    { name: '铁羽鹰', hp: 200, atk: 50, def: 10, exp: 80, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '青木蟒', hp: 180, atk: 30, def: 10, exp: 60, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '赤腹蝎', hp: 100, atk: 35, def: 5, exp: 50, loot: [{ id: 'poison_grass', chance: 0.5 }] },
    // 人界·乱星海
    { name: '铁背龟', hp: 1500, atk: 60, def: 55, exp: 120, loot: [{ id: 'iron', chance: 0.7 }] },
    { name: '血瞳猿', hp: 1800, atk: 160, def: 20, exp: 150, loot: [{ id: 'beast_core', chance: 0.4 }] },
    { name: '金翅鹏', hp: 2000, atk: 180, def: 25, exp: 200, loot: [{ id: 'beast_core', chance: 0.6 }] },
    { name: '铁甲蟹', hp: 1000, atk: 80, def: 40, exp: 100, loot: [{ id: 'iron', chance: 0.6 }] },
    { name: '魔化骨兵', hp: 1500, atk: 140, def: 15, exp: 130, loot: [{ id: 'poison_grass', chance: 0.4 }] },
    { name: '巡海夜叉', hp: 700, atk: 100, def: 20, exp: 90, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '蟹将', hp: 1200, atk: 90, def: 40, exp: 110, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '蛟', hp: 1000, atk: 120, def: 25, exp: 150, loot: [{ id: 'beast_core', chance: 0.4 }] },
    { name: '冰妖', hp: 1500, atk: 130, def: 30, exp: 180, loot: [{ id: 'cold_jade', chance: 0.5 }] },
    { name: '火妖', hp: 1200, atk: 150, def: 20, exp: 160, loot: [{ id: 'fire_stone', chance: 0.5 }] },
    // 人界·大晋
    { name: '疾风狼', hp: 1500, atk: 170, def: 15, exp: 140, loot: [{ id: 'beast_core', chance: 0.3 }] },
    { name: '草原巨蜥', hp: 3500, atk: 150, def: 40, exp: 180, loot: [{ id: 'beast_core', chance: 0.4 }] },
    { name: '冰原熊', hp: 4000, atk: 220, def: 40, exp: 200, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '阴魂', hp: 800, atk: 120, def: 10, exp: 100, loot: [{ id: 'soul_crystal', chance: 0.2 }] },
    { name: '骷髅战将', hp: 2000, atk: 150, def: 30, exp: 160, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '魔化巨蝠', hp: 1800, atk: 160, def: 15, exp: 150, loot: [{ id: 'poison_grass', chance: 0.4 }] },
    { name: '千年藤妖', hp: 2500, atk: 140, def: 30, exp: 170, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '慕兰勇士', hp: 2500, atk: 200, def: 25, exp: 220, loot: [{ id: 'beast_core', chance: 0.5 }] },
    { name: '雪女', hp: 3000, atk: 240, def: 20, exp: 250, loot: [{ id: 'cold_jade', chance: 0.6 }] },
    { name: '古战魂', hp: 3000, atk: 200, def: 20, exp: 280, loot: [{ id: 'soul_crystal', chance: 0.4 }] },
    { name: '封印守卫', hp: 3000, atk: 130, def: 65, exp: 300, loot: [{ id: 'iron', chance: 0.7 }] },
    { name: '魔化妖将', hp: 4000, atk: 250, def: 35, exp: 350, loot: [{ id: 'demon_core', chance: 0.5 }] },
    { name: '万年木灵', hp: 5000, atk: 200, def: 40, exp: 400, loot: [{ id: 'ancient_fungus', chance: 0.4 }] },
    { name: '陨铁矿傀儡', hp: 3000, atk: 100, def: 70, exp: 200, loot: [{ id: 'iron', chance: 0.8 }] },
    { name: '机关石兽', hp: 800, atk: 60, def: 40, exp: 100, loot: [{ id: 'iron', chance: 0.6 }] },
    // 灵界
    { name: '灵界妖兽', hp: 10000, atk: 500, def: 100, exp: 800, loot: [{ id: 'demon_core', chance: 0.4 }] },
    { name: '异族战士', hp: 15000, atk: 800, def: 150, exp: 1200, loot: [{ id: 'demon_core', chance: 0.5 }] },
    { name: '木族修士', hp: 12000, atk: 600, def: 120, exp: 900, loot: [{ id: 'herb', chance: 0.6 }] },
    { name: '夜叉战士', hp: 18000, atk: 1000, def: 180, exp: 1500, loot: [{ id: 'demon_core', chance: 0.5 }] },
    { name: '影族刺客', hp: 10000, atk: 1200, def: 80, exp: 1000, loot: [{ id: 'poison_grass', chance: 0.6 }] },
    { name: '灵族修士', hp: 20000, atk: 900, def: 200, exp: 1300, loot: [{ id: 'spirit_crystal', chance: 0.3 }] },
    { name: '角蚩族战士', hp: 25000, atk: 1500, def: 250, exp: 2000, loot: [{ id: 'demon_core', chance: 0.6 }] },
    { name: '天晶族修士', hp: 22000, atk: 1100, def: 300, exp: 1800, loot: [{ id: 'iron', chance: 0.7 }] },
    { name: '巨人族战士', hp: 30000, atk: 2000, def: 200, exp: 2500, loot: [{ id: 'demon_core', chance: 0.5 }] },
    { name: '碧鳞蟒', hp: 30000, atk: 650, def: 60, exp: 5000, loot: [{ id: 'demon_core', chance: 0.4 }] },
    { name: '空晶兽', hp: 50000, atk: 800, def: 60, exp: 8000, loot: [{ id: 'void_crystal', chance: 0.3 }] },
    { name: '地煞灵', hp: 40000, atk: 700, def: 100, exp: 6000, loot: [{ id: 'demon_core', chance: 0.3 }] },
    { name: '万年石灵', hp: 100000, atk: 600, def: 300, exp: 15000, loot: [{ id: 'iron', chance: 0.5 }] },
    { name: '雷灵兽', hp: 80000, atk: 1200, def: 80, exp: 12000, loot: [{ id: 'thunder_stone', chance: 0.4 }] },
    // 仙界
    { name: '仙界妖兽', hp: 100000, atk: 5000, def: 500, exp: 10000, loot: [{ id: 'immortal_core', chance: 0.4 }] },
    { name: '仙兽', hp: 200000, atk: 10000, def: 1000, exp: 20000, loot: [{ id: 'immortal_core', chance: 0.5 }] },
    { name: '混沌兽', hp: 500000, atk: 30000, def: 3000, exp: 50000, loot: [{ id: 'chaos_gas', chance: 0.3 }] },
    { name: '古神残念', hp: 1000000, atk: 50000, def: 5000, exp: 100000, loot: [{ id: 'origin_crystal', chance: 0.2 }] },
    { name: '时间守护者', hp: 800000, atk: 40000, def: 4000, exp: 80000, loot: [{ id: 'lunhui_stone', chance: 0.1 }] },
    { name: '虚空行者', hp: 600000, atk: 35000, def: 3500, exp: 60000, loot: [{ id: 'void_crystal', chance: 0.3 }] },
    { name: '因果之虫', hp: 400000, atk: 25000, def: 2500, exp: 40000, loot: [{ id: 'chaos_fragment', chance: 0.1 }] },
    { name: '命运之蛇', hp: 500000, atk: 30000, def: 3000, exp: 50000, loot: [{ id: 'origin_law', chance: 0.05 }] },
    { name: '本源之灵', hp: 300000, atk: 20000, def: 2000, exp: 30000, loot: [{ id: 'origin_crystal', chance: 0.2 }] },
    { name: '造化之兽', hp: 700000, atk: 45000, def: 4500, exp: 70000, loot: [{ id: 'chaos_fragment', chance: 0.15 }] }
  ],
  boss: [
    // 人界·天南大陆
    { name: '墨大夫', hp: 150, atk: 25, def: 10, exp: 200, loot: [{ id: 'herb', count: 10 }] },
    { name: '守护灵兽', hp: 800, atk: 80, def: 25, exp: 500, loot: [{ id: 'herb', count: 20 }, { id: 'beast_core', count: 3 }] },
    { name: '传送阵守护灵', hp: 1200, atk: 100, def: 35, exp: 800, loot: [{ id: 'space_shard', count: 3 }] },
    // 人界·乱星海
    { name: '万载灵药守护兽', hp: 2500, atk: 150, def: 40, exp: 1500, loot: [{ id: 'ancient_fungus', count: 1 }] },
    { name: '虚天鼎守护灵', hp: 5000, atk: 200, def: 50, exp: 3000, loot: [{ id: 'void_stone', count: 1 }] },
    { name: '妖王', hp: 5000, atk: 250, def: 55, exp: 2500, loot: [{ id: 'demon_core', count: 5 }] },
    { name: '魔岛岛主', hp: 4000, atk: 220, def: 40, exp: 2000, loot: [{ id: 'demon_core', count: 3 }] },
    // 人界·大晋
    { name: '远古将军', hp: 6000, atk: 280, def: 50, exp: 3500, loot: [{ id: 'ancient_fungus', count: 2 }] },
    { name: '古魔分身', hp: 10000, atk: 350, def: 70, exp: 5000, loot: [{ id: 'demon_core', count: 5 }] },
    { name: '木灵守护者', hp: 12000, atk: 300, def: 60, exp: 6000, loot: [{ id: 'ancient_fungus', count: 3 }] },
    { name: '古魔使徒', hp: 20000, atk: 450, def: 80, exp: 10000, loot: [{ id: 'demon_core', count: 10 }] },
    // 灵界
    { name: '天渊巨兽', hp: 80000, atk: 1200, def: 200, exp: 30000, loot: [{ id: 'demon_core', count: 20 }] },
    { name: '万妖之王', hp: 150000, atk: 1500, def: 250, exp: 80000, loot: [{ id: 'demon_core', count: 50 }] },
    { name: '深渊触手', hp: 200000, atk: 1500, def: 150, exp: 100000, loot: [{ id: 'demon_core', count: 30 }] },
    { name: '远古将灵', hp: 150000, atk: 1800, def: 200, exp: 80000, loot: [{ id: 'ancient_fungus', count: 10 }] },
    { name: '血神守护', hp: 250000, atk: 2000, def: 250, exp: 150000, loot: [{ id: 'true_blood', count: 1 }] },
    { name: '雷劫古兽', hp: 300000, atk: 2500, def: 300, exp: 120000, loot: [{ id: 'thunder_stone', count: 5 }] },
    { name: '古魔真身', hp: 500000, atk: 4000, def: 500, exp: 250000, loot: [{ id: 'chaos_stone', count: 1 }] },
    // 仙界
    { name: '金源仙帝化身', hp: 1500000, atk: 15000, def: 1000, exp: 3000000, loot: [{ id: 'origin_crystal', count: 10 }] },
    { name: '北寒仙帝', hp: 2000000, atk: 20000, def: 1500, exp: 5000000, loot: [{ id: 'origin_crystal', count: 20 }] },
    { name: '天帝', hp: 20000000, atk: 100000, def: 20000, exp: 50000000, loot: [{ id: 'origin_crystal', count: 100 }] },
    { name: '源初之灵', hp: 20000000, atk: 50000, def: 3000, exp: 20000000, loot: [{ id: 'origin_crystal', count: 50 }] },
    { name: '混沌古神', hp: 50000000, atk: 100000, def: 5000, exp: 50000000, loot: [{ id: 'chaos_stone', count: 10 }] },
    { name: '迷失者', hp: 30000000, atk: 80000, def: 3000, exp: 30000000, loot: [{ id: 'time_crystal', count: 5 }] },
    { name: '轮回殿主', hp: 100000000, atk: 200000, def: 10000, exp: 100000000, loot: [{ id: 'lunhui_stone', count: 1 }] }
  ],
  sect: [
    { name: '同门弟子', hp: 100, atk: 20, def: 10, exp: 50, loot: [] },
    { name: '内门弟子', hp: 200, atk: 35, def: 15, exp: 80, loot: [] },
    { name: '精英弟子', hp: 350, atk: 50, def: 20, exp: 120, loot: [] },
    { name: '核心弟子', hp: 500, atk: 70, def: 30, exp: 200, loot: [] },
    { name: '长老', hp: 800, atk: 100, def: 50, exp: 400, loot: [] }
  ]
};

// 宗门数据（按GDD文档）
export const SECTS = [
  // ═══════════════════════════════════════
  // 人界·正道七宗（天南大陆）
  // ═══════════════════════════════════════
  { id: 'yanyue', name: '掩月宗', type: '正道', specialty: '剑修', location: 'huangfeng', skills: ['yanyue_tian', 'moon_slash'], desc: '天南之首，以剑修闻名' },
  { id: 'luoyun', name: '落云宗', type: '正道', specialty: '剑修', location: 'luoyun', skills: ['luoyun_sword'], desc: '剑修宗门，落云剑诀威震天南' },
  { id: 'huangfeng', name: '黄枫谷', type: '正道', specialty: '阵法', location: 'huangfeng', skills: ['huangfeng_basic'], desc: '掩月宗附属，擅长阵法' },
  { id: 'tianque', name: '天阙堡', type: '正道', specialty: '防御', location: 'huangfeng', skills: ['golden_bell'], desc: '防御型宗门，金钟罩闻名' },
  { id: 'qingxu', name: '清虚门', type: '正道', specialty: '道法', location: 'huangfeng', skills: ['qingxin'], desc: '道法宗门，清心寡欲' },
  { id: 'baiqiao', name: '百巧院', type: '正道', specialty: '炼器', location: 'huangfeng', skills: ['bailian'], desc: '炼器宗门，法宝天下闻名' },
  { id: 'lingshou_sect', name: '灵兽山', type: '正道', specialty: '御兽', location: 'lingshou', skills: ['wanshou'], desc: '御兽宗门，灵兽种类繁多' },

  // ═══════════════════════════════════════
  // 人界·魔道六宗（天南大陆）
  // ═══════════════════════════════════════
  { id: 'tiansha', name: '天煞宗', type: '魔道', specialty: '杀戮', location: 'huangfeng', skills: ['tiansha_magic'], desc: '魔道宗门，以杀戮入道' },
  { id: 'guiling', name: '鬼灵门', type: '魔道', specialty: '御鬼', location: 'modao', skills: ['ghost_control'], desc: '魔道宗门，擅长御鬼之术' },
  { id: 'yuling', name: '御灵宗', type: '魔道', specialty: '魔道兽', location: 'huangfeng', skills: ['kongshen'], desc: '魔道宗门，御使魔兽' },
  { id: 'hehuan', name: '合欢宗', type: '魔道', specialty: '双修', location: 'huangfeng', skills: ['hehuan_art'], desc: '魔道宗门，擅长双修之术' },
  { id: 'tianmo', name: '天魔宗', type: '魔道', specialty: '魔功', location: 'modao', skills: ['moxiang'], desc: '魔道宗门，魔功深不可测' },
  { id: 'yinluo', name: '阴罗宗', type: '魔道', specialty: '咒术', location: 'modao', skills: ['tishen'], desc: '魔道宗门，擅长咒术' },

  // ═══════════════════════════════════════
  // 人界·乱星海
  // ═══════════════════════════════════════
  { id: 'xinggong', name: '星宫', type: '中立', specialty: '星辰', location: 'xinggong', skills: ['star_guide'], desc: '乱星海最强势力，控传送阵' },
  { id: 'tianxing_city', name: '天星城', type: '中立', specialty: '自由城邦', location: 'tianxing', skills: [], desc: '乱星海最大城市，自由城邦' },
  { id: 'miaoyin', name: '妙音门', type: '中立', specialty: '商道', location: 'tianxing', skills: ['miaoyin'], desc: '商道宗门，音波功法' },
  { id: 'jinyin_dao', name: '极阴岛', type: '魔道', specialty: '阴属性', location: 'modao', skills: ['xuanyin'], desc: '魔道势力，阴属性功法' },
  { id: 'zhifa', name: '执法殿', type: '中立', specialty: '执法', location: 'tianxing', skills: [], desc: '乱星海执法机构' },

  // ═══════════════════════════════════════
  // 人界·大晋帝国
  // ═══════════════════════════════════════
  { id: 'dajin_royal', name: '大晋皇室', type: '中立', specialty: '世俗', location: 'dajin_city', skills: [], desc: '大晋帝国皇室' },
  { id: 'tiandao', name: '天道盟', type: '正道', specialty: '正道联盟', location: 'dajin_city', skills: ['tiandao'], desc: '大晋正道联盟' },
  { id: 'wanbao', name: '万宝楼', type: '中立', specialty: '商会', location: 'dajin_city', skills: ['tongbao'], desc: '人界最大商会' },
  { id: 'xiangzhili_alliance', name: '散修联盟', type: '中立', specialty: '散修', location: 'dajin_city', skills: [], desc: '向之礼领导的散修组织' },
  { id: 'qixuan', name: '七玄门', type: '正道', specialty: '凡级起点', location: 'qingyun', skills: ['basic_art'], desc: '凡级起点宗门，韩立出身' },

  // ═══════════════════════════════════════
  // 灵界·人族九家族
  // ═══════════════════════════════════════
  { id: 'xuanyuan', name: '轩辕家族', type: '正道', specialty: '剑修', location: 'tianyuan', skills: ['xuanyuan_sword'], desc: '人族第一家族，剑修传承' },
  { id: 'ye', name: '叶家族', type: '正道', specialty: '符箓', location: 'tianyuan', skills: ['ye_talisman'], desc: '符箓世家，财力雄厚' },
  { id: 'liu', name: '柳家族', type: '正道', specialty: '木丹', location: 'tianyuan', skills: ['liu_dan'], desc: '木属性丹道世家' },
  { id: 'feng', name: '风家族', type: '中立', specialty: '情报', location: 'tianyuan', skills: [], desc: '情报世家，消息灵通' },
  { id: 'lei', name: '雷家族', type: '正道', specialty: '雷法', location: 'tianyuan', skills: ['lei_thunder'], desc: '雷法世家' },
  { id: 'jin', name: '金家族', type: '正道', specialty: '炼器', location: 'tianyuan', skills: ['jin_artifact'], desc: '炼器世家' },
  { id: 'bing', name: '冰家族', type: '正道', specialty: '冰属性', location: 'tianyuan', skills: ['bing_ice'], desc: '冰属性世家，极北之地' },
  { id: 'fang', name: '方家族', type: '正道', specialty: '阵法', location: 'tianyuan', skills: ['fang_array'], desc: '阵法世家' },

  // ═══════════════════════════════════════
  // 灵界·妖族七大族
  // ═══════════════════════════════════════
  { id: 'dragon', name: '龙族', type: '中立', specialty: '万妖核心', location: 'wanyao', skills: ['dragon_breath'], desc: '万妖之核心' },
  { id: 'phoenix', name: '天凤族', type: '中立', specialty: '涅槃', location: 'wanyao', skills: ['phoenix_nirvana'], desc: '南部妖族' },
  { id: 'qilin', name: '麒麟族', type: '中立', specialty: '守护', location: 'wanyao', skills: ['qilin_guard'], desc: '中央妖族' },
  { id: 'xuanwu', name: '玄武族', type: '中立', specialty: '防御', location: 'wanyao', skills: ['xuanwu_shell'], desc: '北海妖族' },
  { id: 'baihu', name: '白虎族', type: '中立', specialty: '杀伐', location: 'wanyao', skills: ['baihu_claw'], desc: '西方妖族' },
  { id: 'kunpeng', name: '鲲鹏族', type: '中立', specialty: '速度', location: 'wanyao', skills: ['kunpeng_speed'], desc: '海空妖族' },
  { id: 'jiuwei', name: '九尾天狐族', type: '中立', specialty: '幻术', location: 'wanyao', skills: ['jiuwei_illusion'], desc: '青丘妖族，幻术' },

  // ═══════════════════════════════════════
  // 仙界·十大宗门
  // ═══════════════════════════════════════
  { id: 'jianxian', name: '剑仙阁', type: '正道', specialty: '剑修', location: 'jiange', skills: [], desc: '仙界剑修圣地' },
  { id: 'dansheng_sect', name: '丹圣谷', type: '正道', specialty: '炼丹', location: 'dansheng', skills: [], desc: '仙界炼丹圣地' },
  { id: 'zhengong', name: '阵仙宫', type: '正道', specialty: '阵法', location: 'tianting', skills: [], desc: '仙界阵法圣地' },
  { id: 'fusheng', name: '符圣宗', type: '正道', specialty: '符箓', location: 'tianting', skills: [], desc: '仙界符箓圣地' },
  { id: 'qihuang', name: '器皇殿', type: '正道', specialty: '炼器', location: 'tianting', skills: [], desc: '仙界炼器圣地' },
  { id: 'tixiu', name: '体修宗', type: '正道', specialty: '体修', location: 'tianting', skills: [], desc: '仙界体修圣地' },
  { id: 'yushou', name: '御兽仙门', type: '正道', specialty: '御兽', location: 'tianting', skills: [], desc: '仙界御兽圣地' },
  { id: 'faxiang', name: '法相宗', type: '正道', specialty: '法相', location: 'tianting', skills: [], desc: '仙界法相圣地' },
  { id: 'huanxin', name: '幻心宗', type: '中立', specialty: '神识', location: 'huiyu', skills: [], desc: '仙界神识圣地' },
  { id: 'shilun', name: '时轮宗', type: '中立', specialty: '时间', location: 'huiyu', skills: [], desc: '仙界时间法则圣地' },

  // ═══════════════════════════════════════
  // 仙界·古老存在
  // ═══════════════════════════════════════
  { id: 'lunhui_sect', name: '轮回殿', type: '中立', specialty: '轮回', location: 'lunhui', skills: [], desc: '轮回之地' },
  { id: 'yuanchu_sect', name: '源初秘境', type: '中立', specialty: '混沌', location: 'yuanchu', skills: [], desc: '混沌之地' }
];

// 掌天瓶系统
export const BOTTLE_EVENTS = {
  daily: [
    { text: '绿液溢出，灵草生长加快。', effect: 'herb_boost' },
    { text: '瓶身微热，指引附近灵脉。', effect: 'sense_boost' },
    { text: '小动物靠近瓶边，似乎在吸收灵气。', effect: 'beast_tame' },
    { text: '瓶中异香，吸引了不少灵蝶。', effect: 'luck_boost' },
    { text: '绿液变色，品质似乎提升了。', effect: 'quality_up' },
    { text: '月华共鸣，绿液+2。', effect: 'green_liquid', value: 2 }
  ],
  combat: [
    { text: '绿液护主！消耗3滴恢复25%HP。', effect: 'heal', value: 0.25, cost: 3 },
    { text: '瓶中反击！反噬对方神识。', effect: 'counter', value: 0.1 },
    { text: '法宝吞噬！0.5%概率吞噬敌方法宝。', effect: 'devour', value: 0.005 },
    { text: '绿液炸弹！范围伤害+缠绕。', effect: 'bomb', value: 0.3 },
    { text: '器灵参战！绿儿出战3回合。', effect: 'spirit_fight', duration: 3 }
  ],
  crisis: [
    { text: '魔气入侵！污染绿液，需净化10天。', effect: 'pollute', duration: 10 },
    { text: '瓶被夺！触发夺回任务链。', effect: 'stolen', value: 1 },
    { text: '瓶身再裂！挡天劫，绿儿沉睡30天。', effect: 'crack', duration: 30 },
    { text: '绿液反噬！口服过度，丹毒+50。', effect: 'backlash', value: 50 },
    { text: '器灵叛逃！好感<10触发。', effect: 'flee', value: 1 }
  ]
};