/**
  * 服务端入口，仅运行于服务端 
  */
const express = require('express')
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')
const LRU = require('lru-cache')
const compressible = require('compressible')

const cache = new LRU({
  max: 100,
  ttl: 1000 * 60 * 5,
})
const isCacheable = req => {
  console.log(req.url)
  if (req.url === '/postlist') {
    return true
  }
}

const isProd = process.env.NODE_ENV === 'production'
const templatePath = './src/index.html'

const server = express()

server.use('/dist', express.static('./dist'))

let renderer
let onReady

// 生产模式，直接基于已构建好的包创建渲染器 
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template, // (可选)页面模板
    clientManifest // (可选)客户端构建 manifest
  })
} else {
  // 开发模式
  // 打包构建(客户端 + 服务端) -> 创建渲染器 
  // ↓
  //  模板 + 客户端 bundle + 服务端 bundle
  //  改变 -> 从新生成渲染器
  //  源码改变 -> 打包客户端 Bundle + 服务端 Bundle
  // onReady 是一个 Promise,当它完成的时候意味着初始构建已完成
  onReady = setupDevServer(
    server,
    templatePath,
    (serverBundle, options) => {
      // 该回调函数是重复调用的
      // 每当生成新的 template、客户端 bundle、服务端 bundle 都会重新生成新的渲染器 
      renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false, // 推荐
        ...options
      })
    }
  )
}

async function render(req, res) {
  const context = {
    url: req.url,
    title: 'Vue-SSR',
    metas: `<meta name="description" content="拉勾教育"> `
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦!
  // bundle renderer 在调用 renderToString 时，
  // 它将自动执行「由 bundle 创建的应用程序实例」所导出的函数(传入上下文作为参数)，然后渲染它。
  try {
    const cacheable = isCacheable(req)
    if (cacheable) {
      const html = cache.get(req.url)
      if (html) {
        return res.end(html)
      }
    }

    const html = await renderer.renderToString(context)
    compressible('text/*')
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.send(html)

    if (cacheable) {
      cache.set(req.url, html)
    }
  } catch (err) {
    res.status(500).end(err.message)
  }
}

// 服务端路由设置为 * 意味着所有的路由都会进入到这里
server.get('*', isProd
  ? render // 生产模式:使用构建好的包直接渲染 
  : async (req, res) => {
    // 开发模式:等编译构建好再渲染 
    await onReady
    render(req, res)
  })

server.listen(8090, () => {
  console.log('server running at port 8090.')
})