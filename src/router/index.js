import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入
import Login from '../views/Login.vue'

// 挂载
Vue.use(VueRouter)

// 创建路由
let router = new VueRouter({
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login
        }
    ]
})

// 暴露路由
export default router