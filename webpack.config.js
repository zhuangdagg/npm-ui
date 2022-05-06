import path from 'path'
const __dirname = path.resolve()

// plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import htmlWebpackPlugin from 'html-webpack-plugin'
import {VueLoaderPlugin} from 'vue-loader'

const mode = process.env.NODE_ENV || 'development'

export default {
  mode,
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main-[hash:18].js'
  },
  name: '[Beta]npm-ui',
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
      {test:/\.scss$/,use:["style-loader","css-loader", "sass-loader", {
        loader: 'style-resources-loader',     // 引入全局样式 variables、mixin
        options: {
          patterns: [
            'src/style/mixin.scss',
            'src/style/variables.scss'
          ]
        }
      }]},
      {test:/\.css$/,use:["style-loader","css-loader"]},
      {test:/\.svg$/,use: ["file-loader"]}
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
    new VueLoaderPlugin(),
    // 每次构建清空dist
    new CleanWebpackPlugin(),
  ]
}