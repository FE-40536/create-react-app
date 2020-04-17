import urls from '@/urls'
import {Toast} from 'antd-mobile'
import axios from 'axios'
import localforage from 'localforage'
import history from './history'

let config = {
    baseURL: process.env.baseURL || process.env.apiUrl || '',
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
    headers: {
        'Content-Type': 'application/json',
    },
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
    async config => {
        const token = await localforage.getItem('token')
        if ([urls.login, urls.register].includes(config.url)) {
        } else {
            if (token) {
                config.headers.signature = token // 将token设置成请求头
                if (config.method === 'get') {
                    config.params = {
                        ...config.params,
                        token,
                    }
                } else {
                    config.data = {
                        ...config.data,
                        token,
                    }
                }
            }
            // else {
            //     history.replace('/login')
            // }
        }

        // Do something before request is sent
        return config
    },
    error => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        if (response.data.msg === '登录已失效，请先登录') {
            // history.replace(`/login?callback=${encodeURIComponent(global.location.href)}`)
            throw 'token 失效'
        } else if (response.data.code !== 200) {
            Toast.fail(response.data.msg, 2)
            throw response.data.msg
        }
        // Do something with response data
        return response.data
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error)
    }
)

export default _axios
