import React, { Component } from 'react';
import Tabs from '@/components/NewTabs/NewTabs';
import Overview from './components/Overview';
import Finance from './components/Finance';
import Industry from './components/Industry';
import Shareholder from './components/Shareholder';
import HKUSStock from './components/hk-us-stock';
import Other from './components/Other';
import { Footer, Wrap } from './style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getOverview,
  getFinance,
  getIndustryData,
  getGudongData,
  getOtherData,
  setCode,
  getHKUSStock
} from '@/redux/stock/actions';
import get from 'lodash/get';

type IProps = {

};

type IState = {
  id: number;
};

const tabs = [
  { title: '总览', key: '1' },
  { title: '财务', key: '2' },
  { title: '行业', key: '3' },
  { title: '股东', key: '4' },
  { title: '其他', key: '5' }
];

class Wogoo extends Component<IProps, IState> {
  initialPage: string;

  constructor(props) {
    super(props);
    this.initialPage = '1';
    const id = get(props, 'props.match.params.id', '');
    let showTab = true;
    if (id.endsWith('.HK') || id.endsWith('.US')) {
      showTab = false;
    }
    this.state = {
      tab: { title: '总览', key: '1' },
      showTab,
      id
    };
  }

  getData() {
    const { id, showTab } = this.state;
    const { user } = this.props;
    if (!showTab) {
      const data = {
        Code: id.split('.')[0],
        companyType: ''
      };
      if (id.endsWith('HK')) {
        data.companyType = 'HK';
      }
      if (id.endsWith('US')) {
        data.companyType = 'US';
      }
      this.props.getHKUSStock(data);
    } else {
      const data = {
        code: id,
        user_id: user.userId,
        industryType: 'wg',
        industry_wg: '',
        timeInterval: '12'
      };
      this.props.getOverview(data);
    }
  }

  componentDidMount() {
    const { id } = this.state;
    this.props.setCode(id);
    this.getData();
  }

  renderContent = (tab) => {
    switch (tab.key) {
      case '1':
        return <Overview></Overview>;
      case '2':
        return <Finance></Finance>;
      case '3':
        return <Industry></Industry>;
      case '4':
        return <Shareholder></Shareholder>;
      case '5':
        return <Other></Other>;
      default:
        return '';
    }
  };
  tabClick = (tab) => {
    window.scrollTo(0, 0);
    this.setState({ tab: tab });
    const { params } = this.props.props.match;
    this.props.setCode(params.id);
    const { getOverview, getFinance, getIndustryData, getGudongData, user, getOtherData } =
      this.props;
    const data = {
      code: params.id,
      user_id: user.userId,
      industryType: 'wg',
      industry_wg: '',
      timeInterval: '12'
    };
    switch (tab.key) {
      case '1':
        getOverview(data);
        break;
      case '2':
        getFinance(data);
        break;
      case '3':
        getIndustryData(data);
        break;
      case '4':
        getGudongData(data);
        break;
      case '5':
        getOtherData(data);
        break;
      default:
        getOverview(data);
    }
  };
  render() {
    const { showTab, tab } = this.state;
    return (
      <Wrap>
        <div
          className="container"
          style={!showTab ? { overflow: 'hidden' } : { overflow: 'visible' }}
        >
          {showTab && (
            <div className={'tab-wrap'}>
              <Tabs
                Fixed={true}
                initialPage={this.initialPage}
                onTabClick={(tab) => this.tabClick(tab)}
                type={'0'}
                tabs={tabs}
                width="100%"
              ></Tabs>
            </div>
          )}
          {showTab ? this.renderContent(tab) : <HKUSStock></HKUSStock>}
          <Footer className={'footer'}>
            <div>
              本页面信息是基于公开数据汇总计算结果，市值风云力求但不保证数据的准确性、完整性和及时性，请谨慎参考。本页面中的信息或所表述的意见不构成任何投资建议，市值风云不对因使用本页面信息所采取的任何行动承担任何责任。
            </div>
          </Footer>
        </div>
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = (dispatch) => ({
  getOverview: bindActionCreators(getOverview, dispatch),
  getFinance: bindActionCreators(getFinance, dispatch),
  getIndustryData: bindActionCreators(getIndustryData, dispatch),
  getGudongData: bindActionCreators(getGudongData, dispatch),
  getOtherData: bindActionCreators(getOtherData, dispatch),
  setCode: bindActionCreators(setCode, dispatch),
  getHKUSStock: bindActionCreators(getHKUSStock, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Wogoo);
