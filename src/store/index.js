import Vue from 'vue'
import Vuex from 'vuex'

import user from './moduleUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },

  getters: {
    
  },

  mutations: {
    SET_LOADING: (state, loading = false) => {
      state.isLoading = loading
    },
  },
  
  actions: {
    
  },

  modules: {
    user
  }
})
