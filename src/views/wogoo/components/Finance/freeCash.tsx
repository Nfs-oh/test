import React, { useState, useEffect } from "react"
import { Block, Content, FlexDiv } from "../../style"
import { connect } from "react-redux"
import Title from '@/components/Title'
import InitChart from "@/components/initEchart"
import Empty from "@/components/Empty"
import { isEmpty, formaterNum } from "@/utils"
import styles from '@/styles'
let option = {
  title: {
    subtext: "单位:元",
    left: "right",
    top: "-15",
    subtextStyle: {
      fontSize: 10,
      color: '#9696a6'
    },
  },
  color: ["#ff6679", "#33d3bd"],
  legend: {
    left: "0",
    padding: 0,
    icon: "circle",
    textStyle: {
      color: styles.ranktextColor1,
      fontSize: 10,
    },
    itemGap: 10,
    itemWidth: 8,
    itemHeight: 8,
    data: ["自由现金流为正", "自由现金流为负"],
  },
  grid: {
    left: 0,
    right: 0,
    bottom: "10",
    top: "15%",
  },
  xAxis: {
    show: false,
    type: "category",
    data: [],
    axisLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    show: false,
    type: "value",
    axisLabel: {
      fontSize: 10,
      formatter: function (value) {
        return parseFloat(value / 100000000).toFixed(1)
      },
    },
  },
  series: [
    {
      name: "汇总",
      type: "bar",
      stack: "总量",
      barWidth: '20',
      itemStyle: {
        normal: {
          barBorderColor: "rgba(0, 0, 0, 0)",
          color: "rgba(0, 0, 0, 0)"
        },
        emphasis: {
          barBorderColor: "rgba(0, 0, 0, 0)",
          color: "rgba(0, 0, 0, 0)"
        }
      },
      data: []
    },
    {
      name: "自由现金流为正",
      type: "bar",
      stack: "总量",
      barWidth: '20',
      itemStyle: {
        // barBorderRadius: [3, 3, 0, 0],
      },
      label: {
        normal: {
          show: false,
          position: "center",
          color: "white"
        }
      },
      data: []
    },
    {
      name: "自由现金流为负",
      type: "bar",
      stack: "总量",
      // barMaxWidth: 60, // 柱图宽度
      barWidth: '20',
      itemStyle: {
        // barBorderRadius: [3, 3, 0, 0],
      },
      label: {
        normal: {
          show: false,
          position: "center",
          color: "white"
        }
      },
      data: []
    },
    {
      name: "自由现金流为正",
      type: "bar",
      stack: "总量",
      // barMaxWidth: 60, // 柱图宽度
      barWidth: '20',
      label: {
        normal: {
          show: false,
          position: "center",
          color: "white"
        }
      },
      data: []
    },
    {
      name: "自由现金流为负",
      type: "bar",
      stack: "总量",
      barWidth: '20',
      label: {
        normal: {
          show: false,
          position: "center",
          color: "white"
        }
      },
      data: []
    }
  ]
}
const FreeCash = ({ freeCash, companyInfo }) => {
  const [data, setData] = useState([])
  const [opt, setOpt] = useState({})
  const initChart = (item) => {
    let upList = []
    let downList = []
    let bUpList = []
    let bDownList = []
    let dataAllList = []
    let date = []
    let arr = []
    for (let temp of item) {
      arr.push(temp.fcff ? formaterNum(Number(temp.fcff)) : "-")
      date.push(temp.date.slice(0, 4))
      dataAllList.push(parseInt(temp.fcff, 0))
      if (parseInt(temp.fcff, 0) > 0) {
        upList.push(parseInt(temp.fcff, 0))
        downList.push('-')
      } else {
        upList.push('-')
        downList.push(parseInt(temp.fcff, 0))
      }
    }
    let data = [0]
    let valAll = 0
    for (let temp of dataAllList) {
      valAll += parseInt(temp, 0)
      data.push(valAll)
    }
    downList.forEach(() => {
      bUpList.push("-")
      bDownList.push("-")
    })
    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0) {
        if (downList[i] !== '-') {
          if ((downList[i] + data[i]) >= 0) {
            data[i] = downList[i] + data[i]
            downList[i] = -downList[i] // 转为正值
          } else {
            // data[i] = -downList[i] + data[i]
            downList[i] = downList[i] + data[i]
            if (data[i] >= 0) {
              bDownList[i] = data[i]
              data[i] = 0
            }
          }
        }
      } else if (data[i] < 0) {
        if (upList[i] !== '-') {
          if ((upList[i] + data[i]) >= 0) {
            upList[i] = upList[i] + data[i]
            if (data[i] <= 0) {
              bUpList[i] = data[i]
              data[i] = 0
            }
          } else {
            data[i] = upList[i] + data[i]
            upList[i] = -upList[i]
          }
        }
      }
    }
    let arr1 = Object.values(item).map(item => item.fcff > 0 ? item.fcff ? formaterNum(item.fcff) : '-' : '-')
    let arr2 = Object.values(item).map(item => item.fcff < 0 ? item.fcff ? formaterNum(item.fcff) : '-' : '-')
    arr1 = arr1.length >= 5 ? arr1.slice(1, 5) : arr1
    arr2 = arr2.length >= 5 ? arr2.slice(1, 5) : arr2
    option.xAxis.data = date.length >= 5 ? date.slice(1, 5) : date
    option.series[0].data = data.length >= 5 ? data.slice(1, 5) : data
    option.series[1].data = upList.length >= 5 ? upList.slice(1, 5) : upList
    option.series[2].data = downList.length >= 5 ? downList.slice(1, 5) : downList
    bUpList.splice(upList.length - Math.abs(upList.length - date.length), 1)
    option.series[3].data = bUpList.length >= 5 ? bUpList.slice(1, 5) : bUpList
    bDownList.splice(downList.length - Math.abs(downList.length - date.length), 1)
    option.series[4].data = bDownList.length >= 5 ? bDownList.slice(1, 5) : bDownList
    let dataArr = [
      { data: date.length >= 5 ? date.slice(1, 5) : date, type: "1", showIcon: false },
      { data: arr1, type: "2", showIcon: true, iconColor: '#FF6679' },
      { data: arr2, type: "3", showIcon: true, iconColor: '#33D3BD' },
    ]
    setData(dataArr)
    setOpt(option)
  }
  useEffect(() => {
    if (!isEmpty(freeCash)) {
      initChart(freeCash)
    }
  }, [freeCash])
  return (
    <Content>
      <Block>
        <FlexDiv className={"bottom"}>
          <Title>自由现金流</Title>
        </FlexDiv>
        {!isEmpty(companyInfo) && (companyInfo.State === '2') ? <Empty /> : <InitChart option={opt} data={data} height={"180px"} showEmpty={freeCash.length === 0}></InitChart>}
      </Block>
    </Content>
  )
}
const mapStateToProps = (state) => ({
  freeCash: state.stock.finance.free_cash,
  companyInfo: state.stock.overview.companyInfo
})
export default connect(mapStateToProps)(FreeCash)
