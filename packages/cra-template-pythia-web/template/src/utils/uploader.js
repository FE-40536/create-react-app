import axios from 'axios'
import history from './history'
import localforage from 'localforage'

let config = {
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}

const uploader = axios.create(config)

uploader.interceptors.request.use(
    async config => {
        const token = await localforage.getItem('token')
        if (token) {
            config.headers.Authorization = token // 将token设置成请求头
            config.data.append('token', token)
        } else {
            history.replace('/login')
        }
        return config
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
uploader.interceptors.response.use(
    function(response) {
        // errno 0 success
        if (response.data.errno === 999 || response.data.errmsg === 'token expired.') {
            history.replace('/login')
            throw 'token 失效'
        } else if (response.data.errno !== 0) {
            throw response.data.errmsg
        }
        // Do something with response data
        return response.data
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error)
    }
)

export default (url, formData) => {
    return uploader.post(url, formData)
}
