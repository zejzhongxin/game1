// 灵兽数据
export const BEASTS = {
  // 单养型灵兽
  single: [
    { id: 'chihuang', name: '赤焰蟒', grade: 3, element: 'fire', hp: 1200, atk: 180, def: 90, skills: ['fire_breath', 'constrict'], location: 'xuejin' },
    { id: 'xuanbing', name: '玄冰蟾', grade: 4, element: 'water', hp: 3000, atk: 400, def: 200, skills: ['frost_field', 'poison_fog'], location: 'tianjin' },
    { id: 'tihun', name: '啼魂兽', grade: 7, element: 'sense', hp: 25000, atk: 3500, def: 1800, skills: ['soul_scream', 'ghost_kill'], location: 'wanyao' },
    { id: 'jintong', name: '金童', grade: 9, element: 'none', hp: 600000, atk: 80000, def: 50000, skills: ['golden_body', 'wrath'], location: 'guangling' },
    { id: 'ziyun', name: '紫云雕', grade: 5, element: 'wind', hp: 6000, atk: 900, def: 350, skills: ['wind_blade', 'swift'], location: 'wanyao' },
    { id: 'mohuang', name: '墨蛟', grade: 4, element: 'water', hp: 3500, atk: 500, def: 250, skills: ['water_escape', 'dragon_rage'], location: 'luanxing' },
    { id: 'shenshu', name: '神树', grade: 6, element: 'wood', hp: 15000, atk: 2000, def: 1000, skills: ['root_bind', 'life_drain'], location: 'wanmu' },
    { id: 'bingxiong', name: '冰原熊', grade: 5, element: 'water', hp: 8000, atk: 1200, def: 500, skills: ['ice_slam', 'frost_armor'], location: 'beiliang' },
    { id: 'jinfeng', name: '金翅鹏', grade: 6, element: 'wind', hp: 12000, atk: 2500, def: 800, skills: ['dive_attack', 'wind_storm'], location: 'yaoshou' },
    { id: 'hundun_shou', name: '混沌兽', grade: 9, element: 'chaos', hp: 500000, atk: 100000, def: 60000, skills: ['chaos_bite', 'chaos_domain'], location: 'hundun' },
    { id: 'lunhui_shou', name: '轮回兽', grade: 9, element: 'lunhui', hp: 800000, atk: 120000, def: 70000, skills: ['lunhui_strike', 'time_reverse'], location: 'lunhui' },
    { id: 'huoling', name: '火麒麟', grade: 8, element: 'fire', hp: 150000, atk: 20000, def: 10000, skills: ['fire_domain', 'nirvana'], location: 'jinyuan' },
    { id: 'bingfeng', name: '冰凤凰', grade: 8, element: 'water', hp: 120000, atk: 18000, def: 9000, skills: ['ice_domain', 'frozen_nirvana'], location: 'beihan' },
    { id: 'wuzhao_jinlong', name: '五爪金龙', grade: 9, element: 'none', hp: 1000000, atk: 150000, def: 80000, skills: ['dragon_breath', 'dragon_domain'], location: 'tianting' }
  ],
  // 群居型灵兽
  swarm: [
    { id: 'shijin', name: '噬金虫', grade: 9, element: 'metal', hpPerUnit: 100000, atkPerUnit: 15000, defPerUnit: 8000, skills: ['devour', 'metalize'], maxCount: 9999, location: 'tianjin' },
    { id: 'yinse', name: '银色甲虫', grade: 3, element: 'metal', hpPerUnit: 800, atkPerUnit: 120, defPerUnit: 60, skills: ['shell', 'charge'], maxCount: 500, location: 'heifeng' },
    { id: 'xuebian', name: '血色蝙蝠', grade: 4, element: 'blood', hpPerUnit: 1500, atkPerUnit: 250, defPerUnit: 100, skills: ['drain', 'sonic'], maxCount: 200, location: 'xuejin' },
    { id: 'guimian', name: '鬼面蛾', grade: 5, element: 'yin', hpPerUnit: 3000, atkPerUnit: 500, defPerUnit: 200, skills: ['ghost_fire', 'phosphor'], maxCount: 300, location: 'guiling' },
    { id: 'tieyi', name: '铁翼蜂', grade: 2, element: 'none', hpPerUnit: 400, atkPerUnit: 60, defPerUnit: 30, skills: ['sting', 'swarm_guard'], maxCount: 1000, location: 'lingshou' },
    { id: 'huoyi', name: '火蚁', grade: 3, element: 'fire', hpPerUnit: 600, atkPerUnit: 100, defPerUnit: 40, skills: ['fire_spit', 'acid'], maxCount: 800, location: 'tiansha' },
    { id: 'shishi', name: '石狮群', grade: 6, element: 'earth', hpPerUnit: 5000, atkPerUnit: 800, defPerUnit: 400, skills: ['stone_slam', 'earth_wall'], maxCount: 100, location: 'kunwu' },
    { id: 'moying', name: '魔影蝶', grade: 7, element: 'yin', hpPerUnit: 8000, atkPerUnit: 1200, defPerUnit: 500, skills: ['phantom_dust', 'confuse'], maxCount: 150, location: 'wanmo' }
  ],
  // 坐骑型灵兽
  mount: [
    { id: 'baolin', name: '豹麟兽', grade: 5, element: 'none', speed: 3, combat: true, atk: 700, def: 350, location: 'mulan' },
    { id: 'liuyi', name: '六翼霜蚣', grade: 7, element: 'water', speed: 5, combat: true, atk: 3500, def: 1800, location: 'beihan' },
    { id: 'yinyi', name: '银翅夜鹏', grade: 6, element: 'wind', speed: 8, combat: false, bonus: { night: 50 }, location: 'tianxing' },
    { id: 'leipeng', name: '雷鹏', grade: 8, element: 'thunder', speed: 15, combat: true, atk: 20000, def: 10000, location: 'leiming' },
    { id: 'mobian', name: '墨玉蜘蛛', grade: 3, element: 'poison', speed: 2, combat: true, atk: 400, def: 200, location: 'tiancheng' },
    { id: 'jinyan', name: '金眼獍', grade: 4, element: 'none', speed: 3, combat: true, atk: 500, def: 250, location: 'guzhan' },
    { id: 'feitian', name: '飞天魔蝠', grade: 6, element: 'yin', speed: 6, combat: false, bonus: { hide: 30 }, location: 'wanmo' },
    { id: 'xukong', name: '虚空飞舟', grade: 8, element: 'space', speed: 20, combat: false, bonus: { teleport: true }, location: 'hundun' },
    { id: 'shijian', name: '时间之翼', grade: 9, element: 'time', speed: 50, combat: false, bonus: { time_control: true }, location: 'huiyu' },
    { id: 'lunhui_zuo', name: '轮回之座', grade: 9, element: 'lunhui', speed: 100, combat: false, bonus: { reincarnation: true }, location: 'lunhui' }
  ]
};

// 灵兽品阶对照
export const BEAST_GRADE = {
  1: { name: '一阶', realm: '练气' },
  2: { name: '二阶', realm: '筑基初' },
  3: { name: '三阶', realm: '筑基后' },
  4: { name: '四阶', realm: '金丹' },
  5: { name: '五阶', realm: '金丹后' },
  6: { name: '六阶', realm: '元婴' },
  7: { name: '七阶', realm: '化神' },
  8: { name: '八阶', realm: '炼虚~合体' },
  9: { name: '九阶', realm: '大乘~渡劫' }
};

// 群居属性公式：总属性 = 单体属性 × N^0.6
export function calcSwarmPower(baseStat, count) {
  return Math.floor(baseStat * Math.pow(count, 0.6));
}
