// 物品数据 - 完整版
export const ITEMS = {
  // 丹药 - 66种
  pills: [
    // 凡人~练气期（12种）
    { id: 'peiyuan', name: '培元丹', desc: '修为+20', effect: { type: 'exp', value: 20 }, materials: [{ id: 'herb', count: 2 }], cost: 15, grade: '凡级' },
    { id: 'juqi', name: '聚气散', desc: '修为+50', effect: { type: 'exp', value: 50 }, materials: [{ id: 'herb', count: 3 }, { id: 'beast_core', count: 1 }], cost: 45, grade: '凡级' },
    { id: 'heal_pill', name: '金创药', desc: '恢复30%HP', effect: { type: 'heal', value: 0.3 }, materials: [{ id: 'herb', count: 1 }], cost: 8, grade: '凡级' },
    { id: 'stop_bleed', name: '止血散', desc: '恢复25%HP(战斗可用)', effect: { type: 'heal', value: 0.25 }, materials: [{ id: 'herb', count: 1 }], cost: 6, grade: '凡级' },
    { id: 'mp_pill', name: '回灵丹', desc: '恢复40%灵力', effect: { type: 'mp', value: 0.4 }, materials: [{ id: 'herb', count: 2 }, { id: 'cold_jade', count: 1 }], cost: 30, grade: '凡级' },
    { id: 'qingxin_pill', name: '清心丸', desc: '解除中毒/混乱', effect: { type: 'cure', value: 1 }, materials: [{ id: 'herb', count: 1 }], cost: 8, grade: '凡级' },
    { id: 'bigu', name: '辟谷丹', desc: '30天不进食', effect: { type: 'buff', value: 30 }, materials: [{ id: 'herb', count: 1 }], cost: 10, grade: '凡级' },
    { id: 'light_body', name: '轻身丹', desc: '赶路+20%/15天', effect: { type: 'speed', value: 0.2, duration: 15 }, materials: [{ id: 'herb', count: 2 }, { id: 'wind_grass', count: 1 }], cost: 25, grade: '凡级' },
    { id: 'detox', name: '解毒散', desc: '解除普通毒素', effect: { type: 'detox', value: 1 }, materials: [{ id: 'herb', count: 1 }, { id: 'detox_grass', count: 1 }], cost: 12, grade: '凡级' },
    { id: 'bone_pill', name: '壮骨丸', desc: '炼体值+10', effect: { type: 'body', value: 10 }, materials: [{ id: 'herb', count: 2 }, { id: 'beast_bone', count: 1 }], cost: 22, grade: '凡级' },
    { id: 'eye_pill', name: '明目丹', desc: '探查成功率+5%/7天', effect: { type: 'sense', value: 0.05, duration: 7 }, materials: [{ id: 'herb', count: 1 }, { id: 'clear_flower', count: 1 }], cost: 18, grade: '凡级' },
    { id: 'yangqi', name: '养气丸', desc: '灵力上限永久+5(限5次)', effect: { type: 'max_mp', value: 5, limit: 5 }, materials: [{ id: 'herb', count: 3 }], cost: 25, grade: '凡级' },
    
    // 筑基期（12种）
    { id: 'zhuji', name: '筑基丹', desc: '突破筑基+15%', effect: { type: 'breakthrough', realm: 2, bonus: 15 }, materials: [{ id: 'herb', count: 5 }, { id: 'purple_fungus', count: 2 }, { id: 'beast_core', count: 3 }], cost: 200, grade: '灵级' },
    { id: 'ningshen', name: '凝神丹', desc: '神识上限+10', effect: { type: 'sense', value: 10 }, materials: [{ id: 'herb', count: 3 }, { id: 'purple_fungus', count: 1 }], cost: 80, grade: '灵级' },
    { id: 'shenggu', name: '生骨丹', desc: '恢复60%HP+断肢重生', effect: { type: 'heal', value: 0.6 }, materials: [{ id: 'herb', count: 4 }, { id: 'beast_bone', count: 2 }], cost: 70, grade: '灵级' },
    { id: 'fuling', name: '复灵膏', desc: '恢复60%灵力', effect: { type: 'mp', value: 0.6 }, materials: [{ id: 'herb', count: 3 }, { id: 'beast_core', count: 2 }], cost: 55, grade: '灵级' },
    { id: 'lianti', name: '炼体散', desc: '炼体值+50', effect: { type: 'body', value: 50 }, materials: [{ id: 'herb', count: 3 }, { id: 'beast_core', count: 3 }, { id: 'iron', count: 1 }], cost: 90, grade: '灵级' },
    { id: 'yinxi', name: '隐息丹', desc: '隐藏气息30天/安全+20%', effect: { type: 'hide', value: 30 }, materials: [{ id: 'herb', count: 2 }, { id: 'shadow_flower', count: 1 }], cost: 40, grade: '灵级' },
    { id: 'mihun', name: '迷魂丹', desc: '战斗使敌方混乱2回合', effect: { type: 'combat', value: 'confuse', duration: 2 }, materials: [{ id: 'poison_grass', count: 2 }, { id: 'mushroom', count: 1 }], cost: 50, grade: '灵级' },
    { id: 'pozhang', name: '破瘴丹', desc: '免疫瘴气/毒雾30天', effect: { type: 'immune', value: 30 }, materials: [{ id: 'herb', count: 2 }, { id: 'yang_flower', count: 1 }], cost: 35, grade: '灵级' },
    { id: 'xuli', name: '蓄力丹', desc: '战斗中攻击+20%/3回合', effect: { type: 'combat', value: 'atk', bonus: 0.2, duration: 3 }, materials: [{ id: 'herb', count: 3 }, { id: 'beast_core', count: 2 }], cost: 55, grade: '灵级' },
    { id: 'tiegu', name: '铁骨丸', desc: '炼体值+80(限铁骨下)', effect: { type: 'body', value: 80 }, materials: [{ id: 'herb', count: 4 }, { id: 'iron', count: 2 }, { id: 'beast_bone', count: 3 }], cost: 120, grade: '灵级' },
    { id: 'dingfeng', name: '定风丹', desc: '免疫吹飞/击退3场战斗', effect: { type: 'immune', value: 3 }, materials: [{ id: 'herb', count: 2 }, { id: 'wind_flower', count: 1 }], cost: 30, grade: '灵级' },
    { id: 'huichun', name: '回春丹', desc: '恢复35%HP', effect: { type: 'heal', value: 0.35 }, materials: [{ id: 'herb', count: 3 }, { id: 'cold_jade', count: 2 }, { id: 'beast_core', count: 2 }], cost: 100, grade: '灵级' },
    { id: 'tongmai', name: '通脉丹', desc: '灵力上限永久+20(限3次)', effect: { type: 'max_mp', value: 20, limit: 3 }, materials: [{ id: 'herb', count: 5 }, { id: 'spring_water', count: 1 }], cost: 60, grade: '灵级' },
    
    // 金丹期（10种）
    { id: 'ningbi', name: '凝碧丹', desc: '修为+500', effect: { type: 'exp', value: 500 }, materials: [{ id: 'purple_fungus', count: 3 }, { id: 'cold_jade', count: 2 }, { id: 'beast_core', count: 5 }], cost: 350, grade: '地级' },
    { id: 'dan_gold', name: '结金丹', desc: '结丹+20%', effect: { type: 'breakthrough', realm: 3, bonus: 20 }, materials: [{ id: 'purple_fungus', count: 5 }, { id: 'beast_core', count: 8 }, { id: 'demon_core', count: 1 }], cost: 800, grade: '地级' },
    { id: 'zengyuan', name: '增元丹', desc: '修为+300+灵力上限+30', effect: { type: 'exp_mp', exp: 300, mp: 30 }, materials: [{ id: 'purple_fungus', count: 4 }, { id: 'demon_core', count: 1 }, { id: 'jade', count: 1 }], cost: 550, grade: '地级' },
    { id: 'humai', name: '护脉丹', desc: '下次突破失败不扣修为', effect: { type: 'protect', value: 1 }, materials: [{ id: 'herb', count: 5 }, { id: 'soft_jade', count: 1 }], cost: 200, grade: '地级' },
    { id: 'pozhang_gold', name: '破障丹(金丹)', desc: '金丹期破小瓶颈+30%', effect: { type: 'breakthrough', realm: 3, bonus: 30 }, materials: [{ id: 'purple_fungus', count: 3 }, { id: 'thunder_wood', count: 1 }, { id: 'demon_core', count: 2 }], cost: 600, grade: '地级' },
    { id: 'jushen', name: '聚神丹', desc: '神识+20上限', effect: { type: 'sense', value: 20 }, materials: [{ id: 'purple_fungus', count: 2 }, { id: 'soul_wood', count: 1 }], cost: 250, grade: '地级' },
    { id: 'jiaoxue', name: '蛟血丹', desc: '炼体值+300+气血上限+50', effect: { type: 'body_hp', body: 300, hp: 50 }, materials: [{ id: 'demon_core', count: 2 }, { id: 'dragon_blood', count: 1 }], cost: 750, grade: '地级' },
    { id: 'tengyun', name: '腾云丹', desc: '飞行速度+50%/30天', effect: { type: 'speed', value: 0.5, duration: 30 }, materials: [{ id: 'herb', count: 5 }, { id: 'crane_feather', count: 3 }], cost: 200, grade: '地级' },
    { id: 'pojia', name: '破甲丹', desc: '战斗中破甲3回合', effect: { type: 'combat', value: 'armor_break', duration: 3 }, materials: [{ id: 'poison_grass', count: 3 }, { id: 'thorn_fruit', count: 2 }], cost: 150, grade: '地级' },
    { id: 'dahuan', name: '大还丹', desc: '恢复40%HP', effect: { type: 'heal', value: 0.4 }, materials: [{ id: 'purple_fungus', count: 3 }, { id: 'demon_core', count: 2 }, { id: 'jade', count: 1 }], cost: 350, grade: '地级' },
    { id: 'huxin', name: '护心丹', desc: '濒死自动恢复30%(1次)', effect: { type: 'auto_heal', value: 0.3 }, materials: [{ id: 'herb', count: 5 }, { id: 'ancient_fungus', count: 1 }], cost: 500, grade: '地级' },
    
    // 元婴期（8种）
    { id: 'huaying', name: '化婴丹', desc: '化婴+20%', effect: { type: 'breakthrough', realm: 4, bonus: 20 }, materials: [{ id: 'purple_fungus', count: 10 }, { id: 'demon_core', count: 3 }, { id: 'ancient_milk', count: 1 }], cost: 3500, grade: '天级' },
    { id: 'lianshen', name: '炼神丹', desc: '神识+50上限', effect: { type: 'sense', value: 50 }, materials: [{ id: 'demon_core', count: 2 }, { id: 'ancient_milk', count: 2 }, { id: 'soul_wood', count: 1 }], cost: 2000, grade: '天级' },
    { id: 'tianyuan', name: '天元丹', desc: '修为+2000', effect: { type: 'exp', value: 2000 }, materials: [{ id: 'purple_fungus', count: 8 }, { id: 'demon_core', count: 5 }, { id: 'earth_marrow', count: 1 }], cost: 2500, grade: '天级' },
    { id: 'taiqing', name: '太清丹', desc: '灵力上限永久+100', effect: { type: 'max_mp', value: 100, limit: 1 }, materials: [{ id: 'ancient_milk', count: 3 }, { id: 'demon_core', count: 3 }, { id: 'jade', count: 3 }], cost: 4000, grade: '天级' },
    { id: 'jingang', name: '金刚丹', desc: '炼体值+800+防御+10%永久', effect: { type: 'body_def', body: 800, def: 0.1 }, materials: [{ id: 'demon_core', count: 3 }, { id: 'diamond', count: 1 }, { id: 'dragon_scale', count: 1 }], cost: 5000, grade: '天级' },
    { id: 'pojie_yuanying', name: '破界丹(元婴)', desc: '战斗中无视防御1回合', effect: { type: 'combat', value: 'ignore_def', duration: 1 }, materials: [{ id: 'demon_core', count: 4 }, { id: 'void_stone', count: 1 }], cost: 3500, grade: '天级' },
    { id: 'qudu_yuanying', name: '祛毒丹(元婴)', desc: '解除一切毒素+丹毒-50', effect: { type: 'detox', value: 50 }, materials: [{ id: 'ancient_fungus', count: 2 }, { id: 'detox_grass', count: 5 }, { id: 'spring_water', count: 5 }], cost: 1500, grade: '天级' },
    { id: 'liehun', name: '裂魂丹', desc: '神识攻击+50%/3回合(战后虚弱7天)', effect: { type: 'combat', value: 'sense_atk', bonus: 0.5, duration: 3 }, materials: [{ id: 'soul_wood', count: 3 }, { id: 'demon_core', count: 5 }, { id: 'nine_grass', count: 1 }], cost: 5000, grade: '天级' },
    { id: 'xuming', name: '续命丹', desc: '恢复45%HP', effect: { type: 'heal', value: 0.45 }, materials: [{ id: 'ancient_fungus', count: 2 }, { id: 'demon_core', count: 3 }, { id: 'void_stone', count: 1 }], cost: 900, grade: '天级' },
    
    // 化神期（6种）
    { id: 'huashen', name: '化神丹', desc: '化神+25%', effect: { type: 'breakthrough', realm: 5, bonus: 25 }, materials: [{ id: 'demon_core', count: 5 }, { id: 'ancient_milk', count: 5 }, { id: 'qilin_horn', count: 1 }], cost: 15000, grade: '仙级' },
    { id: 'hunyuan', name: '混元丹', desc: '修为+8000', effect: { type: 'exp', value: 8000 }, materials: [{ id: 'demon_core', count: 5 }, { id: 'ancient_milk', count: 3 }, { id: 'five_element', count: 5 }], cost: 9000, grade: '仙级' },
    { id: 'tianhun', name: '天魂丹', desc: '神识+150上限', effect: { type: 'sense', value: 150 }, materials: [{ id: 'ancient_milk', count: 5 }, { id: 'soul_wood_branch', count: 1 }, { id: 'soul_crystal', count: 1 }], cost: 10000, grade: '仙级' },
    { id: 'jiuzhuan', name: '九转丹(1转)', desc: '修为+2万(每转递增)', effect: { type: 'exp', value: 20000 }, materials: [{ id: 'hunyuan', count: 1 }, { id: 'demon_core', count: 10 }, { id: 'dragon_blood', count: 1 }], cost: 15000, grade: '仙级' },
    { id: 'pozhang_huashen', name: '破障丹(化神)', desc: '化神期破小瓶颈+40%', effect: { type: 'breakthrough', realm: 5, bonus: 40 }, materials: [{ id: 'qilin_horn', count: 1 }, { id: 'phoenix_feather', count: 1 }, { id: 'ancient_milk', count: 10 }], cost: 25000, grade: '仙级' },
    { id: 'niepan', name: '涅槃丹', desc: '濒死恢复100%/冷却60天', effect: { type: 'auto_heal', value: 1.0, cooldown: 60 }, materials: [{ id: 'phoenix_blood', count: 1 }, { id: 'qilin_horn', count: 1 }, { id: 'ancient_milk', count: 10 }], cost: 35000, grade: '仙级' },
    { id: 'tianling', name: '天灵丹', desc: '恢复50%HP', effect: { type: 'heal', value: 0.5 }, materials: [{ id: 'ancient_fungus', count: 3 }, { id: 'demon_core', count: 5 }, { id: 'ancient_milk', count: 2 }], cost: 2000, grade: '仙级' },
    
    // 灵界篇（10种）
    { id: 'xuling', name: '虚灵丹', desc: '突破炼虚+20%', effect: { type: 'breakthrough', realm: 6, bonus: 20 }, materials: [{ id: 'spirit_herb', count: 10 }, { id: 'demon_core', count: 10 }, { id: 'void_crystal', count: 1 }], cost: 5000, grade: '灵界' },
    { id: 'hehe', name: '合和丹', desc: '突破合体+20%', effect: { type: 'breakthrough', realm: 7, bonus: 20 }, materials: [{ id: 'spirit_herb', count: 20 }, { id: 'demon_core', count: 20 }, { id: 'dragon_blood', count: 1 }], cost: 30000, grade: '灵界' },
    { id: 'due', name: '渡厄丹', desc: '突破大乘+20%', effect: { type: 'breakthrough', realm: 8, bonus: 20 }, materials: [{ id: 'spirit_herb', count: 30 }, { id: 'demon_core', count: 30 }, { id: 'dragon_scale', count: 1 }], cost: 60000, grade: '灵界' },
    { id: 'dujie_sheng', name: '渡劫圣丹', desc: '渡劫+15%', effect: { type: 'breakthrough', realm: 9, bonus: 15 }, materials: [{ id: 'spirit_herb', count: 50 }, { id: 'demon_core', count: 50 }, { id: 'true_blood', count: 1 }], cost: 150000, grade: '灵界' },
    { id: 'ancient_milk_pill', name: '万年灵乳(炼)', desc: '瞬间满灵力', effect: { type: 'mp', value: 1.0 }, materials: [{ id: 'ancient_milk', count: 3 }, { id: 'spring_water', count: 10 }], cost: 10000, grade: '灵界' },
    { id: 'yanghun_spirit', name: '养魂丹(灵界)', desc: '神识+200上限', effect: { type: 'sense', value: 200 }, materials: [{ id: 'soul_wood_branch', count: 3 }, { id: 'soul_crystal', count: 5 }, { id: 'spirit_crystal', count: 20 }], cost: 60000, grade: '灵界' },
    { id: 'taiyi', name: '太一丹(灵界)', desc: '修为+10万', effect: { type: 'exp', value: 100000 }, materials: [{ id: 'spirit_herb', count: 30 }, { id: 'demon_core', count: 20 }, { id: 'spirit_crystal', count: 30 }], cost: 75000, grade: '灵界' },
    { id: 'jiuzhuan_spirit', name: '九转金丹(灵界)', desc: '全属性+30%/30天', effect: { type: 'buff', value: 0.3, duration: 30 }, materials: [{ id: 'demon_core', count: 50 }, { id: 'true_blood', count: 3 }, { id: 'spirit_crystal', count: 100 }], cost: 300000, grade: '灵界' },
    { id: 'pojie_spirit', name: '破界丹(灵界)', desc: '跨界传送安全+50%', effect: { type: 'teleport', value: 0.5 }, materials: [{ id: 'void_crystal', count: 10 }, { id: 'space_crystal', count: 5 }, { id: 'spirit_crystal', count: 50 }], cost: 130000, grade: '灵界' },
    { id: 'feisheng_spirit', name: '飞升丹(灵界)', desc: '飞升仙界+15%', effect: { type: 'ascend', value: 15 }, materials: [{ id: 'true_blood', count: 5 }, { id: 'chaos_stone', count: 1 }, { id: 'spirit_crystal', count: 200 }], cost: 500000, grade: '灵界' },
    
    // 仙界篇（8种）
    { id: 'feixian', name: '飞仙丹(仙界)', desc: '飞升仙界+20%', effect: { type: 'ascend', value: 20 }, materials: [{ id: 'immortal_herb', count: 10 }, { id: 'immortal_blood', count: 5 }, { id: 'immortal_stone', count: 100 }], cost: 400, grade: '仙界' },
    { id: 'hongmeng_pill', name: '鸿蒙丹', desc: '修为+1亿', effect: { type: 'exp', value: 100000000 }, materials: [{ id: 'immortal_herb', count: 50 }, { id: 'immortal_core', count: 20 }, { id: 'immortal_stone', count: 500 }], cost: 1500, grade: '仙界' },
    { id: 'wudao', name: '悟道丹', desc: '法则感悟进度+10%', effect: { type: 'law', value: 0.1 }, materials: [{ id: 'immortal_herb', count: 30 }, { id: 'origin_crystal', count: 3 }, { id: 'immortal_stone', count: 1000 }], cost: 3000, grade: '仙界' },
    { id: 'jiuzhuan_immortal', name: '九转金丹(仙界)', desc: '全属性+50%/365天', effect: { type: 'buff', value: 0.5, duration: 365 }, materials: [{ id: 'immortal_core', count: 50 }, { id: 'origin_crystal', count: 5 }, { id: 'immortal_stone', count: 5000 }], cost: 15000, grade: '仙界' },
    { id: 'hundun_pill', name: '混沌丹', desc: '仙界突破+20%', effect: { type: 'breakthrough', realm: 12, bonus: 20 }, materials: [{ id: 'chaos_gas', count: 10 }, { id: 'origin_crystal', count: 10 }, { id: 'immortal_stone', count: 10000 }], cost: 50000, grade: '仙界' },
    { id: 'lunhui_pill', name: '轮回丹', desc: '濒死满状态复活(1次)', effect: { type: 'revive', value: 1.0 }, materials: [{ id: 'lunhui_stone', count: 3 }, { id: 'chaos_stone', count: 1 }, { id: 'immortal_stone', count: 50000 }], cost: 150000, grade: '仙界' },
    { id: 'pozhang_immortal', name: '破障丹(仙界)', desc: '解除一切负面+免疫3回合', effect: { type: 'purify', value: 3 }, materials: [{ id: 'immortal_herb', count: 50 }, { id: 'law_fragment', count: 3 }, { id: 'immortal_stone', count: 20000 }], cost: 60000, grade: '仙界' },
    { id: 'daozu_pill', name: '道祖丹', desc: '突破道祖必要条件之一', effect: { type: 'breakthrough', realm: 14, bonus: 50 }, materials: [{ id: 'chaos_fragment', count: 3 }, { id: 'origin_law', count: 5 }, { id: 'immortal_stone', count: 1000000 }], cost: 999999, grade: '仙界' },
    // 凝神丹（用于神识修炼·凝神修炼）
    { id: 'focus_pill', name: '凝神丹', desc: '用于凝神修炼，神识+20', effect: { type: 'sense', value: 20 }, materials: [{ id: 'herb', count: 5 }, { id: 'purple_fungus', count: 3 }, { id: 'soul_wood', count: 1 }], cost: 500, grade: '灵级' },
    // 洗灵丹（重新随机灵根五行数值）
    { id: 'wash_root_pill', name: '洗灵丹', desc: '重新随机灵根五行数值', effect: { type: 'wash_root', value: 1 }, materials: [{ id: 'five_element', count: 5 }, { id: 'spirit_crystal', count: 10 }, { id: 'ancient_milk', count: 2 }], cost: 50000, grade: '灵界' },

    // 感悟丹（用于功法升级）
    { id: 'insight_yellow', name: '黄级感悟丹', desc: '功法经验+100，适用于黄级功法', effect: { type: 'skill_exp', value: 100 }, materials: [{ id: 'herb', count: 5 }], cost: 50, grade: '凡级' },
    { id: 'insight_xuan', name: '玄级感悟丹', desc: '功法经验+300，适用于玄级以下', effect: { type: 'skill_exp', value: 300 }, materials: [{ id: 'herb', count: 10 }, { id: 'purple_fungus', count: 3 }], cost: 200, grade: '灵级' },
    { id: 'insight_di', name: '地级感悟丹', desc: '功法经验+800，适用于地级以下', effect: { type: 'skill_exp', value: 800 }, materials: [{ id: 'purple_fungus', count: 5 }, { id: 'beast_core', count: 2 }], cost: 800, grade: '地级' },
    { id: 'insight_tian', name: '天级感悟丹', desc: '功法经验+2000，适用于天级以下', effect: { type: 'skill_exp', value: 2000 }, materials: [{ id: 'beast_core', count: 5 }, { id: 'ancient_milk', count: 1 }], cost: 3000, grade: '天级' },
    { id: 'insight_ling', name: '灵级感悟丹', desc: '功法经验+5000，适用于灵级以下', effect: { type: 'skill_exp', value: 5000 }, materials: [{ id: 'ancient_milk', count: 3 }, { id: 'spirit_crystal', count: 10 }], cost: 15000, grade: '灵级' },
    { id: 'insight_xian', name: '仙级感悟丹', desc: '功法经验+15000，适用于仙级以下', effect: { type: 'skill_exp', value: 15000 }, materials: [{ id: 'immortal_herb', count: 5 }, { id: 'immortal_stone', count: 10 }], cost: 80000, grade: '仙级' },
    { id: 'insight_shen', name: '神级感悟丹', desc: '功法经验+50000，适用于神级以下', effect: { type: 'skill_exp', value: 50000 }, materials: [{ id: 'chaos_stone', count: 1 }, { id: 'immortal_stone', count: 50 }], cost: 500000, grade: '神级' }
  ],
  
  // 材料 - 完整版
  materials: [
    // 基础材料
    { id: 'herb', name: '灵草', desc: '基础炼丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 2 },
    { id: 'purple_fungus', name: '紫芝', desc: '中级炼丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 10 },
    { id: 'beast_core', name: '兽丹', desc: '妖兽内丹', icon: ' ', stackable: true, weight: 0.3, sellPrice: 15 },
    { id: 'demon_core', name: '妖丹', desc: '高级妖兽内丹', icon: ' ', stackable: true, weight: 0.5, sellPrice: 100 },
    { id: 'iron', name: '玄铁', desc: '炼器基础材料', icon: '⛏️', stackable: true, weight: 1.0, sellPrice: 5 },
    { id: 'thunder_wood', name: '雷击木', desc: '雷属性材料', icon: ' ', stackable: true, weight: 0.8, sellPrice: 20 },
    { id: 'cold_jade', name: '寒玉', desc: '水属性材料', icon: '❄️', stackable: true, weight: 0.5, sellPrice: 15 },
    { id: 'fire_stone', name: '火灵石', desc: '火属性材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 15 },
    { id: 'space_shard', name: '空间碎片', desc: '空间法宝材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 50 },
    { id: 'paper', name: '符纸', desc: '制符基础材料', icon: ' ', stackable: true, weight: 0.05, sellPrice: 1 },
    { id: 'paper2', name: '宝符纸', desc: '中级制符材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 10 },
    { id: 'wind_grass', name: '风铃草', desc: '轻身丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 8 },
    { id: 'detox_grass', name: '解毒草', desc: '解毒散材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 5 },
    { id: 'beast_bone', name: '兽骨', desc: '炼体材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 5 },
    { id: 'clear_flower', name: '清目花', desc: '明目丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 8 },
    { id: 'shadow_flower', name: '影花草', desc: '隐息丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 12 },
    { id: 'poison_grass', name: '毒草', desc: '迷魂丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 5 },
    { id: 'mushroom', name: '迷幻菇', desc: '迷魂丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 10 },
    { id: 'yang_flower', name: '阳花草', desc: '破瘴丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 8 },
    { id: 'wind_flower', name: '风灵花', desc: '定风丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 8 },
    { id: 'spring_water', name: '灵泉水', desc: '通脉丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 15 },
    { id: 'jade', name: '玉髓', desc: '高级材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 30 },
    { id: 'soft_jade', name: '软玉膏', desc: '护脉丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 20 },
    { id: 'soul_wood', name: '养魂木叶', desc: '聚神丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 30 },
    { id: 'dragon_blood', name: '蛟龙血', desc: '蛟血丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 100 },
    { id: 'crane_feather', name: '云鹤羽', desc: '腾云丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 20 },
    { id: 'thorn_fruit', name: '尖刺果', desc: '破甲丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 15 },
    { id: 'ancient_fungus', name: '万年灵芝', desc: '护心丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 100 },
    { id: 'ancient_milk', name: '万年灵乳', desc: '化婴丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 200 },
    { id: 'earth_marrow', name: '地髓', desc: '天元丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 150 },
    { id: 'diamond', name: '金刚石', desc: '金刚丹材料', icon: ' ', stackable: true, weight: 1.0, sellPrice: 200 },
    { id: 'dragon_scale', name: '龙鳞', desc: '金刚丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 250 },
    { id: 'void_stone', name: '虚空石', desc: '破界丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 300 },
    { id: 'nine_grass', name: '九幽草', desc: '裂魂丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 200 },
    { id: 'qilin_horn', name: '麒麟角', desc: '化神丹材料', icon: ' ', stackable: true, weight: 1.0, sellPrice: 500 },
    { id: 'phoenix_feather', name: '凤羽', desc: '破障丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 400 },
    { id: 'phoenix_blood', name: '凤凰血', desc: '涅槃丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 800 },
    { id: 'soul_wood_branch', name: '养魂木枝', desc: '天魂丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 300 },
    { id: 'soul_crystal', name: '魂晶', desc: '天魂丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 400 },
    { id: 'five_element', name: '五行草', desc: '混元丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 100 },
    
    // 灵界材料
    { id: 'spirit_herb', name: '灵界灵草', desc: '灵界炼丹材料', icon: ' ', stackable: true, weight: 0.2, sellPrice: 50 },
    { id: 'void_crystal', name: '虚空晶', desc: '虚灵丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 500 },
    { id: 'true_blood', name: '真灵之血', desc: '渡劫圣丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 1000 },
    { id: 'spirit_crystal', name: '灵晶', desc: '灵界货币', icon: ' ', stackable: true, weight: 0.1, sellPrice: 1000 },
    { id: 'space_crystal', name: '空晶', desc: '破界丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 800 },
    { id: 'chaos_stone', name: '混沌石', desc: '飞升丹材料', icon: ' ', stackable: true, weight: 1.0, sellPrice: 2000 },
    
    // 仙界材料
    { id: 'immortal_herb', name: '仙灵草', desc: '仙界炼丹材料', icon: ' ', stackable: true, weight: 0.3, sellPrice: 100 },
    { id: 'immortal_blood', name: '仙兽血', desc: '飞仙丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 200 },
    { id: 'immortal_core', name: '仙兽丹', desc: '鸿蒙丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 500 },
    { id: 'immortal_stone', name: '仙灵石', desc: '仙界货币', icon: ' ', stackable: true, weight: 0.1, sellPrice: 100 },
    { id: 'origin_crystal', name: '本源结晶', desc: '悟道丹材料', icon: ' ', stackable: true, weight: 1.0, sellPrice: 3000 },
    { id: 'chaos_gas', name: '混沌之气', desc: '混沌丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 2000 },
    { id: 'lunhui_stone', name: '轮回石', desc: '轮回丹材料', icon: ' ', stackable: true, weight: 1.0, sellPrice: 5000 },
    { id: 'law_fragment', name: '法则碎片', desc: '破障丹材料', icon: ' ', stackable: true, weight: 0.1, sellPrice: 3000 },
    { id: 'chaos_fragment', name: '混沌至宝碎片', desc: '道祖丹材料', icon: ' ', stackable: true, weight: 2.0, sellPrice: 10000 },
    { id: 'origin_law', name: '本源法则', desc: '道祖丹材料', icon: ' ', stackable: true, weight: 0.5, sellPrice: 50000 },
    
    // 特殊材料
    { id: 'stone', name: '灵石', desc: '基础货币', icon: ' ', stackable: true, weight: 0, sellPrice: 1 },
    { id: 'thunder_stone', name: '雷晶石', desc: '蕴含雷电之力的矿石', icon: '💎', stackable: true, weight: 3, sellPrice: 200 },
    { id: 'time_crystal', name: '时空晶核', desc: '蕴含时间法则的晶体', icon: '⏳', stackable: true, weight: 5, sellPrice: 5000 }
  ],
  
  // 符箓 - 34种
  talismans: [
    // 灵符·8种（练气可用）
    { id: 'fire_talisman', name: '火球符', desc: '释放火球，2倍伤害', damage: 2.0, element: 'fire', count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'ice_talisman', name: '冰锥符', desc: '释放冰锥，1.8倍伤害', damage: 1.8, element: 'water', count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'thunder_talisman', name: '雷击符', desc: '召唤雷击，2.2倍伤害', damage: 2.2, element: 'thunder', count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'shield_talisman', name: '护身符', desc: '生成护盾，吸收伤害', effect: 'shield', value: 3.0, count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'hide_talisman', name: '隐匿符', desc: '隐藏气息30天', effect: 'hide', duration: 30, count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'light_talisman', name: '轻身符', desc: '赶路速度+30%持续15天', effect: 'speed', value: 0.3, duration: 15, count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'illuminate_talisman', name: '照明符', desc: '发出灵光持续7天', effect: 'light', duration: 7, count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    { id: 'message_talisman', name: '传讯符', desc: '向已知NPC发送消息', effect: 'message', count: 1, grade: '灵符', mpCost: 0, weight: 0.1 },
    
    // 宝符·8种（筑基可用）
    { id: 'fire_talisman2', name: '烈焰符', desc: '释放烈焰，3倍伤害+灼烧', damage: 3.0, element: 'fire', count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'ice_talisman2', name: '玄冰符', desc: '释放玄冰，2.8倍伤害+冰冻', damage: 2.8, element: 'water', count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'thunder_talisman2', name: '紫雷符', desc: '召唤紫雷，3.5倍伤害+麻痹', damage: 3.5, element: 'thunder', count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'golden_bell_talisman', name: '金钟符', desc: '减伤60%持续3回合', effect: 'shield', value: 0.6, duration: 3, count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'forbid_break_talisman', name: '破禁符', desc: '强行破解禁制', effect: 'forbid_break', count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'bind_talisman', name: '定身符', desc: '使敌人缠绕2回合', effect: 'bind', duration: 2, count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'mp_recover_talisman', name: '回灵符', desc: '立即恢复30%灵力', effect: 'mp', value: 0.3, count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    { id: 'teleport_talisman', name: '传送符', desc: '瞬间返回最近城镇', effect: 'teleport', count: 1, grade: '宝符', mpCost: 0, weight: 0.2 },
    
    // 古符·8种（金丹可用）
    { id: 'fire_talisman3', name: '天火符', desc: '召唤天火，4.5倍群体伤害+灼烧', damage: 4.5, element: 'fire', aoe: true, count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'ice_talisman3', name: '玄冰神符', desc: '玄冰风暴，4倍群体伤害+冰冻', damage: 4.0, element: 'water', aoe: true, count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'thunder_talisman3', name: '天雷符', desc: '召唤天雷，5倍伤害+麻痹', damage: 5.0, element: 'thunder', count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'proxy_talisman', name: '替身符', desc: '制造替身承受致命一击', effect: 'proxy', value: 0.5, count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'seal_talisman', name: '封印符', desc: '封印敌人3回合', effect: 'seal', duration: 3, count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'forbid_break2_talisman', name: '破界符', desc: '破解古符级禁制', effect: 'forbid_break2', count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'gather_talisman', name: '聚灵符', desc: '修炼速度+50%持续30天', effect: 'cultivation', value: 0.5, duration: 30, count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    { id: 'escape_talisman', name: '遁地符', desc: '立即脱离战斗', effect: 'escape', count: 1, grade: '古符', mpCost: 0, weight: 0.3, durability: 2 },
    
    // 天符·6种（元婴可用）
    { id: 'fire_talisman4', name: '焚天符', desc: '焚天之火，8倍群体伤害+灼烧满层', damage: 8.0, element: 'fire', aoe: true, count: 1, grade: '天符', mpCost: 0, weight: 0.5, durability: 3 },
    { id: 'ice_talisman4', name: '绝对零度符', desc: '绝对零度，7倍群体伤害+冰冻+沉默', damage: 7.0, element: 'water', aoe: true, count: 1, grade: '天符', mpCost: 0, weight: 0.5, durability: 3 },
    { id: 'thunder_talisman4', name: '神雷天罚符', desc: '天罚神雷，10倍伤害+麻痹+标记', damage: 10.0, element: 'thunder', count: 1, grade: '天符', mpCost: 0, weight: 0.5, durability: 3 },
    { id: 'lunhui_proxy_talisman', name: '轮回替身符', desc: '替身承受致命伤害+恢复30%HP', effect: 'lunhui_proxy', value: 0.3, count: 1, grade: '天符', mpCost: 0, weight: 0.5, durability: 3 },
    { id: 'great_teleport_talisman', name: '大挪移符', desc: '传送至已探索过的任意区域', effect: 'great_teleport', count: 1, grade: '天符', mpCost: 0, weight: 0.5, durability: 3 },
    { id: 'seal_magic_talisman', name: '封魔符', desc: '封印魔属性敌人5回合', effect: 'seal_magic', duration: 5, count: 1, grade: '天符', mpCost: 0, weight: 0.5, durability: 3 },
    
    // 仙符·4种（化神~灵界可用）
    { id: 'chaos_fire_talisman', name: '混沌天火符', desc: '混沌之火，15倍群体伤害+无视50%防御', damage: 15.0, element: 'chaos', aoe: true, count: 1, grade: '仙符', mpCost: 0, weight: 1.0, durability: 5 },
    { id: 'chaos_ice_talisman', name: '混沌冰封符', desc: '混沌冰封，12倍群体伤害+冰冻+沉默', damage: 12.0, element: 'chaos', aoe: true, count: 1, grade: '仙符', mpCost: 0, weight: 1.0, durability: 5 },
    { id: 'chaos_thunder_talisman', name: '混沌神雷符', desc: '混沌天雷，20倍伤害+麻痹+标记', damage: 20.0, element: 'chaos', count: 1, grade: '仙符', mpCost: 0, weight: 1.0, durability: 5 },
    { id: 'chaos_proxy_talisman', name: '混沌替身符', desc: '替身承受致命伤害+恢复100%HP+全属性+50%', effect: 'chaos_proxy', value: 1.0, count: 1, grade: '仙符', mpCost: 0, weight: 1.0, durability: 5 }
  ],
  
  // 法宝 - 36种
  artifacts: [
    // 法器级
    { id: 'iron_sword', name: '铁剑', grade: '法器', type: 'attack', atk: 15, def: 0, desc: '基础攻击法宝', weight: 2, durability: 100 },
    { id: 'iron_shield', name: '铁盾', grade: '法器', type: 'defense', atk: 0, def: 10, desc: '基础防御法宝', weight: 3, durability: 100 },
    { id: 'wood_sword', name: '木剑', grade: '法器', type: 'attack', atk: 10, def: 0, desc: '轻便攻击法宝', weight: 1, durability: 50 },
    { id: 'stone_hammer', name: '石锤', grade: '法器', type: 'attack', atk: 20, def: 0, desc: '重型攻击法宝', weight: 5, durability: 80 },
    
    // 灵器级
    { id: 'purple_hammer', name: '紫电锤', grade: '灵器', type: 'attack', atk: 80, def: 0, desc: '雷属性攻击法宝', element: 'thunder', weight: 3, durability: 200 },
    { id: 'golden_bell', name: '金钟罩', grade: '灵器', type: 'defense', atk: 0, def: 60, desc: '全伤害减伤+15%', weight: 5, durability: 200 },
    { id: 'fly_boat', name: '飞行舟', grade: '灵器', type: 'fly', atk: 0, def: 0, speed: 3, desc: '飞行法宝，速度x3', weight: 10, durability: 150 },
    { id: 'space_bag', name: '乾坤袋', grade: '灵器', type: 'space', atk: 0, def: 0, slots: 100, desc: '空间法宝，100格', weight: 0.5, durability: 300 },
    { id: 'green_sword', name: '青锋剑', grade: '灵器', type: 'attack', atk: 60, def: 0, desc: '锋利的飞剑', weight: 2, durability: 180 },
    { id: 'jade_pendant', name: '玉佩', grade: '灵器', type: 'defense', atk: 0, def: 40, desc: '护身玉佩', weight: 0.3, durability: 250 },
    
    // 法宝级
    { id: 'xuantie_sword', name: '玄铁剑', grade: '法宝', type: 'attack', atk: 200, def: 0, desc: '玄铁打造的飞剑', weight: 4, durability: 300 },
    { id: 'golden_shield', name: '金光盾', grade: '法宝', type: 'defense', atk: 0, def: 150, desc: '金光护体', weight: 6, durability: 300 },
    { id: 'thunder_ring', name: '雷霆环', grade: '法宝', type: 'attack', atk: 180, def: 0, desc: '雷属性法宝', element: 'thunder', weight: 1, durability: 250 },
    { id: 'ice_crystal', name: '冰晶珠', grade: '法宝', type: 'attack', atk: 160, def: 0, desc: '水属性法宝', element: 'water', weight: 1, durability: 250 },
    { id: 'fire_flag', name: '烈火旗', grade: '法宝', type: 'attack', atk: 190, def: 0, desc: '火属性法宝', element: 'fire', weight: 2, durability: 250 },
    { id: 'fly_sword', name: '御风剑', grade: '法宝', type: 'fly', atk: 100, def: 0, speed: 5, desc: '飞行+攻击法宝', weight: 3, durability: 200 },
    
    // 古宝级
    { id: 'xutian_ding', name: '虚天鼎', grade: '古宝', type: 'special', atk: 300, def: 200, desc: '虚天殿至宝，可炼丹', weight: 15, durability: 500 },
    { id: 'qingzhu_sword', name: '青竹蜂云剑', grade: '古宝', type: 'attack', atk: 500, def: 0, desc: '可成长法宝，剑气积累', weight: 2, durability: 400 },
    { id: 'ancient_mirror', name: '古铜镜', grade: '古宝', type: 'defense', atk: 0, def: 400, desc: '反伤+10%', weight: 3, durability: 400 },
    { id: 'space_ring', name: '须弥戒', grade: '古宝', type: 'space', atk: 0, def: 0, slots: 1000, desc: '空间法宝，1000格', weight: 0.1, durability: 600 },
    { id: 'formation_flag', name: '阵旗', grade: '古宝', type: 'formation', atk: 0, def: 0, desc: '布置阵法', weight: 5, durability: 300 },
    { id: 'soul_mirror', name: '天罗镜', grade: '古宝', type: 'sense', atk: 0, def: 0, desc: '神识探查+50%', weight: 2, durability: 350 },
    
    // 玄天之宝级
    { id: 'star_sword', name: '星辰剑', grade: '玄天之宝', type: 'attack', atk: 1000, def: 0, desc: '星辰之力，夜间+50%', weight: 3, durability: 800 },
    { id: 'chaos_bell', name: '混沌钟', grade: '玄天之宝', type: 'defense', atk: 0, def: 800, desc: '混沌护体', weight: 20, durability: 1000 },
    { id: 'void_boat', name: '虚空飞舟', grade: '玄天之宝', type: 'fly', atk: 0, def: 0, speed: 20, desc: '穿越界域', weight: 30, durability: 500 },
    { id: 'nine_palace', name: '九宫天乾符', grade: '玄天之宝', type: 'formation', atk: 0, def: 0, desc: '阵法效果+100%', weight: 1, durability: 3 },
    
    // 通天灵宝级
    { id: 'chaos_sword', name: '混沌剑', grade: '通天灵宝', type: 'attack', atk: 5000, def: 0, desc: '混沌攻击，无视30%防御', weight: 5, durability: 1500 },
    { id: 'chaos_shield', name: '混沌盾', grade: '通天灵宝', type: 'defense', atk: 0, def: 4000, desc: '混沌护体，免疫+20%', weight: 25, durability: 2000 },
    { id: 'chaos_ring', name: '混沌戒', grade: '通天灵宝', type: 'space', atk: 0, def: 0, slots: 10000, desc: '混沌空间，10000格', weight: 0.1, durability: 3000 },
    
    // 先天灵宝级
    { id: 'creation_sword', name: '造化剑', grade: '先天灵宝', type: 'attack', atk: 20000, def: 0, desc: '造化之力', weight: 3, durability: 5000 },
    { id: 'creation_shield', name: '造化盾', grade: '先天灵宝', type: 'defense', atk: 0, def: 15000, desc: '造化护体', weight: 10, durability: 5000 },
    { id: 'creation_ring', name: '造化戒', grade: '先天灵宝', type: 'space', atk: 0, def: 0, slots: 100000, desc: '造化空间', weight: 0.1, durability: 10000 },
    
    // 混沌至宝级
    { id: 'kaitian_zhu', name: '开天珠', grade: '混沌至宝', type: 'special', atk: 100000, def: 0, desc: '开天辟地之力，1次性', weight: 5, durability: 1 },
    { id: 'hundun_qinglian', name: '混沌青莲', grade: '混沌至宝', type: 'special', atk: 0, def: 0, desc: '创世之宝，CD万年', weight: 0, durability: 999999 }
  ],

  // 特殊物品 - 事件链/任务/秘境相关
  special: [
    // 事件链物品
    { id: 'treasure_map_1', name: '藏宝图碎片①', desc: '废弃洞府探索获得的碎片，集齐3个可解锁隐藏秘境', icon: ' ', stackable: false, weight: 0.1, sellPrice: 0 },
    { id: 'treasure_map_2', name: '藏宝图碎片②', desc: '废弃洞府探索获得的碎片，集齐3个可解锁隐藏秘境', icon: ' ', stackable: false, weight: 0.1, sellPrice: 0 },
    { id: 'treasure_map_3', name: '藏宝图碎片③', desc: '废弃洞府探索获得的碎片，集齐3个可解锁隐藏秘境', icon: ' ', stackable: false, weight: 0.1, sellPrice: 0 },
    { id: 'realm_clue_1', name: '秘境线索①', desc: '酒馆情报获得的线索，集齐3个可找到秘境入口', icon: ' ', stackable: false, weight: 0.1, sellPrice: 0 },
    { id: 'realm_clue_2', name: '秘境线索②', desc: '酒馆情报获得的线索，集齐3个可找到秘境入口', icon: ' ', stackable: false, weight: 0.1, sellPrice: 0 },
    { id: 'realm_clue_3', name: '秘境线索③', desc: '酒馆情报获得的线索，集齐3个可找到秘境入口', icon: ' ', stackable: false, weight: 0.1, sellPrice: 0 },
    { id: 'blood_realm_token', name: '血色禁地令牌', desc: '血禁山脉送信任务获得，可进入血色禁地', icon: ' ', stackable: false, weight: 0.2, sellPrice: 0 },
    { id: 'seal_fragment_1', name: '封印碎片①', desc: '昆吾山加固封印获得，集齐3个可修复封印', icon: ' ', stackable: false, weight: 0.3, sellPrice: 0 },
    { id: 'seal_fragment_2', name: '封印碎片②', desc: '昆吾山加固封印获得，集齐3个可修复封印', icon: ' ', stackable: false, weight: 0.3, sellPrice: 0 },
    { id: 'seal_fragment_3', name: '封印碎片③', desc: '昆吾山加固封印获得，集齐3个可修复封印', icon: ' ', stackable: false, weight: 0.3, sellPrice: 0 },

    // 秘境钥匙/令牌
    { id: 'kunwu_key', name: '昆吾山钥匙', desc: '进入昆吾山封印的钥匙，由古魔分身掉落', icon: ' ', stackable: false, weight: 0.5, sellPrice: 0 },
    { id: 'guangling_token', name: '广灵洞天令牌', desc: '进入广灵洞天的令牌，由广灵道尊传承获得', icon: ' ', stackable: false, weight: 0.5, sellPrice: 0 },

    // 其他特殊物品
    { id: 'xutian_ding_recipe', name: '虚天鼎图纸', desc: '虚天殿隐藏层获得，可学习虚天鼎炼制方法', icon: ' ', stackable: false, weight: 0.2, sellPrice: 0 },
    { id: 'fansheng_remnant', name: '梵圣真魔功残卷', desc: '古魔分身掉落，可学习梵圣真魔功', icon: ' ', stackable: false, weight: 0.3, sellPrice: 0 },
    { id: 'guangling_jing', name: '广灵道经', desc: '广灵道尊传承，可学习广灵道经', icon: ' ', stackable: false, weight: 0.5, sellPrice: 0 }
  ]
};

// 坊市商品
export const SHOP_ITEMS = {
  pills: ['heal_pill', 'stop_bleed', 'mp_pill', 'peiyuan', 'juqi', 'qingxin_pill', 'bigu', 'light_body', 'detox'],
  materials: ['herb', 'purple_fungus', 'beast_core', 'iron', 'paper', 'paper2'],
  talismans: ['fire_talisman', 'ice_talisman', 'shield_talisman', 'hide_talisman', 'light_talisman'],
  artifacts: ['iron_sword', 'iron_shield', 'wood_sword', 'stone_hammer']
};
