const Koa = require('koa')
const Router = require('@koa/router')
const { createBundleRenderer } = require('vue-server-renderer')
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')

// 服务端编译后的js
// const serverBundle = fs.readFileSync(path.resolve(__dirname, './dist/server.bundle.js'), 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')

// 读取模板
const template = fs.readFileSync(path.resolve(__dirname, './public/index.ssr.html'), 'utf-8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

// createRenderer,创建一个渲染函数 renderToString, 渲染出一个字符串
const render = createBundleRenderer(serverBundle, {
  template,
  clientManifest // 自动注入客户端打包后的文件
})

// 产生一个 app 实例
let app = new Koa() 
// 产生一个路由实例
let router = new Router()

// router.get('/', async (ctx) => {
//   // 客户端 = template + 编译的结果 = 组成的html
//   ctx.body = await render.renderToString()
// })

router.get("/(.*)", async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    // 必须写成回调函数的方式否则样式不生效
    render.renderToString({ url: ctx.url }, (err, html) => {
      // 服务器可以监控到错误信息，返回404
      if(err && err.code == 404) {
        resolve('404 NOT FOUND')
      }
      resolve(html)
    })
  })
})

// 先匹配静态资源，资源找不到再找对应的api
// 使用静态服务插件
app.use(static(path.resolve(__dirname, 'dist')))
// 将路由注册到应用上
app.use(router.routes())
// 监听 3000 端口号
app.listen(3000)