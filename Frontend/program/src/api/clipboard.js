import request from '@/utils/request';

// 获取剪贴板数据
export function apiGetClipboard(params) {
  return request({
    url: '/clipboard',
    method: 'get',
    params
  });
}
