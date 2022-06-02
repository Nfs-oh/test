import styles from '@/styles';

//
const colors = ['#4074FF', '#FCB621', '#01A7FF', '#FB9645'];

const getUnit = (value) => {
  let scale = 1;
  let unit = '元';
  // let result = value;
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
    // case 6: unit = '百万'; break;
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

export const getScaleAndUnit = (value) => {
  let scale = 1;
  let unit = '元';

  if (value > Math.pow(10, 4)) {
    scale = 4;
  }

  if (value > Math.pow(10, 6)) {
    scale = 6;
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
    case 6:
      unit = '百万';
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
  return {
    scale,
    unit
  };
};

// const unit = "百万";

export const echarts1 = {
  title: '研发VS销售',
  colors: colors,
  dimensions: ['研发费用', '销售费用', '研发费用率', '销售费用率'],
  keys: ['RandD', 'OperatingExpense', 'RandDRatio', 'OperatingExpenseRatio'],
  seriesTypes: ['bar', 'bar', 'line', 'line'],
  tableData: []
};

// 存货占比
export const echarts0 = {
  title: '存货占总资产比',
  colors: colors,
  keys: ['BillAccReceivable', 'Inventories', 'BillAccReceivableRatio', 'InventoriesRatio'],
  dimensions: ['应收票据及应收账款', '存货', '应收占总资产比', '存货占总资产比'],
  seriesTypes: ['bar', 'bar', 'line', 'line'],
  dateSource: []
};

// 现金分红

export const echarts2 = {
  title: '现金分红',
  colors: colors,
  keys: ['BillAccReceivable', 'Inventories', 'BillAccReceivableRatio', 'InventoriesRatio'],
  dimensions: ['现金分红', '占自由现金流比重', '分红率'],
  seriesTypes: ['bar', 'line', 'line'],

  dateSource: []
};

function getSeries({ seriesTypes, colors }) {
  const series_bar = {
    type: 'bar',
    barGap: '35%',
    barWidth: 12,
    itemStyle: {
      barBorderRadius: [3, 3, 0, 0]
    }
  };
  function getSeries_line(corlor) {
    return {
      type: 'line',
      symbol: 'circle',
      symbolSize: 6,
      backgroundColor: 'red',
      lineStyle: {
        type: 'dashed',
        color: corlor
      },
      barWidth: '60%',
      itemStyle: {
        borderWidth: 1.5,
        borderColor: corlor,
        color: '#FFFFFF'
      },
      yAxisIndex: 1
    };
  }

  return seriesTypes.map((item, index) => {
    let result = '';
    if (item === 'bar') {
      result = series_bar;
    } else {
      const color = colors[index];
      result = getSeries_line(color);
    }
    return result;
  });
}

function getLegendData(obj) {
  const { dimensions, seriesTypes, colors } = obj;

  const result = seriesTypes.map((type, index) => {
    return type === 'bar'
      ? dimensions[index]
      : {
          name: dimensions[index],
          itemStyle: {
            // borderColor: 'red',
            borderWidth: '0',
            color: colors[index]
          }
        };
  });
  return result;
}
export function getOptions(obj, data) {
  const { dateSource } = getDateSource(data, obj);
  const dimensions = obj.dimensions;
  const legendData = getLegendData(obj);
  return {
    color: obj.colors,
    legend: {
      left: '0',
      padding: 0,
      textStyle: {
        color: styles.ranktextColor1,
        fontSize: 10
      },
      itemGap: 10,
      itemWidth: 8,
      itemHeight: 8,
      data: legendData,
      icon: 'circle'
    },
    grid: {
      left: 0,
      top: '30',
      bottom: '10',
      right: '0'
    },
    yAxis: [{ show: false }, { show: false }],
    dataset: {
      // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，

      // dimensions: ['date', 'key1', 'key2'],
      // dimensions:['key', ...dimensions],
      source: [['key', ...dimensions], ...dateSource]
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: styles.ranklineColor
        }
      }
    },
    series: getSeries(obj)
  };
}

function getTableHeader(data, key = 'EndDate') {
  const len = data.length;
  const result = [];
  let date = '';
  for (let i = 0; i < 5; i++) {
    if (i < len) {
      const head = data[i][key].split('-')[0];
      if (i === 0) {
        date = head;
      }
      result.push(head);
    } else {
      date = --date;
      result.unshift(date);
    }
  }
  return result;
}

function getDateSource(data = [], { keys, seriesTypes }) {
  const dateSource = [];
  const headers = getTableHeader(data);
  // 获取最大值
  const length = data.length;
  if (length === 0) {
    return {
      dateSource
    };
  }

  for (let i = 0; i < 5; i++) {
    const idx = i + length - 5;
    let item = [];
    if (idx >= 0) {
      item = keys.map((key) => data[idx][key]);
    } else {
      item = new Array(5).fill();
    }

    const row = [headers[i], ...item];
    dateSource.push(row);
  }

  return {
    dateSource
  };
}

export function getTableData({ color, keys, series, dataset }) {
  function filter(val, scale) {
    if (!val) {
      return '-';
    }

    if (scale) {
      return getUnit(val);
    } else {
      return (val * 100).toFixed(2) + '%';
    }
  }

  const { source = [] } = dataset;
  let data = [];
  const length = source.length;
  let len = 0;
  len = source[0] && source[0].length; // 总数据列数

  const newArr = [];
  for (let j = 0; j < len; j++) {
    const result = [];
    for (let i = 1; i < length; i++) {
      const val = source[i][j];
      if (series[j - 1] && series[j - 1].type === 'bar') {
        result.push(filter(val, 4));
      } else if (series[j - 1] && series[j - 1].type === 'line') {
        result.push(filter(val));
      } else {
        result.push(val);
      }
    }
    newArr.push(result);
  }

  data = [
    ...newArr.map((it, index) => {
      return {
        data: newArr[index],
        showIcon: index === 0 ? false : true,
        textColor: series[index - 1] && series[index - 1].type === 'line' ? color[index - 1] : '',
        iconColor: color[index - 1]
      };
    })
  ];
  return data;
}
