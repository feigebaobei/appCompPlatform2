import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      uid: '',
      name: '',
      status: false// 表示是否等到用户信息
    }
  },
  getters: {
    getUid: function (state) {
      return state.userInfo.uid
    },
    getName: function (state) {
      return state.userInfo.name
    },
    getUserInfo: function (state) {
      // console.log(state.userInfo)
      return state.userInfo
    }
  },
  mutations: {
    addUid: function (state, payload) {
      // console.log(payload)
      state.userInfo.uid += payload.num
    },
    setUser: function (state, payload) {
      // console.log(payload)
      state.userInfo.uid = payload.uid
      state.userInfo.name = payload.name
      state.userInfo.status = true
    }
  },
  actions: {
    addUid: function ({commit}, payload) {
      commit('addUid', payload)
    },
    setUser: function ({commit}, payload) {
      commit('setUser', payload)
    }
  }
})
export default store
