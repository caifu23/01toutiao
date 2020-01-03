import Vue from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/styles/reset.css'
// 引入路由模块
import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App),
}).$mount('#app')
