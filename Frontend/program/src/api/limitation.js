import request from '@/utils/request';

// 获取套餐管理数据
export function apiGetLimitation(params) {
  return request({
    url: '/limitation',
    method: 'get',
    params
  });
}


// 删除套餐数据
export function apiDeleteLimitation(params) {
  return request({
    url: '/limitation/' + params.id,
    method: 'delete'
  });
}

// 修改套餐数据
export function apiSaveLimitation(params) {
  return request({
    url: '/limitation/' + params.id,
    method: 'put',
    data: params
  });
}

// 增加套餐数据
export function apiAddLimitation(params) {
  console.log("7777");
  console.log(params);
  return request({
    url: '/limitation',
    method: 'post',
    data: params
  });
}