// 功法数据 - 完整版（数值已调整）
export const SKILLS = {
  // 主修功法
  // 修炼加成倍率范围：
  // 黄级：1.0-1.2 | 玄级：1.2-1.5 | 地级：1.5-2.0
  // 天级：2.0-2.5 | 灵级：2.5-3.5 | 仙级：3.5-4.5 | 神级：4.5-6.0
  main: [
    // 黄级主修（1.0-1.2）
    { id: 'basic_art', name: '基础吐纳法', grade: '黄级', element: '无', cultivationBonus: 1.0, atkBonus: 0, defBonus: 0, special: null, desc: '基础修炼功法，无特殊效果', source: '开局自带', maxLevel: 10, levelBonus: 0.05,
      awakenEffects: {
        'Lv.3': { name: '修炼精通', desc: '修炼速度+50%', effect: { type: 'cultivation_speed', value: 0.5 } },
        'Lv.5': { name: '灵力归元', desc: '灵力恢复+10%/天', effect: { type: 'mp_regen', value: 0.1 } },
        'Lv.7': { name: '道心坚定', desc: '突破成功率+5%', effect: { type: 'breakthrough_chance', value: 0.05 } },
        'Lv.10': { name: '大道至简', desc: '修炼速度翻倍，无修炼瓶颈', effect: { type: 'cultivation_speed', value: 1.0, ignore_bottleneck: true } }
      }
    },
    { id: 'yanyue_basic', name: '掩月基础功', grade: '黄级', element: '金', cultivationBonus: 1.05, atkBonus: 5, defBonus: 0, special: 'gold_learn', desc: '金属性功法学习+10%', source: '黄枫谷入门', maxLevel: 10, levelBonus: 0.05,
      awakenEffects: {
        'Lv.3': { name: '金属性领悟', desc: '金属性功法学习+20%', effect: { type: 'element_learn', element: 'metal', value: 0.2 } },
        'Lv.5': { name: '金锋初现', desc: '金属性伤害+15%', effect: { type: 'element_damage', element: 'metal', value: 0.15 } },
        'Lv.7': { name: '金光护体', desc: '受击反弹10%伤害', effect: { type: 'counter_damage', value: 0.1 } },
        'Lv.10': { name: '掩月之力', desc: '夜间全属性+20%', effect: { type: 'time_buff', time: 'night', value: 0.2 } }
      }
    },
    { id: 'qingmu', name: '青木诀', grade: '黄级', element: '木', cultivationBonus: 1.08, atkBonus: 0, defBonus: 5, special: 'mp_regen', desc: '灵力恢复+10%', source: '天南城坊市', maxLevel: 10, levelBonus: 0.05,
      awakenEffects: {
        'Lv.3': { name: '木灵归元', desc: '灵力恢复+20%', effect: { type: 'mp_regen', value: 0.2 } },
        'Lv.5': { name: '生生不息', desc: '生命恢复+5%/天', effect: { type: 'hp_regen', value: 0.05 } },
        'Lv.7': { name: '木灵护体', desc: '自动回复HP（战斗中）', effect: { type: 'combat_hp_regen', value: 0.03 } },
        'Lv.10': { name: '青木长生', desc: '寿元+50年', effect: { type: 'lifespan_bonus', value: 50 } }
      }
    },
    { id: 'xuanshui', name: '玄水功', grade: '黄级', element: '水', cultivationBonus: 1.1, atkBonus: 3, defBonus: 3, special: 'water_boost', desc: '水灵根≥30%时修炼+15%', source: '散修掉落', maxLevel: 10, levelBonus: 0.05,
      awakenEffects: {
        'Lv.3': { name: '水灵共鸣', desc: '水属性修炼+30%', effect: { type: 'element_cultivation', element: 'water', value: 0.3 } },
        'Lv.5': { name: '水刃锋锐', desc: '水属性伤害+20%', effect: { type: 'element_damage', element: 'water', value: 0.2 } },
        'Lv.7': { name: '水灵护盾', desc: '受击时吸收伤害（10%HP）', effect: { type: 'shield', value: 0.1 } },
        'Lv.10': { name: '玄水真意', desc: '冰冻概率+30%', effect: { type: 'freeze_chance', value: 0.3 } }
      }
    },
    { id: 'liehuo', name: '烈火功', grade: '黄级', element: '火', cultivationBonus: 1.12, atkBonus: 10, defBonus: -5, special: 'burn', desc: '火属性攻击附带灼烧概率+10%', source: '散修掉落', maxLevel: 10, levelBonus: 0.05,
      awakenEffects: {
        'Lv.3': { name: '灼烧精通', desc: '灼烧伤害+50%', effect: { type: 'burn_damage', value: 0.5 } },
        'Lv.5': { name: '火焰精通', desc: '灼烧概率+20%', effect: { type: 'burn_chance', value: 0.2 } },
        'Lv.7': { name: '火焰爆发', desc: '灼烧伤害溅射（范围伤害）', effect: { type: 'burn_aoe', value: 0.3 } },
        'Lv.10': { name: '烈火焚天', desc: '全体攻击（火属性）', effect: { type: 'aoe_damage', element: 'fire', value: 0.5 } }
      }
    },
    { id: 'houTu', name: '厚土功', grade: '黄级', element: '土', cultivationBonus: 1.15, atkBonus: -5, defBonus: 10, special: 'body_exp', desc: '炼体经验+5%', source: '散修掉落', maxLevel: 10, levelBonus: 0.05,
      awakenEffects: {
        'Lv.3': { name: '土灵根基', desc: '炼体经验+10%', effect: { type: 'body_exp', value: 0.1 } },
        'Lv.5': { name: '厚土之甲', desc: '防御+15%', effect: { type: 'defense_bonus', value: 0.15 } },
        'Lv.7': { name: '土灵护体', desc: '减伤20%', effect: { type: 'damage_reduction', value: 0.2 } },
        'Lv.10': { name: '厚土真身', desc: '物理免疫1回合', effect: { type: 'physical_immunity', duration: 1 } }
      }
    },

    // 玄级主修（1.2-1.5）
    { id: 'miaoyin', name: '妙音天诀', grade: '玄级', element: '无', cultivationBonus: 1.25, atkBonus: 10, defBonus: 10, special: 'sense_boost', desc: '神识+15%，音波类技能伤害+20%', source: '妙音门',
      awakenEffects: {
        'Lv.3': { name: '神识共鸣', desc: '神识+25%', effect: { type: 'sense_bonus', value: 0.25 } },
        'Lv.5': { name: '音波强化', desc: '音波伤害+30%', effect: { type: 'skill_damage', skillType: 'sound', value: 0.3 } },
        'Lv.7': { name: '音波控制', desc: '混乱概率+20%', effect: { type: 'confuse_chance', value: 0.2 } },
        'Lv.10': { name: '天籁之音', desc: '全体眩晕2回合', effect: { type: 'aoe_stun', duration: 2 } }
      }
    },
    { id: 'qingyuan_basic', name: '青元剑诀(入门)', grade: '玄级', element: '金', cultivationBonus: 1.3, atkBonus: 20, defBonus: 0, special: 'sword_qi', desc: '剑气积累机制', source: '落云宗',
      awakenEffects: {
        'Lv.3': { name: '剑气锋锐', desc: '剑气伤害+20%', effect: { type: 'skill_damage', skillType: 'sword', value: 0.2 } },
        'Lv.5': { name: '剑气暴击', desc: '剑气暴击+15%', effect: { type: 'skill_crit', skillType: 'sword', value: 0.15 } },
        'Lv.7': { name: '剑气穿透', desc: '无视20%防御', effect: { type: 'armor_penetration', value: 0.2 } },
        'Lv.10': { name: '剑气领域', desc: '范围伤害（剑气）', effect: { type: 'aoe_damage', skillType: 'sword', value: 0.3 } }
      }
    },
    { id: 'huangfeng_array', name: '黄枫阵术', grade: '玄级', element: '土', cultivationBonus: 1.32, atkBonus: 5, defBonus: 15, special: 'array_boost', desc: '阵法类技能效果+30%', source: '黄枫谷',
      awakenEffects: {
        'Lv.3': { name: '阵法精通', desc: '阵法效果+50%', effect: { type: 'array_power', value: 0.5 } },
        'Lv.5': { name: '阵法扩展', desc: '阵法范围+30%', effect: { type: 'array_range', value: 0.3 } },
        'Lv.7': { name: '阵法控制', desc: '减速+定身概率+20%', effect: { type: 'array_control', value: 0.2 } },
        'Lv.10': { name: '黄枫大阵', desc: '全体封印1回合', effect: { type: 'aoe_seal', duration: 1 } }
      }
    },
    { id: 'qingxin', name: '清心诀', grade: '玄级', element: '木', cultivationBonus: 1.35, atkBonus: 0, defBonus: 5, special: 'resist_heart', desc: '心魔抗性+30%，走火概率-15%', source: '清虚门',
      awakenEffects: {
        'Lv.3': { name: '心魔免疫', desc: '心魔抗性+50%', effect: { type: 'heart_demon_resist', value: 0.5 } },
        'Lv.5': { name: '道心稳固', desc: '走火概率-30%', effect: { type: 'qi_deviation_resist', value: 0.3 } },
        'Lv.7': { name: '心境提升', desc: '修炼速度+20%', effect: { type: 'cultivation_speed', value: 0.2 } },
        'Lv.10': { name: '清心明月', desc: '免疫精神攻击', effect: { type: 'mental_immunity', value: true } }
      }
    },
    { id: 'tongbao', name: '通宝诀', grade: '玄级', element: '无', cultivationBonus: 1.4, atkBonus: 5, defBonus: 5, special: 'trade', desc: '交易价格-15%，鉴定成功率+20%', source: '万宝楼',
      awakenEffects: {
        'Lv.3': { name: '交易精通', desc: '交易价格-25%', effect: { type: 'trade_discount', value: 0.25 } },
        'Lv.5': { name: '鉴宝之眼', desc: '鉴定成功率+40%', effect: { type: 'identify_success', value: 0.4 } },
        'Lv.7': { name: '寻宝直觉', desc: '发现隐藏物品概率+20%', effect: { type: 'hidden_item_chance', value: 0.2 } },
        'Lv.10': { name: '通宝天眼', desc: '查看物品隐藏属性', effect: { type: 'see_hidden_stats', value: true } }
      }
    },

    // 地级主修（1.5-2.0）
    { id: 'yanyue_tian', name: '掩月天诀', grade: '地级', element: '金', cultivationBonus: 1.6, atkBonus: 25, defBonus: 15, special: 'moon_night', desc: '月圆之夜修炼速度+50%', source: '掩月宗镇派',
      awakenEffects: {
        'Lv.3': { name: '月夜精通', desc: '月夜修炼+80%', effect: { type: 'cultivation_speed', time: 'moon_night', value: 0.8 } },
        'Lv.5': { name: '月光之力', desc: '夜间攻击+30%', effect: { type: 'attack_bonus', time: 'night', value: 0.3 } },
        'Lv.7': { name: '月华护体', desc: '月夜减伤50%', effect: { type: 'damage_reduction', time: 'moon_night', value: 0.5 } },
        'Lv.10': { name: '掩月真身', desc: '月夜全属性+40%', effect: { type: 'all_stats', time: 'moon_night', value: 0.4 } }
      }
    },
    { id: 'luoyun_sword', name: '落云剑诀', grade: '地级', element: '金', cultivationBonus: 1.65, atkBonus: 35, defBonus: 5, special: 'sword_damage', desc: '剑气伤害+30%，破甲概率+15%', source: '落云宗镇派',
      awakenEffects: {
        'Lv.3': { name: '剑气锋锐', desc: '剑气伤害+40%', effect: { type: 'skill_damage', skillType: 'sword', value: 0.4 } },
        'Lv.5': { name: '破甲剑气', desc: '破甲概率+25%', effect: { type: 'armor_penetration_chance', value: 0.25 } },
        'Lv.7': { name: '剑气领域', desc: '范围伤害（剑气）', effect: { type: 'aoe_damage', skillType: 'sword', value: 0.5 } },
        'Lv.10': { name: '大庚剑阵', desc: '72剑齐出，毁灭伤害', effect: { type: 'ultimate_skill', name: '大庚剑阵', damage: 10.0 } }
      }
    },
    { id: 'bujin', name: '不动金钟', grade: '地级', element: '土', cultivationBonus: 1.55, atkBonus: 5, defBonus: 40, special: 'counter', desc: '受击反伤15%，眩晕抗性+50%', source: '天阙堡镇派',
      awakenEffects: {
        'Lv.3': { name: '反伤强化', desc: '反伤+25%', effect: { type: 'counter_damage', value: 0.25 } },
        'Lv.5': { name: '金钟不坏', desc: '眩晕抗性+80%', effect: { type: 'stun_resist', value: 0.8 } },
        'Lv.7': { name: '金钟罩', desc: '免疫控制1回合', effect: { type: 'control_immunity', duration: 1 } },
        'Lv.10': { name: '不动明王', desc: '3回合无敌', effect: { type: 'invincible', duration: 3 } }
      }
    },
    { id: 'wanshou', name: '万兽诀', grade: '地级', element: '无', cultivationBonus: 1.7, atkBonus: 15, defBonus: 15, special: 'beast_boost', desc: '灵兽全属性+20%，可同时出战2只', source: '灵兽山镇派',
      awakenEffects: {
        'Lv.3': { name: '兽群精通', desc: '灵兽全属性+30%', effect: { type: 'beast_stats', value: 0.3 } },
        'Lv.5': { name: '万兽之主', desc: '可同时出战3只', effect: { type: 'beast_slot', value: 3 } },
        'Lv.7': { name: '灵兽合体', desc: '合体后全属性+50%', effect: { type: 'beast_merge_stats', value: 0.5 } },
        'Lv.10': { name: '万兽朝宗', desc: '召唤万兽助战', effect: { type: 'summon_beasts', count: 10 } }
      }
    },
    { id: 'tiansha', name: '天煞魔功', grade: '地级', element: '火', cultivationBonus: 1.75, atkBonus: 35, defBonus: -10, special: 'kill_heal', desc: '击杀回复10%HP，魔道名望+5/击杀', source: '天煞宗镇派',
      awakenEffects: {
        'Lv.3': { name: '杀戮回复', desc: '击杀回复+15%', effect: { type: 'kill_heal', value: 0.15 } },
        'Lv.5': { name: '魔气爆发', desc: '伤害+30%（持续3回合）', effect: { type: 'damage_boost', duration: 3, value: 0.3 } },
        'Lv.7': { name: '吸血效果', desc: '吸血+20%', effect: { type: 'lifesteal', value: 0.2 } },
        'Lv.10': { name: '天煞降临', desc: '全体攻击+吸血', effect: { type: 'aoe_lifesteal', damage: 5.0, heal: 0.3 } }
      }
    },
    { id: 'yugui', name: '御鬼诀', grade: '地级', element: '阴', cultivationBonus: 1.68, atkBonus: 20, defBonus: 10, special: 'ghost_control', desc: '可操控亡灵傀儡(上限=境界)', source: '鬼灵门镇派',
      awakenEffects: {
        'Lv.3': { name: '亡灵精通', desc: '亡灵数量+50%', effect: { type: 'ghost_count', value: 0.5 } },
        'Lv.5': { name: '亡灵强化', desc: '亡灵属性+30%', effect: { type: 'ghost_stats', value: 0.3 } },
        'Lv.7': { name: '亡灵合体', desc: '亡灵合体（属性翻倍）', effect: { type: 'ghost_merge', value: 2.0 } },
        'Lv.10': { name: '百鬼夜行', desc: '召唤百鬼助战', effect: { type: 'summon_ghosts', count: 100 } }
      }
    },
    { id: 'hehuan', name: '合欢诀', grade: '地级', element: '无', cultivationBonus: 1.8, atkBonus: 0, defBonus: 0, special: 'dual_cultivation', desc: '双修效率+100%，NPC好感获取+30%', source: '合欢宗镇派',
      awakenEffects: {
        'Lv.3': { name: '双修精通', desc: '双修效率+150%', effect: { type: 'dual_cultivation_efficiency', value: 1.5 } },
        'Lv.5': { name: '情感共鸣', desc: 'NPC好感+50%', effect: { type: 'npc_favor_bonus', value: 0.5 } },
        'Lv.7': { name: '双修突破', desc: '双修时突破概率+20%', effect: { type: 'dual_cultivation_breakthrough', value: 0.2 } },
        'Lv.10': { name: '合欢真意', desc: '双修获得额外属性点', effect: { type: 'dual_cultivation_stats', value: 5 } }
      }
    },
    { id: 'xuanyin', name: '玄阴魔功', grade: '地级', element: '水', cultivationBonus: 1.72, atkBonus: 30, defBonus: 10, special: 'yin_damage', desc: '阴属性技能伤害+40%，冰冻概率+20%', source: '极阴岛镇派',
      awakenEffects: {
        'Lv.3': { name: '阴寒精通', desc: '阴属性伤害+60%', effect: { type: 'element_damage', element: 'yin', value: 0.6 } },
        'Lv.5': { name: '玄阴冰冻', desc: '冰冻概率+30%', effect: { type: 'freeze_chance', value: 0.3 } },
        'Lv.7': { name: '阴寒领域', desc: '全体减速20%', effect: { type: 'aoe_slow', value: 0.2 } },
        'Lv.10': { name: '玄阴真冰', desc: '冰冻+封印2回合', effect: { type: 'freeze_seal', duration: 2 } }
      }
    },
    { id: 'fansheng_remnant', name: '梵圣真魔功·残篇', grade: '地级', element: '无', cultivationBonus: 1.58, atkBonus: 15, defBonus: 25, special: 'body_refine', desc: '炼体+30%，气血+35%，真魔法相', source: '大晋古战场',
      awakenEffects: {
        'Lv.3': { name: '炼体精通', desc: '炼体+40%', effect: { type: 'body_refine_bonus', value: 0.4 } },
        'Lv.5': { name: '气血翻涌', desc: '气血+50%', effect: { type: 'hp_bonus', value: 0.5 } },
        'Lv.7': { name: '真魔法相', desc: '伤害+30%', effect: { type: 'damage_boost', value: 0.3 } },
        'Lv.10': { name: '梵圣真身', desc: '肉身重生1次（恢复50%HP）', effect: { type: 'rebirth', heal: 0.5, count: 1 } }
      }
    },
    { id: 'moxiang', name: '魔相金身', grade: '地级', element: '无', cultivationBonus: 1.52, atkBonus: 10, defBonus: 35, special: 'body_exp_boost', desc: '炼体经验+50%，物理减伤+20%', source: '天魔宗',
      awakenEffects: {
        'Lv.3': { name: '金身精通', desc: '炼体经验+80%', effect: { type: 'body_exp_bonus', value: 0.8 } },
        'Lv.5': { name: '魔相护体', desc: '物理减伤+30%', effect: { type: 'physical_damage_reduction', value: 0.3 } },
        'Lv.7': { name: '金身不坏', desc: '减伤50%', effect: { type: 'damage_reduction', value: 0.5 } },
        'Lv.10': { name: '魔相真身', desc: '3回合无敌', effect: { type: 'invincible', duration: 3 } }
      }
    },

    // 天级主修（2.0-2.5）
    { id: 'xingchen', name: '星辰引', grade: '天级', element: '无', cultivationBonus: 2.1, atkBonus: 20, defBonus: 20, special: 'star_power', desc: '星辰之力（夜间全属性+15%）', source: '星宫镇派',
      awakenEffects: {
        'Lv.3': { name: '星辰共鸣', desc: '夜间全属性+25%', effect: { type: 'all_stats', time: 'night', value: 0.25 } },
        'Lv.5': { name: '星辰之力', desc: '夜间伤害+40%', effect: { type: 'damage_boost', time: 'night', value: 0.4 } },
        'Lv.7': { name: '星辰护体', desc: '夜间减伤60%', effect: { type: 'damage_reduction', time: 'night', value: 0.6 } },
        'Lv.10': { name: '星辰真身', desc: '夜间全属性+60%', effect: { type: 'all_stats', time: 'night', value: 0.6 } }
      }
    },
    { id: 'tiandao', name: '天道正法', grade: '天级', element: '无', cultivationBonus: 2.2, atkBonus: 15, defBonus: 15, special: 'heaven_protect', desc: '正道名望+50%，濒死10%触发免死', source: '天道盟镇派',
      awakenEffects: {
        'Lv.3': { name: '天道眷顾', desc: '正道名望+80%', effect: { type: 'reputation_bonus', faction: 'righteous', value: 0.8 } },
        'Lv.5': { name: '濒死免死', desc: '免死概率+20%', effect: { type: 'death_avoid_chance', value: 0.2 } },
        'Lv.7': { name: '天道护佑', desc: '免疫致命1次', effect: { type: 'death_avoid', count: 1 } },
        'Lv.10': { name: '天道降临', desc: '全体治疗+净化', effect: { type: 'aoe_heal', heal: 0.5, cleanse: true } }
      }
    },
    { id: 'sanzhuan', name: '三转重元功', grade: '天级', element: '无', cultivationBonus: 2.15, atkBonus: 10, defBonus: 10, special: 'three_turns', desc: '三转后灵力x2，走火归零', source: '顿悟事件',
      awakenEffects: {
        'Lv.3': { name: '灵力扩充', desc: '灵力上限+50%', effect: { type: 'mp_bonus', value: 0.5 } },
        'Lv.5': { name: '三转灵力', desc: '三转后灵力x3', effect: { type: 'three_turns_mp', value: 3 } },
        'Lv.7': { name: '走火免疫', desc: '走火概率归零+属性提升', effect: { type: 'qi_deviation_immune', stats_bonus: 0.1 } },
        'Lv.10': { name: '三转真身', desc: '灵力无限1回合', effect: { type: 'infinite_mp', duration: 1 } }
      }
    },
    { id: 'qingyuan_full', name: '青元剑诀(完整)', grade: '天级', element: '金', cultivationBonus: 2.25, atkBonus: 40, defBonus: 5, special: 'sword_array', desc: '剑气积累→法宝攻+5%/层，Lv10大庚剑阵x5', source: '虚天殿',
      awakenEffects: {
        'Lv.3': { name: '剑气精通', desc: '剑气积累+50%', effect: { type: 'sword_qi_bonus', value: 0.5 } },
        'Lv.5': { name: '剑气强化', desc: '法宝攻+8%/层', effect: { type: 'artifact_damage_per_qi', value: 0.08 } },
        'Lv.7': { name: '大庚剑阵', desc: '大庚剑阵x8', effect: { type: 'sword_array_power', value: 8 } },
        'Lv.10': { name: '青元剑域', desc: '72剑齐出+范围伤害', effect: { type: 'ultimate_sword_domain', damage: 15.0, aoe: true } }
      }
    },
    { id: 'dayan', name: '大衍诀', grade: '天级', element: '无', cultivationBonus: 2.3, atkBonus: 0, defBonus: 0, special: 'sense_boost', desc: '神识+10%/级，Lv10大衍神光(神识攻x3)', source: '血色禁地',
      awakenEffects: {
        'Lv.3': { name: '神识精通', desc: '神识+15%/级', effect: { type: 'sense_per_level', value: 0.15 } },
        'Lv.5': { name: '大衍神光', desc: '大衍神光伤害x4', effect: { type: 'sense_damage_multiplier', value: 4 } },
        'Lv.7': { name: '神识领域', desc: '范围控制（眩晕）', effect: { type: 'sense_domain', control: 'stun', duration: 2 } },
        'Lv.10': { name: '大衍真身', desc: '神识攻击x10', effect: { type: 'sense_damage_multiplier', value: 10 } }
      }
    },
    
    // 灵级主修（2.5-3.5）
    { id: 'fansheng_full', name: '梵圣真魔功·完整', grade: '灵级', element: '无', cultivationBonus: 2.8, atkBonus: 30, defBonus: 50, special: 'body_rebirth', desc: '炼体+50%，气血+80%，肉身重生', source: '广灵洞天',
      awakenEffects: {
        'Lv.3': { name: '真魔炼体', desc: '炼体+70%', effect: { type: 'body_refine_bonus', value: 0.7 } },
        'Lv.5': { name: '气血无尽', desc: '气血+100%', effect: { type: 'hp_bonus', value: 1.0 } },
        'Lv.7': { name: '肉身重生', desc: '死亡恢复50%HP', effect: { type: 'rebirth', heal: 0.5 } },
        'Lv.10': { name: '梵圣真身', desc: '3次重生机会', effect: { type: 'rebirth', count: 3, heal: 1.0 } }
      }
    },
    { id: 'guangling', name: '广灵道经', grade: '灵级', element: '无', cultivationBonus: 3.0, atkBonus: 25, defBonus: 25, special: 'law_insight', desc: '全属性均衡成长，法则感悟+30%', source: '广灵洞天传承',
      awakenEffects: {
        'Lv.3': { name: '道法精通', desc: '全属性+20%', effect: { type: 'all_stats', value: 0.2 } },
        'Lv.5': { name: '法则感悟', desc: '法则感悟+50%', effect: { type: 'law_insight', value: 0.5 } },
        'Lv.7': { name: '法则攻击', desc: '无视防御', effect: { type: 'armor_penetration', value: 1.0 } },
        'Lv.10': { name: '广灵真身', desc: '全属性翻倍', effect: { type: 'all_stats_multiplier', value: 2.0 } }
      }
    },
    { id: 'hundun_spirit', name: '混沌真解·灵界篇', grade: '灵级', element: '混沌', cultivationBonus: 3.2, atkBonus: 40, defBonus: 20, special: 'chaos_attack', desc: '混沌属性攻击，无视20%防御', source: '万古魔域',
      awakenEffects: {
        'Lv.3': { name: '混沌精通', desc: '混沌伤害+30%', effect: { type: 'element_damage', element: 'chaos', value: 0.3 } },
        'Lv.5': { name: '混沌穿透', desc: '无视防御+30%', effect: { type: 'armor_penetration', value: 0.3 } },
        'Lv.7': { name: '混沌领域', desc: '全体减防20%', effect: { type: 'aoe_debuff', stat: 'defense', value: -0.2 } },
        'Lv.10': { name: '混沌真身', desc: '混沌伤害x3', effect: { type: 'element_damage_multiplier', element: 'chaos', value: 3.0 } }
      }
    },
    
    // 仙级主修（3.5-4.5）
    { id: 'hongmeng', name: '鸿蒙道典', grade: '仙级', element: '混沌', cultivationBonus: 3.8, atkBonus: 40, defBonus: 40, special: 'law_boost', desc: '法则感悟+50%，仙界修炼速度+100%', source: '天庭藏经阁禁书区',
      awakenEffects: {
        'Lv.3': { name: '鸿蒙法则', desc: '法则感悟+80%', effect: { type: 'law_insight', value: 0.8 } },
        'Lv.5': { name: '仙界精通', desc: '仙界修炼+150%', effect: { type: 'cultivation_speed', region: 'xianjie', value: 1.5 } },
        'Lv.7': { name: '法则攻击', desc: '无视50%防御', effect: { type: 'armor_penetration', value: 0.5 } },
        'Lv.10': { name: '鸿蒙真身', desc: '法则伤害x5', effect: { type: 'law_damage_multiplier', value: 5.0 } }
      }
    },
    { id: 'hundun_creation', name: '混沌造化诀', grade: '仙级', element: '混沌', cultivationBonus: 4.2, atkBonus: 50, defBonus: 30, special: 'creation', desc: '混沌本源攻击，可融合多种法则', source: '源初秘境',
      awakenEffects: {
        'Lv.3': { name: '造化精通', desc: '混沌伤害+40%', effect: { type: 'element_damage', element: 'chaos', value: 0.4 } },
        'Lv.5': { name: '法则融合', desc: '多属性攻击（混沌+五行）', effect: { type: 'multi_element_attack', elements: ['chaos', 'metal', 'wood', 'water', 'fire', 'earth'] } },
        'Lv.7': { name: '造化之力', desc: '属性转化（任意属性攻击）', effect: { type: 'element_convert', value: true } },
        'Lv.10': { name: '造化真身', desc: '创造/毁灭，对道祖级有效', effect: { type: 'creation_destruction', ultimate: true } }
      }
    },
    
    // 神级主修（4.5-6.0）
    { id: 'lunhui', name: '大轮回术', grade: '神级', element: '轮回', cultivationBonus: 5.0, atkBonus: 60, defBonus: 60, special: 'reincarnation', desc: '轮回法则（死亡后30%概率原地复活）', source: '轮回殿',
      awakenEffects: {
        'Lv.3': { name: '轮回精通', desc: '复活概率+50%', effect: { type: 'rebirth_chance', value: 0.5 } },
        'Lv.5': { name: '轮回伤害', desc: '轮回伤害+40%', effect: { type: 'element_damage', element: 'lunhui', value: 0.4 } },
        'Lv.7': { name: '轮回领域', desc: '全体减速+虚弱', effect: { type: 'aoe_debuff', debuff: ['slow', 'weaken'], duration: 3 } },
        'Lv.10': { name: '轮回真身', desc: '死亡后100%复活', effect: { type: 'rebirth_chance', value: 1.0 } }
      }
    },
    { id: 'hundun_dao', name: '混沌大道经', grade: '神级', element: '混沌', cultivationBonus: 6.0, atkBonus: 80, defBonus: 50, special: 'world_create', desc: '道祖专属，领悟混沌本源，可创造小世界', source: '道祖突破奖励',
      awakenEffects: {
        'Lv.3': { name: '混沌精通', desc: '混沌伤害+60%', effect: { type: 'element_damage', element: 'chaos', value: 0.6 } },
        'Lv.5': { name: '创造小世界', desc: '特殊效果（领域展开）', effect: { type: 'world_domain', duration: 5 } },
        'Lv.7': { name: '混沌法则', desc: '无视防御', effect: { type: 'armor_penetration', value: 1.0 } },
        'Lv.10': { name: '道祖真身', desc: '全属性无敌3回合', effect: { type: 'invincible', duration: 3, all_stats: true } }
      }
    },
  ],
  
  // 辅修功法
  sub: [
    { id: 'luoyan', name: '罗烟步', grade: '玄级', dodgeBonus: 15, desc: '闪避+15%', source: '随机探索',
      awakenEffects: {
        'Lv.3': { name: '闪避精通', desc: '闪避+25%', effect: { type: 'dodge_bonus', value: 0.25 } },
        'Lv.5': { name: '闪避大师', desc: '闪避+40%', effect: { type: 'dodge_bonus', value: 0.4 } },
        'Lv.7': { name: '闪避反击', desc: '闪避时反击（伤害50%）', effect: { type: 'dodge_counter', damage: 0.5 } },
        'Lv.10': { name: '隐身之步', desc: '闪避后隐身1回合', effect: { type: 'stealth', duration: 1 } }
      }
    },
    { id: 'xuedun', name: '血遁术', grade: '玄级', special: 'escape', desc: '消耗10%气血，战斗中立即逃离', source: '黑市购买',
      awakenEffects: {
        'Lv.3': { name: '血遁精通', desc: '消耗HP-50%', effect: { type: 'hp_cost_reduction', value: 0.5 } },
        'Lv.5': { name: '血遁大师', desc: '逃离成功率+30%', effect: { type: 'escape_chance', value: 0.3 } },
        'Lv.7': { name: '血遁护盾', desc: '逃离后获得护盾', effect: { type: 'escape_shield', value: 0.2 } },
        'Lv.10': { name: '血遁反击', desc: '逃离后反击（伤害100%）', effect: { type: 'escape_counter', damage: 1.0 } }
      }
    },
    { id: 'qingxin_sub', name: '清心诀', grade: '玄级', resistBonus: 30, desc: '心魔抗性+30%，走火概率-15%', source: '清虚门',
      awakenEffects: {
        'Lv.3': { name: '心魔精通', desc: '心魔抗性+50%', effect: { type: 'heart_demon_resist', value: 0.5 } },
        'Lv.5': { name: '道心稳固', desc: '走火概率-50%', effect: { type: 'qi_deviation_resist', value: 0.5 } },
        'Lv.7': { name: '心境提升', desc: '修炼速度+30%', effect: { type: 'cultivation_speed', value: 0.3 } },
        'Lv.10': { name: '清心明月', desc: '免疫精神攻击', effect: { type: 'mental_immunity', value: true } }
      }
    },
    { id: 'tongbao_sub', name: '通宝诀', grade: '玄级', tradeBonus: 15, desc: '交易价格-15%，鉴定成功率+20%', source: '万宝楼',
      awakenEffects: {
        'Lv.3': { name: '交易精通', desc: '交易价格-25%', effect: { type: 'trade_discount', value: 0.25 } },
        'Lv.5': { name: '鉴宝之眼', desc: '鉴定成功率+40%', effect: { type: 'identify_success', value: 0.4 } },
        'Lv.7': { name: '寻宝直觉', desc: '发现隐藏物品+20%', effect: { type: 'hidden_item_chance', value: 0.2 } },
        'Lv.10': { name: '通宝天眼', desc: '查看物品隐藏属性', effect: { type: 'see_hidden_stats', value: true } }
      }
    },
    { id: 'huangfeng_sub', name: '黄枫阵术', grade: '玄级', arrayBonus: 30, desc: '阵法类技能效果+30%', source: '黄枫谷',
      awakenEffects: {
        'Lv.3': { name: '阵法精通', desc: '阵法效果+50%', effect: { type: 'array_power', value: 0.5 } },
        'Lv.5': { name: '阵法扩展', desc: '阵法范围+30%', effect: { type: 'array_range', value: 0.3 } },
        'Lv.7': { name: '阵法控制', desc: '减速+定身概率+20%', effect: { type: 'array_control', value: 0.2 } },
        'Lv.10': { name: '黄枫大阵', desc: '全体封印1回合', effect: { type: 'aoe_seal', duration: 1 } }
      }
    },
    { id: 'bailian', name: '百炼术', grade: '地级', refineBonus: 25, desc: '炼器成功率+25%，炼器品质+1阶', source: '百巧院',
      awakenEffects: {
        'Lv.3': { name: '炼器精通', desc: '炼器成功率+40%', effect: { type: 'refine_success', value: 0.4 } },
        'Lv.5': { name: '炼器大师', desc: '炼器品质+2阶', effect: { type: 'refine_quality', value: 2 } },
        'Lv.7': { name: '炼器暴击', desc: '双倍产出概率+20%', effect: { type: 'refine_crit', value: 0.2 } },
        'Lv.10': { name: '炼器宗师', desc: '必出极品', effect: { type: 'refine_guarantee', grade: '极品' } }
      }
    },
    { id: 'qiaoshou', name: '巧手天工', grade: '地级', craftBonus: 50, desc: '装备耐久+50%，修理消耗-30%', source: '百巧院',
      awakenEffects: {
        'Lv.3': { name: '巧手精通', desc: '装备耐久+80%', effect: { type: 'durability_bonus', value: 0.8 } },
        'Lv.5': { name: '巧手大师', desc: '修理消耗-50%', effect: { type: 'repair_cost_reduction', value: 0.5 } },
        'Lv.7': { name: '装备不坏', desc: '装备永不损坏', effect: { type: 'durability_immune', value: true } },
        'Lv.10': { name: '巧手天工', desc: '装备属性+20%', effect: { type: 'equipment_stats_bonus', value: 0.2 } }
      }
    },
    { id: 'kongshen', name: '控神术', grade: '玄级', controlBonus: 50, desc: '控制敌方灵兽1回合', source: '御灵宗',
      awakenEffects: {
        'Lv.3': { name: '控制精通', desc: '控制时间+50%', effect: { type: 'control_duration', value: 0.5 } },
        'Lv.5': { name: '控制大师', desc: '控制成功率+30%', effect: { type: 'control_chance', value: 0.3 } },
        'Lv.7': { name: '控制窃取', desc: '控制后窃取技能', effect: { type: 'control_steal_skill', value: true } },
        'Lv.10': { name: '控神宗师', desc: '控制灵兽永久', effect: { type: 'control_permanent', value: true } }
      }
    },
    { id: 'caibu', name: '采补术', grade: '玄级', drainBonus: 20, desc: '吸取对方修为，临时属性+20%', source: '合欢宗',
      awakenEffects: {
        'Lv.3': { name: '采补精通', desc: '修为吸取+30%', effect: { type: 'drain_bonus', value: 0.3 } },
        'Lv.5': { name: '采补大师', desc: '临时属性+40%', effect: { type: 'temp_stats', value: 0.4 } },
        'Lv.7': { name: '采补强化', desc: '吸取后获得buff', effect: { type: 'drain_buff', buff: 'all_stats', duration: 3 } },
        'Lv.10': { name: '采补大法', desc: '全属性+50%', effect: { type: 'all_stats', value: 0.5 } }
      }
    },
    { id: 'tishen', name: '替身咒', grade: '玄级', proxyBonus: 30, desc: '制造替身承受下次致命伤害', source: '阴罗宗',
      awakenEffects: {
        'Lv.3': { name: '替身精通', desc: '替身承伤+50%', effect: { type: 'proxy_damage_absorb', value: 0.5 } },
        'Lv.5': { name: '替身大师', desc: '替身反击（伤害30%）', effect: { type: 'proxy_counter', damage: 0.3 } },
        'Lv.7': { name: '替身爆炸', desc: '替身爆炸（范围伤害）', effect: { type: 'proxy_explosion', aoe: true, damage: 0.5 } },
        'Lv.10': { name: '替身自爆', desc: '替身自爆（伤害翻倍）', effect: { type: 'proxy_self_destruct', damage_multiplier: 2.0 } }
      }
    }
  ],
  
  // 招式功法
  combat: [
    // 黄级招式
    { id: 'fireball', name: '火球术', grade: '黄级', damage: 1.5, mpCost: 10, element: 'fire', cooldown: 2, desc: '基础火属性攻击', source: '散修掉落',
      awakenEffects: {
        'Lv.3': { name: '灼烧精通', desc: '灼烧伤害+50%', effect: { type: 'burn_damage', value: 0.5 } },
        'Lv.5': { name: '火焰精通', desc: '灼烧概率+20%', effect: { type: 'burn_chance', value: 0.2 } },
        'Lv.7': { name: '火焰爆发', desc: '灼烧伤害溅射（范围）', effect: { type: 'burn_aoe', value: 0.3 } },
        'Lv.10': { name: '焚天', desc: '全体攻击（火属性）', effect: { type: 'aoe_damage', element: 'fire', value: 0.5 } }
      }
    },
    { id: 'ice_cone', name: '冰锥术', grade: '黄级', damage: 1.3, mpCost: 12, element: 'water', cooldown: 2, desc: '基础水属性攻击', source: '散修掉落',
      awakenEffects: {
        'Lv.3': { name: '冰冻精通', desc: '冰冻概率+50%', effect: { type: 'freeze_chance', value: 0.5 } },
        'Lv.5': { name: '冰冻延长', desc: '冰冻时间+1回合', effect: { type: 'freeze_duration', value: 1 } },
        'Lv.7': { name: '冰封领域', desc: '全体减速20%', effect: { type: 'aoe_slow', value: 0.2 } },
        'Lv.10': { name: '绝对零度', desc: '全体冰冻2回合', effect: { type: 'aoe_freeze', duration: 2 } }
      }
    },
    { id: 'thunder', name: '雷击术', grade: '黄级', damage: 1.8, mpCost: 15, element: 'thunder', cooldown: 3, desc: '雷属性攻击，20%麻痹', source: '散修掉落',
      awakenEffects: {
        'Lv.3': { name: '麻痹精通', desc: '麻痹概率+50%', effect: { type: 'paralyze_chance', value: 0.5 } },
        'Lv.5': { name: '麻痹延长', desc: '麻痹时间+1回合', effect: { type: 'paralyze_duration', value: 1 } },
        'Lv.7': { name: '雷霆万钧', desc: '范围攻击（雷属性）', effect: { type: 'aoe_damage', element: 'thunder', value: 0.3 } },
        'Lv.10': { name: '天雷灭世', desc: '全体麻痹2回合', effect: { type: 'aoe_paralyze', duration: 2 } }
      }
    },
    { id: 'gold_blade', name: '庚金诀', grade: '黄级', damage: 1.5, mpCost: 20, element: 'metal', cooldown: 2, desc: '基础金属性攻击', source: '天南城坊市',
      awakenEffects: {
        'Lv.3': { name: '金锋精通', desc: '金属性伤害+30%', effect: { type: 'element_damage', element: 'metal', value: 0.3 } },
        'Lv.5': { name: '破甲剑气', desc: '无视20%防御', effect: { type: 'armor_penetration', value: 0.2 } },
        'Lv.7': { name: '金光万丈', desc: '范围伤害（金属性）', effect: { type: 'aoe_damage', element: 'metal', value: 0.4 } },
        'Lv.10': { name: '庚金真意', desc: '金属性伤害x3', effect: { type: 'element_damage_multiplier', element: 'metal', value: 3 } }
      }
    },
    { id: 'basic_sword', name: '基础剑法', grade: '黄级', damage: 1.3, mpCost: 10, element: 'none', cooldown: 1, desc: '基础剑术，无特效', source: '七玄门旧址',
      awakenEffects: {
        'Lv.3': { name: '剑术精通', desc: '剑类伤害+30%', effect: { type: 'skill_damage', skillType: 'sword', value: 0.3 } },
        'Lv.5': { name: '剑气锋锐', desc: '暴击率+15%', effect: { type: 'crit_chance', value: 0.15 } },
        'Lv.7': { name: '剑气纵横', desc: '范围攻击', effect: { type: 'aoe_damage', skillType: 'sword', value: 0.3 } },
        'Lv.10': { name: '基础剑意', desc: '剑类伤害x2', effect: { type: 'skill_damage_multiplier', skillType: 'sword', value: 2 } }
      }
    },
    { id: 'gold_shield', name: '金盾术', grade: '黄级', damage: 0, mpCost: 15, element: 'metal', cooldown: 4, desc: '护体2回合，减伤30%', source: '天南城坊市',
      awakenEffects: {
        'Lv.3': { name: '金盾精通', desc: '减伤+40%', effect: { type: 'damage_reduction', value: 0.4 } },
        'Lv.5': { name: '金盾延长', desc: '护体时间+1回合', effect: { type: 'buff_duration', value: 1 } },
        'Lv.7': { name: '金盾反伤', desc: '护体时反伤15%', effect: { type: 'counter_damage', value: 0.15 } },
        'Lv.10': { name: '金盾真身', desc: '护体3回合+反伤30%', effect: { type: 'shield_plus', duration: 3, counter: 0.3 } }
      }
    },
    { id: 'vine', name: '缠绕术', grade: '黄级', damage: 1.2, mpCost: 12, element: 'wood', cooldown: 2, desc: '基础攻击+缠绕（无法闪避/速归零/2回）', source: '散修掉落',
      awakenEffects: {
        'Lv.3': { name: '缠绕精通', desc: '缠绕时间+1回合', effect: { type: 'bind_duration', value: 1 } },
        'Lv.5': { name: '缠绕剧毒', desc: '缠绕附带中毒', effect: { type: 'bind_poison', value: 0.05 } },
        'Lv.7': { name: '缠绕蔓延', desc: '群缠绕（3目标）', effect: { type: 'aoe_bind', count: 3 } },
        'Lv.10': { name: '树界降临', desc: '全体缠绕3回', effect: { type: 'aoe_bind', duration: 3 } }
      }
    },
    { id: 'earth_wall', name: '土墙', grade: '黄级', damage: 0, mpCost: 20, element: 'earth', cooldown: 5, desc: '金刚罩1回合（减伤50%/不可攻击）', source: '散修掉落',
      awakenEffects: {
        'Lv.3': { name: '土墙强化', desc: '减伤+60%', effect: { type: 'damage_reduction', value: 0.6 } },
        'Lv.5': { name: '土墙反震', desc: '受击反伤10%', effect: { type: 'counter_damage', value: 0.1 } },
        'Lv.7': { name: '土墙延长', desc: '金刚罩+1回合', effect: { type: 'buff_duration', value: 1 } },
        'Lv.10': { name: '大地壁垒', desc: '金刚罩2回+可攻击', effect: { type: 'super_shield', duration: 2 } }
      }
    },
    { id: 'wind_blade', name: '风刃', grade: '黄级', damage: 1.6, mpCost: 12, element: 'wind', cooldown: 1, desc: '风属性攻击，无法闪避', source: '散修掉落',
      awakenEffects: {
        'Lv.3': { name: '风刃精通', desc: '伤害+30%', effect: { type: 'damage_boost', value: 0.3 } },
        'Lv.5': { name: '风刃连击', desc: '20%概率连击', effect: { type: 'double_attack_chance', value: 0.2 } },
        'Lv.7': { name: '风刃穿透', desc: '无视15%防御', effect: { type: 'armor_penetration', value: 0.15 } },
        'Lv.10': { name: '风刃风暴', desc: '全体攻击+无法闪避', effect: { type: 'aoe_damage', value: 0.4 } }
      }
    },
    
    // 玄级招式
    { id: 'purple_thunder', name: '紫霄神雷', grade: '玄级', damage: 2.5, mpCost: 60, element: 'thunder', cooldown: 4, desc: '紫霄雷击，35%麻痹', source: '天南禁地深处',
      awakenEffects: {
        'Lv.3': { name: '紫霄精通', desc: '麻痹概率+40%', effect: { type: 'paralyze_chance', value: 0.4 } },
        'Lv.5': { name: '紫霄强化', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.7': { name: '紫霄雷域', desc: '全体麻痹1回合', effect: { type: 'aoe_paralyze', duration: 1 } },
        'Lv.10': { name: '紫霄天罚', desc: '全体麻痹3回合+伤害翻倍', effect: { type: 'aoe_paralyze', duration: 3, damage_multiplier: 2 } }
      }
    },
    { id: 'moon_slash', name: '月华斩', grade: '玄级', damage: 3.0, mpCost: 80, element: 'metal', cooldown: 3, desc: '月光凝聚一斩，附带标记', source: '掩月宗',
      awakenEffects: {
        'Lv.3': { name: '月华精通', desc: '月夜伤害+50%', effect: { type: 'damage_boost', time: 'moon_night', value: 0.5 } },
        'Lv.5': { name: '月华标记', desc: '标记后伤害+30%', effect: { type: 'marked_damage', value: 0.3 } },
        'Lv.7': { name: '月华斩裂', desc: '无视30%防御', effect: { type: 'armor_penetration', value: 0.3 } },
        'Lv.10': { name: '月华真斩', desc: '月夜伤害x3', effect: { type: 'damage_multiplier', time: 'moon_night', value: 3 } }
      }
    },
    { id: 'blazing_storm', name: '烈焰滔天', grade: '玄级', damage: 2.0, mpCost: 50, element: 'fire', cooldown: 5, desc: '群体灼烧3回合', source: '火系散修',
      awakenEffects: {
        'Lv.3': { name: '烈焰精通', desc: '灼烧伤害+50%', effect: { type: 'burn_damage', value: 0.5 } },
        'Lv.5': { name: '烈焰范围', desc: '群体灼烧+1回', effect: { type: 'burn_duration', value: 1 } },
        'Lv.7': { name: '烈焰叠加', desc: '灼烧可叠4层', effect: { type: 'burn_stack', value: 4 } },
        'Lv.10': { name: '焚天烈焰', desc: '全体灼烧5回', effect: { type: 'aoe_burn', duration: 5 } }
      }
    },
    { id: 'ice_seal', name: '冰封万里', grade: '玄级', damage: 1.8, mpCost: 55, element: 'water', cooldown: 5, desc: '群体冰冻1回合', source: '极寒之地',
      awakenEffects: {
        'Lv.3': { name: '冰封精通', desc: '冰冻概率+20%', effect: { type: 'freeze_chance', value: 0.2 } },
        'Lv.5': { name: '冰封延长', desc: '冰冻时间+1回', effect: { type: 'freeze_duration', value: 1 } },
        'Lv.7': { name: '冰封减速', desc: '冰冻后减速3回', effect: { type: 'freeze_slow', duration: 3 } },
        'Lv.10': { name: '绝对冰封', desc: '全体冰冻2回', effect: { type: 'aoe_freeze', duration: 2 } }
      }
    },
    { id: 'sword_cross', name: '剑气纵横', grade: '玄级', damage: 1.8, mpCost: 40, element: 'metal', cooldown: 3, desc: '1.8倍+破甲（防御-40%/3回）', source: '剑修掉落',
      awakenEffects: {
        'Lv.3': { name: '剑气精通', desc: '破甲效果+10%', effect: { type: 'armor_break_bonus', value: 0.1 } },
        'Lv.5': { name: '剑气穿透', desc: '无视20%防御', effect: { type: 'armor_penetration', value: 0.2 } },
        'Lv.7': { name: '剑气连斩', desc: '25%连击', effect: { type: 'double_attack_chance', value: 0.25 } },
        'Lv.10': { name: '剑气天冲', desc: '3倍+群体破甲', effect: { type: 'aoe_armor_break', damage: 3.0 } }
      }
    },
    { id: 'wood_heal', name: '枯木逢春', grade: '玄级', damage: 0, mpCost: 35, element: 'wood', cooldown: 6, desc: '恢复25%HP+驱散1个负面状态', source: '木系散修',
      awakenEffects: {
        'Lv.3': { name: '回春精通', desc: '恢复+35%HP', effect: { type: 'heal_bonus', value: 0.35 } },
        'Lv.5': { name: '回春净化', desc: '驱散+1个负面', effect: { type: 'cleanse_count', value: 1 } },
        'Lv.7': { name: '回春光环', desc: '持续恢复3回', effect: { type: 'heal_over_time', duration: 3 } },
        'Lv.10': { name: '生命之树', desc: '全体恢复30%HP', effect: { type: 'aoe_heal', heal: 0.3 } }
      }
    },
    { id: 'sand_trap', name: '流沙术', grade: '玄级', damage: 1.5, mpCost: 40, element: 'earth', cooldown: 3, desc: '缠绕2回+灵力-20%', source: '沙漠遗迹',
      awakenEffects: {
        'Lv.3': { name: '流沙精通', desc: '缠绕时间+1回', effect: { type: 'bind_duration', value: 1 } },
        'Lv.5': { name: '流沙噬灵', desc: '灵力-30%', effect: { type: 'mp_drain', value: 0.3 } },
        'Lv.7': { name: '流沙陷阱', desc: '群缠绕（3目标）', effect: { type: 'aoe_bind', count: 3 } },
        'Lv.10': { name: '沙暴葬', desc: '全体缠绕+灵力-40%', effect: { type: 'aoe_sand_trap', mp_drain: 0.4 } }
      }
    },
    { id: 'soul_curse', name: '蚀魂咒', grade: '玄级', damage: 1.3, mpCost: 45, element: 'yin', cooldown: 4, desc: '虚弱（攻-30%/3回）+噬灵（每回15%灵/2回）', source: '魔道散修',
      awakenEffects: {
        'Lv.3': { name: '蚀魂精通', desc: '虚弱效果+10%', effect: { type: 'weaken_bonus', value: 0.1 } },
        'Lv.5': { name: '蚀魂噬灵', desc: '噬灵时间+1回', effect: { type: 'mp_drain_duration', value: 1 } },
        'Lv.7': { name: '蚀魂扩散', desc: '群虚弱（3目标）', effect: { type: 'aoe_weaken', count: 3 } },
        'Lv.10': { name: '万魂噬体', desc: '全体虚弱+噬灵3回', effect: { type: 'aoe_weaken_drain', duration: 3 } }
      }
    },
    { id: 'rage_thunder', name: '狂雷天降', grade: '玄级', damage: 2.0, mpCost: 50, element: 'thunder', cooldown: 4, desc: '2倍+麻痹（30%概率/2回）', source: '雷暴区',
      awakenEffects: {
        'Lv.3': { name: '狂雷精通', desc: '麻痹概率+20%', effect: { type: 'paralyze_chance', value: 0.2 } },
        'Lv.5': { name: '狂雷强化', desc: '伤害+30%', effect: { type: 'damage_boost', value: 0.3 } },
        'Lv.7': { name: '狂雷链击', desc: '连锁3目标', effect: { type: 'chain_attack', count: 3 } },
        'Lv.10': { name: '万雷轰顶', desc: '全体3倍+麻痹2回', effect: { type: 'aoe_paralyze', damage: 3.0, duration: 2 } }
      }
    },
    
    // 地级招式
    { id: 'sword_qi', name: '万剑诀', grade: '地级', damage: 3.0, mpCost: 80, element: 'metal', cooldown: 3, desc: '剑气攻击，3倍伤害', source: '落云宗',
      awakenEffects: {
        'Lv.3': { name: '剑气精通', desc: '剑气伤害+40%', effect: { type: 'skill_damage', skillType: 'sword', value: 0.4 } },
        'Lv.5': { name: '万剑归宗', desc: '范围攻击（剑气）', effect: { type: 'aoe_damage', skillType: 'sword', value: 0.5 } },
        'Lv.7': { name: '剑气穿透', desc: '无视40%防御', effect: { type: 'armor_penetration', value: 0.4 } },
        'Lv.10': { name: '万剑归一', desc: '剑气伤害x5', effect: { type: 'skill_damage_multiplier', skillType: 'sword', value: 5 } }
      }
    },
    { id: 'blood_slash', name: '血煞斩', grade: '地级', damage: 5.0, mpCost: 0, element: 'blood', cooldown: 4, desc: '消耗15%HP，击杀回血', source: '天煞宗',
      awakenEffects: {
        'Lv.3': { name: '血煞精通', desc: '吸血+30%', effect: { type: 'lifesteal', value: 0.3 } },
        'Lv.5': { name: '血煞强化', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.7': { name: '血煞领域', desc: '全体吸血20%', effect: { type: 'aoe_lifesteal', value: 0.2 } },
        'Lv.10': { name: '血煞真身', desc: '伤害x3+全体吸血', effect: { type: 'damage_multiplier', value: 3, aoe_lifesteal: 0.5 } }
      }
    },
    { id: 'sky_fire', name: '天火燎原', grade: '地级', damage: 3.0, mpCost: 100, element: 'fire', cooldown: 6, desc: '群体3倍+灼烧3层', source: '火系大修',
      awakenEffects: {
        'Lv.3': { name: '天火精通', desc: '灼烧伤害+60%', effect: { type: 'burn_damage', value: 0.6 } },
        'Lv.5': { name: '天火叠层', desc: '灼烧可叠5层', effect: { type: 'burn_stack', value: 5 } },
        'Lv.7': { name: '天火蔓延', desc: '灼烧溅射相邻目标', effect: { type: 'burn_spread', value: true } },
        'Lv.10': { name: '天火灭世', desc: '全体5倍+灼烧5层', effect: { type: 'aoe_burn', damage: 5.0, burn_stack: 5 } }
      }
    },
    { id: 'ice_spike', name: '玄冰神刺', grade: '地级', damage: 2.5, mpCost: 90, element: 'water', cooldown: 5, desc: '2.5倍+冰冻+破甲', source: '极寒禁地',
      awakenEffects: {
        'Lv.3': { name: '玄冰精通', desc: '冰冻概率+25%', effect: { type: 'freeze_chance', value: 0.25 } },
        'Lv.5': { name: '玄冰穿透', desc: '无视25%防御', effect: { type: 'armor_penetration', value: 0.25 } },
        'Lv.7': { name: '玄冰碎裂', desc: '冰冻目标防御-50%', effect: { type: 'freeze_armor_break', value: 0.5 } },
        'Lv.10': { name: '永冻冰狱', desc: '全体冰冻2回+破甲', effect: { type: 'aoe_freeze_armor', duration: 2 } }
      }
    },
    { id: 'spring_heal', name: '回春术', grade: '地级', damage: 0, mpCost: 80, element: 'wood', cooldown: 8, desc: '恢复50%HP+驱散全部负面状态', source: '木系长老',
      awakenEffects: {
        'Lv.3': { name: '回春精通', desc: '恢复+65%HP', effect: { type: 'heal_bonus', value: 0.65 } },
        'Lv.5': { name: '回春防护', desc: '净化后免疫负面1回', effect: { type: 'cleanse_immune', duration: 1 } },
        'Lv.7': { name: '回春光环', desc: '持续恢复5回', effect: { type: 'heal_over_time', duration: 5, value: 0.05 } },
        'Lv.10': { name: '生命之泉', desc: '全体恢复50%HP+净化', effect: { type: 'aoe_cleanse_heal', heal: 0.5 } }
      }
    },
    { id: 'earth_shield', name: '大地之盾', grade: '地级', damage: 0, mpCost: 100, element: 'earth', cooldown: 10, desc: '减伤80%+反伤20%', source: '土系大修',
      awakenEffects: {
        'Lv.3': { name: '大地精通', desc: '减伤+85%', effect: { type: 'damage_reduction', value: 0.85 } },
        'Lv.5': { name: '大地反震', desc: '反伤+30%', effect: { type: 'counter_damage', value: 0.3 } },
        'Lv.7': { name: '大地庇护', desc: '护盾持续+1回', effect: { type: 'buff_duration', value: 1 } },
        'Lv.10': { name: '不灭大地', desc: '减伤90%+反伤50%+可攻击', effect: { type: 'super_shield', reduction: 0.9, counter: 0.5 } }
      }
    },
    { id: 'soul_grab', name: '摄魂', grade: '地级', damage: 1.5, mpCost: 85, element: 'yin', cooldown: 5, desc: '混乱2回+灵力-20%', source: '鬼道修士',
      awakenEffects: {
        'Lv.3': { name: '摄魂精通', desc: '混乱概率+20%', effect: { type: 'confuse_chance', value: 0.2 } },
        'Lv.5': { name: '摄魂噬灵', desc: '灵力-30%', effect: { type: 'mp_drain', value: 0.3 } },
        'Lv.7': { name: '摄魂扩散', desc: '群混乱2目标', effect: { type: 'aoe_confuse', count: 2 } },
        'Lv.10': { name: '万魂摄魄', desc: '全体混乱2回+灵-40%', effect: { type: 'aoe_confuse_drain', duration: 2, mp: 0.4 } }
      }
    },
    { id: 'thunder_prison', name: '雷狱', grade: '地级', damage: 3.0, mpCost: 120, element: 'thunder', cooldown: 6, desc: '3倍+麻痹+无法闪避', source: '雷劫区',
      awakenEffects: {
        'Lv.3': { name: '雷狱精通', desc: '麻痹概率+20%', effect: { type: 'paralyze_chance', value: 0.2 } },
        'Lv.5': { name: '雷狱强化', desc: '伤害+40%', effect: { type: 'damage_boost', value: 0.4 } },
        'Lv.7': { name: '雷狱禁锢', desc: '麻痹+缠绕', effect: { type: 'paralyze_bind', value: true } },
        'Lv.10': { name: '万雷天狱', desc: '全体4倍+麻痹+无法闪避', effect: { type: 'aoe_thunder_prison', damage: 4.0 } }
      }
    },
    { id: 'blood_sacrifice', name: '血祭', grade: '地级', damage: 0, mpCost: 0, element: 'none', cooldown: 6, desc: '消耗15%HP·攻击+60%/3回合', source: '魔道禁术',
      awakenEffects: {
        'Lv.3': { name: '血祭精通', desc: '攻击+70%', effect: { type: 'attack_boost', value: 0.7 } },
        'Lv.5': { name: '血祭代价', desc: 'HP消耗-5%', effect: { type: 'hp_cost_reduction', value: 0.05 } },
        'Lv.7': { name: '血祭狂暴', desc: '攻击+80%/4回', effect: { type: 'attack_boost', value: 0.8, duration: 4 } },
        'Lv.10': { name: '血之献祭', desc: '攻+100%/5回+吸血30%', effect: { type: 'blood_rage', attack: 1.0, lifesteal: 0.3, duration: 5 } }
      }
    },
    
    // 天级招式
    { id: 'star_rain', name: '星陨术', grade: '天级', damage: 6.0, mpCost: 180, element: 'none', cooldown: 8, desc: '召唤流星雨攻击全体', source: '星宫',
      awakenEffects: {
        'Lv.3': { name: '星陨精通', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.5': { name: '星陨强化', desc: '全体伤害+30%', effect: { type: 'aoe_damage', value: 0.3 } },
        'Lv.7': { name: '星陨天罚', desc: '无视防御', effect: { type: 'armor_penetration', value: 1.0 } },
        'Lv.10': { name: '星辰陨落', desc: '伤害x3+全体眩晕', effect: { type: 'damage_multiplier', value: 3, aoe_stun: 2 } }
      }
    },
    { id: 'magic_explode', name: '天魔解体大法', grade: '天级', damage: 8.0, mpCost: 0, element: 'none', cooldown: 30, desc: '消耗30%HP+30%灵，极高伤害', source: '天魔宗',
      awakenEffects: {
        'Lv.3': { name: '天魔精通', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.5': { name: '天魔强化', desc: '消耗HP-50%', effect: { type: 'hp_cost_reduction', value: 0.5 } },
        'Lv.7': { name: '天魔真身', desc: '伤害x2+全体攻击', effect: { type: 'damage_multiplier', value: 2, aoe: true } },
        'Lv.10': { name: '天魔解体', desc: '伤害x5+无敌1回合', effect: { type: 'damage_multiplier', value: 5, invincible: 1 } }
      }
    },
    { id: 'burn_sky', name: '焚天', grade: '天级', damage: 5.0, mpCost: 200, element: 'fire', cooldown: 8, desc: '5倍+灼烧3层', source: '火系宗师',
      awakenEffects: {
        'Lv.3': { name: '焚天精通', desc: '灼烧伤害+80%', effect: { type: 'burn_damage', value: 0.8 } },
        'Lv.5': { name: '焚天叠加', desc: '灼烧可叠6层', effect: { type: 'burn_stack', value: 6 } },
        'Lv.7': { name: '焚天扩散', desc: '灼烧溅射全体', effect: { type: 'burn_aoe', value: true } },
        'Lv.10': { name: '太阳真火', desc: '8倍+灼烧6层+无法净化', effect: { type: 'ultimate_burn', damage: 8.0, burn: 6, uncleansable: true } }
      }
    },
    { id: 'absolute_zero', name: '绝对零度', grade: '天级', damage: 3.0, mpCost: 180, element: 'water', cooldown: 8, desc: '3倍+冰冻3回+灵力涌动（灵力恢复x2/3回）', source: '极寒深渊',
      awakenEffects: {
        'Lv.3': { name: '零度精通', desc: '冰冻概率+30%', effect: { type: 'freeze_chance', value: 0.3 } },
        'Lv.5': { name: '零度涌动', desc: '灵力恢复x3', effect: { type: 'mp_regen_multiplier', value: 3 } },
        'Lv.7': { name: '零度领域', desc: '全体减速30%', effect: { type: 'aoe_slow', value: 0.3 } },
        'Lv.10': { name: '永冻纪元', desc: '全体冰冻3回+灵力涌动', effect: { type: 'aoe_absolute_zero', duration: 3 } }
      }
    },
    { id: 'dageng_sword', name: '大庚剑阵', grade: '天级', damage: 5.0, mpCost: 250, element: 'metal', cooldown: 10, desc: '5倍单体+剑气附体（攻+25%/5回·可叠2层）', source: '青元剑诀衍生',
      awakenEffects: {
        'Lv.3': { name: '剑阵精通', desc: '剑气附体+30%', effect: { type: 'sword_buff_bonus', value: 0.3 } },
        'Lv.5': { name: '剑阵强化', desc: '可叠3层', effect: { type: 'sword_buff_stack', value: 3 } },
        'Lv.7': { name: '剑阵扩散', desc: '范围伤害', effect: { type: 'aoe_sword', value: 0.5 } },
        'Lv.10': { name: '七十二剑阵', desc: '8倍群攻+剑气附体满层', effect: { type: 'ultimate_sword_array', damage: 8.0 } }
      }
    },
    { id: 'life_gift', name: '生命礼赞', grade: '天级', damage: 0, mpCost: 300, element: 'wood', cooldown: 15, desc: '全恢复+涅槃（濒死恢复50%HP/1次）', source: '生命禁地',
      awakenEffects: {
        'Lv.3': { name: '生命精通', desc: '恢复+20%HP', effect: { type: 'heal_bonus', value: 0.2 } },
        'Lv.5': { name: '涅槃强化', desc: '涅槃恢复70%HP', effect: { type: 'nirvana_heal', value: 0.7 } },
        'Lv.7': { name: '涅槃次数', desc: '涅槃+1次', effect: { type: 'nirvana_count', value: 1 } },
        'Lv.10': { name: '不死之身', desc: '涅槃3次+全恢复', effect: { type: 'immortal_body', nirvana: 3, heal: 1.0 } }
      }
    },
    { id: 'immovable', name: '不动明王', grade: '天级', damage: 0, mpCost: 200, element: 'earth', cooldown: 12, desc: '金刚罩3回+反伤40%', source: '佛门遗迹',
      awakenEffects: {
        'Lv.3': { name: '明王精通', desc: '减伤+85%', effect: { type: 'damage_reduction', value: 0.85 } },
        'Lv.5': { name: '明王反震', desc: '反伤+50%', effect: { type: 'counter_damage', value: 0.5 } },
        'Lv.7': { name: '明王威压', desc: '敌方全体减攻20%', effect: { type: 'aoe_enemy_debuff', value: -0.2 } },
        'Lv.10': { name: '不动真身', desc: '4回无敌+反伤60%', effect: { type: 'invincible', duration: 4, counter: 0.6 } }
      }
    },
    { id: 'god_thunder', name: '神雷天罚', grade: '天级', damage: 4.0, mpCost: 220, element: 'thunder', cooldown: 8, desc: '4倍群+麻痹+标记（受伤+25%/5回）', source: '天劫感悟',
      awakenEffects: {
        'Lv.3': { name: '天罚精通', desc: '麻痹概率+25%', effect: { type: 'paralyze_chance', value: 0.25 } },
        'Lv.5': { name: '天罚标记', desc: '标记伤害+30%', effect: { type: 'mark_damage', value: 0.3 } },
        'Lv.7': { name: '天罚连击', desc: '30%追加一次', effect: { type: 'double_attack_chance', value: 0.3 } },
        'Lv.10': { name: '天道审判', desc: '6倍群+麻痹+标记+沉默', effect: { type: 'god_judgment', damage: 6.0 } }
      }
    },
    { id: 'sense_storm', name: '神识风暴', grade: '天级', damage: 2.5, mpCost: 0, element: 'sense', cooldown: 10, desc: '无视防御2.5倍+混乱+沉默（无法用技能/2回）', source: '神识修炼',
      awakenEffects: {
        'Lv.3': { name: '神识精通', desc: '混乱概率+20%', effect: { type: 'confuse_chance', value: 0.2 } },
        'Lv.5': { name: '神识穿透', desc: '无视防御+20%', effect: { type: 'armor_penetration', value: 0.2 } },
        'Lv.7': { name: '神识震慑', desc: '沉默时间+1回', effect: { type: 'silence_duration', value: 1 } },
        'Lv.10': { name: '万神寂灭', desc: '4倍+全体混乱+沉默3回', effect: { type: 'ultimate_sense_storm', damage: 4.0, silence: 3 } }
      }
    },
    { id: 'law_heaven', name: '法天象地', grade: '天级', damage: 0, mpCost: 350, element: 'none', cooldown: 20, desc: '攻防x3/3回/虚弱3回', source: '远古传承',
      awakenEffects: {
        'Lv.3': { name: '象地精通', desc: '攻防x3.5', effect: { type: 'stat_multiplier', value: 3.5 } },
        'Lv.5': { name: '象地持续', desc: '持续+1回', effect: { type: 'buff_duration', value: 1 } },
        'Lv.7': { name: '象地减负', desc: '虚弱减为2回', effect: { type: 'debuff_reduction', value: 1 } },
        'Lv.10': { name: '法天象地·真', desc: '攻防x5/5回/无副作用', effect: { type: 'ultimate_law_heaven', multiplier: 5.0, duration: 5 } }
      }
    },
    
    // 灵界招式
    { id: 'tianYuan_sword', name: '天渊剑诀', grade: '地级', damage: 4.5, mpCost: 120, element: 'metal', cooldown: 5, desc: '对异族+30%伤害', source: '天渊城',
      awakenEffects: {
        'Lv.3': { name: '天渊精通', desc: '对异族伤害+50%', effect: { type: 'damage_vs_race', race: 'alien', value: 0.5 } },
        'Lv.5': { name: '天渊强化', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.7': { name: '天渊剑域', desc: '范围伤害+破甲', effect: { type: 'aoe_armor_pen', damage: 0.4, armor: 0.3 } },
        'Lv.10': { name: '天渊真剑', desc: '伤害x3+对异族x5', effect: { type: 'damage_multiplier', value: 3, race_multiplier: 5 } }
      }
    },
    
    // 仙界招式
    { id: 'chaos_blade', name: '混沌斩', grade: '仙级', damage: 12.0, mpCost: 500, element: 'chaos', cooldown: 8, desc: '混沌属性攻击，无视30%防御', source: '源初秘境',
      awakenEffects: {
        'Lv.3': { name: '混沌精通', desc: '混沌伤害+50%', effect: { type: 'element_damage', element: 'chaos', value: 0.5 } },
        'Lv.5': { name: '混沌强化', desc: '无视防御+40%', effect: { type: 'armor_penetration', value: 0.4 } },
        'Lv.7': { name: '混沌领域', desc: '全体减防30%', effect: { type: 'aoe_debuff', stat: 'defense', value: -0.3 } },
        'Lv.10': { name: '混沌真斩', desc: '伤害x3+无视防御', effect: { type: 'damage_multiplier', value: 3, armor_penetration: 1.0 } }
      }
    },
    
    // 神级招式
    { id: 'lunhui_strike', name: '轮回击', grade: '神级', damage: 20.0, mpCost: 1000, element: 'lunhui', cooldown: 15, desc: '轮回法则攻击，30%即死', source: '轮回殿',
      awakenEffects: {
        'Lv.3': { name: '轮回精通', desc: '即死概率+40%', effect: { type: 'instant_kill_chance', value: 0.4 } },
        'Lv.5': { name: '轮回强化', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.7': { name: '轮回领域', desc: '全体减速+虚弱', effect: { type: 'aoe_debuff', debuff: ['slow', 'weaken'], duration: 3 } },
        'Lv.10': { name: '轮回真击', desc: '即死概率100%+伤害x3', effect: { type: 'instant_kill_chance', value: 1.0, damage_multiplier: 3 } }
      }
    },
    
    // 远古古法
    { id: 'ancient_chaos', name: '混沌开天诀', grade: '远古', damage: 15.0, mpCost: 1000, element: 'chaos', cooldown: 20, desc: '开天辟地之力，无视50%防御', source: '混沌外域·古神遗迹',
      awakenEffects: {
        'Lv.3': { name: '开天精通', desc: '伤害+50%', effect: { type: 'damage_boost', value: 0.5 } },
        'Lv.5': { name: '开天强化', desc: '无视防御+60%', effect: { type: 'armor_penetration', value: 0.6 } },
        'Lv.7': { name: '开天辟地', desc: '全体攻击+无视防御', effect: { type: 'aoe_armor_pen', damage: 0.5, armor: 0.5 } },
        'Lv.10': { name: '混沌真身', desc: '伤害x5+无敌3回合', effect: { type: 'damage_multiplier', value: 5, invincible: 3 } }
      }
    }
  ]
};

// 功法品阶价值
export const GRADE_VALUE = {
  '黄级': 35, '玄级': 70, '地级': 140, '天级': 250,
  '灵级': 500, '仙级': 1000, '神级': 2000
};

// 功法品阶颜色
export const GRADE_COLOR = {
  '黄级': '#ffd700', '玄级': '#4fc3f7', '地级': '#9b59b6',
  '天级': '#e74c3c', '灵级': '#2ecc71', '仙级': '#f39c12', '神级': '#ff6b6b'
};
