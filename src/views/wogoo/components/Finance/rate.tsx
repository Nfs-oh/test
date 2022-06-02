import React, { useState, useEffect } from 'react';
// import NewBtn from "@/components/NewBtn";
import InitChart from '@/components/initEchart';
import { Block, Content, TableContainer, Cell, FlexDiv } from '../../style';
import { connect } from 'react-redux';
import { isEmpty } from '@/utils';
import moment from 'moment';
import Title from '@/components/Title';
import styles from '@/styles';
import Select from '@/components/Select';
import Table from '@/components/Tables';

const Rate = ({ finanData, NAME }) => {
  const option = {
    color: ['#ffaa00', '#3399ff'],
    legend: {
      itemGap: 10,
      itemWidth: 7,
      itemHeight: 7,
      textStyle: {
        color: styles.ranktextColor1,
        fontSize: 10
      },
      data: [
        { name: NAME || '公司A', icon: 'circle' },
        { name: '行业中位数', icon: 'circle' }
      ],
      left: 0
    },
    calculable: true,
    radar: [
      {
        indicator: [
          { text: '扣非后净利润增长率' },
          { text: '现金收入比例' },
          { text: '资产负债率(有息)' },
          { text: '有形资产比例' },
          { text: 'ROE' }
        ],
        center: ['50%', '50%'],
        radius: '50%',
        nameGap: 10,
        width: '5%',
        height: '5',
        name: {
          color: styles.ranktextColor1,
          width: '5',
          height: '5'
        },
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: [styles.split_color, styles.split_color] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          }
        },
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: 'rgba(150,150,150,0.2)' // 分隔线颜色
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(150,150,150,0.2)', // 分隔线颜色
            width: 1 // 分隔线线宽
          }
        }
      }
    ],
    series: [
      {
        name: '汇总',
        type: 'radar',
        tooltip: {
          padding: 12,
          trigger: 'item',
          extraCssText: 'z-index: 994'
        },
        itemStyle: {
          normal: {
            areaStyle: {
              fontSize: 10,
              type: 'default'
            }
          }
        },
        data: [
          {
            value: [],
            name: '行业中位数',
            symbolSize: 2.5,
            itemStyle: {
              normal: {
                borderColor: '#ffaa00',
                borderWidth: 2.5
              }
            },
            areaStyle: {
              normal: {
                // 单项区域填充样式
                color: {
                  type: 'linear',
                  x: 0, //右
                  y: 0, //下
                  x2: 1, //左
                  y2: 1, //上
                  colorStops: [
                    {
                      offset: 0,
                      color: '#ffaa00'
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(255,170,0, 0.3)'
                    },
                    {
                      offset: 1,
                      color: '#ffaa00'
                    }
                  ],
                  globalCoord: false
                },
                opacity: 1 // 区域透明度
              }
            }
          },
          {
            value: [],
            itemStyle: {
              normal: {
                borderColor: '#3399ff',
                borderWidth: 2.5
              }
            },
            symbolSize: 2.5,
            name: NAME || '公司A',
            areaStyle: {
              normal: {
                // 单项区域填充样式
                color: {
                  type: 'linear',
                  x: 0, //右
                  y: 0, //下
                  x2: 1, //左
                  y2: 1, //上
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3399ff'
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(51,153,255, 0.3)'
                    },
                    {
                      offset: 1,
                      color: '#3399ff'
                    }
                  ],
                  globalCoord: false
                },
                opacity: 1 // 区域透明度
              }
            }
          }
        ]
      }
    ]
  };
  const [date, setdate] = useState([]);
  const [initPage, setinitPage] = useState('4');
  const [opt, setopt] = useState(option);
  const [dataSource, setdataSource] = useState([]);

  const changeFinanceData = (date, data) => {
    let tableList = [];
    const list = [];
    const comList = [];
    const aveList = [];
    const maxVal = [100, 100, 100, 100, 100];
    const minVal = [-10, -10, -10, -10, -10];
    option.series[0].data[1].name = NAME || '公司A';
    comList[4] = Number(parseFloat(data[date].roe || 0).toFixed(1));
    aveList[4] = Number(parseFloat(data[date].roe_ave || 0).toFixed(1));
    comList[2] = Number(parseFloat(data[date].zcfz || 0).toFixed(1));
    aveList[2] = Number(parseFloat(data[date].zcfz_ave || 0).toFixed(1));
    comList[1] = Number(parseFloat(data[date].xjbl || 0).toFixed(1));
    aveList[1] = Number(parseFloat(data[date].xjbl_ave || 0).toFixed(1));
    comList[3] = Number(parseFloat(data[date].yxzcb || 0).toFixed(1));
    aveList[3] = Number(parseFloat(data[date].yxzcb_ave || 0).toFixed(1));
    comList[0] = Number(parseFloat(data[date].kfyoy || 0).toFixed(1));
    aveList[0] = Number(parseFloat(data[date].kfyoy_ave || 0).toFixed(1));
    for (let i = 0; i < maxVal.length; i++) {
      if (aveList[i] > comList[i]) {
        maxVal[i] = aveList[i];
        minVal[i] = comList[i];
      } else {
        maxVal[i] = comList[i];
        minVal[i] = aveList[i];
      }
      maxVal[i] = maxVal[i] + 5;
      minVal[i] = minVal[i] - 5;
    }
    option.series[0].data[0].value = aveList;
    option.series[0].data[1].value = comList;
    option.radar[0].indicator = [
      { text: '扣非后净利润增长率', min: minVal[0], max: maxVal[0] },
      { text: '现金收入比例', min: minVal[1], max: maxVal[1] },
      { text: '资产负债率(有息)', min: minVal[2], max: maxVal[2] },
      { text: '有形资产比例', min: minVal[3], max: maxVal[3] },
      { text: 'ROE', min: minVal[4], max: maxVal[4] }
    ];
    tableList = data[date];
    tableList.name = NAME || '公司A';
    const arr = Object.keys(tableList);
    arr.forEach((item) => {
      if (item === 'kfyoy' || item === 'kfyoy_ave') {
        list.push({
          id: 1,
          name: '扣非后净利润增长率',
          rate: tableList['kfyoy'],
          rate_ave: tableList['kfyoy_ave']
        });
      } else if (item === 'xjbl' || item === 'xjbl_ave') {
        list.push({
          id: 2,
          name: '现金收入比例',
          rate: tableList['xjbl'],
          rate_ave: tableList['xjbl_ave']
        });
      } else if (item === 'zcfz' || item === 'zcfz_ave') {
        list.push({
          id: 3,
          name: '资产负债率(有息)',
          rate: tableList['zcfz'],
          rate_ave: tableList['zcfz_ave']
        });
      } else if (item === 'yxzcb' || item === 'yxzcb_ave') {
        list.push({
          id: 4,
          name: '有形资产比例',
          rate: tableList['yxzcb'],
          rate_ave: tableList['yxzcb_ave']
        });
      } else if (item === 'roe' || item === 'roe_ave') {
        list.push({ id: 5, name: 'ROE', rate: tableList['roe'], rate_ave: tableList['roe_ave'] });
      }
    });
    const obj = {};
    let peon = list.reduce((cur, next) => {
      // eslint-disable-next-line no-unused-expressions
      obj[next.id] ? '' : (obj[next.id] = true && cur.unshift(next));
      return cur;
    }, []);
    peon = peon.sort((a, b) => a.id - b.id);
    setdataSource(peon);
    setopt(option);
  };
  const onClickTab = (tab) => {
    changeFinanceData(tab, finanData);
  };
  const initChart = (data) => {
    const date = Object.keys(data);
    let dateArr = [];
    for (const i in date) {
      dateArr.unshift(date[i]);
    }
    dateArr = dateArr.sort((a, b) => moment(b) - moment(a));
    dateArr = dateArr.length >= 5 ? dateArr.slice(0, 5) : dateArr;
    setdate(dateArr);
    setinitPage(dateArr[0]);
    changeFinanceData(dateArr[0], data);
  };
  const onRowClicked = () => {};
  useEffect(() => {
    if (!isEmpty(finanData)) {
      initChart(finanData);
    }
  }, [finanData]);
  const columns = [
    {
      headerName: '维度',
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
      headerName: NAME || '公司A',
      field: 'rate',
      flex: 0.6,
      headerClass: 'center fz12',
      cellRendererFramework: ({ value }) => (
        <Cell className={'center fz12 '}>
          <span>{value !== 'None' ? Number(value).toFixed(2) + '%' : '-'}</span>{' '}
        </Cell>
      )
    },
    {
      headerName: '行业中位数',
      field: 'rate_ave',
      width: 80,
      headerClass: 'right fz12',
      cellRendererFramework: ({ value }) => (
        <Cell className={'right fz12'}>
          <span>{value !== 'None' ? Number(value).toFixed(2) + '%' : '-'}</span>{' '}
        </Cell>
      )
    }
  ];

  return (
    <Content>
      <Block>
        <FlexDiv className={'bottom'}>
          <Title>财务比率</Title>
          <Select data={date} initText={initPage} onChange={onClickTab}></Select>
        </FlexDiv>
        <InitChart option={opt} height={'260px'} showEmpty={isEmpty(finanData)}></InitChart>
      </Block>
      {dataSource.length > 0 && (
        <TableContainer>
          <Table
            rowColor={true}
            dataSource={dataSource}
            onRowClicked={onRowClicked}
            headerBorder={false}
            columns={columns}
            height={'100%'}
            headerHeight={'30'}
            domLayout={'autoHeight'}
            rowHeight={'30'}
          ></Table>
        </TableContainer>
      )}
    </Content>
  );
};

const mapStateToProps = (state) => ({
  finanData: state.stock.finance.finanData,
  NAME: state.stock.name
});
export default connect(mapStateToProps)(Rate);
