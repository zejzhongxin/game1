// 成就系统 - 完整版（GDD一比一还原，33个成就）
export class AchievementSystem {
  constructor(gameState) {
    this.gameState = gameState;
    this.achievements = this.loadAchievements();
  }

  // 加载成就数据（GDD第1406-1450行，33个成就）
  loadAchievements() {
    return [
      // ==================== 修炼类（9个）====================
      { id: 'first_meditate', name: '初次打坐', desc: '完成第一次修炼', category: 'cultivation', condition: (state) => state.gameTime?.totalDays > 0, reward: { exp: 50 } },
      { id: 'first_breakthrough', name: '初次突破', desc: '突破练气期', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 1, reward: { stones: 100 } },
      { id: 'foundation', name: '筑基有成', desc: '突破筑基', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 5, reward: { stones: 500, exp: 200 } },
      { id: 'golden_core', name: '金丹大成', desc: '突破金丹', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 9, reward: { stones: 2000, exp: 1000 } },
      { id: 'nascent_soul', name: '元婴出窍', desc: '突破元婴', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 13, reward: { stones: 10000, exp: 5000 } },
      { id: 'deity', name: '化神之巅', desc: '突破化神', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 17, reward: { stones: 50000, exp: 20000 } },
      { id: 'ascend_spirit', name: '飞升灵界', desc: '飞升成功', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 21, reward: { stones: 100000, exp: 100000 } },
      { id: 'ascend_immortal', name: '飞升仙界', desc: '飞升仙界', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 37, reward: { stones: 1000000, exp: 1000000 } },
      { id: 'dao_ancestor', name: '成就道祖', desc: '道祖(终极)', category: 'cultivation', condition: (state) => state.player?.realmIdx >= 86, reward: { stones: 99999999, exp: 99999999 } },

      // ==================== 探索类（5个）====================
      { id: 'first_explore', name: '初探世界', desc: '首次探索', category: 'exploration', condition: (state) => state.stats?.explorations > 0, reward: { stones: 50 } },
      { id: 'explorer_100', name: '探索者', desc: '总探索度100%', category: 'exploration', condition: (state) => this.checkExploration100(state), reward: { stones: 1000 } },
      { id: 'map_master', name: '地图大师', desc: '人界全区域100%', category: 'exploration', condition: (state) => this.checkAllRenjieExplored(state), reward: { stones: 5000 } },
      { id: 'dungeon_conqueror', name: '秘境征服者', desc: '通关任意秘境', category: 'exploration', condition: (state) => state.stats?.dungeonsCleared > 0, reward: { stones: 2000, exp: 1000 } },
      { id: 'xutian_lord', name: '虚天殿之主', desc: '通关虚天殿', category: 'exploration', condition: (state) => state.stats?.xutianCleared === true, reward: { stones: 10000, exp: 5000 } },

      // ==================== 收集类（8个）====================
      { id: 'first_pill', name: '炼丹入门', desc: '首炉丹药', category: 'collection', condition: (state) => state.stats?.pillsRefined > 0, reward: { exp: 100 } },
      { id: 'first_talisman', name: '制符入门', desc: '首张符箓', category: 'collection', condition: (state) => state.stats?.talismansCrafted > 0, reward: { exp: 100 } },
      { id: 'first_artifact', name: '炼器入门', desc: '首件法宝', category: 'collection', condition: (state) => state.stats?.artifactsForged > 0, reward: { exp: 100 } },
      { id: 'alchemy_master', name: '丹道大师', desc: '丹术Lv10', category: 'collection', condition: (state) => (state.alchemyLevel || 1) >= 10, reward: { stones: 5000 } },
      { id: 'talisman_master', name: '符道大师', desc: '制符Lv10', category: 'collection', condition: (state) => (state.talismanLevel || 1) >= 10, reward: { stones: 5000 } },
      { id: 'book_collector', name: '藏书家', desc: '收集10部功法', category: 'collection', condition: (state) => this.countSkills(state) >= 10, reward: { stones: 2000 } },
      { id: 'beast_friend', name: '灵兽伙伴', desc: '首只灵兽', category: 'collection', condition: (state) => (state.beasts?.length || 0) > 0, reward: { stones: 500 } },
      { id: 'puppet_master', name: '傀儡大师', desc: '5个傀儡', category: 'collection', condition: (state) => (state.puppets?.length || 0) >= 5, reward: { stones: 3000 } },

      // ==================== 社交类（3个）====================
      { id: 'first_friend', name: '初次交友', desc: '任意NPC好感≥40', category: 'social', condition: (state) => this.checkNpcFavor(state, 40), reward: { stones: 100 } },
      { id: 'best_friend', name: '至交好友', desc: '好感≥80', category: 'social', condition: (state) => this.checkNpcFavor(state, 80), reward: { stones: 2000 } },
      { id: 'dao_companion', name: '道侣', desc: '触发双修', category: 'social', condition: (state) => state.stats?.dualCultivation > 0, reward: { stones: 5000, exp: 2000 } },

      // ==================== 特殊类（8个）====================
      { id: 'swarm_1000', name: '噬金虫潮', desc: '噬金虫≥1000只', category: 'special', condition: (state) => this.checkBeastCount(state, 'shijin', 1000), reward: { stones: 10000 } },
      { id: 'bottle_master', name: '掌天瓶之谜', desc: '瓶完全炼化', category: 'special', condition: (state) => state.bottle?.evolveLevel >= 5, reward: { stones: 50000 } },
      { id: 'poor', name: '一贫如洗', desc: '灵石归零', category: 'special', condition: (state) => state.player?.spiritStones === 0, reward: { stones: 100 } },
      { id: 'young_foundation', name: '百岁筑基', desc: '100岁前筑基', category: 'special', condition: (state) => state.player?.age < 100 && state.player?.realmIdx >= 5, reward: { stones: 5000 } },
      { id: 'golden_core_200', name: '千年金丹', desc: '200岁前金丹', category: 'special', condition: (state) => state.player?.age < 200 && state.player?.realmIdx >= 9, reward: { stones: 10000 } },
      { id: 'hundred_battles', name: '百战之躯', desc: '100场胜利', category: 'special', condition: (state) => (state.stats?.victories || 0) >= 100, reward: { stones: 5000 } },
      { id: 'billionaire', name: '亿万富翁', desc: '累计获得灵石超1亿', category: 'special', condition: (state) => (state.stats?.totalStonesEarned || 0) >= 100000000, reward: { stones: 1000000 } },
      { id: 'heaven_root', name: '天选之子', desc: '天灵根开局', category: 'special', condition: (state) => state.player?.root?.type?.name === '天灵根', reward: { stones: 1000 } }
    ];
  }

  // 检查成就
  check() {
    const newAchievements = [];

    for (const achievement of this.achievements) {
      if (this.gameState.achievements?.includes(achievement.id)) {
        continue;
      }

      if (achievement.condition(this.gameState)) {
        this.gameState.achievements = this.gameState.achievements || [];
        this.gameState.achievements.push(achievement.id);
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  }

  // 获取成就列表
  getList() {
    return this.achievements.map(a => ({
      ...a,
      unlocked: this.gameState.achievements?.includes(a.id) || false
    }));
  }

  // 获取已解锁成就
  getUnlocked() {
    return this.achievements.filter(a => this.gameState.achievements?.includes(a.id));
  }

  // 获取成就进度
  getProgress() {
    const total = this.achievements.length;
    const unlocked = this.gameState.achievements?.length || 0;

    return {
      total,
      unlocked,
      percentage: Math.floor((unlocked / total) * 100)
    };
  }

  // 获取分类统计
  getCategoryStats() {
    const categories = {
      cultivation: { name: '修炼类', total: 0, unlocked: 0 },
      exploration: { name: '探索类', total: 0, unlocked: 0 },
      collection: { name: '收集类', total: 0, unlocked: 0 },
      social: { name: '社交类', total: 0, unlocked: 0 },
      special: { name: '特殊类', total: 0, unlocked: 0 }
    };

    for (const achievement of this.achievements) {
      const cat = categories[achievement.category];
      if (cat) {
        cat.total++;
        if (this.gameState.achievements?.includes(achievement.id)) {
          cat.unlocked++;
        }
      }
    }

    return categories;
  }

  // ==================== 辅助检查函数 ====================

  // 检查探索度100%
  checkExploration100(state) {
    if (!state.explored) return false;
    const { LOCATIONS } = window.gameData || {};
    if (!LOCATIONS) return false;
    
    let totalNodes = 0;
    let exploredNodes = 0;
    
    for (const region of Object.values(LOCATIONS)) {
      for (const location of region) {
        totalNodes++;
        if (state.explored[location.id] >= 100) {
          exploredNodes++;
        }
      }
    }
    
    return totalNodes > 0 && exploredNodes >= totalNodes;
  }

  // 检查人界全区域100%
  checkAllRenjieExplored(state) {
    if (!state.explored) return false;
    const { LOCATIONS } = window.gameData || {};
    if (!LOCATIONS) return false;
    
    const renjieLocations = LOCATIONS.renjie || [];
    if (renjieLocations.length === 0) return false;
    
    return renjieLocations.every(loc => (state.explored[loc.id] || 0) >= 100);
  }

  // 计算功法数量
  countSkills(state) {
    let count = 0;
    if (state.skills?.main) count++;
    if (state.skills?.sub) count += state.skills.sub.length;
    if (state.skills?.combat) count += state.skills.combat.length;
    return count;
  }

  // 检查NPC好感度
  checkNpcFavor(state, minFavor) {
    if (!state.npcs) return false;
    return state.npcs.some(npc => npc.fame >= minFavor);
  }

  // 检查灵兽数量
  checkBeastCount(state, beastId, minCount) {
    if (!state.beasts) return false;
    const beast = state.beasts.find(b => b.id === beastId);
    return beast && beast.count >= minCount;
  }
}