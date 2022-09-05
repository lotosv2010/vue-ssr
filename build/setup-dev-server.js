const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const resolve = file => path.resolve(__dirname, file)

module.exports = function (app, templatePath, cb) {
  let ready
  const onReady = new Promise(r => ready = r)

  let serverBundle
  let clientManifest
  let template

  const update = () => {
    if (serverBundle && clientManifest) {
      // 构建完毕，通知 server 可以 render 渲染了 
      ready()

      // 更新 server 中的 Renderer 
      cb(serverBundle, {
        template,
        clientManifest
      })
    }
  }

  // 监视构建 template，调用 update 更新 Renderer
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('template updated.')
    update()
  })
  // 监视构建 serverBundle，调用 update 更新 Renderer 
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webpack(serverConfig)
  const serverDevMiddleware = webpackDevMiddleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出
  })
  serverCompiler.hooks.done.tap('server', () => {
    // serverCompiler.outputFileSystem.readFileSync 等价 serverDevMiddleware.fileSystem.readFileSync
    const serverBundleStr = serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    serverBundle = JSON.parse(serverBundleStr)
    // console.log(serverBundle)
    update()
  })

  // 监视构建 clientManifest，调用 update 更新 Renderer 
  const clientConfig = require('./webpack.client.config')

  // ====================== 热更新配置 ============================ 
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.entry.app = [
    'webpack-hot-middleware/client?reload=true&noInfo=true', // 和服务端交互处理热更新的一个客户端脚本
    clientConfig.entry.app
  ]
  clientConfig.output.filename = '[name].js'
  // ======================== /热更新配置 ==========================

  const clientCompiler = webpack(clientConfig)
  const clientDevMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath, // ! 重要!输出资源的访问路径前缀，应该和 客户端打包输出的 publicPath 一致
    logLevel: 'silent'
  })
  clientCompiler.hooks.done.tap('client', () => {
    clientManifest = JSON.parse(
      clientCompiler.outputFileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8'))
    update()
  })
  // ! 重要!将内存中的资源通过 Express 中间件对外公开访问 
  app.use(clientDevMiddleware)

  // 挂载热更新的中间件 
  app.use(hotMiddleware(clientCompiler, {
    log: false
  }))

  return onReady
}