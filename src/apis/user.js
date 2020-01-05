import axios from '../utils/myaxios.js'

export const login = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}

export const getUserInfo = (id) => {
    return axios({
        method: 'get',
        url: `/user/${id}`
    })
}