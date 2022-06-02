import React, { useState, useEffect} from 'react'
import {Block,  Content ,  FlexDiv} from '../../style'
import { connect } from 'react-redux'
import Title from "@/components/Title";
import InitChart from '@/components/initEchart'
import { isEmpty,barStyle } from "@/utils";
import styles from '@/styles'
let option={
  color: ['#405aff',  '#fcb621', '#00a7ff','#fb9645'],
  legend: {
    left: '0',
    padding: 0,
    textStyle: {
      color: styles.ranktextColor1,
      fontSize: 10,
    },
    borderWidth:0,
    itemGap: 10,
    itemWidth: 8,
    itemHeight: 8,
    icon: "circle",
    data: [
      {name:'毛利率'},
      {name: '净利率'},
      // {name: '行业毛利率中位数'} , 
      {
        name: '行业毛利率中位数',
        itemStyle:{
          borderWidth: '0',
          color: '#00a7ff'
        },
      }, 
      {
        name: '行业净利率中位数',
        itemStyle:{
          borderWidth: '0',
          color: '#fb9645'
        },
      }]
  },
  grid:{
    left: 0,
    right: 0,
    bottom: '10',
    top: '10%',
  },
  xAxis: {
    type: 'category',
    data: [],
    boundaryGap: ['40%', '0'],
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
      show: false
    }
  },
  yAxis: {
     show: false,
     type: 'value',
      axisLine: {
        show: false
      },
      splitArea: {
        show: false
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
  series: [
    {
      name: '毛利率',
      type: 'bar',
      barWidth: 10,
      data: []
    },
    {
      name: '净利率',
      type: 'bar',
      barWidth: 10,
      data: []
    },
    //  '#00a7ff','#fb9645']
    {
      name: '行业毛利率中位数',
      type: 'line',
      symbol: "circle",
      lineStyle: { 
        type: 'dashed',
        color: '#00a7ff',
      },
      symbolSize: 6,
      barWidth: '60%',
      itemStyle: {
        borderWidth: 1.5,
        borderColor: '#00a7ff',
        color: '#FFFFFF',
      },
      data: []
    },
    {
      name: '行业净利率中位数',
      type: 'line',
      symbol: "circle",
      lineStyle: { 
        type: 'dashed',
        color: '#fb9645',
      },
      symbolSize: 6,
      barWidth: '60%',
      itemStyle: {
        borderWidth: 1.5,
        borderColor: '#fb9645',
        color: '#FFFFFF',
      },
      data: []
    }
  ]
}
const  Lilv =({lilv}) => {
const [data, setData] = useState([])
const [opt, setOpt] = useState()
const initChart=(data)=>{
  let gpmargin = []
  let gpmargin_ave = []
  let npmargin = []
  let npmargin_ave = []
  if(Object.values(data).length>0){
    for(let item of Object.values(data)){
      gpmargin.push((item.gpmargin?item.gpmargin : 0 ).toFixed(2))
      gpmargin_ave.push((Number(item.gpmargin_ave? item.gpmargin_ave: 0)).toFixed(2))
      npmargin.push((item.npmargin? item.npmargin: 0).toFixed(2))
      npmargin_ave.push((Number(item.npmargin_ave? item.npmargin_ave: 0)).toFixed(2))
    }
  }
  gpmargin = gpmargin.length>= 5 ? gpmargin.slice(1,5): gpmargin
  gpmargin_ave = gpmargin_ave.length>= 5 ? gpmargin_ave.slice(1,5): gpmargin_ave
  npmargin = npmargin.length>= 5 ? npmargin.slice(1,5): npmargin
  npmargin_ave = npmargin_ave.length>= 5 ? npmargin_ave.slice(1,5): npmargin_ave
  option.xAxis.data =Object.keys(data).length>= 5 ?  Object.keys(data).slice(1,5): Object.keys(data)
  option.series[0].data = barStyle(gpmargin)
  option.series[1].data = barStyle(npmargin)
  option.series[2].data = gpmargin_ave
  option.series[3].data = npmargin_ave
  let arr = [
    {data: Object.keys(data).length>=5 ? Object.keys(data).slice(1,5):  Object.keys(data), type: '1', showIcon: false},
    {data: gpmargin.map(item=> item = item + '%'), type: '2', showIcon: true,iconColor: '#405AFF'},
    {data: gpmargin_ave.map(item=> item = item + '%'), type: '3', showIcon: true,iconColor: '#00A7FF'},
    {data: npmargin.map(item=> item = item + '%'), type: '4', showIcon: true,iconColor: '#FCB621'},
    {data: npmargin_ave.map(item=> item = item + '%'), type: '4', showIcon: true,iconColor: '#FB9645'},
  ]
  setOpt(option)
  setData(arr)
}
useEffect(() => {
  if(!isEmpty(lilv)){
    initChart(lilv)
  }
  
}, [lilv])
  
    return (
      <Content>
        <Block>
        <FlexDiv className={'bottom'}>
						<Title>毛利率-净利率</Title>
					</FlexDiv>
          <InitChart option={opt} data={data}  height={'180px'} showEmpty={isEmpty(lilv)}></InitChart>
        </Block>
      </Content>
    )
  
}
const mapStateToProps = (state) => ({
  lilv: state.stock.finance.lilv
})
export default connect(mapStateToProps)(Lilv)