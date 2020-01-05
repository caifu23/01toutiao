import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import EditProfile from '../views/edit_profile'

// 挂载
Vue.use(VueRouter)

// 创建路由
let router = new VueRouter({
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'Personal',
            // 动态参数id，  动态路径参数 以冒号开头
            path: '/personal/:id',
            component: Personal
        },
        {
            name: 'EditProfile',
            path: '/edit_profile/:id',
            component: EditProfile
        }
    ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to)
    if(to.path.indexOf('/personal') === 0) {
        // 当前即将跳转 个人中心页
        // 验证是否登录
        let token = localStorage.getItem('hmtoutiao_41_token')
        if(token) {
            next()
        }else {
            // 重定向至登录页
            next({name: 'Login'})
        }
    }else {
        next()
    }
})

// 暴露路由
export default router