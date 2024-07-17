import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://apizebra.duoyu.link', // 这里设置统一的基础 URL
  timeout: 1000, // 设置请求超时时间
  headers: { 'Content-Type': 'application/json' } // 设置请求头
});

export default instance;
