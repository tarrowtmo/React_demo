import request from '@/utils/request.ts';

export const getResouceList= () =>
  request({
    url: '/getResouceList',
    method: 'get'
  });