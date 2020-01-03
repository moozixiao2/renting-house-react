import axios from 'axios'
import { baseURL } from './url'

// 引入加载Toast
import { Toast } from 'antd-mobile'

let instance = axios.create({
    baseURL
  });

// 请求拦截
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如加入token
  Toast.loading('正在加载中...', 1 * 60 * 60 , null, true);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 响应拦截
instance.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  Toast.hide()
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance