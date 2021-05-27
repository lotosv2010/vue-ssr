// 基本配置
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
/**
 * 传入路径，通过文档当前所在位置找到这个文件
 * @param {路径} dir 
 */
const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 出口
  output: {
    // 配置多个入口
    filename: '[name].bundle.js', // 结果文件名
    path: resolve('../dist')  // 产生的路径
  },
  resolve: { // 解析文件时按照一下顺序查找后缀
    extensions: ['.js', '.vue', '.css', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        // loader 执行顺序是：从下到上，从右到左
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: {
          options: { 
            // 告诉js 文件需要es6 转化成es5 的插件
            // 默认使用 babel-loader 调用 babel-core 的 transform 方法，最后调用 preset
            presets: ['@babel/preset-env']
          },
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

