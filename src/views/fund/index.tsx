import React from 'react';
import get from 'lodash/get';
import { getFundData } from '@/api/fund';
import { useFetch } from '@/hooks';
import { getDisplayNum } from '@/utils';
import Empty from '@/components/Empty';
import FundManager from './components/fundManager';
import Title from '@/components/Title';
import {
  MangerBox,
  CardContent,
  Row,
  SubTitle,
  Content,
  Card,
  Split,
  Label,
  Footer
} from './components/styles';

type IProps = {

};

const Fund: React.FC<IProps> = (props: IProps) => {
  const fundId = get(props, 'props.match.params.id', '');
  const code = fundId.split('.')[0];
  const [data] = useFetch(getFundData, { FundCode: code }, { managerList: [] });

  const getText = (item) => {
    return item.ManagerName + (item.PersonalData ? `，${item.PersonalData}` : '');
  };

  return (
    <div style={{ paddingTop: '16px' }}>
      <Card>
        <Title>基本信息</Title>
        <CardContent>
          <Row>
            <SubTitle>基金全称</SubTitle>
            <Content className="full-name">{data.FundShortName}</Content>
          </Row>
          <Row style={{ alignItems: 'center' }}>
            <SubTitle>基金类型</SubTitle>
            <Row noMargin>
              <Label color="255, 64, 88">{data.MarketClassify}</Label>
              <Label color="53, 125, 243">{data.ModeClassify}</Label>
              <Label color="248, 128, 59">{data.UnderlyingClassify}</Label>
            </Row>
          </Row>
          <Row>
            <SubTitle>成立日期</SubTitle>
            <Content>{data.NVStartDate}</Content>
          </Row>
          <Row>
            <SubTitle>资产规模</SubTitle>
            <Content>{getDisplayNum(data.NetAssetsValue)}</Content>
          </Row>
          <Row>
            <SubTitle>基金管理人</SubTitle>
            <Content>{data.fundAdvisorName}</Content>
          </Row>
          <Row>
            <SubTitle>基金托管人</SubTitle>
            <Content>{data.fundCustodian}</Content>
          </Row>
        </CardContent>
      </Card>
      {/* <Split /> */}
      <MangerBox>
        <div className="title-wrap">
          <Title>基金经理</Title>
        </div>
        <CardContent>
          {data.managerList.length > 0 &&
            data.managerList.map((item, index) => (
              <div key={item.ManagerID}>
                <div className="namager-item">
                  <FundManager text={getText(item)} />
                </div>
                <div className="date">{item.AccessionDate}至今</div>
                {index !== data.managerList.length - 1 && <div className="split" />}
              </div>
            ))}
          {data.managerList.length === 0 && (
            <div style={{ paddingLeft: '16px' }}>
              <Empty style={{ paddingLeft: '16px' }} />
            </div>
          )}
        </CardContent>
      </MangerBox>

      <Split />
      <Card>
        <Title>投资理念</Title>
        <CardContent>
          {data.InvestmentGoal && <FundManager text={data.InvestmentGoal} />}
          {!data.InvestmentGoal && <Empty />}
        </CardContent>
      </Card>
      <Split />
      <Card>
        <Title>投资战略</Title>
        <CardContent>
          {data.InvestmentGoal && <FundManager text={data.InvestmentStrategy} />}
          {!data.InvestmentStrategy && <Empty />}
        </CardContent>
      </Card>
      {/* <Split /> */}
      <Footer class="annoucement-footer">
        本页面信息是基于公开数据汇总计算结果，市值风云力求但不保证数据的准确性、完整性和及时性，请谨慎参考。本页面中的信息或所表述的意见不构成任何投资建议，市值风云不对因使用本页面信息所采取的任何行动承担任何责任。
      </Footer>
    </div>
  );
}

export default Fund;
