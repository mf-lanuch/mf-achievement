import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters' // 全局getters配置

import user from './modules/user' // 用户相关
import data from './modules/data' // 数据缓存

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    data
  },
  getters
})

export default store
