import initstate from './state';
import { formMatekh } from '@/utils';
const stock = (state = initstate, action) => {
  switch (action.type) {
    case 'SET_CODE':
      state.code = action.data;
      return {
        ...state
      };
    case 'SET_COMPANY_INFO':
      state.overview.companyInfo = action.data;
      return {
        ...state
      };
    case 'SET_VIEW_POINT':
      state.overview.viewpoints = action.data;
      return {
        ...state
      };
    case 'SET_LIST':
      state.overview.list = action.data;
      return {
        ...state
      };
    case 'SET_REPORT':
      state.overview.regular = action.data;
      return {
        ...state
      };
    case 'SET_NOTICE':
      state.overview.notice = action.data;
      return {
        ...state
      };
    case 'SET_CLASSIFY_TAKING':
      state.overview.classifyTaking = action.data;
      return {
        ...state
      };
    case 'SET_ACTUAL_REPORT':
      state.overview.irregular = action.data;
      return {
        ...state
      };
    case 'SET_RANKINGS':
      state.overview.rankings = action.data;
      return {
        ...state
      };
    case 'SET_INCOME_INCREMENT':
      state.finance.incomeIncre = action.data;
      return {
        ...state
      };
    case 'SET_ASSETS_RATIO':
      state.finance.assetsRatio = action.data;
      return {
        ...state
      };
    case 'SET_SUMMARY':
      state.finance.summaryList = action.data;
      return {
        ...state
      };
    case 'SET_TAKING':
      state.finance.taking = action.data;
      return {
        ...state
      };
    case 'SET_JDJLR':
      state.finance.jdjlr = action.data;
      return {
        ...state
      };
    case 'SET_PROFIT':
      state.finance.profit = action.data;
      return {
        ...state
      };
    case 'SET_COST':
      state.finance.cost = action.data;
      return {
        ...state
      };
    case 'SET_FUZAI':
      state.finance.fuzai = action.data;
      return {
        ...state
      };
    case 'SET_LILV':
      state.finance.lilv = action.data;
      return {
        ...state
      };
    case 'SET_TOP5':
      state.finance.top5 = action.data;
      return {
        ...state
      };
    case 'SET_GYKH':
      const data = action.data;
      if (data) {
        const kh = data.kh;
        const gys = data.gys;
        const arr = [];
        const arr1 = [];
        state.finance.showkh = Object.values(kh).every((item) => item === 'undisclosed');
        state.finance.showGy = Object.values(gys).every((item) => item === 'undisclosed');
        for (const tem in kh) {
          if (kh[tem] === 'undisclosed') {
            for (let i = 1; i <= 5; i++) {
              arr.push({
                date: tem,
                comp_name: `客户${formMatekh(i)}`,
                ranking: i,
                datas: `{"客户名称": "客户${formMatekh(i)}", "客户收入": 0, "客户收入占比": 0}`,
                total: 0
              });
            }
            kh[tem] = arr.filter((item) => item.date === tem);
          }
        }
        for (const tem in gys) {
          if (gys[tem] === 'undisclosed') {
            for (let i = 1; i <= 5; i++) {
              arr1.push({
                date: tem,
                comp_name: `供应商${formMatekh(i)}`,
                ranking: i,
                datas: `{"供应商名称": "供应商${formMatekh(
                  i
                )}", "供应商收入": 0, "供应商收入占比": 0}`,
                total: 0
              });
            }
            gys[tem] = arr1.filter((item) => item.date === tem);
          }
        }
        state.finance.gykh = data;
      }
      return {
        ...state
      };
    case 'SET_FINAN_DATA':
      state.finance.finanData = action.data;
      return {
        ...state
      };
    case 'SET_CASH':
      state.finance.cash = action.data;
      return {
        ...state
      };
    case 'SET_FREE_CASH':
      state.finance.free_cash = action.data;
      return {
        ...state
      };
    case 'SET_YYQ':
      state.finance.yyq = action.data;
      return {
        ...state
      };
    case 'SET_INDUSTRY':
      state.industryData.industry = action.data;
      return {
        ...state
      };
    case 'SET_PETTM':
      state.industryData.pettm = action.data;
      return {
        ...state
      };
    case 'SET_INDUSTRY_INDEX':
      state.industryData.industryIndex = action.data;
      return {
        ...state
      };
    case 'SET_PRICE':
      state.industryData.price = action.data;
      return {
        ...state
      };
    case 'SET_GUDONG':
      state.gudongData.gudong = action.data;
      return {
        ...state
      };
    case 'SET_GDHS':
      state.gudongData.gdhs = action.data;
      return {
        ...state
      };
    case 'SET_JGNUM':
      state.gudongData.jgNum = action.data;
      return {
        ...state
      };
    case 'SET_JGINFO':
      state.gudongData.jgInfo = action.data;
      return {
        ...state
      };
    case 'SET_ZI_COMP':
      state.otherData.zi_comp = action.data;
      return {
        ...state
      };
    case 'SET_OTHER_YYQ':
      state.otherData.yyq = action.data;
      return {
        ...state
      };
    case 'SET_ZDHT':
      state.otherData.zdht = action.data;
      return {
        ...state
      };
    case 'SET_IMPORTANT':
      state.otherData.important = action.data;
      return {
        ...state
      };
    case 'SET_BOND':
      state.otherData.bond = action.data;
      return {
        ...state
      };
    case 'OVERVIEW':
      state.overview.type = action.data;
      return {
        ...state
      };
    case 'FINANCE':
      state.finance.type = action.data;
      return {
        ...state
      };
    case 'INDUSTRYDATA':
      state.industryData.type = action.data;
      return {
        ...state
      };
    case 'GUDONGDATA':
      state.gudongData.type = action.data;
      return {
        ...state
      };
    case 'OTHERDATA':
      state.otherData.type = action.data;
      return {
        ...state
      };
    case 'SET_NAME':
      state.name = action.data;
      return {
        ...state
      };
    case 'SET_COMPANYHE':
      state.companyHE = action.data;
      return {
        ...state
      };
    case 'SET_RECIVEINVENTORY':
      state.reciveInventory = action.data;
      return {
        ...state
      };
    case 'SET_RESEARCHSALES':
      state.researchsales = action.data;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default stock;
