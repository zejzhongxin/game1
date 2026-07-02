// 存档系统
export class SaveSystem {
  constructor(gameState) {
    this.gameState = gameState;
    this.saveKey = 'xiuxian_save';
  }

  // 保存游戏
  save(slot = 'auto') {
    const saveData = {
      version: '1.0',
      timestamp: Date.now(),
      slot,
      data: JSON.parse(JSON.stringify(this.gameState))
    };

    try {
      localStorage.setItem(`${this.saveKey}_${slot}`, JSON.stringify(saveData));
      return { success: true, text: '保存成功' };
    } catch (e) {
      return { success: false, text: '保存失败：' + e.message };
    }
  }

  // 加载游戏
  load(slot = 'auto') {
    try {
      const raw = localStorage.getItem(`${this.saveKey}_${slot}`);
      if (!raw) {
        return { success: false, text: '没有找到存档' };
      }

      const saveData = JSON.parse(raw);
      if (saveData.version !== '1.0') {
        return { success: false, text: '存档版本不兼容' };
      }

      // 恢复数据
      Object.assign(this.gameState, saveData.data);
      return { success: true, text: '加载成功' };
    } catch (e) {
      return { success: false, text: '加载失败：' + e.message };
    }
  }

  // 获取所有存档
  getSaves() {
    const saves = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.saveKey)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          saves.push({
            slot: data.slot,
            timestamp: data.timestamp,
            player: data.data.player
          });
        } catch (e) {
          // 忽略损坏的存档
        }
      }
    }
    return saves;
  }

  // 删除存档
  deleteSave(slot) {
    try {
      localStorage.removeItem(`${this.saveKey}_${slot}`);
      return { success: true, text: '删除成功' };
    } catch (e) {
      return { success: false, text: '删除失败' };
    }
  }

  // 导出存档
  exportSave() {
    const saves = this.getSaves();
    const exportData = JSON.stringify(saves, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `xiuxian_save_${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    return { success: true, text: '导出成功' };
  }

  // 导入存档
  importSave(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const saves = JSON.parse(e.target.result);
          saves.forEach(save => {
            localStorage.setItem(`${this.saveKey}_${save.slot}`, JSON.stringify({
              version: '1.0',
              timestamp: save.timestamp,
              slot: save.slot,
              data: save.player
            }));
          });
          resolve({ success: true, text: '导入成功' });
        } catch (err) {
          reject({ success: false, text: '导入失败：文件格式错误' });
        }
      };
      reader.readAsText(file);
    });
  }

  // 自动存档
  autoSave() {
    this.save('auto');
  }
}
