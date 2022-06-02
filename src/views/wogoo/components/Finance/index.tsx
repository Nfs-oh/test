import React, { Component, createRef } from "react";
import moment from 'moment'
import { Block, BtnWrap, SubTitle, Nav, Cell, Content, FlexDiv , NavContent, Container, SmallText} from '../../style'
import Customer from './customer'
import Campany from './campany'
import Profit from './profit'
import Lilv from './lilv'
import Cost from './cost'
import Cash from './cash'
import FreeCash from './freeCash'
import Fuzai from './fuzai'
import Rate from './rate'
import { connect } from 'react-redux'
import InitChart from '@/components/initEchart'
import { isEmpty, formaterNum, barStyle, scrollAnimation } from "@/utils";
import Loading from '@/components/loading'
import Table from '@/components/Tables'
import Title from "@/components/Title";
import IncomeIncrement from "./incomeIncrement";

import EchartsBar from './EchartsBar';

// import ResearchesAndDevelops from "./ResearchesAndDevelops";
// import ReceivablesAndInventories from "./ReceivablesAndInventories";
// import ShareOutBonus from "./ShareOutBonus";
import AssetsRatio from "./assetsRatio";
import styles from '@/styles'
import { echarts1, echarts0 } from '../const';

const list = [
  { text: '审计意见', key: '1' },
  { text: '净利润', key: '2' },
  { text: '营业收入', key: '3' },
  { text: '营收及增速', key: '13' },
  { text: '主要客户', key: '4' },
  { text: '主要供应商', key: '5' },
  { text: '存货总资产比', key: '15' },
  { text: '盈利能力', key: '6' },
  { text: '毛/净利率', key: '7' },
  { text: '费用率', key: '8' },
  { text: '研发VS销售', key: '16' },
  { text: '现金流', key: '9' },
  { text: '自由现金流', key: '10' },
  { text: '资产负债', key: '11' },
  { text: '资产负债率', key: '14' },
  { text: '财务比率', key: '12' },
]
class Finance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: '1',
      summaryList: [],
      subTitleInfo: null,
      loading: true,
    }
    this.auditRef = null
    this.lirenRef = null
    this.incomeRef = null
    this.myLiRenChart = null
    this.assetsRatioRef = createRef();
    this.incomeIncreRef = createRef();
    this.reciveInventoryRef = createRef();
    this.researchsalesRef = createRef();
    this.option = {
      color: ['#FFAA00'],
      grid: {
        left: 0,
        top: '30',
        bottom: '10',
        right: '0',
      },
      legend: {
        left: 0,
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: styles.ranktextColor1,
          fontSize: 10,
        },
        data: [
          { name: '预告上限/下限', icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAAXNSR0IArs4c6QAAAFlJREFUOE9j/F9l7cnwn2Emw38GWQZKACPDYwZGhnTG/5XWjyg2DOYQRobHNDCQ2l4mFGz/K6z/I6th7DjKiE8PXkmQxlEDGUbDECMFMY7mZUI5Ebc8tPgCAMElSlnQMXvqAAAAAElFTkSuQmCC' },
          { name: '净利润(元)', icon: 'circle' }
        ]
      },
      xAxis: {
        type: 'category',
        data: [],
        boundaryGap: true,
        nameGap: 20,
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
          show: false,
        }
      },
      yAxis: {
        show: false,
        type: 'value',
        name: '万元',
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
        }
      },
      series: [
        {
          name: '预告上限/下限',
          type: 'boxplot',
          boxWidth: ['0', '10%'],
          position: 'right',
          data: [],
          itemStyle: {
            borderWidth: 3
          },
          barWidth: 5
        },
        {
          type: 'bar',
          name: '净利润(元)',
          color: '#3399FF',
          data: [],
          barWidth: 10
        }
      ]
    }
    this.data = []
    this.icomeOption = {
      color: ['#ff783b', '#ffb616', '#405aff', '#0083fc', '#36c77a', '#ff6650', '#00c8ac', '#46618d ', '#1d6576', '#25af5e', '#e48020', '#9b5ab6', '#02befe'],
      tooltip: {
        padding: 12,
        trigger: "axis",
        position: function (point, params, dom, rect, size) {
          // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          // 提示框位置
          var x = 0; // x坐标位置
          var y = 0; // y坐标位置

          // 当前鼠标位置
          var pointX = point[0];
          var pointY = point[1];

          // 外层div大小
          // var viewWidth = size.viewSize[0];
          // var viewHeight = size.viewSize[1];

          // 提示框大小
          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1];

          // boxWidth > pointX 说明鼠标左边放不下提示框
          if (boxWidth > pointX) {
            x = 5;  // 自己定个x坐标值，以防出屏
            y -= 15; // 防止点被覆盖住，可根据情况自行调节 
          } else { // 左边放的下
            x = pointX - boxWidth - 15;
          }

          // boxHeight > pointY 说明鼠标上边放不下提示框
          if (boxHeight + 20 > pointY) {
            y = pointY + 15;
          } else if (boxHeight > pointY) {
            y = 5;
          } else { // 上边放得下
            y += pointY - boxHeight;
          }
          return [x, y];
        },
        textStyle: {
          align: 'left',
          color: styles.ellipsis_color,
          fontSize: 12,
        },
        formatter: function (params) {
          let tool = ''
          for (let temp of params) {
            if (temp.seriesName !== 'others') {
              let dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${temp.color}; "></span>`
              tool += `<div style="display:flex; align-items: center;margin-bottom: 4px">${dotHtml}${temp.seriesName}：${((temp.data[0] / 100000000).toFixed(2) || 0)}亿元</div>`   
            }
          }
          return tool
        },
        extraCssText: "z-index: 994"
      },
      legend: {
        left: 0,
        show: true,
        data: [],
        icon: 'circle',
        height: 20,
        bottom: 0,
        itemGap: 8,
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          color: styles.ranktextColor1,
          fontSize: 10,
        },
      },
      grid: {
        top: '20',
        left: "2%",
        right: "12%",
        bottom: "10",
        height: 220,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: '',
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: styles.ranklineColor,
          },
        },
        splitLine: {
          lineStyle: {
            color: styles.ranklineColor,
          },
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: styles.color34,
          fontSize: 10,
          formatter: function (value) {
            return (value / 100000000).toFixed(0)
          }
        }
      },
      yAxis: {
        type: "category",
        name: '',
        nameTextStyle: {
          color: styles.color34,
          fontSize: 10,
          align: 'center'
        },
        axisLine: {
          lineStyle: {
            color: styles.ranklineColor,
          },
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: styles.color34,
          fontSize: 10,
          interval: 0, // 横轴信息全部显示
          formatter: function (val) {
            let newVal = val.indexOf('季报') !== -1 ? val.slice(0, 4) + '\n' + val.slice(4, val.length) : val
            return newVal
          }
        },
        data: []
      },
      series: []
    }
    this.navTab = React.createRef(null)
  }
  componentWillReceiveProps(nextProps) {
    const { jdjlr, profit } = nextProps
    if (!isEmpty(jdjlr)) {
      this.initliRenChart()
      this.setState({ loading: false })
    }
    if (!isEmpty(profit)) {
      this.initIcomeChart()
    }
  }
  componentDidMount() {
    const { jdjlr, profit } = this.props
    if (!isEmpty(jdjlr)) {
      this.initliRenChart()
      this.setState({ loading: false })
    }
    if (!isEmpty(profit)) {
      this.initIcomeChart()
    }
  }
  initliRenChart = () => {
    const { jdjlr } = this.props
    let reportDate = []
    let IncomeStatementCList = []
    let boxData = []
    let ProfitForecastT = []
    let ProfitForecastL = []
    let IncomeStatementCListlist = []
    if (!isEmpty(jdjlr)) {
      for (let temp of jdjlr) {
        reportDate.unshift(moment(temp.ReportDate).year() + '-' + (moment(temp.ReportDate).month() > 10 ? moment(temp.ReportDate).month() + 1 : '0' + (moment(temp.ReportDate).month() + 1)))
        IncomeStatementCList.unshift((temp.IncomeStatementC / 10000).toFixed(2))
        boxData.unshift([temp.ProfitForecastL / 10000, temp.ProfitForecastL / 10000, temp.ProfitForecastL / 10000, temp.ProfitForecastL / 10000, temp.ProfitForecastT / 10000])
        ProfitForecastL.unshift(isNaN(temp.ProfitForecastL) ? '-' : formaterNum(temp.ProfitForecastL))
        ProfitForecastT.unshift(isNaN(temp.ProfitForecastT) ? '-' : formaterNum(temp.ProfitForecastT))
        IncomeStatementCListlist.unshift(isNaN(temp.IncomeStatementC) ? '-' : formaterNum(temp.IncomeStatementC))
      }
    }
    reportDate = reportDate.length >= 5 ? reportDate.slice(1, 5) : reportDate
    IncomeStatementCList = IncomeStatementCList.length >= 5 ? IncomeStatementCList.slice(1, 5) : IncomeStatementCList
    boxData = boxData.length >= 5 ? boxData.slice(1, 5) : boxData
    ProfitForecastT = ProfitForecastT.length >= 5 ? ProfitForecastT.slice(1, 5) : ProfitForecastT
    ProfitForecastL = ProfitForecastL.length >= 5  ? ProfitForecastL.slice(1, 5) : ProfitForecastL
    IncomeStatementCListlist = IncomeStatementCListlist.length >= 5 ? IncomeStatementCListlist.slice(1, 5) : IncomeStatementCListlist
    this.option.xAxis.data = reportDate
    this.option.series[0].data = barStyle(boxData)
    this.option.series[1].data = barStyle(IncomeStatementCList)
    this.data = [
      { data: reportDate, type: '1', showIcon: false, width: 100 / reportDate.length + '%' },
      { data: ProfitForecastT, type: '2', showIcon: false, textColor: "#FF783B", text: '上限', width: 100 / reportDate.length + '%' },
      { data: ProfitForecastL, type: '2', showIcon: false, textColor: "#FF783B", text: '下限', width: 100 / reportDate.length + '%' },
      { data: IncomeStatementCListlist, type: '4', showIcon: true, iconColor: "#405AFF", width: 100 / reportDate.length + '%' },
    ]
  }
  getCurrentTab = (item) => {
    // const { key } = item;
    this.setState({
      activeKey: item.key
    })
    const getScrollHeight = this.headerRef.offsetHeight + 52;
    let inity = document.body.scrollTop + document.documentElement.scrollTop;

    // let currentRef =  this[key] || {};
    // currentRef = currentRef.current || currentRef;
    // scrollAnimation(inity, currentRef.offsetTop - getScrollHeight)
    // let incomeIncreRef = this.incomeIncreRef.current || ;
    // incomeIncreRef && scrollAnimation(inity, incomeIncreRef.offsetTop - getScrollHeight)
    switch (item.key) {
      case '1':
        let auditRef = this.auditRef  //审计意见
        scrollAnimation(inity, auditRef.offsetTop - getScrollHeight)
        break
      case '2':
        let lirenRef = this.lirenRef //净利润
        scrollAnimation(inity, lirenRef.offsetTop  - getScrollHeight)
        break
      case '3':
        let incomeRef = this.incomeRef //营业收入
        scrollAnimation(inity, incomeRef.offsetTop - getScrollHeight)
        break
      case '4':
        let customerRef = this.customerRef //主要客户
        scrollAnimation(inity, customerRef.offsetTop -getScrollHeight)
        break
      case '5':
        let campanyRef = this.campanyRef
        scrollAnimation(inity, campanyRef.offsetTop -getScrollHeight)
        break
      case '6':
        let profitRef = this.profitRef
        scrollAnimation(inity, profitRef.offsetTop -getScrollHeight)
        break
      case '7': //毛/净利率
        let lilvRef = this.lilvRef
        scrollAnimation(inity, lilvRef.offsetTop  -getScrollHeight)
        break
      case '8':
        let costRef = this.costRef
        scrollAnimation(inity, costRef.offsetTop -getScrollHeight)
        break
      case '9':
        let cashRef = this.cashRef
        scrollAnimation(inity, cashRef.offsetTop -getScrollHeight)
        break
      case '10':
        let freeCashRef = this.freeCashRef
        scrollAnimation(inity, freeCashRef.offsetTop -getScrollHeight)
        break
      case '11':
        let fuzaiRef = this.fuzaiRef
        scrollAnimation(inity, fuzaiRef.offsetTop -getScrollHeight)
        break
      case '12':
        let rateRef = this.rateRef
        scrollAnimation(inity, rateRef.offsetTop  -getScrollHeight)
        break
      case '13':
        let incomeIncreRef = this.incomeIncreRef.current;
        incomeIncreRef && scrollAnimation(inity, incomeIncreRef.offsetTop - getScrollHeight)
        break
      case '14':
        let assetsRatioRef = this.assetsRatioRef.current
        assetsRatioRef && scrollAnimation(inity, assetsRatioRef.offsetTop - getScrollHeight)
        break
      case '16':
        let researchsalesRef = this.researchsalesRef.current;
        researchsalesRef && scrollAnimation(inity, researchsalesRef.offsetTop - getScrollHeight)
        break
      case '15':
          let reciveInventoryRef = this.reciveInventoryRef.current
          reciveInventoryRef && scrollAnimation(inity, reciveInventoryRef.offsetTop - getScrollHeight)
          break
      default:
        return ''
    }
  }
  //审计意见
  audit = (data) => {
    const columns = [{
      headerClass: 'center color fz10',
      cellClass: 'cell',
      headerName: '年份', field: 'date', flex: 0.4,
      cellRendererFramework: ({ value }) => {
        return <Cell className={'wrap-cell center'}>{value}</Cell>
      }
    }, {
      headerClass: 'left color fz10',
      cellClass: 'cell ',
      headerName: '审计意见', field: 'category', flex: 1,
      cellRendererFramework: ({ value }) => {
        return <Cell className={'wrap-cell center text'}>{value}</Cell>
      }
    }, {
      headerClass: 'left color fz10',
      cellClass: 'cell',
      headerName: '审计机构', field: 'AUDITOR', flex: 1,
      cellRendererFramework: ({ value }) => {
        return <Cell className={'wrap-cell text'}>{value}</Cell>
      }
    }, {
      headerClass: 'center color fz10',
      cellClass: 'cell',
      headerName: '审计费用', field: 'AUDITPAY', flex: 0.8,
      cellRendererFramework: ({ value, data }) => {
        return <Cell className={'wrap-cell center'}>{value !== 'None' && value !== '-' ? formaterNum(value) + "元" : '-'}</Cell>
      }
    }]
    return (
      <Block ref={audit => this.auditRef = audit}>
        <FlexDiv ><Title>审计意见</Title></FlexDiv>
        <Table dataSource={data} columns={columns}  domLayout={'autoHeight'} border height={'100%'} rowHeight={64} headerHeight={'36'}></Table>
      </Block>
    )
  }
  initIcomeChart = () => {
    const { taking } = this.props
    if (!taking.takingData) { return }
    this.setState({ subTitleInfo: taking.takingRank })
    let seriesList = []
    let keys = []
    let dates = []
    for (let key in taking.takingData) {
      dates.unshift(key)
      for (let temps in taking.takingData[key]) {
        let series = {
          name: "",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: false,
              position: "insideRight"
            }
          },
          data: []
        }
        if (temps !== 'others' && temps !== 'taking') {
          if (temps === '总营收') {
            keys.push('当期营业收入')
            series.name = '当期营业收入'
            series.barWidth = 10
          } else {
            keys.push(temps)
            series.name = temps
            series.barWidth = 10
          }
          series.data[0] = [taking.takingData[key][temps], key]
          seriesList.unshift(series)
        }
      }
    }
    this.icomeOption.yAxis.data = dates
    this.icomeOption.legend.data = [...new Set(keys)]
    this.icomeOption.series = seriesList
  }
  // 营业收入
  income = () => (
    <Content>
      <Block ref={incomeRef => this.incomeRef = incomeRef}>
        <FlexDiv><Title>营业收入</Title></FlexDiv>
        <FlexDiv>{this.state.subTitleInfo && <SubTitle mat={'0px'}>最新一期营业收入{this.state.subTitleInfo > 50 ? '超过' : '低于'}<span className={this.state.subTitleInfo > 50 ? "more-than" : "less-than"}>{this.state.subTitleInfo > 50 ? this.state.subTitleInfo : 100 - this.state.subTitleInfo}%</span>的上市公司</SubTitle>}<SmallText style={{'margin-top': '15px', 'font-szie': '12px', transform: 'scale(0.8)'}}>单位：亿元</SmallText></FlexDiv>
       
        <InitChart option={this.icomeOption} height={'300px'} resize showEmpty={isEmpty(this.props.taking)}></InitChart>
      </Block>
    </Content>
  )
  render() {
    const { activeKey, loading } = this.state

    const { summaryList, jdjlr, top5 } = this.props;
    const isEmptyJdjlr = isEmpty(jdjlr) || jdjlr.length ===0;
    return (
      <Container> {loading ? <Loading></Loading> :
        <div>
          {/**按钮区域 */}
          <Block>
            <Nav ref={ref => this.headerRef = ref} position={'fixed'}>
              <BtnWrap  ref={this.navTab}>
                {list.map(item => <span className={(item.key === activeKey ? 'btn-active' : '') + ' btn'} key={item.key} onClick={() => this.getCurrentTab(item)} >{item.text}</span>)}
              </BtnWrap>
            </Nav>
          </Block>
          <NavContent>
            {this.audit(summaryList)}
            {/**各季度利润 **/}
            <div style={{ margin: '20px 0 0' }} ref={lirenRef => this.lirenRef = lirenRef}>
              <Block>
                <FlexDiv>
                  <Title>各季度净利润</Title>
                </FlexDiv>
                <InitChart option={this.option} data={this.data} showEmpty={isEmptyJdjlr}></InitChart>
              </Block>
            </div>
            {this.income()}
            <IncomeIncrement ref={this.incomeIncreRef}/>
            <div ref={ref => this.customerRef = ref}><Customer top5={top5}></Customer></div>
            <div ref={ref => this.campanyRef = ref}><Campany top5={top5}></Campany></div>

            <div ref={this.reciveInventoryRef}>
              <EchartsBar name='stock.reciveInventory' echartsData={echarts0} /> 
            </div>
          {/* 盈利能力 */}
            <div ref={ref => this.profitRef = ref}><Profit ></Profit></div>

            <div ref={ref => this.lilvRef = ref}><Lilv></Lilv></div>

            <div ref={ref => this.costRef = ref}><Cost></Cost></div>
            <div ref={this.researchsalesRef}>
              <EchartsBar name='stock.researchsales' echartsData={echarts1} /> 
            </div>
            <div ref={ref => this.cashRef = ref}> <Cash></Cash></div>
            <div ref={ref => this.freeCashRef = ref}><FreeCash></FreeCash></div>
            <div ref={ref => this.fuzaiRef = ref}><Fuzai></Fuzai></div>
            <AssetsRatio ref={this.assetsRatioRef}/>
            <div ref={ref => this.rateRef = ref}><Rate ></Rate></div>
          </NavContent>
        </div>}
      </Container>
    )
  }
}
const mapStateToProps = (state) => ({
  ...state.stock.finance
})
export default connect(mapStateToProps)(Finance)