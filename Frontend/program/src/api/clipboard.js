import request from '@/utils/request';

// 获取剪贴板数据
export function apiGetClipboard(params) {
  return request({
    url: '/clipboard',
    method: 'get',
    params
  });
}


// 删除剪贴板数据
export function apiDeleteClipboard(params) {
  return request({
    url: '/clipboard/' + params.id,
    method: 'delete'
  });
}

// 修改剪贴板数据
export function apiSaveClipboard(params) {
  return request({
    url: '/clipboard/' + params.id,
    method: 'put',
    data: params
  });
}