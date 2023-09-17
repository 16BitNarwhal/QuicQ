import { createApp } from 'vue'
import './style.css'
import "element-plus/theme-chalk/el-notification.css";
import App from './App.vue'

import ECharts from 'vue-echarts'

import router from './router'

import pinia from './store'

const app = createApp(App)

app.use(router)

app.use(pinia)

app.component('ECharts', ECharts)

app.mount('#app')
