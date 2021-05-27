import Vue from 'vue'
import App from './App.vue'
import createRouter from './create-router'
import createStore from './create-store'

// 1.vue在客户端运行的时候，每个客户端都拥有一个独立的实例
// 2.每次客户端访问都要产生一个新的实例，所以这里导出一个函数
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 后续会导出路由、vuex等
  return {
    app,
    router,
    store
  }
}