// 新手引导系统 - 完整版（GDD一比一还原）
export class TutorialSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 引导状态
    this.completed = false;
    this.currentStep = 0;
    this.optionalTasks = []; // 可选任务进度

    // 第一阶段·强制引导（3步，不可跳过）
    this.mandatorySteps = [
      {
        id: 'welcome',
        title: '欢迎来到凡人修仙传的世界',
        content: '这是一个修仙模拟器游戏，你将从一名散修开始，修炼成仙。\n\n接下来让我们快速了解游戏的基本操作。',
        target: null, // 不需要指向特定元素
        action: 'welcome', // 欢迎界面
        buttonText: '开始修仙！'
      },
      {
        id: 'first_meditate',
        title: '第一次修炼',
        content: '修仙的第一步是修炼。点击"打坐"按钮，消耗时间获得修为。\n\n修炼是提升境界的核心方式。',
        target: null,
        action: 'first_meditate', // 执行打坐操作
        buttonText: '试试打坐修炼'
      },
      {
        id: 'view_stats',
        title: '查看属性',
        content: '属性面板显示了你的气血、灵力、修为等关键数据。\n\n悟性影响修炼速度，机缘影响暴击和运气。',
        target: null,
        action: 'view_stats', // 查看属性
        buttonText: '了解属性'
      }
    ];

    // 第二阶段·可选引导（4个任务，可跳过）
    this.optionalSteps = [
      {
        id: 'explore_task',
        title: '探索一次',
        content: '切换到探索Tab，探索一个区域。',
        reward: { exp: 30 },
        action: 'explore'
      },
      {
        id: 'backpack_task',
        title: '打开背包',
        content: '查看你拥有的物品。',
        reward: { exp: 20 },
        action: 'open_backpack'
      },
      {
        id: 'npc_task',
        title: '认识一位NPC',
        content: '找到一位NPC并与其对话。',
        reward: { exp: 20, fame: 5 },
        action: 'talk_npc'
      },
      {
        id: 'breakthrough_task',
        title: '突破一次',
        content: '当修为足够时，尝试突破境界。',
        reward: { exp: 50, stones: 50 },
        action: 'breakthrough'
      }
    ];
  }

  // === 检查是否需要显示引导 ===
  shouldShowTutorial() {
    // 如果已完成或已经跳过，不再显示
    if (this.completed || this.gameState.tutorial?.skipped) return false;

    // 如果是新游戏（总游戏天数为0），显示引导
    return this.gameState.gameTime.totalDays === 0 && !this.gameState.tutorial?.completed;
  }

  // === 获取当前强制引导步骤 ===
  getCurrentMandatoryStep() {
    if (this.completed) return null;
    if (this.currentStep >= this.mandatorySteps.length) return null;
    return this.mandatorySteps[this.currentStep];
  }

  // === 完成当前强制引导步骤 ===
  completeMandatoryStep() {
    const currentStepData = this.getCurrentMandatoryStep();
    this.currentStep++;

    if (this.currentStep >= this.mandatorySteps.length) {
      this.completed = true;
      this.gameState.tutorial = this.gameState.tutorial || {};
      this.gameState.tutorial.mandatory = true;
      return { completed: true, message: '强制引导完成！', action: currentStepData?.action };
    }
    return { completed: false, nextStep: this.getCurrentMandatoryStep(), action: currentStepData?.action };
  }

  // === 跳过引导 ===
  skipTutorial() {
    this.completed = true;
    this.gameState.tutorial = this.gameState.tutorial || {};
    this.gameState.tutorial.skipped = true;
    return { success: true, message: '已跳过引导' };
  }

  // === 获取可选任务列表 ===
  getOptionalTasks() {
    return this.optionalSteps.map(step => ({
      ...step,
      completed: this.gameState.tutorial?.optional?.[step.id] || false
    }));
  }

  // === 检查可选任务完成 ===
  checkOptionalTask(taskId) {
    if (!this.gameState.tutorial) this.gameState.tutorial = {};
    if (!this.gameState.tutorial.optional) this.gameState.tutorial.optional = {};

    if (this.gameState.tutorial.optional[taskId]) return false; // 已完成

    const task = this.optionalSteps.find(s => s.id === taskId);
    if (!task) return false;

    // 标记完成
    this.gameState.tutorial.optional[taskId] = true;

    // 发放奖励
    if (task.reward) {
      if (task.reward.exp) {
        const maxExp = window.gameData?.REALMS?.[this.gameState.player.realmIdx]?.maxExp || 999999;
        this.gameState.player.exp = Math.min(this.gameState.player.exp + task.reward.exp, maxExp);
      }
      if (task.reward.stones) this.gameState.player.spiritStones += task.reward.stones;
      if (task.reward.fame) this.gameState.player.fame = (this.gameState.player.fame || 0) + task.reward.fame;
    }

    return { success: true, task: task.title, reward: task.reward };
  }

  // === 检查所有可选任务 ===
  checkAllOptionalTasks() {
    const results = [];

    // 检查探索任务
    if (this.gameState.stats?.explorations > 0 && !this.gameState.tutorial?.optional?.explore_task) {
      const result = this.checkOptionalTask('explore_task');
      if (result.success) results.push(result);
    }

    // 检查背包任务（已在某个时间点打开过背包）
    if (this.gameState.tutorial?.visitedBackpack && !this.gameState.tutorial?.optional?.backpack_task) {
      const result = this.checkOptionalTask('backpack_task');
      if (result.success) results.push(result);
    }

    // 检查NPC任务（已与NPC对话）
    // 改进：使用对话次数而不是NPC数组长度
    if ((this.gameState.stats?.npcTalks || 0) > 0 && !this.gameState.tutorial?.optional?.npc_task) {
      const result = this.checkOptionalTask('npc_task');
      if (result.success) results.push(result);
    }

    // 检查突破任务（已突破过）
    if (this.gameState.player.realmIdx > 0 && !this.gameState.tutorial?.optional?.breakthrough_task) {
      const result = this.checkOptionalTask('breakthrough_task');
      if (result.success) results.push(result);
    }

    return results;
  }

  // === 标记已打开背包 ===
  markBackpackVisited() {
    this.gameState.tutorial = this.gameState.tutorial || {};
    this.gameState.tutorial.visitedBackpack = true;
  }

  // === 获取引导进度 ===
  getProgress() {
    const mandatoryDone = this.currentStep / this.mandatorySteps.length;
    const optionalDone = Object.keys(this.gameState.tutorial?.optional || {}).length;
    const optionalTotal = this.optionalSteps.length;

    return {
      mandatory: Math.floor(mandatoryDone * 100),
      optional: Math.floor((optionalDone / optionalTotal) * 100),
      mandatorySteps: this.currentStep,
      mandatoryTotal: this.mandatorySteps.length,
      optionalSteps: optionalDone,
      optionalTotal: optionalTotal,
      completed: this.completed
    };
  }

  // === 渲染引导界面 ===
  renderTutorial() {
    const step = this.getCurrentMandatoryStep();
    if (!step) return null;

    return `
      <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:100;display:flex;align-items:center;justify-content:center">
        <div style="background:#1a1a2e;border-radius:12px;padding:20px;max-width:400px;width:90%;border:1px solid rgba(255,215,0,0.3)">
          <div style="color:#ffd700;font-size:16px;font-weight:bold;margin-bottom:12px">${step.title}</div>
          <div style="color:#ccc;font-size:13px;margin-bottom:16px;line-height:1.6">${step.content}</div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-primary" onclick="game.completeTutorialStep()" style="flex:1">${step.buttonText || '下一步'}</button>
            <button class="btn btn-heal" onclick="game.skipTutorial()" style="flex:0">跳过</button>
          </div>
          <div style="text-align:center;margin-top:8px;font-size:10px;color:#666">步骤 ${this.currentStep + 1}/${this.mandatorySteps.length}</div>
        </div>
      </div>
    `;
  }

  // === 渲染可选任务提示 ===
  renderOptionalHint() {
    const tasks = this.getOptionalTasks();
    const incomplete = tasks.filter(t => !t.completed);

    if (incomplete.length === 0) return '';

    return `
      <div class="card" style="border-color:rgba(76,175,80,0.3)">
        <h3 style="color:#4caf50">  新手任务</h3>
        <div style="font-size:11px;color:#aaa;margin-bottom:4px">完成可获得奖励</div>
        ${incomplete.map(task => `
          <div style="font-size:12px;color:#ccc;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
            ${task.title}
            ${task.reward ? `<span style="color:#ffd700;font-size:10px"> (奖励:${task.reward.exp ? task.reward.exp + '修为' : ''}${task.reward.stones ? task.reward.stones + '灵石' : ''})</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
}
