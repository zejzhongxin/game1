// 时间系统 - 完整版（GDD一比一还原）
export class TimeSystem {
  constructor(gameState) {
    this.gameState = gameState;

    // 季节系统（GDD: 四季每季90天，共360天一年）
    this.seasons = [
      { name: '春', weather: [{ type: '晴', chance: 0.35 }, { type: '阴', chance: 0.25 }, { type: '雨', chance: 0.25 }, { type: '雷雨', chance: 0.1 }, { type: '潮汐', chance: 0.05 }] },
      { name: '夏', weather: [{ type: '晴', chance: 0.45 }, { type: '阴', chance: 0.15 }, { type: '雨', chance: 0.15 }, { type: '雷雨', chance: 0.2 }, { type: '潮汐', chance: 0.05 }] },
      { name: '秋', weather: [{ type: '晴', chance: 0.4 }, { type: '阴', chance: 0.2 }, { type: '雨', chance: 0.2 }, { type: '雷雨', chance: 0.08 }, { type: '雪', chance: 0.08 }, { type: '暴雪', chance: 0.02 }, { type: '潮汐', chance: 0.02 }] },
      { name: '冬', weather: [{ type: '晴', chance: 0.3 }, { type: '阴', chance: 0.15 }, { type: '雨', chance: 0.05 }, { type: '雷雨', chance: 0.02 }, { type: '雪', chance: 0.3 }, { type: '暴雪', chance: 0.15 }, { type: '潮汐', chance: 0.03 }] }
    ];

    // 天气对修炼的影响
    this.weatherEffects = {
      '晴': { cultivationBonus: 1.0, name: '晴天' },
      '阴': { cultivationBonus: 0.95, name: '阴天' },
      '雨': { cultivationBonus: 0.9, name: '雨天' },
      '雷雨': { cultivationBonus: 0.85, thunderDamage: true, name: '雷雨' },
      '雪': { cultivationBonus: 0.8, coldDamage: true, name: '下雪' },
      '暴雪': { cultivationBonus: 0.7, coldDamage: true, severe: true, name: '暴雪' },
      '潮汐': { cultivationBonus: 1.2, name: '灵气潮汐' }
    };

    // 周期性大事件（GDD: 年/10年/30年/50年/100年/500年/1000年）
    this.specialEvents = [
      { name: '新年庆典', interval: 360, effect: '全属+5%持续3天', day: 0 },
      { name: '夏至灵气潮汐', interval: 360, effect: '修炼+20%持续7天', day: 180 },
      { name: '天南城大型拍卖会', interval: 3600, effect: '天级功法+古宝', day: 0 },
      { name: '各宗门大比', interval: 3600, effect: '元婴以下参加', day: 1800 },
      { name: '血色禁地开启', interval: 10800, effect: '筑基~金丹·限30天', day: 0 },
      { name: '小寰天秘境开启', interval: 18000, effect: '金丹~元婴', day: 0 },
      { name: '虚天殿开启', interval: 36000, effect: '元婴~化神·限90天', day: 0 },
      { name: '星宫秘藏开放', interval: 36000, effect: '元婴~化神', day: 0 },
      { name: '广灵洞天开启', interval: 180000, effect: '合体~大乘', day: 0 },
      { name: '血神秘境开启', interval: 360000, effect: '大乘~渡劫', day: 0 }
    ];

    // 当前天气和季节
    this.currentWeather = '晴';
    this.currentSeason = '春';

    // 限时效果列表
    this.timedEffects = [];
  }

  // === 8步结算流程（GDD核心） ===
  advanceTime(days) {
    const results = [];

    for (let i = 0; i < days; i++) {
      // ① 天数推进
      this.gameState.gameTime.day++;
      this.gameState.gameTime.totalDays++;

      // ② 寿元扣除（年龄 += N/360年）
      this.gameState.player.age += 1 / 360;
      results.push(this.checkLifespan());

      // ③ 灵力自然恢复
      const mpRecovered = this.naturalMpRecovery();
      results.push({ type: 'mp_recovered', amount: mpRecovered });

      // ④ 丹毒自然消退（1天/点，高阶更快）
      this.naturalPoisonDecay();

      // ⑤ 限时效果检查（聚灵阵/符箓/状态剩余天数）
      this.checkTimedEffects();

      // ⑥ 季节/天气更新（跨月时）
      this.updateSeasonAndWeather();

      // ⑦ 特殊日期检查
      const specialEvent = this.checkSpecialEvents();
      if (specialEvent) results.push(specialEvent);

      // ⑧ 寿元濒死检查（≥90%警告/=0触发陨落）
      const lifespanResult = this.checkLifespanCritical();
      if (lifespanResult) results.push(lifespanResult);
    }

    // 更新游戏时间显示
    this.updateGameTimeDisplay();

    return results.filter(r => r !== null);
  }

  // === ② 寿元扣除 ===
  checkLifespan() {
    const player = this.gameState.player;
    if (player.age >= player.lifespan) {
      return { type: 'lifespan_expired', message: '寿元耗尽！' };
    }
    return null;
  }

  // ⑧ 寿元濒死检查
  checkLifespanCritical() {
    const player = this.gameState.player;
    const remaining = player.lifespan - player.age;
    const percent = player.age / player.lifespan;

    if (percent >= 0.9) {
      return { type: 'lifespan_warning', message: `寿元告急！剩余${remaining.toFixed(1)}年（${(100 - percent * 100).toFixed(1)}%）` };
    }
    return null;
  }

  // === ③ 灵力自然恢复 ===
  naturalMpRecovery() {
    const player = this.gameState.player;
    const recovery = Math.floor(player.maxMp * 0.05); // 每天恢复5%灵力
    player.mp = Math.min(player.mp + recovery, player.maxMp);
    return recovery;
  }

  // === ④ 丹毒自然消退 ===
  naturalPoisonDecay() {
    const player = this.gameState.player;
    if (player.poison && player.poison > 0) {
      // 高境界消退更快
      const decayRate = 1 + Math.floor(player.realmIdx * 0.2);
      player.poison = Math.max(0, player.poison - decayRate);
    }
  }

  // === ⑤ 限时效果检查 ===
  checkTimedEffects() {
    const player = this.gameState.player;

    // 检查buff/debuff持续时间
    if (player.buffs) {
      player.buffs = player.buffs.filter(buff => {
        buff.duration--;
        if (buff.duration <= 0) {
          // 效果消失
          if (buff.type === 'injured') {
            player.cultivationSpeedBonus = (player.cultivationSpeedBonus || 0) - buff.value;
          }
          return false;
        }
        return true;
      });
    }

    // 检查天气对修炼的影响（设置而非累加）
    const weatherEffect = this.weatherEffects[this.currentWeather];
    if (weatherEffect && weatherEffect.cultivationBonus) {
      player.cultivationSpeedBonus = weatherEffect.cultivationBonus;
    } else {
      player.cultivationSpeedBonus = 1.0;
    }
  }

  // === ⑥ 季节/天气更新 ===
  updateSeasonAndWeather() {
    const totalDays = this.gameState.gameTime.totalDays;
    const dayInYear = totalDays % 360;

    // 更新季节
    if (dayInYear < 90) this.currentSeason = '春';
    else if (dayInYear < 180) this.currentSeason = '夏';
    else if (dayInYear < 270) this.currentSeason = '秋';
    else this.currentSeason = '冬';

    // 更新天气（根据季节概率）
    const season = this.seasons.find(s => s.name === this.currentSeason);
    if (season) {
      const roll = Math.random();
      let cumulative = 0;
      for (const weather of season.weather) {
        cumulative += weather.chance;
        if (roll < cumulative) {
          this.currentWeather = weather.type;
          break;
        }
      }
    }
  }

  // === ⑦ 特殊日期检查 ===
  checkSpecialEvents() {
    const totalDays = this.gameState.gameTime.totalDays;
    const events = [];

    for (const event of this.specialEvents) {
      // 检查是否到达特殊日期（使用 day 偏移量）
      const eventDay = totalDays - (event.day || 0);
      if (eventDay > 0 && eventDay % event.interval === 0) {
        events.push({ type: 'special_event', name: event.name, effect: event.effect });
      }
    }

    return events.length > 0 ? events[0] : null;
  }

  // === 更新游戏时间显示 ===
  updateGameTimeDisplay() {
    const totalDays = this.gameState.gameTime.totalDays;
    const year = Math.floor(totalDays / 360) + 1;
    const dayInYear = totalDays % 360;
    const month = Math.floor(dayInYear / 30) + 1;
    const day = (dayInYear % 30) + 1;

    this.gameState.gameTime.year = year;
    this.gameState.gameTime.month = month;
    this.gameState.gameTime.day = day;
    this.gameState.gameTime.season = this.currentSeason;
    this.gameState.gameTime.weather = this.currentWeather;
  }

  // === 添加限时效果 ===
  addTimedEffect(type, duration, value) {
    this.gameState.player.buffs = this.gameState.player.buffs || [];
    this.gameState.player.buffs.push({ type, duration, value });
  }

  // === 获取天气信息 ===
  getWeatherInfo() {
    const weatherEffect = this.weatherEffects[this.currentWeather];
    return {
      weather: this.currentWeather,
      season: this.currentSeason,
      effect: weatherEffect,
      name: weatherEffect?.name || this.currentWeather
    };
  }

  // === 获取当前时间信息 ===
  getTimeInfo() {
    const totalDays = this.gameState.gameTime.totalDays;
    const year = Math.floor(totalDays / 360) + 1;
    const dayInYear = totalDays % 360;
    const month = Math.floor(dayInYear / 30) + 1;
    const day = (dayInYear % 30) + 1;

    return {
      year,
      month,
      day,
      season: this.currentSeason,
      weather: this.currentWeather,
      totalDays
    };
  }

  // === 获取即将到来的事件 ===
  getUpcomingEvents() {
    const totalDays = this.gameState.gameTime.totalDays;
    const events = [];

    for (const event of this.specialEvents) {
      const nextDay = Math.ceil(totalDays / event.interval) * event.interval;
      const daysUntil = nextDay - totalDays;

      if (daysUntil > 0 && daysUntil <= 360) {
        events.push({
          name: event.name,
          daysUntil,
          effect: event.effect
        });
      }
    }

    return events.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 5);
  }
}
