// utils/request.js
import axios from 'axios';
import configuration from '@/utils/config.js';

// 创建 axios 实例
const service = axios.create({
  // baseURL: 'https://apizebra.duoyu.link', // 我的服务器基本地址
  baseURL: configuration.urlport4012, // 本地基本地址
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

export default service;
