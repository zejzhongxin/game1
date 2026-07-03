// NPC系统
export class NpcSystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  // 获取NPC好感度
  getFame(npcId) {
    const npc = this.gameState.npcs.find(n => n.id === npcId);
    return npc ? npc.fame : 0;
  }

  // 增加好感度
  addFame(npcId, amount) {
    let npc = this.gameState.npcs.find(n => n.id === npcId);

    if (!npc) {
      npc = { id: npcId, fame: 0 };
      this.gameState.npcs.push(npc);
    }

    npc.fame = Math.min(Math.max(npc.fame + amount, 0), 100);
    return npc.fame;
  }

  // 与NPC对话
  talk(npcId) {
    const { NPCS } = window.gameData;
    const npcData = NPCS.find(n => n.id === npcId);

    if (!npcData) {
      return { success: false, text: 'NPC不存在' };
    }

    // 检查玩家是否在NPC所在地
    const playerLocation = this.gameState.playerLocation;
    if (playerLocation !== npcData.location) {
      const locationNames = {
        'qingyun': '青云山', 'huangfeng': '黄枫谷', 'tianxing': '天星城',
        'modao': '魔岛', 'guzhan': '大晋古战场', 'dajin_city': '大晋皇都',
        'haizu': '海族海域', 'tiancheng': '天南城', 'heifeng': '黑风林',
        'feitai': '飞升台', 'tianyuan': '天渊城', 'wanyao': '万妖山脉',
        'feitian_pool': '飞升池', 'tianting': '天庭城', 'jiange': '剑仙阁',
        'dansheng': '丹圣谷', 'yuanchu': '源初秘境', 'lunhui': '轮回殿'
      };
      const npcLocationName = locationNames[npcData.location] || npcData.location;
      const playerLocationName = locationNames[playerLocation] || playerLocation;
      return { success: false, text: `${npcData.name}不在${playerLocationName}，他在${npcLocationName}` };
    }

    const fame = this.getFame(npcId);
    const dialogues = npcData.dialogues || {};
    if (!dialogues || Object.keys(dialogues).length === 0) {
      return { success: false, text: '无话可说' };
    }
    let dialogueLevel = 0;
    for (const level of Object.keys(dialogues).map(Number).sort((a, b) => a - b)) {
      if (fame >= level) {
        dialogueLevel = level;
      }
    }

    const dialogueList = dialogues[dialogueLevel];
    if (!dialogueList || dialogueList.length === 0) {
      return { success: false, text: '无话可说' };
    }

    // 随机选择一句对话
    const dialogue = dialogueList[Math.floor(Math.random() * dialogueList.length)];

    // 增加好感度
    this.addFame(npcId, 1);

    return {
      success: true,
      npc: npcData.name,
      text: dialogue,
      fame: fame + 1
    };
  }

  // 送礼
  giveGift(npcId, itemId) {
    const { ITEMS, NPCS } = window.gameData;
    const npcData = NPCS.find(n => n.id === npcId);
    const itemData = [...(ITEMS.pills || []), ...(ITEMS.materials || [])].find(i => i.id === itemId);

    if (!npcData || !itemData) {
      return { success: false, text: '无效的NPC或物品' };
    }

    // 检查玩家是否在NPC所在地
    const playerLocation = this.gameState.playerLocation;
    if (playerLocation !== npcData.location) {
      const locationNames = {
        'qingyun': '青云山', 'huangfeng': '黄枫谷', 'tianxing': '天星城',
        'modao': '魔岛', 'guzhan': '大晋古战场', 'dajin_city': '大晋皇都',
        'haizu': '海族海域', 'tiancheng': '天南城', 'heifeng': '黑风林',
        'feitai': '飞升台', 'tianyuan': '天渊城', 'wanyao': '万妖山脉',
        'feitian_pool': '飞升池', 'tianting': '天庭城', 'jiange': '剑仙阁',
        'dansheng': '丹圣谷', 'yuanchu': '源初秘境', 'lunhui': '轮回殿'
      };
      const npcLocationName = locationNames[npcData.location] || npcData.location;
      const playerLocationName = locationNames[playerLocation] || playerLocation;
      return { success: false, text: `${npcData.name}不在${playerLocationName}，他在${npcLocationName}` };
    }

    // 检查物品
    const item = this.gameState.inventory.find(i => i.id === itemId);
    if (!item || item.count <= 0) {
      return { success: false, text: '物品不足' };
    }

    // 消耗物品
    item.count--;
    if (item.count <= 0) {
      this.gameState.inventory.splice(this.gameState.inventory.indexOf(item), 1);
    }

    // 增加好感度（根据物品价值）
    const fameBonus = Math.min(Math.floor(itemData.cost / 10), 10);
    const newFame = this.addFame(npcId, fameBonus);

    return {
      success: true,
      text: `赠送${itemData.name}给${npcData.name}，好感度+${fameBonus}`,
      fame: newFame
    };
  }

  // 接取任务
  acceptQuest(npcId) {
    const { NPCS, QUESTS } = window.gameData;
    const npcData = NPCS.find(n => n.id === npcId);

    if (!npcData || !npcData.quests || npcData.quests.length === 0) {
      return { success: false, text: '没有可用的任务' };
    }

    // 检查是否已有任务
    const existingQuest = this.gameState.quests.find(q => q.npcId === npcId);
    if (existingQuest) {
      return { success: false, text: '你已经有这个任务了' };
    }

    const questId = npcData.quests[0];
    const questData = QUESTS[questId];

    if (!questData) {
      return { success: false, text: '任务数据不存在' };
    }

    // 接取任务
    this.gameState.quests.push({
      id: questId,
      npcId,
      name: questData.name,
      description: questData.description,
      currentStep: 0,
      steps: questData.steps,
      rewards: questData.rewards
    });

    return {
      success: true,
      text: `接取任务：${questData.name}`,
      quest: questData
    };
  }

  // 完成任务步骤
  completeQuestStep(questId) {
    const quest = this.gameState.quests.find(q => q.id === questId);

    if (!quest) {
      return { success: false, text: '任务不存在' };
    }

    quest.currentStep++;

    // 检查是否完成所有步骤
    if (quest.currentStep >= quest.steps.length) {
      const result = this.completeQuest(questId);
      return { ...result, completed: true, progress: `${quest.currentStep}/${quest.steps.length}` };
    }

    return {
      success: true,
      text: `任务进度：${quest.currentStep}/${quest.steps.length}`,
      progress: `${quest.currentStep}/${quest.steps.length}`,
      nextStep: quest.steps[quest.currentStep]
    };
  }

  // 完成任务
  completeQuest(questId) {
    const questIndex = this.gameState.quests.findIndex(q => q.id === questId);

    if (questIndex === -1) {
      return { success: false, text: '任务不存在' };
    }

    const quest = this.gameState.quests[questIndex];

    // 发放奖励
    if (quest.rewards) {
      if (quest.rewards.exp) {
        const maxExp = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.maxExp || 999999;
        this.gameState.player.exp = Math.min(this.gameState.player.exp + quest.rewards.exp, maxExp);
      }
      if (quest.rewards.fame) {
        this.gameState.player.fame += quest.rewards.fame;
      }
      if (quest.rewards.items) {
        quest.rewards.items.forEach(item => {
          this.gameState.inventory.push({
            id: item.id,
            count: item.count,
            type: 'material'
          });
        });
      }
      // 技能奖励：将技能书加入背包
      if (quest.rewards.skills) {
        quest.rewards.skills.forEach(skillId => {
          const { SKILLS } = window.gameData;
          const allSkills = [...(SKILLS.main || []), ...(SKILLS.sub || []), ...(SKILLS.combat || [])];
          const skillData = allSkills.find(s => s.id === skillId);
          if (skillData) {
            const existing = this.gameState.inventory.find(i => i.id === skillId && i.type === 'skill');
            if (existing) {
              existing.count++;
            } else {
              this.gameState.inventory.push({
                id: skillId,
                name: skillData.name,
                type: 'skill',
                icon: '📖',
                grade: skillData.grade,
                count: 1
              });
            }
          }
        });
      }
    }

    // 移除任务
    this.gameState.quests.splice(questIndex, 1);

    return {
      success: true,
      text: `完成任务：${quest.name}`,
      rewards: quest.rewards
    };
  }

  // 获取NPC列表
  getNpcList() {
    const { NPCS } = window.gameData;
    return NPCS.map(npc => ({
      ...npc,
      fame: this.getFame(npc.id)
    }));
  }

  // 根据ID获取单个NPC
  getNpcById(npcId) {
    const { NPCS } = window.gameData;
    const npc = NPCS.find(n => n.id === npcId);
    if (!npc) return null;
    return { ...npc, fame: this.getFame(npcId) };
  }

  // 检查NPC是否有进行中的任务步骤
  hasActiveQuestStep(npcId) {
    const quests = this.gameState.quests || [];
    return quests.some(q => {
      const step = q.steps?.[q.currentStep];
      return step && step.target === npcId;
    });
  }

  // 检查NPC是否已有任务在进行中（按npcId）
  hasActiveQuestFromNpc(npcId) {
    const quests = this.gameState.quests || [];
    return quests.some(q => q.npcId === npcId);
  }

  // === NPC关系网络 ===

  // 获取两NPC之间的关系
  getRelation(npcA, npcB) {
    const { NPC_RELATIONS } = window.gameData;
    if (!NPC_RELATIONS) return null;
    const rel = NPC_RELATIONS[npcA];
    if (!rel) return null;
    return rel[npcB] || null;
  }

  // 关系传播：操作影响关联NPC好感
  propagateFavor(npcId, action, value) {
    const { NPC_RELATIONS } = window.gameData;
    if (!NPC_RELATIONS || !NPC_RELATIONS[npcId]) return;

    const relations = NPC_RELATIONS[npcId];
    for (const [targetId, rel] of Object.entries(relations)) {
      if (targetId === 'player' || targetId === 'player_rescued') continue; // 跳过玩家自身
      const coefficient = rel.coefficient || 0;
      const propagatedValue = Math.round(value * coefficient * 0.5);
      if (propagatedValue === 0) continue;

      const targetNpc = this.gameState.npcs.find(n => n.id === targetId);
      if (targetNpc) {
        targetNpc.fame = Math.min(Math.max((targetNpc.fame || 0) + propagatedValue, 0), 100);
      }
    }
  }

  // 添加关系
  addRelation(playerId, npcId, type) {
    this.gameState.npcRelations = this.gameState.npcRelations || {};
    if (!this.gameState.npcRelations[npcId]) {
      this.gameState.npcRelations[npcId] = {};
    }
    this.gameState.npcRelations[npcId].type = type;
  }

  // 检查击杀NPC连锁后果
  checkKillConsequence(npcId) {
    const { NPC_RELATIONS } = window.gameData;
    const consequences = { actions: [], hostileNpcs: [], warnings: [] };

    // 记录击杀
    this.gameState.npcKilled = this.gameState.npcKilled || [];
    this.gameState.npcKilled.push(npcId);

    // 业力变化
    const npcData = (window.gameData.NPCS || []).find(n => n.id === npcId);
    if (npcData) {
      if (npcData.type === 'ally' || npcData.type === 'elder') {
        this.gameState.karma = Math.max(-100, (this.gameState.karma || 0) - 15);
      } else if (npcData.type === 'enemy') {
        this.gameState.karma = Math.min(100, (this.gameState.karma || 0) + 5);
      }
    }

    // 查询关系网络
    if (!NPC_RELATIONS || !NPC_RELATIONS[npcId]) return consequences;

    for (const [relatedId, rel] of Object.entries(NPC_RELATIONS[npcId])) {
      if (rel.type === 'sworn' || rel.type === 'daoCompanion') {
        consequences.actions.push(`${relatedId}是${npcId}的${rel.type === 'sworn' ? '挚友' : '道侣'}，必来复仇！`);
        consequences.hostileNpcs.push(relatedId);
        const target = this.gameState.npcs.find(n => n.id === relatedId);
        if (target) target.fame = -100;
      } else if (rel.type === 'master') {
        consequences.actions.push(`${relatedId}师门通缉你！`);
        consequences.hostileNpcs.push(relatedId);
      } else if (rel.type === 'friend') {
        consequences.actions.push(`${relatedId}对你的好感大幅下降(-50)`);
        const target = this.gameState.npcs.find(n => n.id === relatedId);
        if (target) target.fame = Math.max(0, (target.fame || 0) - 50);
      }
    }

    return consequences;
  }

  // === 双修系统 ===
  dualCultivate(npcId, mode) {
    const { NPC_DUAL_DATA } = window.gameData;
    const dualData = NPC_DUAL_DATA?.[npcId];
    if (!dualData || !dualData.available) {
      return { success: false, text: '此NPC无法双修。' };
    }

    const player = this.gameState.player;
    const npcFame = this.getFame(npcId);
    if (npcFame < dualData.minFavor) {
      return { success: false, text: `好感度不足（需要${dualData.minFavor}）。` };
    }

    const npcRealmIdx = this.getNpcRealmIdx(npcId);
    if (Math.abs(player.realmIdx - npcRealmIdx) > dualData.realmGap) {
      return { success: false, text: '境界差距过大，无法双修。' };
    }

    if (!dualData.modes.includes(mode)) {
      return { success: false, text: '此模式不可用。' };
    }

    // 检查元阴元阳是否已用
    if (mode === 'yinyuan') {
      this.gameState.dualRecords = this.gameState.dualRecords || {};
      if (this.gameState.dualRecords[npcId]?.yinyuanUsed) {
        return { success: false, text: '元阴元阳已经互济过了。' };
      }
    }

    // 各模式消耗和收益
    const modes = {
      normal: { days: 7, multi: 30, fameGain: 2, mpBonus: 0, btreakBonus: 0 },
      deep: { days: 15, multi: 80, fameGain: 5, mpBonus: 5, breakBonus: 0 },
      skillDual: { days: 30, multi: 150, fameGain: 10, mpBonus: 0, breakBonus: 3 },
      yinyuan: { days: 7, multi: 200, fameGain: 15, mpBonus: 0.1, breakBonus: 0 }
    };

    const cfg = modes[mode];
    if (!cfg) return { success: false, text: '无效的双修模式。' };

    // 进阶时间
    this.gameState.gameTime.day += cfg.days;
    this.gameState.gameTime.totalDays += cfg.days;
    player.age += cfg.days / 360;

    // 修为收益（使用修炼系统速度，而非不存在的expPerDay）
    const cultSpeed = window.game?.systems?.cultivation?.getCultivationSpeed() || 1.0;
    let expGain = Math.floor(cultSpeed * cfg.multi * cfg.days);
    // 钳制不超过当前境界上限
    const maxExp = window.gameData?.REALMS?.[player.realmIdx]?.maxExp || 999999;
    if (player.exp + expGain > maxExp) {
      expGain = Math.max(0, maxExp - player.exp);
    }
    player.exp = Math.min(player.exp + expGain, maxExp);

    // 好感度
    this.addFame(npcId, cfg.fameGain);

    // 灵力上限
    if (cfg.mpBonus) {
      if (mode === 'yinyuan') {
        player.maxMp = Math.floor(player.maxMp * 1.1);
        player.mp = Math.min(player.maxMp, player.mp + Math.floor(player.maxMp * 0.3));
        this.gameState.dualRecords = this.gameState.dualRecords || {};
        this.gameState.dualRecords[npcId] = { yinyuanUsed: true };
      } else {
        player.maxMp += cfg.mpBonus;
        player.mp += cfg.mpBonus;
      }
    }

    // 突破加成（临时）
    if (cfg.breakBonus) {
      this.gameState.breakthroughPill = this.gameState.breakthroughPill || { bonus: 0 };
      this.gameState.breakthroughPill.bonus += cfg.breakBonus;
    }

    // 双修统计（道侣成就）
    this.gameState.stats.dualCultivation = (this.gameState.stats.dualCultivation || 0) + 1;

    return {
      success: true,
      text: `双修完成！获得${expGain}修为${cfg.mpBonus ? '，灵力上限+' + cfg.mpBonus : ''}`,
      expGain,
      fame: npcFame + cfg.fameGain,
      mpBonus: cfg.mpBonus
    };
  }

  // 辅助：获取NPC境界索引
  getNpcRealmIdx(npcId) {
    const { NPCS } = window.gameData;
    const data = NPCS?.find(n => n.id === npcId);
    if (!data) return 0;
    const realmName = data.realm;
    if (!realmName) return 0;
    const realms = window.gameData.REALMS || [];
    const idx = realms.findIndex(r => r.name === realmName);
    return idx >= 0 ? idx : 0;
  }
}
