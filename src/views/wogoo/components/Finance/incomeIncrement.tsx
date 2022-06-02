import React, { memo, useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import Title from '@/components/Title'
import InitChart from "@/components/initEchart";
import {Block,  Content ,  FlexDiv} from '../../style'
import styles from '@/styles'

let tempUnit = '';

let option = {
  color: ["#405aff", "#FEC700"],
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
    data: ["营业收入", {
      name:"营收YOY",
      itemStyle:{
        borderWidth: '0',
        color: '#FEC700'
      },
    }],
  },
  grid: {
    left: '3%',
    right: '0%',
    bottom: '3%',
    top: '20%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: styles.ranklineColor
        }
      }
    }
  ],
  yAxis: [
    {
      splitNumber: 4,
      type: 'value',
      splitArea: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 10,
        formatter: function (value) {
          if (value === 0) {
            return 0;
          }
          return `${value}${tempUnit}`
        },
        color: '#c4c4c6',
      },
      axisLine: {
        show: false,
      }
    },
    {
      show: false,
      type: 'value',
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
      name: "营业收入",
      type: "bar",
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0],
      },
      data: [],
    },
    {
      name: "营收YOY",
      type: "line",
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        type: 'dashed' ,
        color: '#FEC700',
      },
      itemStyle: {
        borderWidth: 1.5,
        borderColor: '#FEC700',
        color: '#FFFFFF',
      },
      barWidth: '60%',
      data: [],
      yAxisIndex: 1,
    },
  ],
};

const IncomeIncrement = forwardRef((props, ref) => {
  const data = useSelector(state => get(state, 'stock.finance.incomeIncre', []));
  const [tableData, setTableData] = useState([]);
  const [opt, setOpt] = useState(option);
  const containerRef = useRef();

  useImperativeHandle(ref, () => containerRef.current);

  const getScaleAndUnit = (value) => {
    let scale = 1;
    let unit = '元';
    if (value > Math.pow(10, 4)) {
      scale = 4
    }
    if (value > Math.pow(10, 8)) {
      scale = 8
    }
    if (value > Math.pow(10, 13)) {
      scale = 13
    }
    switch(scale) {
      case 1: unit = '元'; break;
      case 4: unit = '万'; break;
      case 8: unit = '亿'; break;
      case 13: unit = '万亿'; break;
      default: break;
    }
    return {
      scale,
      unit,
    }
  }

  const getDataUnit = (data) => {
    const maxValue = data.reduce((pre, cur) => {
      if (Math.abs(cur.taking) > pre) {
        return Math.abs(cur.taking);
      }
      return pre;
    }, 0);
    return getScaleAndUnit(maxValue);
  }

  const getValueWithScale = (value) => {
    const { scale, unit } = getScaleAndUnit(value);
    return (value / Math.pow(10, scale)).toFixed(2) + unit;
  }
  
  useEffect(() => {
    if (data.length > 0) {
      const { length } = data;
      const sliceStart = length > 5 ? length - 5 : 0;
      const {scale, unit} = getDataUnit(data);
      tempUnit = unit;
      const taking = data.map(item => {
        let showData = item.taking;
        if (scale === 1) {
          return showData;
        }
        return Number((item.taking / Math.pow(10, scale)).toFixed(2));
      });
      
      option.series[0].data = taking.slice(sliceStart, length);
      option.series[1].data = data.map(item => item.takingIncrease).slice(sliceStart, length);
      const tableData = [];
      const date = data.map(item => item.date.split('-')[0]);
      tableData.push({
        data: date.slice(sliceStart, length),
        showIcon: false,
        type: '1',
      });
      tableData.push({
        data: data.map(item => getValueWithScale(item.taking)).slice(sliceStart, length),
        showIcon: true,
        type: '2',
        iconColor: '#405AFF'
      });
      tableData.push({
        data: data.map(item => `${item.takingIncrease}%`).slice(sliceStart, length),
        showIcon: true,
        type: '2',
        iconColor: '#FEC700'
      });
      setTableData(tableData);
      setOpt({...option});
    }
  }, [data]);

  return (
    <Content ref={containerRef}>
      <Block>
        <FlexDiv style={{paddingBottom: 12}} className={'bottom'}>
          <Title>营收及增速</Title>
        </FlexDiv>
        <InitChart option={opt} data={tableData}  height={'180px'} showEmpty={data.length === 0}></InitChart>
      </Block>
    </Content>
  );
})

export default memo(IncomeIncrement);