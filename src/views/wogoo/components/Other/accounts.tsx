import React, { useState, useEffect } from 'react';
import { Progress } from 'antd-mobile';
import List from '@/components/List';
import { FlexDiv, TabCard, TabCardWrap } from '../../style';
import { isEmpty, formaterNum } from '@/utils';
import Title from '@/components/Title';
import Select from '@/components/Select';
import Empty from '@/components/Empty';

import { connect } from 'react-redux';

const Accounts = ({ yyq }) => {
  const [qtys, setQtys] = useState({});
  const [yfzk, setYfzk] = useState({});
  const [qtysList, setQtysList] = useState([]);
  const [yfzkList, setyfzkList] = useState([]);
  const [yszkList, setYszkList] = useState([]);
  const [yszk, setYszk] = useState([]);
  const [date1, setdate1] = useState([]);
  const [date2, setdate2] = useState([]);
  const [date3, setdate3] = useState([]);
  //格式化时间
  const dateFormate = (data) => {
    const arr = [];
    Object.keys(data).forEach((item) => {
      arr.push(item);
    });
    return arr;
  };
  const initData = (yyq) => {
    if (!isEmpty(yyq)) {
      const tabs1 = !isEmpty(yyq.yszk) && dateFormate(yyq.yszk);
      const tabs2 = !isEmpty(yyq.qtys) && dateFormate(yyq.qtys);
      const tabs3 = !isEmpty(yyq.yfzk) && dateFormate(yyq.yfzk);
      setYfzk(yyq.yfzk);
      setQtys(yyq.qtys);
      setYszk(yyq.yszk);

      tabs1.length > 0 && setdate1(tabs1.sort().reverse());
      tabs2.length > 0 && setdate2(tabs2.sort().reverse());
      tabs3.length > 0 && setdate3(tabs3.sort().reverse());
      tabs1.length > 0 && setYszkList(yyq.yszk[tabs1[0]]);
      tabs2.length > 0 && setQtysList(yyq.qtys[tabs2[0]]);
      tabs3.length > 0 && setyfzkList(yyq.yfzk[tabs3[0]]);
    }
  };
  useEffect(() => {
    initData(yyq);
  }, [yyq]);
  const changeDate1 = (data) => {
    setYszkList(yszk[data]);
  };
  const changeDate2 = (data) => {
    setQtysList(qtys[data]);
  };
  const changeDate3 = (data) => {
    setyfzkList(yfzk[data]);
  };
  const renderYszk = (data) => (
    <div>
      {data && data.length > 0 ? (
        data.map((item, index) => {
          const temp = JSON.parse(item.datas);

          return (
            <TabCard key={index}>
              <div className={'card-header'}>
                <span>
                  {index + 1}.{item.comp_name}
                </span>
              </div>
              <div className={'card-body'}>
                {Object.keys(temp).map(
                  (i, key) =>
                    !isNaN(temp[i]) && (
                      <FlexDiv key={key} className={'info'}>
                        <div className={'title'}> {i}</div>
                        <div className={'right'}>
                          {i.includes('比例') && (
                            <span className={'progresss'}>
                              <Progress percent={temp[i]} position="normal" />
                            </span>
                          )}
                          <span>
                            {i.includes('比例')
                              ? temp[i] + '%'
                              : (temp[i] !== 'None' ? formaterNum(Number(temp[i])) : '--') + '元'}
                          </span>
                        </div>
                      </FlexDiv>
                    )
                )}
              </div>
            </TabCard>
          );
        })
      ) : (
        <Empty></Empty>
      )}
    </div>
  );
  return (
    <div>
      <List
        content={
          <TabCardWrap>
            <div className={'select'}>
              <Select
                initText={date1.length > 0 && date1[0]}
                data={date1.length > 0 && date1}
                onChange={changeDate1}
              ></Select>
            </div>{' '}
            {renderYszk(yszkList)}{' '}
          </TabCardWrap>
        }
        title={
          <span>
            <Title top={true}>应收账款前五</Title>({yszkList.length})
          </span>
        }
      ></List>
      <List
        content={
          <TabCardWrap>
            <div className={'select'}>
              <Select
                initText={date2.length > 0 && date2[0]}
                data={date2.length > 0 && date2}
                onChange={changeDate2}
              ></Select>{' '}
            </div>{' '}
            {renderYszk(qtysList)}{' '}
          </TabCardWrap>
        }
        title={
          <span>
            <Title top={true}>其他应收前五</Title>({qtysList.length})
          </span>
        }
      ></List>
      <List
        content={
          <TabCardWrap>
            <div className={'select'}>
              <Select
                initText={date3.length > 0 && date3[0]}
                data={date3.length > 0 && date3}
                onChange={changeDate3}
              ></Select>
            </div>
            {renderYszk(yfzkList)}
          </TabCardWrap>
        }
        title={
          <span>
            <Title top={true}>预付账款前五</Title>({yfzkList.length})
          </span>
        }
      ></List>
    </div>
  );
};
const mapStateToProps = (state) => ({
  yyq: state.stock.otherData.yyq
});
export default connect(mapStateToProps)(Accounts);
