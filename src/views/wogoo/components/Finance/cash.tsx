import React, { useState, useEffect } from "react"
import { Block, Content,  SubTitle, FlexDiv } from "../../style"
import { connect } from "react-redux"
import Title from "@/components/Title"
import Empty from "@/components/Empty"
import InitChart from "@/components/initEchart"
import { isEmpty, formaterNum } from "@/utils"
import styles from '@/styles'
let option = {
  title: {
    subtext: "单位:元",
    left: "right",
    top: "-9",
    subtextStyle: {
      fontSize: 10,
      color: '#9696a6'
    },
  },
  color: ["#ff6679", "#33d3bd"],
  legend: {
    left: 0,
    textStyle: {
      color: styles.ranktextColor1,
      fontSize: 10,
    },
    itemGap: 10,
    itemWidth: 8,
    itemHeight: 8,
    data: [
      { name: '经营现金流为正', icon: 'circle' },
      { name: '经营现金流为负', icon: 'circle' }
    ]
    // data: ["经营现金流为正", "经营现金流为负"]
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    show: false,
    type: "category",
    axisLine: {
      show: false
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
      fontSize: 10,
      interval: 0, // 横轴信息全部显示
      formatter: function (val) {
        let newVal = val.slice(0, 4) + '\n' + val.slice(4, val.length)
        return newVal
      }
    },
    data: []
  },
  yAxis: {
    show: false,
    type: "value",
    name: "亿元",
    nameTextStyle: {
      fontSize: 10
    },
    axisLine: {
      show: false
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
      fontSize: 10,
      formatter: function (value) {
        return parseFloat(value / 100000000).toFixed(1)
      }
    }
  },
  series: [
    {
      name: "汇总",
      type: "bar",
      stack: "总量",
      barWidth: '20',
      itemStyle: {
        normal: {
          barBorderColor: 'rgba(0, 0, 0, 0)',
          color: 'rgba(0, 0, 0, 0)'
        },
        emphasis: {
          barBorderColor: 'rgba(0, 0, 0, 0)',
          color: 'rgba(0, 0, 0, 0)'
        }
      },
      data: []
    },
    {
      name: "经营现金流为正",
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
    },
    {
      name: "经营现金流为负",
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
      name: "经营现金流为正",
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
    },
    {
      name: "经营现金流为负",
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
const Cash = ({ cash, companyInfo }) => {
  const [dataArr, setData] = useState([])
  const [opt, setOpt] = useState({})
  const [cashRank, setcashRank] = useState([])
  const initChart = (dataSource) => {
    let keys = []
    let upList = []
    let downList = []
    let bUpList = []
    let bDownList = []
    let dataAllList = []
    let date = []
    let arr = []
    for (let key in dataSource) {
      keys.push(key)
      date.push(key)
      arr.push(dataSource[key] ? formaterNum(dataSource[key]) : '-')
      dataAllList.push((dataSource[key]))
      if ((dataSource[key]) > 0) {
        upList.push((dataSource[key]))
        downList.push('-')
      } else {
        upList.push('-')
        downList.push((dataSource[key]))
      }
    }
    let data = [0]
    let valAll = 0
    for (let temp of dataAllList) {
      valAll += (temp)
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
    let arr1 = Object.values(dataSource).map(item => item > 0 ? item ? formaterNum(item) : '-' : '-')
    let arr2 = Object.values(dataSource).map(item => item < 0 ? item ? formaterNum(item) : '-' : '-')
    arr1 = arr1.length >= 5 ? arr1.slice(1, 5) : arr1
    arr2 = arr2.length >= 5 ? arr2.slice(1, 5) : arr2
    option.xAxis.data = date.length >= 5 ? date.slice(1, 5) : date
    option.series[0].data = data.length >= 5 ? data.slice(1, 5) : data
    option.series[1].data = upList.length >= 5 ? upList.slice(1, 5) : upList
    option.series[2].data = downList.length >= 5 ? downList.slice(1, 5) : downList
    bUpList.slice(upList.length - Math.abs(upList.length - date.length), 1)
    option.series[3].data = bUpList.length >= 5 ? bUpList.slice(1, 5) : bUpList
    bDownList.slice(downList.length - Math.abs(downList.length - date.length), 1)
    option.series[4].data = bDownList.length >= 5 ? bDownList.slice(1, 5) : bDownList
    let dataArr = [
      { data: date.length >= 5 ? date.slice(1, 5) : date, type: "1", showIcon: false },
      { data: arr1, type: "2", showIcon: true, iconColor: '#FF6679' },
      { data: arr2, type: "3", showIcon: true, iconColor: '#33D3BD' }
    ]
    setData(dataArr)
    setOpt(option)
  }
  useEffect(() => {
    if (!isEmpty(cash)) {
      initChart(cash.cashData)
      setcashRank(cash.cashRank)
    }
  }, [cash.cashData])
  return (
    <Content>
      <Block>
        <FlexDiv className={"bottom"}>
          <Title>现金流</Title>
        </FlexDiv>
        {!isEmpty(companyInfo) && (companyInfo.State === '2') ? <Empty /> :
          <div>{!isEmpty(cash) && cashRank && (
            <SubTitle>
              最新一期现金流{cashRank > 50 ? "超过" : "低于"}
              <span className={cashRank > 50 ? "more-than" : "less-than"}>
                {cashRank > 50 ? cashRank : 100 - cashRank}%
              </span>
              的上市公司
            </SubTitle>
          )}
            <InitChart
              option={opt}
              data={dataArr}
              height={"180px"}
              showEmpty={isEmpty(cash)}></InitChart>
          </div>}
      </Block>
    </Content>
  )
}
const mapStateToProps = (state) => ({
  cash: state.stock.finance.cash,
  companyInfo: state.stock.overview.companyInfo
})
export default connect(mapStateToProps)(Cash)
