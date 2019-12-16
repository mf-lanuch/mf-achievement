import { Message } from 'element-ui'
import {getAllMenu} from '@/api/common'
import {getToken, setToken, removeToken} from '@/utils/auth'
import { postUserLogin, getUserInfo } from '@/api/login'

const user = {
  state: {
    userInfo: null,
    menus: {
      children: [{
        title: '首页',
        name: 'homepage',
        icon: 'menu',
        path: '/homepage',
        children: []
      }, {
        title: '绩效管理',
        name: 'achievement',
        icon: 'setting',
        path: '/achievement',
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
