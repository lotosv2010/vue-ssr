const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin'); // 在客户端打包时增加插件

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
    client: resolve('../src/entry-client.js')
  },
  plugins: [
    new VueSSRClientPlugin()
    // 前端打包出的结果，只是用于挂载到服务端生成的字符串中
    // new HtmlWebpackPlugin({
    //   template: resolve('../public/index.html')
    // })
  ]
})