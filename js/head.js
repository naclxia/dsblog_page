ThemeCupertino['ColorScheme'] = new (class {
  constructor() {
    // 每分钟根据设备时间重新计算（auto 模式按时间切换明暗）
    setInterval(() => {
      this.updateCurrent(localStorage.getItem('color-scheme') ?? 'auto')
    }, 60 * 1000)
  }
  get() {
    const stored = localStorage.getItem('color-scheme') ?? 'auto'
    this.updateCurrent(stored)
    return stored
  }
  set(value) {
    try {
      localStorage.setItem('color-scheme', value)
    } catch (err) {
      console.error(err)
    }
    this.updateCurrent(value)
    return value
  }
  updateCurrent(value) {
    var current = 'light'
    if (value == 'auto') {
      // 根据设备时间自动切换：6:00–18:00 浅色，18:00–6:00 深色
      var hour = new Date().getHours()
      current = (hour >= 6 && hour < 18) ? 'light' : 'dark'
    } else {
      current = value
    }
    document.body.dataset.colorScheme = current
    document.body.dataset.currentColorScheme = current
  }
})()
