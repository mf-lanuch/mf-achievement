// 本地缓存设置
export default {
  // 设置变量, 带有效期, 单位秒
  set: function (key, val, exp) {
    var expMs = 0
    if (exp && !isNaN(exp) && parseInt(exp) >= 0) {
      expMs = parseInt(exp) * 1000 // 转成毫秒
    }
    localStorage.setItem(key, JSON.stringify({ val: val, exp: expMs, time: new Date().getTime() }))
  },
  get: function (key) {
    var info = JSON.parse(localStorage.getItem(key))
    if (!info) { return null }
    if (new Date().getTime() - info.time > info.exp && info.exp > 0) { return null }
    return info.val
  },
  remove: function (key) {
    localStorage.removeItem(key)
  }
}
