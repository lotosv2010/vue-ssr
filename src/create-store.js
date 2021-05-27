import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () =>{
  const store = new Vuex.Store({
    state: {
      name: 'robin'
    },
    mutations: {
      CHANGE_NAME(state, payload) {
        state.name = payload
      }
    },
    actions: {
      changeName({ commit }, payload) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('CHANGE_NAME', payload)
            resolve() // 执行完要返回
          }, 1000);
        })
      }
    }
  })
  // 在浏览器运行代码
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}