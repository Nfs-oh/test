// 机构持股分类
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'antd-mobile';
import { isEmpty, formaterNum } from '@/utils';
import Select from '@/components/Select';
import Title from '@/components/Title';
import { Content, FlexDiv, Card, GDprogress } from '../../style';
import Empty from '@/components/Empty';
import moment from 'moment';
class Classification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      initPage: '',
      data: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const { jgInfo } = nextProps;
    if (!isEmpty(jgInfo)) {
      this.init(jgInfo);
    }
  }
  componentDidMount() {
    const { jgInfo } = this.props;
    if (!isEmpty(jgInfo)) {
      this.init(jgInfo);
    }
  }
  init = (data) => {
    let date = [];
    let arr = [];
    data.forEach((item) => {
      date.unshift(item.Date);
    });
    date = date.sort((a, b) => moment(b) - moment(a));
    const initPage = date.length > 0 && date[0];
    this.setState({ date: date });
    this.setState({ initPage: initPage });
    arr = this.filterData(data, initPage);
    this.setState({ data: arr });
  };
  // 过滤数据
  filterData = (data, date) => {
    const arr = data.filter((item) => item.Date === date);
    const dataArr = [];
    arr.forEach((item) => {
      dataArr.push({
        name: '券商',
        shares: item.SecuritiesCorpsHoldPropA,
        sharesNum: item.SecuritiesCorpsHoldingsA
      });
      dataArr.push({
        name: '券商理财产品',
        shares: item.FinanceProductsHoldPropA,
        sharesNum: item.FinanceProductsHoldingsA
      });
      dataArr.push({ name: '基金', shares: item.FundsHoldPropA, sharesNum: item.FundsHoldingsA });
      dataArr.push({
        name: '社保基金',
        shares: item.SocialSecuFundHoldPropA,
        sharesNum: item.SocialSecurityFundHoldA
      });
      dataArr.push({ name: 'QFII', shares: item.QFIIHoldPropA, sharesNum: item.QFIIHoldingsA });
      dataArr.push({
        name: '信托公司',
        shares: item.TrustCompaniesHoldPropA,
        sharesNum: item.TrustCompaniesHoldingsA
      });
      dataArr.push({
        name: '保险',
        shares: item.InsuranceCorpsHoldPropA,
        sharesNum: item.InsuranceCorpsHoldingsA
      });
      dataArr.push({ name: '其他', shares: item.otherHoldPropA, sharesNum: item.otherHoldingsA });
    });
    return dataArr;
  };
  onClickTab = (tab) => {
    let arr = [];
    const { jgInfo } = this.props;
    this.setState({ initPage: tab });
    arr = this.filterData(jgInfo, tab);
    this.setState({ data: arr });
  };

  render() {
    const { date, initPage, data } = this.state;
    const { jgInfo } = this.props;
    return (
      <Content className={'classFily'}>
        <FlexDiv className={'bottom'}>
          <Title>机构持股分类</Title>
          {date && <Select initText={initPage} data={date} onChange={this.onClickTab}></Select>}
        </FlexDiv>
        {jgInfo.length > 0 ? (
          <div>
            <Card>
              {data.length > 0 &&
                data.map((item, key) => (
                  <div className={'container'} key={key}>
                    <div className={'left'}>
                      <div className={'title'}>{item.name}</div>
                      <GDprogress width={!item.shares}>
                        {
                          <Progress
                            percent={`${item.shares ? item.shares : 0}`}
                            position="normal"
                            appearTransition
                          ></Progress>
                        }
                      </GDprogress>
                    </div>
                    <div className={'right'}>
                      <div className={'shares'}>{`${
                        item.sharesNum ? formaterNum(item.sharesNum) + '股' : '-'
                      }`}</div>
                      <div className={`${item.shares ? 'percent' : ''} per`}>{`${
                        item.shares ? item.shares.toFixed(2) + '%' : '-'
                      }`}</div>
                    </div>
                  </div>
                ))}
            </Card>
          </div>
        ) : (
          <Empty></Empty>
        )}
      </Content>
    );
  }
}
const mapStateToProps = (state) => ({
  jgInfo: state.stock.gudongData.jgInfo
});
export default connect(mapStateToProps)(Classification);
