import {
  company,
  fengYun,
  report,
  actualReport,
  rankings,
  summary,
  taking,
  jdjlr,
  profit,
  cost,
  fuzai,
  lilv,
  top5,
  gykh,
  cash,
  freeCash,
  finance,
  yyq,
  industry,
  industryIndex,
  pettm,
  notice,
  classifyTaking,
  price,
  gudong,
  gdhs,
  jgNum,
  jgInfo,
  ziComp,
  zdht,
  important,
  bond,
  companyHE,
  fengYunFe,
  getIncomeIncrement,
  getAssetsRatio,
  reciveInventory,
  researchSales
} from '@/api/stock';
import state from './state';
// 总览接口请求
export const getOverview = (data) => (dispatch) => {
  const { type } = state.overview;
  if (type !== 1) {
    dispatch(getRankings(data));
    dispatch(getCompanyInfo(data));
    dispatch(getViewPoint(data));
    dispatch(getActualReport(data));
    dispatch(getReport(data));
    // dispatch(getNotice(data))
    dispatch(getClassifyTaking(data));
    dispatch(setOverview(1));
  }
};
// 财务接口请求
export const getFinance = (data) => (dispatch) => {
  const { type } = state.finance;
  const { code } = data;
  if (type !== 1) {
    dispatch(getSummary(data));
    dispatch(getTaking(data));
    dispatch(getJdjlr(data));
    dispatch(getProfit(data));
    dispatch(getCost(data));
    dispatch(getFuzai(data));
    dispatch(getLilv(data));
    dispatch(getTop5(data));
    dispatch(getGykh(data));
    dispatch(getCash(data));
    dispatch(getFreeCash(data));
    dispatch(getFinanData(data));
    dispatch(setFinance(1));
    dispatch(getIncomeIncre({ code }));
    dispatch(getAssetsRatioData({ code }));
    dispatch(getReciveInventoryData({ code }));
    dispatch(getResearchSalesData(data));
  }
};

//行业模块接口
export const getIndustryData = (data) => (dispatch) => {
  const { type } = state.industryData;
  if (type !== 1) {
    dispatch(getIndustry(data));
    dispatch(getPettm(data));
    dispatch(getPrice(data));
    dispatch(getIndustryIndex(data));
    dispatch(setIndustrydata(1));
  }
};
//股东模块
export const getGudongData = (data) => (dispatch) => {
  const { type } = state.gudongData;
  if (type !== 1) {
    dispatch(getGudong(data));
    dispatch(getGdhs(data));
    dispatch(getJgNum(data));
    dispatch(getJgInfo(data));
    dispatch(setGudongdata(1));
  }
};

export const getOtherData = (data) => (dispatch) => {
  const { type } = state.otherData;
  if (type === 0) {
    dispatch(getZiComp(data));
    dispatch(getZdht(data));
    dispatch(getImportant(data));
    dispatch(getBond(data));
    dispatch(getYyq(data));
    dispatch(setOtherdata(1));
  }
};

export const getHKUSStock = (data) => (dispatch) => {
  dispatch(getViewPoints(data));
  dispatch(getCompanyHE(data));
};
export const getCompanyInfo = (data) => (dispatch) => {
  company(data).then((res) => res.resultCode === '00' && dispatch(setCompanyInfo(res.data)));
};
export const getViewPoint = (data) => (dispatch) => {
  fengYun(data).then((res) => {
    res.resultCode === '00' && dispatch(setViewPoint(res.data));
  });
};
export const getViewPoints = (data) => (dispatch) => {
  const stockCode = `${data.Code + '.' + data.companyType}`;
  fengYunFe({ stockCode }).then((res) => {
    dispatch(setList(res.list));
  });
};

export const getReport = (data) => (dispatch) => {
  report(data).then((res) => {
    res.resultCode === '00' && dispatch(setReport(res.data));
  });
};
export const getNotice = (data) => (dispatch) => {
  notice(data).then((res) => {
    res.resultCode === '00' && dispatch(setNotice(res.data));
  });
};
export const getActualReport = (data) => (dispatch) => {
  actualReport(data).then((res) => {
    res.resultCode === '00' && dispatch(setActualReport(res.data));
  });
};
export const getClassifyTaking = (data) => (dispatch) => {
  classifyTaking(data).then((res) => {
    res.resultCode === '00' && dispatch(setClassifyTaking(res.data));
  });
};
export const getRankings = (data) => (dispatch) => {
  rankings(data).then((res) => {
    res.resultCode === '00' && dispatch(setRankings(res.data));
  });
};

export const getIncomeIncre = (data) => (dispatch) => {
  getIncomeIncrement(data).then((res) => {
    res.resultCode === '00' && dispatch(setIncomeIncre(res.data));
  });
};

export const getAssetsRatioData = (data) => (dispatch) => {
  getAssetsRatio(data).then((res) => {
    res.resultCode === '00' && dispatch(setIncomeRatio(res.data));
  });
};

/**
 * 获取应收款
 *
 */

export const getReciveInventoryData = (data) => (dispatch) => {
  reciveInventory(data).then((res) => {
    res.resultCode === '00' && dispatch(setReciveInventory(res.data));
  });
};

/**
 * researchSales
 *
 * 接口：/rating/ranking/researchSales
 */

export const getResearchSalesData = (data) => (dispatch) => {
  researchSales(data).then((res) => {
    res.resultCode === '00' && dispatch(setResearchSales(res.data));
  });
};

export const getSummary = (data) => (dispatch) => {
  summary(data).then((res) => {
    res.resultCode === '00' && dispatch(setSummary(res.data));
  });
};
export const getTaking = (data) => (dispatch) => {
  taking(data).then((res) => {
    res.resultCode === '00' && dispatch(setTaking(res.data));
  });
};
export const getJdjlr = (data) => (dispatch) => {
  jdjlr(data).then((res) => {
    res.resultCode === '00' && dispatch(setJdjlr(res.data));
  });
};
export const getProfit = (data) => (dispatch) => {
  profit(data).then((res) => {
    res.resultCode === '00' && dispatch(setProfit(res.data));
  });
};
export const getCost = (data) => (dispatch) => {
  cost(data).then((res) => {
    res.resultCode === '00' && dispatch(setCost(res.data));
  });
};
export const getFuzai = (data) => (dispatch) => {
  fuzai(data).then((res) => {
    res.resultCode === '00' && dispatch(setFuzai(res.data));
  });
};
export const getLilv = (data) => (dispatch) => {
  lilv(data).then((res) => {
    res.resultCode === '00' && dispatch(setLilv(res.data));
  });
};
export const getTop5 = (data) => (dispatch) => {
  top5(data).then((res) => {
    res.resultCode === '00' && dispatch(setTop5(res.data));
  });
};
export const getGykh = (data) => (dispatch) => {
  gykh(data).then((res) => {
    res.resultCode === '00' && dispatch(setGykh(res.data));
  });
};
export const getCash = (data) => (dispatch) => {
  cash(data).then((res) => {
    res.resultCode === '00' && dispatch(setCash(res.data));
  });
};
export const getFreeCash = (data) => (dispatch) => {
  freeCash(data).then((res) => {
    res.resultCode === '00' && dispatch(setFreeCash(res.data));
  });
};
export const getFinanData = (data) => (dispatch) => {
  finance(data).then((res) => {
    res.resultCode === '00' && dispatch(setFinanData(res.data));
  });
};
export const getYyq = (data) => (dispatch) => {
  yyq(data).then((res) => {
    if (res.resultCode === '00') {
      dispatch(setOtherYyq(res.data));
    }
  });
};
export const getIndustry = (data) => (dispatch) => {
  industry(data).then((res) => {
    res.resultCode === '00' && dispatch(setIndustry(res.data));
  });
};
export const getPettm = (data) => (dispatch) => {
  pettm(data).then((res) => {
    res.resultCode === '00' && dispatch(setPettm(res.data));
  });
};
export const getPrice = (data) => (dispatch) => {
  price(data).then((res) => {
    res.resultCode === '00' && dispatch(setPrice(res.data));
  });
};
export const getIndustryIndex = (data) => (dispatch) => {
  industryIndex(data).then((res) => {
    res.resultCode === '00' && dispatch(setIndustryIndex(res.data));
  });
};
// 股东
export const getGudong = (data) => (dispatch) => {
  gudong(data).then((res) => {
    res.resultCode === '00' && dispatch(setGudong(res.data));
  });
};
export const getGdhs = (data) => (dispatch) => {
  gdhs(data).then((res) => {
    res.resultCode === '00' && dispatch(setGdhs(res.data));
  });
};
export const getJgNum = (data) => (dispatch) => {
  jgNum(data).then((res) => {
    res.resultCode === '00' && dispatch(setJgNum(res.data));
  });
};
export const getJgInfo = (data) => (dispatch) => {
  jgInfo(data).then((res) => {
    res.resultCode === '00' && dispatch(setJgInfo(res.data));
  });
};

// 其他
export const getZiComp = (data) => (dispatch) => {
  ziComp(data).then((res) => res.resultCode === '00' && dispatch(setZiComp(res.data)));
};
export const getZdht = (data) => (dispatch) => {
  zdht(data).then((res) => res.resultCode === '00' && dispatch(setZdht(res.data)));
};
export const getImportant = (data) => (dispatch) => {
  important(data).then((res) => res.resultCode === '00' && dispatch(setImportant(res.data)));
};
export const getBond = (data) => (dispatch) => {
  bond(data).then((res) => res.resultCode === '00' && dispatch(setBond(res.data)));
};
export const getCompanyHE = (data) => (dispatch) => {
  companyHE(data).then((res) => {
    res.resultCode === '00' && dispatch(setCompanyhe(res.data));
  });
};

const setCompanyInfo = (data) => ({
  type: 'SET_COMPANY_INFO',
  data: data
});
const setClassifyTaking = (data) => ({
  type: 'SET_CLASSIFY_TAKING',
  data: data
});
const setViewPoint = (data) => ({
  type: 'SET_VIEW_POINT',
  data: data
});
const setList = (data) => ({
  type: 'SET_LIST',
  data: data
});
const setNotice = (data) => ({
  type: 'SET_NOTICE',
  data: data
});
const setReport = (data) => ({
  type: 'SET_REPORT',
  data: data
});

const setActualReport = (data) => ({
  type: 'SET_ACTUAL_REPORT',
  data: data
});

const setRankings = (data) => ({
  type: 'SET_RANKINGS',
  data: data
});

const setIncomeIncre = (data) => ({
  type: 'SET_INCOME_INCREMENT',
  data: data
});

const setIncomeRatio = (data) => ({
  type: 'SET_ASSETS_RATIO',
  data: data
});

const setSummary = (data) => ({
  type: 'SET_SUMMARY',
  data: data
});

const setTaking = (data) => ({
  type: 'SET_TAKING',
  data: data
});

const setJdjlr = (data) => ({
  type: 'SET_JDJLR',
  data: data
});

const setProfit = (data) => ({
  type: 'SET_PROFIT',
  data: data
});

const setCost = (data) => ({
  type: 'SET_COST',
  data: data
});

const setFuzai = (data) => ({
  type: 'SET_FUZAI',
  data: data
});

const setLilv = (data) => ({
  type: 'SET_LILV',
  data: data
});
const setTop5 = (data) => ({
  type: 'SET_TOP5',
  data: data
});

const setGykh = (data) => ({
  type: 'SET_GYKH',
  data: data
});

const setCash = (data) => ({
  type: 'SET_CASH',
  data: data
});
const setFreeCash = (data) => ({
  type: 'SET_FREE_CASH',
  data: data
});
const setFinanData = (data) => ({
  type: 'SET_FINAN_DATA',
  data: data
});

const setIndustry = (data) => ({
  type: 'SET_INDUSTRY',
  data: data
});
const setPettm = (data) => ({
  type: 'SET_PETTM',
  data: data
});
const setPrice = (data) => ({
  type: 'SET_PRICE',
  data: data
});
const setIndustryIndex = (data) => ({
  type: 'SET_INDUSTRY_INDEX',
  data: data
});
const setGudong = (data) => ({
  type: 'SET_GUDONG',
  data: data
});

const setGdhs = (data) => ({
  type: 'SET_GDHS',
  data: data
});
const setJgNum = (data) => ({
  type: 'SET_JGNUM',
  data: data
});
const setJgInfo = (data) => ({
  type: 'SET_JGINFO',
  data: data
});

const setOtherYyq = (data) => ({
  type: 'SET_OTHER_YYQ',
  data: data
});

const setZiComp = (data) => ({
  type: 'SET_ZI_COMP',
  data: data
});
const setZdht = (data) => ({
  type: 'SET_ZDHT',
  data: data
});
const setImportant = (data) => ({
  type: 'SET_IMPORTANT',
  data: data
});
const setBond = (data) => ({
  type: 'SET_BOND',
  data: data
});

export const setCode = (data) => ({
  type: 'SET_CODE',
  data: data
});

const setOverview = (data) => ({
  type: 'OVERVIEW',
  data: data
});
const setFinance = (data) => ({
  type: 'FINANCE',
  data: data
});
const setIndustrydata = (data) => ({
  type: 'INDUSTRYDATA',
  data: data
});
const setGudongdata = (data) => ({
  type: 'GUDONGDATA',
  data: data
});
const setOtherdata = (data) => ({
  type: 'OTHERDATA',
  data: data
});

export const setName = (data) => ({
  type: 'SET_NAME',
  data: data
});

const setCompanyhe = (data) => ({
  type: 'SET_COMPANYHE',
  data: data
});

const setReciveInventory = (data) => ({
  type: 'SET_RECIVEINVENTORY',
  data: data
});

const setResearchSales = (data) => ({
  type: 'SET_RESEARCHSALES',
  data
});
