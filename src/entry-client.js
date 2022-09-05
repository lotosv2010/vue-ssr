/**
  * 客户端入口 
  */
import { createApp } from './app' // 客户端特定引导逻辑......

const { app, router, store } = createApp()

// 如果当前页面中有 __INITIAL_STATE__ 数据，则直接将其填充到客户端容器中 
if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})