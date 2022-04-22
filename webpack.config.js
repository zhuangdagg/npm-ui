const path = require('path')

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')

const mode = process.env.NODE_ENV || 'development'
console.log(mode, '---mode')
module.exports = {
  mode,
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main-[hash:18].js'
  },
  name: '6666',
  devServer: {
    port: 7001,
    open: true,
    // 开始监听端口
    onListening: function(devServer) {
      if(!devServer) {
        throw new Error('webpack-dev-server is not defined!')
      }
    }
  },
  module:{
    rules:[
      {test:/\.vue$/,use:"vue-loader"},
      {test:/\.scss$/,use:["style-loader","css-loader", "sass-loader"]}
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new vueLoaderPlugin(),
    // 每次构建清空dist
    new CleanWebpackPlugin(),
  ]
}