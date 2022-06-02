import React, { useState, useEffect, useRef } from 'react';
import Ellipsis from '@/components/Ellipsis';
import { Block, Item, TextWrap, Cell, Content, TableContainer, SmallText } from '../../style';
import moment from 'moment';
import { Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import InitChart from '@/components/initEchart';
import Tabs from '@/components/NewTabs';
import { setName } from '@/redux/stock/actions';
import { bindActionCreators } from 'redux';
import { isEmpty, callNativePdf, formaterNum } from '@/utils';
import Modal from '@/components/Modal';
import Empty from '@/components/Empty';
import Title from '@/components/Title';
import { notice } from '@/api/stock';
import * as echarts from 'echarts';
import styles from '@/styles';
import Table from '@/components/Tables';

const Company = ({ companyInfo, classifyTaking, setName, code }) => {
  const [dataPieSource, setDataPieSource] = useState([]);
  let total = 0;
  const legend = [];
  let echart = null;
  const color = [
    '#405aff',
    '#fb0000',
    '#7074f5',
    '#c084ff',
    '#ff7e8e',
    '#ff6f68',
    '#fe7617',
    '#77eaa4',
    '#5fddf3',
    '#15cdec',
    '#fbb670',
    '#fc6ebb',
    '#0a5ee3',
    '#fba8de',
    '#41ebcc'
  ];
  const option = {
    color: color,
    title: {
      subtext: '',
      text: ''
    },
    grid: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0'
    },
    legend: {
      top: '5%',
      show: false,
      selected: false,
      left: 'center',
      data: []
    },
    series: [
      // 主要展示层的
      {
        radius: ['45%', '71%'],
        type: 'pie',
        labelLine: {
          show: false
        },
        label: {
          show: true,
          position: 'center',
          formatter: (val) => ['{a|总营收}', `{b|${(total / 100000000).toFixed(2)}亿}`].join('\n'),
          rich: {
            a: {
              color: styles.income_color,
              fontSize: 12
            },
            b: {
              color: styles.color2,
              fontSize: 14,
              fontWeight: 500,
              padding: [0, 0, 10, 0]
            }
          }
          // textStyle:{
          //   color: '#666'
          // }
        },
        data: []
      }
    ]
  };
  const tabs = [
    { title: '按产品', key: '1' },
    { title: '按行业', key: '2' }
  ];
  const initialPage = '1';
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [line, setline] = useState(3);
  const [toggleText, settoggleText] = useState('展开');
  const [Opt, setOpt] = useState({});
  const ellipsis = useRef();
  const myChart = useRef();
  const init = (data) => {
    if (!isEmpty(companyInfo)) {
      setName(companyInfo.Name);
    }
    const series = [];
    const arr = [];

    for (const key in data) {
      if (data[key] > 0) {
        series.push({ name: key, value: data[key] });
        legend.push({ name: key });
      }
      total += data[key];
      arr.push({ name: key, value: data[key] });
    }
    // option.series[0].itemStyle.borderWidth = legend.length> 1 ? 2  : 0
    option.series[0].data = series;
    option.legend.data = legend;
    setOpt(option);
    const pieSource = [];
    arr.forEach((item, index) =>
      pieSource.push({ ...item, color: color[index], percent: item.value / total })
    );
    setDataPieSource(pieSource);
  };
  const onToggled = () => {
    setline(line ? null : 3);
    settoggleText(line ? '收起' : '展开');
    ellipsis.current.update();
    init(classifyTaking.Income_product);
  };
  const renderName = (data) =>
    data.map((item, index) => {
      return <span>{`${item}${index === data.length - 1 ? '' : '》'}`}</span>;
    });
  const renderCompanyInfo = (companyInfo) => (
    <TextWrap className={'company-info'}>
      <Item gray>
        <div className={'title'}>上市日期</div>
        <div>{companyInfo.ListingDate}</div>
      </Item>
      <Item gray>
        <div className={'title'}>曾用名</div>
        <div className={'name'}>
          {companyInfo.UsedName && companyInfo.UsedName.length > 0
            ? renderName(companyInfo.UsedName)
            : '-'}
        </div>
      </Item>
      <Item gray>
        <div className={'title'}>实际控制人类型</div>
        <span>{companyInfo.Typeid}</span>
      </Item>
      <Item gray>
        <div className={'title'}>所属行业</div>
        <span>{companyInfo.Industry3 === 'None' ? '-' : companyInfo.Industry3}</span>
      </Item>
      <Item gray>
        <div className={'title'}>控股股东质押比例</div>
        <span
          className={
            companyInfo.HolderPledge > 50
              ? 'more-than'
              : companyInfo.HolderPledge
              ? 'less-than'
              : ''
          }
        >
          {companyInfo.HolderPledge ? companyInfo.HolderPledge + '%' : '-'}
        </span>
      </Item>
      <Item gray>
        <div className={'title'}>累计担保占净资产比例</div>
        <span
          className={companyInfo.DBJZC > 50 ? 'more-than' : companyInfo.DBJZC ? 'less-than' : ''}
        >
          {companyInfo.DBJZC ? companyInfo.DBJZC + '%' : '-'}
        </span>
      </Item>
      <Item gray>
        <div className={'title'}>分红次数</div>
        <div>
          上市
          {companyInfo.ListingDate
            ? new Date().getFullYear() - moment(companyInfo.ListingDate).year()
            : '-'}
          年/分红{companyInfo.BonusNum}次
        </div>
      </Item>
      <Item gray>
        <div className={'title'}>累计分红</div>
        <div>
          {companyInfo.BonusTotal || 0}亿，
          {companyInfo.rank_LJFH > 50 ? '超过' : '低于'}
          <span className={companyInfo.rank_LJFH > 50 ? 'more-than' : 'less-than'}>
            {companyInfo.rank_LJFH > 50 ? companyInfo.rank_LJFH : 100 - companyInfo.rank_LJFH}%
          </span>
          上市公司
        </div>
      </Item>
      <Item gray>
        <div className={'title'}>累计募资</div>
        <div>
          {parseFloat(companyInfo.Fundraising ? companyInfo.Fundraising : 0).toFixed(2)}
          亿，{companyInfo.rank_LJMZ > 50 ? '超过' : '低于'}
          <span className={companyInfo.rank_LJMZ > 50 ? 'more-than' : 'less-than'}>
            {companyInfo.rank_LJMZ > 50 ? companyInfo.rank_LJMZ : 100 - companyInfo.rank_LJMZ}%
          </span>
          上市公司
        </div>
      </Item>
      <Item gray>
        <div className={'title'}>累计五年扣非净利润</div>
        <div>
          {parseFloat((companyInfo.ProfitTotal ? companyInfo.ProfitTotal : 0) / 100000000).toFixed(
            2
          )}
          亿，{companyInfo.rank_ZLR > 50 ? '超过' : '低于'}
          <span className={companyInfo.rank_ZLR > 50 ? 'more-than' : 'less-than'}>
            {companyInfo.rank_ZLR > 50 ? companyInfo.rank_ZLR : 100 - companyInfo.rank_ZLR}%
          </span>
          上市公司
        </div>
      </Item>
    </TextWrap>
  );

  const onViewClick = async () => {
    notice({ code }).then((res) => {
      if (res.resultCode === '00') {
        setDataSource(res.data);
      }
    });
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onSwitchTab = (tab) => {
    const { Income_product, Income_industry } = classifyTaking;
    if (tab.key === '2') {
      init(Income_industry);
    } else {
      init(Income_product);
    }
    echart = echarts.init(myChart.current.myChart);
    const legendData = echart.getOption().legend[0].data;
    const arr = [];
    legendData.forEach((item) => arr.push(item.name));
    echart.dispatchAction({
      type: 'downplay',
      name: arr
    });
  };
  const onCellClicked = ({ colDef, data }) => {
    if (colDef.field === 'title') {
      callNativePdf({ path: data.link, title: data.name + '公告' });
    }
  };
  const onRowClicked = ({ data }) => {
    echart = echarts.init(myChart.current.myChart);
    const legendData = echart.getOption().legend[0].data;
    const arr = [];
    legendData.forEach((item) => arr.push(item.name));
    if (arr.length > 1) {
      echart.dispatchAction({
        type: 'downplay',
        name: arr
      });
      echart.dispatchAction({
        type: 'highlight',
        name: data.name
      });
    }
  };
  useEffect(() => {
    if (!isEmpty(classifyTaking)) {
      init(classifyTaking.Income_product);
    }
  }, [classifyTaking]);
  const columns = [
    {
      headerName: '公告',
      field: 'title',
      flex: 2,
      cellRendererFramework: ({ value }) => (
        <Cell>
          {' '}
          <i className="icon"></i> <span className={'title'}>{value}</span>
        </Cell>
      )
    },
    {
      headerName: '日期',
      field: 'date',
      flex: 1,
      headerClass: 'right',
      cellRendererFramework: ({ value }) => (
        <Cell className={'right date'}>
          <span>{value}</span>{' '}
        </Cell>
      )
    }
  ];
  const pieColumns = [
    {
      headerName: '',
      field: 'color',
      width: 20,
      cellRendererFramework: ({ value }) => (
        <Cell color={value} className={'center'}>
          <span className={'color-icon'}></span>
        </Cell>
      )
    },
    {
      headerName: '名称',
      field: 'name',
      flex: 1,
      headerClass: 'fz12',
      cellRendererFramework: ({ value }) => (
        <Cell className={'fz12'}>
          <span className={'title ellipsis'}>{value}</span>
        </Cell>
      )
    },
    {
      headerName: '营业收入(元)',
      field: 'value',
      flex: 0.6,
      headerClass: 'center fz12',
      cellClass: 'center',
      cellRendererFramework: ({ value }) => (
        <Cell className={'center fz12 '}>
          <span>{!isNaN(value) ? (value === 0 ? 0 : formaterNum(value)) : '-'}</span>{' '}
        </Cell>
      )
    },
    {
      headerName: '占比',
      field: 'percent',
      width: 70,
      headerClass: 'right fz12',
      cellRendererFramework: ({ value }) => (
        <Cell className={'right fz12'}>
          <span>{(value * 100).toFixed(2)}%</span>{' '}
        </Cell>
      )
    }
  ];
  return (
    <div>
      <Content>
        <Block>
          <Flex align={'center'} justify={'between'}>
            <Title>公司简介</Title>
          </Flex>
          <div className={'ellipsis-wrap'}>
            <Ellipsis
              ref={ellipsis}
              text={companyInfo.MajorBuss}
              line={line}
              textTruncateChild={
                <span className={'text-link'} onClick={() => onToggled()}>
                  {toggleText}
                </span>
              }
            ></Ellipsis>
          </div>
        </Block>
        {!isEmpty(companyInfo) ? (
          renderCompanyInfo(companyInfo)
        ) : (
          <Block>
            <Empty />
          </Block>
        )}
      </Content>
      <Content>
        <div>
          <Block end>
            <Flex align={'center'} justify={'between'}>
              <Title>营业收入</Title>
              <span
                className={'end'}
                onClick={() => {
                  onViewClick();
                }}
              >
                经营数据报告
              </span>
            </Flex>

            {!isEmpty(classifyTaking) && (
              <Flex align={'center'} justify={'center'} className={'pie'}>
                <Tabs
                  initialPage={initialPage}
                  onTabClick={(tab) => onSwitchTab(tab)}
                  tabs={tabs}
                ></Tabs>
              </Flex>
            )}
            <Flex align={'center'} justify={'between'}>
              <SmallText>{classifyTaking.date}</SmallText>
              <SmallText>货币单位：人民币</SmallText>
            </Flex>
            <InitChart
              option={Opt}
              height={'200px'}
              width={'100%'}
              ref={myChart}
              showEmpty={isEmpty(classifyTaking)}
            ></InitChart>
          </Block>
        </div>
        <Modal
          title={'经营数据报告'}
          visible={visible}
          onClose={() => onClose()}
          content={
            <Table
              rowColor={true}
              dataSource={dataSource}
              columns={columns}
              onCellClicked={onCellClicked}
              headerHeight={'36'}
              rowHeight={'50'}
            ></Table>
          }
        ></Modal>
        {dataPieSource.length > 0 && (
          <TableContainer>
            <Table
              rowColor={true}
              dataSource={dataPieSource}
              onRowClicked={onRowClicked}
              headerBorder={false}
              columns={pieColumns}
              height={'100%'}
              headerHeight={'30'}
              domLayout={'autoHeight'}
              rowHeight={'30'}
            ></Table>
          </TableContainer>
        )}
      </Content>
    </div>
  );
};
const mapStateToProps = (state) => ({
  code: state.stock.code,
  companyInfo: state.stock.overview.companyInfo,
  classifyTaking: state.stock.overview.classifyTaking
});
const mapDispatchToProps = (dispatch) => ({
  setName: bindActionCreators(setName, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Company);
