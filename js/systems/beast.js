// 灵兽系统
export class BeastSystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  // 获取灵兽列表
  getBeasts() {
    return this.gameState.beasts || [];
  }

  // 捕捉灵兽
  catch(beastId) {
    const { BEASTS } = window.gameData;
    const allBeasts = [...BEASTS.single, ...BEASTS.swarm, ...BEASTS.mount];
    const beastData = allBeasts.find(b => b.id === beastId);

    if (!beastData) {
      return { success: false, text: '灵兽不存在' };
    }

    // 检查境界
    if (beastData.grade > this.gameState.player.realmIdx + 2) {
      return { success: false, text: '境界不足，无法控制此灵兽' };
    }

    // 检查数量限制
    const maxBeasts = Math.floor(this.gameState.player.realmIdx / 2) + 1;
    if (this.gameState.beasts.length >= maxBeasts) {
      return { success: false, text: `灵兽数量已达上限(${maxBeasts})` };
    }

    // 捕捉成功率
    let catchRate = 50;
    catchRate += (this.gameState.player.realmIdx - beastData.grade) * 10;
    catchRate += this.gameState.player.fortune * 0.2;

    const roll = Math.random() * 100;
    if (roll >= catchRate) {
      return { success: false, text: '捕捉失败' };
    }

    // 添加灵兽
    const beast = {
      id: beastData.id + '_' + Date.now(),
      dataId: beastData.id,
      name: beastData.name,
      grade: beastData.grade,
      type: BEASTS.single.some(b => b.id === beastId) ? 'single' :
            BEASTS.swarm.some(b => b.id === beastId) ? 'swarm' : 'mount',
      hp: beastData.hp || 1000,
      maxHp: beastData.hp || 1000,
      atk: beastData.atk || 100,
      def: beastData.def || 50,
      loyalty: 50,
      hunger: 100,
      exp: 0,
      skills: beastData.skills ? JSON.parse(JSON.stringify(beastData.skills)) : [],
      active: false
    };

    // 群居型特殊处理
    if (beast.type === 'swarm') {
      beast.count = 1;
      beast.maxCount = beastData.maxCount;
      beast.hpPerUnit = beastData.hpPerUnit;
      beast.atkPerUnit = beastData.atkPerUnit;
      beast.defPerUnit = beastData.defPerUnit;
    }

    this.gameState.beasts.push(beast);

    return {
      success: true,
      text: `成功捕捉${beastData.name}`,
      beast
    };
  }

  // 出战灵兽
  setActive(beastId, active) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) {
      return { success: false, text: '灵兽不存在' };
    }

    if (beast.loyalty < 30 && active) {
      return { success: false, text: '忠诚度不足，灵兽拒绝出战' };
    }

    beast.active = active;
    return {
      success: true,
      text: active ? `${beast.name}已出战` : `${beast.name}已收回`
    };
  }

  // 喂食
  feed(beastId, itemId) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) {
      return { success: false, text: '灵兽不存在' };
    }

    const item = this.gameState.inventory.find(i => i.id === itemId);
    if (!item || item.count <= 0) {
      return { success: false, text: '物品不足' };
    }

    // 消耗物品
    item.count--;
    if (item.count <= 0) {
      this.gameState.inventory.splice(this.gameState.inventory.indexOf(item), 1);
    }

    // 恢复饱食度
    beast.hunger = Math.min(beast.hunger + 30, 100);

    // 增加忠诚度
    beast.loyalty = Math.min(beast.loyalty + 2, 100);

    // 灵草特殊效果
    if (itemId === 'herb') {
      beast.hp = Math.min(beast.hp + Math.floor(beast.maxHp * 0.1), beast.maxHp);
    }

    return {
      success: true,
      text: `喂食${beast.name}，饱食度+30，忠诚度+2`
    };
  }

  // 训练
  train(beastId, days) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) {
      return { success: false, text: '灵兽不存在' };
    }

    if (beast.hunger < 20) {
      return { success: false, text: '灵兽太饿了，无法训练' };
    }

    // 消耗时间
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    // 消耗饱食度
    beast.hunger = Math.max(beast.hunger - days * 5, 0);

    // 增加经验（不超过当前等级需求）
    const expGain = days * 10 * (1 + this.gameState.player.fortune * 0.01);
    const level = beast.level || 1;
    if (level < 100) {
      const expNeeded = level * 100;
      beast.exp = Math.min((beast.exp || 0) + Math.floor(expGain), expNeeded);
    }

    // 增加属性
    beast.atk += Math.floor(days * 2);
    beast.def += Math.floor(days * 1);

    // 增加忠诚度
    beast.loyalty = Math.min(beast.loyalty + days, 100);

    return {
      success: true,
      text: `训练${beast.name} ${days}天，经验+${Math.floor(expGain)}，攻击+${days * 2}`
    };
  }

  // 繁殖（群居型）
  breed(beastId) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast || beast.type !== 'swarm') {
      return { success: false, text: '只有群居型灵兽可以繁殖' };
    }

    if (beast.count >= beast.maxCount) {
      return { success: false, text: '已达数量上限' };
    }

    if (beast.loyalty < 80 || beast.hunger < 80) {
      return { success: false, text: '忠诚度或饱食度不足' };
    }

    // 繁殖数量
    const newCount = Math.floor(Math.random() * 5) + 2;
    beast.count = Math.min(beast.count + newCount, beast.maxCount);

    // 消耗时间
    this.gameState.gameTime.day += 7;
    this.gameState.gameTime.totalDays += 7;
    this.gameState.player.age += 7 / 360;

    // 消耗饱食度
    beast.hunger = Math.max(beast.hunger - 30, 0);

    return {
      success: true,
      text: `繁殖成功，${beast.name}数量+${newCount}，当前${beast.count}只`
    };
  }

  // 疗伤
  heal(beastId) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) {
      return { success: false, text: '灵兽不存在' };
    }

    if (beast.hp >= beast.maxHp) {
      return { success: false, text: '灵兽无需治疗' };
    }

    // 消耗时间
    const days = Math.ceil((beast.maxHp - beast.hp) / beast.maxHp * 3);
    this.gameState.gameTime.day += days;
    this.gameState.gameTime.totalDays += days;
    this.gameState.player.age += days / 360;

    // 恢复HP
    beast.hp = beast.maxHp;

    return {
      success: true,
      text: `治疗${beast.name} ${days}天，已完全恢复`
    };
  }

  // 战斗中灵兽行动
  combatAction(beast) {
    if (!beast.active || beast.hp <= 0) return null;

    // 忠诚度检查
    if (beast.loyalty < 20) {
      return { type: 'refuse', text: `${beast.name}拒绝战斗` };
    }

    // 群居型
    if (beast.type === 'swarm') {
      const totalAtk = Math.floor(beast.atkPerUnit * Math.pow(beast.count, 0.6));
      return {
        type: 'attack',
        damage: totalAtk,
        text: `${beast.name}(${beast.count}只)攻击，造成${totalAtk}伤害`
      };
    }

    // 单养型
    return {
      type: 'attack',
      damage: beast.atk,
      text: `${beast.name}攻击，造成${beast.atk}伤害`
    };
  }

  // 获取灵兽信息
  getInfo(beastId) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) return null;

    return {
      ...beast,
      gradeName: window.gameData.BEAST_GRADE[beast.grade]?.name || '未知',
      hungerStatus: beast.hunger > 80 ? '饱食' : beast.hunger > 50 ? '正常' : beast.hunger > 20 ? '饥饿' : '极度饥饿',
      loyaltyStatus: beast.loyalty > 80 ? '忠诚' : beast.loyalty > 50 ? '友好' : beast.loyalty > 20 ? '冷淡' : '敌对'
    };
  }

  // 灵兽等级成长（GDD: 灵兽有等级，可以通过喂食/训练升级）
  levelUp(beastId) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) {
      return { success: false, text: '灵兽不存在' };
    }

    // 检查经验是否足够
    const maxLevel = 100;
    const beastLevel = beast.level || 1;
    const expNeeded = beastLevel * 100;
    if (beast.exp < expNeeded) {
      return { success: false, text: `经验不足，需要${expNeeded}经验` };
    }

    if (beast.level >= maxLevel) {
      return { success: false, text: '已达最高等级' };
    }

    // 升级
    beast.exp -= expNeeded;
    beast.level = (beast.level || 1) + 1;

    // 属性成长
    beast.maxHp = Math.floor(beast.maxHp * 1.1);
    beast.hp = beast.maxHp;
    beast.atk = Math.floor(beast.atk * 1.05);
    beast.def = Math.floor(beast.def * 1.05);

    return {
      success: true,
      text: `${beast.name}升级到${beast.level}级！HP+10%，攻击/防御+5%`,
      beast
    };
  }

  // 灵兽技能系统（GDD: 灵兽有技能）
  useBeastSkill(beastId, skillId) {
    const beast = this.gameState.beasts.find(b => b.id === beastId);
    if (!beast) {
      return { success: false, text: '灵兽不存在' };
    }

    const skill = beast.skills?.find(s => s.id === skillId);
    if (!skill) {
      return { success: false, text: '技能不存在' };
    }

    // 检查冷却
    if (skill.cooldown > 0) {
      return { success: false, text: `技能冷却中，还需${skill.cooldown}回合` };
    }

    // 计算伤害
    let damage = beast.atk * (skill.power || 1.0);

    // 应用技能效果
    let effect = null;
    if (skill.effect) {
      effect = {
        type: skill.effect,
        value: skill.effectValue || 0,
        duration: skill.effectDuration || 1
      };
    }

    // 设置冷却
    skill.cooldown = skill.maxCooldown || 3;

    return {
      success: true,
      text: `${beast.name}使用${skill.name}，造成${Math.floor(damage)}伤害`,
      damage: Math.floor(damage),
      effect,
      skill
    };
  }

  // 灵兽配种系统（GDD: 可以配种获得新灵兽）
  breedBeasts(beastId1, beastId2) {
    const beast1 = this.gameState.beasts.find(b => b.id === beastId1);
    const beast2 = this.gameState.beasts.find(b => b.id === beastId2);

    if (!beast1 || !beast2) {
      return { success: false, text: '灵兽不存在' };
    }

    // 检查是否同类型
    if (beast1.dataId !== beast2.dataId) {
      return { success: false, text: '只有相同种类的灵兽才能配种' };
    }

    // 检查忠诚度
    if (beast1.loyalty < 80 || beast2.loyalty < 80) {
      return { success: false, text: '忠诚度不足，灵兽拒绝配种' };
    }

    // 检查饱食度
    if (beast1.hunger < 80 || beast2.hunger < 80) {
      return { success: false, text: '饱食度不足' };
    }

    // 检查数量限制
    const maxBeasts = Math.floor(this.gameState.player.realmIdx / 2) + 1;
    if (this.gameState.beasts.length >= maxBeasts) {
      return { success: false, text: `灵兽数量已达上限(${maxBeasts})` };
    }

    // 配种成功率：60%
    if (Math.random() > 0.6) {
      return { success: false, text: '配种失败' };
    }

    // 消耗时间
    this.gameState.gameTime.day += 14;
    this.gameState.gameTime.totalDays += 14;
    this.gameState.player.age += 14 / 360;

    // 消耗饱食度
    beast1.hunger = Math.max(beast1.hunger - 50, 0);
    beast2.hunger = Math.max(beast2.hunger - 50, 0);

    // 生成新灵兽（继承父母属性，略有变化）
    const { BEASTS } = window.gameData;
    const beastData = BEASTS.single.find(b => b.id === beast1.dataId) ||
                      BEASTS.swarm.find(b => b.id === beast1.dataId) ||
                      BEASTS.mount.find(b => b.id === beast1.dataId);

    const newBeast = {
      id: beast1.dataId + '_baby_' + Date.now(),
      dataId: beast1.dataId,
      name: `${beast1.name}的后代`,
      grade: beast1.grade,
      type: beast1.type,
      level: 1,
      hp: Math.floor((beast1.maxHp + beast2.maxHp) / 2 * 0.8),
      maxHp: Math.floor((beast1.maxHp + beast2.maxHp) / 2 * 0.8),
      atk: Math.floor((beast1.atk + beast2.atk) / 2 * 0.8),
      def: Math.floor((beast1.def + beast2.def) / 2 * 0.8),
      loyalty: 50,
      hunger: 100,
      exp: 0,
      skills: [...(beast1.skills || [])],
      active: false
    };

    this.gameState.beasts.push(newBeast);

    return {
      success: true,
      text: `配种成功！获得${newBeast.name}`,
      beast: newBeast
    };
  }

  // 灵兽自动战斗（AI行为）
  autoCombatAction(beast) {
    if (!beast.active || beast.hp <= 0) return null;

    // 忠诚度检查
    if (beast.loyalty < 20) {
      return { type: 'refuse', text: `${beast.name}拒绝战斗` };
    }

    // 优先使用技能（如果有可用技能）
    if (beast.skills && beast.skills.length > 0) {
      const availableSkill = beast.skills.find(s => s.cooldown <= 0);
      if (availableSkill && Math.random() < 0.6) {
        return this.useBeastSkill(beast.id, availableSkill.id);
      }
    }

    // 普通攻击
    return this.combatAction(beast);
  }
}
