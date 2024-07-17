import request from '@/utils/request';

export function apiGetLimitation(params) {
    return request({
      url: '/limitation',
      method: 'get',
      params
    });
  }
  