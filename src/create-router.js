// 用来创建路由
// 可以用异步组件来加载(靠的是 webpack 中代码分割功能 import())
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Bar = () => import('./components/Bar.vue')
const Foo = () => import('./components/Foo.vue')

export default () => {
  const router = new  VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/foo',
        component: Foo
      },
      {
        path: '/bar',
        component: Bar
      }
    ]
  })
  return router
}