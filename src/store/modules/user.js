import { Message } from 'element-ui'
import {getAllMenu} from '@/api/common'
import {getToken, setToken, removeToken} from '@/utils/auth'
import { postUserLogin, getUserInfo } from '@/api/login'

const user = {
  state: {
    userInfo: {
      pcode: '00045',
      partId: '122E5E13ABFA47548F41D594CED5210E'
    },
    menus: {
      children: [{
        title: '常用流程',
        name: 'flow',
        icon: 'home',
        path: '/',
        children: []
      }, {
        title: '考勤明细',
        name: 'attendancDetails',
        icon: 'table',
        path: '/attendancDetails',
        children: []
      }, {
        title: '个人加班记录',
        name: 'overtimeRecord',
        icon: 'detail',
        path: '/overtimeRecord',
        children: []
      }, {
        title: '加班记录',
        name: 'overtimeRecordAll',
        icon: 'detail',
        path: '/overtimeRecordAll',
        children: []
      }, {
        title: '加班统计',
        name: 'overtimeStatistics',
        icon: 'jbtj',
        path: '/homepage',
        children: []
      }, {
        title: '调休查询',
        name: 'breakoff',
        icon: 'detail',
        path: '/breakoff',
        children: []
      }, {
        title: '调休统计',
        name: 'breakoffAll',
        icon: 'jbtj',
        path: '/breakoffAll',
        children: []
      }, {
        title: '倍率查询',
        name: 'times',
        icon: 'works',
        path: '/times',
        children: []
      }, {
        title: '休假记录',
        name: 'leaveRecord',
        icon: 'holiday',
        path: '/leaveRecord',
        children: []
      }, {
        title: '工作日历',
        name: 'workCalendar',
        icon: 'work',
        path: '/workCalendar',
        children: []
      }, {
        title: '值班表查询',
        name: 'inquiry',
        icon: 'works',
        path: '/inquiry',
        children: []
      }]
    },
    token: getToken(),
    elements: undefined
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(state.token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PERMISSION_MENUS: (state, menus) => {
      state.menus = menus
    },
    DELETE_USERINFO: (state) => {
      state.userInfo = null
    },
    DELETE_PERMISSION_MENUS: (state) => {
      state.menus = null
    },
    // 按钮权限
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements
    }
  },

  actions: {
    // 用户名登录
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        postUserLogin(userInfo).then(res => {
          if (res.status !== 200) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            })
            reject(res.data)
            return
          }
          commit('SET_TOKEN', res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logOut ({ commit }) {
      return new Promise((resolve) => {
        removeToken()
        commit('DELETE_USERINFO')
        commit('DELETE_PERMISSION_MENUS')
        resolve()
      })
    },
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getAllMenu().then(res => {
          commit('SET_PERMISSION_MENUS', res.data)
        })
        getUserInfo().then(res => {
          if (res.status !== 200) {
            reject(res.data)
            return
          }
          commit('SET_USERINFO', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getTokenRefresh ({ commit }, state) {
      commit('SET_TOKEN', state)
    }
  }
}

export default user
