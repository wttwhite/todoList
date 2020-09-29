import axios from 'axios'

const http = axios.create({
  timeout: 6000,
  headers: { 'X-Requested-width': 'XMLHttpRequest' },
  baseURL: process.env.BASE_URL
})
http.interceptors.response.use(res => {
  if (res.data.code === 0) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject({
      message: res.data.message || '后端返回code非0'
    })
  }
}, error => {
    return Promise.reject(error)
})

export default http
