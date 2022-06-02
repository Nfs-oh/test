/* eslint-disable default-case */
import bridge from '@/config/JSbridge';
import { Base64 } from 'js-base64/base64.js';
import bwmodel from '@/config/bwmodel';
/**
 *
 * @param {*} list 要处理的数据列表
 * @returns
 */
export const dpReportItem = (list) => {
  let simpleList = [];
  for (let temp of list) {
    let simple = {
      name: '',
      value: '',
      text: ''
    };
    simple.name = temp.name;
    simple.value = temp.value;
    // 利润
    if (temp.name === 'revenue_decrease') {
      switch (temp.value) {
        case -12:
          simple.text = 'Duang！营业收入下滑的有点吓人';
          break;
        case -6:
          simple.text = '当年营业收入大幅下滑';
          break;
      }
    } else if (temp.name === '3_decrease_15') {
      switch (temp.value) {
        case -10:
          simple.text = '营业收入连续下滑';
          break;
      }
    } else if (temp.name === '3_increase_15') {
      switch (temp.value) {
        case 5:
          simple.text = '营业收入持续增长';
          break;
      }
    } else if (temp.name === '3_revenue_lessthan3') {
      switch (temp.value) {
        case -6:
          simple.text = '三年累计营业收入少于90%的上市公司';
          break;
        case -5:
          simple.text = '三年累计营业收入少于80%的上市公司';
          break;
      }
    } else if (temp.name === 'revenue_lessthan3') {
      switch (temp.value) {
        case -7:
          simple.text = '当年营业收入少于90%的上市公司';
          break;
        case -6.5:
          simple.text = '当年营业收入少于80%的上市公司';
          break;
      }
    } else if (temp.name === 'client_concentrate') {
      switch (temp.value) {
        case -10:
          simple.text = '客户集中度非常高，大腿千万要抱紧。';
          break;
        case -8:
          simple.text = '客户集中度比较高，大腿千万要抱紧。';
          break;
      }
    } else if (temp.name === '3_kflr') {
      switch (temp.value) {
        case 20:
          simple.text = '累计扣非后净利润非常优秀，堪称企业中的战斗机。';
          break;
        case 18:
        case 16:
        case 14:
        case 12.5:
        case 11:
          simple.text = '累计扣非后净利润比较优秀';
          break;
        case -13:
          simple.text = '三年累计扣非后净利润不佳。';
          break;
        case -15:
          simple.text = '三年累计扣非后净利润较差，靠自己本事赚钱就是这么难。';
          break;
        case -18:
          simple.text = '三年累计扣非后净利润很差，核心盈利能力啥的是不存在的。';
          break;
      }
    } else if (temp.name === 'kfjlrxh') {
      switch (temp.value) {
        case -12:
          simple.text = '当年扣非后净利润大幅下滑';
          break;
      }
    } else if (temp.name === 'kfjlr_3_decrease') {
      switch (temp.value) {
        case -13:
          simple.text = '扣非后净利润持续下滑';
          break;
      }
    } else if (temp.name === 'kfjlr_3_increase') {
      switch (temp.value) {
        case 5:
          simple.text = '扣非后净利润持续上升';
          break;
      }
    } else if (temp.name === 'to_roe') {
      switch (temp.value) {
        case -2:
          simple.text = '当年roe水平不佳';
          break;
        case -4:
          simple.text = '当年roe为负';
          break;
        case 1.5:
          simple.text = '当年roe表现良好';
          break;
        case 2:
          simple.text = '当年roe表现非常好';
          break;
        case 2.5:
          simple.text = '当年roe表现非常好';
          break;
      }
    } else if (temp.name === 'roe_decrease3') {
      switch (temp.value) {
        case -5:
        case -8:
          simple.text = 'roe持续下滑';
          break;
        case -10:
          simple.text = 'roe持续大幅下滑';
          break;
      }
    } else if (temp.name === '4_jlr_increase') {
      switch (temp.value) {
        case 3:
          simple.text = '净利率连续上升';
          break;
      }
    } else if (temp.name === '4_jlr_decrease') {
      switch (temp.value) {
        case -3:
          simple.text = '净利率连续下滑';
          break;
      }
    } else if (temp.name === 'jlrxh') {
      switch (temp.value) {
        case -10:
          simple.text = '当年净利润大幅下滑';
          break;
        case -15:
          simple.text = '当年净利润大幅下滑';
          break;
      }
    } else if (temp.name === 'jlr_decrease') {
      switch (temp.value) {
        case -4:
          simple.text = '净利润连续下滑';
          break;
      }
    } else if (temp.name === 'mlr_decrease') {
      switch (temp.value) {
        case -7:
          simple.text = '理论上该比较稳定的毛利率都下滑这么大，兄弟你这是肿么了。';
          break;
        case -6:
        case -5:
          simple.text = '毛利率波动较大';
          break;
      }
    } else if (temp.name === 'finance') {
      switch (temp.value) {
        case -6:
          simple.text = '财务费用占比偏高';
          break;
      }
    } else if (temp.name === 'sell') {
      switch (temp.value) {
        case -6:
          simple.text = '销售费用占比较高';
          break;
      }
    } else if (temp.name === 'manage') {
      switch (temp.value) {
        case -6:
          simple.text = '管理费用占比较高';
          break;
      }
    } else if (temp.name === 'research') {
      switch (temp.value) {
        case 7:
          simple.text = '研发投入力度不小';
          break;
      }
    } else if (temp.name === 'jlr_research') {
      switch (temp.value) {
        case -5:
          simple.text = '如果没有资本化研发投入那今年都是亏钱的';
          break;
        case -4:
          simple.text = '能盈利主要靠把研发投入资本化';
          break;
      }
    } else if (temp.name === 'zh') {
      // 资产负债
      switch (temp.value) {
        case -15:
          simple.text = '大存大贷要关注';
          break;
      }
    } else if (temp.name === 'yszk_turnover') {
      switch (temp.value) {
        case -4:
          simple.text = '当年应收账款周转率大幅下滑';
          break;
      }
    } else if (temp.name === 'ys_taking_increase') {
      switch (temp.value) {
        case -4:
          simple.text = '收到的白条越来越多了';
          break;
      }
    } else if (temp.name === 'ysb') {
      switch (temp.value) {
        case -5:
          simple.text = '这么多应收项目，不怕有坏账吗';
          break;
        case -4:
          simple.text = '应收项目占总资产比重偏高';
          break;
      }
    } else if (temp.name === 'ch_turnover') {
      switch (temp.value) {
        case -5:
          simple.text = '存货周转率大幅下滑';
          break;
        case -4.5:
          simple.text = '存货周转率效率变低了不少';
          break;
        case 3:
          simple.text = '当年存货周转效率变高';
          break;
      }
    } else if (temp.name === 'ch_taking_increase') {
      switch (temp.value) {
        case -5:
          simple.text = '存货占比逐年升高';
          break;
      }
    } else if (temp.name === 'ch_taking_decrease') {
      switch (temp.value) {
        case 3:
          simple.text = '存货占比逐年下降';
          break;
      }
    } else if (temp.name === 'sy_jzc') {
      switch (temp.value) {
        case -20:
          simple.text = '商誉占总资产比例很高，资产质量差';
          break;
        case -18:
        case -16:
        case -14:
          simple.text = '商誉占总资产比例较高';
          break;
      }
    } else if (temp.name === 'syze') {
      switch (temp.value) {
        case -11:
          simple.text = '账上趴着一堆可能减值的商誉';
          break;
        case -9:
          simple.text = '商誉略多';
          break;
      }
    } else if (temp.name === 'fzl') {
      switch (temp.value) {
        case -6:
        case -8:
          simple.text = '带息负债较多';
          break;
      }
    } else if (temp.name === 'sdbl') {
      switch (temp.value) {
        case -10:
          simple.text = '现金资产远远不能覆盖短期负债';
          break;
        case -8:
          simple.text = '现金资产不能覆盖短期负债';
          break;
      }
    } else if (temp.name === 'dbbl') {
      switch (temp.value) {
        case -12:
          simple.text = '对外担保金额比总资产都多，真是倾囊相助';
          break;
        case -8:
          simple.text = '对外担保比例较高';
          break;
      }
    } else if (temp.name === 'xs_yingshou') {
      // 现金流量
      switch (temp.value) {
        case -8:
          simple.text = '卖出去的是货，收回来的是白条';
          break;
        case -5:
          simple.text = '收获里一半是钱一般是白条';
          break;
        case 3:
          simple.text = '一手交钱一手交货';
          break;
      }
    } else if (temp.name === 'to_managecash') {
      switch (temp.value) {
        case 4:
          simple.text = '当年经营现金流非常充足';
          break;
        case -6:
          simple.text = '当年经营现金流表现不佳';
          break;
        case -8:
          simple.text = '现金像自来水一样哗哗的往外流';
          break;
      }
    } else if (temp.name === '4_jy_cash') {
      switch (temp.value) {
        case -8:
          simple.text = '近几年现金有的出没得进，地主家也撑不住啊';
          break;
      }
    } else if (temp.name === 'free_cash') {
      switch (temp.value) {
        case -6:
        case -5.5:
          simple.text = '公司自由现金流情况不佳，赚的钱又都投回到生意里去了。';
          break;
      }
    } else if (temp.name === 'free_cash_decrease') {
      switch (temp.value) {
        case -2.5:
          simple.text = '自由现金流持续为负';
          break;
      }
    } else if (temp.name === 'opinion') {
      // 公司治理
      switch (temp.value) {
        case -20:
          simple.text = '近五年有非标审计意见，审计师表示这个贼船我不能上';
          break;
      }
    } else if (temp.name === 'summary') {
      if (simple.value < 0) {
        simple.text = '市值风云的文章值得关注';
      }
    } else if (temp.name === 'enquiry') {
      if (simple.value < 0) {
        simple.text = '问询函要好好回复';
      }
    } else if (temp.name === 'supervise') {
      if (simple.value < 0) {
        simple.text = '监管函要好好看';
      }
    } else if (temp.name === 'xzcf') {
      if (simple.value < 0) {
        simple.text = '收到行政处罚';
      }
    } else if (temp.name === 'cumuldivtm') {
      switch (temp.value) {
        case -6:
          simple.text = '极少分红，上市公司中的铁公鸡';
          break;
        case -5:
          simple.text = '分红次数较少';
          break;
      }
    } else if (temp.name === 'gxl_ave') {
      switch (temp.value) {
        case 5:
          simple.text = '近三年分红优秀且稳定';
          break;
        case 4:
          simple.text = '股息率表现不错';
          break;
      }
    } else if (temp.name === 'zy_score') {
      switch (temp.value) {
        case -20:
          simple.text = '大股东质押比例非常高，可能因为他很缺钱';
          break;
        case -18:
        case -16:
        case -11:
        case -10:
        case -9:
          simple.text = '大股东质押比例较高';
          break;
      }
    } else if (temp.name === 'zqlv') {
      switch (temp.value) {
        case -12:
        case -10:
          simple.text = '融资成本较高';
          break;
      }
    } else if (temp.name === 'ggcz') {
      switch (temp.value) {
        case -10:
          simple.text = '高管怎么都跑了';
          break;
      }
    } else if (temp.name === 'jcbl') {
      switch (temp.value) {
        case -5:
        case -6:
        case -8:
          simple.text = '减持幅度较大';
          break;
      }
    } else if (temp.name === 'ljjcbl') {
      switch (temp.value) {
        case -5:
        case -6:
        case -8:
          simple.text = '近两年累计减持较多';
          break;
      }
    }
    if (simple.text !== '') {
      simpleList.push(simple);
    }
  }
  return simpleList;
};

/**
 *调用客户端打开pdf 方式
 * @param {*} data
 */
export const callNativePdf = (data) => {
  bridge.callHandler(
    'nativeEvent',
    {
      event: 'fileDocument',
      params: {
        action: 'showPdf',
        data: data
      }
    },
    () => {
      // todo
    }
  );
};

export const isEmpty = (obj) => (JSON.stringify(obj) === '{}' ? true : false);
/**
 * 格式化数据
 * @param {*} num
 * @returns
 */
export const formaterNum = (num) => {
  if (num === 0) {
    return Number(num).toFixed(2);
  }
  if (num && !isNaN(num)) {
    if (Math.abs(num) > 100000000) {
      return (num / 100000000).toFixed(2) + '亿';
    } else if (Math.abs(num) >= 10000) {
      return (num / 10000).toFixed(2) + '万';
    } else {
      return num;
    }
  }
};
// 时间格式转义
export const changeDateType = (date) => {
  let monthStr = date.slice(5, 7);
  switch (monthStr) {
    case '12':
      return date.slice(0, 4) + '年报';
    case '09':
      return date.slice(0, 4) + '三季报';
    case '06':
      return date.slice(0, 4) + '半年报';
    case '03':
      return date.slice(0, 4) + '一季报';
  }
};

/**
 * 页面跳转使用客户端跳转方式
 * @param {*} url
 */
export const jumpTo = (url) => {
  bridge.callHandler(
    'nativeEvent',
    {
      event: 'pushPage',
      params: {
        url: Base64.encode(url)
      }
    },
    () => {
      // tood
    }
  );
};

export const popNativePage = (callback?: () => void) => {
  bridge.callHandler(
    'nativeEvent',
    {
      event: 'popPage',
      params: {
        index: '-1'
      }
    },
    () => {
      callback && callback();
    }
  );
};

/**
 * 动态设置柱子圆角
 * @param {*} data
 */

export const barStyle = (data: number[]) => {
  return data.map((item) => ({
    value: item,
    itemStyle: {
      barBorderRadius: item > 0 ? [3, 3, 0, 0] : [0, 0, 3, 3]
    }
  }));
};
export const formMatekh = (val: number) => {
  switch (val) {
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    default:
      return '';
  }
};

/**
 * 动画垂直滚动到页面指定位置
 * @param { Number } currentY 当前位置
 * @param { Number } targetY 目标位置
 */
export const scrollAnimation = (currentY, targetY) => {
  // 计算需要移动的距离
  let needScrollTop = targetY - currentY;
  let _currentY = currentY;
  let timer = null;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10);
    _currentY += dist;
    window.scrollTo(_currentY, currentY);
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY);
    } else {
      window.scrollTo(_currentY, targetY);
    }
  });
};
/**
 *
 * @param {*} array  数据
 * @param {*} subLength  截取长度
 * @returns
 */
export const cutArray = (array, subLength) => {
  let count = 1;
  let newArr = [];
  let resultArr = [];
  array.forEach(function (item) {
    newArr.push(item);
    if (count % subLength === 0) {
      resultArr.push(newArr);
      newArr = [];
    }
    if (count === array.length - 1) {
      resultArr.push(newArr);
    }
    count++;
  });
  return resultArr;
};

export const getDisplayNum = (value) => {
  if (!value) {
    return value;
  }
  let scale = 1;
  let unit = '元';
  if (value > Math.pow(10, 4)) {
    scale = 4;
  }
  if (value > Math.pow(10, 8)) {
    scale = 8;
  }
  if (value > Math.pow(10, 13)) {
    scale = 13;
  }
  switch (scale) {
    case 1:
      unit = '元';
      break;
    case 4:
      unit = '万';
      break;
    case 8:
      unit = '亿';
      break;
    case 13:
      unit = '万亿';
      break;
    default:
      break;
  }
  return (value / Math.pow(10, scale)).toFixed(2) + unit;
};

export const getStockLabelColor = (symbol) => {
  let result = 'gray';
  switch (symbol.toUpperCase()) {
    case 'SH':
    case 'SZ':
    case 'BJ':
      result = '#FF4058';
      break;
    case 'US':
      result = '#427CFF';
      break;
    case 'HK':
      result = '#FFB001';
      break;
    case 'BK':
      result = '#A842FF';
      break;
    default:
      result = 'gray';
      break;
  }
  return result;
};

export const getObjectFormSerach = (searchStr = ''): Record<string, string> => {
  if (!searchStr) {
    return {};
  }
  let queryStr = searchStr;
  if (searchStr.startsWith('?')) {
    queryStr = searchStr.slice(1, searchStr.length);
  }
  const queryArr = queryStr.split('&');
  const result = queryArr.reduce((pre, cur: string) => {
    const next: Record<string, string> = { ...pre };
    if (/^([^=]+)=([^=]+)$/.test(cur)) {
      const [key, value] = cur.split('=');
      next[key] = value;
    }
    return next;
  }, {});
  return result;
};

export const hideNaviBar = () => {
  bridge.callHandler(
    'nativeEvent',
    {
      event: 'nativeControl',
      params: {
        navigation: {
          visibility: false
        },
        container: {},
        bottomToolbar: {
          visibility: false
        }
      }
    },
    () => {
      // todo
    }
  );
};

export const isIphone = () => {
  return bwmodel.system === 'iPhone';
};
