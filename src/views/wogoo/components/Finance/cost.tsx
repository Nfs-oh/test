import React, { useState, useEffect } from 'react';
import { Block, Content, FlexDiv } from '../../style';
import { connect } from 'react-redux';
import InitChart from '@/components/initEchart';
import Title from '@/components/Title';
import { isEmpty, barStyle } from '@/utils';
import styles from '@/styles';
const option = {
  color: ['#00A7FF', '#405AFF', '#FCB621'],
  legend: {
    left: '0',
    padding: 0,
    icon: 'circle',
    textStyle: {
      color: styles.ranktextColor1,
      fontSize: 10
    },
    itemGap: 10,
    itemWidth: 7,
    itemHeight: 7,
    data: ['财务费用率', '管理费用率', '销售费用率']
  },
  grid: {
    left: 0,
    right: 0,
    bottom: '10',
    top: '30'
  },
  xAxis: {
    type: 'category',
    data: [],
    boundaryGap: ['40%', '0'],
    axisLine: {
      lineStyle: {
        color: styles.ranklineColor
      }
    },
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: [
    {
      show: false,
      type: 'value',
      name: '财务费用率',
      yAxisIndex: 0,
      axisLabel: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '财务费用率',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      },
      data: []
    },
    {
      name: '管理费用率',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      },
      data: []
    },
    {
      name: '销售费用率',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0]
      },
      data: []
    }
  ]
};
const Cost = ({ cost }) => {
  const [data, setData] = useState([]);
  const [opt, setopt] = useState({});
  const initChart = (data) => {
    let xs = [];
    let cw = [];
    let gl = [];
    for (const item of Object.values(data)) {
      xs.push(item.xs ? Number(item.xs * 100).toFixed(2) : '-');
      cw.push(item.cw ? Number(item.cw * 100).toFixed(2) : '-');
      gl.push(item.gl ? Number(item.gl * 100).toFixed(2) : '-');
    }
    let date = Object.keys(data);
    date = date.length >= 5 ? date.slice(date.length - 4, date.length) : date;
    cw = cw.length >= 5 ? cw.slice(cw.length - 4, cw.length) : cw;
    gl = gl.length >= 5 ? gl.slice(gl.length - 4, gl.length) : gl;
    xs = xs.length >= 5 ? xs.slice(xs.length - 4, xs.length) : xs;
    option.xAxis.data = date;
    option.series[0].data = barStyle(cw);
    option.series[1].data = barStyle(gl);
    option.series[2].data = barStyle(xs);
    const arr = [
      { data: date, type: '1', showIcon: false },
      {
        data: cw.map((item) => (item = item + '%')),
        type: '2',
        showIcon: true,
        iconColor: '#00A7FF'
      },
      {
        data: gl.map((item) => (item = item + '%')),
        type: '3',
        showIcon: true,
        iconColor: '#405AFF'
      },
      {
        data: xs.map((item) => (item = item + '%')),
        type: '4',
        showIcon: true,
        iconColor: '#FCB621'
      }
    ];
    setData(arr);
    setopt(option);
  };
  useEffect(() => {
    if (!isEmpty(cost)) {
      initChart(cost);
    }
  }, [cost]);
  return (
    <Content>
      <Block>
        <FlexDiv className={'bottom'}>
          <Title>费用率情况</Title>
        </FlexDiv>
        <InitChart option={opt} data={data} height={'180px'} showEmpty={isEmpty(cost)}></InitChart>
      </Block>
    </Content>
  );
};

const mapStateToProps = (state) => ({
  cost: state.stock.finance.cost
});
export default connect(mapStateToProps)(Cost);
