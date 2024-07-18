import request from '@/utils/request';

// 获取套餐管理数据
export function apiGetLimitation(params) {
    return request({
      url: '/limitation',
      method: 'get',
      params
    });
  }
  