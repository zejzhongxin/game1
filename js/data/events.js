export const SECTS = [
  // ═══════════════════════════════════════
  // 人界·正道七宗（天南大陆）
  // ═══════════════════════════════════════
  { id: 'yanyue', name: '掩月宗', type: '正道', specialty: '剑修', location: 'huangfeng', skills: ['yanyue_tian', 'yanyue_basic', 'moon_slash', 'gold_blade'], desc: '天南之首，以剑修闻名' },
  { id: 'luoyun', name: '落云宗', type: '正道', specialty: '剑修', location: 'luoyun', skills: ['luoyun_sword', 'qingyuan_basic', 'sword_qi'], desc: '剑修宗门，落云剑诀威震天南' },
  { id: 'huangfeng', name: '黄枫谷', type: '正道', specialty: '阵法', location: 'huangfeng', skills: ['huangfeng_array'], desc: '掩月宗附属，擅长阵法' },
  { id: 'tianque', name: '天阙堡', type: '正道', specialty: '防御', location: 'huangfeng', skills: ['bujin', 'houTu', 'gold_shield'], desc: '防御型宗门，金钟罩闻名' },
  { id: 'qingxu', name: '清虚门', type: '正道', specialty: '道法', location: 'huangfeng', skills: ['qingxin', 'qingxin_sub'], desc: '道法宗门，清心寡欲' },
  { id: 'baiqiao', name: '百巧院', type: '正道', specialty: '炼器', location: 'huangfeng', skills: ['bailian'], desc: '炼器宗门，法宝天下闻名' },
  { id: 'lingshou_sect', name: '灵兽山', type: '正道', specialty: '御兽', location: 'lingshou', skills: ['wanshou'], desc: '御兽宗门，灵兽种类繁多' },

  // ═══════════════════════════════════════
  // 人界·魔道六宗（天南大陆）
  // ═══════════════════════════════════════
  { id: 'tiansha', name: '天煞宗', type: '魔道', specialty: '杀戮', location: 'huangfeng', skills: ['tiansha', 'liehuo', 'xuedun', 'fireball', 'blazing_storm', 'blood_slash', 'burn_sky'], desc: '魔道宗门，以杀戮入道' },
  { id: 'guiling', name: '鬼灵门', type: '魔道', specialty: '御鬼', location: 'modao', skills: ['yugui', 'soul_curse'], desc: '魔道宗门，擅长御鬼之术' },
  { id: 'yuling', name: '御灵宗', type: '魔道', specialty: '魔道兽', location: 'huangfeng', skills: ['wanshou', 'soul_grab', 'kongshen'], desc: '魔道宗门，御使魔兽' },
  { id: 'hehuan', name: '合欢宗', type: '魔道', specialty: '双修', location: 'huangfeng', skills: ['hehuan', 'caibu'], desc: '魔道宗门，擅长双修之术' },
  { id: 'tianmo', name: '天魔宗', type: '魔道', specialty: '魔功', location: 'modao', skills: ['moxiang', 'blood_sacrifice', 'magic_explode'], desc: '魔道宗门，魔功深不可测' },
  { id: 'yinluo', name: '阴罗宗', type: '魔道', specialty: '咒术', location: 'modao', skills: ['soul_curse', 'soul_grab', 'tishen'], desc: '魔道宗门，擅长咒术' },

  // ═══════════════════════════════════════
  // 人界·乱星海
  // ═══════════════════════════════════════
  { id: 'xinggong', name: '星宫', type: '中立', specialty: '星辰', location: 'xinggong', skills: ['xingchen', 'star_rain'], desc: '乱星海最强势力，控传送阵' },
  { id: 'tianxing_city', name: '天星城', type: '中立', specialty: '自由城邦', location: 'tianxing', skills: ['tongbao'], desc: '乱星海最大城市，自由城邦' },
  { id: 'miaoyin', name: '妙音门', type: '中立', specialty: '商道', location: 'tianxing', skills: ['miaoyin'], desc: '商道宗门，音波功法' },
  { id: 'jinyin_dao', name: '极阴岛', type: '魔道', specialty: '阴属性', location: 'modao', skills: ['xuanyin', 'xuanshui'], desc: '魔道势力，阴属性功法' },
  { id: 'zhifa', name: '执法殿', type: '中立', specialty: '执法', location: 'tianxing', skills: ['thunder_prison'], desc: '乱星海执法机构' },

  // ═══════════════════════════════════════
  // 人界·大晋帝国
  // ═══════════════════════════════════════
  { id: 'dajin_royal', name: '大晋皇室', type: '中立', specialty: '世俗', location: 'dajin_city', skills: ['tiandao'], desc: '大晋帝国皇室' },
  { id: 'tiandao', name: '天道盟', type: '正道', specialty: '正道联盟', location: 'dajin_city', skills: ['tiandao', 'fansheng_remnant', 'guangling'], desc: '大晋正道联盟' },
  { id: 'wanbao', name: '万宝楼', type: '中立', specialty: '商会', location: 'dajin_city', skills: ['tongbao'], desc: '人界最大商会' },
  { id: 'xiangzhili_alliance', name: '散修联盟', type: '中立', specialty: '散修', location: 'dajin_city', skills: ['sanzhuan', 'qiaoshou'], desc: '向之礼领导的散修组织' },
  { id: 'qixuan', name: '七玄门', type: '正道', specialty: '凡级起点', location: 'qingyun', skills: ['basic_art', 'basic_sword'], desc: '凡级起点宗门，韩立出身' },

  // ═══════════════════════════════════════
  // 灵界·人族九家族
  // ═══════════════════════════════════════
  { id: 'xuanyuan', name: '轩辕家族', type: '正道', specialty: '剑修', location: 'tianyuan', skills: ['luoyun_sword', 'sword_cross', 'tianYuan_sword'], desc: '人族第一家族，剑修传承' },
  { id: 'ye', name: '叶家族', type: '正道', specialty: '符箓', location: 'tianyuan', skills: ['tongbao_sub', 'huangfeng_sub'], desc: '符箓世家，财力雄厚' },
  { id: 'liu', name: '柳家族', type: '正道', specialty: '木丹', location: 'tianyuan', skills: ['qingmu', 'spring_heal', 'vine', 'wood_heal'], desc: '木属性丹道世家' },
  { id: 'feng', name: '风家族', type: '中立', specialty: '情报', location: 'tianyuan', skills: ['luoyan', 'wind_blade'], desc: '情报世家，消息灵通' },
  { id: 'lei', name: '雷家族', type: '正道', specialty: '雷法', location: 'tianyuan', skills: ['thunder', 'rage_thunder', 'purple_thunder'], desc: '雷法世家' },
  { id: 'jin', name: '金家族', type: '正道', specialty: '炼器', location: 'tianyuan', skills: ['bailian', 'qiaoshou'], desc: '炼器世家' },
  { id: 'bing', name: '冰家族', type: '正道', specialty: '冰属性', location: 'tianyuan', skills: ['ice_seal', 'ice_spike', 'ice_cone', 'absolute_zero'], desc: '冰属性世家，极北之地' },
  { id: 'fang', name: '方家族', type: '正道', specialty: '阵法', location: 'tianyuan', skills: ['huangfeng_sub', 'earth_shield', 'earth_wall', 'sand_trap'], desc: '阵法世家' },

  // ═══════════════════════════════════════
  // 灵界·妖族七大族
  // ═══════════════════════════════════════
  { id: 'dragon', name: '龙族', type: '中立', specialty: '万妖核心', location: 'wanyao', skills: ['sky_fire', 'god_thunder'], desc: '万妖之核心' },
  { id: 'phoenix', name: '天凤族', type: '中立', specialty: '涅槃', location: 'wanyao', skills: ['spring_heal', 'life_gift'], desc: '南部妖族' },
  { id: 'qilin', name: '麒麟族', type: '中立', specialty: '守护', location: 'wanyao', skills: ['earth_shield', 'immovable'], desc: '中央妖族' },
  { id: 'xuanwu', name: '玄武族', type: '中立', specialty: '防御', location: 'wanyao', skills: ['immovable', 'earth_shield'], desc: '北海妖族' },
  { id: 'baihu', name: '白虎族', type: '中立', specialty: '杀伐', location: 'wanyao', skills: ['sword_cross', 'dageng_sword'], desc: '西方妖族' },
  { id: 'kunpeng', name: '鲲鹏族', type: '中立', specialty: '速度', location: 'wanyao', skills: ['luoyan', 'wind_blade'], desc: '海空妖族' },
  { id: 'jiuwei', name: '九尾天狐族', type: '中立', specialty: '幻术', location: 'wanyao', skills: ['sense_storm', 'soul_curse'], desc: '青丘妖族，幻术' },

  // ═══════════════════════════════════════
  // 仙界·十大宗门
  // ═══════════════════════════════════════
  { id: 'jianxian', name: '剑仙阁', type: '正道', specialty: '剑修', location: 'jiange', skills: ['qingyuan_full', 'dageng_sword'], desc: '仙界剑修圣地' },
  { id: 'dansheng_sect', name: '丹圣谷', type: '正道', specialty: '炼丹', location: 'dansheng', skills: ['dayan', 'life_gift'], desc: '仙界炼丹圣地' },
  { id: 'zhengong', name: '阵仙宫', type: '正道', specialty: '阵法', location: 'tianting', skills: ['huangfeng_array', 'huangfeng_sub'], desc: '仙界阵法圣地' },
  { id: 'fusheng', name: '符圣宗', type: '正道', specialty: '符箓', location: 'tianting', skills: ['qiaoshou', 'tongbao_sub'], desc: '仙界符箓圣地' },
  { id: 'qihuang', name: '器皇殿', type: '正道', specialty: '炼器', location: 'tianting', skills: ['bailian', 'qiaoshou'], desc: '仙界炼器圣地' },
  { id: 'tixiu', name: '体修宗', type: '正道', specialty: '体修', location: 'tianting', skills: ['moxiang', 'fansheng_full'], desc: '仙界体修圣地' },
  { id: 'yushou', name: '御兽仙门', type: '正道', specialty: '御兽', location: 'tianting', skills: ['wanshou', 'blazing_storm'], desc: '仙界御兽圣地' },
  { id: 'faxiang', name: '法相宗', type: '正道', specialty: '法相', location: 'tianting', skills: ['law_heaven', 'fansheng_full'], desc: '仙界法相圣地' },
  { id: 'huanxin', name: '幻心宗', type: '中立', specialty: '神识', location: 'huiyu', skills: ['sense_storm', 'soul_curse'], desc: '仙界神识圣地' },
  { id: 'shilun', name: '时轮宗', type: '中立', specialty: '时间', location: 'huiyu', skills: ['chaos_blade', 'ancient_chaos'], desc: '仙界时间法则圣地' },

  // ═══════════════════════════════════════
  // 仙界·古老存在
  // ═══════════════════════════════════════
  { id: 'lunhui_sect', name: '轮回殿', type: '中立', specialty: '轮回', location: 'lunhui', skills: ['lunhui', 'lunhui_strike'], desc: '轮回之地' },
  { id: 'yuanchu_sect', name: '源初秘境', type: '中立', specialty: '混沌', location: 'yuanchu', skills: ['hundun_creation', 'ancient_chaos', 'hundun_spirit', 'hongmeng', 'hundun_dao'], desc: '混沌之地' }
];

// ═══════════════════════════════════════
// 敌人数据（按强度分类）
// ═══════════════════════════════════════
export const ENEMIES = {
  weak: [
    { name: '野兔妖', hp: 30, atk: 5, def: 2, exp: 10, element: '木', loot: [{ id: 'herb', chance: 0.5, count: 1 }] },
    { name: '山猫', hp: 40, atk: 6, def: 3, exp: 12, element: '木', loot: [{ id: 'herb', chance: 0.4, count: 1 }] },
    { name: '毒蛇', hp: 35, atk: 8, def: 1, exp: 15, element: '毒', loot: [{ id: 'detox_grass', chance: 0.3, count: 1 }] },
    { name: '蝙蝠', hp: 25, atk: 4, def: 1, exp: 8, element: '阴', loot: [{ id: 'herb', chance: 0.3, count: 1 }] },
    { name: '食人花', hp: 50, atk: 7, def: 4, exp: 18, element: '木', loot: [{ id: 'herb', chance: 0.6, count: 2 }] },
  ],
  normal: [
    { name: '练气妖兽', hp: 80, atk: 12, def: 5, exp: 30, element: '火', loot: [{ id: 'beast_core', chance: 0.4, count: 1 }] },
    { name: '筑基妖兽', hp: 150, atk: 18, def: 10, exp: 60, element: '水', loot: [{ id: 'beast_core', chance: 0.5, count: 1 }, { id: 'herb', chance: 0.5, count: 2 }] },
    { name: '石魔', hp: 200, atk: 15, def: 20, exp: 50, controlImmunity: true, element: '土', loot: [{ id: 'iron', chance: 0.3, count: 1 }] },
    { name: '金眼獍', hp: 120, atk: 20, def: 8, exp: 45, element: '金', loot: [{ id: 'beast_core', chance: 0.4, count: 1 }, { id: 'herb', chance: 0.3, count: 3 }] },
    { name: '冰霜蛇', hp: 130, atk: 16, def: 12, exp: 50, element: '冰', loot: [{ id: 'cold_jade', chance: 0.3, count: 1 }] },
    { name: '烈火鸟', hp: 100, atk: 22, def: 5, exp: 55, element: '火', loot: [{ id: 'fire_stone', chance: 0.3, count: 1 }] },
    { name: '影蝠', hp: 90, atk: 14, def: 6, exp: 40, element: '阴', loot: [{ id: 'herb', chance: 0.5, count: 1 }, { id: 'mushroom', chance: 0.2, count: 1 }] },
  ],
  strong: [
    { name: '金丹妖将', hp: 400, atk: 35, def: 25, exp: 150, element: '火', loot: [{ id: 'demon_core', chance: 0.5, count: 1 }, { id: 'herb', chance: 0.5, count: 3 }] },
    { name: '黑风蟒', hp: 350, atk: 32, def: 20, exp: 130, element: '水', loot: [{ id: 'beast_core', chance: 0.6, count: 2 }] },
    { name: '金甲兽', hp: 500, atk: 28, def: 40, exp: 120, controlImmunity: true, element: '金', loot: [{ id: 'diamond', chance: 0.3, count: 1 }] },
    { name: '元婴妖兽', hp: 600, atk: 45, def: 30, exp: 250, element: '火', loot: [{ id: 'demon_core', chance: 0.6, count: 2 }, { id: 'ancient_fungus', chance: 0.2, count: 1 }] },
    { name: '雷霆兽', hp: 450, atk: 40, def: 25, exp: 200, element: '雷', loot: [{ id: 'thunder_wood', chance: 0.4, count: 1 }, { id: 'beast_core', chance: 0.5, count: 1 }] },
    { name: '雪猿', hp: 550, atk: 38, def: 35, exp: 180, element: '冰', loot: [{ id: 'cold_jade', chance: 0.5, count: 2 }] },
  ],
  boss: [
    { name: '血禁守护灵', hp: 2000, atk: 60, def: 40, exp: 800, controlImmunity: true, element: '火', loot: [{ id: 'herb', count: 5 }, { id: 'demon_core', chance: 0.8, count: 3 }, { id: 'ancient_fungus', chance: 0.3, count: 1 }] },
    { name: '古魔残影', hp: 3000, atk: 80, def: 50, exp: 1500, controlImmunity: true, element: '阴', loot: [{ id: 'demon_core', count: 5 }, { id: 'soul_crystal', chance: 0.5, count: 2 }] },
    { name: '万妖之王', hp: 5000, atk: 100, def: 60, exp: 3000, controlImmunity: true, element: '火', loot: [{ id: 'demon_core', count: 8 }, { id: 'ancient_fungus', chance: 0.5, count: 2 }] },
    { name: '源初之灵', hp: 8000, atk: 120, def: 80, exp: 5000, controlImmunity: true, element: '混沌', loot: [{ id: 'chaos_stone', chance: 0.5, count: 1 }, { id: 'immortal_stone', count: 3 }] },
    { name: '轮回殿主分身', hp: 10000, atk: 150, def: 100, exp: 10000, controlImmunity: true, element: '轮回', loot: [{ id: 'immortal_stone', count: 10 }, { id: 'soul_crystal', chance: 0.3, count: 3 }] },
  ],
  sect: [
    { name: '散修张三', hp: 100, atk: 12, def: 5, exp: 25, element: '无', stones: 50, type: '正道', skill: { name: '基础法术', damage: 1.0 }, realmIdx: 0, loot: [{ id: 'herb', chance: 0.4, count: 2 }] },
    { name: '散修李四', hp: 120, atk: 14, def: 6, exp: 30, element: '水', stones: 60, type: '正道', skill: { name: '水箭术', damage: 1.1 }, realmIdx: 1, loot: [{ id: 'herb', chance: 0.4, count: 2 }] },
    { name: '魔修赵六', hp: 150, atk: 18, def: 4, exp: 40, element: '火', stones: 80, type: '魔道', skill: { name: '火球术', damage: 1.3 }, realmIdx: 1, loot: [{ id: 'beast_core', chance: 0.3, count: 1 }] },
    { name: '魔道散修', hp: 180, atk: 20, def: 8, exp: 50, element: '阴', stones: 100, type: '魔道', skill: { name: '魔气斩', damage: 1.4 }, realmIdx: 2, loot: [{ id: 'demon_core', chance: 0.3, count: 1 }] },
    { name: '正道弟子', hp: 200, atk: 16, def: 12, exp: 60, element: '金', stones: 150, type: '正道', skill: { name: '剑气诀', damage: 1.2 }, realmIdx: 2, loot: [{ id: 'herb', chance: 0.4, count: 3 }] },
  ]
};

// ═══════════════════════════════════════
// 探索事件
// ═══════════════════════════════════════
export const EVENTS = {
  herb: { chance: 25, text: '你在草丛中发现了几株灵草。', reward: { type: 'item', id: 'herb', count: 3 } },
  beast_weak: { chance: 10, text: '一只弱小的妖兽拦住了去路。', reward: { type: 'combat', enemy: 'weak' } },
  beast: { chance: 10, text: '前方出现了一只妖兽！', reward: { type: 'combat', enemy: 'normal' } },
  combat: { chance: 8, text: '你遇到了敌人！', reward: { type: 'combat', enemy: 'strong' } },
  cave: { chance: 5, text: '你发现了一个隐秘的洞穴。', reward: { type: 'treasure' } },
  trap: { chance: 5, text: '你触发了陷阱机关！', reward: { type: 'damage', percent: 15 } },
  treasure: { chance: 3, text: '你在废墟中发现了一个宝箱！', reward: { type: 'treasure' } },
  shop: { chance: 5, text: '你遇到了一位游走的商人。', reward: { type: 'shop' } },
  secret: { chance: 2, text: '感应到了秘境的波动！', reward: { type: 'secret' } },
  boss: { chance: 1, text: '一股强大的气息逼近！', reward: { type: 'combat', enemy: 'boss' } },
  sect: { chance: 8, text: '前方有一座宗门山门。', reward: { type: 'heritage', text: '宗门试炼即将开启...' } },
  npc: { chance: 10, text: '一位修士迎面走来。', reward: { type: 'puzzle', text: '修士向你询问了一个谜题。' } },
  quest: { chance: 6, text: '有人在张贴悬赏令。', reward: { type: 'item', id: 'herb', count: 3 } },
  auction: { chance: 3, text: '听到拍卖会的吆喝声传来。', reward: { type: 'shop' } },
  mine: { chance: 8, text: '你发现了一处矿脉。', reward: { type: 'item', id: 'iron', count: 3 } },
  skill: { chance: 2, text: '你在藏经阁发现了一部功法。', reward: { type: 'skill' } },
  spirit_beast_track: { chance: 4, text: '地面有灵兽的足迹。', reward: { type: 'item', id: 'beast_core', count: 2 } },
  heritage: { chance: 2, text: '感觉到了古老传承的召唤。', reward: { type: 'heritage' } },
  ancient: { chance: 2, text: '远古遗迹向你敞开大门。', reward: { type: 'ancient' } },
  forbidden: { chance: 3, text: '警告：禁区——内有强大存在。', reward: { type: 'forbidden', text: '你被迫退了出来...' } },
  demon: { chance: 5, text: '一股魔气扑面而来！', reward: { type: 'combat', enemy: 'strong' } },
  environment: { chance: 6, text: '环境极端恶劣，需要消耗更多灵力。', reward: { type: 'damage', percent: 10 } },
  body_refine: { chance: 4, text: '天地灵气淬炼着你的肉身。', reward: { type: 'buff', stat: 'def', value: 5 } },
  alchemy: { chance: 3, text: '你发现了前人遗留的丹方。', reward: { type: 'item', id: 'herb', count: 5 } },
  chaos: { chance: 1, text: '混沌能量四溢，周围一切都扭曲了。', reward: { type: 'teleport' } },
  time: { chance: 1, text: '时间流速开始变得异常。', reward: { type: 'environment' } },
  final: { chance: 1, text: '最终试炼之门呈现在眼前。', reward: { type: 'combat', enemy: 'boss' } },
};

// ═══════════════════════════════════════
// 事件地点类型映射
// ═══════════════════════════════════════
export const EVENT_LOCATION_TYPES = {
  shop: 'medium',   // 商店类事件仅城镇触发
  auction: 'large', // 拍卖会仅大城市
  sect: 'medium',   // 宗门仅中型及以上地点
  cave: 'small',    // 洞穴在任何地点
  secret: 'secret', // 秘境仅秘境类地点
  boss: 'danger',   // Boss仅危险区
  heritage: 'secret',
  ancient: 'danger',
  forbidden: 'danger',
  demon: 'danger',
  chaos: 'danger',
  time: 'danger',
  final: 'final',
};

// ═══════════════════════════════════════
// 事件文本变体（增强沉浸感）
// ═══════════════════════════════════════
export const EVENT_TEXT_VARIANTS = {
  herb: [
    '你在草丛中发现了几株灵草。',
    '一片茂密的植被中，几株灵草闪着微光。',
    '拨开灌木，一小簇灵草映入眼帘。',
    '岩石缝隙间，几株灵草顽强地生长着。'
  ],
  beast: [
    '前方出现了一只妖兽！',
    '一声低吼从林中传来，妖兽出现了。',
    '地面震动，一只妖兽冲了出来！',
    '你感到一股杀气逼近——是妖兽！'
  ],
  cave: [
    '你发现了一个隐秘的洞穴。',
    '山壁上的裂缝通向一处洞穴。',
    '一个不起眼的地洞口引起了你的注意。',
    '顺着水声，你找到了一个地下洞穴。'
  ],
  treasure: [
    '你在废墟中发现了一个宝箱！',
    '古老的祭坛上，一枚储物袋静静躺着。',
    '翻找遗骸时，一枚储物戒指滚落出来。',
    '石壁上隐藏的暗格被你找到了。'
  ],
  sect: [
    '前方有一座宗门山门。',
    '高大的石碑上刻着宗门的名字。',
    '云雾缭绕中，一座宗门若隐若现。',
    '一条石阶蜿蜒向上，通向宗门大殿。'
  ],
  npc: [
    '一位修士迎面走来。',
    '前方有位修士正在休息。',
    '你听到不远处有人在说话。',
    '一位看起来经验丰富的修士正在四处张望。'
  ],
  combat: [
    '你遇到了敌人！',
    '有人正挡在你的去路上。',
    '有谁在那里等着你！',
    '突然，一道攻击向你袭来！'
  ],
};

// ═══════════════════════════════════════
// 掌天瓶事件（预留）
// ═══════════════════════════════════════
export const BOTTLE_EVENTS = {
  condense: { text: '掌天瓶开始凝聚绿液... 一滴翠绿的液体滴落。', reward: { greenLiquid: 1 } },
  miracle: { text: '瓶身突然发出异光，绿液数量翻倍！', reward: { greenLiquid: 3 }, chance: 0.1 },
  spirit_maid: { text: '器灵睁开双眼，对你微微一笑。', reward: { favor: 5 }, chance: 0.05 },
};