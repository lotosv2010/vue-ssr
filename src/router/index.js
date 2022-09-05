/**
 * 路由模块 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'

Vue.use(VueRouter)

export function createRouter() {
  const router = new VueRouter({
    mode: 'history', // 同构应用不能使用 hash 路由，应该使用 history 模式 
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About.vue')
      },
      {
        path: '/postlist',
        name: 'postlist',
        component: () => import('@/pages/PostList.vue')
      },
      {
        path: '*',
        name: '404',
        component: () => import('@/pages/404.vue')
      }]
  })
  return router
}