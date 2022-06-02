// 本地开发模拟数据 ，不影响其它
const options = {
  // "title": "存货占总资产比",
  color: ['#4074FF', '#FCB621', '#01A7FF', '#FB9645'],
  legend: {
    left: '0',
    padding: 0,
    textStyle: {
      color: '#333',
      fontSize: 10
    },
    itemGap: 10,
    itemWidth: 8,
    itemHeight: 8,
    icon: 'circle'
  },
  grid: {
    left: 0,
    top: '30',
    bottom: '10',
    right: '0'
  },
  xAxis: {
    type: 'category',
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#f8f8fa'
      }
    }
  },
  yAxis: [
    {
      show: false
    }
  ],
  dataset: {
    dimensions: [
      'key',
      '应收票据及应收账款(百万元)',
      '存货(百万元)',
      '资产负债率',
      '应收占总资产比'
    ],
    source: [
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ]
  },
  series: [
    {
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      }
    },
    {
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      }
    },
    {
      type: 'line',
      barWidth: '60%'
    },
    {
      type: 'line',
      barWidth: '60%'
    }
  ]
};

export const defaultTabaleData = [
  {
    showIcon: false,
    type: '1',
    data: [2002, 2003, 2004, 2005, 2009]
  },
  {
    data: [1432734013.84, 1588739194.82, 2017045785.5, 3002085736.05, 4771278811.84],
    showIcon: true,
    iconColor: '#405aff',
    textColor: ''
  },
  {
    data: [0.0012, 0.001, 0.0012, 0.0016, 0.0025],
    showIcon: true,
    iconColor: '#FEC700',
    textColor: ''
  },
  {
    data: [598087657618.33, 750302627438.8, 897019035609.52, 1002063008153.13, 1075617036637.22],
    showIcon: true,
    iconColor: '#405aff',
    textColor: '#405aff'
  },
  {
    data: [598087657618.33, 750302627438.8, 897019035609.52, 1002063008153.13, 1075617036637.22],
    showIcon: true,
    iconColor: '#FEC700',
    textColor: '#FEC700'
  }
];
export default options;
