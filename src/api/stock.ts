import request from '@/utils/request';
/**
 * 总览模块
 */
// 排名与评分接口
export const rankings = (data) => {
  return request({
    url: '/ranking/rankings',
    method: 'post',
    data
  });
};
// 公司简介
export const company = (data) => {
  return request({
    url: '/ranking/company',
    method: 'post',
    data
  });
};
// 风云观点
export const fengYun = (data) => {
  return request({
    url: '/ranking/FengYun',
    method: 'post',
    data
  });
};

// 非定期报告
export const actualReport = (data) => {
  return request({
    url: '/ranking/actual_report',
    method: 'post',
    data
  });
};

// 定期报告
export const report = (data) => {
  return request({
    url: '/ranking/report',
    method: 'post',
    data
  });
};

//近一年价格走势
export const dailyPrice = (data) => {
  return request({
    url: '/ranking/dailyPrice',
    method: 'post',
    data
  });
};
//审计意见
export const summary = (data) => {
  return request({
    url: '/ranking/summary',
    method: 'post',
    data
  });
};

/**
 * 财务模块
 */
// 营业收入数据

export const taking = (data) => {
  return request({
    url: '/ranking/taking',
    method: 'post',
    data
  });
};

// 营收以及增速
export const getIncomeIncrement = (data) => {
  return request({
    method: 'post',
    data,
    url: '/ranking/takingIncrease'
  });
};
/**
 * 应收款与存货
 */
export const reciveInventory = (data) => {
  return request({
    url: '/ranking/reciveInventory',
    method: 'post',
    data: data
  });
};

/**
 * 应收款与存货
 */
export const researchSales = (data) => {
  return request({
    url: '/ranking/researchSales',
    method: 'post',
    data: data
  });
};

// /rating/ranking/researchSales

// 营收以及增速
export const getAssetsRatio = (data) => {
  return request({
    method: 'post',
    data,
    url: '/ranking/assetsRatio'
  });
};

//上市公司近几个季度的净利润数据
export const jdjlr = (data) => {
  return request({
    url: '/ranking/JDJLR',
    method: 'post',
    data
  });
};

//上市公司最新一期公告的盈利数据
export const profit = (data) => {
  return request({
    url: '/ranking/profit',
    method: 'post',
    data
  });
};

//上市公司最新一期公告的盈利数据
export const cost = (data) => {
  return request({
    url: '/ranking/Cost',
    method: 'post',
    data
  });
};

//最新一期的资产负债数据

export const fuzai = (data) => {
  return request({
    url: '/ranking/FZ',
    method: 'post',
    data
  });
};
// 毛利率，净利率数据
export const lilv = (data) => {
  return request({
    url: '/ranking/LiLv',
    method: 'post',
    data
  });
};

//获取前五客户、供应商占比
export const top5 = (data) => {
  return request({
    url: '/ranking/top5',
    method: 'post',
    data
  });
};

//前五供应商-客户
export const gykh = (data) => {
  return request({
    url: '/ranking/majorClient',
    method: 'post',
    data
  });
};
//现金流
export const cash = (data) => {
  return request({
    url: '/ranking/Cash',
    method: 'post',
    data
  });
};

//自由现金流
export const freeCash = (data) => {
  return request({
    url: '/ranking/free_cash',
    method: 'post',
    data
  });
};

//财务比例
export const finance = (data) => {
  return request({
    url: '/ranking/Finance',
    method: 'post',
    data
  });
};

/**
 * 行业模块接口
 */
// 行业分类
export const industry = (data) => {
  return request({
    url: '/ranking/industry',
    method: 'post',
    data: data
  });
};

// 可比公司PE与评分

export const pettm = (data) => {
  return request({
    url: '/ranking/pettm',
    method: 'post',
    data
  });
};

// 经营数据公告
export const notice = (data) => {
  return request({
    url: '/ranking/getPDF',
    method: 'post',
    data
  });
};

// 营业收入
export const classifyTaking = (data) => {
  return request({
    url: '/ranking/classifyTaking',
    method: 'post',
    data
  });
};

//行业指数图
export const industryIndex = (data) => {
  return request({
    url: '/ranking/industryIndex',
    method: 'post',
    formType: '1',
    data
  });
};

//主要工业品产量
export const price = (data) => {
  return request({
    url: '/ranking/Price',
    method: 'post',
    data
  });
};

/**
 * 股东模块接口
 */
// 上市公司前十大股东数据
export const gudong = (data) => {
  return request({
    url: '/ranking/gudong',
    method: 'post',
    data
  });
};

// 上市公司股东户数变化数据
export const gdhs = (data) => {
  return request({
    url: '/ranking/GDHS',
    method: 'post',
    data
  });
};

// 公司对应机构数及持股比例
export const jgNum = (data) => {
  return request({
    url: '/ranking/jg_num',
    method: 'post',
    data
  });
};

// 公司对应机构数及持股比例
export const jgInfo = (data) => {
  return request({
    url: '/ranking/jg_info',
    method: 'post',
    data
  });
};

/**
 * 其他模块接口
 */

//子公司数据
export const ziComp = (data) => {
  return request({
    url: '/ranking/zi_comp',
    method: 'post',
    data
  });
};

//前五公司数据
export const yyq = (data) => {
  return request({
    url: '/ranking/yyq',
    method: 'post',
    data
  });
};

//重大公告数据
export const zdht = (data) => {
  return request({
    url: '/ranking/zdht',
    method: 'post',
    data
  });
};

//重要事项数据
export const important = (data) => {
  return request({
    url: '/ranking/important',
    method: 'post',
    data
  });
};

//债券—不含可转债数据
export const bond = (data) => {
  return request({
    url: '/ranking/bond',
    method: 'post',
    data
  });
};

export const jgCode = (data) => {
  return request({
    url: '/ranking/jg_code',
    method: 'post',
    formType: '1',
    data
  });
};

// 港股 涉及页面

export const companyHE = (data) => {
  return request({
    url: '/ranking/CompanyHE',
    method: 'post',
    formType: '1',
    data
  });
};

export const fengYunFe = (query) => {
  return request({
    baseURL: '/chaos/api',
    url: '/v1/stock/article',
    method: 'get',
    params: query
  });
};

export const wogooRankChange = (data: {
  page: number;
  size: number;
  dimension: number;
  sortType: number;
}) => {
  return request({
    baseURL: '/chaos/api',
    url: '/v1/stock/ranking/change',
    method: 'post',
    data
  });
};
