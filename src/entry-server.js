import createApp from './app'

// context.url 这里包含这当前访问服务端的路径
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 默认跳转到路径里，有异步组件
    router.push(context.url)
    router.onReady(() => {
      // 获取路由匹配到的组件
      const matchComponents = router.getMatchedComponents();
      if (!matchComponents.length) {
        return reject({ code: 404 });
      }
      Promise.all(matchComponents.map((component) => {
        if(component.asyncData) {
          return component.asyncData(store)
        }
      })).then(() => {
        context.state = store.state; // 将store挂载在window.__INITIAL_STATE__
        resolve(app)
      }, reject)
    })
    // 这个实例每次都是新的
    // return app
  })
}