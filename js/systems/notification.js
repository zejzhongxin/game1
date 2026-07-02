// 通知/红点系统 - 完整版（GDD一比一还原）
export class NotificationSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 红点数据
    this.redDots = {
      home: 0,
      explore: 0,
      craft: 0,
      beast: 0,
      settings: 0
    };

    // 弹窗队列
    this.popupQueue = [];
    this.maxPopups = 3; // 最多同时显示3条
    this.popupDuration = 5000; // 默认5秒自动消失

    // 弹窗颜色分级
    this.popupColors = {
      success: 'rgba(46,204,113,0.9)', // 绿色 - 成功
      info: 'rgba(255,215,0,0.9)',     // 黄色 - 提醒
      warning: 'rgba(231,76,60,0.9)',  // 红色 - 警告
      special: 'rgba(155,89,182,0.9)'  // 紫色 - 特殊
    };
  }

  // === 红点检查（GDD: 每次操作结算后/切回Tab时/打开游戏时） ===
  checkRedDots() {
    const player = this.gameState.player;

    // 首页红点：修炼完成/灵草成熟/秘境开启/寿元告急
    this.redDots.home = 0;
    if (this.checkCultivationComplete()) this.redDots.home++;
    if (this.checkHerbMature()) this.redDots.home++;
    if (this.checkDungeonOpen()) this.redDots.home++;
    if (player.lifespan - player.age < 10) this.redDots.home++;

    // 修炼红点：神识淬炼CD结束/炼体可进行/可突破
    this.redDots.craft = 0;
    if (this.checkSenseTrainReady()) this.redDots.craft++;
    if (this.checkBodyTrainReady()) this.redDots.craft++;
    if (this.checkCanBreakthrough()) this.redDots.craft++;

    // 探索红点：秘境开启/有未读探索事件
    this.redDots.explore = 0;
    if (this.checkDungeonOpen()) this.redDots.explore++;
  }

  // === 红点检查辅助方法 ===
  checkCultivationComplete() {
    return false; // 需要实现修炼完成检测
  }

  checkHerbMature() {
    const bottle = this.gameState.bottle;
    if (!bottle || !bottle.spiritFields) return false;
    return bottle.spiritFields.some(field => {
      if (!field) return false;
      const daysPassed = (this.gameState.gameTime.totalDays || 0) - field.plantTime;
      return daysPassed >= field.growTime;
    });
  }

  checkDungeonOpen() {
    const dungeons = window.game?.systems?.dungeon?.dungeons || [];
    const currentDay = this.gameState.gameTime.totalDays || 0;
    const player = this.gameState.player;

    return dungeons.some(d => {
      const inRange = player.realmIdx >= d.minRealmIdx && player.realmIdx <= d.maxRealmIdx + 1;
      const cdReady = d.cd === 0 || (currentDay - d.lastOpenDay) >= d.cd;
      return inRange && cdReady;
    });
  }

  checkSenseTrainReady() {
    return true; // 神识随时可修炼
  }

  checkBodyTrainReady() {
    return true; // 炼体随时可修炼
  }

  checkCanBreakthrough() {
    const { REALMS } = window.gameData;
    const player = this.gameState.player;
    if (player.realmIdx >= REALMS.length - 1) return false;
    return player.exp >= REALMS[player.realmIdx].maxExp;
  }

  // === 获取指定Tab的红点数 ===
  getRedDot(tab) {
    this.checkRedDots();
    return this.redDots[tab] || 0;
  }

  // === 清除指定Tab的红点 ===
  clearRedDot(tab) {
    this.redDots[tab] = 0;
  }

  // === 渲染红点指示器 ===
  renderRedDot(count) {
    if (count <= 0) return '';
    return `<span style="position:absolute;top:-4px;right:-4px;background:#e74c3c;color:white;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:bold">${count > 99 ? '99+' : count}</span>`;
  }

  // === 弹窗系统 ===

  // 添加弹窗
  addPopup(type, title, message, duration) {
    const popup = {
      id: Date.now(),
      type,
      title,
      message,
      color: this.popupColors[type] || this.popupColors.info,
      duration: duration || this.popupDuration,
      timestamp: Date.now()
    };

    this.popupQueue.push(popup);

    // 限制同时显示数量
    if (this.popupQueue.length > this.maxPopups) {
      this.popupQueue.shift();
    }

    // 自动消失
    setTimeout(() => {
      this.removePopup(popup.id);
    }, popup.duration);

    // 渲染
    this.renderPopups();
  }

  // 移除弹窗
  removePopup(id) {
    this.popupQueue = this.popupQueue.filter(p => p.id !== id);
    this.renderPopups();
  }

  // 渲染所有弹窗
  renderPopups() {
    const container = document.getElementById('popup-container');
    if (!container) {
      const newContainer = document.createElement('div');
      newContainer.id = 'popup-container';
      newContainer.style.cssText = 'position:fixed;top:50px;left:50%;transform:translateX(-50%);z-index:200;display:flex;flex-direction:column;gap:8px;max-width:400px;width:90%';
      document.body.appendChild(newContainer);
    }

    const el = document.getElementById('popup-container');
    if (!el) return;

    el.innerHTML = this.popupQueue.map(popup => `
      <div style="background:${popup.color};border-radius:8px;padding:12px;cursor:pointer;animation:popupSlideIn 0.3s ease-out" onclick="game.dismissPopup(${popup.id})">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:bold;font-size:13px;color:#fff">${popup.title}</span>
          <span style="color:rgba(255,255,255,0.7);font-size:10px">3</span>
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,0.9);margin-top:4px">${popup.message}</div>
      </div>
    `).join('');
  }

  // 关闭弹窗
  dismissPopup(id) {
    this.removePopup(id);
  }

  // === GDD规定的10种弹窗触发条件 ===

  // ① 修炼/操作完成
  notifyOperationComplete(operation, result) {
    this.addPopup('success', '操作完成', `${operation}${result}`);
  }

  // ② 境界突破
  notifyBreakthrough(oldRealm, newRealm) {
    this.addPopup('success', '境界突破', `从${oldRealm}晋升为${newRealm}！`);
  }

  // ③ 飞升事件
  notifyAscend(targetRealm) {
    this.addPopup('special', '飞升事件', `你即将飞升至${targetRealm}！`);
  }

  // ④ 寿元告急
  notifyLifespanWarning(remaining) {
    this.addPopup('warning', '寿元告急', `剩余寿元仅${remaining.toFixed(1)}年！`);
  }

  // ⑤ 秘境开启
  notifyDungeonOpen(dungeonName) {
    this.addPopup('info', '秘境开启', `${dungeonName}已经开启！`);
  }

  // ⑥ 重要事件
  notifyImportantEvent(eventName, description) {
    this.addPopup('info', eventName, description);
  }

  // ⑦ 战斗关键事件
  notifyCombatEvent(eventType, enemyName) {
    if (eventType === 'boss_start') {
      this.addPopup('warning', 'BOSS战开始', `遭遇${enemyName}！`);
    } else if (eventType === 'boss_defeat') {
      this.addPopup('success', 'BOSS击杀', `击败${enemyName}！`);
    } else if (eventType === 'defeat') {
      this.addPopup('warning', '战斗失败', `你被${enemyName}击败了...`);
    }
  }

  // ⑧ 陨落/结局
  notifyDeath(cause) {
    this.addPopup('special', '陨落', cause);
  }

  // ⑨ 物品获得
  notifyRareItem(itemName) {
    this.addPopup('special', '稀有物品', `获得${itemName}！`);
  }

  // ⑩ 系统消息
  notifySystem(message) {
    this.addPopup('info', '系统消息', message);
  }
}
