import React, { useState, useEffect, memo } from 'react';
import { Grid } from 'antd-mobile';
import { GridItem, Wrap } from './style';
import { top10, rzrq } from '@/api/data';
import Item from './item';
import { jumpTo } from '@/utils';
import { connect } from 'react-redux';
import ico_all from '@/img/overview_slices/ico_all@2x.png';
import ico_fyzs from '@/img/overview_slices/ico_fyzs@2x.png';
import ico_ggcg from '@/img/overview_slices/ico_ggcg@2x.png';
import ico_hdy from '@/img/overview_slices/ico_hdy@2x.png';
import ico_schg from '@/img/overview_slices/ico_schg@2x.png';
import styles from '@/styles';

type IProps = {
  user: any;
};

const DataCenter: React.FC<IProps> = ({ user }) => {
  const data = [
    {
      icon: ico_schg,
      text: `市场回顾`,
      onClick: () => {
        jumpTo(process.env.REACT_APP_WOGOO_URL + 'stockPage?i=' + user.userId);
      }
    },
    {
      icon: ico_hdy,
      text: `互动易`,
      onClick: () => {
        jumpTo(process.env.REACT_APP_WOGOO_URL + 'hdy?i=' + user.userId);
      }
    },
    {
      icon: ico_fyzs,
      text: `风云指数`,
      onClick: () => {
        jumpTo(process.env.REACT_APP_WOGOO_URL + 'myspic?i=' + user.userId);
      }
    },
    {
      icon: ico_ggcg,
      text: `高管持股`,
      onClick: () => {
        jumpTo(process.env.REACT_APP_WOGOO_URL + 'stake?i=' + user.userId);
      }
    },
    {
      icon: ico_all,
      text: `全部`,
      onClick: () => {
        jumpTo(process.env.REACT_APP_WOGOO_URL + 'induPage?' + user.userId);
      }
    }
  ];
  const [topopt, setTopopt] = useState({});
  const [Top10, setTop10] = useState([]);
  const [Top10Key, setTop10Key] = useState('1');
  const [subTop10Key, setSubTop10Key] = useState('wk_raising');
  const [rzrqOpt, setRzrqOpt] = useState({});
  const [date, setDate] = useState([]);
  const [rzye, setrzye] = useState([]);
  const [rqye, setrqye] = useState([]);
  const top10Tabs = [
    { title: '近一周', key: 'wk_raising' },
    { title: '近一月', key: 'mon1_raising' },
    { title: '近三月', key: 'mon3_raising' }
  ];
  const top10NewTabs = [
    { title: '涨幅榜', key: '1' },
    { title: '跌幅榜', key: '2' }
  ];
  const rzrqtabs = [
    { title: '近一月', key: '1' },
    { title: '近半年', key: '6' },
    { title: '近一年', key: '12' }
  ];
  const initPage = 'wk_raising';
  const Top10ption = {
    grid: {
      left: '15',
      right: '15',
      top: '20',
      bottom: '26%'
    },
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: ['40%', '0'],
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
        show: false
      },
      axisLabel: {
        textStyle: {
          color: styles.color34
        },
        interval: 0,
        rotate: 40,
        width: 200,
        formatter: (value) => (value = value.length > 4 ? value.substring(0, 4) + '...' : value)
      }
    },
    yAxis: {
      show: false,
      type: 'value',
      max: (value) => value.max
    },
    series: [
      {
        data: [],
        barWidth: 10,
        label: {
          show: true,
          position: 'top'
        },
        type: 'bar'
      }
    ]
  };
  const RzrqOption = {
    color: ['#fea9a9', '#009cff'],
    legend: {
      left: '0',
      show: 'true',
      itemGap: 10,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: styles.ranktextColor1,
        fontSize: 10
      },
      itemHeight: 8,
      data: ['融券余额(亿元)', '融资余额(亿元)']
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        color: styles.ellipsis_color,
        fontSize: 12
      },
      position: function (point, params, dom, rect, size) {
        // 固定在顶部
        const echartsX = size.viewSize[0] - size.contentSize[0];
        return [echartsX / 2, point[1] - 100];
      },
      formatter: (params) => {
        let val = `<div style="margin-bottom: 4px;">${params[0].axisValue} </div>`;
        params.forEach((item) => {
          const dotHtml = `<span style="margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:${item.color}; "></span>`;
          val += `<div style= "display:flex; align-items: center;margin-bottom: 4px;text-align:left">${dotHtml}${
            item.seriesName
          }：${item.value ? item.value.toFixed(2) : '-'}</div>`;
        });
        return val;
      }
    },
    grid: {
      top: '15%',
      left: '15',
      right: '15',
      height: '80%',
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        textStyle: {
          color: styles.color34
        },
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
        padding: [4, 0, 0, 0],
        fontSize: 10
      },
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: styles.ranklineColor
        }
      },
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: [
      {
        type: 'value',
        scale: true,
        nameTextStyle: {
          color: styles.color34,
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
      {
        type: 'value',
        scale: true,
        nameTextStyle: {
          color: styles.color34,
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
          show: false,
          lineStyle: {
            color: '#eee'
          }
        },
        axisLabel: {
          color: styles.color34,
          fontSize: 10
        }
      }
    ],
    series: [
      {
        name: '融资余额(亿元)',
        type: 'line',
        symbol: 'circle',
        data: []
      },
      {
        name: '融券余额(亿元)',
        type: 'line',
        symbol: 'circle',
        yAxisIndex: 1,
        data: []
      }
    ]
  };

  const renderItem = (el, index) => (
    <GridItem onClick={() => el.onClick()} key={index}>
      <img src={el.icon} className={'grid-item-img'} alt={''} />
      <span className={'grid-item-text'}>{el.text}</span>
    </GridItem>
  );
  const onClickTabTOP10 = (tab) => {
    setSubTop10Key(tab.key, Top10Key);
    initTop10(Top10, tab.key, Top10Key);
  };
  const onClickTabRezq = (tab) => {
    let type = '-24';
    switch (tab.key) {
      case '12':
        type = '-246';
        break;
      case '6':
        type = '-132';
        break;
      case '1':
        type = '-24';
        break;
      default:
        type = '-24';
        break;
    }
    changeDate(date, rzye, rqye, type);
  };
  const initTop10 = (data, type, sort = 1) => {
    data = data.sort((a, b) => (sort === '1' ? b[type] - a[type] : a[type] - b[type]));
    // 前10数据
    const top10Data = data.length > 10 ? data.slice(0, 10) : data;
    const x_data = [];
    const series_data = [];
    top10Data.forEach((item) => x_data.push(item.product_show));
    top10Data.forEach((item) => {
      series_data.push(
        sort === '1'
          ? Number(item[type] > 0 ? item[type] * 100 : 0).toFixed(2)
          : Number(item[type] > 0 ? 0 : -item[type] * 100).toFixed(2)
      );
    });
    Top10ption.xAxis.data = x_data;
    Top10ption.series[0].data = series_data.map((item) => ({
      value: item,
      label: {
        show: true,
        fontSize: 8,
        position: 'top',
        formatter: ({ value }) => (sort === '1' ? value : -value)
      },
      itemStyle: {
        normal: {
          color: sort === '1' ? '#FF4058' : '#00C8AC',
          barBorderRadius: [3, 3, 0, 0]
        }
      }
    }));
    setTopopt(Top10ption);
  };
  const getTop10 = () => {
    top10().then((res) => {
      if (res.resultCode === '00') {
        const data = res.data;
        const arr = [];
        for (const i in data) {
          arr.push(...data[i]);
        }
        setTop10(arr);
        initTop10(arr, 'wk_raising', '1');
      }
    });
  };
  // 改变两融余额
  const changeDate = (date, rzye, rqye, index) => {
    RzrqOption.xAxis.data = date.slice(index);
    RzrqOption.series[0].data = rzye.slice(index);
    RzrqOption.series[1].data = rqye.slice(index);
    setRzrqOpt(RzrqOption);
  };
  const initRerq = (data) => {
    const dateArr = [];
    const rzyeArr = [];
    const rqyeArr = [];
    for (const item of data) {
      dateArr.push(item.date);
      rzyeArr.push(item.rzye);
      rqyeArr.push(item.rqye);
    }
    setDate(dateArr);
    setrzye(rzyeArr);
    setrqye(rqyeArr);
    changeDate(dateArr, rzyeArr, rqyeArr, -24);
  };

  const getRzrq = () => {
    const { user_id } = user;
    const params = {
      filtrate: '全部',
      reportDate: '1',
      table: 'table1',
      user_id: user_id
    };
    rzrq(params).then((res) => {
      if (res.resultCode === '00') {
        initRerq(res.data);
      }
    });
  };
  const onTabClickTop = (tab) => {
    setTop10Key(tab.key);
    initTop10(Top10, subTop10Key, tab.key);
  };
  const onClickMoreTop10 = () => {
    jumpTo(process.env.REACT_APP_WOGOO_URL + 'induCenter?i=' + user.userId);
  };
  const onClickMoreRerq = () => {
    jumpTo(process.env.REACT_APP_WOGOO_URL + 'smt?i=' + user.userId);
  };
  // const onClickMoreRelieve = () =>{
  //   jumpTo(process.env.REACT_APP_WOGOO_URL + 'restricted?i='+ user.userId)
  // }
  useEffect(() => {
    getTop10();
    getRzrq();
  }, [user]);

  return (
    <Wrap>
      <Grid
        data={data}
        hasLine={false}
        activeStyle={false}
        renderItem={(el, index) => renderItem(el, index)}
        columnNum={5}
      />
      <Item
        title={'原材料涨幅榜'}
        tabs={top10Tabs}
        newTabs={top10NewTabs}
        initPage={initPage}
        option={topopt}
        height={'200px'}
        text={`单位：%`}
        onTabClick={onTabClickTop}
        onClickMore={onClickMoreTop10}
        onClickTab={onClickTabTOP10}
      ></Item>
      <Item
        title={'两融余额'}
        tabs={rzrqtabs}
        initPage={'1'}
        tabstyle={true}
        option={rzrqOpt}
        height={'240px'}
        onClickMore={onClickMoreRerq}
        text={`更新日期：${date.length > 0 && date[date.length - 1]}`}
        onClickTab={onClickTabRezq}
      ></Item>
      {/* <Item
        title={"一周限售解禁"}
        tabs={tabs}
        initPage={'1'}
        onClickMore={onClickMoreRelieve}
        option={relieveOpt}
        showTab={false}
      ></Item> */}
    </Wrap>
  );
};
const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps)(memo(DataCenter));
