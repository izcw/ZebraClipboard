import request from '@/utils/request';

// 获取用户数据
export function apiGetAdmin(params) {
  return request({
    url: '/admin',
    method: 'get',
    params
  });
}
