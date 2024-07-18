const axios = require('axios');

// 创建 axios 实例
const service = axios.create({
  baseURL: 'https://apizebra.duoyu.link', // 基本地址
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加请求头等操作
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

module.exports = service;


// // 示例：发起 GET 请求
// service.get('/endpoint')
//   .then(response => {
//     console.log('GET 请求结果:', response);
//   })
//   .catch(error => {
//     console.error('GET 请求错误:', error);
//   });

// // 示例：发起 POST 请求
// service.post('/endpoint', {
//     data: 'example'
//   })
//   .then(response => {
//     console.log('POST 请求结果:', response);
//   })
//   .catch(error => {
//     console.error('POST 请求错误:', error);
//   });