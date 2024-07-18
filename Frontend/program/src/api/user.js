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


// 删除用户数据
export function apiDeleteUser(params) {
  return request({
    url: '/user/'+params.id,
    method: 'delete'
  });
}