import React, { Component } from 'react';
import { Content, ChartWrap, FlexDiv } from '../../style';
import * as echarts from 'echarts';
import { connect } from 'react-redux';
import { isEmpty } from '@/utils';
import moment from 'moment';
import Title from '@/components/Title';
import Empty from '@/components/Empty';
import styles from '@/styles';
import Select from '@/components/Select/select';
class MainBuss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyPrice: [], // 行业情况价格数组
      induPrice: [], // 固定资产
      GYPPrice: [], // 主要工业品
      companyDate: [], //
      induDate: [], //
      GYPDate: [], //
      GYPraiseList: [],
      induPriceList: [],
      companyPriceList: [],
      GYPLJList: []
    };
    this.lines = null;
    this.dateList = [
      { title: '全部', key: 'all' },
      { title: '近一年', key: '12' },
      { title: '近半年', key: '6' },
      { title: '近三月', key: '3' }
    ];
    this.option = {
      color: ['#00a8ff'],
      title: {
        subtext: '涨跌幅%',
        left: 'right',
        top: '0',
        subtextStyle: {
          color: '#9696a6',
          fontSize: 10
        }
      },
      data: [{ name: '当年累计值', icon: 'circle' }],
      tooltip: {
        padding: 10,
        trigger: 'axis',
        textStyle: {
          color: styles.ellipsis_color,
          fontSize: 12
        },
        backgroundColor: styles.color33,
        extraCssText: 'z-index: 994',
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          const echartsX = size.viewSize[0] - size.contentSize[0];
          return [echartsX / 2, point[1]];
        },
        formatter: function (params) {
          let val =
            '<div style= "text-align:left;margin-bottom: 4px;">' +
            moment(params[0].name).format(
              params[0].name.length === 7 ? 'YYYY年MM月' : 'YYYY年MM月DD日'
            ) +
            '</div>';
          params.forEach((item) => {
            const dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${item.color}; "></span>`;
            val += `<div style= "display:flex; align-items: center;margin-bottom: 4px;text-align:left">${dotHtml}${
              item.seriesName
            }: ${item.value}${item.seriesIndex === 1 ? '%' : ''}</div>`;
          });
          return val;
        }
      },
      grid: {
        left: '5%',
        right: '8%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        scale: true,
        axisLine: {
          onZero: false,
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
          color: styles.color34,
          fontSize: 10,
          formatter: function (val) {
            return moment(val).format(val.length === 7 ? 'YYYY-MM' : 'YYYY-MM-DD');
          },
          margin: 10,
          interval: 100000,
          showMaxLabel: true,
          showMinLabel: true
        },
        max: (value) => value.max,
        min: (value) => value.min
      },
      yAxis: {
        type: 'value',
        name: '',
        nameTextStyle: {
          // color: "#333",
          fontSize: 10
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
        splitLine: {
          lineStyle: {
            color: styles.ranklineColor
          }
        },
        axisLabel: {
          color: styles.color34,
          fontSize: 10
        }
      },
      series: [
        {
          name: '当年累计值',
          data: [],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 167, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(0, 167, 255, 0)'
              }
            ])
          },
          type: 'line'
        }
      ]
    };
    this.option1 = {
      color: ['#3399FF', '#FF9494'],
      title: {
        left: 'right',
        top: '16',
        subtext: '',
        subtextStyle: {
          align: 'right',
          color: '#9696a6',
          fontSize: 10
        }
      },
      tooltip: {
        padding: 10,
        trigger: 'axis',
        textStyle: {
          color: styles.ellipsis_color,
          fontSize: 12
        },
        backgroundColor: styles.color33,
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          const echartsX = size.viewSize[0] - size.contentSize[0];
          return [echartsX / 2, point[1]];
        },
        formatter: function (params) {
          let val =
            '<div style= "text-align:left;margin-bottom: 4px;">' +
            moment(params[0].name).format('YYYY年MM月') +
            '</div>';
          params.forEach((item) => {
            const dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${item.color}; "></span>`;
            val += `<div style= "display:flex; align-items: center;margin-bottom: 4px;text-align:left">${dotHtml}${
              item.seriesName
            }：${item.value}${item.seriesIndex === 1 ? '%' : ''}</div>`;
          });
          return val;
        },
        extraCssText: 'z-index: 994'
      },
      legend: {
        left: 0,
        itemGap: 10,
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          color: styles.ranktextColor1,
          fontSize: 10
        },
        icon: 'circle',
        data: [{ name: '当年累计值' }, { name: '比去年同期增长(累计)' }]
      },
      grid: {
        left: '5%',
        right: '8%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisPointer: {
            type: 'shadow'
          },
          axisLine: {
            onZero: false,
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
          max: (value) => value.max,
          min: (value) => value.min,
          axisLabel: {
            color: styles.color34,
            fontSize: 10,
            formatter: function (val) {
              return moment(val).format('YYYY-MM');
            },
            margin: 10,
            interval: 100000,
            showMaxLabel: true,
            showMinLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '累计',
          nameTextStyle: {
            color: '#9696a6'
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
          splitLine: {
            lineStyle: {
              color: styles.ranklineColor
            }
          },
          axisLabel: {
            color: styles.color34,
            fontSize: 10
          }
        },
        {
          type: 'value',
          name: '',
          minInterval: 1,
          splitNumber: 5,
          scale: true,
          axisTick: {
            show: false
          },
          axisLine: {
            onZero: false,
            show: false
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value} %',
            color: styles.color34,
            fontSize: 10
          }
        }
      ],
      series: [
        {
          name: '当年累计值',
          type: 'bar',
          data: [],
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          }
        },
        {
          name: '比去年同期增长(累计)',
          type: 'line',
          symbol: 'circle',
          yAxisIndex: 1,
          data: []
        }
      ]
    };
  }
  componentDidMount() {
    const { Price } = this.props;
    if (!isEmpty(Price)) {
      this.initChart(Price);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { Price } = nextProps;
    if (!isEmpty(Price)) {
      this.initChart(Price);
    }
  }
  initChart = (data) => {
    const companyDateList = [];
    const companyPriceList = [];
    const induDateList = [];
    const induPriceList = [];
    const GYPDateList = [];
    const GYPLJList = [];
    const GYPraiseList = [];
    const companyPrice = data[1];
    const induPrice = data[2];
    const GYPPrice = data[3];
    const companyArr = Object.keys(data[1]);
    const induArr = Object.keys(data[2]);
    const GYPArr = Object.keys(data[3]);
    this.setState({ companyPrice: companyArr });
    this.setState({ induPrice: induArr });
    this.setState({ GYPPrice: GYPArr });

    // 公司产品
    for (const key in companyArr) {
      companyDateList[key] = [];
      companyPriceList[key] = [];
      for (const temp of companyPrice[companyArr[key]]) {
        companyDateList[key].push(
          temp.date.substr(4, temp.date.length).includes('-')
            ? temp.date
            : `${temp.date.substr(0, 4)}-${temp.date.substr(4, temp.date.length)}`
        );
        companyPriceList[key].push(parseFloat(temp.price).toFixed(2));
      }
    }
    for (const key in induArr) {
      induDateList[key] = [];
      induPriceList[key] = [];
      for (const temp of induPrice[induArr[key]]) {
        induDateList[key].push(
          `${temp.date.substr(0, 4)}-${temp.date.substr(4, temp.date.length)}`
        );
        induPriceList[key].push(parseFloat(temp.price).toFixed(2));
      }
    }
    // 主要工业品
    for (const key in GYPArr) {
      GYPDateList[key] = [];
      GYPLJList[key] = [];
      GYPraiseList[key] = [];
      const priceList = [...GYPPrice[GYPArr[key]]];
      priceList.reverse();
      // 当前最新月分与往年同比月份累计 高亮 显示
      for (let i = 0; i < priceList.length; i++) {
        if (i % 11 === 0) {
          GYPLJList[key].unshift({
            value: parseFloat(priceList[i].lj).toFixed(2),
            itemStyle: {
              color: '#FF8800'
            }
          });
        } else {
          GYPLJList[key].unshift(parseFloat(priceList[i].lj).toFixed(2));
        }
        GYPDateList[key].unshift(
          `${priceList[i].date.substr(0, 4)}-${priceList[i].date.substr(
            4,
            priceList[i].date.length
          )}`
        );
        GYPraiseList[key].unshift(parseFloat(priceList[i].raise_lj).toFixed(2));
      }
    }
    this.setState({ companyDate: companyDateList });
    this.setState({ induDate: induDateList });
    this.setState({ GYPDate: GYPDateList });
    this.setState({ companyPriceList: companyPriceList });
    this.setState({ induPriceList: induPriceList });
    this.setState({ GYPraiseList: GYPraiseList });
    this.setState({ GYPLJList: GYPLJList });
    setTimeout(() => {
      this.init(companyArr, companyDateList, companyPriceList, 'chartCompany', 'all');
      this.init(induArr, induDateList, induPriceList, 'chartIndu', 'all');
      this.init(GYPArr, GYPDateList, GYPraiseList, 'chartGYP', 'all', GYPLJList);
    }, 250);
  };
  init = (data, date, priceList, id, type, list = [], i = '') => {
    let dateArr = [];
    let priceArr = [];
    let listArr = [];
    data.forEach((item, index) => {
      const k = i !== '' ? i : index;
      if (document.getElementById(`${id}${index}`)) {
        const lines = echarts.init(document.getElementById(`${id}${k}`));
        if (type === 'all') {
          dateArr = date[k];
          priceArr = priceList[k];
          listArr = list.length > 0 && list[k];
        } else {
          dateArr = date[k].slice(date[k].length - type, date[k].length);
          priceArr = priceList[k].slice(priceList[k].length - type, priceList[k].length);
          listArr = list.length > 0 && list[k].slice(list[k].length - type, list[k].length);
        }
        if (list.length === 0) {
          this.option.xAxis.data = dateArr;
          this.option.series[0].data = priceArr;
          lines.setOption(this.option, true);
        } else {
          this.option1.xAxis[0].data = dateArr;
          this.option1.series[0].data = listArr;
          this.option1.title.subtext = `最后更新日期：${date[k][date[k].length - 1]}`;
          this.option1.series[1].data = priceArr;
          lines.setOption(this.option1, true);
        }
      }
    });
  };
  onClickTab = (tab, index, type) => {
    const {
      companyPrice,
      induPrice,
      GYPPrice,
      companyDate,
      induDate,
      GYPDate,
      companyPriceList,
      induPriceList,
      GYPraiseList,
      GYPLJList
    } = this.state;
    switch (type) {
      case 'chartGYP':
        if (tab.key === 'all') {
          this.init(GYPPrice, GYPDate, GYPraiseList, `chartGYP`, 'all', GYPLJList, index);
        } else if (tab.key === '12') {
          this.init(GYPPrice, GYPDate, GYPraiseList, `chartGYP`, 12, GYPLJList, index);
        } else if (tab.key === '6') {
          this.init(GYPPrice, GYPDate, GYPraiseList, `chartGYP`, 6, GYPLJList, index);
        } else if (tab.key === '3') {
          this.init(GYPPrice, GYPDate, GYPraiseList, `chartGYP`, 3, GYPLJList, index);
        }
        break;
      case 'chartIndu':
        if (tab.key === 'all') {
          this.init(induPrice, induDate, induPriceList, `chartIndu`, 'all', [], index);
        } else if (tab.key === '12') {
          this.init(induPrice, induDate, induPriceList, `chartIndu`, 12, [], index);
        } else if (tab.key === '6') {
          this.init(induPrice, induDate, induPriceList, `chartIndu`, 6, [], index);
        } else if (tab.key === '3') {
          this.init(induPrice, induDate, induPriceList, `chartIndu`, 3, [], index);
        }
        break;
      case 'chartCompany':
        if (tab.key === 'all') {
          this.init(companyPrice, companyDate, companyPriceList, `chartCompany`, 'all', [], index);
        } else if (tab.key === '12') {
          this.init(
            companyPrice,
            companyDate,
            companyPriceList,
            `chartCompany`,
            365 - 12 * 8,
            [],
            index
          );
        } else if (tab.key === '6') {
          this.init(
            companyPrice,
            companyDate,
            companyPriceList,
            `chartCompany`,
            180 - 6 * 8,
            [],
            index
          );
        } else if (tab.key === '3') {
          this.init(
            companyPrice,
            companyDate,
            companyPriceList,
            `chartCompany`,
            90 - 3 * 8,
            [],
            index
          );
        }
        break;
      default:
        break;
    }
    // })
  };
  render() {
    const { companyPrice, induPrice, GYPPrice } = this.state;
    return (
      <div>
        <Content>
          <FlexDiv className={'bottom'}>
            <Title>主要工业品产量</Title>
          </FlexDiv>
          {GYPPrice.length > 0 ? (
            GYPPrice.map((item, index) => (
              <ChartWrap>
                <div className={'wrap'}>
                  <span className={'title'}>{item}走势</span>
                  <Select
                    data={this.dateList}
                    onChange={(e) => {
                      this.onClickTab(e, index, `chartGYP`);
                    }}
                    initText={`全部`}
                    initKey={'all'}
                  ></Select>
                </div>
                <div id={`chartGYP${index}`} style={{ width: ' 100%', height: '300px' }}></div>
              </ChartWrap>
            ))
          ) : (
            <Empty />
          )}
        </Content>
        <Content>
          <FlexDiv className={'bottom'}>
            <Title>行业固定资产投资趋势</Title>
          </FlexDiv>
          {induPrice.length > 0 ? (
            induPrice.map((item, index) => (
              <ChartWrap>
                <div className={'wrap'}>
                  <span className={'title'}>{item}走势</span>
                  <Select
                    data={this.dateList}
                    onChange={(e) => {
                      this.onClickTab(e, index, `chartIndu`);
                    }}
                    initText={`全部`}
                    initKey={'all'}
                  ></Select>
                </div>
                <div id={`chartIndu${index}`} style={{ width: ' 100%', height: '300px' }}></div>
              </ChartWrap>
            ))
          ) : (
            <Empty />
          )}
        </Content>
        <Content>
          <FlexDiv className={'bottom'}>
            <Title>相关产品价格走势</Title>
          </FlexDiv>
          {companyPrice.length > 0 ? (
            companyPrice.map((item, index) => (
              <ChartWrap>
                <div className={'wrap'}>
                  <span className={'title'}>{item}走势</span>
                  <Select
                    data={this.dateList}
                    onChange={(e) => {
                      this.onClickTab(e, index, `chartCompany`);
                    }}
                    initText={`全部`}
                    initKey={'all'}
                  ></Select>
                </div>
                <div id={`chartCompany${index}`} style={{ width: ' 100%', height: '300px' }}></div>
              </ChartWrap>
            ))
          ) : (
            <Empty />
          )}
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Price: state.stock.industryData.price
});
export default connect(mapStateToProps)(MainBuss);
