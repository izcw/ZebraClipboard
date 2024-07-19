// api/user.js
import request from '@/utils/request';

// 获取用户数据
export function apiGetUser() {
  return request({
    url: '/user',
    method: 'get'
  });
}


// 删除用户数据
export function apiDeleteUser(params) {
  return request({
    url: '/user/'+params.id,
    method: 'delete'
  });
}

// 删除用户数据
export function apiSaveUser(params) {
  return request({
    url: '/user/'+params.id,
    method: 'put', 
    data: params
  });
}