// 各季度利润  TODO 待开发

import React, { memo, useMemo, useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from '@/styles'
import Title from '@/components/Title'
import InitChart, { ChartFun } from "@/components/initEchart";
import { Block,  Content ,  FlexDiv } from '../../style';

import { getOptions, getTableData } from '../const';
const option = {
    color: ['#FFAA00'],
    grid: {
      left: 0,
      top: '30',
      bottom: '10',
      right: '0',
    },
    legend: {
      left: 0,
      itemWidth: 7,
      itemHeight: 7,
      textStyle: {
        color: styles.ranktextColor1,
        fontSize: 10,
      },
      data: [
        { name: '预告上限/下限', icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAAXNSR0IArs4c6QAAAFlJREFUOE9j/F9l7cnwn2Emw38GWQZKACPDYwZGhnTG/5XWjyg2DOYQRobHNDCQ2l4mFGz/K6z/I6th7DjKiE8PXkmQxlEDGUbDECMFMY7mZUI5Ebc8tPgCAMElSlnQMXvqAAAAAElFTkSuQmCC' },
        { name: '净利润(元)', icon: 'circle' }
      ]
    },
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: true,
      nameGap: 20,
      axisLine: {
        lineStyle: {
          color: styles.ranklineColor,
        },
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
        show: false,
      }
    },
    yAxis: {
      show: false,
      type: 'value',

    },
    series: [
      {
        name: '预告上限/下限',
        // type: 'boxplot',
        type:'bar',
        boxWidth: ['0', '10%'],
        position: 'right',
        data: [],
        itemStyle: {
          borderWidth: 3
        },
        barWidth: 5
      },
      {
        type: 'bar',
        name: '净利润(元)',
        color: '#3399FF',
        data: [600, 52, 200, 334],
        barWidth: 10
      }
    ]
  }



//   initliRenChart = () => {
//     const { jdjlr } = this.props
//     let reportDate = []
//     let IncomeStatementCList = []
//     let boxData = []
//     let ProfitForecastT = []
//     let ProfitForecastL = []
//     let IncomeStatementCListlist = []
//     if (!isEmpty(jdjlr)) {
//       for (let temp of jdjlr) {
//         reportDate.unshift(moment(temp.ReportDate).year() + '-' + (moment(temp.ReportDate).month() > 10 ? moment(temp.ReportDate).month() + 1 : '0' + (moment(temp.ReportDate).month() + 1)))
//         IncomeStatementCList.unshift((temp.IncomeStatementC / 10000).toFixed(2))
//         boxData.unshift([temp.ProfitForecastL / 10000, temp.ProfitForecastL / 10000, temp.ProfitForecastL / 10000, temp.ProfitForecastL / 10000, temp.ProfitForecastT / 10000])
//         ProfitForecastL.unshift(isNaN(temp.ProfitForecastL) ? '-' : formaterNum(temp.ProfitForecastL))
//         ProfitForecastT.unshift(isNaN(temp.ProfitForecastT) ? '-' : formaterNum(temp.ProfitForecastT))
//         IncomeStatementCListlist.unshift(isNaN(temp.IncomeStatementC) ? '-' : formaterNum(temp.IncomeStatementC))
//       }
//     }
//     reportDate = reportDate.length >= 5 ? reportDate.slice(1, 5) : reportDate
//     IncomeStatementCList = IncomeStatementCList.length >= 5 ? IncomeStatementCList.slice(1, 5) : IncomeStatementCList
//     boxData = boxData.length >= 5 ? boxData.slice(1, 5) : boxData
//     ProfitForecastT = ProfitForecastT.length >= 5 ? ProfitForecastT.slice(1, 5) : ProfitForecastT
//     ProfitForecastL = ProfitForecastL.length >= 5  ? ProfitForecastL.slice(1, 5) : ProfitForecastL
//     IncomeStatementCListlist = IncomeStatementCListlist.length >= 5 ? IncomeStatementCListlist.slice(1, 5) : IncomeStatementCListlist
//     this.option.xAxis.data = reportDate
//     this.option.series[0].data = barStyle(boxData)
//     this.option.series[1].data = barStyle(IncomeStatementCList);

//     this.data = [
//       { data: reportDate, type: '1', showIcon: false, width: 100 / reportDate.length + '%' },
//       { data: ProfitForecastT, type: '2', showIcon: false, textColor: "#FF783B", text: '上限', width: 100 / reportDate.length + '%' },
//       { data: ProfitForecastL, type: '2', showIcon: false, textColor: "#FF783B", text: '下限', width: 100 / reportDate.length + '%' },
//       { data: IncomeStatementCListlist, type: '4', showIcon: true, iconColor: "#405AFF", width: 100 / reportDate.length + '%' },
//     ]
//   }


const EchartsBar = forwardRef((props,ref) => {

//   const { name, echartsData } = props;
//   const data = useSelector(state => get(state, name, []));
//   const { title } = echartsData;

//   const options = getOptions(echartsData, data);


//   const tableData = getTableData(options);

//   const showEmpty = !data || data.length == 0;
  
//   const containerRef = useRef();
//   useImperativeHandle(ref, () => containerRef.current);
    console.log("option========>")
    console.log(JSON.stringify(option))
  return (
  <Content >
    {/* <Block>
      <FlexDiv style={{paddingBottom: 12}} className={'bottom'}>
        <Title>{'title'}</Title>
      </FlexDiv> */}
      <ChartFun option={option}  height={'180px'} showEmpty={false}></ChartFun>
    {/* </Block> */}
  </Content>
  )
})
 
// export default memo(EchartsBar);
export default memo(EchartsBar);
