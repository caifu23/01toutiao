import axios from '../utils/myaxios.js'

// 登录请求
export const login = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}

// 获取用户详情
export const getUserInfo = (id) => {
    return axios({
        method: 'get',
        url: `/user/${id}`
    })
}

// 编辑用户信息
export const editUserInfo = (id,data) => {
    return axios({
        method: 'post',
        url: `/user_update/${id}`,
        data
    })
}