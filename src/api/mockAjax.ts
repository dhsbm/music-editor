import axios from 'axios'
// 引入进度条
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 使用自定义配置新建一个 axios 实例
const ajax = axios.create({
  baseURL: '/mock', // 基础路径
  timeout: 5000, // 请求超时时间
})

// 添加请求拦截器
ajax.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    NProgress.start()
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
ajax.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    NProgress.done()
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default ajax
