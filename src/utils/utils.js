
let EARTH_RADIUS = 6378137.0 // 单位M

let util = {
  getMonthStart (value) {
    let times = value.split('-')
    times[2] = '01'
    return times.join('-')
  },
  formatNumber (value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  },
  formatHour (time) {
    if (this.isNull(time)) {
      return 1
    }
    let times = time / 3600
    return times.toFixed(2)
  },
  getComp (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    return time.replace(year, year - 1)
  },
  getMinute (time) {
    if (this.isNull(time)) {
      return 1
    }
    let times = time.split(':')
    return parseInt(times[0]) * 60 + parseInt(times[1])
  },
  getWeekDays (d) {
    let date = new Date(d)
    let day = date.getDay()
    if (day === 0) {
      day = 7
    }
    let time = date.getTime()
    let arrDate = []
    for (let i = 1; i < day; i++) {
      let targetTime = time - (day - i) * 24 * 60 * 60 * 1000
      arrDate.push(this.parseTime(targetTime, '{y}-{m}-{d}'))
    }
    arrDate.push(this.parseTime(d, '{y}-{m}-{d}'))
    for (let i = 1; i < 8 - day; i++) {
      let targetTime = time + i * 24 * 60 * 60 * 1000
      arrDate.push(this.parseTime(targetTime, '{y}-{m}-{d}'))
    }
    return arrDate
  },
  getWeekDaysComp (d) {
    let oldDate = new Date(d)
    let oYear = oldDate.getFullYear() - 1
    let oMonth = oldDate.getMonth() + 1
    let oDay = oldDate.getDate()
    let date = new Date(oYear + '-' + oMonth + '-' + oDay)
    let day = oldDate.getDay()
    let time = date.getTime()
    let arrDate = []
    for (let i = 1; i < day; i++) {
      let targetTime = time - (day - i) * 24 * 60 * 60 * 1000
      arrDate.push(this.parseTime(targetTime, '{y}-{m}-{d}'))
    }
    arrDate.push(this.parseTime(d, '{y}-{m}-{d}'))
    for (let i = 1; i < 8 - day; i++) {
      let targetTime = time + i * 24 * 60 * 60 * 1000
      arrDate.push(this.parseTime(targetTime, '{y}-{m}-{d}'))
    }
    return arrDate
  },
  parseTime (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      // if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  },
  conver2FormData (data) {
    let formData = new FormData()
    for (var key in data) {
      if (!this.isNull(data[key])) {
        formData.append(key, data[key])
      }
    }
    return formData
  },
  isNull (value) {
    if (value === null || value === undefined || value === '') {
      return true
    }
    return false
  },
  getWeekDay (date) {
    let week = ''
    let day = date.getDay()
    switch (day) {
      case 0:
        week = '周日'
        break
      case 1:
        week = '周一'
        break
      case 2:
        week = '周二'
        break
      case 3:
        week = '周三'
        break
      case 4:
        week = '周四'
        break
      case 5:
        week = '周五'
        break
      case 6:
        week = '周六'
        break
      default:
        break
    }
    return week
  },
  getGreatCircleDistance (lat1, lng1, lat2, lng2) {
    let radLat1 = this.getRad(lat1)
    let radLat2 = this.getRad(lat2)

    let a = radLat1 - radLat2
    let b = this.getRad(lng1) - this.getRad(lng2)

    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * EARTH_RADIUS
    s = Math.round(s * 10000) / 10000.0
    console.log('distance>>>>', s)

    return s
  },
  wxDate (str) {
    if (!str) return new Date()
    let split = str.split('T')
    let date = split[0].split('-')
    let time = split[1].split(':')
    return new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]))
  },
  matchPY (str, enname) { // 模糊搜索，类似sql like
    if (/^[A-Za-z]+$/.test(str)) {
      str = str.toLowerCase()
      let regStr = '^'
      for (let i = 0; i < str.length; i++) {
        regStr += str[i] + '[a-z]*'
      }
      let reg = new RegExp(regStr)
      return reg.test(enname.toLowerCase())
    }
  },
  isUndef (v) { // 判断是否是 undefined 或 null
    return v === undefined || v === null
  },
  isDef (v) { // 判断是否不是 undefined 和 null
    return v !== undefined && v !== null
  },
  once (fn) { // 控制函数只执行一次
    let called = false
    return function () {
      if (!called) {
        called = true
        fn.apply(this, arguments)
      }
    }
  },
  wxDateWithoutTime (str) {
    if (!str) return new Date()
    let split = str.split('T')
    let date = split[0].split('-')
    return new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]))
  },
  countDuring (startStr, endStr) {
    let end = new Date(endStr)
    let start = new Date(startStr)
    let time = (end.getTime() - start.getTime()) / 60000
    let hour = Math.floor(time / 60)
    let min = time - (hour * 60)
    return {
      hour: hour,
      min: min
    }
  },
  selectCityFromList (cityList, codeList) {
    if (codeList == null) return cityList//eslint-disable-line
    let list = {}
    for (let i in codeList) {
      for (let j in cityList) {
        if (codeList[i] !== cityList[j].iataApCode) continue
        cityList[j].cnName = cityList[j].cnName.replace(cityList[j].cityChName, '')
        list[codeList[i]] = cityList[j]
        break
      }
    }
    return list
  },
  urlForward () {
    history.pushState(null, null, document.URL)
  },
  urlBack () {
    window.history.go(-1)
  }
}

export default util
