// 通过入口，打包出一份代码。代码给node来使用
// webpack 打包服务端代码，是不需要引入打包后的js的，只是引入前端的打包后的结果
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin'); // 在服务端打包时增加插件


/**
 * 传入路径，通过文档当前所在位置找到这个文件
 * @param {路径} dir 
 */
const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
  // 入口
  entry: {
    server: resolve('../src/entry-server.js')
  },
  target: 'node', // 给 node 使用
  output: {
    libraryTarget: 'commonjs2' // 导出方式
  },
  plugins: [
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html', // html 名字
      template: resolve('../public/index.ssr.html'),
      minify: false, // 不压缩
      excludeChunks: ['server'] // 排除引入文件
    })
  ]
})