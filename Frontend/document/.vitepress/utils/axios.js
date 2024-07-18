import axios from 'axios';
import configuration from './config.js';

const instance = axios.create({
  baseURL: configuration.urlport4012, // 基本地址
  timeout: 1000, // 设置请求超时时间
  headers: { 'Content-Type': 'application/json' } // 设置请求头
});

export default instance;
