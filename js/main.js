// 主入口文件
import { REALMS, BREAKTHROUGH_MULTIPLIER, SUB_STAGE_MULTIPLIER } from './data/realms.js';
import { SKILLS, GRADE_VALUE } from './data/skills.js';
import { ITEMS, SHOP_ITEMS } from './data/items.js';
import { LOCATIONS, TRAVEL_MODES } from './data/locations.js';
import { NPCS, QUESTS, NPC_RELATIONS, NPC_DUAL_DATA } from './data/npcs.js';
import { BEASTS, BEAST_GRADE, calcSwarmPower } from './data/beasts.js';
import { EVENTS, ENEMIES, SECTS, BOTTLE_EVENTS, EVENT_LOCATION_TYPES, EVENT_TEXT_VARIANTS } from './data/events.js';
import { ARTIFACT_CATALOG, ARTIFACT_COMBAT_TYPES } from './data/artifact_catalog.js';
import { CombatSystem } from './systems/combat.js';
import { CultivationSystem } from './systems/cultivation.js';
import { BreakthroughSystem } from './systems/breakthrough.js';
import { ExplorationSystem } from './systems/exploration.js';
import { InventorySystem } from './systems/inventory.js';
import { SaveSystem } from './systems/save.js';
import { AlchemySystem } from './systems/alchemy.js';
import { NpcSystem } from './systems/npc.js';
import { SectSystem } from './systems/sect.js';
import { AchievementSystem } from './systems/achievement.js';
import { BodySystem } from './systems/body.js';
import { SenseSystem } from './systems/sense.js';
import { TalismanSystem } from './systems/talisman.js';
import { ArtifactSystem } from './systems/artifact.js';
import { BeastSystem } from './systems/beast.js';
import { SkillUpgradeSystem } from './systems/skill_upgrade.js';
import { PuppetSystem } from './systems/puppet.js';
import { BottleSystem } from './systems/bottle.js';
import { DeathSystem } from './systems/death.js';
import { DungeonSystem } from './systems/dungeon.js';
import { TradeSystem } from './systems/trade.js';
import { TimeSystem } from './systems/time.js';
import { TutorialSystem } from './systems/tutorial.js';
import { NotificationSystem } from './systems/notification.js';
import { DailySystem } from './systems/daily.js';
import { ForgeSystem } from './systems/forge.js';
import { EventChainSystem } from './systems/event_chain.js';
import { WeightSystem } from './systems/weight.js';
import { Renderer } from './ui/renderer.js';

// 注册全局数据
window.gameData = {
  REALMS, BREAKTHROUGH_MULTIPLIER, SUB_STAGE_MULTIPLIER,
  SKILLS, GRADE_VALUE,
  ITEMS, SHOP_ITEMS,
  LOCATIONS, TRAVEL_MODES,
  NPCS, QUESTS, NPC_RELATIONS, NPC_DUAL_DATA,
  BEASTS, BEAST_GRADE, calcSwarmPower,
  EVENTS, ENEMIES, SECTS, BOTTLE_EVENTS,
  EVENT_LOCATION_TYPES, EVENT_TEXT_VARIANTS,
  ARTIFACT_CATALOG, ARTIFACT_COMBAT_TYPES
};

// 游戏类
class Game {
  constructor() {
    this.state = this.getDefaultState();
    this.systems = {};
    this.renderer = null;
    this.init();
  }

  // 获取默认状态
  getDefaultState() {
    return {
      player: {
        name: '无名散修',
        gender: '男',
        age: 18,
        lifespan: 100,
        realmIdx: 0,
        exp: 0,
        root: this.generateRoot(),
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        atk: 10,
        def: 5,
        spd: 10,
        sense: 10,
        comprehension: Math.floor(Math.random() * 21) + 10,
        fortune: Math.floor(Math.random() * 21) + 10,
        fame: 0,
        spiritStones: 10,
        bodyExp: 0
      },
      inventory: [
        { id: 'herb', name: '灵草', icon: ' ', type: 'material', count: 5 },
        { id: 'heal_pill', name: '金创药', icon: ' ', type: 'pill', count: 3 },
        { id: 'stone', name: '灵石', icon: ' ', type: 'currency', count: 10 }
      ],
      skills: {
        main: { id: 'basic_art', name: '基础吐纳法', grade: '黄级', desc: '基础修炼功法', cultivationBonus: 1.0 },
        sub: [],
        combat: []
      },
      npcs: [],
      quests: [],
      achievements: [],
      sect: null,
      beasts: [],
      artifacts: [],
      puppets: [],
      bottle: null,
      body: { realmIdx: 0, level: 1, exp: 0 },
      talismanLevel: 1,
      talismanExp: 0,
      alchemyLevel: 1,
      alchemyExp: 0,
      puppetLevel: 0,
      gameTime: { day: 1, totalDays: 0 },
      currentLocation: null,
      playerLocation: 'qingyun',
      currentRegion: 'renjie',
      logs: [{ text: '欢迎来到凡人修仙传的世界。', type: '' }, { text: '你是一名散修，正在青云山修炼。', type: '' }],
      stats: { explorations: 0, combats: 0, victories: 0, pillsRefined: 0 },
      combatLog: [],
      breakthroughPill: null,
      ascendPrep: { body: false, artifact: false, pill: false },
      npcRelations: {},   // { npcId: { targetId: relationType } }
      npcKilled: [],      // 已击杀NPC列表
      karma: 0,           // -100~100 业力值
      dualRecords: {},    // { npcId: { modes: [], yinyuanUsed: false } }
      buffs: []
    };
  }

  // 生成灵根
  generateRoot() {
    const elements = ['金', '木', '水', '火', '土'];
    const values = [];
    let sum = 0;

    for (let i = 0; i < 5; i++) {
      const val = Math.random() * 100;
      values.push(val);
      sum += val;
    }

    const normalized = values.map(v => Math.round((v / sum) * 100));
    
    // 修正总和为100%
    const total = normalized.reduce((a, b) => a + b, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const maxIdx = normalized.indexOf(Math.max(...normalized));
      normalized[maxIdx] += diff;
    }

    const max = Math.max(...normalized);
    const maxIndex = normalized.indexOf(max);
    
    // 统计有多少个属性≥20%
    const highElements = normalized.filter(v => v >= 20).length;

    let type;
    if (max >= 80) {
      // 单一属性≥80%：天灵根
      type = { name: '天灵根', mult: 3.0, bonus: 20 };
    } else if (highElements === 2) {
      // 两个属性≥20%：双灵根
      type = { name: '双灵根', mult: 1.8, bonus: 12 };
    } else if (highElements === 3) {
      // 三个属性≥20%：三灵根
      type = { name: '三灵根', mult: 1.2, bonus: 5 };
    } else if (highElements === 4) {
      // 四个属性≥20%：四灵根
      type = { name: '四灵根', mult: 0.8, bonus: -5 };
    } else if (highElements === 5) {
      // 五个属性≥20%：五灵根（杂灵根）
      type = { name: '杂灵根', mult: 0.6, bonus: -10 };
    } else {
      // 伪灵根（没有任何属性≥20%）
      type = { name: '伪灵根', mult: 0.5, bonus: -20 };
    }

    // 确定主属性（最高的）
    const mainElement = elements[maxIndex];
    // 所有达标属性（≥20%）
    const mainElements = elements.filter((_, i) => normalized[i] >= 20);

    return {
      elements: { 
        '金': normalized[0], 
        '木': normalized[1], 
        '水': normalized[2], 
        '火': normalized[3], 
        '土': normalized[4] 
      },
      type,
      mainElement,
      mainElements
    };
  }

  // 显示创角界面
  showCharacterCreation() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        <div class="card">
          <h3>  角色创建</h3>
          <div style="text-align:center;margin:20px 0">
            <div style="font-size:48px;margin-bottom:10px">⚔️</div>
            <h2 style="color:#ffd700">凡人修仙传</h2>
            <p style="color:#aaa;font-size:12px">修仙之路，从今日开始</p>
          </div>
        </div>

        <div class="card">
          <h3>基本信息</h3>
          <div style="margin-bottom:10px">
            <label style="color:#aaa;font-size:12px">姓名</label>
            <input type="text" id="playerName" value="无名散修" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,215,0,0.3);background:rgba(0,0,0,0.3);color:#fff;font-size:14px">
          </div>
          <div style="margin-bottom:10px">
            <label style="color:#aaa;font-size:12px">性别</label>
            <div style="display:flex;gap:10px;margin-top:5px">
              <label style="cursor:pointer;color:#fff">
                <input type="radio" name="gender" value="男" checked> ♂ 男
              </label>
              <label style="cursor:pointer;color:#fff">
                <input type="radio" name="gender" value="女"> ♀ 女
              </label>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>天赋属性（总值50点）</h3>
          <div style="margin-bottom:10px">
            <label style="color:#aaa;font-size:12px">悟性</label>
            <div style="display:flex;align-items:center;gap:10px">
              <input type="range" id="comprehension" min="5" max="40" value="25" style="flex:1">
              <span id="compValue" style="color:#ffd700;min-width:30px">25</span>
            </div>
          </div>
          <div style="margin-bottom:10px">
            <label style="color:#aaa;font-size:12px">机缘</label>
            <div style="display:flex;align-items:center;gap:10px">
              <input type="range" id="fortune" min="5" max="40" value="25" style="flex:1">
              <span id="fortuneValue" style="color:#ffd700;min-width:30px">25</span>
            </div>
          </div>
          <div style="font-size:11px;color:#aaa;text-align:center;margin-top:5px">
            剩余点数：<span id="remainPoints" style="color:#4ad06a">0</span>/50
          </div>
        </div>

        <div class="card">
          <h3>灵根</h3>
          <div id="rootDisplay" style="text-align:center;padding:15px">
            <div style="font-size:24px;color:#ffd700;margin-bottom:10px">点击下方按钮生成灵根</div>
          </div>
          <button class="btn btn-primary" onclick="game.rollRoot()" style="width:100%;margin-bottom:10px">  生成灵根</button>
        </div>

        <div class="card">
          <button class="btn btn-explore" onclick="game.confirmCharacter()" style="width:100%;font-size:16px;padding:15px">⚔️ 开始修仙</button>
        </div>
      </div>
    `;

    // 绑定滑块事件（悟性和机缘总值50）
    const TOTAL_POINTS = 50;
    const compSlider = document.getElementById('comprehension');
    const fortuneSlider = document.getElementById('fortune');

    compSlider.addEventListener('input', (e) => {
      const comp = parseInt(e.target.value);
      const maxFortune = TOTAL_POINTS - comp;
      fortuneSlider.max = Math.max(5, maxFortune);
      if (parseInt(fortuneSlider.value) > maxFortune) {
        fortuneSlider.value = maxFortune;
      }
      document.getElementById('compValue').textContent = comp;
      document.getElementById('fortuneValue').textContent = fortuneSlider.value;
      document.getElementById('remainPoints').textContent = TOTAL_POINTS - comp - parseInt(fortuneSlider.value);
    });

    fortuneSlider.addEventListener('input', (e) => {
      const fortune = parseInt(e.target.value);
      const maxComp = TOTAL_POINTS - fortune;
      compSlider.max = Math.max(5, maxComp);
      if (parseInt(compSlider.value) > maxComp) {
        compSlider.value = maxComp;
      }
      document.getElementById('fortuneValue').textContent = fortune;
      document.getElementById('compValue').textContent = compSlider.value;
      document.getElementById('remainPoints').textContent = TOTAL_POINTS - parseInt(compSlider.value) - fortune;
    });

    // 初始显示剩余点数
    document.getElementById('remainPoints').textContent = '0';

    // 自动生成初始灵根
    this.rollRoot();
  }

  // 生成灵根显示
  rollRoot() {
    this.tempRoot = this.generateRoot();
    this.updateRootDisplay();
  }

  // 更新灵根显示
  updateRootDisplay() {
    const root = this.tempRoot;
    const display = document.getElementById('rootDisplay');
    if (!display) return;

    const elementColors = {
      '金': '#ffd700',
      '木': '#4caf50',
      '水': '#2196f3',
      '火': '#f44336',
      '土': '#795548'
    };

    const rootEls = root.mainElements || [root.mainElement];
    display.innerHTML = `
      <div style="font-size:18px;color:#ffd700;margin-bottom:10px">${root.type.name}（${rootEls.join('·')}）</div>
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:10px">
        ${Object.entries(root.elements).map(([el, val]) => `
          <div style="text-align:center">
            <div style="width:50px;height:50px;border-radius:50%;background:${elementColors[el]};display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;font-weight:bold">${el}</div>
            <div style="font-size:12px;color:#aaa;margin-top:4px">${val}%</div>
          </div>
        `).join('')}
      </div>
      <div style="font-size:11px;color:#aaa">修炼速度：x${root.type.mult} | 突破加成：${root.type.bonus > 0 ? '+' : ''}${root.type.bonus}%</div>
    `;
  }

  // 确认角色创建
  confirmCharacter() {
    try {
      const name = document.getElementById('playerName')?.value || '无名散修';
      const genderEl = document.querySelector('input[name="gender"]:checked');
      const gender = genderEl ? genderEl.value : '男';
      const comprehension = parseInt(document.getElementById('comprehension')?.value) || 25;
      const fortune = parseInt(document.getElementById('fortune')?.value) || 25;

      this.state.player.name = name;
      this.state.player.gender = gender;
      this.state.player.comprehension = comprehension;
      this.state.player.fortune = fortune;
      this.state.player.root = this.tempRoot;

      // 直接初始化系统并渲染界面（不调用init避免无限循环）
      this.initSystems();
      this.render();

      // 自动存档
      if (this._autoSave) clearInterval(this._autoSave);
      this._autoSave = setInterval(() => this.saveGame(), 60000);

      // 检查新手引导
      this.checkTutorial();

      console.log('角色创建完成，游戏开始');
    } catch (e) {
      console.error('角色创建失败:', e);
      alert('角色创建出错: ' + e.message);
    }
  }

  // 初始化系统（不检查存档）
  initSystems() {
    // 初始化系统
    this.systems.combat = new CombatSystem(this.state);
    this.systems.cultivation = new CultivationSystem(this.state);
    this.systems.breakthrough = new BreakthroughSystem(this.state);
    this.systems.exploration = new ExplorationSystem(this.state);
    this.systems.inventory = new InventorySystem(this.state);
    this.systems.save = new SaveSystem(this.state);
    this.systems.alchemy = new AlchemySystem(this.state);
    this.systems.npc = new NpcSystem(this.state);
    this.systems.sect = new SectSystem(this.state);
    this.systems.achievement = new AchievementSystem(this.state);
    this.systems.body = new BodySystem(this.state);
    this.systems.sense = new SenseSystem(this.state);
    this.systems.talisman = new TalismanSystem(this.state);
    this.systems.artifact = new ArtifactSystem(this.state);
    this.systems.beast = new BeastSystem(this.state);
    this.systems.skillUpgrade = new SkillUpgradeSystem(this.state);
    this.systems.puppet = new PuppetSystem(this.state);
    this.systems.bottle = new BottleSystem(this.state);
    this.systems.death = new DeathSystem(this.state);
    this.systems.dungeon = new DungeonSystem(this.state);
    this.systems.trade = new TradeSystem(this.state);
    this.systems.time = new TimeSystem(this.state);
    this.systems.tutorial = new TutorialSystem(this.state);
    this.systems.notification = new NotificationSystem(this.state);
    this.systems.daily = new DailySystem(this.state);
    this.systems.forge = new ForgeSystem(this.state);
    this.systems.eventChain = new EventChainSystem(this.state);
    this.systems.weight = new WeightSystem(this.state);

    this.renderer = new Renderer(this.state);
  }

  // 初始化
  init() {
    // 初始化系统
    this.initSystems();

    // 检查是否有存档（自动读档）
    const hasSave = localStorage.getItem('xiuxian_save_auto');
    if (!hasSave) {
      // 没有存档，显示创角界面
      this.showCharacterCreation();
      return;
    }

    // 加载存档
    this.loadGame();

    // 渲染界面
    this.render();

    // 自动存档
    if (this._autoSave) clearInterval(this._autoSave);
    this._autoSave = setInterval(() => this.saveGame(), 60000);

    // 检查新手引导
    this.checkTutorial();

    console.log('游戏初始化完成');
  }

  // === 新手引导系统 ===

  // 检查是否需要显示引导
  checkTutorial() {
    if (this.systems.tutorial.shouldShowTutorial()) {
      this.showTutorialOverlay();
    }
  }

  // 显示引导遮罩
  showTutorialOverlay() {
    const tutorialHtml = this.systems.tutorial.renderTutorial();
    if (!tutorialHtml) return;

    const overlay = document.createElement('div');
    overlay.id = 'tutorial-overlay';
    overlay.innerHTML = tutorialHtml;
    document.body.appendChild(overlay);
  }

  // 移除引导遮罩
  removeTutorialOverlay() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) overlay.remove();
  }

  // 完成引导步骤
  completeTutorialStep() {
    const result = this.systems.tutorial.completeMandatoryStep();
    this.removeTutorialOverlay();

    // 根据当前步骤执行对应操作
    if (result.action === 'first_meditate') {
      // 第二步：执行打坐
      this.meditate(1);
    } else if (result.action === 'view_stats') {
      // 第三步：显示属性面板（已经是主界面，属性面板已显示）
    }

    if (result.completed) {
      this.addLog('新手引导完成！', 'highlight');
      this.render();
    } else {
      this.showTutorialOverlay();
    }
  }

  // 跳过引导
  skipTutorial() {
    this.systems.tutorial.skipTutorial();
    this.removeTutorialOverlay();
    this.addLog('已跳过新手引导', '');
    this.render();
  }

  // 检查可选任务
  checkOptionalTasks() {
    const results = this.systems.tutorial.checkAllOptionalTasks();
    results.forEach(r => {
      this.addLog(`完成任务：${r.task}，获得奖励！`, 'highlight');
      // 显示奖励详情悬浮弹窗
      let rewardText = `完成任务：${r.task}`;
      if (r.reward) {
        const rewards = [];
        if (r.reward.exp) rewards.push(`${r.reward.exp}修为`);
        if (r.reward.stones) rewards.push(`${r.reward.stones}灵石`);
        if (r.reward.fame) rewards.push(`${r.reward.fame}名望`);
        if (rewards.length > 0) {
          rewardText += `，获得：${rewards.join('、')}`;
        }
      }
      this.showToast(rewardText, 'success');
    });
    if (results.length > 0) this.render();
  }

  // 渲染界面
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    // 全局钳制：绝不让修为溢出上限（最后一层防线）
    const player = this.state.player;
    const realms = window.gameData?.REALMS || [];
    const realm = realms[player.realmIdx] || {};
    const maxExp = realm.maxExp || 120;
    if (player.exp > maxExp) {
      player.exp = maxExp;
    }

    try {
    const currentRealm = realm;
    const nextRealm = realms[player.realmIdx + 1];
    const expPercent = Math.min((player.exp / (currentRealm.maxExp || 120)) * 100, 100);
    const speed = this.systems?.cultivation?.getCultivationSpeed?.() || 1.0;
    const daysToNext = nextRealm ? Math.ceil((currentRealm.maxExp - player.exp) / speed) : '∞';

    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        ${this.renderer.renderStatsPanel()}
        ${this.renderer.renderRootPanel()}

        <div class="card">
          <h3> 修炼状态</h3>
          <div style="font-size:12px;margin-bottom:8px">
            <div style="display:flex;justify-content:space-between">
              <span>当前境界：${currentRealm.name}</span>
              <span>修为：${player.exp}/${currentRealm.maxExp}</span>
            </div>
            <div class="bar" style="margin:4px 0">
              <div class="fill fill-exp" style="width:${expPercent}%"></div>
            </div>
            <div style="color:#aaa;font-size:11px">
              修炼速度：${this.systems.cultivation.getCultivationSpeed().toFixed(1)}修为/天
              ${nextRealm ? ` | 突破还需约${daysToNext}天` : ''}
            </div>
          </div>
        </div>

        <div class="card">
          <h3>日志</h3>
          ${this.renderer.renderLogs()}
        </div>
        ${this.systems.tutorial.getProgress().mandatory === 100 ? this.systems.tutorial.renderOptionalHint() : ''}

        <div class="nav-bar">
          <div class="nav-item active" onclick="game.showPage('home')" style="position:relative">  首页 ${this.systems.notification.renderRedDot(this.systems.notification.getRedDot('home'))}</div>
          <div class="nav-item" onclick="game.showPage('explore')" style="position:relative"> ️ 探索 ${this.systems.notification.renderRedDot(this.systems.notification.getRedDot('explore'))}</div>
          <div class="nav-item" onclick="game.showPage('cultivation')" style="position:relative">  修炼</div>
          <div class="nav-item" onclick="game.showPage('inventory')" style="position:relative">  背包</div>
          <div class="nav-item" onclick="game.showPage('more')" style="position:relative">  更多</div>
        </div>
      </div>
    `;
    } catch (e) {
      console.error('渲染失败:', e);
      app.innerHTML = `<div class="game"><div class="card"><h3>渲染错误</h3><pre style="color:#e74c3c;font-size:12px;white-space:pre-wrap">${e.message}\n${e.stack}</pre><button class="btn btn-primary" onclick="location.reload()">刷新页面</button></div></div>`;
    }
  }

  // 获取物品数量
  getItemCount(itemId) {
    const item = this.state.inventory.find(i => i.id === itemId);
    return item ? item.count : 0;
  }

  // 背包分类筛选
  filterInventory(category) {
    const app = document.getElementById('app');
    if (!app) return;

    // 重新渲染背包页面，传入筛选类别
    const content = `
      <div class="card">
        <h3>背包</h3>
        ${this.renderer.renderInventory(category)}
      </div>
    `;

    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        ${content}
        <div class="nav-bar">
          <div class="nav-item" onclick="game.showPage('home')" style="position:relative">  首页 ${this.systems.notification.renderRedDot(this.systems.notification.getRedDot('home'))}</div>
          <div class="nav-item" onclick="game.showPage('explore')" style="position:relative"> ️ 探索 ${this.systems.notification.renderRedDot(this.systems.notification.getRedDot('explore'))}</div>
          <div class="nav-item" onclick="game.showPage('cultivation')" style="position:relative">  修炼</div>
          <div class="nav-item" onclick="game.showPage('inventory')" style="position:relative">  背包</div>
          <div class="nav-item" onclick="game.showPage('more')" style="position:relative">  更多</div>
        </div>
      </div>
    `;
  }

  // 休养（恢复气血，比例随境界递减）
  rest(days) {
    const player = this.state.player;
    const realmIdx = player.realmIdx || 0;

    // 根据境界确定恢复比例
    let dayRate1, dayRate3;
    if (realmIdx <= 1) {       // 凡人~练气
      dayRate1 = 0.15; dayRate3 = 0.35;
    } else if (realmIdx <= 3) { // 筑基~金丹
      dayRate1 = 0.10; dayRate3 = 0.25;
    } else if (realmIdx <= 5) { // 元婴~化神
      dayRate1 = 0.08; dayRate3 = 0.20;
    } else if (realmIdx <= 8) { // 炼虚~大乘
      dayRate1 = 0.05; dayRate3 = 0.12;
    } else {                    // 渡劫以上
      dayRate1 = 0.03; dayRate3 = 0.08;
    }

    const healPercent = days === 1 ? dayRate1 : dayRate3;
    const healAmount = Math.floor(player.maxHp * healPercent);
    const oldHp = player.hp;
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    const actualHeal = player.hp - oldHp;

    this.addLog(`休养${days}天，气血+${actualHeal}（${player.hp}/${player.maxHp}）`, 'success');
    this.showToast(`休养${days}天，恢复${actualHeal}气血`, 'success');

    // 使用时间系统8步结算
    const timeResults = this.systems.time.advanceTime(days);
    timeResults.forEach(r => {
      if (r && r.message) this.addLog(r.message, r.type === 'lifespan_warning' ? 'warning' : r.type === 'special_event' ? 'highlight' : '');
    });

    this.checkBreakthrough();
    this.checkAchievements();
    this.checkDeath();
    this.showPage('cultivation');
  }

  // 打坐修炼（使用时间系统8步结算）
  meditate(days) {
    // 修为上限检查
    const player = this.state.player;
    const realms = window.gameData?.REALMS || [];
    const realm = realms[player.realmIdx] || {};
    const maxExp = realm.maxExp || 120;
    if (player.exp >= maxExp) {
      this.showToast('修为已达上限，请先突破！', 'warning');
      this.showPage('breakthrough');
      return;
    }
    const result = this.systems.cultivation.meditate(days, maxExp);
    const expGain = result.expGain;
    this.addLog(`打坐${days}天，修为+${expGain}`, 'success');
    this.showToast(`打坐${days}天完成，修为+${expGain}`, 'success');

    // 修炼随机事件日志
    if (result.event) {
      this.addLog(result.event.text, 'highlight');
      this.showToast(`   ${result.event.name}`, 'highlight');
    }

    // 二次确保险钳：绝不超过上限
    if (this.state.player.exp > maxExp) {
      this.state.player.exp = maxExp;
    }

    // 功法获得经验
    if (this.state.skills.main) {
      const skillExp = this.systems.skillUpgrade.gainExp(this.state.skills.main.id, 'main', days);
      if (skillExp > 0) {
        this.addLog(`主修功法${this.state.skills.main.name}经验+${skillExp}`, 'info');
      }
    }

    // 使用时间系统8步结算
    const timeResults = this.systems.time.advanceTime(days);
    timeResults.forEach(r => {
      if (r && r.message) this.addLog(r.message, r.type === 'lifespan_warning' ? 'warning' : r.type === 'special_event' ? 'highlight' : '');
      if (r && r.name) this.addLog(`特殊事件：${r.name} - ${r.effect}`, 'highlight');
    });

    this.checkBreakthrough();
    this.checkAchievements();
    this.checkDeath();
    this.checkIncubation();
    // 留在修炼界面
    this.saveGame();
    this.showPage('cultivation');
  }
  
  // 预揽修炼收益（输入天数变化时自动计算）
  previewCultivate() {
    const input = document.getElementById('cultivateDays');
    const preview = document.getElementById('cultivatePreview');
    if (!input || !preview) return;
    const days = Math.max(1, Math.min(90, parseInt(input.value) || 7));
    input.value = days;
    const speed = this.systems.cultivation.getCultivationSpeed();
    const minGain = Math.floor(speed * days * 5 * 0.8);
    const maxGain = Math.floor(speed * days * 5 * 1.2);
    // 钳制到上限
    const maxExp = window.gameData?.REALMS?.[this.state.player.realmIdx]?.maxExp || 999999;
    const remaining = Math.max(0, maxExp - this.state.player.exp);
    preview.innerHTML = `预计修为：${Math.min(minGain, remaining)} ~ ${Math.min(maxGain, remaining)}` + 
      (remaining < maxGain ? ` <span style="color:#ffd700">（已达上限）</span>` : '');
  }

  // 自定义天数修炼
  startCustomCultivate() {
    const input = document.getElementById('cultivateDays');
    const days = Math.max(1, Math.min(90, parseInt(input?.value) || 7));
    this.meditate(days);
  }
  
  // 学习功法（从背包中学习）
  learnSkill(skillId) {
    const { SKILLS } = window.gameData;
    const allSkills = [...(SKILLS.main || []), ...(SKILLS.sub || []), ...(SKILLS.combat || [])];
    const skillData = allSkills.find(s => s.id === skillId);
    if (!skillData) {
      this.showToast('功法数据不存在', 'error');
      return;
    }
    // 检查是否已学
    const state = this.state;
    const isMain = SKILLS.main?.some(s => s.id === skillId);
    const isSub = SKILLS.sub?.some(s => s.id === skillId);
    const isCombat = SKILLS.combat?.some(s => s.id === skillId);
    if (isMain && state.skills.main?.id === skillId) { this.showToast('已学过此功法', 'warning'); return; }
    if (isSub && state.skills.sub?.some(s => s.id === skillId)) { this.showToast('已学过此功法', 'warning'); return; }
    if (isCombat && state.skills.combat?.some(s => s.id === skillId)) { this.showToast('已学过此功法', 'warning'); return; }
    // 学习
    if (isMain) state.skills.main = { ...skillData, level: 1, exp: 0 };
    else if (isSub) { state.skills.sub = state.skills.sub || []; state.skills.sub.push({ ...skillData, level: 1, exp: 0 }); }
    else { state.skills.combat = state.skills.combat || []; state.skills.combat.push({ ...skillData, level: 1, exp: 0 }); }
    // 从背包移除
    const invIdx = state.inventory.findIndex(i => i.id === skillId);
    if (invIdx >= 0) {
      if (state.inventory[invIdx].count > 1) state.inventory[invIdx].count--;
      else state.inventory.splice(invIdx, 1);
    }
    this.addLog(`学习了功法：${skillData.name}`, 'success');
    this.showToast(`学习了${skillData.name}`, 'success');
    this.render();
  }

  // 显示功法详情
  showSkillDetail(skillId, skillType) {
    const { SKILLS } = window.gameData;
    const allSkills = [...(SKILLS.main || []), ...(SKILLS.sub || []), ...(SKILLS.combat || [])];
    const skillData = allSkills.find(s => s.id === skillId);
    
    if (!skillData) {
      this.showToast('功法数据不存在', 'warning');
      return;
    }

    // 获取当前功法等级
    const currentSkill = this.state.skills[skillType === 'main' ? 'main' : skillType];
    const level = currentSkill?.level || 1;
    const maxLevel = skillData.maxLevel || 10;

    // 获取升级信息
    const upgradeInfo = this.systems.skillUpgrade.getSkillUpgradeInfo(skillId, skillType);

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <button class="btn btn-heal" onclick="game.showPage('skills')" style="width:100%;margin-bottom:12px">← 返回功法列表</button>

          <div style="text-align:center;margin-bottom:12px">
            <div style="font-size:24px;color:#ffd700;margin-bottom:4px">${skillData.name}</div>
            <div style="font-size:12px;color:#aaa">${skillData.grade} · ${skillData.element || '无'}属性</div>
          </div>

          <div style="padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#4fc3f7;margin-bottom:6px">功法描述</div>
            <div style="font-size:12px;color:#ccc;line-height:1.5">${skillData.desc}</div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px">
            <div style="padding:8px;background:rgba(255,215,0,0.1);border-radius:6px;text-align:center">
              <div style="font-size:10px;color:#aaa">等级</div>
              <div style="font-size:14px;color:#ffd700;font-weight:bold">Lv.${level}/${maxLevel}</div>
            </div>
            <div style="padding:8px;background:rgba(79,195,247,0.1);border-radius:6px;text-align:center">
              <div style="font-size:10px;color:#aaa">修炼加成</div>
              <div style="font-size:14px;color:#4fc3f7;font-weight:bold">x${skillData.cultivationBonus || 1.0}</div>
            </div>
          </div>

          ${skillType === 'combat' ? `
            <div style="padding:10px;background:rgba(231,76,60,0.1);border-radius:8px;margin-bottom:12px">
              <div style="font-size:11px;color:#e74c3c;margin-bottom:6px">⚔️ 战斗属性</div>
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px">
                <div><span style="color:#aaa">伤害倍率:</span> <span style="color:#fff">${skillData.damage || 1.0}x</span></div>
                <div><span style="color:#aaa">灵力消耗:</span> <span style="color:#fff">${skillData.mpCost || 0}</span></div>
                <div><span style="color:#aaa">暴击率:</span> <span style="color:#fff">0%</span></div>
                <div><span style="color:#aaa">特殊效果:</span> <span style="color:#fff">${skillData.special || skillData.desc || '无'}</span></div>
              </div>
            </div>
          ` : `
            <div style="padding:10px;background:rgba(76,175,80,0.1);border-radius:8px;margin-bottom:12px">
              <div style="font-size:11px;color:#4caf50;margin-bottom:6px">  修炼属性</div>
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px">
                <div><span style="color:#aaa">修炼速度:</span> <span style="color:#fff">+${((skillData.cultivationBonus - 1) * 100).toFixed(0)}%</span></div>
                <div><span style="color:#aaa">突破加成:</span> <span style="color:#fff">+${skillData.breakthroughBonus || 0}%</span></div>
                <div><span style="color:#aaa">灵力消耗:</span> <span style="color:#fff">${skillData.mpCost || 0}/天</span></div>
                <div><span style="color:#aaa">特殊效果:</span> <span style="color:#fff">${skillData.special || skillData.desc || '无'}</span></div>
              </div>
            </div>
          `}

          <div style="padding:10px;background:rgba(155,89,182,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#9b59b6;margin-bottom:6px">  获取方式</div>
            <div style="font-size:11px;color:#aaa">${skillData.source || '未知'}</div>
          </div>

          ${skillType === 'main' ? `
            <div style="font-size:10px;color:#aaa;text-align:center">
              * 主修功法决定你的修炼方向，切换需要转修期（黄级5天/玄级10天/地级15天/天级20天/灵级30天/仙级50天/神级100天）
            </div>
          ` : ''}

          ${upgradeInfo ? `
            <div style="padding:12px;background:rgba(76,175,80,0.1);border-radius:8px;border:1px solid rgba(76,175,80,0.3);margin-top:12px">
              <div style="font-size:12px;color:#4caf50;font-weight:bold;margin-bottom:8px">  功法升级</div>

              <div style="margin-bottom:8px">
                <div style="font-size:11px;color:#aaa;margin-bottom:4px">经验进度: ${upgradeInfo.exp}/${upgradeInfo.expRequired}</div>
                <div style="height:6px;background:rgba(0,0,0,0.3);border-radius:3px;overflow:hidden">
                  <div style="height:100%;width:${upgradeInfo.expPercent}%;background:linear-gradient(90deg,#4caf50,#8bc34a);transition:width 0.3s"></div>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px;margin-bottom:8px">
                <div><span style="color:#aaa">当前加成:</span> <span style="color:#fff">x${upgradeInfo.currentBonus.toFixed(2)}</span></div>
                <div><span style="color:#aaa">升级加成:</span> <span style="color:#4caf50">x${upgradeInfo.nextBonus.toFixed(2)}</span></div>
                <div><span style="color:#aaa">灵石消耗:</span> <span style="color:#ffd700">${upgradeInfo.cost}灵石</span></div>
                ${upgradeInfo.materials ? `
                  <div><span style="color:#aaa">突破材料:</span> <span style="color:#ff9800">${upgradeInfo.materials.map(m => `${m.name}x${m.count}`).join(', ')}</span></div>
                ` : ''}
              </div>

              ${upgradeInfo.awakenEffect ? `
                <div style="padding:6px;background:rgba(255,215,0,0.1);border-radius:6px;margin-bottom:8px">
                  <div style="font-size:10px;color:#ffd700">Lv.${level + 1}觉醒: ${upgradeInfo.awakenEffect.name}</div>
                  <div style="font-size:10px;color:#aaa">${upgradeInfo.awakenEffect.desc}</div>
                </div>
              ` : ''}

              <button class="btn btn-primary" onclick="game.upgradeSkill('${skillId}', '${skillType}')" ${upgradeInfo.canUpgrade ? '' : 'disabled'} style="width:100%">
                ${upgradeInfo.canUpgrade ? '升级功法' : '条件不足'}
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 显示物品详情
  showItemDetail(itemId) {
    const { ITEMS } = window.gameData;
    // 按类别查找以确定类型
    let itemData = null;
    let itemCategory = 'material';
    const categories = [
      { key: 'pills', type: 'pill' },
      { key: 'talismans', type: 'talisman' },
      { key: 'artifacts', type: 'artifact' },
      { key: 'specials', type: 'special' },
      { key: 'materials', type: 'material' }
    ];
    for (const cat of categories) {
      const arr = ITEMS[cat.key] || [];
      const found = arr.find(i => i.id === itemId);
      if (found) {
        itemData = found;
        itemCategory = cat.type;
        break;
      }
    }

    if (!itemData) {
      this.showToast('物品数据不存在', 'warning');
      return;
    }

    // 获取背包中的物品
    const inventoryItem = this.state.inventory.find(i => i.id === itemId);
    const count = inventoryItem?.count || 0;

    if (count === 0) {
      this.showToast('你没有这个物品', 'warning');
      return;
    }

    // 获取物品详情
    const weight = window.game?.systems?.weight?.getItemWeight(itemId) || 0;
    const totalWeight = weight * count;

    // 根据物品类型显示不同信息
    let typeInfo = '';
    let actionButtons = '';

    switch (itemCategory) {
      case 'pill':
        typeInfo = `
          <div style="padding:10px;background:rgba(76,175,80,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#4caf50;margin-bottom:6px">  丹药效果</div>
            <div style="font-size:12px;color:#fff;line-height:1.5">${itemData.desc || ''}</div>
            ${itemData.cooldown ? `<div style="font-size:10px;color:#aaa;margin-top:4px">冷却: ${itemData.cooldown}天</div>` : ''}
          </div>
        `;
        actionButtons = `
          <button class="btn btn-primary" onclick="game.useItem('${itemId}');game.showPage('inventory')" style="width:100%;margin-bottom:8px">使用</button>
          <button class="btn btn-heal" onclick="game.showPage('inventory')" style="width:100%">返回背包</button>
        `;
        break;

      case 'talisman':
        typeInfo = `
          <div style="padding:10px;background:rgba(155,89,182,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#9b59b6;margin-bottom:6px">  符箓效果</div>
            <div style="font-size:12px;color:#fff;line-height:1.5">${itemData.desc || ''}</div>
            ${itemData.uses ? `<div style="font-size:10px;color:#aaa;margin-top:4px">可用次数: ${itemData.uses}</div>` : ''}
          </div>
        `;
        actionButtons = `
          <button class="btn btn-primary" onclick="game.useItem('${itemId}');game.showPage('inventory')" style="width:100%;margin-bottom:8px">使用</button>
          <button class="btn btn-heal" onclick="game.showPage('inventory')" style="width:100%">返回背包</button>
        `;
        break;

      case 'artifact':
        typeInfo = `
          <div style="padding:10px;background:rgba(241,196,15,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#f1c40f;margin-bottom:6px">⚔️ 法宝属性</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px">
              <div><span style="color:#aaa">攻击力:</span> <span style="color:#fff">+${itemData.atk || 0}</span></div>
              <div><span style="color:#aaa">防御力:</span> <span style="color:#fff">+${itemData.def || 0}</span></div>
              <div><span style="color:#aaa">特殊效果:</span> <span style="color:#fff">${itemData.special || '无'}</span></div>
              <div><span style="color:#aaa">耐久度:</span> <span style="color:#fff">${itemData.durability || '∞'}</span></div>
            </div>
          </div>
        `;
        actionButtons = `
          <button class="btn btn-primary" onclick="game.equipArtifact('${itemId}','attack');game.showPage('inventory')" style="width:100%;margin-bottom:8px">装备</button>
          <button class="btn btn-heal" onclick="game.showPage('inventory')" style="width:100%">返回背包</button>
        `;
        break;

      case 'skill':
        const cultBonus = itemData.cultivationBonus ? `修炼+${Math.floor((itemData.cultivationBonus - 1) * 100)}%` : '';
        const atkStr = itemData.atkBonus ? `攻+${itemData.atkBonus}` : '';
        const defStr = itemData.defBonus && itemData.defBonus > 0 ? `防+${itemData.defBonus}` : '';
        const specStr = itemData.special ? `特殊:${itemData.special}` : '';
        const statsStr = [cultBonus, atkStr, defStr].filter(Boolean).join(' | ');
        typeInfo = `
          <div style="padding:10px;background:rgba(52,152,219,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#3498db;margin-bottom:6px">  功法信息</div>
            <div style="font-size:12px;color:#fff;line-height:1.5">${itemData.desc || ''}</div>
            <div style="font-size:10px;color:#aaa;margin-top:4px">品阶: ${itemData.grade || '未知'} | 属性: ${itemData.element || '无'}</div>
            ${statsStr ? `<div style="font-size:10px;color:#f39c12;margin-top:2px">${statsStr}</div>` : ''}
            ${specStr ? `<div style="font-size:10px;color:#9b59b6;margin-top:2px">${specStr}</div>` : ''}
            ${itemData.source ? `<div style="font-size:9px;color:#666;margin-top:4px">来源：${itemData.source}</div>` : ''}
          </div>
        `;
        actionButtons = `
          <button class="btn btn-primary" onclick="game.learnSkill('${itemId}');game.showPage('inventory')" style="width:100%;margin-bottom:8px">修炼</button>
          <button class="btn btn-heal" onclick="game.showPage('inventory')" style="width:100%">返回背包</button>
        `;
        break;

      default: // material, special, quest
        typeInfo = `
          <div style="padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#aaa;margin-bottom:6px">物品描述</div>
            <div style="font-size:12px;color:#ccc;line-height:1.5">${itemData.desc || '无描述'}</div>
            ${itemData.effect ? `<div style="font-size:10px;color:#aaa;margin-top:4px">效果: ${typeof itemData.effect === 'object' ? JSON.stringify(itemData.effect) : itemData.effect}</div>` : ''}
          </div>
        `;
        const canUse = itemData.effect && itemData.type !== 'quest';
        actionButtons = `
          ${canUse ? `<button class="btn btn-primary" onclick="game.useItem('${itemId}');game.showPage('inventory')" style="width:100%;margin-bottom:8px">使用</button>` : ''}
          <button class="btn btn-heal" onclick="game.showPage('inventory')" style="width:100%">返回背包</button>
        `;
        break;
    }

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <button class="btn btn-heal" onclick="game.showPage('inventory')" style="width:100%;margin-bottom:12px">← 返回背包</button>

          <div style="text-align:center;margin-bottom:12px">
            <div style="font-size:24px;margin-bottom:4px">${itemData.icon || ' '}</div>
            <div style="font-size:20px;color:#ffd700;margin-bottom:4px">${itemData.name}</div>
            <div style="font-size:12px;color:#aaa">${itemData.grade || ''} ${this.getItemTypeName(itemData, itemId)}</div>
          </div>

          ${typeInfo}

          <div style="padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:12px">
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px">
              <div><span style="color:#aaa">持有数量:</span> <span style="color:#ffd700">${count}</span></div>
              <div><span style="color:#aaa">单件重量:</span> <span style="color:#fff">${weight}</span></div>
              <div><span style="color:#aaa">总重量:</span> <span style="color:#fff">${totalWeight.toFixed(2)}</span></div>
              <div><span style="color:#aaa">获取方式:</span> <span style="color:#fff">${itemData.source || '未知'}</span></div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px">
            ${actionButtons}
          </div>
        </div>
      </div>
    `;
  }

  // 切换主修功法（转修期根据品阶不同）
  switchMainSkill(newSkillId) {
    const { SKILLS } = window.gameData;
    const newSkill = SKILLS.main.find(s => s.id === newSkillId);
    if (!newSkill) {
      this.addLog('功法不存在', 'warning');
      return;
    }

    // 检查是否拥有该功法
    const owned = this.state.inventory.find(i => i.id === newSkillId && i.type === 'skill');
    if (!owned) {
      this.addLog('你没有这部功法', 'warning');
      return;
    }

    // 检查灵根是否匹配
    if (newSkill.element !== '无' && newSkill.element !== this.state.player.root.mainElement) {
      this.addLog(`灵根不匹配，需要${newSkill.element}属性`, 'warning');
      return;
    }

    // 检查是否正在转修期
    const transmuteBuff = this.state.player.buffs?.find(b => b.type === 'transmute');
    if (transmuteBuff) {
      this.addLog('转修期中，无法切换功法', 'warning');
      return;
    }

    // 根据品阶确定转修期天数
    const transmuteDays = {
      '黄级': 5,
      '玄级': 10,
      '地级': 15,
      '天级': 20,
      '灵级': 30,
      '仙级': 50,
      '神级': 100
    };
    const days = transmuteDays[newSkill.grade] || 10;

    // 切换功法
    this.state.skills.main = { ...newSkill, level: 1 };

    // 添加转修期debuff
    this.state.player.buffs = this.state.player.buffs || [];
    this.state.player.buffs.push({
      type: 'transmute',
      duration: days,
      value: -0.5,
      name: '转修期'
    });

    this.addLog(`切换功法为${newSkill.name}，进入转修期（${days}天修炼速度-50%）`, 'success');
    this.showToast(`进入转修期：${days}天`, 'warning');
    this.render();
  }

  // 升级功法
  upgradeSkill(skillId, skillType) {
    const result = this.systems.skillUpgrade.upgradeSkill(skillId, skillType);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text, 'warning');
    }
    // 刷新功法详情页面
    this.showSkillDetail(skillId, skillType);
  }

  // 使用感悟丹
  useInsightPill(skillId, skillType, pillId) {
    const result = this.systems.skillUpgrade.useInsightPill(skillId, skillType, pillId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text, 'warning');
    }
    // 刷新功法详情页面
    this.showSkillDetail(skillId, skillType);
  }

  // 叛宗功能（GDD: 4种选项）
  betraySect() {
    if (!this.state.sect) {
      this.addLog('你不是任何宗门的弟子', 'warning');
      return;
    }

    const sectName = this.state.sect.name;

    // 显示叛宗选项
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>⚠️ 叛宗 - ${sectName}</h3>
          <div style="margin-bottom:15px;color:#aaa;font-size:12px">
            你确定要叛出${sectName}吗？这将带来严重后果。
          </div>
          <div class="grid2">
            <button class="btn btn-primary" onclick="game.betrayChoice('return')" style="font-size:12px">
              ①乖乖归还<br><span style="font-size:10px;color:#aaa">交还功法，平安离开</span>
            </button>
            <button class="btn btn-heal" onclick="game.betrayChoice('pretend')" style="font-size:12px">
              ②装作已忘<br><span style="font-size:10px;color:#aaa">按概率判定，失败触发追杀</span>
            </button>
            <button class="btn btn-combat" onclick="game.betrayChoice('force')" style="font-size:12px">
              ③强行保留<br><span style="font-size:10px;color:#aaa">全宗敌对+永久追杀</span>
            </button>
            <button class="btn btn-skill" onclick="game.betrayChoice('abolish')" style="font-size:12px">
              ④废功脱宗<br><span style="font-size:10px;color:#aaa">自废该宗门功法，安全离开</span>
            </button>
          </div>
          <button class="btn btn-heal" onclick="game.showPage('settings')" style="width:100%;margin-top:10px">返回</button>
        </div>
      </div>
    `;
  }

  // 处理叛宗选择
  betrayChoice(choice) {
    const sect = this.state.sect;
    if (!sect) return;

    switch (choice) {
      case 'return':
        // 乖乖归还：交还功法，平安离开
        this.state.skills.main = { id: 'basic_art', name: '基础吐纳法', grade: '黄级', desc: '基础修炼功法', cultivationBonus: 1.0 };
        this.state.sect = null;
        this.addLog(`交还${sect.name}功法，平安离开`, 'success');
        break;

      case 'pretend':
        // 装作已忘：80%成功，20%失败触发追杀
        if (Math.random() < 0.8) {
          this.state.sect = null;
          this.addLog('成功蒙混过关，平安离开', 'success');
        } else {
          this.addLog('被识破！触发追杀！', 'warning');
          // 触发追杀事件
          this.state.sectHostile = true;
          this.state.sect = null;
        }
        break;

      case 'force':
        // 强行保留：全宗敌对+永久追杀
        this.state.sectHostile = true;
        this.state.sect = null;
        this.state.factions = this.state.factions || {};
        this.state.factions[sect.id] = -100;
        this.addLog(`强行保留${sect.name}功法，全宗敌对！`, 'warning');
        break;

      case 'abolish':
        // 废功脱宗：自废该宗门功法，安全离开
        this.state.skills.main = { id: 'basic_art', name: '基础吐纳法', grade: '黄级', desc: '基础修炼功法', cultivationBonus: 1.0 };
        this.state.sect = null;
        this.state.player.exp = Math.floor(this.state.player.exp * 0.5);
        this.addLog('自废功法，修为减半，平安离开', 'success');
        break;
    }

    this.render();
  }

  // 检查陨落
  checkDeath() {
    const deathResult = this.systems.death.checkDeath();
    if (deathResult) {
      this.showDeathScreen(deathResult);
      return true;
    }
    // 寿元警告
    const info = this.systems.death.getDeathInfo();
    if (info.critical) {
      this.addLog(`⚠️ 寿元告急！剩余${info.remaining}年！`, 'warning');
    } else if (info.warning) {
      this.addLog(`⚠️ 寿元不足${info.remaining}年，请注意突破或延寿。`, 'warning');
    }
    return false;
  }

  // 显示陨落界面
  showDeathScreen(deathResult) {
    const app = document.getElementById('app');
    const player = this.state.player;
    const realmName = window.gameData?.REALMS?.[player.realmIdx]?.name || '凡人';

    app.innerHTML = `
      <div class="game">
        <div class="card" style="border-color:rgba(231,76,60,0.5)">
          <h3 style="color:#e74c3c">  陨落</h3>
          <div style="color:#ffd700;font-size:14px;margin-bottom:12px">${deathResult.cause.name}</div>
          <div style="color:#aaa;font-size:12px;margin-bottom:16px">${deathResult.cause.desc}</div>
          <div style="margin-bottom:12px">
            <div>最终境界：${realmName}</div>
            <div>年龄：${player.age.toFixed(1)}岁</div>
            <div>总游戏天数：${this.state.gameTime.totalDays}</div>
            <div>已解锁成就：${(this.state.achievements || []).length}个</div>
          </div>
          <div style="color:#4fc3f7;margin-bottom:8px">选择你的结局：</div>
          ${deathResult.availableEndings.map(ending => `
            <div class="inv-item" style="text-align:left;padding:10px;margin-bottom:6px;cursor:pointer" onclick="game.selectEnding('${ending.id}')">
              <div style="color:#ffd700;font-weight:bold">${ending.name}</div>
              <div style="font-size:11px;color:#aaa;margin-top:4px">${ending.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 选择结局
  selectEnding(endingId) {
    const result = this.systems.death.executeEnding(endingId);
    if (result.success) {
      // 显示结局文字
      const app = document.getElementById('app');
      const lines = result.text.split('\n');
      app.innerHTML = `
        <div class="game">
          <div class="card" style="border-color:rgba(255,215,0,0.3)">
            <h3 style="color:#ffd700">  ${this.systems.death.endings[endingId]?.name || '结局'}</h3>
            ${lines.map(l => `<div style="margin-bottom:6px;font-size:13px">${l}</div>`).join('')}
            ${result.gameOver ? `
              <div style="margin-top:16px;text-align:center">
                <button class="btn btn-primary" onclick="location.reload()">重新开始</button>
              </div>
            ` : `
              <div style="margin-top:16px;text-align:center">
                <button class="btn btn-primary" onclick="game.render()">继续修行</button>
              </div>
            `}
          </div>
        </div>
      `;
    }
  }

  // 使用金创药
  useHealPill() {
    const result = this.systems.inventory.useItem('heal_pill');
    if (result) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.addLog('无法使用金创药', 'warning');
      this.showToast('无法使用金创药', 'warning');
    }
    this.render();
  }

  // 使用物品
  useItem(itemId) {
    // 灵兽蛋特殊处理
    if (itemId.startsWith('beast_egg_')) {
      return this.incubateEgg(itemId);
    }

    const result = this.systems.inventory.useItem(itemId);
    if (result) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.showToast('无法使用该物品', 'warning');
    }
    this.render();
  }

  // 孵化灵兽蛋
  incubateEgg(eggId) {
    const item = this.state.inventory.find(i => i.id === eggId);
    if (!item || item.count <= 0) return;

    // 检查灵兽上限
    const maxBeasts = Math.floor(this.state.player.realmIdx / 2) + 1;
    if ((this.state.beasts || []).length >= maxBeasts) {
      this.showToast(`灵兽数量已达上限(${maxBeasts})`, 'warning');
      return;
    }

    item.count--;
    if (item.count <= 0) {
      this.state.inventory.splice(this.state.inventory.indexOf(item), 1);
    }

    const eggData = {
      beast_egg_low: { name: '低阶灵兽蛋', days: 30, minGrade: 1, maxGrade: 3 },
      beast_egg_mid: { name: '中阶灵兽蛋', days: 150, minGrade: 3, maxGrade: 5 },
      beast_egg_high: { name: '高阶灵兽蛋', days: 600, minGrade: 5, maxGrade: 8 }
    }[eggId];

    this.state.incubating = this.state.incubating || [];
    this.state.incubating.push({
      eggId, name: eggData.name,
      hatchDay: this.state.gameTime.totalDays + eggData.days,
      minGrade: eggData.minGrade, maxGrade: eggData.maxGrade
    });

    this.addLog(`开始孵化${eggData.name}，${eggData.days}天后孵化完成`, 'success');
    this.showToast(`${eggData.name}开始孵化`, 'success');
    this.render();
  }

  // 检查孵化到期
  checkIncubation() {
    if (!this.state.incubating || this.state.incubating.length === 0) return;
    const now = this.state.gameTime.totalDays;
    const hatched = [];

    this.state.incubating = this.state.incubating.filter(egg => {
      if (now >= egg.hatchDay) {
        const beast = this.hatchBeast(egg);
        if (beast) hatched.push(beast);
        return false;
      }
      return true;
    });

    hatched.forEach(b => {
      this.addLog(`${b.name}孵化完成！`, 'highlight');
      this.showToast(`灵兽蛋孵化！获得${b.name}`, 'success');
    });
  }

  // 孵化随机灵兽
  hatchBeast(egg) {
    const { BEASTS } = window.gameData;
    const all = [...BEASTS.single, ...BEASTS.swarm, ...BEASTS.mount];
    const candidates = all.filter(b => b.grade >= egg.minGrade && b.grade <= egg.maxGrade);
    if (candidates.length === 0) return null;

    const data = candidates[Math.floor(Math.random() * candidates.length)];
    const beast = {
      id: data.id + '_' + Date.now(),
      dataId: data.id, name: data.name, grade: data.grade,
      type: BEASTS.single.some(b => b.id === data.id) ? 'single' :
            BEASTS.swarm.some(b => b.id === data.id) ? 'swarm' : 'mount',
      hp: data.hp || 1000, maxHp: data.hp || 1000,
      atk: data.atk || 100, def: data.def || 50,
      level: 1, loyalty: 50, hunger: 100, exp: 0,
      active: false
    };

    if (beast.type === 'swarm') {
      beast.count = 1; beast.maxCount = data.maxCount;
      beast.hpPerUnit = data.hpPerUnit; beast.atkPerUnit = data.atkPerUnit;
      beast.defPerUnit = data.defPerUnit;
    }
    if (data.skills) beast.skills = JSON.parse(JSON.stringify(data.skills));

    this.state.beasts = this.state.beasts || [];
    this.state.beasts.push(beast);
    return beast;
  }

  // 随机获取当前位置野生灵兽
  getRandomBeastForLocation(locationId) {
    const { BEASTS } = window.gameData;
    const all = [...BEASTS.single, ...BEASTS.swarm, ...BEASTS.mount];
    const candidates = all.filter(b => b.location === locationId);
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // 显示灵兽遭遇界面
  showBeastEncounter(beastData) {
    const catchRate = Math.min(95, Math.max(5,
      50 + (this.state.player.realmIdx - beastData.grade) * 10 +
      this.state.player.fortune * 0.2
    ));
    const gradeName = window.gameData?.BEAST_GRADE?.[beastData.grade]?.name || `${beastData.grade}阶`;

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card" style="text-align:center">
          <h3>  遭遇野生灵兽！</h3>
          <div style="font-size:14px;color:#ffd700;margin:8px 0">${beastData.name}（${gradeName}·${beastData.element || '无'}系）</div>
          <div style="font-size:11px;color:#aaa;line-height:1.6">
            <div>HP:${beastData.hp || '?'}  ATK:${beastData.atk || '?'}  DEF:${beastData.def || '?'}</div>
            ${beastData.skills ? `<div>技能：${beastData.skills.map(s => ({fire_breath:'火焰吐息',constrict:'缠绕',frost_field:'冰封领域',poison_fog:'毒雾',soul_scream:'灵魂尖啸',ghost_kill:'鬼杀',golden_body:'金身',wrath:'狂怒',wind_blade:'风刃',swift:'疾风',water_escape:'水遁',dragon_rage:'龙怒',root_bind:'根缚',life_drain:'生命汲取',ice_slam:'冰锤',frost_armor:'冰甲',dive_attack:'俯冲',wind_storm:'风暴',chaos_bite:'混沌撕咬',chaos_domain:'混沌领域',lunhui_strike:'轮回一击',time_reverse:'时光倒流',fire_domain:'火焰领域',nirvana:'涅槃',ice_domain:'冰域',frozen_nirvana:'冰涅槃',dragon_breath:'龙息',dragon_domain:'龙域',devour:'吞噬',metalize:'金属化',shell:'硬壳',charge:'冲锋',drain:'吸血',sonic:'超声波',ghost_fire:'鬼火',phosphor:'磷光',sting:'蜂刺',swarm_guard:'群护',fire_spit:'火酸',acid:'酸液',stone_slam:'石锤',earth_wall:'土墙',phantom_dust:'幻尘',confuse:'混乱'}[s]) || s).join('、')}</div>` : ''}
          </div>
          <div style="margin:12px 0;font-size:12px;color:#f39c12">捕捉成功率：${Math.round(catchRate)}%</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-primary" style="flex:1" onclick="game.tryCatchBeast('${beastData.id}')">尝试捕捉</button>
            <button class="btn btn-combat" style="flex:1" onclick="game.startCombat({name:'野生${beastData.name}',hp:${beastData.hp||1000},maxHp:${beastData.hp||1000},atk:${beastData.atk||100},def:${beastData.def||50},element:'${beastData.element||'none'}',type:'beast',beastId:'${beastData.id}'})">战斗击杀</button>
            <button class="btn btn-heal" style="flex:1" onclick="game.showPage('explore')">逃跑</button>
          </div>
        </div>
      </div>
    `;
  }

  // 尝试捕捉灵兽
  tryCatchBeast(beastId) {
    const result = this.systems.beast.catch(beastId);
    if (result.success) {
      this.addLog(`成功捕捉${result.beast.name}！`, 'highlight');
      this.showToast(`捕捉成功！获得${result.beast.name}`, 'success');
      this.saveGame();
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.showPage('explore');
  }

  // 检查突破
  checkBreakthrough() {
    if (this.systems.breakthrough.canBreakthrough()) {
      const rate = this.systems.breakthrough.calcSuccessRate();
      this.addLog(`修为已满，可尝试突破（成功率${rate}%）`, 'highlight');

      // 自动突破凡人期
      if (this.state.player.realmIdx === 0) {
        const result = this.systems.breakthrough.attempt();
        if (result.success) {
          this.addLog(`突破成功！从${result.oldRealm}晋升为${result.newRealm}！`, 'highlight');
          this.saveGame();
        }
      }
    }
  }

  // 手动突破
  attemptBreakthrough() {
    const result = this.systems.breakthrough.attempt();
    if (result.success) {
      this.addLog(`突破成功！从${result.oldRealm}晋升为${result.newRealm}！`, 'highlight');
      this.saveGame();
    } else if (result.goneWrong) {
      this.addLog(result.reason, 'warning');
      // 走火入魔可能触发陨落
      if (this.systems.breakthrough.calcSuccessRate() < 10) {
        const deathResult = this.systems.death.triggerDeath('madness');
        if (deathResult) {
          this.showDeathScreen(deathResult);
          return;
        }
      }
    } else {
      this.addLog(result.reason, 'warning');
    }
    this.checkDeath();
    this.checkOptionalTasks();
    // 留在修炼界面
    this.showPage('cultivation');
  }

  // 切换区域
  selectRegion(region) {
    this.state.currentRegion = region;
    this.state.currentLocation = null; // 退出地点详情
    this.showPage('explore');
  }

  // 进入地点
  enterLocation(locationId) {
    const { LOCATIONS } = window.gameData;
    const locations = LOCATIONS[this.state.currentRegion] || [];
    const location = locations.find(l => l.id === locationId);

    if (!location) {
      this.showToast('地点不存在', 'warning');
      return;
    }

    this.state.currentLocation = locationId;
    this.state.playerLocation = locationId;
    this.showToast(`进入${location.name}`, 'info');
    this.showPage('explore');
  }

  // 退出地点（返回地图）
  exitLocation() {
    this.state.currentLocation = null;
    this.showPage('explore');
  }

  // 进入地点的NPC界面
  enterLocationNpc(locationId) {
    this.state.currentRegion = this.state.currentRegion || 'renjie';
    this.state.selectedNpcId = null;
    this.renderNpcPage();
  }

  // 从地点选择NPC
  selectNpcFromLocation(npcId) {
    this.state.selectedNpcId = npcId;
    this.renderNpcPage();
  }

  // 探索（在地点内进行探索操作）
  explore(locationId) {
    const { LOCATIONS } = window.gameData;
    const locations = LOCATIONS[this.state.currentRegion] || [];
    const location = locations.find(l => l.id === locationId);

    if (!location) {
      this.showToast('地点不存在', 'warning');
      return;
    }

    this.state.currentLocation = locationId;
    this.state.playerLocation = locationId;
    this.state.stats.explorations++;

    // 8%概率遭遇野生灵兽
    if (Math.random() < 0.08) {
      const beast = this.getRandomBeastForLocation(locationId);
      if (beast) {
        this.showBeastEncounter(beast);
        return;
      }
    }

    const result = this.systems.exploration.explore(location);
    this.addLog(result.text, result.reward?.type === 'combat' ? 'warning' : '');

    // 日常任务进度
    this.systems.daily.updateQuestProgress('explore', locationId, 1);
    this.systems.daily.updateQuestProgress('travel', locationId, 1);
    if (result.reward?.items) {
      result.reward.items.forEach(item => {
        this.systems.daily.updateQuestProgress('gather', item.id, item.count || 1);
        this.advanceNpcQuests('gather', item.id);
      });
    }

    // NPC任务进度
    this.advanceNpcQuests('explore', locationId);

    if (result.reward) {
      if (result.reward.type === 'combat') {
        this.handleReward(result.reward);
        return; // 战斗界面由战斗系统处理，不刷新
      }
      this.handleReward(result.reward);
    }

    // 检查异火事件
    const fireResult = this.systems.forge.checkFireEvent(locationId);
    if (fireResult) {
      this.addLog(fireResult.text, 'success');
      this.systems.notification.notifyRareItem(this.systems.forge.strangeFires.find(f => f.id === fireResult.fireId)?.name || '异火');
    }

    // 检查事件链触发
    const chainTriggers = this.systems.eventChain.checkTrigger(locationId);
    for (const trigger of chainTriggers) {
      const result = this.systems.eventChain.executeStep(trigger.chainId, trigger.step.id);
      this.addLog(result.text, 'highlight');
      if (result.progress) {
        this.addLog(result.progress, 'info');
      }
      if (result.completion) {
        this.systems.notification.notifyRareItem(trigger.chain.name);
      }
    }

    this.checkAchievements();
    this.checkOptionalTasks();

    // 自动存档
    this.saveGame();

    // 重新渲染地点详情页
    this.showPage('explore');
  }

  // 处理奖励
  handleReward(reward) {
    switch (reward.type) {
      case 'item':
        this.systems.inventory.addItem(reward.id, reward.count);
        // 查找物品中文名称
        const { ITEMS } = window.gameData;
        const allItems = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || []), ...(ITEMS.special || [])];
        const itemData = allItems.find(i => i.id === reward.id);
        const itemName = itemData?.name || reward.id;
        this.addLog(`获得${itemName} x${reward.count}`, 'success');
        this.showToast(`获得${itemName} x${reward.count}`, 'success');
        break;
      case 'combat':
        this.startCombat(reward.enemy);
        break;
      case 'damage':
        this.addLog(`受到${reward.value}点伤害`, 'warning');
        break;
      case 'shop':
        this.showShop();
        break;
      case 'skill':
        this.addLog(`获得功法：${reward.skill.name}`, 'success');
        // 自动学习
        if (reward.skill?.id) {
          const { SKILLS } = window.gameData;
          const skill = [...(SKILLS.main||[]),...(SKILLS.sub||[]),...(SKILLS.combat||[])].find(s=>s.id===reward.skill.id);
          if (skill) {
            this.state.skills.combat = this.state.skills.combat || [];
            if (!this.state.skills.combat.some(s=>s.id===skill.id)) {
              this.state.skills.combat.push({...skill,level:1});
            }
          }
        }
        break;
      case 'buff':
        if (reward.stat === 'maxMp') { this.state.player.maxMp += reward.value; this.state.player.mp += reward.value; }
        if (reward.stat === 'cultivation') { this.state.player.cultBuff = (this.state.player.cultBuff||0) + reward.value; }
        this.addLog(`属性提升！${reward.stat}+${reward.value}`, 'success');
        break;
      case 'treasure':
        this.addLog('发现宝藏！', 'success');
        this.systems.inventory.addItem(reward.id, reward.count);
        break;
      case 'root_mutation':
        this.addLog(reward.text || '灵根发生变异！', 'success');
        this.showToast('灵根变异！', 'info');
        break;
      case 'puzzle':
      case 'heritage':
      case 'secret':
      case 'ancient':
      case 'forbidden':
      case 'teleport':
      case 'environment':
        this.addLog(reward.text || `触发了${reward.type}事件`, '');
        break;
      case 'warning':
        this.showToast('此地过于危险，换个地方吧', 'warning');
        break;
      case 'exp_bonus':
        this.state.player.exp += reward.value || 0;
        this.addLog(`修为+${reward.value}`, 'success');
        break;
      case 'exp':
        this.state.player.exp += reward.value || 0;
        this.addLog(`获得${reward.value}修为`, 'success');
        break;
      case 'fame':
        this.state.player.fame = (this.state.player.fame||0) + (reward.value||0);
        this.addLog(`名望+${reward.value}`, 'success');
        break;
      case 'beast':
        this.addLog('发现了灵兽的踪迹...', '');
        break;
      case 'body_exp':
        this.state.player.bodyExp = (this.state.player.bodyExp || 0) + (reward.value || 0);
        this.addLog(`炼体经验+${reward.value}`, 'success');
        break;
      case 'auction':
        this.showShop();
        break;
      case 'quest':
      case 'sect_quest':
        this.addLog(reward.text || '新的任务已触发', '');
        break;
      case 'black_market':
        this.addLog('发现了黑市的入口...', '');
        break;
      case 'sect':
        this.addLog(reward.text || '来到了宗门', '');
        break;
      case 'debuff':
        this.state.player.mp = Math.max(0, this.state.player.mp - Math.floor((this.state.player.maxMp || 50) * (reward.value || 0.1)));
        this.addLog(`灵气受到了侵蚀！灵力-${Math.floor(this.state.player.maxMp * (reward.value || 0.1))}`, 'warning');
        break;
      case 'time_anomaly':
        this.addLog('时间在这里流动异常...', '');
        this.state.gameTime.totalDays += 1;
        break;
      case 'final':
        this.addLog('你感受到了终极的召唤...', '');
        break;
    }
  }

  // 开始战斗
  startCombat(enemyType) {
    const enemy = this.systems.combat.startCombat(enemyType);
    this.addLog(`遭遇${enemy.name}！`, 'warning');
    this.renderCombat(enemy);
  }

  // 渲染战斗界面
  renderCombat(enemy) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderCombat(enemy)}
      </div>
    `;
  }

  // 战斗操作
  combat(action) {
    let result;

    switch (action) {
      case 'attack':
        result = this.systems.combat.playerAttack();
        break;
      case 'defend':
        result = this.systems.combat.defend();
        break;
      case 'escape':
        result = this.systems.combat.escape();
        break;
      case 'skill':
        // 显示技能选择
        this.showSkillSelect();
        return;
      case 'talisman':
        this.showTalismanSelect();
        return;
      case 'awaken':
        this.showAwakenSelect();
        return;
    }

    if (result) {
      this.state.combatLog = result.log || [];

      if (result.type === 'victory') {
        this.addLog(`战斗胜利！获得${result.exp}修为`, 'success');
        this.showToast(`战斗胜利！获得${result.exp}修为`, 'highlight');
        if (result.loot) {
          const { ITEMS } = window.gameData;
          const allItems = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || []), ...(ITEMS.special || [])];
          result.loot.forEach(item => {
            this.systems.inventory.addItem(item.id, item.count);
            const itemData = allItems.find(i => i.id === item.id);
            const itemName = itemData?.name || item.id;
            this.addLog(`获得${itemName} x${item.count}`, 'success');
            this.showToast(`获得${itemName} x${item.count}`, 'success');
          });
        }
        this.state.stats.victories++;
        this.checkAchievements();
        // 秘境BOSS击败检查
        if (this.state.currentDungeon) {
          const dungeonResult = this.systems.dungeon.onBossDefeated();
          if (dungeonResult) {
            this.addLog(dungeonResult.text, 'success');
            if (dungeonResult.type === 'dungeon_complete') {
              this.addLog(`通关奖励：${dungeonResult.rewards.join('、')}`, 'highlight');
            }
          }
          this.showDungeonExplore();
          return;
        }
        this.render();
      } else if (result.type === 'npc_victory') {
        // 修士战斗胜利 → 三选一
        this.showNpcVictoryChoices(result);
        return;
      } else if (result.type === 'defeat') {
        this.addLog('战斗失败...', 'warning');
        this.showToast('战斗失败，你被击败了', 'error');
        this.render();
      } else if (result.type === 'escape') {
        this.addLog('逃跑成功', '');
        this.showToast('逃跑成功', 'success');
        this.render();
      } else if (result.type === 'enemy_escape') {
        this.addLog(`${this.systems.combat.enemy.name}逃跑了`, '');
        this.showToast(`${this.systems.combat.enemy.name}逃跑了`, 'warning');
        this.render();
      } else {
        // 继续战斗
        this.renderCombat(this.systems.combat.enemy);
      }
    }
  }

  // 显示修士战斗胜利选择（放走/搜刮/击杀）
  showNpcVictoryChoices(result) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        <div class="card">
          <h3>战斗胜利</h3>
          <div class="log-list">
            ${result.log.slice(-5).map(l => `<div class="log-item">${l}</div>`).join('')}
          </div>
          <div style="margin-top:12px">
            <div style="color:#ffd700;margin-bottom:8px">如何处置对方？</div>
            <div class="grid2">
              <button class="btn btn-primary" onclick="game.handleKillChoice('release')">放走</button>
              <button class="btn btn-explore" onclick="game.handleKillChoice('loot')">搜刮</button>
              <button class="btn btn-combat" onclick="game.handleKillChoice('kill')">击杀</button>
            </div>
            <div style="font-size:10px;color:#aaa;margin-top:6px">
              放走：无事发生<br>
              搜刮：获得对方灵石20~30%+随机1件物品<br>
              击杀：获得灵石50~100%+装备(50%)，但可能影响名望
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 处理击杀选择
  handleKillChoice(choice) {
    const result = this.systems.combat.handleKillChoice(choice);
    if (choice !== 'release') {
      this.systems.daily.updateQuestProgress('kill', this.systems.combat.enemy?.type || 'enemy', 1);
      // NPC任务推进 + 击杀后果 + 宗门战斗任务
      this.advanceNpcQuests('kill', this.systems.combat.enemy?.npcId || '');
      this.systems.npc.checkKillConsequence(this.systems.combat.enemy?.npcId || '');
      this.systems.sect.advanceCombatQuest();
    }
    if (result.loot) {
      result.loot.forEach(item => {
        this.systems.inventory.addItem(item.id, item.count);
      });
    }
    result.log.forEach(l => this.addLog(l, ''));
    this.state.stats.victories++;
    this.checkAchievements();
    this.render();
  }

  // 显示技能选择
  showSkillSelect() {
    const skills = this.state.skills.combat || [];
    if (skills.length === 0) {
      this.addLog('没有可用的战斗技能', 'warning');
      this.showToast('还没有学习战斗技能', 'warning');
      this.renderCombat(this.systems.combat.enemy);
      return;
    }
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        <div class="card">
          <h3>选择技能</h3>
          ${skills.map(s => `
            <div class="skill-item" onclick="game.useCombatSkill('${s.id}')">
              <div class="skill-name">${s.name} <span class="grade">${s.grade}</span></div>
              <div class="skill-desc">消耗${s.mpCost}灵力 | ${s.desc}</div>
            </div>
          `).join('')}
          <button class="btn btn-heal" onclick="game.renderCombat(game.systems.combat.enemy)" style="margin-top:8px">返回</button>
        </div>
      </div>
    `;
  }

  // 使用战斗技能
  useCombatSkill(skillId) {
    const skills = this.state.skills.combat || [];
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;
    const result = this.systems.combat.useSkill(skill);
    if (result) {
      this.state.combatLog = result.log || [];
      if (result.type === 'victory') {
        this.addLog(`战斗胜利！获得${result.exp}修为`, 'success');
        if (result.loot) result.loot.forEach(item => { this.systems.inventory.addItem(item.id, item.count); });
        this.state.stats.victories++;
        this.checkAchievements();
        this.render();
      } else if (result.type === 'npc_victory') {
        this.showNpcVictoryChoices(result);
      } else if (result.type === 'defeat') {
        this.addLog('战斗失败...', 'warning');
        this.showToast('战斗失败，你被击败了', 'error');
        this.render();
      } else {
        this.renderCombat(this.systems.combat.enemy);
      }
    } else {
      this.addLog('灵力不足，无法释放技能', 'warning');
      this.showToast('灵力不足，无法释放技能', 'warning');
      this.renderCombat(this.systems.combat.enemy);
    }
  }

  // 显示符箓选择
  showTalismanSelect() {
    const talismans = this.state.inventory.filter(i => i.type === 'talisman');
    if (talismans.length === 0) {
      this.addLog('没有可用的符箓', 'warning');
      this.showToast('背包里没有符箓', 'warning');
      this.renderCombat(this.systems.combat.enemy);
      return;
    }
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        <div class="card">
          <h3>选择符箓</h3>
          ${talismans.map(t => `
            <div class="inv-item" onclick="game.useCombatTalisman('${t.id}')">
              <div class="icon"> </div>
              <div class="name">${t.name}</div>
              <div class="count">x${t.count}</div>
            </div>
          `).join('')}
          <button class="btn btn-heal" onclick="game.renderCombat(game.systems.combat.enemy)" style="margin-top:8px">返回</button>
        </div>
      </div>
    `;
  }

  // 使用战斗符箓
  useCombatTalisman(talismanId) {
    const { ITEMS } = window.gameData;
    const talismanData = ITEMS.talismans.find(t => t.id === talismanId);
    if (!talismanData) return;
    const result = this.systems.combat.useTalisman(talismanData);
    if (result) {
      // 消耗符箓
      const item = this.state.inventory.find(i => i.id === talismanId);
      if (item) {
        item.count--;
        if (item.count <= 0) this.state.inventory.splice(this.state.inventory.indexOf(item), 1);
      }
      this.state.combatLog = result.log || [];
      if (result.type === 'victory') {
        this.addLog(`战斗胜利！`, 'success');
        this.state.stats.victories++;
        this.render();
      } else if (result.type === 'defeat') {
        this.addLog('战斗失败...', 'warning');
        this.showToast('战斗失败，你被击败了', 'error');
        this.render();
      } else {
        this.renderCombat(this.systems.combat.enemy);
      }
    }
  }

  // 觉醒效果选择
  showAwakenSelect() {
    const effects = this.systems.combat.getPlayerAwakenEffects();
    const available = effects.filter(e => {
      return !this.systems.combat.activeAwakenEffects[e.name] &&
             this.systems.combat.canUseAwakenEffect(e.name);
    });

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>⚡ 觉醒效果</h3>
          ${available.length === 0 ? '<div style="color:#aaa;font-size:12px;text-align:center;padding:20px">无可用的觉醒效果</div>' :
            available.map(e => `
              <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.useCombatAwaken('${e.name}')">
                <div style="display:flex;justify-content:space-between">
                  <span style="color:#ffd700;font-size:12px">${e.type === 'attack' ? '⚔️' : e.type === 'buff' ? '✨' : e.type === 'debuff' ? '🔮' : '❓'} ${e.name}</span>
                  <span style="font-size:10px;color:#aaa">${e.description || ''}</span>
                </div>
              </div>
            `).join('')
          }
          <button class="btn btn-heal" onclick="game.renderCombat(game.systems.combat.enemy)" style="width:100%;margin-top:8px">返回战斗</button>
        </div>
      </div>
    `;
  }

  // 使用觉醒效果
  useCombatAwaken(effectName) {
    const result = this.systems.combat.useAwakenEffect(effectName);
    if (result.success) {
      this.state.combatLog = result.log || [];
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
      if (result.type === 'victory') {
        this.addLog('战斗胜利！', 'success');
        this.state.stats.victories++;
        this.state.stats.combats++;
        this.render();
        return;
      } else if (result.type === 'defeat') {
        this.addLog('战斗失败...', 'warning');
        this.render();
        return;
      }
    } else {
      this.showToast(result.text || '无法使用', 'warning');
    }
    this.renderCombat(this.systems.combat.enemy);
  }

  // 与NPC对话（每天限1次）
  talkToNpc(npcId) {
    // 冷却检查
    this.state.npcDailyCooldown = this.state.npcDailyCooldown || {};
    const today = this.state.gameTime.totalDays;
    const cd = this.state.npcDailyCooldown[npcId] || {};
    if (cd.talk === today) {
      this.showToast('今天已经聊过了，明天再来吧。', 'warning');
      return;
    }
    const result = this.systems.npc.talk(npcId);
    if (result.success) {
      this.state.npcDailyCooldown[npcId] = { ...cd, talk: today };
      this.addLog(`${result.npc}：${result.text}`, '');
      this.showToast(`${result.npc}：${result.text}`, 'info');
      this.checkAchievements();
      // 增加对话次数统计
      this.state.stats.npcTalks = (this.state.stats.npcTalks || 0) + 1;
      this.checkOptionalTasks();
      // NPC任务进度推进
      this.advanceNpcQuests('talk', npcId);
    } else {
      this.showToast(result.text || '对话失败', 'warning');
    }
    // 保持NPC界面状态
    this.renderNpcPage();
  }

  // 选择NPC地区
  selectNpcRegion(regionId) {
    this.state.currentRegion = regionId;
    this.renderNpcPage();
  }

  // 选择NPC
  selectNpc(npcId) {
    this.state.selectedNpcId = npcId;
    this.renderNpcPage();
  }

  // 送给NPC礼物
  giveGiftToNpc(npcId) {
    // 获取背包中的物品
    const items = this.state.inventory.filter(i => i.count > 0);
    if (items.length === 0) {
      this.showToast('背包里没有物品', 'warning');
      return;
    }

    // 显示物品选择界面
    const app = document.getElementById('app');
    const npc = window.gameData?.NPCS?.find(n => n.id === npcId);
    if (!npc) return;

    app.innerHTML = `
      <div class="game">
        <div class="card">
          <h3>送给${npc.name}礼物</h3>
          <div style="font-size:12px;color:#aaa;margin-bottom:12px">选择要赠送的物品</div>
          <div style="max-height:300px;overflow-y:auto">
            ${items.map(item => {
              const itemData = this.getItemData(item.id);
              if (!itemData) return '';
              return `
                <div class="inv-item" onclick="game.confirmGiveGift('${npcId}', '${item.id}')">
                  <div class="icon">${itemData.icon || ' '}</div>
                  <div class="name">${itemData.name}</div>
                  <div class="count">x${item.count}</div>
                </div>
              `;
            }).join('')}
          </div>
          <button class="btn btn-heal" onclick="game.renderNpcPage()" style="margin-top:8px;width:100%">返回</button>
        </div>
      </div>
    `;
  }

  // 确认赠送礼物（每天最多3次）
  confirmGiveGift(npcId, itemId) {
    // 冷却检查
    this.state.npcDailyCooldown = this.state.npcDailyCooldown || {};
    const today = this.state.gameTime.totalDays;
    const cd = this.state.npcDailyCooldown[npcId] || {};
    const giftCount = cd.giftDay === today ? (cd.giftCount || 0) : 0;
    if (giftCount >= 3) {
      this.showToast('今天送太多了，明天再来吧。', 'warning');
      return;
    }
    const result = this.systems.npc.giveGift(npcId, itemId);
    if (result.success) {
      this.state.npcDailyCooldown[npcId] = { ...cd, giftDay: today, giftCount: giftCount + 1 };
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
      // 好感传播
      this.systems.npc.propagateFavor(npcId, 'gift', result.favorChange || 0);
    } else {
      this.showToast(result.text || '赠送失败', 'error');
    }
    // 返回NPC界面
    this.renderNpcPage();
  }

  // 接取NPC任务
  acceptNpcQuest(npcId) {
    const result = this.systems.npc.acceptQuest(npcId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text || '接取失败', 'warning');
    }
    this.renderNpcPage();
  }

  // 查看进行中的NPC任务
  showNpcQuests() {
    const quests = this.state.quests || [];
    const app = document.getElementById('app');
    if (!app) return;

    const locMap = (() => {
      const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
      const npcs = window.gameData?.NPCS || [];
      const map = {};
      allLocations.forEach(l => { map[l.id] = l.name; });
      npcs.forEach(n => { map[n.id] = n.name; });
      return map;
    })();

    const stepTypeLabels = { visit: '前往', talk: '对话', combat: '击败', gather: '收集', craft: '制作', breakthrough: '突破' };

    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>  任务日志</h3>
          <button class="btn btn-heal" onclick="game.renderNpcPage()" style="width:100%;margin-bottom:8px">← 返回NPC</button>
          ${quests.length === 0 ? `
            <div class="empty" style="text-align:center;padding:20px;color:#aaa">暂无进行中的任务</div>
          ` : quests.map((q, qi) => {
            const totalSteps = q.steps?.length || 0;
            const currentStep = q.currentStep || 0;
            const progressPct = totalSteps > 0 ? Math.floor(currentStep / totalSteps * 100) : 0;
            const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
            const npcs = window.gameData?.NPCS || [];
            const npcData = npcs.find(n => n.id === q.npcId);
            const npcName = npcData?.name || q.npcId || '未知';

            return `
              <div class="quest-card" style="margin-bottom:12px;padding:12px;background:rgba(0,0,0,0.2);border-radius:10px;border:1px solid rgba(255,215,0,0.2)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <span style="color:#ffd700;font-size:13px;font-weight:bold">${q.name}</span>
                  ${currentStep >= totalSteps ? '<span style="color:#4caf50;font-size:11px">✓ 已完成</span>' : ''}
                </div>
                <div style="font-size:11px;color:#aaa;margin-bottom:8px;line-height:1.5">${q.description}</div>
                <div style="font-size:10px;color:#666;margin-bottom:8px">发布NPC：${npcName}</div>
                
                <!-- 进度条 -->
                <div style="margin-bottom:8px">
                  <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
                    <span style="color:#aaa">进度</span>
                    <span style="color:#ffd700">${currentStep}/${totalSteps}</span>
                  </div>
                  <div class="bar" style="height:4px">
                    <div class="fill" style="width:${progressPct}%;background:${currentStep >= totalSteps ? '#4caf50' : '#f39c12'};height:4px"></div>
                  </div>
                </div>

                <!-- 步骤列表 -->
                <div style="font-size:10px;line-height:1.8">
                  ${(q.steps || []).map((s, si) => {
                    const stepDone = si < currentStep;
                    const stepCurrent = si === currentStep;
                    const icon = stepDone ? '✅' : stepCurrent ? '🔜' : '⏳';
                    const targetName = locMap[s.target] || s.target;
                    const typeLabel = stepTypeLabels[s.type] || '完成';
                    const countInfo = s.count ? ` x${s.count}` : '';
                    return `
                      <div style="color:${stepDone ? '#4caf50' : stepCurrent ? '#ffd700' : '#666'};padding:2px 4px">
                        ${icon} ${s.text || typeLabel + targetName + countInfo}
                      </div>
                    `;
                  }).join('')}
                </div>

                <!-- 当前步骤快捷操作 -->
                ${(() => {
                  const step = q.steps?.[currentStep];
                  if (!step || currentStep >= (q.steps?.length || 0)) return '';
                  const targetName = locMap[step.target] || step.target;
                  const typeLabel = stepTypeLabels[step.type] || '完成';
                  let actionHtml = '';
                  if (step.type === 'talk') {
                    actionHtml = `<button class="btn btn-primary" onclick="event.stopPropagation();game.selectNpcFromLocation('${step.target}')" style="width:100%;margin-top:6px;font-size:11px">💬 前往对话【${targetName}】</button>`;
                  } else if (step.type === 'visit') {
                    const locObj = Object.values(window.gameData?.LOCATIONS || {}).flat().find(l => l.id === step.target);
                    const locLabel = locObj?.name || step.target;
                    actionHtml = `<button class="btn btn-explore" onclick="event.stopPropagation();game.goToLocation('${step.target}')" style="width:100%;margin-top:6px;font-size:11px">🚶 前往【${locLabel}】</button>`;
                  } else if (step.type === 'combat') {
                    actionHtml = `<div style="font-size:10px;color:#e74c3c;margin-top:4px;text-align:center">⚔️ 在此区域探索可能遭遇目标</div>`;
                  }
                  return `<div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,215,0,0.15)"><div style="font-size:10px;color:#f39c12;margin-bottom:4px">当前目标：${typeLabel} ${targetName}</div>${actionHtml}</div>`;
                })()}

                <!-- 奖励 -->
                <div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05)">
                  <div style="font-size:10px;color:#888;margin-bottom:2px">完成奖励：</div>
                  <div style="font-size:10px;color:#ccc">
                    ${q.rewards?.exp ? `✨${q.rewards.exp}修为 ` : ''}
                    ${q.rewards?.fame ? `⭐${q.rewards.fame}名望 ` : ''}
                    ${q.rewards?.items ? q.rewards.items.map(i => `📦${i.id}x${i.count}`).join(' ') : ''}
                    ${q.rewards?.permanentDesc ? `🏷${q.rewards.permanentDesc}` : ''}
                    ${!q.rewards?.exp && !q.rewards?.fame && !q.rewards?.items?.length && !q.rewards?.permanentDesc ? '无' : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 双修
  dualCultivate(npcId) {
    const npc = this.systems.npc.getNpcById(npcId);
    if (!npc) return;

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card" style="text-align:center">
          <h3>  双修 · ${npc.name}</h3>
          <div style="font-size:11px;color:#aaa;line-height:1.8;margin:8px 0">
            <div>  普通双修：消耗3天，修为+30，好感+5</div>
            <div>  深度双修：消耗7天，修为+80，好感+10</div>
            <div>  功法双修：消耗5天，功法经验+50，好感+8</div>
            <div>  元阴元阳：消耗10天，修为+200（每人仅一次）</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
            <button class="btn btn-primary" onclick="game.doDualCultivate('${npcId}','normal')">  普通</button>
            <button class="btn btn-skill" onclick="game.doDualCultivate('${npcId}','deep')">  深度</button>
            <button class="btn btn-explore" onclick="game.doDualCultivate('${npcId}','skillDual')">  功法</button>
            <button class="btn btn-combat" onclick="game.doDualCultivate('${npcId}','yinyuan')">  元阴元阳</button>
          </div>
          <button class="btn btn-heal" onclick="game.renderNpcPage()" style="width:100%;margin-top:8px">返回</button>
        </div>
      </div>
    `;
  }

  // 执行双修
  doDualCultivate(npcId, mode) {
    const result = this.systems.npc.dualCultivate(npcId, mode);
    if (result.success) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text, 'warning');
    }
    this.renderNpcPage();
  }

  // 与NPC交易
  tradeWithNpc(npcId) {
    // 简单实现：显示商店界面
    this.showToast('交易功能开发中...', 'info');
    this.addLog('交易功能开发中...', '');
  }

  // 前往NPC所在地
  goToNpcLocation(locationId) {
    // 找到NPC所在地区和地点
    const { LOCATIONS } = window.gameData;
    let foundRegion = null;
    let foundLocation = null;
    for (const [region, locations] of Object.entries(LOCATIONS)) {
      const loc = locations.find(l => l.id === locationId);
      if (loc) {
        foundRegion = region;
        foundLocation = loc;
        break;
      }
    }

    if (!foundRegion || !foundLocation) {
      this.showToast('地点不存在', 'warning');
      return;
    }

    // 检查境界限制
    const playerRealmIdx = this.state.player.realmIdx;
    const requiredRealmIdx = foundLocation.realmIdx || 0;
    if (playerRealmIdx < requiredRealmIdx) {
      const { REALMS } = window.gameData;
      const requiredRealm = REALMS[requiredRealmIdx]?.name || '未知境界';
      this.showToast(`境界不足，需要${requiredRealm}才能前往${foundLocation.name}`, 'warning');
      return;
    }

    this.state.currentRegion = foundRegion;
    this.state.currentLocation = locationId;
    this.state.playerLocation = locationId;
    this.showToast(`前往${foundLocation.name}`, 'info');
    this.showPage('explore');
  }

  // 快速前往任务目标地点
  goToLocation(locationId) {
    this.goToNpcLocation(locationId);
    // 触发任务地点访问检测
    this.advanceNpcQuests('visit', locationId);
  }

  // 获取物品数据
  getItemData(itemId) {
    const { ITEMS } = window.gameData || {};
    const allItems = [
      ...(ITEMS.pills || []),
      ...(ITEMS.materials || []),
      ...(ITEMS.artifacts || []),
      ...(ITEMS.talismans || []),
      ...(ITEMS.specials || [])
    ];
    return allItems.find(i => i.id === itemId);
  }

  // 获取物品类型名称
  getItemTypeName(itemData, itemId) {
    const { ITEMS } = window.gameData || {};
    if (ITEMS.pills?.some(i => i.id === itemId)) return '丹药';
    if (ITEMS.materials?.some(i => i.id === itemId)) return '材料';
    if (ITEMS.talismans?.some(i => i.id === itemId)) return '符箓';
    if (ITEMS.artifacts?.some(i => i.id === itemId)) return '法宝';
    if (ITEMS.specials?.some(i => i.id === itemId)) return '特殊';
    return '材料';
  }

  // 渲染NPC页面
  renderNpcPage() {
    const app = document.getElementById('app');
    if (!app) return;

    try {
      const content = this.renderer.renderNpcs();
      app.innerHTML = `
        <div class="game">
          <div class="card">
            <h3>  社交/NPC</h3>
            <div style="font-size:12px;color:#aaa;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
              <span>与NPC交流、送礼、接取任务</span>
              ${(this.state.quests || []).length > 0 ? `<button class="btn btn-explore" onclick="game.showNpcQuests()" style="font-size:10px;padding:3px 8px">📋进行中(${this.state.quests.length})</button>` : ''}
            </div>
            ${content}
          </div>
          <div class="nav-bar">
            <div class="nav-item" onclick="game.showPage('home')" style="position:relative">  首页</div>
            <div class="nav-item" onclick="game.showPage('explore')" style="position:relative"> ️ 探索</div>
            <div class="nav-item" onclick="game.showPage('cultivation')" style="position:relative">  修炼</div>
            <div class="nav-item" onclick="game.showPage('inventory')" style="position:relative">  背包</div>
            <div class="nav-item" onclick="game.showPage('more')" style="position:relative">  更多</div>
          </div>
        </div>
      `;
    } catch (e) {
      console.error('NPC页面渲染失败:', e);
      app.innerHTML = `<div class="game"><div class="card"><h3>页面渲染错误</h3><pre style="color:#e74c3c;font-size:12px;white-space:pre-wrap">${e.message}</pre><button class="btn btn-primary" onclick="game.showPage('home')">返回首页</button></div></div>`;
    }
  }

  // 显示探索页面
  showExplore() {
    this.showPage('explore');
  }

  // 显示商店
  showShop() {
    // TODO: 实现商店界面
    this.addLog('商店功能开发中...', '');
  }

  // 显示页面
  showPage(page) {
    const app = document.getElementById('app');
    let content = '';

    // 离开探索类页面时清除地点加成（探索/秘境类页面保留）
    if (page !== 'explore' && !page.startsWith('dungeon') && !page.startsWith('location')) {
      this.state.currentLocation = null;
    }

    try {
    switch (page) {
      case 'home':
        this.state.currentLocation = null; // 冗余但明确
        this.render();
        return;
      case 'explore':
        const currentDungeon = this.systems?.dungeon?.getStatus?.() || null;
        const inLocation = this.state.currentLocation != null;
        content = `
          ${!inLocation && currentDungeon ? `
            <div class="card" style="border-color:rgba(155,89,182,0.4)">
              <h3 style="color:#9b59b6">⚔️ 当前秘境：${currentDungeon.dungeonName}</h3>
              <div style="font-size:12px;color:#aaa">第${currentDungeon.currentLayer + 1}层：${currentDungeon.layerName}</div>
              <button class="btn btn-skill" onclick="game.showDungeonExplore()" style="width:100%;margin-top:8px">返回秘境</button>
            </div>
          ` : ''}
          <div class="card">
            <h3>${inLocation ? '地点详情' : '探索区域'}</h3>
            ${this.renderer.renderLocations()}
          </div>
          ${!inLocation ? `
          <div class="card">
            <h3>秘境副本</h3>
            <div style="font-size:12px;color:#aaa;margin-bottom:8px">挑战多层秘境，获取稀有奖励</div>
            <button class="btn btn-skill" onclick="game.showDungeonList()" style="width:100%">查看秘境列表</button>
          </div>
          <div class="card">
            <h3>交易</h3>
            <div style="font-size:12px;color:#aaa;margin-bottom:8px">坊市·拍卖会·黑市</div>
            <button class="btn btn-explore" onclick="game.showTrade()" style="width:100%">前往交易</button>
          </div>
          <div class="card">
            <h3>日常任务</h3>
            <div style="font-size:12px;color:#aaa;margin-bottom:8px">完成任务获取灵石和奖励</div>
            <button class="btn btn-primary" onclick="game.showDailyQuests()" style="width:100%">查看日常任务</button>
          </div>
          ${(() => {
            const chains = this.systems.eventChain?.getAllChainsStatus() || [];
            if (chains.length === 0) return '';
            return `<div class="card">
              <h3>  事件链</h3>
              ${chains.map(c => {
                const pct = Math.floor((c.currentStep / c.totalSteps) * 100);
                const color = c.completed ? '#4caf50' : '#f39c12';
                return `
                  <div style="margin-bottom:6px">
                    <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">
                      <span style="color:${color}">${c.completed ? '✓' : '●'} ${c.name}</span>
                      <span style="color:#aaa">${c.currentStep}/${c.totalSteps}</span>
                    </div>
                    <div class="bar" style="height:3px"><div class="fill" style="width:${pct}%;background:${color};height:3px"></div></div>
                  </div>
                `;
              }).join('')}
            </div>`;
          })()}
          ` : ''}
        `;
        break;
      case 'inventory':
        this.systems.tutorial.markBackpackVisited();
        this.checkOptionalTasks();
        content = `
          <div class="card">
            <h3>背包</h3>
            ${this.renderer.renderInventory()}
          </div>
        `;
        break;
      case 'skills':
        content = `
          <div class="card">
            <h3>功法</h3>
            ${this.renderer.renderSkills()}
          </div>
        `;
        break;
      case 'npc':
        content = `
          <div class="card">
            <h3>社交</h3>
            ${(() => {
              const rels = this.state.npcRelations || {};
              const npcKilled = this.state.npcKilled || [];
              const duals = this.state.dualRecords || {};
              const friendCount = Object.entries(rels).filter(([,r]) => r >= 40).length;
              const enemyCount = Object.entries(rels).filter(([,r]) => r < 0).length;
              const parts = [];
              if (friendCount > 0) parts.push(`好友${friendCount}`);
              if (enemyCount > 0) parts.push(`仇人${enemyCount}`);
              if (npcKilled.length > 0) parts.push(`击杀${npcKilled.length}`);
              if (Object.keys(duals).length > 0) parts.push(`双修${Object.keys(duals).length}次`);
              return parts.length > 0 ? `<div style="font-size:10px;color:#888;margin-bottom:6px">${parts.join(' | ')}</div>` : '';
            })()}
            ${this.renderer.renderNpcs()}
          </div>
        `;
        break;
      case 'cultivation':
        const player = this.state.player;
        const realms = window.gameData?.REALMS || [];
        const currentRealm = realms[player.realmIdx] || { name: '凡人', maxExp: 120 };
        const nextRealm = realms[player.realmIdx + 1];
        const expPercent = Math.min((player.exp / currentRealm.maxExp) * 100, 100);
        const speed = this.systems.cultivation.getCultivationSpeed();

        content = `
          <div class="card">
            <h3> 修为修炼</h3>
            <div style="font-size:12px;margin-bottom:8px">
              <div style="display:flex;justify-content:space-between">
                <span>当前境界：${currentRealm.name}</span>
                <span>修为：${player.exp}/${currentRealm.maxExp}</span>
              </div>
              ${currentRealm.majorRealm ? `
              <div style="display:flex;align-items:center;gap:4px;margin:6px 0;font-size:11px;color:#888">
                <span>${currentRealm.majorRealm}：</span>
                ${['初期','中期','后期','圆满'].map((stage, i) => {
                  const stageRealm = realms.find(r => r.majorRealm === currentRealm.majorRealm && r.subStage === i);
                  const stageIdx = stageRealm ? realms.indexOf(stageRealm) : -1;
                  const isCurrent = player.realmIdx === stageIdx;
                  const isPast = player.realmIdx > stageIdx;
                  return `<span style="color:${isCurrent ? '#ffd700' : isPast ? '#4caf50' : '#555'};font-weight:${isCurrent ? 'bold' : 'normal'}">${isPast ? '✓' : isCurrent ? '●' : '○'}${stage}</span>`;
                }).join(' → ')}
              </div>
              ` : ''}
              <div class="bar" style="margin:4px 0">
                <div class="fill fill-exp" style="width:${expPercent}%"></div>
              </div>
              <div style="color:#aaa;font-size:11px">
                修炼速度：${speed.toFixed(1)}修为/天
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
              <span style="color:#aaa;font-size:12px;white-space:nowrap">修炼时间：</span>
              <input type="number" id="cultivateDays" value="7" min="1" max="90" style="width:55px;padding:6px;border-radius:6px;border:1px solid rgba(255,215,0,0.3);background:rgba(0,0,0,0.3);color:#ffd700;font-size:14px;text-align:center" onchange="game.previewCultivate()" oninput="game.previewCultivate()">
              <span style="color:#aaa;font-size:12px">天</span>
              <button class="btn btn-primary" style="flex:1;font-size:14px" ${player.exp >= currentRealm.maxExp ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''} onclick="game.startCustomCultivate()">开始修炼</button>
            </div>
            <div id="cultivatePreview" style="margin-top:4px;font-size:11px;color:#888;text-align:center">
              预计修为：${Math.floor(speed * 7 * 5 * 0.8)} ~ ${Math.floor(speed * 7 * 5 * 1.2)}
            </div>
            ${player.exp >= currentRealm.maxExp ? '<div style="color:#ffd700;font-size:11px;text-align:center;margin-top:4px">修为已达上限，请先突破！</div>' : ''}
            <div class="grid2" style="margin-top:8px">
              <button class="btn btn-heal" onclick="game.rest(1)">休养1天</button>
              <button class="btn btn-heal" onclick="game.rest(3)">休养3天</button>
            </div>
            ${nextRealm ? `
              <div style="margin-top:12px;padding:10px;background:rgba(155,89,182,0.1);border-radius:8px;border:1px solid rgba(155,89,182,0.3)">
                <div style="font-size:12px;color:#9b59b6;font-weight:bold;margin-bottom:8px">  突破信息</div>
                <div style="font-size:11px;color:#aaa;line-height:1.8">
                  <div>目标境界：${nextRealm.name}</div>
                  <div>所需修为：${nextRealm.maxExp}</div>
                  <div>当前修为：${player.exp}/${currentRealm.maxExp}</div>
                  <div>成功率：${this.systems.breakthrough.calcSuccessRate()}%</div>
                  <div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.1)">
                    <div style="color:#ffd700;font-size:10px">成功率影响因素：</div>
                    <div style="font-size:10px;color:#888">• 灵根加成：${this.state.player.root.type.name}</div>
                    <div style="font-size:10px;color:#888">• 悟性加成：${Math.min(this.state.player.comprehension * 0.2, 20)}%</div>
                    <div style="font-size:10px;color:#888">• 机缘加成：${Math.min(this.state.player.fortune * 0.15, 15)}%</div>
                  </div>
                </div>
                ${this.state.breakthroughPill ? `<div style="font-size:11px;color:#f39c12;margin-top:4px">💊 突破丹生效中：${this.state.breakthroughPill.realm || ''}期成功率+${this.state.breakthroughPill.bonus}%</div>` : ''}
                ${this.state.ascendPrep ? `
                  <div style="font-size:10px;color:#888;margin-top:2px">⬆ 飞升准备：${this.state.ascendPrep.body ? '✅' : '❌'}炼体 ${this.state.ascendPrep.artifact ? '✅' : '❌'}法宝 ${this.state.ascendPrep.pill ? '✅' : '❌'}飞升丹</div>
                  <div style="display:flex;gap:4px;margin-top:4px">
                    <button class="btn btn-heal" style="font-size:10px;flex:1;padding:3px" ${this.state.ascendPrep.body ? 'disabled' : ''} onclick="game.prepareAscend('body')">炼体${this.state.ascendPrep.body?'✅':''}</button>
                    <button class="btn btn-explore" style="font-size:10px;flex:1;padding:3px" ${this.state.ascendPrep.artifact ? 'disabled' : ''} onclick="game.prepareAscend('artifact')">法宝${this.state.ascendPrep.artifact?'✅':''}</button>
                    <button class="btn btn-skill" style="font-size:10px;flex:1;padding:3px" ${this.state.ascendPrep.pill ? 'disabled' : ''} onclick="game.prepareAscend('pill')">渡劫丹${this.state.ascendPrep.pill?'✅':''}</button>
                  </div>
                  ${this.state.ascendPrep.body && this.state.ascendPrep.artifact && this.state.ascendPrep.pill ? '<button class="btn btn-combat" style="width:100%;margin-top:4px;font-size:12px" onclick="game.startAscendTrial()">⚡ 开始渡劫</button>' : ''}
                ` : ''}
                <button class="btn btn-skill" onclick="game.attemptBreakthrough()" style="width:100%;margin-top:8px">尝试突破</button>
              </div>
            ` : ''}
          </div>
          ${this.renderer.renderBodyPanel()}
          ${this.renderer.renderSensePanel()}
        `;
        break;
      case 'craft':
        content = `
          <div class="card">
            <h3>异火/丹炉</h3>
            <div style="font-size:12px;color:#aaa;margin-bottom:8px">装备异火和丹炉提升炼丹成功率</div>
            <button class="btn btn-explore" onclick="game.showForge()" style="width:100%">管理异火/丹炉</button>
          </div>
          ${this.renderer.renderAlchemyPanel()}
          ${this.renderer.renderTalismanPanel()}
          ${this.renderer.renderArtifactPanel()}
        `;
        break;
      case 'beast':
        content = `
          ${this.renderer.renderBeastPanel()}
          ${this.renderer.renderPuppetPanel()}
        `;
        break;
      case 'bottle':
        content = this.renderer.renderBottlePanel();
        break;
      case 'more':
        content = `
          <div class="card">
            <h3>更多功能</h3>
            <div style="display:flex;flex-direction:column;gap:8px">
              <button class="btn btn-skill" onclick="game.showPage('skills')" style="width:100%">  功法（修炼/战斗功法）</button>
              <button class="btn btn-combat" onclick="game.showEquipment()" style="width:100%">⚔️ 装备栏（法宝装备）</button>
              <button class="btn btn-explore" onclick="game.showPage('craft')" style="width:100%"> ️ 制作（炼丹/制符/法宝）</button>
              <button class="btn btn-primary" onclick="game.showPage('beast')" style="width:100%">  灵兽/傀儡</button>
              <button class="btn btn-heal" onclick="game.showPage('bottle')" style="width:100%">  掌天瓶</button>
              <button class="btn btn-skill" onclick="game.showSectPage()" style="width:100%">  宗门</button>
              <button class="btn btn-explore" onclick="game.showAchievements()" style="width:100%">  成就系统</button>
              <button class="btn btn-destroy" onclick="if(confirm('确定要重置游戏吗？所有进度将丢失！')){game.resetGame()}" style="width:100%">  重置游戏</button>
            </div>
          </div>
        `;
        break;
      case 'settings':
        content = `
          <div class="card">
            <h3>设置</h3>
            <div style="font-size:12px;color:#888;margin-bottom:12px;text-align:center">游戏自动保存，无需手动操作</div>
            <div class="grid2">
              <button class="btn btn-heal" onclick="game.resetGame()">重置游戏</button>
            </div>
          </div>
        `;
        break;
    }

    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        ${content}
        <div class="nav-bar">
          <div class="nav-item" onclick="game.showPage('home')" style="position:relative">  首页 ${this.systems.notification.renderRedDot(this.systems.notification.getRedDot('home'))}</div>
          <div class="nav-item ${page === 'explore' ? 'active' : ''}" onclick="game.showPage('explore')" style="position:relative"> ️ 探索 ${this.systems.notification.renderRedDot(this.systems.notification.getRedDot('explore'))}</div>
          <div class="nav-item ${page === 'cultivation' ? 'active' : ''}" onclick="game.showPage('cultivation')" style="position:relative">  修炼</div>
          <div class="nav-item ${page === 'inventory' ? 'active' : ''}" onclick="game.showPage('inventory')" style="position:relative">  背包</div>
          <div class="nav-item ${page === 'more' ? 'active' : ''}" onclick="game.showPage('more')" style="position:relative">  更多</div>
        </div>
      </div>
    `;
    } catch (e) {
      console.error('页面渲染失败:', e);
      app.innerHTML = `<div class="game"><div class="card"><h3>页面渲染错误</h3><pre style="color:#e74c3c;font-size:12px;white-space:pre-wrap">${e.message}</pre><button class="btn btn-primary" onclick="game.showPage('home')">返回首页</button></div></div>`;
    }
    // 每次页面切换自动存档
    this.saveGame();
  }

  // 显示成就页面
  showAchievements() {
    const app = document.getElementById('app');

    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        ${this.renderer.renderAchievementPanel()}
        <div class="nav-bar">
          <div class="nav-item" onclick="game.showPage('home')" style="position:relative">  首页</div>
          <div class="nav-item" onclick="game.showPage('explore')" style="position:relative"> ️ 探索</div>
          <div class="nav-item" onclick="game.showPage('cultivation')" style="position:relative">  修炼</div>
          <div class="nav-item" onclick="game.showPage('inventory')" style="position:relative">  背包</div>
          <div class="nav-item" onclick="game.showPage('more')" style="position:relative">  更多</div>
        </div>
      </div>
    `;
  }

  // 显示宗门页面
  showSectPage() {
    const sect = this.state.sect;
    const app = document.getElementById('app');
    const currentLocation = this.state.playerLocation;

    if (!sect) {
      // 没有加入宗门，显示可加入宗门列表
      const { SECTS, LOCATIONS } = window.gameData;
      const sects = SECTS || []; // 显示全部宗门
      const allLocations = Object.values(LOCATIONS || {}).flat();

      app.innerHTML = `
        <div class="game">
          ${this.renderer.renderStatusBar()}
          <div class="card">
            <h3>  宗门</h3>
            <button class="btn btn-heal" onclick="game.showPage('more')" style="width:100%">← 返回更多</button>
          </div>
          <div class="card">
            <h3>加入宗门</h3>
            <div style="font-size:12px;color:#aaa;margin-bottom:8px">选择一个宗门加入，获得专属功法和资源</div>
            <div style="font-size:10px;color:#4fc3f7;margin-bottom:8px">⚠️ 需要到达宗门所在位置才能加入</div>
            ${sects.map(s => {
              const locData = allLocations.find(l => l.id === s.location);
              const locName = locData?.name || s.location;
              const isAtLocation = currentLocation === s.location;
              return `
                <div class="inv-item" style="text-align:left;padding:10px;margin-bottom:6px;cursor:pointer;${isAtLocation ? 'border-color:rgba(76,175,80,0.5)' : 'opacity:0.8'}" onclick="game.joinSect('${s.id}')">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <span style="color:#ffd700;font-weight:bold">${s.name}</span>
                    <span style="font-size:10px;color:${s.type === '正道' ? '#4ad06a' : '#e74c3c'}">${s.type}</span>
                  </div>
                  <div style="font-size:11px;color:#aaa;margin-top:4px">${s.desc || '暂无描述'}</div>
                  <div style="font-size:10px;margin-top:2px">
                    <span style="color:#888">位置：${locName}</span>
                    ${isAtLocation ? '<span style="color:#4ad06a;margin-left:8px">✓ 当前位置</span>' : '<span style="color:#e74c3c;margin-left:8px">需前往</span>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else {
      // 已加入宗门，显示宗门详情
      const { SECTS, LOCATIONS } = window.gameData;
      const sectData = SECTS?.find(s => s.id === sect.id);
      const allLocations = Object.values(LOCATIONS || {}).flat();
      const locData = allLocations.find(l => l.id === sectData?.location);
      const locName = locData?.name || sectData?.location || '未知';

      app.innerHTML = `
        <div class="game">
          ${this.renderer.renderStatusBar()}
          <div class="card">
            <h3>  ${sect.name}</h3>
            <button class="btn btn-heal" onclick="game.showPage('more')" style="width:100%">← 返回更多</button>
          </div>
          <div class="card">
            <h3>宗门信息</h3>
            <div style="margin-bottom:8px">
              <div>职位：<span style="color:#ffd700">${sect.rank}</span></div>
              <div>贡献：<span style="color:#ffd700">${sect.contribution}</span></div>
              <div>类型：<span style="color:${sectData?.type === '正道' ? '#4ad06a' : '#e74c3c'}">${sectData?.type || '未知'}</span></div>
              <div>位置：<span style="color:#4fc3f7">${locName}</span></div>
            </div>
            <div style="font-size:12px;color:#aaa;margin-bottom:8px">${sectData?.desc || '暂无描述'}</div>
          </div>
          <div class="card">
            <h3>操作</h3>
            <div style="display:flex;flex-direction:column;gap:8px">
              <button class="btn btn-primary" onclick="game.showSectQuests()" style="width:100%">📋 宗门任务板</button>
              <button class="btn btn-explore" onclick="game.showSectShop()" style="width:100%">💎 贡献兑换（${sect.contribution}贡献）</button>
              <button class="btn btn-combat" onclick="game.leaveSect()" style="width:100%;background:rgba(231,76,60,0.3);border-color:rgba(231,76,60,0.5)">🚪 离开宗门（非叛宗）</button>
              <button class="btn btn-heal" onclick="game.betraySect()" style="width:100%;background:rgba(231,76,60,0.2);border-color:rgba(231,76,60,0.3)">💀 叛宗</button>
            </div>
            ${sect.activeQuest ? `
            <div style="margin-top:8px;padding:8px;background:rgba(255,215,0,0.1);border-radius:6px;border:1px solid rgba(255,215,0,0.2)">
              <div style="font-size:11px;color:#f39c12">📋 进行中：${sect.activeQuest.name}</div>
              <div style="font-size:10px;color:#aaa;margin-top:2px">${this._getQuestProgressText(sect.activeQuest)}</div>
              <button class="btn btn-primary" onclick="game.finishSectQuest()" style="width:100%;margin-top:4px;font-size:11px">提交任务</button>
            </div>` : ''}
          </div>
          ${(() => {
            const { NPCS } = window.gameData;
            const sectNpcs = NPCS?.filter(n => n.location === sectData?.location) || [];
            if (sectNpcs.length === 0) return '';
            return `<div class="card">
              <h3 style="color:#ffd700">  宗门成员</h3>
              ${sectNpcs.map(n => `
                <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.selectNpcFromLocation('${n.id}')">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <span style="color:#ffd700;font-size:12px">${n.name}</span>
                    <span style="font-size:10px;color:${n.type === 'elder' ? '#ff6b6b' : n.type === 'merchant' ? '#ffd700' : n.type === 'enemy' ? '#e74c3c' : '#4caf50'}">${n.type === 'elder' ? '长老' : n.type === 'merchant' ? '商人' : n.type === 'enemy' ? '敌对' : '弟子'} · ${n.realm}</span>
                  </div>
                </div>
              `).join('')}
            </div>`;
          })()}
        </div>
      `;
    }
  }

  // 加入宗门
  joinSect(sectId) {
    const result = this.systems.sect.join(sectId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showSectPage();
    } else {
      this.addLog(result.text, 'warning');
    }
  }

  // 显示宗门任务板
  showSectQuests() {
    if (!this.state.sect) return;
    const quests = this.systems.sect.getSectQuests();
    const activeQuest = this.state.sect.activeQuest;
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>📋 宗门任务板</h3>
          <div style="font-size:10px;color:#888;margin-bottom:8px">当前贡献：${this.state.sect.contribution} | 职级：${this.state.sect.rank}</div>
          <button class="btn btn-heal" onclick="game.showSectPage()" style="width:100%;margin-bottom:8px">← 返回宗门</button>
        </div>
        
        ${activeQuest ? `
        <div class="card" style="border-color:rgba(255,215,0,0.3);background:rgba(255,215,0,0.05)">
          <h3 style="color:#f39c12">📋 进行中的任务</h3>
          <div style="font-size:12px;color:#fff">${activeQuest.name}</div>
          <div style="font-size:10px;color:#aaa;margin-top:4px">${this._getQuestProgressText(activeQuest)}</div>
          <button class="btn btn-primary" onclick="game.finishSectQuest()" style="width:100%;margin-top:8px">提交任务</button>
        </div>
        ` : ''}
        
        <div class="card">
          <h3>可选任务</h3>
          ${quests.length === 0 ? '<div class="empty">暂无可用任务</div>' : quests.map(q => `
            <div class="inv-item" style="text-align:left;padding:10px;margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:#ffd700;font-size:12px">${q.name}</span>
                <span style="font-size:10px;color:#4caf50">+${q.reward.contribution}贡献${q.reward.exp > 0 ? ' +' + q.reward.exp + '修为' : ''}</span>
              </div>
              <div style="font-size:10px;color:#aaa;margin-top:2px">${q.description}</div>
              ${q.minRealm ? `<div style="font-size:9px;color:#888">需要≥${window.gameData?.REALMS?.[q.minRealm]?.name || '?'}</div>` : ''}
              <button class="btn btn-explore" style="width:100%;margin-top:4px;font-size:11px" ${activeQuest ? 'disabled' : ''} onclick="game.acceptSectQuestTask('${q.id}')">${activeQuest ? '先完成当前任务' : '接受任务'}</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 接受宗门任务
  acceptSectQuestTask(questId) {
    const result = this.systems.sect.acceptSectQuest(questId);
    if (result.success) {
      this.addLog(result.text, 'info');
      const quest = result.quest;
      if (quest?.type === 'time') {
        this.systems.time.advanceTime(quest.cost.days);
        this.addLog(`你在宗门巡逻了${quest.cost.days}天。`, '');
      }
      if (quest?.type === 'duel') {
        // 开始切磋：生成对手并跳转切磋界面
        const opponent = this.systems.sect.startDuel();
        this.state.sect.activeQuest.opponent = opponent;
        this.state.sect.activeQuest.playerStartHp = this.state.player.hp;
        this.showSectDuel();
        return; // 不跳任务板，直接进切磋
      }
    } else {
      this.showToast(result.text, 'warning');
    }
    this.showSectQuests();
  }

  // 切磋界面
  showSectDuel() {
    const quest = this.state.sect.activeQuest;
    if (!quest || !quest.opponent) { this.showSectQuests(); return; }
    const opp = quest.opponent;
    const player = this.state.player;
    const pMaxHp = player.maxHp || 100;
    const pHalf = Math.floor(pMaxHp / 2);
    const oHalf = Math.floor(opp.maxHp / 2);
    
    const log = this.state._duelLog || [];
    
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>⚔️ 同门切磋</h3>
          <div style="font-size:10px;color:#888;margin-bottom:8px">规则：血量先低于一半者判负</div>
          
          <!-- 玩家 -->
          <div style="padding:10px;background:rgba(52,152,219,0.1);border-radius:8px;margin-bottom:8px">
            <div style="font-size:12px;color:#3498db;margin-bottom:4px">🛡️ 你（${player.hp}/${pMaxHp}）| 半血线：${pHalf}</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${Math.max(0, (player.hp / pMaxHp) * 100)}%;height:100%;background:linear-gradient(90deg,#e74c3c,#f39c12,#4caf50);transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;color:#aaa;margin-top:2px">攻击: ${player.atk || 10} | 防御: ${player.def || 5}</div>
          </div>
          
          <!-- 对手 -->
          <div style="padding:10px;background:rgba(231,76,60,0.1);border-radius:8px;margin-bottom:8px">
            <div style="font-size:12px;color:#e74c3c;margin-bottom:4px">⚔️ ${opp.name}（${opp.realm}）| 半血线：${oHalf}</div>
            <div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;overflow:hidden">
              <div style="width:${Math.max(0, (opp.hp / opp.maxHp) * 100)}%;height:100%;background:linear-gradient(90deg,#e74c3c,#f39c12,#4caf50);transition:width 0.3s"></div>
            </div>
            <div style="font-size:10px;color:#aaa;margin-top:2px">HP: ${opp.hp}/${opp.maxHp} | 攻击: ${opp.atk} | 防御: ${opp.def}</div>
          </div>
          
          <!-- 战斗日志 -->
          ${log.length > 0 ? `<div style="margin-bottom:8px;max-height:120px;overflow-y:auto;font-size:10px;color:#ccc;line-height:1.5">${[...log].reverse().slice(0, 8).map(l => `<div>${l}</div>`).join('')}</div>` : ''}
          
          <button class="btn btn-primary" onclick="game.doDuelRound()" style="width:100%">⚔️ 攻击</button>
          <button class="btn btn-heal" onclick="game.finishSectDuelRun()" style="width:100%;margin-top:4px;font-size:10px;color:#aaa">🏳️ 认输</button>
        </div>
      </div>
    `;
  }
  
  // 切磋一回合
  doDuelRound() {
    const quest = this.state.sect.activeQuest;
    if (!quest || !quest.opponent) return;
    const opp = quest.opponent;
    const player = this.state.player;
    
    if (!this.state._duelLog) this.state._duelLog = [];
    
    // 玩家攻击对手
    const result = this.systems.sect.executeDuelRound(
      player.hp, player.maxHp, player.atk || 10, player.def || 5,
      opp.hp, opp.maxHp, opp.atk, opp.def
    );
    opp.hp = result.defenderHp;
    this.state._duelLog.push(`你 → ${opp.name}：${result.log}`);
    
    if (result.defenderLost) {
      // 对手血量低于一半，赢了！
      this.state._duelLog.push(`🏆 ${opp.name}血量不足一半，你赢了！`);
      this.finishSectDuel(true);
      return;
    }
    
    // 对手攻击玩家
    const result2 = this.systems.sect.executeDuelRound(
      opp.hp, opp.maxHp, opp.atk, opp.def,
      player.hp, player.maxHp, player.atk || 10, player.def || 5
    );
    player.hp = result2.defenderHp;
    this.state._duelLog.push(`${opp.name} → 你：${result2.log}`);
    
    if (result2.defenderLost) {
      // 玩家血量低于一半，输了！
      this.state._duelLog.push(`💀 你血量不足一半，败北！`);
      this.finishSectDuel(false);
      return;
    }
    
    this.showSectDuel();
  }
  
  // 切磋结束
  finishSectDuel(victory) {
    const quest = this.state.sect.activeQuest;
    const opp = quest?.opponent;
    const player = this.state.player;
    
    // 战斗后恢复血量（死战后的仁慈）
    if (!victory) {
      player.hp = Math.ceil(player.maxHp * 0.4); // 输了回40%
      this.addLog('你在切磋中落败，师门给你包扎了伤口。', '');
    }
    
    if (victory) {
      // 赢：正常奖励
      const result = this.systems.sect.addContribution(quest.reward.contribution);
      const maxExp = window.gameData?.REALMS?.[player.realmIdx]?.maxExp || 999999;
      player.exp = Math.min(player.exp + quest.reward.exp, maxExp);
      this.addLog(`切磋胜利！贡献+${quest.reward.contribution}，修为+${quest.reward.exp}`, 'success');
      if (result.rank) {
        this.addLog(`恭喜！晋升为${result.rank}！`, 'highlight');
      }
    } else {
      // 输：减半奖励
      const halfContrib = Math.floor(quest.reward.contribution / 2);
      this.systems.sect.addContribution(halfContrib);
      this.addLog(`切磋落败，获得${halfContrib}贡献（安慰奖）`, 'info');
    }
    
    // 清理状态
    this.state.sect.activeQuest = null;
    this.state._duelLog = null;
    this.state.sect.activeQuest = null;
    
    this.saveGame();
    this.showPage('cultivation');
  }
  
  // 认输
  finishSectDuelRun() {
    this.finishSectDuel(false);
  }

  // 提交宗门任务
  finishSectQuest() {
    const result = this.systems.sect.completeSectQuest();
    if (result.success) {
      this.addLog(result.text, 'success');
      if (result.rank) {
        this.addLog(`恭喜！晋升为${result.rank}！`, 'highlight');
        this.showToast(`晋升为${result.rank}！`, 'success');
      }
    } else {
      this.showToast(result.text, 'warning');
    }
    this.showSectQuests();
  }

  // 任务进度描述帮助
  _getQuestProgressText(quest) {
    switch (quest?.type) {
      case 'time': return '⚡ 提交即完成';
      case 'duel': return '⚔️ 与同门切磋（血量先低于一半者判负）';
      case 'gather':
      case 'offering': return `需要：${quest.cost.item} x${quest.cost.count}（在背包中检查）`;
      case 'combat':
      case 'elite_combat': return `击杀进度：${quest.progress || 0}/2（在宗门所在地探索）`;
      case 'exp_sacrifice': return `扣${quest.cost.exp}修为（在面板中检查）`;
      default: return '提交即完成';
    }
  }

  // 离开宗门（非叛宗）
  leaveSect() {
    const result = this.systems.sect.leave();
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text || '无法离开宗门', 'warning');
    }
    this.showPage('more');
  }

  // 宗门贡献兑换商店
  showSectShop() {
    const sect = this.state.sect;
    if (!sect) return;

    const shopItems = [
      { id: 'herb', name: '灵草', desc: '炼丹材料', cost: 15 },
      { id: 'purple_fungus', name: '紫芝', desc: '高阶材料', cost: 60 },
      { id: 'beast_core', name: '兽丹', desc: '灵兽饲料', cost: 50 },
      { id: 'iron', name: '铁精', desc: '炼器材料', cost: 40 },
      { id: 'heal_pill', name: '金创药', desc: '恢复HP', cost: 25 },
      { id: 'mp_pill', name: '回灵丹', desc: '恢复MP', cost: 70 }
    ];

    const sectSkills = this.systems.sect.getSectSkills();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>  宗门贡献兑换</h3>
          <div style="font-size:12px;color:#f39c12;margin-bottom:8px">当前贡献：${sect.contribution}</div>
          
          ${sectSkills.length > 0 ? `
          <div style="font-size:12px;color:#ffd700;margin:12px 0 8px 0;border-top:1px solid rgba(255,215,0,0.2);padding-top:8px">宗门专属功法</div>
          ${sectSkills.map(skill => {
            const gradeCostMap = { '黄级': 80, '玄级': 200, '地级': 500, '天级': 1500, '灵级': 3000, '仙级': 5000, '神级': 10000 };
            const cost = gradeCostMap[skill.grade] || 80;
            const gradeColorMap = { '黄级': '#f39c12', '玄级': '#3498db', '地级': '#9b59b6', '天级': '#ff6b6b', '灵级': '#e74c3c', '仙级': '#ff9800', '神级': '#ff5722' };
            const gradeColor = gradeColorMap[skill.grade] || '#aaa';
            return `
            <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div>
                  <span style="color:#ffd700;font-size:12px">${skill.name}</span>
                  <span style="font-size:10px;margin-left:8px;color:${gradeColor}">${skill.grade}</span>
                </div>
                <button class="btn btn-skill" style="font-size:11px;padding:4px 12px" ${sect.contribution >= cost ? '' : 'disabled style="opacity:0.4"'} onclick="game.learnSectSkill('${skill.id}')">${cost}贡献</button>
              </div>
              <div style="font-size:10px;color:#aaa;margin-top:2px">${skill.desc || ''}</div>
            </div>
          `}).join('')}
          <div style="font-size:10px;color:#888;margin-bottom:8px">功法会添加到功法列表，可在"更多→功法"中查看</div>
          ` : ''}
          
          <div style="font-size:12px;color:#ffd700;margin:12px 0 8px 0;border-top:1px solid rgba(255,215,0,0.2);padding-top:8px">材料兑换</div>
          ${shopItems.map(item => `
            <div class="inv-item" style="display:flex;justify-content:space-between;align-items:center;padding:8px;margin-bottom:4px">
              <div>
                <span style="color:#ffd700;font-size:12px">${item.name}</span>
                <div style="font-size:10px;color:#aaa">${item.desc}</div>
              </div>
              <button class="btn btn-primary" style="font-size:11px;padding:4px 12px" ${sect.contribution >= item.cost ? '' : 'disabled style="opacity:0.4"'} onclick="game.sectExchangeItem('${item.id}', ${item.cost})">${item.cost}贡献</button>
            </div>
          `).join('')}
          <button class="btn btn-heal" onclick="game.showSectPage()" style="width:100%;margin-top:8px">返回宗门</button>
        </div>
      </div>
    `;
  }

  // 学习宗门功法
  learnSectSkill(skillId) {
    const result = this.systems.sect.learnSectSkill(skillId);
    if (result.success) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text || '学习失败', 'warning');
    }
    this.showSectShop();
  }

  // 兑换物品
  sectExchangeItem(itemId, cost) {
    const result = this.systems.sect.exchange(itemId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text || '兑换失败', 'warning');
    }
    this.showSectShop();
  }

  // 快速完成宗门猎杀/采集任务（通过探索触发）
  tryAdvanceSectCombatQuest() {
    this.systems.sect.advanceCombatQuest();
  }

  // 飞升准备
  prepareAscend(action) {
    const result = this.systems.breakthrough.prepareAscend(action);
    if (result.success) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text || '准备失败', 'warning');
    }
    this.showPage('cultivation');
  }

  // 开始渡劫
  startAscendTrial() {
    const result = this.systems.breakthrough.ascendTrial();
    if (result.success) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.checkDeath();
    this.saveGame();
    this.showPage('cultivation');
  }

  // NPC任务推进
  advanceNpcQuests(action, targetId) {
    const quests = this.state.quests || [];
    if (quests.length === 0) return;
    
    // 将action映射到step类型
    const actionToType = {
      'explore': 'visit',
      'visit': 'visit',
      'kill': 'combat',
      'combat': 'combat',
      'talk': 'talk',
      'gather': 'gather',
      'craft': 'craft',
      'breakthrough': 'breakthrough'
    };
    const expectedType = actionToType[action];
    if (!expectedType) return;

    quests.forEach(q => {
      const step = q.steps?.[q.currentStep];
      if (!step) return;
      
      // 检查步骤类型是否匹配
      if (step.type !== expectedType) return;
      
      // 检查目标是否匹配（宽松匹配）
      const stepTarget = (step.target || '').toLowerCase();
      const actualTarget = (targetId || '').toLowerCase();
      
      // 泛型目标：任何匹配类型的动作都算完成
      const genericTargets = ['beast', 'npc', 'quest', 'new_area'];
      const isGeneric = genericTargets.includes(stepTarget);
      
      // 特定目标：需要精确或包含匹配
      const exactMatch = !stepTarget || actualTarget === stepTarget ||
        actualTarget.includes(stepTarget) || stepTarget.includes(actualTarget);
      
      if (!isGeneric && !exactMatch) return;
      
      const result = this.systems.npc.completeQuestStep(q.id);
      if (result?.success) {
        const nextStep = q.steps[q.currentStep];
        const stepText = nextStep ? ` → 下一步：${nextStep.text}` : '';
        this.addLog(`任务「${q.name}」进度：${q.currentStep}/${q.steps.length}${stepText}`, 'info');
      }
      if (result?.completed) {
        this.addLog(`NPC任务「${q.name}」完成！`, 'highlight');
        this.showToast(`NPC任务完成！`, 'success');
      }
    });
  }

  // 升级掌天瓶
  upgradeBottle() {
    const result = this.systems.bottle.upgradeBottle();
    if (result.success) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text || '升级失败', 'warning');
    }
    this.showPage('bottle');
  }

  // 法宝封印
  sealArtifact(id) { this._artifactAction('sealArtifact', id); }
  // 法宝解封
  unsealArtifact(id) { this._artifactAction('unsealArtifact', id); }
  // 法宝修复
  repairArtifact(id) { this._artifactAction('repairArtifact', id); }

  // 法宝高级操作菜单
  showArtifactActions(id) {
    const artifact = this.state.artifacts.find(a => a.id === id);
    if (!artifact) return;
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">${this.renderer.renderStatusBar()}
        <div class="card" style="text-align:center">
          <h3>${artifact.name} · 高级操作</h3>
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:12px">
            <button class="btn btn-combat" onclick="game.selfDestructArtifact('${id}')">💥 自爆（攻击x5，HP-30%）</button>
            <button class="btn btn-explore" onclick="game.artifactFuse('${id}')">⚗️ 融合另一法宝</button>
            <button class="btn btn-skill" onclick="game.sacrificeArtifact('${id}')">🔥 献祭（修为+，法宝消失）</button>
            <button class="btn btn-heal" onclick="game.checkArtifactResonance()">🔮 检查共鸣组合</button>
          </div>
          <button class="btn btn-heal" onclick="game.showPage('craft')" style="width:100%;margin-top:8px">返回</button>
        </div>
      </div>
    `;
  }

  // 法宝自爆
  selfDestructArtifact(id) { this._artifactAction('selfDestructArtifact', id); }
  // 献祭
  sacrificeArtifact(id) { this._artifactAction('sacrifice', id); }
  // 共鸣
  checkArtifactResonance() {
    const result = this.systems.artifact.checkResonance();
    if (result?.active) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result?.text || '无共鸣组合', 'info');
    }
    this.showPage('craft');
  }

  // 法宝融合
  artifactFuse(id) {
    this.state._fuseTarget = id;
    this.showPage('inventory');
    this.showToast('请点击背包中另一件同品阶法宝进行融合', 'info');
    // 点击背包物品时检查是否是融合目标
    const origOnClick = this.showItemDetail;
    this.showItemDetail = (itemId) => {
      if (this.state._fuseTarget && itemId !== this.state._fuseTarget) {
        const result = this.systems.artifact.fuse(this.state._fuseTarget, itemId);
        if (result.success) {
          this.addLog(result.text, 'highlight');
          this.showToast(result.text, 'success');
        } else {
          this.showToast(result.text || '融合失败', 'warning');
        }
        this.state._fuseTarget = null;
        this.showPage('craft');
      }
    };
  }

  _artifactAction(action, id) {
    const method = this.systems.artifact[action];
    if (!method) return;
    const result = action === 'selfDestructArtifact' ? method.call(this.systems.artifact, id) : method.call(this.systems.artifact, id);
    if (result.success) {
      this.addLog(result.text, 'highlight');
      this.showToast(result.text, 'success');
    } else {
      this.showToast(result.text || '操作失败', 'warning');
    }
    this.showPage('craft');
  }

  // 添加日志
  addLog(text, type = '') {
    this.state.logs.push({ text, type });
    if (this.state.logs.length > 50) {
      this.state.logs.shift();
    }
  }

  // 显示悬浮弹窗提示
  showToast(message, type = 'success', duration = 2000) {
    // 移除已有的toast
    const existing = document.querySelector('.toast-message');
    if (existing) existing.remove();

    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.textContent = message;

    // 添加样式
    toast.style.cssText = `
      position: fixed;
      top: 60px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: bold;
      z-index: 9999;
      animation: toastIn 0.3s ease forwards;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      max-width: 80%;
      text-align: center;
    `;

    // 根据类型设置颜色
    switch (type) {
      case 'success':
        toast.style.background = 'linear-gradient(135deg, #4ad06a, #2ecc71)';
        toast.style.color = '#fff';
        break;
      case 'warning':
        toast.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
        toast.style.color = '#fff';
        break;
      case 'error':
        toast.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        toast.style.color = '#fff';
        break;
      case 'highlight':
        toast.style.background = 'linear-gradient(135deg, #ffd700, #f39c12)';
        toast.style.color = '#000';
        break;
      default:
        toast.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        toast.style.color = '#fff';
    }

    document.body.appendChild(toast);

    // 自动消失
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // 检查成就
  checkAchievements() {
    const newAchievements = this.systems.achievement.check();
    newAchievements.forEach(a => {
      this.addLog(`成就解锁：${a.name}`, 'highlight');
      if (a.reward) {
        if (a.reward.exp) {
        const maxExp = window.gameData?.REALMS?.[this.state.player.realmIdx]?.maxExp || 120;
        this.state.player.exp = Math.min(this.state.player.exp + a.reward.exp, maxExp);
        this.addLog(`成就奖励：修为+${a.reward.exp}`, 'highlight');
      }
        if (a.reward.stones) {
        this.state.player.spiritStones += a.reward.stones;
        this.state.stats.totalStonesEarned = (this.state.stats.totalStonesEarned || 0) + a.reward.stones;
      }
      }
    });
  }

  // === 秘境系统UI ===

  // 显示秘境列表
  showDungeonList() {
    const dungeons = this.systems.dungeon.getAvailableDungeons();
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>秘境副本</h3>
          ${dungeons.map(d => `
            <div class="inv-item" style="text-align:left;padding:10px;margin-bottom:6px;${d.available ? 'cursor:pointer' : 'opacity:0.5'}" ${d.available ? `onclick="game.enterDungeon('${d.id}')"` : ''}>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="color:#ffd700;font-weight:bold">${d.name}</span>
                <span style="font-size:10px;color:${d.available ? '#4ad06a' : '#aaa'}">${d.status}</span>
              </div>
              <div style="font-size:11px;color:#aaa;margin-top:4px">${d.desc}</div>
              <div style="font-size:10px;color:#666;margin-top:2px">
                层数:${d.layers} | 入口:${d.entryName || d.entry} | 推荐:${window.gameData?.REALMS?.[d.minRealmIdx]?.name || '?'}~${window.gameData?.REALMS?.[d.maxRealmIdx]?.name || '?'}
                ${d.cd > 0 ? ` | CD:${d.cd}年` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-heal" onclick="game.showPage('explore')" style="width:100%">返回探索</button>
      </div>
    `;
  }

  // 进入秘境
  enterDungeon(dungeonId) {
    const result = this.systems.dungeon.enterDungeon(dungeonId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showDungeonExplore();
    } else {
      this.addLog(result.text, 'warning');
    }
  }

  // 显示秘境探索界面
  showDungeonExplore() {
    const status = this.systems.dungeon.getStatus();
    if (!status) {
      this.showDungeonList();
      return;
    }

    const dungeon = this.systems.dungeon.dungeons.find(d => d.id === status.id);
    const layer = dungeon?.layersData?.[status.currentLayer];

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card" style="border-color:rgba(155,89,182,0.4)">
          <h3 style="color:#9b59b6">⚔️ ${status.dungeonName}</h3>
          <div style="color:#ffd700;font-size:14px;margin-bottom:8px">第${status.currentLayer + 1}层：${status.layerName}</div>
          <div style="font-size:12px;color:#aaa">
            探索次数：${status.explored}/${status.maxExplore}
            ${status.hasBoss ? `<br><span style="color:#e74c3c">BOSS：${status.bossName}</span>` : '<br><span style="color:#4ad06a">本层BOSS已击败</span>'}
          </div>
        </div>
        <div class="card">
          <h3>操作</h3>
          <div class="grid2">
            <button class="btn btn-explore" onclick="game.dungeonExplore()" ${status.explored >= status.maxExplore ? 'disabled' : ''}>
              探索 (${status.maxExplore - status.explored}次)
            </button>
            ${status.hasBoss ? `
              <button class="btn btn-combat" onclick="game.dungeonChallengeBoss()">⚔️ 挑战BOSS</button>
            ` : `
              <button class="btn btn-primary" onclick="game.dungeonNextLayer()" ${status.currentLayer >= status.totalLayers - 1 ? 'disabled' : ''}>
                下一层
              </button>
            `}
          </div>
          <button class="btn btn-heal" onclick="game.dungeonLeave()" style="width:100%;margin-top:8px">离开秘境</button>
        </div>
        <div class="card">
          <h3>日志</h3>
          ${this.renderer.renderLogs()}
        </div>
      </div>
    `;
  }

  // 秘境探索
  dungeonExplore() {
    const result = this.systems.dungeon.exploreLayer();
    if (!result.success) {
      this.addLog(result.text, 'warning');
      this.showDungeonExplore();
      return;
    }

    switch (result.type) {
      case 'event':
        this.addLog(result.text, '');
        if (result.reward) {
          this.handleReward(result.reward);
        }
        break;
      case 'combat':
        this.addLog(result.text, 'warning');
        this.startCombat(result.enemyType);
        return; // 战斗后不刷新，由战斗系统处理
      case 'nothing':
        this.addLog(result.text, '');
        break;
    }

    this.addLog(`剩余探索次数：${result.remaining}`, '');
    this.showDungeonExplore();
  }

  // 秘境挑战BOSS
  dungeonChallengeBoss() {
    const result = this.systems.dungeon.challengeBoss();
    if (result.success) {
      this.addLog(result.text, 'warning');
      this.startCombat(result.enemyType);
    } else {
      this.addLog(result.text, 'warning');
    }
  }

  // 秘境下一层
  dungeonNextLayer() {
    const result = this.systems.dungeon.nextLayer();
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      if (result.needBoss) {
        this.addLog(`需要先击败BOSS：${result.bossName}`, 'warning');
      }
    }
    this.showDungeonExplore();
  }

  // 离开秘境
  dungeonLeave() {
    const result = this.systems.dungeon.leaveDungeon();
    if (result.success) {
      this.addLog(result.text, result.completed ? 'success' : '');
    }
    this.render();
  }

  // === 交易系统UI ===

  // 显示交易页面
  showTrade() {
    const location = this.state.currentLocation;
    const shops = this.systems.trade.getShopsForLocation(location);
    const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
    const loc = allLocations.find(l => l.id === location);
    const locName = loc?.name || location;

    const bmCheck = this.systems.trade.hasBlackMarketAccess();
    const auctionCheck = this.systems.trade.canAttendAuction();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>  交易 · ${locName}</h3>
          <button class="btn btn-heal" onclick="game.showPage('explore')" style="width:100%">← 返回探索</button>
          ${shops.length === 0 ? '<div class="empty">此处没有商店</div>' : `
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
              ${shops.map(s => `<div class="inv-item" style="flex:1;min-width:80px;cursor:pointer" onclick="game.showShopDetail('${Object.keys(this.systems.trade.shops).find(k => this.systems.trade.shops[k] === s) || ''}')">${s.type === 'pill' ? ' ' : s.type === 'artifact' ? '⚔️' : s.type === 'talisman' ? ' ' : s.type === 'skill' ? ' ' : s.type === 'rare' ? '✨' : ' '} ${s.name.split('·')[1]}</div>`).join('')}
            </div>
          `}
        </div>
        <div class="card">
          <h3>拍卖会</h3>
          ${auctionCheck.canAttend ?
            `<button class="btn btn-skill" onclick="game.attendAuction()" style="width:100%">参加拍卖会（入场费1000灵石）</button>` :
            `<div style="font-size:12px;color:#aaa">下次拍卖会还有${auctionCheck.remaining}天</div>`
          }
        </div>
        <div class="card">
          <h3>黑市</h3>
          ${bmCheck ?
            `<div><div style="font-size:10px;color:#888;margin-bottom:4px">熟客度：${this.state.blackMarket?.familiarity || 0}（${(this.state.blackMarket?.level?.name || '?')}）</div><button class="btn btn-explore" onclick="game.enterBlackMarket()" style="width:100%">进入黑市</button></div>` :
            `<button class="btn btn-heal" onclick="game.discoverBlackMarket()" style="width:100%">尝试寻找黑市入口</button>`
          }
        </div>
        <div class="card">
          <h3>背包出售</h3>
          <button class="btn btn-primary" onclick="game.showSellList()" style="width:100%">查看可出售物品</button>
        </div>
      </div>
    `;
  }

  // 显示商店详情
  showShopDetail(shopId) {
    const shop = this.systems.trade.shops[shopId];
    if (!shop) return;

    const items = this.systems.trade.getShopItems(shopId);
    const currency = shop.currency === 'spirit_crystal' ? '灵晶' : shop.currency === 'immortal_stone' ? '仙灵石' : '灵石';

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>${shop.name}</h3>
          <div style="font-size:12px;color:#aaa;margin-bottom:8px">货币: ${currency} | 持有: ${shop.currency === 'spirit_crystal' ? (this.state.player.spiritCrystals || 0) : shop.currency === 'immortal_stone' ? (this.state.player.immortalStones || 0) : this.state.player.spiritStones}</div>
          ${items.map(item => `
            <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.buyFromShop('${shopId}', '${item.id}')">
              <div style="display:flex;justify-content:space-between">
                <span style="color:#ffd700;font-size:12px">${item.name}</span>
                <span style="font-size:11px;color:#f39c12">${item.price} ${currency}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">
                ${(() => {
                  const bought = this.state?.shopLimits?.[shopId]?.[item.id] || 0;
                  return item.limit ? `<span style="font-size:10px;color:${bought >= item.limit ? '#e74c3c' : '#aaa'}">限购${item.limit}(${bought}/${item.limit})</span>` : '<span></span>';
                })()}
                <input type="number" id="qty_${item.id}" value="1" min="1" max="99" style="width:50px;padding:3px;border-radius:4px;border:1px solid rgba(255,215,0,0.3);background:rgba(0,0,0,0.3);color:#fff;font-size:11px;text-align:center" onclick="event.stopPropagation()" onchange="event.target.value=Math.max(1,parseInt(event.target.value)||1)">
                <button class="btn btn-primary" style="padding:3px 10px;font-size:11px" onclick="event.stopPropagation();const q=parseInt(document.getElementById('qty_${item.id}').value)||1;game.buyWithQuantity('${shopId}','${item.id}',q)">购买</button>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-heal" onclick="game.showTrade()" style="width:100%">返回交易</button>
      </div>
    `;
  }

  // 批量购买（自定义数量）
  buyWithQuantity(shopId, itemId, quantity) {
    const result = this.systems.trade.buyItem(shopId, itemId, quantity);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
      this.saveGame();
    } else {
      this.showToast(result.text, 'warning');
    }
    this.showShopDetail(shopId);
  }

  // 购买物品（单击直接买1个）
  buyFromShop(shopId, itemId) {
    this.buyWithQuantity(shopId, itemId, 1);
  }

  // 显示出售列表
  showSellList() {
    const inventory = this.state.inventory.filter(i => i.count > 0);
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>出售物品</h3>
          ${inventory.length === 0 ? '<div class="empty">背包空空如也</div>' :
            inventory.map(item => {
              const { ITEMS } = window.gameData;
              const itemData = [...(ITEMS.pills || []), ...(ITEMS.materials || []), ...(ITEMS.talismans || []), ...(ITEMS.artifacts || [])].find(i => i.id === item.id);
              const sellPrice = Math.floor((itemData?.sellPrice || itemData?.cost || 10) * 0.4);
              return `
                <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.sellItemFromInv('${item.id}')">
                  <div style="display:flex;justify-content:space-between">
                    <span style="font-size:12px">${item.name || item.id} x${item.count}</span>
                    <span style="font-size:11px;color:#4ad06a">${sellPrice} 灵石/个</span>
                  </div>
                </div>
              `;
            }).join('')
          }
        </div>
        <button class="btn btn-heal" onclick="game.showTrade()" style="width:100%">返回交易</button>
      </div>
    `;
  }

  // 出售物品
  sellItemFromInv(itemId) {
    const result = this.systems.trade.sellItem(itemId, 1);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.showSellList();
  }

  // 参加拍卖会
  attendAuction() {
    const result = this.systems.trade.attendAuction();
    if (!result.success) {
      this.addLog(result.text, 'warning');
      this.showTrade();
      return;
    }
    this.addLog(result.text, 'success');

    // 显示拍卖界面
    const items = result.items;
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>  拍卖会</h3>
          <div style="font-size:12px;color:#aaa;margin-bottom:8px">当前灵石：${this.state.player.spiritStones}</div>
          ${items.length === 0 ? '<div class="empty">没有拍品</div>' :
            items.map((item, i) => `
              <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px">
                <div style="color:#ffd700;font-size:12px">${item.name}</div>
                <div style="font-size:11px;color:#aaa">当前价：${item.currentPrice}灵石 | 出价次数：${item.bidCount}</div>
                <button class="btn btn-skill" style="margin-top:4px;padding:6px;font-size:11px" onclick="game.bidItem(${i})">出价</button>
              </div>
            `).join('')
          }
        </div>
        <button class="btn btn-heal" onclick="game.showTrade()" style="width:100%">返回交易</button>
      </div>
    `;

    this.currentAuctionItems = items;
  }

  // 竞拍
  bidItem(index) {
    if (!this.currentAuctionItems || !this.currentAuctionItems[index]) return;
    const item = this.currentAuctionItems[index];
    const bidPrice = item.currentPrice + 100; // 加价100
    const result = this.systems.trade.bid(item, bidPrice);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    // 刷新拍卖页面
    this.attendAuction();
  }

  // 发现黑市
  discoverBlackMarket() {
    const result = this.systems.trade.discoverBlackMarket();
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.showTrade();
  }

  // 进入黑市
  enterBlackMarket() {
    const result = this.systems.trade.enterBlackMarket();
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showTrade();
    } else {
      this.addLog(result.text, 'warning');
      this.showTrade();
    }
  }

  // === 日常任务系统UI ===

  // 显示日常任务列表
  showDailyQuests() {
    const status = this.systems.daily.getStatus();
    const quests = this.systems.daily.getAvailableQuests();
    const active = status.activeQuests;
    const location = this.state.currentLocation;
    const allLocations = Object.values(window.gameData?.LOCATIONS || {}).flat();
    const loc = allLocations.find(l => l.id === location);
    const locName = loc?.name || location;

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>  日常任务 · ${locName}</h3>
          <button class="btn btn-heal" onclick="game.showPage('explore')" style="width:100%">← 返回探索</button>
          <div style="font-size:12px;color:#aaa;margin-bottom:8px;margin-top:8px">
            每日可完成：${status.dailyCompleted}/${status.maxDailyCompleted}
          </div>
        </div>

        ${active.length > 0 ? `
          <div class="card">
            <h3 style="color:#4caf50">进行中</h3>
            ${active.map(q => `
              <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="color:#ffd700;font-size:12px">${q.name}</span>
                  <span style="font-size:10px;color:#4caf50">${Math.min(q.currentCount, q.targetCount || 1)}/${q.targetCount || 1}</span>
                </div>
                <div style="font-size:11px;color:#aaa">${q.description}</div>
                <div style="font-size:10px;color:#666;margin-top:2px">奖励：${this.formatQuestReward(q.rewards)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="card">
          <h3>可接取任务</h3>
          ${quests.length === 0 ? '<div class="empty">暂无可用任务</div>' :
            quests.map(q => `
              <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.showQuestDetail('${q.id}')">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="color:#ffd700;font-size:12px">${q.name}</span>
                  <span style="font-size:10px;color:#4caf50">点击查看</span>
                </div>
                <div style="font-size:11px;color:#aaa">${q.description}</div>
                <div style="font-size:10px;color:#666;margin-top:2px">奖励：${this.formatQuestReward(q.rewards)}</div>
              </div>
            `).join('')
          }
        </div>
      </div>
    `;
  }

  // 格式化任务奖励
  formatQuestReward(rewards) {
    const parts = [];
    if (rewards.stone) parts.push(`${rewards.stone}灵石`);
    if (rewards.crystal) parts.push(`${rewards.crystal}灵晶`);
    if (rewards.immortal_stone) parts.push(`${rewards.immortal_stone}仙灵石`);
    if (rewards.exp) parts.push(`${rewards.exp}修为`);
    if (rewards.fame) parts.push(`${rewards.fame}名望`);
    if (rewards.contribution) parts.push(`${rewards.contribution}贡献`);
    if (rewards.items) parts.push(rewards.items.map(i => `${i.id}x${i.count}`).join('、'));
    return parts.join(' + ') || '无';
  }

  // 显示任务详情
  showQuestDetail(questId) {
    const quests = this.systems.daily.getAvailableQuests();
    const quest = quests.find(q => q.id === questId);

    if (!quest) {
      this.showToast('任务不存在', 'warning');
      return;
    }

    // 获取任务类型描述
    let targetType = '';
    switch (quest.target) {
      case 'kill': targetType = '击杀'; break;
      case 'gather': targetType = '采集'; break;
      case 'travel': targetType = '护送/旅行'; break;
      case 'escort': targetType = '护送'; break;
      case 'scout': targetType = '侦察'; break;
      case 'patrol': targetType = '巡逻'; break;
      default: targetType = '完成';
    }

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <button class="btn btn-heal" onclick="game.showDailyQuests()" style="width:100%;margin-bottom:12px">← 返回任务列表</button>

          <div style="text-align:center;margin-bottom:12px">
            <div style="font-size:24px;margin-bottom:4px"> </div>
            <div style="font-size:20px;color:#ffd700;margin-bottom:4px">${quest.name}</div>
            <div style="font-size:12px;color:#aaa">日常任务</div>
          </div>

          <div style="padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#4fc3f7;margin-bottom:6px">任务描述</div>
            <div style="font-size:12px;color:#ccc;line-height:1.5">${quest.description}</div>
          </div>

          <div style="padding:10px;background:rgba(52,152,219,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#3498db;margin-bottom:6px">任务目标</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px">
              <div><span style="color:#aaa">类型:</span> <span style="color:#fff">${targetType}</span></div>
              <div><span style="color:#aaa">目标数量:</span> <span style="color:#fff">${quest.targetCount || 1}</span></div>
              ${quest.targetId ? `<div><span style="color:#aaa">目标:</span> <span style="color:#fff">${quest.targetId}</span></div>` : ''}
              ${quest.targetLocation ? `<div><span style="color:#aaa">目的地:</span> <span style="color:#fff">${quest.targetLocation}</span></div>` : ''}
            </div>
          </div>

          <div style="padding:10px;background:rgba(241,196,15,0.1);border-radius:8px;margin-bottom:12px">
            <div style="font-size:11px;color:#f1c40f;margin-bottom:6px">任务奖励</div>
            <div style="font-size:12px;color:#fff;line-height:1.8">
              ${quest.rewards.stone ? `<div>  ${quest.rewards.stone} 灵石</div>` : ''}
              ${quest.rewards.crystal ? `<div>  ${quest.rewards.crystal} 灵晶</div>` : ''}
              ${quest.rewards.immortal_stone ? `<div>✨ ${quest.rewards.immortal_stone} 仙灵石</div>` : ''}
              ${quest.rewards.exp ? `<div>  ${quest.rewards.exp} 修为</div>` : ''}
              ${quest.rewards.fame ? `<div>  ${quest.rewards.fame} 名望</div>` : ''}
              ${quest.rewards.contribution ? `<div>  ${quest.rewards.contribution} 宗门贡献</div>` : ''}
              ${quest.rewards.items ? quest.rewards.items.map(i => `<div>  ${i.id} x${i.count}</div>`).join('') : ''}
            </div>
          </div>

          <div style="padding:10px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:12px">
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:11px">
              <div><span style="color:#aaa">推荐境界:</span> <span style="color:#fff">${quest.minRealm || 0}~${quest.maxRealm || 9}</span></div>
              <div><span style="color:#aaa">每日限制:</span> <span style="color:#fff">${this.systems.daily.maxDailyCompleted}个</span></div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-primary" onclick="game.acceptDailyQuest('${quest.id}')" style="width:100%">接取任务</button>
            <button class="btn btn-heal" onclick="game.showDailyQuests()" style="width:100%">返回任务列表</button>
          </div>
        </div>
      </div>
    `;
  }

  // 接受日常任务
  acceptDailyQuest(questId) {
    const result = this.systems.daily.acceptQuest(questId);
    if (result.success) {
      this.showToast(`接取任务: ${result.text}`, 'success');
    } else {
      this.showToast(result.text, 'warning');
    }
    this.showDailyQuests();
  }

  // === 异火/丹炉系统UI ===

  // 显示异火/丹炉管理界面
  showForge() {
    const forgeInfo = this.systems.forge.getEquippedInfo();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <h3>  异火/丹炉</h3>
          <button class="btn btn-heal" onclick="game.showPage('craft')" style="width:100%">← 返回制作</button>
        </div>

        <div class="card">
          <h3 style="color:#e74c3c">当前异火</h3>
          ${forgeInfo.fire ? `
            <div style="color:#ffd700;font-size:13px">${forgeInfo.fire.name} ${forgeInfo.fire.grade}</div>
            <div style="font-size:11px;color:#aaa">${forgeInfo.fire.desc}</div>
            <button class="btn btn-heal" onclick="game.unequipFire()" style="margin-top:8px;width:100%">卸下异火</button>
          ` : '<div class="empty">未装备异火</div>'}
        </div>

        <div class="card">
          <h3 style="color:#f39c12">当前丹炉</h3>
          ${forgeInfo.furnace ? `
            <div style="color:#ffd700;font-size:13px">${forgeInfo.furnace.name} ${forgeInfo.furnace.grade}</div>
            <div style="font-size:11px;color:#aaa">${forgeInfo.furnace.desc}</div>
          ` : '<div class="empty">未装备丹炉</div>'}
        </div>

        <div class="card">
          <h3>拥有的异火</h3>
          ${forgeInfo.ownedFires.length === 0 ? '<div class="empty">暂无异火</div>' :
            forgeInfo.ownedFires.map(fireId => {
              const fire = this.systems.forge.strangeFires.find(f => f.id === fireId);
              return fire ? `
                <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.equipFire('${fire.id}')">
                  <div style="color:#ffd700;font-size:12px">${fire.name} ${fire.grade}</div>
                  <div style="font-size:10px;color:#aaa">${fire.desc}</div>
                </div>
              ` : '';
            }).join('')
          }
        </div>

        <div class="card">
          <h3>拥有的丹炉</h3>
          ${forgeInfo.ownedFurnaces.length === 0 ? '<div class="empty">暂无丹炉</div>' :
            forgeInfo.ownedFurnaces.map(furnaceId => {
              const furnace = this.systems.forge.furnaces.find(f => f.id === furnaceId);
              return furnace ? `
                <div class="inv-item" style="text-align:left;padding:8px;margin-bottom:4px;cursor:pointer" onclick="game.equipFurnace('${furnace.id}')">
                  <div style="color:#ffd700;font-size:12px">${furnace.name} ${furnace.grade}</div>
                  <div style="font-size:10px;color:#aaa">${furnace.desc}</div>
                </div>
              ` : '';
            }).join('')
          }
        </div>
      </div>
    `;
  }

  // 装备异火
  equipFire(fireId) {
    const result = this.systems.forge.equipFire(fireId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.showForge();
  }

  // 卸下异火
  unequipFire() {
    const result = this.systems.forge.unequipFire();
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.showForge();
  }

  // 装备丹炉
  equipFurnace(furnaceId) {
    const result = this.systems.forge.equipFurnace(furnaceId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.showForge();
  }

  // 保存游戏
  saveGame() {
    this.systems.save.save();
  }

  // 加载游戏
  loadGame() {
    this.systems.save.load();
  }

  // 重置游戏（清除存档并刷新）
  resetGame() {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith('xiuxian_save')) localStorage.removeItem(key);
    }
    this.showToast('游戏已重置，即将刷新...', 'info');
    setTimeout(() => location.reload(), 800);
  }

  // 重置游戏
  resetGame() {
    if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
      this.systems.save.deleteSave('auto');
      this.state = this.getDefaultState();
      this.init();
    }
  }

  // 炼体修炼
  trainBody(days) {
    const gain = this.systems.body.train(days);
    this.addLog(`炼体${days}天，炼体值+${gain}`, 'success');
    this.showToast(`炼体${days}天完成，炼体值+${gain}`, 'success');
    // 使用时间系统8步结算
    const timeResults = this.systems.time.advanceTime(days);
    timeResults.forEach(r => {
      if (r && r.message) this.addLog(r.message, r.type === 'lifespan_warning' ? 'warning' : '');
    });
    this.checkAchievements();
    this.checkDeath();
    // 留在修炼界面
    this.showPage('cultivation');
  }

  // 炼体突破
  bodyBreakthrough() {
    const result = this.systems.body.breakthrough();
    if (result.success) {
      this.addLog(`炼体突破成功！晋升为${result.newRealm}`, 'highlight');
      this.showToast(`炼体突破！晋升为${result.newRealm}`, 'success');
    } else {
      this.addLog(result.reason, 'warning');
      this.showToast(result.reason, 'warning');
    }
    this.showPage('cultivation');
  }

  // 神识修炼（4种方式）
  trainSense(methodId) {
    const result = this.systems.sense.train(methodId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
      // 如果消耗了天数，使用时间系统8步结算
      if (result.days > 0) {
        const timeResults = this.systems.time.advanceTime(result.days);
        timeResults.forEach(r => {
          if (r && r.message) this.addLog(r.message, r.type === 'lifespan_warning' ? 'warning' : '');
        });
      }
      // 如果有风险结果，显示
      if (result.risk) {
        this.addLog(result.risk.text, 'warning');
      }
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.checkDeath();
    this.checkAchievements();
    // 留在修炼界面
    this.saveGame();
    this.showPage('cultivation');
  }
  craftTalisman(recipeId) {
    const result = this.systems.talisman.craft(recipeId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.advanceNpcQuests('craft', 'talisman');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.checkAchievements();
    this.render();
  }

  // 炼丹
  refinePill(recipeId) {
    const result = this.systems.alchemy.refine(recipeId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
      if (result.quality === '极品') {
        this.showToast('极品丹药！', 'highlight');
      }
      this.state.stats.pillsRefined = (this.state.stats.pillsRefined || 0) + 1;
      this.advanceNpcQuests('craft', 'alchemy');
    } else {
      this.showToast(result.text, 'warning');
    }
    this.checkAchievements();
    this.showPage('craft');
  }

  // 法宝装备
  equipArtifact(artifactId, slot) {
    const result = this.systems.artifact.equip(artifactId, slot);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.showEquipment();
  }

  // 法宝卸下
  unequipArtifact(artifactId) {
    const result = this.systems.artifact.unequip(artifactId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.showEquipment();
  }

  // 绑定本命法宝
  bindMainArtifact(artifactId) {
    const result = this.systems.artifact.bindMainArtifact(artifactId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.showEquipment();
  }

  // 温养本命法宝
  nurtureMainArtifact() {
    const result = this.systems.artifact.nurtureMainArtifact();
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.showEquipment();
  }

  // 突破本命法宝
  breakthroughMainArtifact() {
    const mainId = this.state.artifacts?.mainArtifact;
    if (!mainId) {
      this.showToast('请先绑定本命法宝', 'warning');
      return;
    }
    const result = this.systems.artifact.breakthroughArtifact(mainId);
    if (result.success) {
      this.addLog(result.text, 'success');
      this.showToast(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
      this.showToast(result.text, 'warning');
    }
    this.showEquipment();
  }

  // 更换本命法宝确认
  changeMainArtifactConfirm() {
    if (confirm('更换本命法宝将损失30%神识和10年寿元，确定更换？')) {
      const newArtifactId = prompt('请输入要更换为本命法宝的法宝ID：');
      if (newArtifactId) {
        const result = this.systems.artifact.changeMainArtifact(newArtifactId);
        if (result.success) {
          this.addLog(result.text, 'success');
          this.showToast(result.text, 'success');
        } else {
          this.addLog(result.text, 'warning');
          this.showToast(result.text, 'warning');
        }
        this.showEquipment();
      }
    }
  }

  // 显示装备栏页面
  showEquipment() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="game">
        ${this.renderer.renderStatusBar()}
        <div class="card">
          <button class="btn btn-heal" onclick="game.showPage('more')" style="width:100%">← 返回更多</button>
        </div>
        ${this.renderer.renderEquipmentPanel()}
      </div>
    `;
  }

  // 法宝融合
  fuseArtifacts(id1, id2) {
    const result = this.systems.artifact.fuse(id1, id2);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 法宝献祭
  sacrificeArtifact(artifactId) {
    const result = this.systems.artifact.sacrifice(artifactId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 法宝温养
  nurtureArtifact(artifactId) {
    const result = this.systems.artifact.nurture(artifactId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 捕捉灵兽
  catchBeast(beastId) {
    const result = this.systems.beast.catch(beastId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.checkAchievements();
    this.render();
  }

  // 灵兽出战
  setBeastActive(beastId, active) {
    const result = this.systems.beast.setActive(beastId, active);
    if (result.success) {
      this.addLog(result.text, 'success');
    }
    this.render();
  }

  // 灵兽喂食
  feedBeast(beastId, itemId) {
    const result = this.systems.beast.feed(beastId, itemId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 灵兽训练
  trainBeast(beastId, days) {
    const result = this.systems.beast.train(beastId, days);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 灵兽繁殖
  breedBeast(beastId) {
    const result = this.systems.beast.breed(beastId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 灵兽疗伤
  healBeast(beastId) {
    const result = this.systems.beast.heal(beastId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 制作傀儡
  craftPuppet(gradeIndex) {
    const result = this.systems.puppet.craft(gradeIndex);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.checkAchievements();
    this.render();
  }

  // 傀儡部署
  deployPuppet(puppetId, task) {
    const result = this.systems.puppet.deploy(puppetId, task);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 傀儡收回
  recallPuppet(puppetId) {
    const result = this.systems.puppet.recall(puppetId);
    if (result.success) {
      this.addLog(result.text, 'success');
    }
    this.render();
  }

  // 傀儡灌注
  chargePuppet(puppetId) {
    const result = this.systems.puppet.charge(puppetId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 掌天瓶凝聚绿液
  condenseGreenLiquid() {
    const result = this.systems.bottle.condense();
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 掌天瓶使用绿液（10种用途）
  useGreenLiquid(usageId, options = {}) {
    const result = this.systems.bottle.useGreenLiquid(usageId, options);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.checkAchievements();
    this.render();
  }

  // 掌天瓶种植
  plantField(fieldIndex, herbId) {
    const result = this.systems.bottle.plant(fieldIndex, herbId);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 掌天瓶收获
  harvestField(fieldIndex) {
    const result = this.systems.bottle.harvest(fieldIndex);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }

  // 器灵互动
  interactSpiritMaid(action) {
    const result = this.systems.bottle.interactWithSpiritMaid(action);
    if (result.success) {
      this.addLog(result.text, 'success');
    } else {
      this.addLog(result.text, 'warning');
    }
    this.render();
  }
}

// 启动游戏
const game = new Game();
window.game = game;
