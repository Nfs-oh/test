import request from '@/utils/request';

// 原材料涨跌幅前十
export const top10 = () => {
  return request({
    url: '/price/home',
    method: 'post'
  });
};
//两融余额
export const rzrq = (data) => {
  return request({
    url: '/ranking/sheet_rzrq',
    method: 'post',
    formType: '1',
    data: data
  });
};

export const relieve = (data) => {
  return request({
    url: '/ranking/sheet_relieve',
    method: 'post',
    formType: '1',
    data: data
  });
};

/**
 * 研发与销售 图表
 */
export const researchSale = (data) => {
  return request({
    url: '/ranking/researchSales',
    method: 'post',
    formType: '1',
    data: data
  });
};
