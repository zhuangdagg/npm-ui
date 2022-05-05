import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局样式
import '@/style/index.scss'
const app = createApp(App)

app.use(createPinia()).use(ElementPlus)

// vm 根组件实例
const vm = app.mount('#app')
