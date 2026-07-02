// 原著法宝图鉴 - 完整版（GDD一比一还原，共112件）
export const ARTIFACT_CATALOG = {
  // === 法器篇（共15件·练气~筑基可用） ===
  weapon: [
    { id: 'basic_fly_sword', name: '基础飞剑', grade: '法器', subGrade: '下', atk: 10, def: 0, type: 'attack', price: 100, source: '各派弟子标配', combatType: 'passive', element: 'metal', desc: '基础攻击法宝' },
    { id: 'qingfeng_dagger', name: '青锋匕', grade: '法器', subGrade: '上', atk: 18, def: 0, type: 'attack', price: 400, source: '七玄门旧物', combatType: 'passive', element: 'metal', desc: '锋利匕首' },
    { id: 'iron_wood_shield', name: '铁木盾', grade: '法器', subGrade: '中', atk: 0, def: 12, type: 'defense', price: 150, source: '黄枫谷外门', combatType: 'passive', element: 'wood', desc: '木制盾牌' },
    { id: 'gold_silk_armor', name: '金丝甲', grade: '法器', subGrade: '下', atk: 0, def: 8, type: 'defense', price: 80, source: '散修常用', combatType: 'passive', element: 'metal', desc: '轻便护甲' },
    { id: 'jade_pendant', name: '聚灵玉佩', grade: '法器', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 120, source: '通用', combatType: 'passive', effect: 'mp_regen', value: 2, desc: '灵力恢复+2/天' },
    { id: 'beast_ring', name: '灵兽环', grade: '法器', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 200, source: '灵兽山', combatType: 'passive', effect: 'beast_loyalty', value: 10, desc: '灵兽忠诚+10' },
    { id: 'qingyuan_sword', name: '青元配套飞剑', grade: '法器', subGrade: '极', atk: 15, def: 0, type: 'attack', price: 0, source: '韩立筑基期', combatType: 'passive', element: 'metal', desc: '剧情物品' },
    { id: 'sky_boat', name: '天遁舟', grade: '法器', subGrade: '上', atk: 0, def: 0, type: 'fly', price: 500, source: '韩立代步', combatType: 'passive', speed: 3, desc: '飞行法宝' },
    { id: 'fire_talisman_sword', name: '火符剑', grade: '法器', subGrade: '下', atk: 12, def: 0, type: 'attack', price: 150, source: '散修常用', combatType: 'passive', element: 'fire', effect: 'burn', desc: '附带灼烧' },
    { id: 'ice_talisman_sword', name: '冰锥符器', grade: '法器', subGrade: '下', atk: 10, def: 0, type: 'attack', price: 120, source: '散修常用', combatType: 'passive', element: 'water', effect: 'freeze', desc: '附带冰冻' },
    { id: 'gold_armor', name: '金刚符甲', grade: '法器', subGrade: '下', atk: 0, def: 10, type: 'defense', price: 80, source: '通用消耗', combatType: 'consumable', charges: 1, desc: '一次性护甲' },
    { id: 'wind_boots', name: '追风靴', grade: '法器', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 100, source: '通用', combatType: 'passive', effect: 'speed', value: 2, desc: '速度+2' },
    { id: 'nourish_jade', name: '养气玉佩', grade: '法器', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 250, source: '通用', combatType: 'passive', effect: 'max_mp', value: 10, desc: '灵力上限+10' },
    { id: 'ink_jade', name: '墨玉含章', grade: '法器', subGrade: '剧情', atk: 0, def: 0, type: 'special', price: 0, source: '墨大夫', combatType: 'passive', desc: '剧情物品，唯一' },
    { id: 'shedli_jade', name: '舍利子仿品', grade: '法器', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 300, source: '散修', combatType: 'passive', effect: 'sense', value: 5, desc: '神识+5' }
  ],

  // === 灵器篇（共18件·筑基~金丹可用） ===
  spirit: [
    { id: 'xuantie_sword', name: '玄铁飞剑', grade: '灵器', subGrade: '下', atk: 35, def: 0, type: 'attack', price: 500, source: '各派精英', combatType: 'passive', element: 'metal', desc: '玄铁打造' },
    { id: 'red_scale_shield', name: '赤鳞盾', grade: '灵器', subGrade: '中', atk: 0, def: 28, type: 'defense', price: 800, source: '血色禁地', combatType: 'passive', element: 'fire', desc: '赤鳞防御' },
    { id: 'bright_armor', name: '凝光甲', grade: '灵器', subGrade: '上', atk: 0, def: 20, type: 'defense', price: 2000, source: '乱星海', combatType: 'passive', effect: 'water_resist', desc: '避水' },
    { id: 'soul_chain', name: '锁魂链', grade: '灵器', subGrade: '下', atk: 20, def: 0, type: 'attack', price: 600, source: '鬼灵门', combatType: 'active', effect: 'soul_attack', cd: 5, desc: '神识攻击+20%' },
    { id: 'gold_beast_ring', name: '金童御兽环', grade: '灵器', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 1000, source: '御灵宗', combatType: 'passive', effect: 'beast_control', value: 1, desc: '御1兽' },
    { id: 'thunder_fire_sword', name: '雷火符剑', grade: '灵器', subGrade: '上', atk: 60, def: 0, type: 'attack', price: 2500, source: '天南符派', combatType: 'active', element: 'thunder', effect: 'burn', cd: 6, desc: '雷火攻击' },
    { id: 'small乾坤_cover', name: '小乾坤罩', grade: '灵器', subGrade: '极', atk: 0, def: 0, type: 'defense', price: 4000, source: '掩月宗', combatType: 'active', effect: 'shield', value: 0.3, duration: 3, cd: 10, desc: '减伤30%' },
    { id: 'yin_bamboo_sword', name: '阴沉竹剑', grade: '灵器', subGrade: '下', atk: 30, def: 0, type: 'attack', price: 500, source: '散修', combatType: 'passive', element: 'thunder', desc: '雷属性' },
    { id: 'cold_ice_ruler', name: '寒冰尺', grade: '灵器', subGrade: '中', atk: 28, def: 0, type: 'attack', price: 900, source: '极阴岛', combatType: 'passive', element: 'water', effect: 'freeze', desc: '冰冻' },
    { id: 'gold_ring', name: '金环', grade: '灵器', subGrade: '中', atk: 32, def: 0, type: 'attack', price: 850, source: '天南散修', combatType: 'passive', element: 'metal', desc: '金属性攻击' },
    { id: 'silver_scale_armor', name: '银鳞甲', grade: '灵器', subGrade: '中', atk: 0, def: 22, type: 'defense', price: 1200, source: '海族', combatType: 'passive', element: 'water', desc: '水属性防御' },
    { id: 'jade_hairpin', name: '碧玉簪', grade: '灵器', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 600, source: '妙音门', combatType: 'passive', effect: 'sense', value: 8, desc: '神识+8' },
    { id: 'four_shield', name: '四方盾', grade: '灵器', subGrade: '中', atk: 0, def: 25, type: 'defense', price: 1100, source: '星宫', combatType: 'passive', desc: '四方防御' },
    { id: 'fire_resist_pearl', name: '辟火珠', grade: '灵器', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 500, source: '拍卖会', combatType: 'passive', effect: 'fire_resist', value: 0.5, desc: '火抗+50%' },
    { id: 'water_breath_pearl', name: '辟水珠', grade: '灵器', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 500, source: '拍卖会', combatType: 'passive', effect: 'water_breath', desc: '水下呼吸' },
    { id: 'soul_bell', name: '摄魂铃', grade: '灵器', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 1000, source: '魔道', combatType: 'active', effect: 'confuse', chance: 0.2, desc: '混乱概率20%' },
    { id: 'five_element_plate', name: '五行盘', grade: '灵器', subGrade: '上', atk: 0, def: 0, type: 'assist', price: 3000, source: '星宫', combatType: 'passive', effect: 'cultivation', value: 0.1, desc: '修炼+10%' },
    { id: 'teleport_charm', name: '传送符器', grade: '灵器', subGrade: '上', atk: 0, def: 0, type: 'special', price: 3500, source: '天南禁地', combatType: 'consumable', charges: 3, desc: '短距离传送' }
  ],

  // === 法宝篇（共22件·金丹~元婴可用） ===
  treasure: [
    { id: 'qingzhu_sword', name: '青竹蜂云剑', grade: '法宝', subGrade: '成长', atk: 60, def: 0, type: 'attack', price: 0, source: '韩立本命', combatType: 'active', element: 'metal', desc: '可成长' },
    { id: 'purple_cloud', name: '紫云嶂', grade: '法宝', subGrade: '中', atk: 0, def: 55, type: 'defense', price: 6000, source: '乱星海散修', combatType: 'passive', desc: '紫色防御' },
    { id: 'sky_boat2', name: '天遁神舟', grade: '法宝', subGrade: '上', atk: 0, def: 0, type: 'fly', price: 12000, source: '天星城拍卖', combatType: 'passive', speed: 10, desc: '高速飞行' },
    { id: 'dragon_scissors', name: '蛟龙剪', grade: '法宝', subGrade: '上', atk: 120, def: 0, type: 'attack', price: 15000, source: '海族妖修', combatType: 'passive', effect: 'armor_break', value: 0.5, desc: '破甲50%' },
    { id: 'ice_pearl', name: '冰魄玄珠', grade: '法宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 8000, source: '极阴岛', combatType: 'passive', element: 'water', effect: 'ice_bonus', value: 0.3, desc: '冰系+30%' },
    { id: 'blood_flag', name: '血魔幡', grade: '法宝', subGrade: '下', atk: 0, def: 0, type: 'attack', price: 3000, source: '魔道散修', combatType: 'passive', effect: 'kill_heal', value: 0.15, desc: '击杀回血15%' },
    { id: 'soul_bell2', name: '裂魂钟', grade: '法宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 7000, source: '鬼灵门长老', combatType: 'active', effect: 'soul_damage', value: 2, cd: 8, desc: '神识伤害x2' },
    { id: 'gold_bug_blade', name: '金蚨子母刀', grade: '法宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 9000, source: '天煞宗', combatType: 'passive', desc: '子母攻击' },
    { id: 'five_ring', name: '五行环', grade: '法宝', subGrade: '上', atk: 0, def: 0, type: 'assist', price: 12000, source: '星宫长老', combatType: 'passive', effect: 'element_bonus', value: 0.15, desc: '五行法术+15%' },
    { id: 'hun_ling', name: '混天绫', grade: '法宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 6000, source: '掩月宗', combatType: 'active', effect: 'bind', duration: 3, cd: 8, desc: '束缚3回合' },
    { id: 'xuantie_heavy', name: '玄铁重尺', grade: '法宝', subGrade: '下', atk: 80, def: 0, type: 'attack', price: 3500, source: '散修', combatType: 'passive', element: 'metal', desc: '重型武器' },
    { id: 'cloud_fan', name: '云烟扇', grade: '法宝', subGrade: '下', atk: 50, def: 0, type: 'attack', price: 3000, source: '散修', combatType: 'passive', element: 'wind', desc: '风系群攻' },
    { id: 'lock_demon_tower', name: '锁妖塔(仿)', grade: '法宝', subGrade: '上', atk: 0, def: 0, type: 'special', price: 15000, source: '灵兽山', combatType: 'active', effect: 'beast_seal', desc: '镇压妖兽' },
    { id: 'purple_thunder_hammer', name: '紫电锤', grade: '法宝', subGrade: '中', atk: 90, def: 0, type: 'attack', price: 8000, source: '落云宗', combatType: 'active', element: 'thunder', effect: 'paralyze', cd: 5, desc: '雷系+麻痹' },
    { id: 'gold_cover', name: '金光罩', grade: '法宝', subGrade: '上', atk: 0, def: 0, type: 'defense', price: 10000, source: '天阙堡', combatType: 'active', effect: 'shield', value: 0.4, duration: 5, cd: 12, desc: '减伤40%' },
    { id: 'hundred_poison_pearl', name: '百毒珠', grade: '法宝', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 4000, source: '慕兰草原', combatType: 'passive', effect: 'poison_resist', value: 0.8, desc: '毒抗+80%' },
    { id: 'blood_knife', name: '化血刀', grade: '法宝', subGrade: '中', atk: 70, def: 0, type: 'attack', price: 7500, source: '天煞宗', combatType: 'passive', effect: 'lifesteal', value: 0.1, desc: '吸血' },
    { id: 'fall_soul_bell', name: '落魂钟', grade: '法宝', subGrade: '上', atk: 0, def: 0, type: 'attack', price: 12000, source: '鬼灵门', combatType: 'active', effect: 'confuse_aoe', cd: 7, desc: '声波群攻+混乱' },
    { id: 'seven_sword', name: '七星剑', grade: '法宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 9000, source: '星宫', combatType: 'active', effect: 'sword_array', cd: 10, desc: '剑阵' },
    { id: 'qiantian_fubao', name: '乾天符宝(仿)', grade: '法宝', subGrade: '极', atk: 150, def: 0, type: 'attack', price: 30000, source: '百巧院', combatType: 'consumable', charges: 5, desc: '符击' },
    { id: 'moon_wheel', name: '月华轮', grade: '法宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 7000, source: '掩月宗圣女', combatType: 'active', effect: 'moon_slash', cd: 3, desc: '月刃' },
    { id: 'gold_bowl', name: '金沙钵', grade: '法宝', subGrade: '下', atk: 0, def: 0, type: 'special', price: 4000, source: '散修', combatType: 'active', effect: 'trap', duration: 3, desc: '困敌3回合' }
  ],

  // === 古宝篇（共22件·元婴~化神可用） ===
  ancient: [
    { id: 'xutian_ding', name: '虚天鼎', grade: '古宝', subGrade: '极', atk: 0, def: 50, type: 'special', price: 0, source: '虚天殿', combatType: 'active', effect: 'suppress', cd: 10, desc: '镇压+储物' },
    { id: 'sky_sail', name: '天帆', grade: '古宝', subGrade: '上', atk: 0, def: 0, type: 'assist', price: 0, source: '广灵洞天', combatType: 'active', effect: 'sense_boost', value: 0.5, cd: 20, desc: '神识+50%' },
    { id: 'nine_palace_charm', name: '九宫天乾符', grade: '古宝', subGrade: '极', atk: 300, def: 0, type: 'attack', price: 0, source: '昆吾山', combatType: 'consumable', charges: 3, desc: '攻击' },
    { id: 'thunder_bamboo_sword', name: '天雷竹剑', grade: '古宝', subGrade: '中', atk: 200, def: 0, type: 'attack', price: 0, source: '雷鸣山脉', combatType: 'passive', element: 'thunder', effect: 'paralyze', desc: '雷系+麻痹' },
    { id: 'cold_ice_halberd', name: '冰魄天戈', grade: '古宝', subGrade: '上', atk: 250, def: 0, type: 'attack', price: 0, source: '北凉国', combatType: 'passive', element: 'water', effect: 'freeze', desc: '冰冻' },
    { id: 'soul_lock_tower', name: '锁魂塔', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'special', price: 0, source: '万年灵木禁地', combatType: 'active', effect: 'soul_seal', desc: '镇压封印' },
    { id: 'break_world_pearl', name: '破界珠', grade: '古宝', subGrade: '下', atk: 0, def: 0, type: 'special', price: 0, source: '堕落魔渊', combatType: 'consumable', charges: 1, desc: '破界域屏障' },
    { id: 'silver_fox_hairpin', name: '银月狐簪', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '银月赠送', combatType: 'passive', effect: 'illusion', value: 0.5, desc: '幻术+50%' },
    { id: 'ten_thousand_beast_order', name: '万妖令', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'special', price: 0, source: '万妖山脉', combatType: 'passive', effect: 'beast_command', desc: '号令低阶妖兽' },
    { id: 'soul_refining_mirror', name: '炼魂镜', grade: '古宝', subGrade: '上', atk: 0, def: 0, type: 'attack', price: 0, source: '虚天殿偏殿', combatType: 'active', effect: 'soul_attack', cd: 12, desc: '神识镇压+炼魂' },
    { id: 'seven_color_lamp', name: '七彩琉璃盏', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'defense', price: 0, source: '虚天殿', combatType: 'passive', effect: 'defense', value: 0.8, desc: '防御+80%' },
    { id: 'sky_sieve', name: '天罗伞', grade: '古宝', subGrade: '下', atk: 0, def: 60, type: 'defense', price: 0, source: '天南禁地', combatType: 'passive', desc: '范围防御' },
    { id: 'yinyang_ring', name: '阴阳环', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '大晋古战场', combatType: 'passive', effect: 'heal', desc: '阴阳转换+疗伤' },
    { id: 'star_stone', name: '星辰石', grade: '古宝', subGrade: '上', atk: 0, def: 0, type: 'assist', price: 0, source: '星宫', combatType: 'passive', effect: 'star_power', value: 0.3, desc: '星辰之力+30%' },
    { id: 'five_dragon_seal', name: '五龙玺', grade: '古宝', subGrade: '极', atk: 0, def: 0, type: 'special', price: 0, source: '大晋皇室', combatType: 'consumable', charges: 1, desc: '镇压+召唤五龙' },
    { id: 'soul_needle', name: '戮魂针', grade: '古宝', subGrade: '下', atk: 0, def: 0, type: 'attack', price: 0, source: '暗月杀手', combatType: 'passive', effect: 'soul_attack', desc: '神识伤害' },
    { id: 'gold_dragon_scissors', name: '金蛟剪(真)', grade: '古宝', subGrade: '上', atk: 350, def: 0, type: 'attack', price: 0, source: '昆吾山古魔', combatType: 'passive', desc: '高攻' },
    { id: 'blood_soul_pearl', name: '血魂珠', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'attack', price: 0, source: '血神秘境', combatType: 'active', effect: 'lifesteal_active', cd: 8, desc: '噬血' },
    { id: 'alchemy_furnace', name: '造化丹炉', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '百巧院', combatType: 'passive', effect: 'alchemy_bonus', value: 0.2, desc: '炼丹+20%' },
    { id: 'void_stone_pendant', name: '虚空石坠', grade: '古宝', subGrade: '上', atk: 0, def: 0, type: 'assist', price: 0, source: '灵界虚空', combatType: 'passive', effect: 'space_law', value: 0.2, desc: '空间法则+20%' },
    { id: 'heaven_order', name: '天机令', grade: '古宝', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '天机阁', combatType: 'passive', effect: 'divination', desc: '推演+占卜' },
    { id: 'xuantian_order', name: '玄天令', grade: '古宝', subGrade: '下', atk: 0, def: 0, type: 'special', price: 0, source: '广灵洞天', combatType: 'active', effect: 'treasure_hunt', cd: 30, desc: '寻宝' }
  ],

  // === 玄天之宝篇（共12件·化神~炼虚可用） ===
  xuantian: [
    { id: 'xuantian_slash_sword', name: '玄天斩灵剑', grade: '玄天', subGrade: '上', atk: 500, def: 0, type: 'attack', price: 0, source: '广灵洞天', combatType: 'active', effect: 'ignore_def', value: 0.5, cd: 15, desc: '破界斩' },
    { id: 'heaven_banner', name: '天澜圣旗', grade: '玄天', subGrade: '中', atk: 0, def: 0, type: 'defense', price: 0, source: '灵界古战场', combatType: 'passive', effect: 'defense', value: 0.7, desc: '减伤70%' },
    { id: 'void_mirror', name: '虚天残镜', grade: '玄天', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 0, source: '虚天殿隐藏层', combatType: 'passive', effect: 'space_law', value: 0.3, desc: '空间法则+30%' },
    { id: 'five_element_mountain', name: '五行灵山', grade: '玄天', subGrade: '上', atk: 0, def: 100, type: 'defense', price: 0, source: '灵界各家族', combatType: 'passive', desc: '镇压+防100%' },
    { id: 'chaos_pearl', name: '混沌珠', grade: '玄天', subGrade: '极', atk: 0, def: 0, type: 'assist', price: 0, source: '广灵洞天', combatType: 'passive', effect: 'cultivation', value: 1.0, desc: '修炼+100%' },
    { id: 'sky_chop_ruler', name: '辟天尺', grade: '玄天', subGrade: '上', atk: 800, def: 0, type: 'attack', price: 0, source: '灵界虚空', combatType: 'active', effect: 'space_tear', cd: 12, desc: '空间撕裂' },
    { id: 'two_world_card', name: '两界牌', grade: '玄天', subGrade: '中', atk: 0, def: 0, type: 'special', price: 0, source: '人族边境', combatType: 'consumable', charges: 3, desc: '跨界传送' },
    { id: 'ten_thousand_dragon_armor', name: '万龙甲', grade: '玄天', subGrade: '中', atk: 0, def: 500, type: 'defense', price: 0, source: '万妖山脉', combatType: 'passive', desc: '龙息防御' },
    { id: 'bug_eating_pot', name: '噬金壶', grade: '玄天', subGrade: '下', atk: 0, def: 0, type: 'special', price: 0, source: '灵界虫谷', combatType: 'active', effect: 'breed_beast', cd: 10, desc: '育虫' },
    { id: 'true_spirit_bone', name: '真灵骨', grade: '玄天', subGrade: '上', atk: 0, def: 0, type: 'special', price: 0, source: '真灵秘境', combatType: 'consumable', charges: 1, desc: '真灵解放' },
    { id: 'heaven_fire_feather', name: '天凤火羽', grade: '玄天', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '天凤族', combatType: 'passive', effect: 'fire_bonus', value: 1.0, desc: '火系+100%' },
    { id: 'xuantian_armor', name: '玄武玄甲', grade: '玄天', subGrade: '上', atk: 0, def: 800, type: 'defense', price: 0, source: '玄武族', combatType: 'passive', desc: '防+800+反伤' }
  ],

  // === 通天灵宝篇（共12件·合体~大乘可用） ===
  tongtian: [
    { id: 'heaven_fire_fan', name: '天凤羽扇', grade: '通天', subGrade: '中', atk: 2000, def: 0, type: 'attack', price: 0, source: '天凤族', combatType: 'active', element: 'fire', effect: 'burn_aoe', cd: 10, desc: '焚天' },
    { id: 'slay_immortal_sword', name: '戮仙剑', grade: '通天', subGrade: '上', atk: 5000, def: 0, type: 'attack', price: 0, source: '远古战场', combatType: 'active', effect: 'ignore_def', cd: 15, desc: '戮仙' },
    { id: 'xuantian_shield', name: '玄武盾', grade: '通天', subGrade: '中', atk: 0, def: 2000, type: 'defense', price: 0, source: '玄武族', combatType: 'active', effect: 'absolute_defense', cd: 20, desc: '绝对防御' },
    { id: 'qiankun_tower', name: '乾坤塔', grade: '通天', subGrade: '极', atk: 0, def: 0, type: 'assist', price: 0, source: '广灵洞天', combatType: 'passive', effect: 'time_flow', value: 5, desc: '时间流速x5' },
    { id: 'true_spirit_book', name: '真灵天书', grade: '通天', subGrade: '极', atk: 0, def: 0, type: 'assist', price: 0, source: '真灵秘境', combatType: 'passive', effect: 'all_bonus', value: 0.5, desc: '全属+50%' },
    { id: 'ten_thousand_blood_pearl', name: '万灵血珠', grade: '通天', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '血神秘境', combatType: 'passive', effect: 'heal', desc: '治疗+恢复' },
    { id: 'break_world_shuttle', name: '破界梭', grade: '通天', subGrade: '上', atk: 0, def: 0, type: 'special', price: 0, source: '灵界虚空', combatType: 'active', effect: 'teleport', cd: 7, desc: '虚空穿梭' },
    { id: 'nine_thunder_pearl', name: '九天雷珠', grade: '通天', subGrade: '上', atk: 10000, def: 0, type: 'attack', price: 0, source: '雷鸣山脉', combatType: 'active', element: 'thunder', effect: 'thunder_aoe', desc: '天罚' },
    { id: 'qilin_seal', name: '麒麟印', grade: '通天', subGrade: '中', atk: 0, def: 0, type: 'special', price: 0, source: '麒麟族', combatType: 'passive', effect: 'all_bonus', value: 0.3, desc: '镇压+全属+30%' },
    { id: 'eight_wild_ding', name: '八荒鼎', grade: '通天', subGrade: '下', atk: 0, def: 0, type: 'assist', price: 0, source: '丹圣谷', combatType: 'passive', effect: 'alchemy_bonus', value: 0.5, desc: '炼丹+炼器+50%' },
    { id: 'time_space_pearl', name: '时空珠', grade: '通天', subGrade: '极', atk: 0, def: 0, type: 'assist', price: 0, source: '灰域', combatType: 'passive', effect: 'time_space_law', value: 0.3, desc: '时空法则+30%' },
    { id: 'hongmeng_pearl', name: '鸿蒙珠', grade: '通天', subGrade: '上', atk: 0, def: 0, type: 'assist', price: 0, source: '源初秘境', combatType: 'passive', effect: 'cultivation', value: 4, desc: '修炼x5' }
  ],

  // === 先天灵宝篇（共8件·大乘~渡劫可用） ===
  xiantian: [
    { id: 'chaos_bell', name: '混沌钟', grade: '先天', subGrade: '中', atk: 10000, def: 5000, type: 'defense', price: 0, source: '源初秘境', combatType: 'active', effect: 'chaos_domain', cd: 30, desc: '混沌领域' },
    { id: 'open_world_axe', name: '开天斧', grade: '先天', subGrade: '上', atk: 30000, def: 0, type: 'attack', price: 0, source: '混沌外域', combatType: 'active', effect: 'break_law', cd: 100, desc: '开天辟地' },
    { id: 'reincarnation_mirror', name: '轮回镜', grade: '先天', subGrade: '极', atk: 0, def: 0, type: 'special', price: 0, source: '轮回殿', combatType: 'passive', effect: 'reincarnation_law', value: 0.3, desc: '轮回法则+30%' },
    { id: 'creation_jade', name: '造化玉碟', grade: '先天', subGrade: '极', atk: 0, def: 0, type: 'assist', price: 0, source: '天帝', combatType: 'passive', effect: 'divination', desc: '推演+炼制万物' },
    { id: 'heavenly_sword', name: '天道剑', grade: '先天', subGrade: '上', atk: 50000, def: 0, type: 'attack', price: 0, source: '天帝', combatType: 'passive', element: 'none', desc: '天道法则' },
    { id: 'immortal_tree', name: '不朽树', grade: '先天', subGrade: '中', atk: 0, def: 0, type: 'assist', price: 0, source: '源初秘境', combatType: 'passive', effect: 'immortal', desc: '生命+不死' },
    { id: 'chaos_curtain', name: '混沌珠帘', grade: '先天', subGrade: '上', atk: 0, def: 0, type: 'defense', price: 0, source: '混沌外域', combatType: 'passive', effect: 'all_resist', desc: '万法不侵' },
    { id: 'bithaya_flower', name: '彼岸花', grade: '先天', subGrade: '极', atk: 0, def: 0, type: 'special', price: 0, source: '轮回殿', combatType: 'passive', effect: 'transcend', desc: '超脱轮回' }
  ],

  // === 混沌至宝篇（共3件·道祖级·唯一） ===
  chaos: [
    { id: 'chaos_lotus', name: '混沌青莲', grade: '混沌', subGrade: '极', atk: 0, def: 0, type: 'special', price: 0, source: '源初秘境最深', combatType: 'active', effect: 'creation', cd: 10000, desc: '创世' },
    { id: 'zhangtian_bottle', name: '掌天瓶(完全体)', grade: '混沌', subGrade: '极', atk: 0, def: 0, type: 'special', price: 0, source: '韩立专属', combatType: 'active', effect: 'time_domain', desc: '时间领域' },
    { id: 'open_world_pearl', name: '开天珠', grade: '混沌', subGrade: '极', atk: 0, def: 0, type: 'special', price: 0, source: '混沌外域深处', combatType: 'consumable', charges: 1, desc: '开天辟地(1次)' }
  ]
};

// 战斗分类标注（GDD: 被动/主动/本命/消耗）
export const ARTIFACT_COMBAT_TYPES = {
  passive: '被动型（装备即生效）',
  active: '主动型（战斗中可释放技能）',
  legendary: '本命型（自动在技能栏）',
  consumable: '消耗型（限次数）'
};
