import React, { Component, useEffect } from 'react'
import * as echarts from "echarts";
import { InitChartConter, InitChartWrap, Table, TableColumn } from './styles'
import { isEmpty } from '@/utils';
import styles from '@/styles'
import Empty from '../Empty/img';
import { useRef } from 'react';


export const ChartFun = (props) => {
  const data = props.data||[];
  const { height,option, showEmpty, levelWidth } = props
  const myChartRef = useRef();

  function initChart(data) {
    const current = myChartRef && myChartRef.current;

    if (current) {
      let { onClickChart, resize } = props
     
      current.style.width= window.screen.width -30 + 'px' 
      let myChart = echarts.init(current)
      if (data) {
        if(data.tooltip) { 
          data.tooltip.backgroundColor = styles.color33
        }
        myChart.setOption(data, true)
        if (onClickChart) {
          myChart.on('click', (params) => {
            onClickChart(params)
          })
        }
        if(resize) {
          data.legend.y = 246 // 图表高度260+30间隙
          myChart.setOption(data)
           let list = [] // 存储去重后的legend数据
           let listH = 0// legend区域的高度
           list.push(...new Set(data.legend.data))
           listH = Math.ceil(list.length / 2.5) * 19// 计算图例的高度
           myChart.getDom().style.height =  245 + listH  + "px"
           myChart.resize()
        }
      }
    }
  }
  useEffect(()=>{
    initChart(option);
  },[option])
  return (
      <div>
        {showEmpty ? <Empty /> : <InitChartConter>
          <InitChartWrap ref = { myChartRef } Height={height || '300px'}></InitChartWrap>
          {data && data.length > 0 && <Table border>
            {data.map((item, index) => <div>{item.data.length > 0 && <TableColumn  levelWidth={levelWidth} textColor={item.textColor} className={`${index === 0? 'blod': ''}`} iconColor={item.iconColor} key={index}>
              <span className={'column icon '} >
                {item.showIcon && <i className={item.hollowCircle? 'hollow-circle':'circle'} ></i>}
                {item.text && <span className={'text'}>{item.text}</span>}
              </span>
             {item.data.map((temp, index) =>  <span className={`${item.className?   item.className : ''} column `} key={index} style={{ width:  item.width }}><span>{temp}</span></span>)}
            </TableColumn>}</div>
            )}
          </Table>}
        </InitChartConter>}
      </div>
  )
}

// export default Init;

class InitChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.myChart = null
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps)) {
      this.initChart(nextProps.option)
      this.setState({ data: nextProps.data })
    }
  }

  componentDidMount() {
    if (!isEmpty(this.props.option)) {
      this.initChart(this.props.option)
      this.setState({ data: this.props.data })
    }
  }
  initChart(data) {
    if (this.myChart) {
      let { onClickChart, resize } = this.props
      this.myChart.style.width= window.screen.width -30 + 'px' 
      let myChart = echarts.init(this.myChart)
      if (data) {
        if(data.tooltip) { 
          data.tooltip.backgroundColor = styles.color33
        }
        myChart.setOption(data, true)
        if (onClickChart) {
          myChart.on('click', (params) => {
            onClickChart(params)
          })
        }
        if(resize) {
          data.legend.y = 246 // 图表高度260+30间隙
          myChart.setOption(data)
           let list = [] // 存储去重后的legend数据
           let listH = 0// legend区域的高度
           list.push(...new Set(data.legend.data))
           listH = Math.ceil(list.length / 2.5) * 19// 计算图例的高度
           myChart.getDom().style.height =  245 + listH  + "px"
           myChart.resize()
        }
      }
    }
  }
  render() {
    const { height, showEmpty, levelWidth } = this.props
    const { data } = this.state
    return (
      <div>
        {showEmpty ? <Empty /> : <InitChartConter>
          <InitChartWrap ref={myChart => this.myChart = myChart} Height={height || '300px'}></InitChartWrap>
          {data && data.length > 0 && <Table border>
            {data.map((item, index) => <div>{item.data.length > 0 && <TableColumn  levelWidth={levelWidth} textColor={item.textColor} className={`${index === 0? 'blod': ''}`} iconColor={item.iconColor} key={index}>
              <span className={'column icon '} >
                {item.showIcon && <i className={item.hollowCircle? 'hollow-circle':'circle'} ></i>}
                {item.text && <span className={'text'}>{item.text}</span>}
              </span>
             {item.data.map((temp, index) =>  <span className={`${item.className?   item.className : ''} column `} key={index} style={{ width:  item.width }}><span>{temp}</span></span>)}
            </TableColumn>}</div>
            )}
          </Table>}
        </InitChartConter>}
      </div>
    )
  }
}
export default InitChart


