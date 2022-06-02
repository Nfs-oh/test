import React, { useState, useEffect } from 'react';
import { Flex } from 'antd-mobile';
import { Content, ChartWrap, SubTitle } from '../../style';
import NewTabs from '@/components/NewTabs';
import * as echarts from 'echarts';
import { connect } from 'react-redux';
import ico_rightmore from '@/img/overview_slices/ico_rightmore@2x.png';
import { isEmpty } from '@/utils';
import { bindActionCreators } from 'redux';
import Title from '@/components/Title';
import { getPettm } from '@/redux/stock/actions';
import Empty from '@/components/Empty';
import styles from '@/styles';
const Pettm = ({ pettm, code, getPettm, companyInfo }) => {
  const [peData, setpeData] = useState([]);
  const option = {
    color: ['#00A7FF', '#FF6650'],
    tooltip: {
      padding: 10,
      trigger: 'axis',
      textStyle: {
        color: styles.ellipsis_color,
        fontSize: 12
      },
      backgroundColor: styles.color33,
      triggerOn: 'click',
      enterable: true,
      position: function (point, params, dom, rect, size) {
        // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
        // 提示框位置
        let x = 0; // x坐标位置
        let y = 0; // y坐标位置

        // 当前鼠标位置
        const pointX = point[0];
        const pointY = point[1];

        // 外层div大小
        // let viewWidth = size.viewSize[0];
        // let viewHeight = size.viewSize[1];

        // 提示框大小
        const boxWidth = size.contentSize[0];
        const boxHeight = size.contentSize[1];

        // boxWidth > pointX 说明鼠标左边放不下提示框
        if (boxWidth > pointX) {
          x = 5; // 自己定个x坐标值，以防出屏
          y -= 15; // 防止点被覆盖住，可根据情况自行调节
        } else {
          // 左边放的下
          x = pointX - boxWidth - 15;
        }

        // boxHeight > pointY 说明鼠标上边放不下提示框
        if (boxHeight + 20 > pointY) {
          y = pointY + 15;
        } else if (boxHeight > pointY) {
          y = 5;
        } else {
          // 上边放得下
          y += pointY - boxHeight;
        }
        return [x, y];
      },
      extraCssText: 'z-index: 994',
      formatter: (params) => {
        let val = '';
        params.forEach((item) => {
          const dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${item.color}; "></span>`;
          val = `<div style="text-align: left;color: #427CFF; margin-bottom: 4px" onclick="clickTootip('${
            item.value
          }')">${item.value[2] ? item.value[2] : ''} <img src="${ico_rightmore}"/></div>
          <div style="display:flex; align-items: center;margin-bottom: 4px">${
            item.value[1] ? dotHtml + '评分：' + item.value[1] : ''
          } </div>
          <div style="display:flex; align-items: center;margin-bottom: 4px">${
            item.value[0] ? dotHtml + 'PE：' + item.value[0] : ''
          }</div>`;
        });
        return val;
      }
    },
    xAxis: {
      name: 'PE',
      scale: true,
      type: 'log',
      nameTextStyle: {
        color: styles.color34,
        fontSize: 10
        // padding: [25, 10, 0, 0]
      },

      axisLine: {
        onZero: false,
        show: false
      },
      splitArea: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      min: (value) => parseInt(value.min - 5, 0),
      axisLabel: {
        color: styles.color34,
        fontSize: 10,
        formatter: (value, index) => {
          const data = [];
          data.push(index);
          const count = data[data.length - 1];
          if (index === count) {
            return `{b|${value}}`;
          }
        },
        rich: {
          a: {
            fontSize: 10,
            padding: [0, 60, 0, 0]
          }
        }
      }
    },
    yAxis: {
      name: '评分',
      position: 'left',
      scale: true,
      nameTextStyle: {
        color: '#9696a6',
        fontSize: 10,
        padding: [0, 25, 0, 0]
      },
      splitLine: {
        lineStyle: {
          color: styles.ranklineColor
        }
      },
      axisLine: {
        onZero: false,
        show: false
      },
      axisTick: {
        show: false
      },
      splitArea: {
        show: false
      },
      axisLabel: {
        color: styles.color34,
        fontSize: 10
      },
      interval: 8,
      min: (value) => parseInt(value.min - 5, 0),
      max: (value) => parseInt(value.max + 5, 0)
    },
    grid: {
      left: '5%',
      right: '8%',
      bottom: '5%',
      containLabel: true
    },
    dataZoom: [
      {
        show: false,
        realtime: true,
        start: 0,
        end: 100,
        filterMode: 'empty',
        type: 'inside',
        xAxisIndex: [0],
        handleSize: '100%',
        rangeMode: ['value']
      }
    ],
    series: [
      {
        data: '',
        type: 'scatter',
        symbolSize: function (data) {
          return 14;
        }
      }
      // {
      //   type: 'scatter',
      //   data: '',
      //   symbolSize: function (data) {
      //     return 14
      //   },
      //   label: {
      //     show: true,
      //     formatter: function (param) {
      //       return param.data[2]
      //     },
      //     position: 'bottom',
      //     color: '#333',
      //     fontSize: 10,
      //     fontWeight: '600'
      //   },
      //   itemStyle: {
      //     color: '#FFB616'
      //   }
      // }
    ]
  };
  const tabs = [
    { title: '吾股', key: '1', industryType: 'wg' },
    { title: '申万', key: '2', industryType: 'sw' },
    { title: '证监会', key: '3', industryType: 'zj' }
  ];
  const clickTootip = (value) => {
    const stockcode = value.split(',')[3];
    //处理TOOtip点击事件
    window.location.href = 'storm://app/stock/detail?stockcode=' + stockcode;
  };
  const initChart = (data, code) => {
    let dataList = [];
    if (data && data.length > 0) {
      for (const item in data) {
        if (item) {
          dataList.push([]);
          for (const index in data[item].datas) {
            if (
              (data[item].datas[index].PETTM >= 0 && data[item].datas[index].PETTM < 150) ||
              data[item].datas[index].code === code
            ) {
              dataList[item].push([
                data[item].datas[index].PETTM,
                data[item].datas[index].Score,
                data[item].datas[index].name,
                data[item].datas[index].code
              ]);
            }
          }
        }
      }
    }
    dataList = dataList.filter((item) => item.length > 0);
    data.forEach((i, key) => {
      if (document.getElementById(`chart${key}`)) {
        const myChart = echarts.init(document.getElementById(`chart${key}`));
        option.series[0].data = dataList[key].map((item) => ({
          value: item,
          itemStyle: {
            color: item[3] === code ? '#ffb616' : '#00a7ff'
          },
          label: {
            show: true,
            position: 'bottom',
            formatter: function () {
              return item[2];
            },
            color: styles.color38,
            fontSize: 10,
            fontWeight: '600'
          }
        }));
        // option.series[1].data = dataItem
        myChart.setOption(option);
      }
    });
  };
  const onTabClick = (tab) => {
    // const {code, getPettm } = props
    getPettm({ code: code, industryType: tab.industryType });
  };
  useEffect(() => {
    window.clickTootip = clickTootip; // 将点击时间绑定到window 对象上
    if (!isEmpty(pettm)) {
      setpeData(pettm);
      setTimeout(() => {
        initChart(pettm, code);
      }, 250);
    }
  }, [pettm, code]);
  return (
    <Content>
      <Flex>
        <Title>可比公司PE评分</Title>
      </Flex>
      <SubTitle>行业内吾股评分前十名及公司本身</SubTitle>
      <div className={'tab-wrap'}>
        <NewTabs tabs={tabs} onTabClick={onTabClick} width="238px"></NewTabs>
      </div>
      {companyInfo.State !== '2' && peData.length > 0 ? (
        peData.map((item, index) => (
          <ChartWrap key={index} position={'center'}>
            <div className={'wrap'}>
              <span className={'title active'}>{item.industry}</span>
            </div>
            <div
              id={`chart${index}`}
              className={'chart'}
              key={index}
              style={{ width: ' 100%', height: '300px' }}
            ></div>
          </ChartWrap>
        ))
      ) : (
        <Empty />
      )}
    </Content>
  );
  // }
};

const mapStateToProps = (state) => ({
  pettm: state.stock.industryData.pettm,
  code: state.stock.code,
  companyInfo: state.stock.overview.companyInfo
});
const mapDispatchToProps = (dispatch) => ({
  getPettm: bindActionCreators(getPettm, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Pettm);
