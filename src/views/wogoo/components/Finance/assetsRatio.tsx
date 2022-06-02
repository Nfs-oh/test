import React, { memo, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import Title from '@/components/Title'
import InitChart from "@/components/initEchart";
import {Block,  Content ,  FlexDiv} from '../../style'
import styles from '@/styles'

let option = {
  color: ["#ffc800", "#405aff"],
  legend: {
    left: '0',
    padding: 0,
    textStyle: {
      color: styles.ranktextColor1,
      fontSize: 10,
    },
    itemGap: 10,
    itemWidth: 8,
    itemHeight: 8,
    icon: "circle",
    data: ["期末资产负债率","期末有息负债率"],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '20%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: styles.ranklineColor
        }
      },
      axisLabel: {
        color: '#c4c4c6'
      }
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitNumber: 4,
      axisLabel: {
        show: true,
        fontSize: 10,
        formatter: function (value) {
          return `${value}%`
        },
        color: '#c4c4c6',
      },
      axisLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '期末资产负债率',
      type: "line",
      barWidth: '60%',
      data: [],
      label: {
        formatter: function(item) {
          return `${Number(item.data).toFixed(1)}%`
        },
        show: true,
      },
    },
    {
      name: '期末有息负债率',
      type: "line",
      barWidth: '60%',
      data: [],
      label: {
        formatter: function(item) {
          return `${Number(item.data).toFixed(1)}%`
        },
        show: true,
      },
    }
  ]
};

const IncomeIncrement = forwardRef((props, ref) => {
  const data = useSelector(state => get(state, 'stock.finance.assetsRatio', []));
  const containerRef = useRef();
  const [opt, setOpt] = useState(option);
  useImperativeHandle(ref, () => containerRef.current)
  useEffect(() => {
    const curData = data.reverse();
    const { length } = data;
    const sliceStart = length > 5 ? length - 5 : 0;

    if (length > 0) {
      option.xAxis[0].data = curData.map(item => item.date.split('-')[0]).slice(sliceStart, length);
      option.series[0].data = curData.map(item => item.zcfzl).slice(sliceStart, length);
      option.series[1].data = curData.map(item => item.yxfzl).slice(sliceStart, length);
      setOpt({...option});
    }
  }, [data]);
  
  return (
    <Content ref={containerRef}>
      <Block>
        <FlexDiv style={{paddingBottom: 12}} className={'bottom'}>
          <Title>资产负债率</Title>
        </FlexDiv>
        <InitChart option={opt} data={[]} height={'180px'} showEmpty={data.length === 0}></InitChart>
      </Block>
    </Content>
  );
});

export default memo(IncomeIncrement);