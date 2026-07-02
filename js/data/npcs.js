// NPC数据 - 完整版
export const NPCS = [
  {"id": "lifei", "name": "厉飞雨", "location": "qingyun", "initialFame": 20, "type": "ally", "realm": "练气", "dialogues": {0: ["你来了。七玄门已经不在了……但我们还活着。"], 40: ["听说你最近修炼遇到了瓶颈？"], 60: ["你我之间不必客气，有事直说。"], 80: ["能遇到你这样的朋友，是我的运气。"], 100: ["保重。活着回来。"]}, "quests": ["quest_moyi"]},
  {"id": "nangong", "name": "南宫碗", "location": "huangfeng", "initialFame": 10, "type": "ally", "realm": "金丹", "dialogues": {0: ["掩月宗不接待外客……你怎么进来的？"], 30: ["原来是道友，之前在血色禁地见过。"], 50: ["你这个人……倒是和那些阿谀奉承的家伙不一样。"], 70: ["你……值得信任。"], 90: ["你是我为数不多愿意交心的人。"]}},
  {"id": "yuanyao", "name": "元瑶", "location": "tianxing", "initialFame": 15, "type": "merchant", "realm": "金丹", "dialogues": {0: ["欢迎光临妙音门——需要什么？"], 35: ["原来是老顾客了，给你打个折。"], 55: ["道友帮了我不少忙，以后就是自己人了。"], 75: ["你算是我在乱星海为数不多的朋友。"], 95: ["若有一天我不在了，妙音门就托付给你了。"]}},
  {"id": "ziling", "name": "紫灵", "location": "modao", "initialFame": 5, "type": "ally", "realm": "元婴", "dialogues": {0: ["鬼灵门的人？你认错人了。"], 25: ["你倒是胆子不小，敢靠近我。"], 45: ["你……和其他人不太一样。"], 65: ["若你要对付极阴祖师……算我一份。"], 85: ["你是我唯一信任的人……别辜负了这份信任。"]}},
  {"id": "yinyue", "name": "银月", "location": "guzhan", "initialFame": 30, "type": "ally", "realm": "化神", "dialogues": {0: ["恩公！你还记得我吗？"], 50: ["恩公，你的伤好了吗？"], 70: ["你救了我，也救了天狐族——这份恩情我不会忘。"], 90: ["你知道吗……有时候我会想，能不能一直这样。"], 100: ["无论你走到哪里，我都会记住你的。"]}},
  {"id": "xiangzhili", "name": "向之礼", "location": "dajin_city", "initialFame": 0, "type": "merchant", "realm": "化神", "dialogues": {0: ["嘿，小子，看你面生——新来的？"], 20: ["不錯不错，能走到这里说明有点本事。"], 40: ["以后在散修联盟，有事报我名字。"], 60: ["以后散修联盟就靠你们这些年轻人了。"], 80: ["老夫活了这么多年，没见过几个像你这样的人物。"]}},
  {"id": "moboshi", "name": "墨大夫", "location": "qingyun", "initialFame": -20, "type": "enemy", "realm": "练气", "dialogues": {0: ["哼，你也来送死？"]}},
  {"id": "xinyin", "name": "辛如音", "location": "huangfeng", "initialFame": 15, "type": "ally", "realm": "筑基", "dialogues": {0: ["道友是来找我炼丹的吗？"], 30: ["你对炼丹有兴趣？我可以教你。"], 50: ["你的炼丹天赋不错，继续努力。"], 70: ["好吧，这个丹方给你……别告诉别人。"]}},
  {"id": "lihuayuan", "name": "李化元", "location": "huangfeng", "initialFame": 25, "type": "elder", "realm": "元婴", "dialogues": {0: ["你是新来的弟子？好好修炼。"], 30: ["你最近进步很快，不错。"], 50: ["你已经可以独当一面了。"], 70: ["我看好你，将来必成大器。"]}},
  {"id": "xinggong_master", "name": "星宫之主", "location": "tianxing", "initialFame": 0, "type": "elder", "realm": "化神", "dialogues": {0: ["你是谁？怎么进来的？"], 30: ["你有点本事，但还不够。"], 50: ["你通过了考验，可以留在星宫。"]}},
  {"id": "jinyin", "name": "金眼獍", "location": "tianxing", "initialFame": 10, "type": "merchant", "realm": "金丹", "dialogues": {0: ["道友需要什么？我这里有好货。"], 30: ["给你个优惠价，老顾客嘛。"]}},
  {"id": "haizu", "name": "海族使节", "location": "haizu", "initialFame": 0, "type": "neutral", "realm": "金丹", "dialogues": {0: ["人族修士？你来海族领地做什么？"], 30: ["你和其他人族不太一样。"]}},
  {"id": "yinxian", "name": "银仙子", "location": "dajin_city", "initialFame": 20, "type": "ally", "realm": "元婴", "dialogues": {0: ["道友面生，第一次来大晋？"], 40: ["你是个有趣的人。"], 60: ["我信任你。"]}},
  {"id": "tianlong", "name": "天龙真人", "location": "dajin_city", "initialFame": 30, "type": "elder", "realm": "化神", "dialogues": {0: ["你是来找我切磋的？"], 50: ["你有资格和我一战。"]}},
  {"id": "guixu", "name": "归墟老人", "location": "guzhan", "initialFame": 10, "type": "merchant", "realm": "元婴", "dialogues": {0: ["古战场的宝贝，老夫最清楚。"], 30: ["给你个优惠价。"]}},
  {"id": "aoxiao", "name": "敖啸", "location": "tianyuan", "initialFame": 25, "type": "ally", "realm": "大乘", "dialogues": {0: ["你是从下界飞升上来的？"], 50: ["你有资格加入天渊城。"]}},
  {"id": "bingpo", "name": "冰魄仙子", "location": "tianyuan", "initialFame": 20, "type": "ally", "realm": "合体", "dialogues": {0: ["道友是新飞升的修士？"], 40: ["你的修炼速度很快。"]}},
  {"id": "guangling_dao", "name": "广灵道尊残魂", "location": "guangling", "initialFame": 50, "type": "elder", "realm": "渡劫", "dialogues": {0: ["你终于来了。"], 100: ["你就是我要找的人。"]}},
  {"id": "leifeng", "name": "雷疯子", "location": "leiming", "initialFame": 15, "type": "neutral", "realm": "大乘", "dialogues": {0: ["哈哈哈！又来一个不怕死的！"], 50: ["你有点意思。"]}},
  {"id": "shoudeng", "name": "守灯人", "location": "mihai", "initialFame": 30, "type": "ally", "realm": "合体", "dialogues": {0: ["迷雾海的灯塔，由我看守。"], 50: ["灯塔的光芒，为你而亮。"]}},
  {"id": "tiandi", "name": "天帝", "location": "tianting", "initialFame": 0, "type": "elder", "realm": "道祖", "dialogues": {0: ["你是新飞升的仙人？"], 50: ["你有资格面见天帝。"]}},
  {"id": "lunhui_master", "name": "轮回殿主", "location": "lunhui", "initialFame": -10, "type": "enemy", "realm": "道祖", "dialogues": {0: ["你来了。"], 100: ["你通过了考验。"]}},
  {"id": "bottle_spirit", "name": "掌天瓶器灵", "location": "yuanchu", "initialFame": 50, "type": "ally", "realm": "道祖", "dialogues": {0: ["你终于来了。"], 100: ["你就是我要找的人。"]}},
  {"id": "jiantzu", "name": "剑祖残念", "location": "jiange", "initialFame": 40, "type": "elder", "realm": "大罗", "dialogues": {0: ["你有剑心吗？"], 80: ["你通过了考验。"]}},
  {"id": "danzu", "name": "丹祖", "location": "dansheng", "initialFame": 35, "type": "elder", "realm": "大罗", "dialogues": {0: ["你想学炼丹？"], 70: ["你有资格学我的丹方。"]}},
  {"id": "shop_tiancheng", "name": "天南城坊市掌柜", "location": "tiancheng", "initialFame": 0, "type": "merchant", "realm": "筑基", "dialogues": {0: ["欢迎光临！需要什么？"]}},
  {"id": "shop_tianxing", "name": "天星城坊市掌柜", "location": "tianxing", "initialFame": 0, "type": "merchant", "realm": "金丹", "dialogues": {0: ["道友需要什么？"]}},
  {"id": "shop_dajin", "name": "大晋皇都坊市掌柜", "location": "dajin_city", "initialFame": 0, "type": "merchant", "realm": "元婴", "dialogues": {0: ["贵客临门！请进请进。"]}},
  {"id": "black_market", "name": "黑市商人", "location": "dajin_city", "initialFame": 0, "type": "merchant", "realm": "化神", "dialogues": {0: ["嘘……小声点。"]}},
  {"id": "auctioneer", "name": "拍卖师", "location": "tianxing", "initialFame": 0, "type": "merchant", "realm": "元婴", "dialogues": {0: ["欢迎参加拍卖会！"]}},
  {"id": "sect_yanyue", "name": "掩月宗长老", "location": "huangfeng", "initialFame": 10, "type": "elder", "realm": "元婴", "dialogues": {0: ["你想加入掩月宗？"]}},
  {"id": "sect_tiansha", "name": "天煞宗长老", "location": "huangfeng", "initialFame": -10, "type": "elder", "realm": "元婴", "dialogues": {0: ["你想加入天煞宗？"]}},
  {"id": "sect_xinggong", "name": "星宫长老", "location": "tianxing", "initialFame": 5, "type": "elder", "realm": "化神", "dialogues": {0: ["你想加入星宫？"]}},
  
  // 额外NPC - 宗门弟子
  {"id": "disciple_yanyue1", "name": "掩月宗外门弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "筑基", "dialogues": {0: ["师兄好！", "掩月宗的风景很美吧？"]}},
  {"id": "disciple_yanyue2", "name": "掩月宗内门弟子", "location": "huangfeng", "initialFame": 10, "type": "ally", "realm": "金丹", "dialogues": {0: ["道友有何贵干？", "掩月宗的功法博大精深。"]}},
  {"id": "disciple_luoyun1", "name": "落云宗弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "筑基", "dialogues": {0: ["剑道之路，永无止境。", "落云剑诀威力无穷。"]}},
  {"id": "disciple_luoyun2", "name": "落云宗长老弟子", "location": "huangfeng", "initialFame": 15, "type": "ally", "realm": "金丹", "dialogues": {0: ["你想学剑？", "剑心通明，方能大成。"]}},
  {"id": "disciple_huangfeng1", "name": "黄枫谷弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "练气", "dialogues": {0: ["师弟好！", "黄枫谷欢迎你。"]}},
  {"id": "disciple_huangfeng2", "name": "黄枫谷核心弟子", "location": "huangfeng", "initialFame": 20, "type": "ally", "realm": "筑基", "dialogues": {0: ["你有潜力。", "黄枫谷的未来靠你们了。"]}},
  {"id": "disciple_tianque", "name": "天阙堡弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "筑基", "dialogues": {0: ["防御之道，以守为攻。", "天阙堡的金钟罩天下无敌。"]}},
  {"id": "disciple_qingxu", "name": "清虚门弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "筑基", "dialogues": {0: ["清心寡欲，方能悟道。", "清虚门讲究心境。"]}},
  {"id": "disciple_baiqiao", "name": "百巧院弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "筑基", "dialogues": {0: ["炼器之道，精益求精。", "百巧院的法宝天下闻名。"]}},
  {"id": "disciple_lingshou", "name": "灵兽山弟子", "location": "huangfeng", "initialFame": 5, "type": "ally", "realm": "筑基", "dialogues": {0: ["灵兽是修士最好的伙伴。", "你想看看我的灵兽吗？"]}},
  {"id": "disciple_tiansha1", "name": "天煞宗弟子", "location": "huangfeng", "initialFame": -5, "type": "neutral", "realm": "筑基", "dialogues": {0: ["哼，你来做什么？", "天煞宗不欢迎弱者。"]}},
  {"id": "disciple_guiling", "name": "鬼灵门弟子", "location": "huangfeng", "initialFame": -5, "type": "neutral", "realm": "筑基", "dialogues": {0: ["你想学御鬼之术？", "鬼灵门的功法很特殊。"]}},
  {"id": "disciple_hehuan", "name": "合欢宗弟子", "location": "huangfeng", "initialFame": 0, "type": "neutral", "realm": "筑基", "dialogues": {0: ["道友想双修吗？", "合欢宗的功法很有趣。"]}},
  {"id": "disciple_tianmo", "name": "天魔宗弟子", "location": "huangfeng", "initialFame": -10, "type": "enemy", "realm": "筑基", "dialogues": {0: ["魔道之路，一往无前。", "天魔宗的实力深不可测。"]}},
  {"id": "disciple_yinluo", "name": "阴罗宗弟子", "location": "huangfeng", "initialFame": -5, "type": "neutral", "realm": "筑基", "dialogues": {0: ["咒术之道，诡异莫测。", "阴罗宗的替身咒很厉害。"]}},
  
  // 额外NPC - 散修
  {"id": "scattered1", "name": "散修张三", "location": "tiancheng", "initialFame": 0, "type": "neutral", "realm": "练气", "dialogues": {0: ["道友有灵草卖吗？", "天南城最近很热闹。"]}},
  {"id": "scattered2", "name": "散修李四", "location": "tiancheng", "initialFame": 0, "type": "neutral", "realm": "筑基", "dialogues": {0: ["我有一批好货，要不要看看？", "黑风林的妖兽越来越多了。"]}},
  {"id": "scattered3", "name": "散修王五", "location": "tianxing", "initialFame": 0, "type": "neutral", "realm": "金丹", "dialogues": {0: ["乱星海的宝贝很多，但危险也多。", "你想去虚天殿吗？"]}},
  {"id": "scattered4", "name": "散修赵六", "location": "tianxing", "initialFame": 0, "type": "neutral", "realm": "金丹", "dialogues": {0: ["海族最近不太平，小心点。", "天星城的坊市很大。"]}},
  {"id": "scattered5", "name": "散修钱七", "location": "dajin_city", "initialFame": 0, "type": "neutral", "realm": "元婴", "dialogues": {0: ["大晋的水很深，你小心点。", "古战场有很多宝贝。"]}},
  {"id": "scattered6", "name": "散修孙八", "location": "dajin_city", "initialFame": 0, "type": "neutral", "realm": "元婴", "dialogues": {0: ["昆吾山的封印松动了，你知道吗？", "大晋的修仙界很复杂。"]}},
  
  // 额外NPC - 灵界
  {"id": "spirit_clan1", "name": "灵族修士", "location": "tianyuan", "initialFame": 0, "type": "neutral", "realm": "炼虚", "dialogues": {0: ["灵族和人族和平共处。", "灵界的灵气很浓郁。"]}},
  {"id": "spirit_clan2", "name": "灵族长老", "location": "tianyuan", "initialFame": 10, "type": "elder", "realm": "合体", "dialogues": {0: ["你有资格进入灵族领地。", "灵族的传承很古老。"]}},
  {"id": "night_claw1", "name": "夜叉族战士", "location": "tianyuan", "initialFame": -10, "type": "enemy", "realm": "炼虚", "dialogues": {0: ["人族？哼，离我远点。", "夜叉族不欢迎外人。"]}},
  {"id": "wood_clan1", "name": "木族修士", "location": "tianyuan", "initialFame": 0, "type": "neutral", "realm": "炼虚", "dialogues": {0: ["木族生活在丛林中。", "你想看看木族的领地吗？"]}},
  {"id": "shadow_clan1", "name": "影族刺客", "location": "tianyuan", "initialFame": -15, "type": "enemy", "realm": "合体", "dialogues": {0: ["你已经被我盯上了。", "影族的暗杀术天下无敌。"]}},
  {"id": "dragon_tribe1", "name": "龙族修士", "location": "tianyuan", "initialFame": 20, "type": "ally", "realm": "大乘", "dialogues": {0: ["龙族是灵界最强大的种族。", "你想见见龙族的传承吗？"]}},
  {"id": "phoenix_tribe1", "name": "天凤族修士", "location": "tianyuan", "initialFame": 15, "type": "ally", "realm": "大乘", "dialogues": {0: ["天凤族的涅槃之力很强大。", "你想学习天凤族的功法吗？"]}},
  {"id": "qilin_tribe1", "name": "麒麟族修士", "location": "tianyuan", "initialFame": 15, "type": "ally", "realm": "大乘", "dialogues": {0: ["麒麟族是灵界的守护者。", "你想看看麒麟族的领地吗？"]}},
  {"id": "white_tiger1", "name": "白虎族修士", "location": "tianyuan", "initialFame": 10, "type": "neutral", "realm": "大乘", "dialogues": {0: ["白虎族是灵界最善战的种族。", "你想和我切磋一下吗？"]}},
  {"id": "xuanwu_tribe1", "name": "玄武族修士", "location": "tianyuan", "initialFame": 10, "type": "neutral", "realm": "大乘", "dialogues": {0: ["玄武族的防御天下无敌。", "你想看看玄武族的传承吗？"]}},
  {"id": "kunpeng_tribe1", "name": "鲲鹏族修士", "location": "tianyuan", "initialFame": 10, "type": "neutral", "realm": "大乘", "dialogues": {0: ["鲲鹏族的速度天下第一。", "你想乘坐鲲鹏飞行吗？"]}},
  {"id": "nine_tail1", "name": "九尾天狐", "location": "tianyuan", "initialFame": 25, "type": "ally", "realm": "大乘", "dialogues": {0: ["天狐族的幻术很厉害。", "你想看看天狐族的领地吗？"]}},
  
  // 额外NPC - 仙界
  {"id": "immortal_sword", "name": "剑仙阁弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["剑道之路，永无止境。", "剑仙阁是仙界最强大的宗门。"]}},
  {"id": "immortal_dan", "name": "丹圣谷弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["丹道的极致，就是起死回生。", "丹圣谷的丹药天下闻名。"]}},
  {"id": "immortal_array", "name": "阵仙宫弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["阵法之道，变化无穷。", "阵仙宫的阵法天下无敌。"]}},
  {"id": "immortal_talisman", "name": "符圣宗弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["符箓之道，妙用无穷。", "符圣宗的符箓天下闻名。"]}},
  {"id": "immortal_artifact", "name": "器皇殿弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["炼器之道，精益求精。", "器皇殿的法宝天下第一。"]}},
  {"id": "immortal_body", "name": "体修宗弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["体修之道，以身为器。", "体修宗的肉身天下无敌。"]}},
  {"id": "immortal_beast", "name": "御兽仙门弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["灵兽是修士最好的伙伴。", "御兽仙门的灵兽天下闻名。"]}},
  {"id": "immortal_dharma", "name": "法相宗弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["法相之道，以法证道。", "法相宗的法相天下无敌。"]}},
  {"id": "immortal_heart", "name": "幻心宗弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["神识之道，心随意动。", "幻心宗的神识天下第一。"]}},
  {"id": "immortal_time", "name": "时轮宗弟子", "location": "tianting", "initialFame": 10, "type": "ally", "realm": "真仙", "dialogues": {0: ["时间之道，玄妙无穷。", "时轮宗的时间法则很厉害。"]}},
  {"id": "immortal_scattered1", "name": "散仙联盟修士", "location": "tianting", "initialFame": 0, "type": "neutral", "realm": "真仙", "dialogues": {0: ["散仙联盟很自由。", "你想加入散仙联盟吗？"]}},
  {"id": "immortal_hunter1", "name": "混沌猎人", "location": "tianting", "initialFame": 5, "type": "neutral", "realm": "金仙", "dialogues": {0: ["混沌外域很危险，但宝贝也多。", "你想去混沌外域探险吗？"]}},
  {"id": "immortal_info1", "name": "信息阁掌柜", "location": "tianting", "initialFame": 0, "type": "merchant", "realm": "金仙", "dialogues": {0: ["信息阁什么都知道。", "你想买什么情报？"]}},
  {"id": "immortal_traveler1", "name": "时空旅者", "location": "tianting", "initialFame": 15, "type": "ally", "realm": "太乙", "dialogues": {0: ["我穿越过无数时空。", "你想看看其他时空的世界吗？"]}}
];

// NPC关系网络数据（8种关系类型）
// sworn:挚友(1.0) / friend:好友(0.7) / master:师徒(0.9) / daoCompanion:道侣(1.0)
// sectBrother:同门(0.4) / acquaintance:熟人(0.2) / enemy:仇敌(-0.8) / affiliation:势力隶属(0.3)
export const NPC_RELATIONS = {
  'lifei': { 'zhangtie': { type: 'friend', coefficient: 0.7 }, 'wanlaoqi': { type: 'acquaintance', coefficient: 0.2 }, 'qixuan': { type: 'affiliation', coefficient: 0.3 } },
  'nangong': { 'yuanyao': { type: 'friend', coefficient: 0.7 }, 'yanyue': { type: 'affiliation', coefficient: 0.3 } },
  'yuanyao': { 'nangong': { type: 'friend', coefficient: 0.7 }, 'wanbao': { type: 'affiliation', coefficient: 0.3 }, 'miaoyin': { type: 'affiliation', coefficient: 0.3 } },
  'ziling': { 'yuanyao': { type: 'friend', coefficient: 0.7 }, 'guiling': { type: 'affiliation', coefficient: 0.3 } },
  'yinyue': { 'tianhu': { type: 'affiliation', coefficient: 0.3 }, 'player_rescued': { type: 'friend', coefficient: 0.7 } },
  'xiangzhili': { 'sanxiu': { type: 'affiliation', coefficient: 0.3 }, 'sanxiu_union': { type: 'affiliation', coefficient: 0.4 } },
  'xinyin': { 'player': { type: 'acquaintance', coefficient: 0.2 }, 'tiannan_sanxiu': { type: 'affiliation', coefficient: 0.3 } },
  'lihuayuan': { 'huangfeng': { type: 'affiliation', coefficient: 0.3 }, 'xuanyuan': { type: 'daoCompanion', coefficient: 1.0 } },
  'aoxiao': { 'player': { type: 'acquaintance', coefficient: 0.2 }, 'wanlong': { type: 'affiliation', coefficient: 0.4 } },
  'bingpo': { 'player': { type: 'acquaintance', coefficient: 0.2 }, 'tianyuan': { type: 'affiliation', coefficient: 0.3 } },
  'guangling_dao': { 'player': { type: 'master', coefficient: 0.9 }, 'guangling': { type: 'affiliation', coefficient: 0.4 } },
  'tiandi': { 'tianting': { type: 'affiliation', coefficient: 0.3 }, 'sifang_immortal': { type: 'affiliation', coefficient: 0.5 } },
  'lunhui_master': { 'lunhui': { type: 'affiliation', coefficient: 0.3 }, 'all': { type: 'acquaintance', coefficient: 0 } }
};

// NPC双修数据
export const NPC_DUAL_DATA = {
  'nangong': { available: true, realmGap: 1, minFavor: 80, modes: ['normal', 'deep', 'skillDual'], yinyuanAvailable: true },
  'yuanyao': { available: true, realmGap: 1, minFavor: 80, modes: ['normal', 'deep'], yinyuanAvailable: false },
  'ziling': { available: true, realmGap: 1, minFavor: 85, modes: ['normal'], yinyuanAvailable: false },
  'yinyue': { available: true, realmGap: 1, minFavor: 90, modes: ['normal', 'deep'], yinyuanAvailable: true },
  'bingpo': { available: true, realmGap: 1, minFavor: 80, modes: ['normal'], yinyuanAvailable: false }
};

// 任务数据
export const QUESTS = {
  // 第一章：七玄门风云
  "quest_moyi": {"name": "墨大夫阴谋", "description": "厉飞雨发现墨大夫有异动，请你帮忙调查", "steps": [{"text": "前往青云山·七玄门旧址", "target": "qingyun", "type": "visit"}, {"text": "与厉飞雨对话", "target": "lifei", "type": "talk"}, {"text": "前往药庐调查", "target": "yaolu", "type": "visit"}, {"text": "击败墨大夫", "target": "moboshi", "type": "combat"}], "rewards": {"exp": 50, "items": [{"id": "herb", "count": 10}], "fame": 10}},
  "quest_zhangtien": {"name": "张铁的下落", "description": "张铁失踪了，需要找到他", "steps": [{"text": "在青云山搜索", "target": "qingyun", "type": "visit"}, {"text": "发现张铁被夺舍", "target": "zhangtie", "type": "combat"}], "rewards": {"exp": 30, "items": [{"id": "herb", "count": 5}], "fame": 5}},
  
  // 第二章：黄枫谷修行
  "quest_join_huangfeng": {"name": "加入黄枫谷", "description": "黄枫谷正在招收新弟子", "steps": [{"text": "前往黄枫谷", "target": "huangfeng", "type": "visit"}, {"text": "通过入门试炼", "target": "huangfeng_trial", "type": "combat"}, {"text": "成为外门弟子", "target": "huangfeng", "type": "visit"}], "rewards": {"exp": 100, "items": [{"id": "herb", "count": 10}], "fame": 15}},
  "quest_yanyue_letter": {"name": "掩月宗送信", "description": "被派往掩月宗送信", "steps": [{"text": "前往掩月宗", "target": "huangfeng", "type": "visit"}, {"text": "与南宫碗对话", "target": "nangong", "type": "talk"}], "rewards": {"exp": 200, "items": [], "fame": 10}},
  "quest_xuejin": {"name": "血色禁地试炼", "description": "血色禁地30年后开启，需提前准备", "steps": [{"text": "收集筑基丹材料", "target": "zhuji_materials", "type": "gather"}, {"text": "炼制筑基丹", "target": "zhuji", "type": "craft"}, {"text": "突破筑基", "target": "foundation", "type": "breakthrough"}, {"text": "进入血色禁地", "target": "xuejin", "type": "visit"}], "rewards": {"exp": 500, "items": [{"id": "herb", "count": 20}], "fame": 20}},
  "quest_dayan": {"name": "大衍诀传承", "description": "在天南禁地发现大衍神君残魂", "steps": [{"text": "前往天南禁地", "target": "tianjin", "type": "visit"}, {"text": "通过神识试炼", "target": "dayan_trial", "type": "combat"}, {"text": "返回获得大衍诀", "target": "tianjin", "type": "visit"}], "rewards": {"exp": 800, "items": [{"id": "dayan", "count": 1}], "fame": 25}},
  
  // 第三章：乱星海寻宝
  "quest_go_luanxing": {"name": "前往乱星海", "description": "发现古传送阵，前往乱星海", "steps": [{"text": "激活传送阵", "target": "tianjin", "type": "visit"}, {"text": "到达天星城", "target": "tianxing", "type": "visit"}], "rewards": {"exp": 1000, "items": [], "fame": 15}},
  "quest_xiaohuan": {"name": "小寰天秘境", "description": "小寰天秘境即将开启", "steps": [{"text": "前往小寰天", "target": "xiaohuan", "type": "visit"}, {"text": "击败守护兽", "target": "xiaohuan_boss", "type": "combat"}, {"text": "获得万年灵药", "target": "xiaohuan", "type": "visit"}], "rewards": {"exp": 1500, "items": [{"id": "ancient_fungus", "count": 1}], "fame": 20}},
  "quest_xutian": {"name": "虚天殿寻宝", "description": "虚天殿百年一遇的开启", "steps": [{"text": "到达天星城", "target": "tianxing", "type": "visit"}, {"text": "进入虚天殿", "target": "xutian", "type": "visit"}, {"text": "通过冰火道", "target": "ice_fire", "type": "combat"}, {"text": "击败虚天鼎守护灵", "target": "xutian_boss", "type": "combat"}], "rewards": {"exp": 3000, "items": [{"id": "xutian_ding", "count": 1}], "fame": 30}},
  "quest_yaoshou": {"name": "妖兽群岛", "description": "妖兽群岛出现异变", "steps": [{"text": "前往妖兽群岛", "target": "yaoshou", "type": "visit"}, {"text": "击败妖王", "target": "yaoshou_boss", "type": "combat"}], "rewards": {"exp": 2500, "items": [{"id": "demon_core", "count": 5}], "fame": 25}},
  "quest_modao": {"name": "魔岛之乱", "description": "魔岛岛主在密谋什么", "steps": [{"text": "前往魔岛", "target": "modao", "type": "visit"}, {"text": "击败魔岛岛主", "target": "modao_boss", "type": "combat"}], "rewards": {"exp": 2000, "items": [{"id": "demon_core", "count": 3}], "fame": 20}},
  
  // 第四章：大晋风云
  "quest_go_dajin": {"name": "前往大晋", "description": "离开乱星海，前往大晋", "steps": [{"text": "到达大晋皇都", "target": "dajin_city", "type": "visit"}], "rewards": {"exp": 2000, "items": [], "fame": 10}},
  "quest_guzhan": {"name": "古战场探索", "description": "大晋古战场有大机缘", "steps": [{"text": "前往古战场", "target": "guzhan", "type": "visit"}, {"text": "解救银月", "target": "yinyue", "type": "talk"}, {"text": "击败远古将军", "target": "guzhan_boss", "type": "combat"}], "rewards": {"exp": 4000, "items": [{"id": "fansheng_remnant", "count": 1}], "fame": 30}},
  "quest_kunwu": {"name": "昆吾山封印", "description": "昆吾山封印松动，需前往镇压", "steps": [{"text": "到达昆吾山", "target": "kunwu", "type": "visit"}, {"text": "击败古魔分身", "target": "kunwu_boss", "type": "combat"}], "rewards": {"exp": 5000, "items": [{"id": "fansheng_remnant", "count": 1}], "fame": 40}},
  "quest_wanmu": {"name": "万年灵木禁地", "description": "万年灵木禁地出现异变", "steps": [{"text": "前往万年灵木禁地", "target": "wanmu", "type": "visit"}, {"text": "击败木灵守护者", "target": "wanmu_boss", "type": "combat"}, {"text": "获得万古长青诀", "target": "wanmu", "type": "visit"}], "rewards": {"exp": 5000, "items": [{"id": "guangling", "count": 1}], "fame": 35}},
  
  // 第五章：飞升灵界
  "quest_feisheng_lingjie": {"name": "飞升灵界", "description": "化神圆满，准备飞升灵界", "steps": [{"text": "准备飞升材料", "target": "feisheng_materials", "type": "gather"}, {"text": "渡劫", "target": "feisheng_trial", "type": "combat"}, {"text": "飞升灵界", "target": "feitai", "type": "visit"}], "rewards": {"exp": 50000, "items": [], "fame": 50}},
  
  // 第六章：灵界争锋
  "quest_tianyuan": {"name": "天渊城", "description": "前往天渊城，参与前线战斗", "steps": [{"text": "到达天渊城", "target": "tianyuan", "type": "visit"}, {"text": "参与边境防守战", "target": "tianyuan_battle", "type": "combat"}], "rewards": {"exp": 100000, "items": [], "fame": 30}},
  "quest_wanyao": {"name": "万妖山脉", "description": "深入妖族领地", "steps": [{"text": "前往万妖山脉", "target": "wanyao", "type": "visit"}, {"text": "击败万妖之王", "target": "wanyao_boss", "type": "combat"}], "rewards": {"exp": 200000, "items": [{"id": "demon_core", "count": 10}], "fame": 40}},
  "quest_guangling": {"name": "广灵洞天传承", "description": "广灵洞天开启，接受传承试炼", "steps": [{"text": "获得进入资格", "target": "guangling_token", "type": "gather"}, {"text": "进入广灵洞天", "target": "guangling", "type": "visit"}, {"text": "通过3项传承试炼", "target": "guangling_trial", "type": "combat"}], "rewards": {"exp": 200000, "items": [{"id": "guangling", "count": 1}], "fame": 50}},
  "quest_wanmo": {"name": "万古魔域", "description": "万古魔域封印松动", "steps": [{"text": "前往万古魔域", "target": "wanmo", "type": "visit"}, {"text": "击败古魔真身", "target": "wanmo_boss", "type": "combat"}], "rewards": {"exp": 250000, "items": [{"id": "chaos_stone", "count": 1}], "fame": 45}},
  
  // 第七章：仙界问道
  "quest_feisheng_xianjie": {"name": "飞升仙界", "description": "渡劫成功，飞升仙界", "steps": [{"text": "准备飞升", "target": "feisheng_xianjie_materials", "type": "gather"}, {"text": "渡劫", "target": "feisheng_xianjie_trial", "type": "combat"}, {"text": "飞升仙界", "target": "feitian_pool", "type": "visit"}], "rewards": {"exp": 1000000, "items": [], "fame": 60}},
  "quest_tianting": {"name": "天庭城", "description": "前往天庭城，面见天帝", "steps": [{"text": "到达天庭城", "target": "tianting", "type": "visit"}, {"text": "面见天帝", "target": "tiandi", "type": "talk"}, {"text": "进入藏经阁禁书区", "target": "tianting_library", "type": "visit"}], "rewards": {"exp": 2000000, "items": [{"id": "hongmeng", "count": 1}], "fame": 40}},
  "quest_yuanchu": {"name": "源初秘境", "description": "探索源初秘境，获得混沌造化诀", "steps": [{"text": "进入源初秘境", "target": "yuanchu", "type": "visit"}, {"text": "击败源初之灵", "target": "yuanchu_boss", "type": "combat"}, {"text": "获得混沌造化诀", "target": "yuanchu", "type": "visit"}], "rewards": {"exp": 5000000, "items": [{"id": "hundun_creation", "count": 1}], "fame": 50}},
  "quest_lunhui": {"name": "轮回殿", "description": "前往轮回殿，面对最终考验", "steps": [{"text": "前往轮回殿", "target": "lunhui", "type": "visit"}, {"text": "击败轮回殿主", "target": "lunhui_boss", "type": "combat"}, {"text": "获得大轮回术", "target": "lunhui", "type": "visit"}], "rewards": {"exp": 10000000, "items": [{"id": "lunhui", "count": 1}], "fame": 100}},
  
  // 支线任务
  "quest_herb_gather": {"name": "灵草采集", "description": "采集10份灵草", "steps": [{"text": "采集灵草x10", "target": "herb", "type": "gather"}], "rewards": {"exp": 20, "items": [{"id": "stone", "count": 50}], "fame": 5}},
  "quest_beast_hunt": {"name": "妖兽狩猎", "description": "击败5只妖兽", "steps": [{"text": "击败妖兽x5", "target": "beast", "type": "combat"}], "rewards": {"exp": 50, "items": [{"id": "beast_core", "count": 2}], "fame": 10}},
  "quest_npc_help": {"name": "帮助NPC", "description": "帮助一位NPC解决问题", "steps": [{"text": "与NPC对话", "target": "npc", "type": "talk"}, {"text": "完成任务", "target": "quest", "type": "visit"}], "rewards": {"exp": 30, "items": [], "fame": 15}},
  "quest_explore": {"name": "探索新区域", "description": "探索一个新区域", "steps": [{"text": "前往新区域", "target": "new_area", "type": "visit"}], "rewards": {"exp": 40, "items": [{"id": "herb", "count": 5}], "fame": 10}},
  "quest_alchemy": {"name": "炼丹练习", "description": "炼制一炉丹药", "steps": [{"text": "炼制丹药", "target": "alchemy", "type": "craft"}], "rewards": {"exp": 25, "items": [{"id": "herb", "count": 3}], "fame": 5}},
  "quest_talisman": {"name": "制符练习", "description": "制作一张符箓", "steps": [{"text": "制作符箓", "target": "talisman", "type": "craft"}], "rewards": {"exp": 25, "items": [{"id": "paper", "count": 5}], "fame": 5}},

  // 支线任务（设计文档附录十八）
  "quest_yuanyao_request": {
    "name": "元瑶的请求",
    "description": "元瑶的货物在海上被海族劫走，请你帮忙夺回。",
    "trigger": {"npcId": "yuanyao", "minFavor": 40, "location": "tianxing"},
    "steps": [
      {"text": "前往海族海域", "target": "haizu", "type": "visit"},
      {"text": "击败巡海夜叉x2", "target": "巡海夜叉", "type": "combat", "count": 2},
      {"text": "将货物交还给元瑶", "target": "yuanyao", "type": "talk"}
    ],
    "rewards": {"exp": 300, "fame": 15, "items": [{"id": "stone", "count": 500}], "permanent": "miaoyin_discount_0.9", "permanentDesc": "妙音门购物永久9折"}
  },
  "quest_ziling_revenge": {
    "name": "紫灵的复仇",
    "description": "紫灵请你协助对付极阴祖师，为她复仇。",
    "trigger": {"npcId": "ziling", "minFavor": 50, "minRealm": 4},
    "steps": [
      {"text": "与紫灵商议计划", "target": "ziling", "type": "talk"},
      {"text": "前往极阴岛", "target": "modao", "type": "visit"},
      {"text": "击败极阴祖师分身", "target": "极阴祖师", "type": "combat", "count": 1},
      {"text": "与紫灵对话完成复仇", "target": "ziling", "type": "talk"}
    ],
    "rewards": {"exp": 2000, "fame": 25, "items": [{"id": "stone", "count": 1000}, {"id": "beast_core", "count": 5}], "permanent": "modao_pass", "permanentDesc": "魔道中立通行权"}
  },

  // 主线章节补充：剧情文本和分支（在现有19个任务基础上补充文本）
  "_chapter_texts": {
    "ch1_qingyun": ["七玄门内乱一触即发……", "昔日同门各为其主，血染山门。"],
    "ch2_huangfeng": ["你踏入了黄枫谷的大门。", "入门试炼的难度远超你的想象。"],
    "ch3_luanxing": ["传送阵的光芒刺眼，你来到了陌生的乱星海。", "星宫统治下的天星城热闹非凡。"],
    "ch4_dajin": ["大晋帝国的疆域辽阔无垠。", "古战场上空弥漫着千年不散的战意。"],
    "ch5_ascension": ["化神圆满，天劫将至。", "你感受到了上界的召唤……"],
    "ch6_spirit": ["飞升灵界——一个全新的世界。", "灵气浓度是人界的百倍不止。"],
    "ch7_immortal": ["仙界——修士的终极归宿。", "这里的法则之力令你颤栗。"]
  }
};
