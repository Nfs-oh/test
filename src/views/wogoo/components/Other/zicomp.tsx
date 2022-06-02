import React, { Component } from 'react';
import List from '@/components/List';
import { TabCard, FlexDiv, TabCardWrap } from '../../style';
import { connect } from 'react-redux';
import Title from '@/components/Title';
import { isEmpty, formaterNum } from '@/utils';
import Empty from '@/components/Empty';
import Select from '@/components/Select';
class ZiCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      zi_comp: [],
      initPage: '',
      tabs: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const { zi_comp } = nextProps;
    if (!isEmpty(zi_comp)) {
      this.initZicompany(zi_comp);
      this.setState({ zi_comp: zi_comp });
    }
  }
  onClickTab = (tab) => {
    const { zi_comp } = this.props;
    const list = this.formatterData(zi_comp, tab.value);
    this.setState({ list: list });
  };
  formatterData = (data, type) => {
    return data[type];
  };
  initZicompany = (data) => {
    const tabs = [];
    let list = [];
    Object.keys(data).forEach((item) => {
      tabs.push(item);
    });
    this.tabs = tabs;
    this.setState({ initPage: tabs[tabs.length - 1] });
    this.setState({ tabs: tabs.reverse() });
    list = this.formatterData(data, tabs[0]);
    this.setState({ list: list });
  };
  changeDate = (data) => {
    this.setState({ list: this.state.zi_comp[data] });
  };
  renderContent = (data) => (
    <div>
      {!isEmpty(this.props.zi_comp) && data.length > 0 ? (
        data.map((item, index) => (
          <TabCard key={index}>
            <div className={'card-header'}>
              <span>{item.subsidiary}</span>
              {item.sub_type && <span className={'sub-title'}>{item.sub_type}</span>}
            </div>
            <div className={'card-body'}>
              <FlexDiv className={'info'}>
                <div className={'title'}>总资产</div>
                <div>{`${
                  !isNaN(item.assets) && item.assets ? formaterNum(Number(item.assets)) : '--'
                }元 `}</div>
              </FlexDiv>
              <FlexDiv className={'info'}>
                <div className={'title'}>营业收入</div>
                <div>{`${
                  !isNaN(item.taking) && item.taking ? formaterNum(Number(item.taking)) : '--'
                }元 `}</div>
              </FlexDiv>
              <FlexDiv className={'info'}>
                <div className={'title'}>净利润</div>
                <div>{`${
                  !isNaN(item.jlr) && item.jlr ? formaterNum(Number(item.jlr)) : '--'
                }元 `}</div>
              </FlexDiv>
            </div>
          </TabCard>
        ))
      ) : (
        <Empty></Empty>
      )}
      {/* <NewBtn data={this.state.tabs} initPage={this.state.initPage} onClickTab={this.onClickTab}></NewBtn> */}
    </div>
  );

  render() {
    const { list } = this.state;
    return (
      <List
        content={
          <TabCardWrap>
            <div className={'select'}>
              <Select
                initText={this.state.initPage}
                data={this.state.tabs}
                onChange={this.changeDate}
              ></Select>
            </div>{' '}
            {this.renderContent(list)}{' '}
          </TabCardWrap>
        }
        onChange={this.onChange}
        title={
          <span>
            <Title top={true}>主要参股控股公司</Title>({list.length})
          </span>
        }
      ></List>
    );
  }
}

const mapStateToProps = (state) => ({
  zi_comp: state.stock.otherData.zi_comp
});
export default connect(mapStateToProps)(ZiCompany);
