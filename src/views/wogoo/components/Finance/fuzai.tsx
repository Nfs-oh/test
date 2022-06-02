import React, { useState, useEffect, useRef } from "react"
import InitChart from "@/components/initEchart"
import { Block, Content, FlexDiv,  Cell} from "../../style"
import { connect } from "react-redux"
import Title from '@/components/Title'
import { isEmpty, formaterNum } from "@/utils"
import styles from "@/styles"
import * as echarts from "echarts";
import moment from "moment"

import Select from '@/components/Select'
import Table from "@/components/Tables"

const Fuzai = ({ fuzai }) => {
  const [date, setdate] = useState([])
  const [active, setactive] = useState("4")
  const [active1, setactive1] = useState("4")
  const [dataSource, setdataSource] = useState([])
  const [opt, setopt] = useState({})
  const [total, settotal] = useState(0)
  const [opt1, setopt1] = useState({})
  const myChart = useRef()
  let echart = null
  let totals = 0
  let option = {
    legend: {
      show: false,
      left: "0",
      padding: 0,
      icon: "circle",
      textStyle: {
        fontSize: 10,
      },
      itemGap: 10,
      itemWidth: 7,
      itemHeight: 7,
    },
    tooltip: {
      paddiong: 12,
      trigger: "item",
      position: function (point, params, dom, rect, size) {
        // 固定在顶部
        let echartsX = size.viewSize[0] - size.contentSize[0]
        return [echartsX / 2, point[1]]
      },
      textStyle:{
        align: 'left',
        color: styles.ellipsis_color,
        fontSize: 10,
      },
      formatter: function (params) {
        let dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${params.color}; "></span>`
        return `<div style="display:flex; align-items: center;margin-bottom: 4px">${dotHtml}${params.name}：${(formaterNum(params.data.value2) || 0)}元</div>`
      },
      extraCssText: "z-index: 994",
    },
    series: [
      {
        name: "总资产",
        type: "pie",
        center: ["50%", "50%"], // 偏移量
        radius: ['0', '30%'],
        selectedMode: "single",
        color: ["#29cc7a", "#ff4848"],
        label: {
          normal: {
            position: "inner"
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [],
      },
      {
        name: "总资产",
        type: "pie",
        // radius: ["35%", "45%"],
        radius: ['45%', '71%'],
        center: ["50%", "50%"], // 偏移量
        color: ["#29cc7a", "#2ee68a", "#ff6161", "#ff4848"],
        labelLine: {
          // 设置延长线的长度
          normal: {
            show: true,
            length: 1,
          },
        },
        label: {
          normal: {
            formatter: "{b|{b}  }\n{hr|}\n  {per|{d}%}  ",
            align: "center",
            position: "outside",
            rich: {
              a: {
                color: styles.ranktextColor1,
                lineHeight: 15,
                align: "center",
              },
              hr: {
                borderColor: "#aaa",
                width: "100%",
                borderWidth: 0.5,
                height: 0,
              },
              b: {
                color: styles.ellipsis_color,
                fontSize: 12,
                lineHeight: 20,
                align: "center",
              },
              per: {
                color: styles.ranktextColor1,
                padding: [2, 2],
                lineHeight: 20,
                borderRadius: 2,
              },
            },
          },
        },
        data: [
          { value: 0, name: "货币资金" },
          { value: 0, name: "应收" },
          { value: 0, name: "商誉" },
          { value: 0, name: "存货" },
          { value: 0, name: "其他" },
          { value: 0, name: "在建工程" },
          { value: 0, name: "固定资产" },
        ],
      },
    ],
  }
  let option1 = {
    color: [
      "#9900ff",
      "#6666ff",
      "#3399ff",
      "#29cc7a",
      "#ffaa00",
      "#ff8800",
      "#ff4848",
    ],
    tooltip: {
      show: false,
      padding: 10,
      trigger: "item",
      textStyle:{
        align: 'left',
        color: styles.ellipsis_color,
        fontSize: 10,
      },
      extraCssText: "z-index: 994",
      position: function (point, params, dom, rect, size) {
        // 固定在顶部
        let echartsX = size.viewSize[0] - size.contentSize[0]
        return [echartsX / 2, point[1] - 50]
      },
      formatter: function (params) {
        let dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${params.color}; "></span>`
        return `<div style="display:flex; align-items: center;margin-bottom: 4px">${dotHtml}${params.name}：${formaterNum(params.data.value) || 0}元</div>`
      }
    },
    legend:{
      show: false,
      data:[{name: '货币资金'},{name:'应收'},{name: '商誉'} ,{name: '存货'},{name: '其他'}, {name: '在建工程'}, {name: '固定资产'}]
    },
    series: [
      {
        name: "总资产",
        type: "pie",
        radius: ['45%', '71%'],
        center: ["50%", "50%"], // 偏移量
        labelLine: {
          // 设置延长线的长度
          normal: {
            show: false,
            length: 1,
          },
        },
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: (val) => [
              '{a|总资产}',
              `{b|${(totals / 100000000).toFixed(2)}亿}`
            ].join('\n'),
            rich: {
              a: {
                color: styles.income_color,
                fontSize: 12,
              },
              b: {
                color: styles.color2,
                fontSize: 14,
                fontWeight: 500,
                padding: [0, 0, 10, 0]
              }
            },
          }
        },
        data: [],
      },
    ],
  }

  const initChart = (data) => {
    let date = Object.keys(data)
    let dateArr = []
    for (let i in date) {
      dateArr.unshift(date[i])
    }
    dateArr = dateArr.sort((a, b) => moment(b) - moment(a))
    dateArr = dateArr.length >= 5 ? dateArr.slice(0, 5) : dateArr;
    setdate(dateArr)
    setactive(dateArr[0])
    setactive1(dateArr[0])
    getchartData(dateArr[0], data)
    getdownData(dateArr[0], data)
  }
  const getchartData = (date, data) => {
    let insideTop = [{ value: 335, name: "负债", value2: 0 },
    { value: 679, name: "净资产", value2: 0 }
    ]
    let outsideTop = [
      { value: 0, name: "流动负债", value2: 0 },
      { value: 0, name: "长期负债", value2: 0 },
      // {value: 679, name: "净资产"}
      { value: 0, name: "其他净资产", value2: 0 },
      { value: 0, name: "未分配利润", value2: 0 }
    ]
    for (let key in data[date]) {
      if (key === 'fzhj') {
        // 负债
        insideTop[0].value2 = Math.abs(parseInt(data[date].fzhj, 0))
        insideTop[0].value = Math.abs(parseInt(data[date].ldfz, 0)) + Math.abs(parseInt(data[date].fldfz, 0))
      }
      if (key === 'inventory') {
        // 净资产
        insideTop[1].value2 = Math.abs(parseInt(data[date].inventory, 0))
        let qitajzc = parseInt(data[date].qita_jzc, 0)
        let unprofit = parseInt(data[date].unprofit, 0)
        if (parseInt(data[date].qita_jzc, 0) < 0) {
          qitajzc = 0
        }
        if (parseInt(data[date].unprofit, 0) < 0) {
          unprofit = 0
        }
        insideTop[1].value = qitajzc + unprofit
      }
      if (key === 'ldfz') {
        // 流动负债
        outsideTop[0].value = Math.abs(parseInt(data[date].ldfz, 0))
        outsideTop[0].value2 = parseInt(data[date].ldfz, 0)
      }
      if (key === 'fldfz') {
        // 长期负债/非流动负债
        outsideTop[1].value = Math.abs(parseInt(data[date].fldfz, 0))
        outsideTop[1].value2 = parseInt(data[date].fldfz, 0)
      }
      if (key === 'qita_jzc') {
        // 其他净资产
        if (parseInt(data[date].qita_jzc, 0) < 0) {
          outsideTop[2].value = 0
        } else {
          outsideTop[2].value = parseInt(data[date].qita_jzc, 0)
        }
        outsideTop[2].value2 = parseInt(data[date].qita_jzc, 0)
      }
      if (key === 'unprofit') {
        // 其他/未分配利润
        if (parseInt(data[date].unprofit, 0) < 0) {
          outsideTop[3].value = 0
        } else {
          outsideTop[3].value = parseInt(data[date].unprofit, 0)
        }
        outsideTop[3].value2 = parseInt(data[date].unprofit, 0)
      }
      option.series[0].data = insideTop
      option.series[1].data = outsideTop
      setopt(option)
    }
  }
  const getdownData = (date, data) => {
    let insideBottom = [{ value: 335, name: "总资产", value2: 0 }]
    let outsideBottom = [
      { value: 0, name: "货币资金", value2: 0, color: '#9900ff' },
      { value: 0, name: "应收", value2: 0,color: '#6666ff' },
      { value: 0, name: "商誉", value2: 0,color: '#3399ff' },
      { value: 0, name: "存货", value2: 0,color: '#29cc7a' },
      { value: 0, name: "其他", value2: 0 , color: '#ffaa00'},
      { value: 0, name: "在建工程", value2: 0 , color: '#ff8800'},
      { value: 0, name: "固定资产", value2: 0 , color: '#ff4848'}
    ]
    let insideVal = 0
    for (let key in data[date]) {
      key === 'hbzj' && (outsideBottom[0].value = Math.abs(parseInt(data[date].hbzj, 0))) // 货币资金
      key === 'receivables' && (outsideBottom[1].value = Math.abs(parseInt(data[date].receivables, 0))) // 应收
      key === 'goodwill' && (outsideBottom[2].value = Math.abs(parseInt(data[date].goodwill, 0))) // 商誉
      key === 'tse' && (outsideBottom[3].value = Math.abs(parseInt(data[date].tse, 0))) // 存货
      key === 'qita' && (outsideBottom[4].value = Math.abs(parseInt(data[date].qita, 0))) // 其他
      key === 'building' && (outsideBottom[5].value = Math.abs(parseInt(data[date].building, 0))) // 在建工程
      key === 'gdzc' && (outsideBottom[6].value = Math.abs(parseInt(data[date].gdzc, 0))) // 固定资产
      insideVal = parseInt(data[date].hbzj, 0) + parseInt(data[date].receivables, 0) + parseInt(data[date].goodwill, 0) + parseInt(data[date].tse, 0) + parseInt(data[date].building, 0) + parseInt(data[date].gdzc, 0) + Math.abs(parseInt(data[date].qita, 0))
      insideBottom[0].value = insideVal
      // option1.series[0].data = insideBottom
      option1.series[0].data = outsideBottom
    }
    setdataSource(outsideBottom)
    settotal(insideVal)
    totals = insideVal
    setopt1(option1)
  }
  const onClickTab = (tab) => {
    getchartData(tab, fuzai)
  }
  const onClickTab1 = (tab) => {
    getdownData(tab, fuzai)
    echart = echarts.init(myChart.current.myChart)
    const legendData = echart.getOption().legend[0].data
    let arr = []
    legendData.forEach(item=> arr.push(item.name))
      echart.dispatchAction({
        type: 'downplay',
        name: arr
      })
  }
  const onRowClicked = ({data}) =>{
    echart = echarts.init(myChart.current.myChart)
    const legendData = echart.getOption().legend[0].data
    let arr = []
    legendData.forEach(item=> arr.push(item.name))
    if(arr.length> 1){
      echart.dispatchAction({
        type: 'downplay',
        name: arr
      })
      echart.dispatchAction({
        type: 'highlight',
        name: data.name,
      })
    }
  }
  useEffect(() => {
    if (!isEmpty(fuzai)) {
      initChart(fuzai)
    }
  }, [fuzai])
  const columns = [
    {
      headerName: '', field: 'color', width: 20,
      cellRendererFramework: ({ value }) => <Cell color={value} className={'center'}><span className={'color-icon'}></span></Cell>
    },
    {
      headerName: '名称', field: 'name', flex: 1,
      headerClass: 'fz12',
      cellRendererFramework: ({ value }) => <Cell className={'fz12'}><span className={'title ellipsis'}>{value}</span></Cell>
    },
    {
      headerName: '资产明细(元)', field: 'value', flex: 0.6,
      headerClass: 'center fz12',
      cellClass: 'center',
      cellRendererFramework: ({ value }) => <Cell className={'center fz12 '}><span>{!isNaN(value) ? value===0 ? 0.00:  formaterNum(value): '-'}</span> </Cell>
    },
    {
      headerName: '占比', field: 'percent', width: 60,
      headerClass: 'right fz12',
      cellRendererFramework: ({data}) =>  <Cell className={'right fz12'}><span>{(data.value / total * 100).toFixed(2)}%</span> </Cell>
    },
  ]
  return (
    <Content>
      <Block>
        <FlexDiv className={"bottom"}>
          <Title>资产及负债</Title>
          <Select data={date} initText={active} onChange={onClickTab}></Select>
        </FlexDiv>
        <div className={'border-bottom'}>
        <InitChart option={opt} showEmpty={isEmpty(fuzai)}  height={'220px'}></InitChart>
        </div>
        <FlexDiv right={'right'}>
          <Select data={date} initText={active1} onChange={onClickTab1}></Select>
        </FlexDiv>
        <InitChart option={opt1} ref ={myChart} showEmpty={isEmpty(fuzai)} height={'220px'}></InitChart>
      </Block>
      {dataSource.length> 0 &&<Table  rowColor={true} dataSource={dataSource}  onRowClicked={onRowClicked} headerBorder={false} columns={columns} height={'100%'} headerHeight={'30'} domLayout={"autoHeight"} rowHeight={'30'}></Table>}
    </Content>
  )
}
const mapStateToProps = (state) => ({
  fuzai: state.stock.finance.fuzai,
})
export default connect(mapStateToProps)(Fuzai)
