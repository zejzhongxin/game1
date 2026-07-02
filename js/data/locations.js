// 地图数据（按GDD文档）
export const LOCATIONS = {
  // ═══════════════════════════════════════
  // 人界·天南大陆
  // 区域解锁顺序：青云山(初始)→太南谷/天南城→黑风林(练气)→黄枫谷/落云宗/灵兽山/血禁山脉
  // 距离数据：青云山↔太南谷2天 / 青云山↔天南城3天 / 天南城↔黄枫谷2天 / 黄枫谷↔血禁山脉3天
  // ═══════════════════════════════════════
  renjie: [
    // 初始区域 - 凡人
    { id: 'qingyun', name: '青云山', desc: '七玄门所在，凡人起步之地', recommended: '凡人~练气', realmIdx: 0, events: ['herb', 'beast_weak', 'cave', 'npc'], distance: 0, region: '天南大陆', type: 'small' },
    { id: 'tainangu', name: '太南谷', desc: '散修聚集的山谷', recommended: '凡人~练气', realmIdx: 0, events: ['herb', 'beast_weak', 'shop'], distance: 2, region: '天南大陆', type: 'small' },
    // 练气解锁
    { id: 'tiancheng', name: '天南城', desc: '天南最大城镇，坊市繁华', recommended: '练气~筑基', realmIdx: 1, events: ['shop', 'npc', 'quest', 'auction'], distance: 3, region: '天南大陆', type: 'large' },
    { id: 'heifeng', name: '黑风林', desc: '妖兽出没的密林', recommended: '练气', realmIdx: 1, events: ['herb', 'beast', 'trap'], distance: 4, region: '天南大陆', type: 'wild' },
    // 筑基解锁
    { id: 'huangfeng', name: '黄枫谷', desc: '掩月宗附属，宗门林立', recommended: '筑基', realmIdx: 2, events: ['sect', 'skill', 'npc', 'shop'], distance: 5, region: '天南大陆', type: 'medium' },
    { id: 'luoyun', name: '落云宗', desc: '剑修宗门', recommended: '筑基~金丹', realmIdx: 2, events: ['sect', 'skill', 'combat'], distance: 7, region: '天南大陆', type: 'medium' },
    { id: 'lingshou', name: '灵兽山', desc: '灵兽栖息地，御兽宗门', recommended: '筑基~金丹', realmIdx: 2, events: ['beast', 'spirit_beast_track', 'herb'], distance: 9, region: '天南大陆', type: 'medium' },
    // 金丹解锁
    { id: 'xuejin', name: '血禁山脉', desc: '血色禁地入口，每30年开启', recommended: '金丹', realmIdx: 3, events: ['secret', 'boss', 'treasure'], distance: 8, region: '天南大陆', type: 'danger' },
    { id: 'tianjin', name: '天南禁地', desc: '古老禁地，传送阵通往天星城', recommended: '金丹~元婴', realmIdx: 3, events: ['ancient', 'forbidden', 'heritage'], distance: 10, region: '天南大陆', type: 'danger' }
  ],
  // ═══════════════════════════════════════
  // 人界·乱星海
  // 区域解锁：天星城(金丹·传送阵)→魁星岛/海族海域/妖兽群岛/陨铁岛/魔岛→小寰天/虚天殿/星宫
  // 距离数据：天星城↔魁星岛2天 / 天星城↔海族海域5天 / 天星城↔妖兽群岛8天
  // ═══════════════════════════════════════
  luanxing: [
    // 金丹解锁（传送阵到达）
    { id: 'tianxing', name: '天星城', desc: '乱星海最大城市，自由城邦', recommended: '金丹~元婴', realmIdx: 3, events: ['shop', 'auction', 'npc', 'quest'], distance: 20, region: '乱星海', type: 'large' },
    { id: 'kuixing', name: '魁星岛', desc: '矿脉丰富', recommended: '金丹', realmIdx: 3, events: ['mine', 'beast', 'cave'], distance: 22, region: '乱星海', type: 'medium' },
    { id: 'haizu', name: '海族海域', desc: '海族栖息地', recommended: '元婴', realmIdx: 4, events: ['npc', 'combat', 'treasure'], distance: 25, region: '乱星海', type: 'wild' },
    { id: 'yaoshou', name: '妖兽群岛', desc: '妖兽领地', recommended: '金丹~元婴', realmIdx: 3, events: ['beast', 'spirit_beast_track', 'treasure'], distance: 28, region: '乱星海', type: 'wild' },
    { id: 'yuntie', name: '陨铁岛', desc: '天降陨铁之地', recommended: '金丹~元婴', realmIdx: 3, events: ['mine', 'treasure', 'combat'], distance: 25, region: '乱星海', type: 'special' },
    { id: 'modao', name: '魔岛', desc: '魔修聚集地', recommended: '元婴', realmIdx: 4, events: ['demon', 'combat', 'treasure'], distance: 28, region: '乱星海', type: 'danger' },
    // 元婴解锁
    { id: 'xiaohuan', name: '小寰天', desc: '秘境入口，每50年开启', recommended: '金丹~元婴', realmIdx: 3, events: ['secret', 'treasure', 'boss'], distance: 21, region: '乱星海', type: 'secret' },
    { id: 'xutian', name: '虚天殿', desc: '古老遗迹，每100年开启', recommended: '元婴', realmIdx: 4, events: ['ancient', 'heritage', 'boss'], distance: 23, region: '乱星海', type: 'secret' },
    { id: 'xinggong', name: '星宫', desc: '乱星海最强势力，控传送阵', recommended: '元婴~化神', realmIdx: 4, events: ['sect', 'shop', 'heritage'], distance: 24, region: '乱星海', type: 'large' }
  ],
  // ═══════════════════════════════════════
  // 人界·大晋帝国
  // 区域解锁：大晋皇都/天罗国/慕兰草原/北凉国/大晋古战场/万年灵木禁地/昆吾山(元婴~化神)→堕落魔渊(化神·圆满/飞升任务)
  // ═══════════════════════════════════════
  dajin: [
    // 元婴解锁
    { id: 'dajin_city', name: '大晋皇都', desc: '人界最大城市，万宝楼总部', recommended: '元婴~化神', realmIdx: 4, events: ['shop', 'auction', 'npc', 'quest'], distance: 50, region: '大晋帝国', type: 'large' },
    { id: 'tianluo', name: '天罗国', desc: '世俗王朝', recommended: '元婴~化神', realmIdx: 4, events: ['npc', 'quest', 'shop'], distance: 52, region: '大晋帝国', type: 'medium' },
    { id: 'mulan', name: '慕兰草原', desc: '草原部落，豹麟兽产地', recommended: '元婴~化神', realmIdx: 4, events: ['npc', 'beast', 'combat'], distance: 55, region: '大晋帝国', type: 'wild' },
    { id: 'beiliang', name: '北凉国', desc: '极寒之地', recommended: '化神', realmIdx: 5, events: ['environment', 'beast', 'treasure'], distance: 57, region: '大晋帝国', type: 'danger' },
    { id: 'guzhan', name: '大晋古战场', desc: '古老战场遗迹', recommended: '元婴~化神', realmIdx: 4, events: ['ancient', 'combat', 'heritage'], distance: 53, region: '大晋帝国', type: 'danger' },
    { id: 'wanmu', name: '万年灵木禁地', desc: '灵木秘境', recommended: '化神', realmIdx: 5, events: ['secret', 'herb', 'boss'], distance: 56, region: '大晋帝国', type: 'danger' },
    { id: 'kunwu', name: '昆吾山', desc: '封印之地，封印逐步松动', recommended: '化神', realmIdx: 5, events: ['forbidden', 'boss', 'heritage'], distance: 54, region: '大晋帝国', type: 'danger' },
    // 化神圆满解锁
    { id: 'duoluo', name: '堕落魔渊', desc: '飞升灵界入口', recommended: '化神·圆满', realmIdx: 5, events: ['heritage', 'boss', 'final'], distance: 60, region: '大晋帝国', type: 'final' }
  ],
  // ═══════════════════════════════════════
  // 灵界
  // 区域解锁：飞升台(炼虚·飞升)→人族边境城→天渊城→万妖山脉/雷鸣山脉/迷雾海→广灵洞天/木族领地→万古魔域/圣岛
  // ═══════════════════════════════════════
  lingjie: [
    // 炼虚解锁（飞升到达）
    { id: 'feitai', name: '飞升台', desc: '灵界入口，飞升者降临之地', recommended: '炼虚', realmIdx: 6, events: ['npc', 'shop'], distance: 0, region: '灵界', type: 'small' },
    { id: 'biancheng', name: '人族边境城', desc: '人妖前线要塞', recommended: '炼虚', realmIdx: 6, events: ['combat', 'npc', 'quest'], distance: 3, region: '灵界', type: 'medium' },
    { id: 'tianyuan', name: '天渊城', desc: '人族核心城市，九大家族总部', recommended: '炼虚~合体', realmIdx: 6, events: ['combat', 'shop', 'quest', 'sect', 'npc'], distance: 10, region: '灵界', type: 'large' },
    // 合体解锁
    { id: 'wanyao', name: '万妖山脉', desc: '妖族七大族领地', recommended: '合体', realmIdx: 7, events: ['beast', 'spirit_beast_track', 'combat', 'npc'], distance: 20, region: '灵界', type: 'wild' },
    { id: 'leiming', name: '雷鸣山脉', desc: '天雷淬体圣地，每200年雷鸣秘境开启', recommended: '合体~大乘', realmIdx: 7, events: ['environment', 'body_refine', 'secret', 'treasure'], distance: 28, region: '灵界', type: 'wild' },
    { id: 'mihai', name: '迷雾海', desc: '迷雾笼罩的神秘海域', recommended: '合体', realmIdx: 7, events: ['secret', 'beast', 'treasure'], distance: 30, region: '灵界', type: 'wild' },
    { id: 'guangling', name: '广灵洞天', desc: '传承之地，每500年开启，需广令牌', recommended: '合体~大乘', realmIdx: 7, events: ['heritage', 'secret', 'boss', 'npc'], distance: 23, region: '灵界', type: 'secret' },
    { id: 'muzu', name: '木族领地', desc: '木族栖息地，灵药丰富', recommended: '合体~大乘', realmIdx: 7, events: ['npc', 'herb', 'combat'], distance: 32, region: '灵界', type: 'wild' },
    // 大乘解锁
    { id: 'xuemo', name: '血魔渊', desc: '血神秘境入口，每1000年开启', recommended: '大乘~渡劫', realmIdx: 8, events: ['secret', 'boss', 'treasure'], distance: 38, region: '灵界', type: 'danger' },
    { id: 'wanmo', name: '万古魔域', desc: '古魔封印地，极度危险', recommended: '大乘', realmIdx: 8, events: ['demon', 'boss', 'treasure', 'forbidden'], distance: 35, region: '灵界', type: 'danger' },
    { id: 'shengdao', name: '圣岛', desc: '灵界圣地，各族共尊', recommended: '大乘', realmIdx: 8, events: ['heritage', 'npc', 'boss', 'shop'], distance: 40, region: '灵界', type: 'large' },
    // 渡劫解锁
    { id: 'duoluo_ling', name: '堕落灵渊', desc: '飞升仙界入口', recommended: '渡劫·圆满', realmIdx: 9, events: ['heritage', 'boss', 'final'], distance: 50, region: '灵界', type: 'final' }
  ],
  // ═══════════════════════════════════════
  // 仙界
  // 区域解锁：飞升池(真仙·飞升)→金源仙域/北寒仙域/东华仙域/南离仙域→天庭城/源初秘境→混沌外域/剑仙阁/丹圣谷→灰域/南明仙域→轮回殿
  // ═══════════════════════════════════════
  xianjie: [
    // 真仙解锁（飞升到达）
    { id: 'feitian_pool', name: '飞升池', desc: '仙界入口，飞升者降临之地', recommended: '真仙', realmIdx: 10, events: ['npc', 'shop'], distance: 0, region: '仙界', type: 'small' },
    { id: 'jinyuan', name: '金源仙域', desc: '金之本源，剑修圣地', recommended: '真仙~金仙', realmIdx: 10, events: ['heritage', 'treasure', 'combat'], distance: 7, region: '仙界', type: 'medium' },
    { id: 'donghua', name: '东华仙域', desc: '木之本源，灵药丰富', recommended: '真仙~金仙', realmIdx: 10, events: ['herb', 'heritage', 'npc'], distance: 8, region: '仙界', type: 'medium' },
    { id: 'beihan', name: '北寒仙域', desc: '冰之本源，极寒仙域', recommended: '金仙', realmIdx: 11, events: ['environment', 'heritage', 'boss'], distance: 20, region: '仙界', type: 'medium' },
    { id: 'nanli', name: '南离仙域', desc: '火之本源，太阳真火所在', recommended: '金仙', realmIdx: 11, events: ['heritage', 'environment', 'boss'], distance: 18, region: '仙界', type: 'medium' },
    // 金仙解锁
    { id: 'tianting', name: '天庭城', desc: '仙界中心，天帝殿所在，十大宗门总部', recommended: '金仙~太乙', realmIdx: 11, events: ['shop', 'npc', 'quest', 'sect', 'auction'], distance: 15, region: '仙界', type: 'large' },
    // 太乙解锁
    { id: 'jiange', name: '剑仙阁', desc: '剑修圣地，青竹蜂云剑传承', recommended: '太乙~大罗', realmIdx: 12, events: ['heritage', 'combat', 'skill', 'npc'], distance: 40, region: '仙界', type: 'medium' },
    { id: 'dansheng', name: '丹圣谷', desc: '炼丹圣地，造化神炉所在', recommended: '太乙~大罗', realmIdx: 12, events: ['alchemy', 'heritage', 'npc', 'shop'], distance: 45, region: '仙界', type: 'medium' },
    { id: 'yuanchu', name: '源初秘境', desc: '混沌之地，每万年开启，需源初令', recommended: '太乙~大罗', realmIdx: 12, events: ['secret', 'heritage', 'boss', 'final'], distance: 25, region: '仙界', type: 'secret' },
    { id: 'hundun', name: '混沌外域', desc: '混沌世界，古神遗族所在', recommended: '太乙~大罗', realmIdx: 12, events: ['chaos', 'boss', 'treasure', 'demon'], distance: 35, region: '仙界', type: 'danger' },
    // 大罗解锁
    { id: 'huiyu', name: '灰域', desc: '时间乱流区域', recommended: '大罗', realmIdx: 13, events: ['time', 'secret', 'boss'], distance: 55, region: '仙界', type: 'danger' },
    { id: 'nanming', name: '南明仙域', desc: '火之极致，太阳真火源头', recommended: '大罗', realmIdx: 13, events: ['heritage', 'environment', 'boss'], distance: 50, region: '仙界', type: 'medium' },
    { id: 'lunhui', name: '轮回殿', desc: '轮回之地，大轮回术传承', recommended: '大罗~道祖', realmIdx: 13, events: ['heritage', 'boss', 'final', 'secret'], distance: 60, region: '仙界', type: 'final' },
    { id: 'daozu', name: '道祖之域', desc: '混沌大道，道祖专属区域', recommended: '道祖', realmIdx: 14, events: ['heritage', 'final', 'boss'], distance: 70, region: '仙界', type: 'final' }
  ]
};

// 赶路方式
export const TRAVEL_MODES = {
  renjie: [
    { name: '步行', speed: 1 },
    { name: '骑坐骑', speed: 2 },
    { name: '御器飞行', speed: 5 },
    { name: '御剑飞行', speed: 10 },
    { name: '传送阵', speed: 50 }
  ],
  lingjie: [
    { name: '普通遁光', speed: 10 },
    { name: '空间瞬移', speed: 50 },
    { name: '大型传送阵', speed: 200 }
  ],
  xianjie: [
    { name: '仙遁术', speed: 100 },
    { name: '界域传送阵', speed: 1000 },
    { name: '空间法则', speed: 5000 }
  ]
};
