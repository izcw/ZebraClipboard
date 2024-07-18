import request from '@/utils/request';

// 获取用户历史信息数据
export function apiGetHistorinfo(params) {
  return request({
    url: '/historinfo',
    method: 'get',
    params
  });
}
