import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
  },
  getters: {
    isLoggedIn(state) {
      return (state.userId != null)
    },
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    clearUserId(state) {
      state.userId = null
    },
  },
  actions: {
  },
  modules: {
  }
})
