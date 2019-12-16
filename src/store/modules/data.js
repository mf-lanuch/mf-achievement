export default {
  state: {
    dataList: {} // 咨询已访问的id列表。避免重复加载
  },
  getters: {
    inspectType: (state, getters) => ({ type, id }) => {
      if (!state.dataList[type]) {
        return false
      }
      return !!state.dataList[type][id]
    }
  },
  mutations: {
    // 添加路由类型
    SET_CACHE_DATA_LIST (state, { type, id, data }) {
      if (!state.dataList[type]) {
        state.dataList[type] = []
      }

      state.dataList[type][id] = data
    }
  },
  actions: {
    // 添加缓存数据
    setCacheData: ({ commit }, data) => {
      commit('SET_CACHE_DATA_LIST', data)
    },

    // 获取缓存数据
    getCacheData: ({ commit, state }, data) => {
      return state.dataList[data.type][data.id]
    }
  }
}
