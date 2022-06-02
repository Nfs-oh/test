import React, { useRef, useState, useMemo } from 'react';
import { Flex } from 'antd-mobile';
import Ellipsis from '@/components/Ellipsis/ellipsis';
import { isEmpty } from '@/utils';
import Empty from '@/components/Empty';
import { Block, Item, TextWrap, Content } from '../../style';
import Title from '@/components/Title';
import { connect } from 'react-redux';
const HUCompany = ({ code, companyHE }) => {
  const ellipsis = useRef(null);
  const [line] = useState(3);
  const [info, setInfo] = useState([]);
  const initInfo = () => {
    let arr = [];
    if (code.endsWith('HK')) {
      arr = [
        { title: '上市日期', text: companyHE.ListingDate },
        { title: '所属行业', text: companyHE.SubIndustry },
        { title: '董事会主席', text: companyHE.Chairman },
        { title: '办公地址', text: companyHE.PrincipalOffice }
      ];
    } else {
      arr = [
        { title: '上市日期', text: companyHE.ListingDate },
        { title: '所属行业', text: companyHE.SectorChinese },
        { title: 'CEO', text: companyHE.CEO },
        { title: '员工人数', text: companyHE.EmployeeNumber },
        { title: '成立日期', text: companyHE.FoundedDate },
        { title: '官网', text: companyHE.Website }
      ];
    }
    setInfo(arr);
  };
  useMemo(() => {
    if (!isEmpty(companyHE)) {
      initInfo();
    }
  }, [companyHE]);
  return (
    <Content>
      <Block>
        <Flex align={'center'} justify={'between'}>
          <Title>公司简介</Title>
        </Flex>
        {companyHE.CompanyProfile && (
          <div className={'ellipsis-wrap'}>
            <Ellipsis ref={ellipsis} text={companyHE.CompanyProfile} line={line}></Ellipsis>
          </div>
        )}
      </Block>
      {!isEmpty(companyHE) ? (
        <TextWrap className={'company-info'}>
          {info.map((item, index) => (
            <Item gray key={index}>
              <div className={'title'}>{item.title}</div>
              <span className={'name'}>{item.text || '-'}</span>
            </Item>
          ))}
        </TextWrap>
      ) : (
        <Block>
          <Empty></Empty>{' '}
        </Block>
      )}
    </Content>
  );
};
const mapStateToProps = (state) => ({
  code: state.stock.code,
  companyHE: state.stock.companyHE
});
export default connect(mapStateToProps)(HUCompany);
