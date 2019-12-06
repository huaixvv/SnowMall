import axios from 'axios';

export function request(config) {
  
  //创建axios实例
  const instance = axios.create({
    // baseURL = "http://123.207.32.32:8000/api/v2"
    baseURL: "http://106.54.54.237:8000/api/v1",
    timeout: 5000
  })

  //axios拦截器
  //1.请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
     //console.log(err);
  })

  //2.响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
      console.log(err);
  })

  //发送真正的网络请求  这里返回的是promise
  return instance(config)
}