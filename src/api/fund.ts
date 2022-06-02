import request from '@/utils/request';

export const getFundData = (params: { FundCode: string }) => {
  return request({
    method: 'post',
    baseUrl: process.env.REACT_APP_PURE_BASE_API,
    data: params,
    url: '/fund/fundInfo'
  });
};
