import React, { Component } from 'react';
import { connect } from 'react-redux';
import InitChart from '@/components/initEchart';
import { isEmpty, jumpTo } from '@/utils';
import { Block, Container, TextWrap, FlexDiv } from '../../style';
import NewTabs from '@/components/NewTabs';
import Title from '@/components/Title';
import Empty from '@/components/Empty';
import Pettm from './pettm';
import MainBuss from './mainBuss';
import { getIndustryIndex } from '@/redux/stock/actions';
import Select from '@/components/Select/select';
import { bindActionCreators } from 'redux';
import styles from '@/styles';
import Loading from '@/components/loading';
import { Flex } from 'antd-mobile';
class Industry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industry: null,
      industryType: 'wg',
      timeInterval: '12',
      initText: '近一年',
      loading: true,
      option: {}
    };
    this.dateList = [
      { title: '近一年', key: '12' },
      { title: '近半年', key: '6' },
      { title: '近三月', key: '3' },
      { title: '近一月', key: '1' }
    ];
    this.tabs = [
      { title: '吾股', key: '1', industryType: 'wg' },
      { title: '申万', key: '2', industryType: 'sw' },
      { title: '证监会', key: '3', industryType: 'zj' }
    ];
    this.option = {
      tooltip: {
        padding: 10,
        trigger: 'axis',
        extraCssText: 'z-index: 994',
        textStyle: {
          align: 'left',
          color: styles.ellipsis_color,
          fontSize: 12
        },
        className: 'echarts-tooltip',
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          const echartsX = size.viewSize[0] - size.contentSize[0];
          // return ['10%', point[1] - 20]
          return [echartsX / 2, '20%'];
        },
        formatter: (params) => {
          let val = `<div style="margin-bottom: 4px;">${params[0].axisValue}</div>`;
          params.forEach((item) => {
            const dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${item.color}; "></span>`;
            val += `<div style="display:flex; align-items: center;margin-bottom: 4px">${dotHtml} <span >${
              item.seriesName
            }</span><span>：${item.value.toFixed(2)}%</span></div>`;
          });
          return val;
        }
      },
      position: (p, params, dom, rect, size) => {
        //  return formaterPos(p, size)
        let posY = 0;
        let posX = 0;
        const x = p[0];
        const y = p[1];
        const boxWidth = size.contentSize[0];
        const boxHeight = size.contentSize[1];
        posX = x < boxWidth ? 5 : x - boxWidth;
        posY = y < boxHeight ? 5 : y - boxHeight;
        return [posX, posY];
      },
      color: ['#ff783b', '#ffb616', '#0083fc', '#ff6650', '#02befe', '#00a7ff'],
      grid: {
        left: '1%',
        bottom: '5%',
        right: '5%',
        containLabel: true
      },
      legend: {
        left: 0,
        itemGap: 10,
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        textStyle: {
          color: styles.ranktextColor1,
          fontSize: 10
        },
        data: []
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: styles.ranklineColor
          }
        },
        axisLabel: {
          color: styles.color34,
          formatter: (value, index) => {
            const data = [];
            data.push(index);
            const count = data[data.length - 1];
            if (index === 0) {
              return `{a|${value}}`;
            } else if (index === count) {
              return `{b|${value}}`;
            }
          },
          rich: {
            a: {
              fontSize: 10,
              padding: [0, 0, 0, 40]
            },
            b: {
              fontSize: 10,
              padding: [0, 40, 0, 0]
            }
          },
          interval: 100000,
          showMaxLabel: true,
          showMinLabel: true,
          fontSize: 10
        },
        splitNumber: 1,
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        // min:(value)=> value.min,
        // max: (value)=> value.max,
        type: 'category',
        boundaryGap: false,
        scale: true,
        data: []
      },
      yAxis: {
        type: 'value',
        scale: true,
        nameTextStyle: {
          // color: "#999",
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
          fontSize: 10,
          formatter: '{value} % '
        }
      },
      series: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const { industry, industryIndex } = nextProps;
    if (!isEmpty(industry)) {
      this.setState({ loading: false });
      this.initData(industry);
    } else {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    if (!isEmpty(industryIndex)) {
      this.initChart(industryIndex);
    }
  }
  componentDidMount() {
    const { industry, industryIndex } = this.props;
    if (!isEmpty(industry)) {
      this.setState({ loading: false });
      this.initData(industry);
    }
    if (isEmpty(industry)) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    if (!isEmpty(industryIndex)) {
      this.initChart(industryIndex);
    }
  }
  initData = (data) => {
    const arr = [];
    for (const key in data) {
      if (key === 'industry_wg') {
        arr.push({ title: '按照吾股行业分类，属于', data: data[key], key: key });
      } else if (key === 'industry_sw') {
        arr.push({ title: '按照申万行业分类，属于', data: data[key], key: key });
      } else if (key === 'industry_zj') {
        arr.push({ title: '按照证监会行业分类，属于', data: data[key], key: key });
      }
    }
    this.setState({ industry: arr });
  };
  initChart = (data) => {
    let keys = [];
    let dateList = [];
    const lineArr = data;
    keys = Object.keys(data);
    const arr = [];
    const seriesTempArr = [];
    this.option.series = [];
    for (const temp of keys) {
      dateList = [];
      const seriesTemp = {
        name: '',
        symbol: 'circle',
        type: 'line',
        data: []
      };
      if (temp === '沪深300') {
        seriesTemp.name = '沪深300趋势';
        arr.unshift('沪深300趋势');
      } else {
        seriesTemp.name = temp;
        arr.push(temp);
      }
      for (const item of lineArr[temp]) {
        seriesTemp.data.push((item.IndustryRatio - 1) * 100);
        dateList.push(item.Date);
      }
      seriesTempArr.unshift(seriesTemp);
    }
    this.option.series = seriesTempArr;
    this.option.legend.data = arr;
    this.option.xAxis.data = dateList;
    this.setState({ option: this.option });
  };
  onTabClick = (tab) => {
    const { getIndustryIndex, code, user } = this.props;
    this.setState({ industryType: tab.industryType });
    getIndustryIndex({
      code,
      industryType: tab.industryType,
      timeInterval: this.state.timeInterval,
      user_id: user.userId
    });
  };
  onClickTab = (tab) => {
    const { getIndustryIndex, code, user } = this.props;
    this.setState({ timeInterval: tab.key });
    getIndustryIndex({
      code,
      industryType: tab.industryType,
      timeInterval: tab.key,
      user_id: user.userId
    });
  };
  onClickTO = (type, value) => {
    if (type) {
      jumpTo(process.env.REACT_APP_WOGOO_URL + 'business?dataKey=' + encodeURIComponent(value));
    }
  };
  render() {
    const { industry, loading, option } = this.state;
    const { industryIndex } = this.props;
    return (
      <Container>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div>
            <Block>
              <Flex>
                <Title>行业分类</Title>
              </Flex>
              <TextWrap>
                {industry ? (
                  industry.map((item) => (
                    <p key={item.key}>
                      {item.title}
                      {item.data.map((tem, index) => (
                        <span
                          key={index}
                          className={item.key === 'industry_wg' ? 'text-link' : ''}
                          onClick={() => this.onClickTO(item.key === 'industry_wg', tem)}
                        >
                          {tem}
                          {index !== item.data.length - 1 ? '、' : ''}
                        </span>
                      ))}
                      。
                    </p>
                  ))
                ) : (
                  <Empty></Empty>
                )}
              </TextWrap>
              <FlexDiv>
                <Title>板块走势</Title>
                <Select
                  data={this.dateList}
                  onChange={this.onClickTab}
                  initText={this.state.initText}
                  initKey={'12'}
                ></Select>
              </FlexDiv>
              <div className={'tab-wraps'}>
                <NewTabs tabs={this.tabs} onTabClick={this.onTabClick} width="238px"></NewTabs>
              </div>
              {!isEmpty(industryIndex) ? <InitChart option={option}></InitChart> : <Empty></Empty>}
              <Pettm></Pettm>
              <MainBuss></MainBuss>
            </Block>
          </div>
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.stock.industryData,
  code: state.stock.code,
  user: state.user
});
const mapDispatchToProps = (dispatch) => ({
  getIndustryIndex: bindActionCreators(getIndustryIndex, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Industry);
