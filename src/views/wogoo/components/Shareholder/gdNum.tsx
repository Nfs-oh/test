import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { formaterNum } from '@/utils';
import InitChart from '@/components/initEchart';
import { Content, FlexDiv } from '../../style';
import Title from '@/components/Title';
import styles from '@/styles';
import moment from 'moment';
const Gdnum = ({ gdhs }) => {
  const [opt, setopt] = useState({});
  const option = {
    color: ['#405aff'],
    grid: {
      top: '15%',
      left: '0',
      right: '0',
      bottom: '15%'
    },
    xAxis: [
      {
        type: 'category',
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
          color: styles.color34,
          fontSize: 10
        },
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        position: 'right',
        scale: true,
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      },
      {
        show: false,
        type: 'value',
        name: '',
        axisLabel: {
          fontSize: 10,
          formatter: '{value}'
        },
        nameTextStyle: {
          fontSize: 10
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '股东户数',
        type: 'bar',
        barWidth: 10,
        label: {
          show: true,
          fontSize: 11,
          position: 'top',
          formatter: ({ value }) => `${formaterNum(value)}户`
        },
        itemStyle: {
          barBorderRadius: [3, 3, 0, 0]
        },
        yAxisIndex: 1,
        data: [2.6, 5.9, 9.0, 26.4, 5.9]
      }
    ]
  };
  useEffect(() => {
    if (gdhs.length > 0) {
      initChart(gdhs);
    }
  }, [gdhs]);

  const formatterReport = (val) => {
    switch (val) {
      case 3:
        return '一季报';
      case 6:
        return '半年报';
      case 9:
        return '三季报';
      case 12:
        return '年报';
      default:
        return val;
    }
  };
  const initChart = (data) => {
    let date = [];
    const list = [];
    const dates = [];
    data.forEach((item) => {
      date.push(item.ReportDate);
    });
    date = date.length >= 5 ? date.slice(0, 5) : date;
    date.forEach((item) => {
      dates.unshift(`${moment(item).year()}\n${formatterReport(moment(item).month() + 1)}`);
      data.forEach((i, key) => {
        if (item === i.ReportDate) {
          list.unshift(i.HolderNum);
        }
      });
    });
    option.xAxis[0].data = dates;
    option.series[0].data = list;
    setopt(option);
  };
  return (
    <Content className={'classFily'}>
      <FlexDiv className={'bottom'}>
        <Title>股东户数变化</Title>
      </FlexDiv>
      <InitChart option={opt} height={'200px'} showEmpty={gdhs.length === 0}></InitChart>
    </Content>
  );
};
const mapStateToProps = (state) => ({
  gdhs: state.stock.gudongData.gdhs
});
export default connect(mapStateToProps)(Gdnum);
