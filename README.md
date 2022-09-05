## ssr 的运行过程
- 只是首屏做 ssr 服务端渲染
- 后续的切换逻辑，执行的都是客户端渲染(前端路由来切换)

## ssr 整个打包过程
- 通过一份代码，打包出来两份逻辑(前端、服务端)
- 前端拿到打包出来的js，后段通过打包的结果渲染出字符串
- 前端的js + 后段渲染的字符串 = 扔到浏览器上

## 需要的包
- vue
- vue-server-renderer
- koa
- @koa/router

## 目录

```html
├── config
│   ├── webpack.base.js
│   ├── webpack.client.js
│   └── webpack.server.js
├── dist
│   ├── client.bundle.js
│   ├── index.html
│   ├── index.ssr.html
│   ├── server.bundle.js
│   ├── vue-ssr-client-manifest.json
│   └── vue-ssr-server-bundle.json
├── package.json
├── public
│   ├── index.html
│   └── index.ssr.html
├── server.js
├── src
│   ├── App.vue
│   ├── components
│   │   ├── Bar.vue
│   │   └── Foo.vue
│   ├── entry-client.js
│   ├── entry-server.js
│   ├── app.js
│   ├── router.js
│   └── store.js
├── webpack.config.js
```

## webpack
- webpack 使用需要的包
  - webpack
  - webpack-cli
  - webpack-dev-server
  - vue-loader
  - vue-template-compiler
  - vue-style-loader
  - css-loader
  - @babel/core
  - @babel/preset-env
  - babel-loader
  - html-webpack-plugin