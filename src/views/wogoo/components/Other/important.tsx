import React, { Component } from 'react';
import List from '@/components/List';
import { ListCard, BtnWrap } from '../../style';
import { connect } from 'react-redux';
import Title from '@/components/Title';
import { isEmpty } from '@/utils';
import Empty from '@/components/Empty';
class Important extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ellipsis: true,
      important: [],
      value: [],
      activeKey: '1',
      list: [],
      dataList: ['gqzy', 'dwdb', 'jiedai', 'longhu', 'dzjy', 'zjc', 'xs', 'gap']
    };
    this.nodes = new Map();
    this.tabs = [
      { title: '股权质押', key: '1', value: 'gqzy' },
      { title: '对外担保', key: '2', value: 'dwdb' },
      { title: '机构投资者接待', key: '3', value: 'jiedai', width: '112px' },
      { title: '龙虎榜', key: '4', value: 'longhu', margin: '0 10px 10px 0' },
      { title: '大宗交易', key: '5', value: 'dzjy' },
      { title: '大股东增减持', key: '6', value: 'zjc', width: '112px' },
      { title: '限售股解禁', key: '7', value: 'xs' },
      { title: '向上跳空13日未回踩', key: '8', value: 'gap', width: '40%' }
    ];
    this.list = [];
  }
  componentWillReceiveProps(nextProps) {
    const { important } = nextProps;
    if (!isEmpty(important)) {
      this.initCard(important, 'gqzy');
      this.setState({ important: important });
    }
  }
  componentDidMount() {
    const { important } = this.props;
    if (!isEmpty(important)) {
      this.initCard(important, 'gqzy');
      this.setState({ important: important });
    }
  }
  onClickTab = (data) => {
    const list = [...this.list];
    let arr = [];
    arr = list.filter((item) => item.key === data.value);
    this.setState({ list: [...arr] });
    this.setState({ activeKey: data.key });
    this.forceUpdate();
  };
  initCard = (data, type) => {
    let list = [];
    if (data.length > 0) {
      data.forEach((item) => {
        if (item.key === 'dzjy') {
          list.push({
            ...item,
            value: 5,
            name: '大宗交易',
            title: `大宗交易：折溢价率${item.zheyijia.toFixed(2) + '%'}`,
            ellipsis: true
          });
        }
        if (item.key === 'zjc') {
          list.push({
            ...item,
            value: 6,
            name: '股东增减持',
            title: `股东增减持：${item.state ? '增持' : '减持'}${
              item.cir_stocks ? Math.abs(item.cir_stocks.toFixed(0)) : '--'
            }万股，占流通股比例${
              item.percentage ? Math.abs(item.percentage.toFixed(2)) + '%' : '--'
            }`,
            ellipsis: true
          });
        }
        if (item.key === 'gap') {
          list.push({
            ...item,
            value: 8,
            name: '向上跳空13日未回踩',
            title: `向上跳空13日未回踩`,
            ellipsis: true
          });
        }
        if (item.key === 'xs') {
          list.push({
            ...item,
            value: 7,
            name: '限售股解禁',
            title: `限售股解禁：解禁 ${
              item.trad_stocks === '--' ? '--' : item.trad_stocks.toFixed(0)
            }万股，占总股本比例${((item.trad_stocks / item.all_stocks) * 100).toFixed(2)}%`,
            ellipsis: true
          });
        }
        if (item.key === 'dwdb') {
          list.push({
            ...item,
            value: 2,
            name: '对外担保',
            title: ` 对外担保：向${item.bdbf === '--' ? '--' : item.bdbf}，担保金额${
              item.dbje === '--' ? '--' : item.dbje
            }万元，是否关联交易：${item.sfgljy === '--' ? '--' : item.sfgljy}`,
            ellipsis: true
          });
        }
        if (item.key === 'jiedai') {
          list.push({
            ...item,
            value: 3,
            name: '机构投资者接待',
            title: ` 机构投资者接待：接待量${item.pers_num === '--' ? '--' : item.pers_num}家`,
            ellipsis: true
          });
        }
        if (item.key === 'longhu') {
          list.push({
            ...item,
            value: 4,
            name: '龙虎榜',
            title: ` 龙虎榜：类型${item.reason === '--' ? '--' : item.reason}，涨跌幅${
              item.raising === '--' ? '--' : parseFloat(item.raising).toFixed(2)
            }%`,
            ellipsis: true
          });
        }
        if (item.key === 'gqzy') {
          list.push({
            ...item,
            value: 1,
            name: '股权质押',
            title: `股权质押：股东名称${item.gdmc === '--' ? '--' : item.gdmc}，质押起始日${
              item.zyqsr === '--' ? '--' : item.zyqsr
            }，占股东持股比例${item.zzgbbl === '--' ? '--' : item.zzgbbl}，占总股本比例${
              item.ljzzgbbl === 'None' ? 0 : item.ljzzgbbl
            }。`,
            ellipsis: true
          });
        }
      });
      this.list = list;
      list = list.filter((item) => item.key === type);
      this.setState({ list: list });
    }
  };
  setEllipsis = (item, index) => {
    item.ellipsis = !item.ellipsis;
    this.forceUpdate();
  };
  render() {
    const { important, list, activeKey } = this.state;
    return (
      <List
        content={
          <div>
            {important.length > 0 ? (
              <div>
                <BtnWrap>
                  {this.tabs.map((item) => (
                    <span
                      className={item.key === activeKey ? 'btn-active btn' : 'btn'}
                      key={item.key}
                      onClick={() => this.onClickTab(item)}
                      style={{ width: item.width ? item.width : '', margin: item.margin }}
                    >
                      {item.title}
                    </span>
                  ))}
                </BtnWrap>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <ListCard key={index}>
                      <span
                        className={item.ellipsis ? `title ellipsis` : 'title'}
                        onClick={() => this.setEllipsis(item, index)}
                      >
                        {item.title}
                      </span>
                      <span className={'date'}>{item.date}</span>
                    </ListCard>
                  ))
                ) : (
                  <Empty />
                )}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        }
        onChange={this.onChange}
        title={
          <span>
            <Title top={true}>重大事项</Title>({important.length})
          </span>
        }
      ></List>
    );
  }
}

const mapStateToProps = (state) => ({
  important: state.stock.otherData.important
});
export default connect(mapStateToProps)(Important);
