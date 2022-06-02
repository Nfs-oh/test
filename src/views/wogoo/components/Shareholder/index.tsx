import React, { Component } from 'react';
import { Container, Block, FlexDiv, Content, Cell } from '../../style';
import Table from '@/components/Tables';
import Select from '@/components/Select';
import { connect } from 'react-redux';
import { isEmpty, formaterNum } from '@/utils';
import InitChart from '@/components/initEchart';
import moment from 'moment';
import Title from '@/components/Title';
import Gdnum from './gdNum';
import Classification from './classification';
import Loading from '@/components/loading';
import Modal from '@/components/Modal';
import { jgCode } from '@/api/stock';
import styles from '@/styles';
class Shareholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Align: 'center',
      dataGD: [],
      loading: true,
      dataTL: [],
      dateGD: [],
      dateLT: [],
      dategd: '',
      datelt: '',
      visible: false,
      data: [],
      className: ''
    };
    this.option = {
      color: ['#405aff', '#ffc800'],
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
        data: [{ name: '机构总数(户)' }, { name: '持股比例' }]
      },
      grid: {
        left: '0',
        right: '0',
        bottom: '3%'
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisPointer: {
            type: 'shadow'
          },
          axisLine: {
            lineStyle: {
              color: styles.ranklineColor
            }
          },
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            color: styles.color34,
            fontSize: 10
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value',
          name: '机构总数(户)',
          nameTextStyle: {
            color: styles.color34,
            fontSize: 10
          },
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
          yAxisIndex: 0,
          minInterval: 1,
          axisLabel: {
            fontSize: 10
          }
        },
        {
          show: false,
          type: 'value',
          name: '持股比例',
          yAxisIndex: 1,
          minInterval: 1,
          splitNumber: 5,
          nameTextStyle: {
            fontSize: 10
          },
          axisLine: {
            show: false
          },
          axisTick: {
            // y轴刻度线
            show: false
          },
          splitArea: {
            show: false
          },
          splitLine: {
            // 网格线
            show: false
          },
          axisLabel: {
            fontSize: 10,
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: '机构总数(户)',
          type: 'bar',
          barWidth: 10,
          yAxisIndex: 0,
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          },
          data: ['22', '44', '55']
        },
        {
          name: '持股比例',
          yAxisIndex: 1,
          type: 'line',
          symbol: 'circle',
          data: []
        }
      ]
    };
    this.data = [];
  }
  componentWillReceiveProps(nextProps) {
    const { gudong } = nextProps;
    if (!isEmpty(gudong)) {
      this.init(gudong);
      this.setState({ loading: false });
    } else {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  }
  componentDidMount() {
    const { gudong } = this.props;
    if (!isEmpty(gudong)) {
      this.init(gudong);
      this.setState({ loading: false });
    } else {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }
  }
  init = (data) => {
    let GD = data.GD;
    let LT = data.LT;
    let dateGD = [];
    let dateLT = [];
    GD = GD.sort((a, b) => a.SHNo - b.SHNo);
    LT = LT.sort((a, b) => a.SHNo - b.SHNo);
    GD.forEach((item) => {
      dateGD.push(item.Date);
    });
    LT.forEach((item) => {
      dateLT.push(item.Date);
    });
    dateGD = [...new Set(dateGD)].sort((a, b) => moment(b) - moment(a));
    dateLT = [...new Set(dateLT)].sort((a, b) => moment(b) - moment(a));
    // dataGD = dataGD.sort((a, b) => moment(a) - moment(b))
    // dataTL = dataTL.sort((a, b) => moment(a) - moment(b))
    const date = dateGD[0];
    const datetl = dateLT[0];
    const dataGD = this.handleData(GD, date);
    const dataTL = this.handleData(LT, datetl);
    this.setState({ dataGD: dataGD });
    this.setState({ dateGD: dateGD });
    this.setState({ dataTL: dataTL });
    this.setState({ dateLT: dateLT });
    this.setState({ dategd: date });
  };
  handleData = (data, date) => {
    const arr = data.filter((item) => item.Date === date);
    return arr;
  };
  onChangeGD = (item, id) => {
    const { gudong } = this.props;
    const GD = gudong.GD;
    const dataGD = this.handleData(GD, item);
    this.setState({ dataGD: dataGD });
  };
  onChangeLT = (item, id) => {
    const { gudong } = this.props;
    const LT = gudong.LT;
    const dataTL = this.handleData(LT, item);
    this.setState({ dataTL: dataTL });
  };
  formateQs = (val) => {
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
  };
  // 机构合计
  jgcg = () => {
    let { jgNum } = this.props;
    let date = [];
    let dates = [];
    let lineList = [];
    let barList = [];
    let arr = [];
    let lines = [];
    if (jgNum.length > 0) {
      jgNum = jgNum.sort((a, b) => moment(a.Date) - moment(b.Date));
      jgNum.forEach((item) => {
        date.push(`${moment(item.Date).year()}${this.formateQs(moment(item.Date).month() + 1)}`);
        dates.push(item.Date);
      });
      date = date.length >= 5 ? date.slice(date.length - 5, date.length) : date;
      dates = dates.length >= 5 ? dates.slice(date.length - 5, dates.length) : dates;
      jgNum = jgNum.length >= 5 ? jgNum.slice(jgNum.length - 5, jgNum.length) : jgNum;
      dates.forEach((item) => {
        jgNum.forEach((i, index) => {
          if (i.Date === item) {
            lineList.push(i.InstitutionsHoldPropA ? i.InstitutionsHoldPropA.toFixed(2) : '-');
            lines.push(i.InstitutionsHoldPropA ? i.InstitutionsHoldPropA.toFixed(2) + '%' : '-');
            barList.push([index, i.InstiHoldTNum]);
            arr.push(i.InstiHoldTNum);
          }
        });
      });
      barList = barList.length >= 5 ? barList.slice(barList.length - 5, barList.length) : barList;
      lineList =
        lineList.length >= 5 ? lineList.slice(lineList.length - 5, lineList.length) : lineList;
      lines = lines.length >= 5 ? lines.slice(lines.length - 5, lines.length) : lines;
      arr = arr.length >= 5 ? arr.slice(arr.length - 5, arr.length) : arr;
      this.option.series[0].data = barList;
      this.option.series[1].data = lineList;
      this.option.xAxis[0].data = date;
      arr = arr.map((item) => (item ? formaterNum(item) : '-'));
      this.data = [
        { data: date, type: '1', showIcon: false, width: 100 / arr.length + '%' },
        {
          data: arr,
          type: '2',
          showIcon: true,
          iconColor: '#405AFF',
          width: 100 / arr.length + '%'
        },
        {
          data: lines,
          type: '3',
          showIcon: true,
          iconColor: '#FFC800',
          width: 100 / arr.length + '%'
        }
      ];
      return (
        <Content>
          <FlexDiv>
            <Title>机构持股合计</Title>
          </FlexDiv>
          <InitChart
            option={this.option}
            data={this.data}
            height={'200px'}
            showEmpty={jgNum.length === 0}
          ></InitChart>
        </Content>
      );
    }
  };
  onCellClick = (value, record, rowIndex) => {
    const params = {
      GDID: record.GDID,
      InfoTypeCode: record.InfoTypeCode,
      search_date: record.Date
    };
    jgCode(params).then((res) => {
      this.setState({
        data: res.data
      });
    });
    this.setState({ visible: true });
  };
  //机构持股分类
  transText = (data) => {
    switch (data) {
      case 2:
        return '增加';
      case 3:
        return '减少';
      case 4:
        return '新进';
      default:
        return '无变化';
    }
  };
  setClassName = (type) => {
    switch (type) {
      case 2:
        return 'add';
      case 3:
        return 'reduce';
      case 4:
        return 'blue';
      default:
        return '';
    }
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  onTouchStart = (e) => {
    if (e) {
      this.setState({ className: 'move' });
    }
  };
  onTouchStart1 = (e) => {
    if (e) {
      this.setState({ className: 'move' });
    }
  };
  onTouchEnd = (e) => {
    if (e) {
      this.setState({ className: '' });
    }
  };
  onTouchEnd1 = (e) => {
    if (e) {
      this.setState({ className: '' });
    }
  };
  onCellClick = ({ colDef, data }) => {
    if (colDef.field === 'SHList') {
      const params = {
        GDID: data.GDID,
        InfoTypeCode: data.InfoTypeCode,
        search_date: data.Date
      };
      if (data.GDID) {
        jgCode(params).then((res) => {
          this.setState({
            data: res.data
          });
        });
        this.setState({ visible: true });
      }
    }
  };
  render() {
    const { dataGD, dateGD, dateLT, dataTL, dategd, loading, visible, data, className } =
      this.state;
    const columns = [
      {
        headerClass: 'center color noRadiusright pinned',
        cellClass: 'pinned cell noborderRight ' + className,
        lockPinned: true,
        pinned: 'left',
        headerName: '股东名称',
        field: 'SHList',
        width: 180,
        cellRendererFramework: ({ value, data }) => {
          return (
            <Cell className={`${data.GDID !== null ? 'link' : ''} wrap-cell  left`}>
              <span className={` text-ellipsis`}>{value}</span>
            </Cell>
          );
        }
      },
      {
        headerClass: 'center color noRadiusleft',
        cellClass: 'cell noborderleft',
        headerName: '持股比例',
        field: 'PCTOfTotalShares',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value ? value.toFixed(2) : '0.00'}%</Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell ',
        headerName: '期内增减持',
        field: 'HoldChangeType',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}>
            {' '}
            <span className={this.setClassName(value)}>{this.transText(value)}</span>
          </Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell ',
        headerName: '质押股占比',
        field: 'PledgeRatio',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value ? value.toFixed(2) + '%' : '-'}</Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell',
        headerName: '冻结股占比',
        field: 'FreezeRatio',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value ? value.toFixed(2) + '%' : '-'}</Cell>
        )
      }
    ];
    const columnLt = [
      {
        headerClass: 'center color noRadiusright pinned',
        cellClass: 'pinned cell noborderRight ' + className,
        pinned: 'left',
        lockPinned: true,
        headerName: '股东名称',
        field: 'SHList',
        width: 180,
        cellRendererFramework: ({ value, data }) => {
          return (
            <Cell className={`${data.GDID !== null ? 'link' : ''} wrap-cell left `}>
              <span className={`text-ellipsis`}>{value}</span>
            </Cell>
          );
        }
      },
      {
        headerClass: 'center color noRadiusleft',
        cellClass: 'cell noborderleft',
        headerName: '持股比例',
        field: 'PCTOfTotalShares',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value ? value.toFixed(2) + '%' : '-'}</Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell',
        headerName: '期内增减持',
        field: 'HoldChangeType',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}>
            {' '}
            <span className={this.setClassName(value)}>{this.transText(value)}</span>
          </Cell>
        )
      },
      {
        headerClass: 'center color ',
        cellClass: 'cell',
        headerName: '质押股占比',
        field: 'PledgeRatio',
        width: 80,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value ? value.toFixed(2) + '%' : '-'}</Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell',
        headerName: '冻结股占比',
        field: 'FreezeRatio',
        width: 70,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value ? value.toFixed(2) + '%' : '-'}</Cell>
        )
      }
    ];
    const column = [
      {
        headerClass: 'left  fz10',
        headerName: '名称代码',
        field: 'Name',
        flex: 2,
        cellRendererFramework: ({ value, data }) => {
          return (
            <Cell className="stock">
              <span className="name">{value}</span>
              <span className="code">{data.Code}</span>
            </Cell>
          );
        }
      },
      {
        headerClass: 'center  fz10',
        sortable: true,
        unSortIcon: true,
        headerName: '持股数(股)',
        field: 'HoldSum',
        flex: 0.6,
        cellRendererFramework: ({ value }) => {
          return (
            <Cell className={'center'}>
              <span className="num">{formaterNum(value)}</span>
            </Cell>
          );
        }
      }
    ];
    return (
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Block>
            <FlexDiv className={'bottom'}>
              <Title>前十大股东</Title>
              <Select initText={dategd} data={dateGD} onChange={this.onChangeGD}></Select>
            </FlexDiv>
            <Table
              onTouchStart={this.onTouchStart}
              domLayout={'autoHeight'}
              onTouchEnd={this.onTouchEnd}
              pinnedWidth={'180px'}
              onCellClicked={this.onCellClick}
              className={className}
              dataSource={dataGD}
              columns={columns}
              border
              height={'100%'}
              headerHeight={'36'}
              rowHeight={56}
            ></Table>
            <Content style={{ 'margin-bottom': '10px' }}>
              <FlexDiv className={'bottom'}>
                <Title>十大流通股东</Title>
                <Select initText={dategd} data={dateLT} onChange={this.onChangeLT}></Select>
              </FlexDiv>
              <Table
                dataSource={dataTL}
                domLayout={'autoHeight'}
                onTouchStart={this.onTouchStart1}
                pinnedWidth={'180px'}
                onCellClicked={this.onCellClick}
                onTouchEnd={this.onTouchEnd1}
                columns={columnLt}
                border
                height={'100%'}
                headerHeight={'36'}
                rowHeight={56}
              ></Table>
            </Content>
            {this.jgcg()}
            <Classification></Classification>
            <Gdnum></Gdnum>
          </Block>
        )}
        <Modal
          title={'位列其他公司前十大股东'}
          text={''}
          visible={visible}
          onClose={this.onClose}
          content={
            <Table dataSource={data} columns={column} headerHeight={'36'} rowHeight={40}></Table>
          }
        ></Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.stock.gudongData
});
export default connect(mapStateToProps)(Shareholder);
