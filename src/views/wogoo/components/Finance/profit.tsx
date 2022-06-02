import React, { useState, useEffect } from "react";
import { Block, Content, SubTitle, FlexDiv } from "@/views/wogoo/style";
import { connect } from "react-redux";
import Title from '@/components/Title'
import { isEmpty, formaterNum, barStyle } from "@/utils";
import InitChart from "@/components/initEchart";
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
  color: ["#00a7ff", "#405aff", "#ffc800"],
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
    data: [
      { name: "净利润", },
      { name: "扣非后净利润"},
      { 
        name: "ROE", 
        itemStyle: {
          color: "#ffc800",
          borderWidth: '0',
        }
      },
    ],
  },
  grid: {
    left: "0",
    right: "0",
    bottom: "10",
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisPointer: {
        type: "shadow",
      },
      axisLine: {
        lineStyle: {
          color: styles.ranklineColor,
        },
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
        fontSize: 10,
        interval: 0, // 横轴信息全部显示
        formatter: function (val) {
          let newVal = val.slice(0, 4) + "\n" + val.slice(4, val.length);
          return newVal;
        },
      },
    },
  ],
  yAxis: [
    {
      show: false,
      type: "value",
      name: "",
      nameTextStyle: {
        fontSize: 10,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      minInterval: 1,
      axisLabel: {
        show: false,
        fontSize: 10,
        formatter: function (value) {
          return parseFloat(value / 100000000).toFixed(1);
        },
      },
    },
    {
      type: "value",
      name: "",
      yAxisIndex: 1,
      // min: 0,
      // max: 25,
      // interval: 5,
      // minInterval: 1,
      // splitNumber: 5,
      nameTextStyle: {
        color: "#999",
        fontSize: 10,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        // y轴刻度线
        show: false,
      },
      splitArea: {
        show: false,
      },
      splitLine: {
        // 网格线
        show: false,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        fontSize: 10,
        show: false,
        formatter: "{value} %",
      },
      // scale: true,
    },
  ],
  series: [
    {
      name: "净利润",
      type: "bar",
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0],
      },
      data: [],
    },
    {
      name: "扣非后净利润",
      type: "bar",
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0],
      },
      data: [],
    },
    {
      name: "ROE",
      type: "line",
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        type: 'dashed',
        color: "#ffc800",
      },
      itemStyle: {
        borderWidth: 1.5,
        borderColor: "#ffc800",
        color: '#FFFFFF',
      },
      yAxisIndex: 1,
      data: [],
    },
  ],
};
const Profit = ({ profit }) => {
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);

  const [opt, setOpt] = useState({});
  const initData = (data) => {
    setInfo(data.profitRank);
    const profitData = data.profitData;
    let jlrList = [];
    let deductedincomeList = [];
    let dupontroeList = [];
    let jlrArr = [];
    let deductedincomeArr = [];
    let dupontroeArr = [];
    for (let temp in profitData) {
      jlrList.push(profitData[temp].jlr);
      jlrArr.push(profitData[temp].jlr? formaterNum(profitData[temp].jlr): '-');
      deductedincomeArr.push(profitData[temp].deductedincome? formaterNum(profitData[temp].deductedincome): '-');
      deductedincomeList.push(profitData[temp].deductedincome);
      dupontroeList.push(profitData[temp].dupontroe);
      dupontroeArr.push(profitData[temp].dupontroe ? profitData[temp].dupontroe.toFixed(2) + "%" : '-' );
    }
    jlrArr = jlrArr.length >= 5 ? jlrArr.slice(1, 5) : jlrArr
    deductedincomeArr = deductedincomeArr.length >= 5 ? deductedincomeArr.slice(1, 5) : deductedincomeArr
    dupontroeArr = dupontroeArr.length >= 5 ? dupontroeArr.slice(1, 5) : dupontroeArr
    let arr = [
      { data: Object.keys(profitData).slice(1, 5), type: 1, showIcon: false },
      { data: jlrArr, type: 2, showIcon: true, iconColor: "#00A7FF" },
      {
        data: deductedincomeArr,
        type: 3,
        showIcon: true,
        iconColor: "#405AFF",
      },
      { data: dupontroeArr, type: 4, showIcon: true, iconColor: "#FCB621" },
    ];
    setData(arr);
    jlrList = jlrList.length >= 5 ? jlrList.slice(1, 5) : jlrList
    deductedincomeList = deductedincomeList.length >= 5 ? deductedincomeList.slice(1, 5) : deductedincomeList
    dupontroeList = dupontroeList.length >= 5 ? dupontroeList.slice(1, 5) : dupontroeList
    option.xAxis[0].data = Object.keys(profitData).slice(1, 5);
    option.series[0].data = barStyle(jlrList);
    option.series[1].data = barStyle(deductedincomeList);
    option.series[2].data = dupontroeList;
    setOpt(option);

  };
  useEffect(() => {
    if (!isEmpty(profit)) {
      initData(profit);
    }
  }, [profit]);
  return (
    <Content>
      <Block>
        <FlexDiv>
          <Title>盈利能力</Title>
        </FlexDiv>
        {info && (
          <SubTitle>
            <div className={"info"}>
              最新一期净利润{info.rank_jlr > 50 ? "超过" : "低于"}
              <span className={info.rank_jlr > 50 ? "more-than" : "less-than"}>
                {info.rank_jlr > 50 ? info.rank_jlr : 100 - info.rank_jlr}%
              </span>
              的上市公司
            </div>
            <div className={"info"}>
              最新一期扣非后净利润
              {info.rank_deductedincome > 50 ? "超过" : "低于"}
              <span className={info.rank_jlr > 50 ? "more-than" : "less-than"}>
                {info.rank_deductedincome > 50
                  ? info.rank_deductedincome
                  : 100 - info.rank_deductedincome}%
              </span>
              的上市公司
            </div>
            <div className={"info"}>
              最新一期ROE{info.rank_dupontroe > 50 ? "超过" : "低于"}
              <span className={info.rank_jlr > 50 ? "more-than" : "less-than"}>
                {info.rank_dupontroe > 50
                  ? info.rank_dupontroe
                  : 100 - info.rank_dupontroe}%
              </span>
              的上市公司
            </div>
          </SubTitle>
        )}
        <InitChart option={opt} height={'180px'} data={data} showEmpty={isEmpty(profit)}></InitChart>
      </Block>
    </Content>
  );
};
const mapStateToProps = (state) => ({
  profit: state.stock.finance.profit,
});
export default connect(mapStateToProps)(Profit);
