import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import Company from './company';
import Viewpoint from './viewpoint';
import Report from './report';
import moment from 'moment';
import InitChart from '@/components/initEchart';
import Modal from '@/components/Modal';
import { connect } from 'react-redux';
import { WarnTip, Block, Container, Cards, Rank, Blocks, Cell } from '../../style';
import Tabs from '@/components/NewTabs';
import { isEmpty } from '@/utils';
import Loading from '@/components/loading';
import styles from '@/styles';
import get from 'lodash/get';
import Table from '@/components/Tables';
import bwModel from '@/config/bwmodel';
import Ranking50Enter from './ranking50enter';
class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      info: {},
      visible: false,
      switchKey: '1',
      moreSwitchKey: '1',
      dataSource: [],
      rankings: {},
      title: '',
      text: '',
      score: [],
      scoreAve: [],
      rank: [],
      date: [],
      initChartData: []
    };
    this.tabs = [
      { title: '按年', key: '1' },
      { title: '按季度', key: '2' }
    ];

    this.option = {
      // color: [styles.rankColor1, styles.rankColor2, styles.rankColor3],
      color: ['#4074FF', '#FCB621', '#01A7FF'],
      legend: {
        left: 0,
        textStyle: {
          color: styles.ranktextColor1,
          fontSize: 10
        },
        itemGap: 10,
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        data: [
          {
            name: '评分'
          },
          {
            name: '行业中位数'
          },
          {
            name: '排名',
            itemStyle: { color: '#01A7FF', borderWidth: 0 }
          }
        ]
      },
      grid: {
        bottom: 10,
        right: 0,
        top: '20%',
        left: 0
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: styles.ranklineColor
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            interval: 0
          },
          axisLabel: {
            show: false,
            fontSize: 10,
            interval: 0
          }
        }
      ],
      yAxis: [
        {
          show: true,
          type: 'value',
          yAxisIndex: 0,
          axisLine: {
            show: false
          },
          splitNumber: 5,
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {}
          },
          axisLabel: {
            fontSize: 10,
            show: false,
            interval: 'auto'
          },
          max: (value) => value.max
        },
        {
          type: 'value',
          name: '排名',
          nameLocation: 'end',
          inverse: true,
          nameTextStyle: {
            fontSize: 10,
            align: 'left',
            padding: [0, 8]
          },
          splitNumber: 4,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 10,
            show: true
          }
        }
      ],
      series: [
        {
          name: '评分',
          type: 'bar',
          barWidth: 12,
          barGap: '35%',
          yAxisIndex: 0,
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          },
          data: []
        },
        {
          name: '行业中位数',
          type: 'bar',
          yAxisIndex: 0,
          barWidth: 12,
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          },
          data: []
        },
        {
          name: '排名',
          yAxisIndex: 1,
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          // lineStyle: {
          //   type: 'dashed' ,
          //   // color: styles.rankColor3,
          // },    // #4074FF','#FCB621','#01A7FF'
          lineStyle: {
            type: 'dashed',
            color: '#01A7FF'
            // width: 2
          },
          barWidth: '60%',
          itemStyle: {
            borderWidth: 1.5,
            borderColor: '#01A7FF',
            color: '#FFFFFF'
          },
          data: []
        }
      ]
    };
  }
  componentWillReceiveProps(nextProps) {
    const { companyInfo, rankings } = nextProps;
    if (!isEmpty(companyInfo) || !isEmpty(rankings)) {
      this.setState({ showWarnTips: companyInfo.Warning });
      this.setState({ loading: false });
    }
    if (!isEmpty(rankings)) {
      this.init(rankings.year, 1);
      this.setState({ rankings: rankings });
    }
  }
  componentDidMount() {
    const { companyInfo, rankings } = this.props;
    if (!isEmpty(companyInfo) || !isEmpty(rankings)) {
      this.setState({ showWarnTips: companyInfo.Warning });
    }
    if (!isEmpty(rankings)) {
      this.init(rankings.year, 1);
      this.setState({ rankings: rankings });
    }
  }
  warnTips = () => {
    const { companyInfo } = this.props;
    if (!isEmpty(companyInfo)) {
      return (
        <WarnTip>
          <span className={'warning'}>{companyInfo.Warning}</span>
        </WarnTip>
      );
    }
  };

  // 参数2 是否强制转换

  formateQs = (val, isCoercion = false) => {
    if (!isCoercion) {
      switch (val) {
        case 3:
          return 'Q1';
        case 6:
          return 'Q2';
        case 9:
          return 'Q3';
        case 12:
          return 'Q4';
        default:
          return val;
      }
    } else {
      if (val <= 3) {
        return 'Q1';
      } else if (val <= 6) {
        return 'Q2';
      } else if (val <= 9) {
        return 'Q3';
      } else if (val <= 12) {
        return 'Q4';
      }
    }
  };

  handleConvertDate(date) {
    if (typeof date !== 'string') {
      return '';
    }
    const [year, month, day] = date.split('-');
    return `${year}年${Number(month)}月${Number(day)}日`;
  }

  init = (data = [], type = 1) => {
    const { companyInfo = {} } = this.props;
    this.setState({ info: data.length > 0 ? data[data.length - 1] : null });
    const score = [];
    const scoreAve = [];
    const rank = [];
    const date = [];
    let arr = [];
    data.forEach((item) => arr.push(item.Date));
    arr = arr.sort((a, b) => moment(a) - moment(b));
    let key = 1;
    data = data.length >= 5 ? data.slice(data.length - 5, data.length) : data;
    for (let i = 0; i < 5; i++) {
      if (data[i]) {
        score.push(Number(data[i].Score).toFixed(2));
        scoreAve.push(Number(data[i].ScoreAve).toFixed(2));
        rank.push(data[i].Ranking);
        if (type === 1) {
          date.push(moment(data[i].Date).year() + '年报');
        } else {
          date.push(
            `${moment(data[i].Date).year()}${this.formateQs(moment(data[i].Date).month() + 1)}`
          );
        }
      } else {
        if (type === 1) {
          date.unshift(moment(arr[0]).year() - key + '年报');
        } else {
          const year = moment(arr[0]).year();
          const month = moment(arr[0]).month();

          const monthTotal = year * 12 + month + 1 - key * 3;
          const resultYear = Math.floor(monthTotal / 12);

          const resultMonth = monthTotal % 12;

          date.unshift(resultYear + this.formateQs(resultMonth, true));
        }
        key++;
        score.unshift('-');
        scoreAve.unshift('-');
        rank.unshift('-');
      }
    }
    if (companyInfo.State === '0') {
      date[date.length - 1] = '截止退市';
    } else {
      date[date.length - 1] = '最新';
    }
    this.setState({
      score: score,
      scoreAve: scoreAve,
      rank: rank,
      date: date
    });
  };
  onTabClick = (tab) => {
    this.setState({ switchKey: tab.key });
    const { year = [], quarter = [] } = this.state.rankings;
    switch (tab.key) {
      case '1':
        this.init(year, 1);
        break;
      case '2':
        this.init(quarter, 2);
        break;
      default:
        this.init(year, 1);
        break;
    }
  };

  existChartData = () => {
    const { year, quarter } = this.state.rankings;
    if (
      (Array.isArray(year) && year.length > 0) ||
      (Array.isArray(quarter) && quarter.length > 0)
    ) {
      return true;
    }
    return false;
  };

  showRanking50Enter = () => {
    return bwModel.compareVersion('4.7.0');
  };

  chartDataIsEmpty = () => {
    const { switchKey } = this.state;
    const { year = [], quarter = [] } = this.state.rankings;
    if (switchKey === '1' && (!Array.isArray(year) || year.length === 0)) {
      return true;
    }
    if (switchKey === '2' && (!Array.isArray(quarter) || quarter.length === 0)) {
      return true;
    }
    return false;
  };

  getTextNode = () => {
    const state = get(this.props, 'companyInfo.State');
    const { companyInfo = {} } = this.props;
    const info = this.state.info || {};
    const dataRender = (
      <Flex justify={'between'} align={'baseline'}>
        <div>
          <span className={'ranking'}>{info.Ranking}</span>{' '}
          <span className="avarage">/{info.SumComp}</span>
        </div>
        <div className={'num'}>
          <span className={'avarage'}>评分</span>{' '}
          <span className={'rank'}>{info.Score ? Number(info.Score).toFixed(2) : 0}</span>
        </div>
        <div className={'num'}>
          <span className={'avarage'}>评分中位数 </span>
          <span>{info.ScoreAve ? Number(info.ScoreAve).toFixed(2) : 0}</span>
        </div>
      </Flex>
    );
    switch (state) {
      case '0': {
        return (
          <div className={'tip'}>
            <span className="delist">
              吾股评分需要上市公司多年度及多维度信息，该公司已于
              {
                <span style={{ color: '#ff4058' }}>
                  {this.handleConvertDate(companyInfo.DelistingDate)}
                </span>
              }
              退市，评分系统不对其继续适用。
              {this.computeDelistingDateScope()
                ? ''
                : '鉴于2019年注册制试点启动，该时段之前退市的公司暂不提供历史排名图表数据。'}
            </span>
          </div>
        );
      }
      case '1':
        return dataRender;
      case '2':
        return (
          <div className={'tip'}>
            目前银行、证券、保险等金融类企业因为财务报表特殊等原因，评分系统不对其适用。
          </div>
        );
      case '3': {
        return (
          <div className={'tip'}>
            吾股评分需要上市公司多年度及多维度信息，该公司上市时间较短无法参与评分。一般情况下首次评分会在上市公司第一次发布年报后公布。
          </div>
        );
      }
      case '5':
        return (
          <div className={'tip'}>
            吾股评分需要上市公司多年度及多维度信息，该公司上市时间较短无法参与评分。一般情况下首次评分会在上市公司第一次发布年报后公布。
          </div>
        );
      default:
        return '';
    }
  };

  computeDelistingDateScope = () => {
    const companyState = get(this.props, 'companyInfo.State');
    const delistingDate = get(this.props, 'companyInfo.DelistingDate');
    if (companyState !== '0') {
      return false;
    }
    if (moment(delistingDate).isAfter(moment('2019-07-01'))) {
      return true;
    }
    return false;
  };

  ranks = () => {
    const companyState = get(this.props, 'companyInfo.State');
    const showChart =
      (companyState !== '2' && companyState !== '3' && companyState !== '5') ||
      this.computeDelistingDateScope();
    return (
      <Rank>
        <Block>
          <Cards
            style={{
              minHeight: '104px',
              height: 'unset',
              position: 'relative',
              backgroundSize: 'cover'
            }}
          >
            <div className={'title'}>实时吾股排名</div>
            {this.getTextNode()}
            <Ranking50Enter visible={this.showRanking50Enter()} />
          </Cards>
        </Block>
        {this.existChartData() && showChart && (
          <div>
            <Blocks>
              <div className={'wrap'}>
                <Flex justify={'end'} className={'flex'}>
                  <div className={'tab-wrap'}>
                    <Tabs tabs={this.tabs} onTabClick={this.onTabClick} width={'164px'}></Tabs>
                  </div>
                  <div className={'more'} onClick={() => this.onClickMore()}>
                    更多{' '}
                  </div>
                </Flex>
              </div>
            </Blocks>
            <Block>
              {this.chartDataIsEmpty() ? (
                <div className="data-empty">
                  <div className="data-empty-img" />
                  <span className="data-empty-text">暂无数据</span>
                </div>
              ) : (
                <InitChart
                  option={this.option}
                  height={'180px'}
                  data={this.initChartData}
                  showEmpty={isEmpty(this.rankings)}
                ></InitChart>
              )}
            </Block>
          </div>
        )}
      </Rank>
    );
  };
  sortTable = (a, b) => {
    return a.Date - b.Date;
  };
  onClickMore = () => {
    const { year, quarter } = this.props.rankings;
    const dataSource = [];
    let arr = [];
    if (this.state.switchKey === '1') {
      this.setState({ title: '排名与评分（按年）', moreSwitchKey: '1' });
      this.setState({ text: '按季度' });
      arr = year;
    } else {
      this.setState({ title: '排名与评分（按季度）', moreSwitchKey: '2' });
      this.setState({ text: '按年' });
      arr = quarter;
    }
    arr.forEach((item) => {
      dataSource.unshift(item);
    });
    this.setState({ dataSource: dataSource });
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  onChange = (val) => {
    const { year, quarter } = this.props.rankings;
    const dataSource = [];
    let arr = [];
    this.setState({ text: val === '按季度' ? '按年' : '按季度' });
    this.setState({ moreSwitchKey: val === '按季度' ? '2' : '1' });
    if (val === '按年') {
      this.setState({ title: '排名与评分（按年）' });
      this.setState({ text: '按季度' });
      arr = year;
    } else {
      this.setState({ title: '排名与评分（按季度）' });
      this.setState({ text: '按年' });
      arr = quarter;
    }
    arr.forEach((item) => {
      dataSource.unshift(item);
    });
    this.setState({ dataSource: dataSource });
  };
  render() {
    const { regular, irregular, companyInfo } = this.props;
    const { visible, dataSource, title, text, score, scoreAve, rank, date, moreSwitchKey } =
      this.state;
    const columns = [
      {
        headerName: '年份',
        field: 'Date',
        flex: 1,
        cellRendererFramework: ({ value }) => {
          return (
            <Cell>
              {dataSource[0].Date === value
                ? `${companyInfo.State === '0' ? '截止退市' : '最新'}`
                : moreSwitchKey === '1'
                ? moment(value).year()
                : moment(value).year() + '' + this.formateQs(moment(value).month() + 1)}
            </Cell>
          );
        }
      },
      {
        headerClass: 'center',
        headerName: '评分',
        field: 'Score',
        flex: 1,
        cellRendererFramework: ({ value, data }) => {
          return <Cell className={'center'}>{value}</Cell>;
        }
      },
      {
        headerClass: 'center',
        headerName: '行业中位数',
        field: 'ScoreAve',
        flex: 1,
        cellRendererFramework: ({ value, data }) => {
          return <Cell className={'center'}>{value}</Cell>;
        }
      },
      {
        headerClass: 'right',
        headerName: '排序',
        field: 'Ranking',
        flex: 1,
        cellRendererFramework: ({ value, data }) => {
          return (
            <Cell className={'right'}>
              <span className="rank">{value}</span>
              <span className="ranks" danger>
                /{data.SumComp}
              </span>
            </Cell>
          );
        }
      }
    ];
    this.option.series[0].data = score.map((item) => (item ? item : '-'));
    this.option.series[1].data = scoreAve.map((item) => (item ? item : '-'));
    this.option.series[2].data = rank.map((item) => (item ? item : '-'));
    this.option.xAxis[0].data = date.map((item) => (item ? item : '-'));

    this.initChartData = [
      { data: date, type: '1', showIcon: false },
      {
        data: score.map((item) => (isNaN(item) || item === '0' ? '-' : Number(item).toFixed(2))),
        type: '2',
        showIcon: true,
        iconColor: '#405aff'
      },
      {
        data: scoreAve.map((item) => (isNaN(item) || item === '0' ? '-' : Number(item).toFixed(2))),
        type: '3',
        showIcon: true,
        iconColor: '#FCB621'
      },
      {
        data: rank.map((item) => (isNaN(item) || item === '0' ? '-' : item)),
        type: '4',
        showIcon: true,
        iconColor: '#01A7FF',
        textColor: '#01A7FF'
      }
    ];
    return (
      <Container>
        {this.state.loading ? (
          <Loading height={'calc(100vh - 40px)'} />
        ) : (
          <div>
            {' '}
            {this.state.showWarnTips && <Block>{this.warnTips()}</Block>}
            {this.ranks()}
            <Viewpoint></Viewpoint>
            <Company></Company>
            <Report regular={regular} irregular={irregular}></Report>
          </div>
        )}
        <Modal
          title={title}
          text={text}
          visible={visible}
          onClose={this.onClose}
          onChange={this.onChange}
          content={
            <Table
              dataSource={dataSource}
              columns={columns}
              headerColor={'#FFF'}
              headerHeight={'36'}
              rowHeight={'50'}
            ></Table>
          }
        ></Modal>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.stock.overview,
  styles: state.stock.styles,
  user: state.user
});
export default connect(mapStateToProps)(Overview);
