// 境界数据（含小阶段）
// 凡人期无小阶段，其他境界有4个小阶段：初期/中期/后期/圆满
export const REALMS = [
  // 凡人（无小阶段）
  { name: '凡人', maxExp: 120, hp: 100, mp: 50, atk: 10, def: 5, spd: 10, sense: 10, lifespan: 100, isMajor: true, subStage: 0 },

  // 练气（4个小阶段）
  { name: '练气初期', maxExp: 250, hp: 200, mp: 150, atk: 25, def: 12, spd: 30, sense: 30, lifespan: 150, isMajor: false, subStage: 0, majorRealm: '练气' },
  { name: '练气中期', maxExp: 500, hp: 250, mp: 188, atk: 31, def: 15, spd: 38, sense: 38, lifespan: 150, isMajor: false, subStage: 1, majorRealm: '练气' },
  { name: '练气后期', maxExp: 750, hp: 300, mp: 225, atk: 38, def: 18, spd: 45, sense: 45, lifespan: 150, isMajor: false, subStage: 2, majorRealm: '练气' },
  { name: '练气圆满', maxExp: 1000, hp: 350, mp: 263, atk: 44, def: 21, spd: 53, sense: 53, lifespan: 150, isMajor: false, subStage: 3, majorRealm: '练气' },

  // 筑基（4个小阶段）
  { name: '筑基初期', maxExp: 1250, hp: 500, mp: 400, atk: 60, def: 30, spd: 80, sense: 80, lifespan: 200, isMajor: false, subStage: 0, majorRealm: '筑基' },
  { name: '筑基中期', maxExp: 2500, hp: 625, mp: 500, atk: 75, def: 38, spd: 100, sense: 100, lifespan: 200, isMajor: false, subStage: 1, majorRealm: '筑基' },
  { name: '筑基后期', maxExp: 3750, hp: 750, mp: 600, atk: 90, def: 45, spd: 120, sense: 120, lifespan: 200, isMajor: false, subStage: 2, majorRealm: '筑基' },
  { name: '筑基圆满', maxExp: 5000, hp: 875, mp: 700, atk: 105, def: 53, spd: 140, sense: 140, lifespan: 200, isMajor: false, subStage: 3, majorRealm: '筑基' },

  // 金丹（4个小阶段）
  { name: '金丹初期', maxExp: 5000, hp: 1500, mp: 1200, atk: 180, def: 90, spd: 200, sense: 200, lifespan: 500, isMajor: false, subStage: 0, majorRealm: '金丹' },
  { name: '金丹中期', maxExp: 10000, hp: 1875, mp: 1500, atk: 225, def: 113, spd: 250, sense: 250, lifespan: 500, isMajor: false, subStage: 1, majorRealm: '金丹' },
  { name: '金丹后期', maxExp: 15000, hp: 2250, mp: 1800, atk: 270, def: 135, spd: 300, sense: 300, lifespan: 500, isMajor: false, subStage: 2, majorRealm: '金丹' },
  { name: '金丹圆满', maxExp: 20000, hp: 2625, mp: 2100, atk: 315, def: 158, spd: 350, sense: 350, lifespan: 500, isMajor: false, subStage: 3, majorRealm: '金丹' },

  // 元婴（4个小阶段）
  { name: '元婴初期', maxExp: 20000, hp: 4000, mp: 3500, atk: 500, def: 250, spd: 500, sense: 500, lifespan: 1000, isMajor: false, subStage: 0, majorRealm: '元婴' },
  { name: '元婴中期', maxExp: 40000, hp: 5000, mp: 4375, atk: 625, def: 313, spd: 625, sense: 625, lifespan: 1000, isMajor: false, subStage: 1, majorRealm: '元婴' },
  { name: '元婴后期', maxExp: 60000, hp: 6000, mp: 5250, atk: 750, def: 375, spd: 750, sense: 750, lifespan: 1000, isMajor: false, subStage: 2, majorRealm: '元婴' },
  { name: '元婴圆满', maxExp: 80000, hp: 7000, mp: 6125, atk: 875, def: 438, spd: 875, sense: 875, lifespan: 1000, isMajor: false, subStage: 3, majorRealm: '元婴' },

  // 化神（4个小阶段）
  { name: '化神初期', maxExp: 80000, hp: 10000, mp: 9000, atk: 1200, def: 600, spd: 1200, sense: 1200, lifespan: 2000, isMajor: false, subStage: 0, majorRealm: '化神' },
  { name: '化神中期', maxExp: 150000, hp: 12500, mp: 11250, atk: 1500, def: 750, spd: 1500, sense: 1500, lifespan: 2000, isMajor: false, subStage: 1, majorRealm: '化神' },
  { name: '化神后期', maxExp: 225000, hp: 15000, mp: 13500, atk: 1800, def: 900, spd: 1800, sense: 1800, lifespan: 2000, isMajor: false, subStage: 2, majorRealm: '化神' },
  { name: '化神圆满', maxExp: 300000, hp: 17500, mp: 15750, atk: 2100, def: 1050, spd: 2100, sense: 2100, lifespan: 2000, isMajor: false, subStage: 3, majorRealm: '化神' },

  // 炼虚（4个小阶段）
  { name: '炼虚初期', maxExp: 300000, hp: 30000, mp: 25000, atk: 3000, def: 1500, spd: 3000, sense: 3000, lifespan: 5000, isMajor: false, subStage: 0, majorRealm: '炼虚' },
  { name: '炼虚中期', maxExp: 500000, hp: 37500, mp: 31250, atk: 3750, def: 1875, spd: 3750, sense: 3750, lifespan: 5000, isMajor: false, subStage: 1, majorRealm: '炼虚' },
  { name: '炼虚后期', maxExp: 750000, hp: 45000, mp: 37500, atk: 4500, def: 2250, spd: 4500, sense: 4500, lifespan: 5000, isMajor: false, subStage: 2, majorRealm: '炼虚' },
  { name: '炼虚圆满', maxExp: 1000000, hp: 52500, mp: 43750, atk: 5250, def: 2625, spd: 5250, sense: 5250, lifespan: 5000, isMajor: false, subStage: 3, majorRealm: '炼虚' },

  // 合体（4个小阶段）
  { name: '合体初期', maxExp: 1000000, hp: 80000, mp: 70000, atk: 8000, def: 4000, spd: 8000, sense: 8000, lifespan: 10000, isMajor: false, subStage: 0, majorRealm: '合体' },
  { name: '合体中期', maxExp: 1500000, hp: 100000, mp: 87500, atk: 10000, def: 5000, spd: 10000, sense: 10000, lifespan: 10000, isMajor: false, subStage: 1, majorRealm: '合体' },
  { name: '合体后期', maxExp: 2250000, hp: 120000, mp: 105000, atk: 12000, def: 6000, spd: 12000, sense: 12000, lifespan: 10000, isMajor: false, subStage: 2, majorRealm: '合体' },
  { name: '合体圆满', maxExp: 3000000, hp: 140000, mp: 122500, atk: 14000, def: 7000, spd: 14000, sense: 14000, lifespan: 10000, isMajor: false, subStage: 3, majorRealm: '合体' },

  // 大乘（4个小阶段）
  { name: '大乘初期', maxExp: 3000000, hp: 200000, mp: 180000, atk: 20000, def: 10000, spd: 20000, sense: 20000, lifespan: 20000, isMajor: false, subStage: 0, majorRealm: '大乘' },
  { name: '大乘中期', maxExp: 5000000, hp: 250000, mp: 225000, atk: 25000, def: 12500, spd: 25000, sense: 25000, lifespan: 20000, isMajor: false, subStage: 1, majorRealm: '大乘' },
  { name: '大乘后期', maxExp: 7500000, hp: 300000, mp: 270000, atk: 30000, def: 15000, spd: 30000, sense: 30000, lifespan: 20000, isMajor: false, subStage: 2, majorRealm: '大乘' },
  { name: '大乘圆满', maxExp: 10000000, hp: 350000, mp: 315000, atk: 35000, def: 17500, spd: 35000, sense: 35000, lifespan: 20000, isMajor: false, subStage: 3, majorRealm: '大乘' },

  // 渡劫（4个小阶段）
  { name: '渡劫初期', maxExp: 10000000, hp: 500000, mp: 450000, atk: 50000, def: 25000, spd: 50000, sense: 50000, lifespan: 50000, isMajor: false, subStage: 0, majorRealm: '渡劫' },
  { name: '渡劫中期', maxExp: 15000000, hp: 625000, mp: 562500, atk: 62500, def: 31250, spd: 62500, sense: 62500, lifespan: 50000, isMajor: false, subStage: 1, majorRealm: '渡劫' },
  { name: '渡劫后期', maxExp: 22500000, hp: 750000, mp: 675000, atk: 75000, def: 37500, spd: 75000, sense: 75000, lifespan: 50000, isMajor: false, subStage: 2, majorRealm: '渡劫' },
  { name: '渡劫圆满', maxExp: 30000000, hp: 875000, mp: 787500, atk: 87500, def: 43750, spd: 87500, sense: 87500, lifespan: 50000, isMajor: false, subStage: 3, majorRealm: '渡劫' },

  // 真仙（4个小阶段）
  { name: '真仙初期', maxExp: 30000000, hp: 2000000, mp: 1800000, atk: 200000, def: 100000, spd: 200000, sense: 200000, lifespan: 100000, isMajor: false, subStage: 0, majorRealm: '真仙' },
  { name: '真仙中期', maxExp: 50000000, hp: 2500000, mp: 2250000, atk: 250000, def: 125000, spd: 250000, sense: 250000, lifespan: 100000, isMajor: false, subStage: 1, majorRealm: '真仙' },
  { name: '真仙后期', maxExp: 75000000, hp: 3000000, mp: 2700000, atk: 300000, def: 150000, spd: 300000, sense: 300000, lifespan: 100000, isMajor: false, subStage: 2, majorRealm: '真仙' },
  { name: '真仙圆满', maxExp: 100000000, hp: 3500000, mp: 3150000, atk: 350000, def: 175000, spd: 350000, sense: 350000, lifespan: 100000, isMajor: false, subStage: 3, majorRealm: '真仙' },

  // 金仙（4个小阶段）
  { name: '金仙初期', maxExp: 100000000, hp: 10000000, mp: 9000000, atk: 1000000, def: 500000, spd: 1000000, sense: 1000000, lifespan: 500000, isMajor: false, subStage: 0, majorRealm: '金仙' },
  { name: '金仙中期', maxExp: 200000000, hp: 12500000, mp: 11250000, atk: 1250000, def: 625000, spd: 1250000, sense: 1250000, lifespan: 500000, isMajor: false, subStage: 1, majorRealm: '金仙' },
  { name: '金仙后期', maxExp: 350000000, hp: 15000000, mp: 13500000, atk: 1500000, def: 750000, spd: 1500000, sense: 1500000, lifespan: 500000, isMajor: false, subStage: 2, majorRealm: '金仙' },
  { name: '金仙圆满', maxExp: 500000000, hp: 17500000, mp: 15750000, atk: 1750000, def: 875000, spd: 1750000, sense: 1750000, lifespan: 500000, isMajor: false, subStage: 3, majorRealm: '金仙' },

  // 太乙（4个小阶段）
  { name: '太乙初期', maxExp: 500000000, hp: 50000000, mp: 45000000, atk: 5000000, def: 2500000, spd: 5000000, sense: 5000000, lifespan: 1000000, isMajor: false, subStage: 0, majorRealm: '太乙' },
  { name: '太乙中期', maxExp: 800000000, hp: 62500000, mp: 56250000, atk: 6250000, def: 3125000, spd: 6250000, sense: 6250000, lifespan: 1000000, isMajor: false, subStage: 1, majorRealm: '太乙' },
  { name: '太乙后期', maxExp: 1200000000, hp: 75000000, mp: 67500000, atk: 7500000, def: 3750000, spd: 7500000, sense: 7500000, lifespan: 1000000, isMajor: false, subStage: 2, majorRealm: '太乙' },
  { name: '太乙圆满', maxExp: 2000000000, hp: 87500000, mp: 78750000, atk: 8750000, def: 4375000, spd: 8750000, sense: 8750000, lifespan: 1000000, isMajor: false, subStage: 3, majorRealm: '太乙' },

  // 大罗（4个小阶段）
  { name: '大罗初期', maxExp: 2000000000, hp: 200000000, mp: 180000000, atk: 20000000, def: 10000000, spd: 20000000, sense: 20000000, lifespan: 5000000, isMajor: false, subStage: 0, majorRealm: '大罗' },
  { name: '大罗中期', maxExp: 4000000000, hp: 250000000, mp: 225000000, atk: 25000000, def: 12500000, spd: 25000000, sense: 25000000, lifespan: 5000000, isMajor: false, subStage: 1, majorRealm: '大罗' },
  { name: '大罗后期', maxExp: 7000000000, hp: 300000000, mp: 270000000, atk: 30000000, def: 15000000, spd: 30000000, sense: 30000000, lifespan: 5000000, isMajor: false, subStage: 2, majorRealm: '大罗' },
  { name: '大罗圆满', maxExp: 10000000000, hp: 350000000, mp: 315000000, atk: 35000000, def: 17500000, spd: 35000000, sense: 35000000, lifespan: 5000000, isMajor: false, subStage: 3, majorRealm: '大罗' },

  // 道祖（无小阶段，终极境界）
  { name: '道祖', maxExp: Infinity, hp: 1000000000, mp: 900000000, atk: 100000000, def: 50000000, spd: 100000000, sense: 100000000, lifespan: Infinity, isMajor: true, subStage: 0 }
];

// 境界突破倍率（大境界突破）
export const BREAKTHROUGH_MULTIPLIER = [
  2.0, 2.5, 3.0, 3.0, 3.5,  // 人界
  4.0, 4.0, 4.5, 5.0,        // 灵界
  6.0, 6.0, 7.0, 8.0, 10.0   // 仙界
];

// 小阶段属性递进
export const SUB_STAGE_MULTIPLIER = [1.0, 1.25, 1.5, 1.75]; // 初期/中期/后期/圆满

// 判断是否是小境界突破（不需要消耗灵石）
export function isMinorBreakthrough(realmIdx) {
  const realm = REALMS[realmIdx];
  if (!realm) return false;
  if (realm.isMajor) return false; // 凡人/道祖无小阶段
  return realm.subStage < 3; // 初期→中期、中期→后期、后期→圆满
}

// 获取大境界名称
export function getMajorRealmName(realmIdx) {
  const realm = REALMS[realmIdx];
  if (!realm) return '';
  return realm.majorRealm || realm.name;
}
