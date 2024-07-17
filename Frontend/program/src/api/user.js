// api/user.js
import request from '@/utils/request';

// 获取用户数据
export function apiGetUser(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  });
}
