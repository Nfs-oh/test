import React, { useEffect, useState } from "react";
import { Block, Content, Table, Eprogress, FlexDiv } from "@/views/wogoo/style";
import { Flex, Progress } from "antd-mobile";
import Title from '@/components/Title'
import { isEmpty, formaterNum } from "@/utils";
import { connect } from "react-redux";
import moment from 'moment'
import Empty from '@/components/Empty'
import Select from '@/components/Select'
const Customer = ({ top5, gykh, showGy }) => {
  const [dateArr, setdateArr] = useState([]);
  const [initPage, setInitPage] = useState([]);
  const [data, setdata] = useState({})
  const [dataSource, setdataSource] = useState([])
  const initkhChart = (top5, gykh) => {
    if (isEmpty(gykh)) { return false }
    let obj = {}
    let date = Object.keys(gykh.kh).sort((a, b) => moment(a) - moment(b))
    for (let i = 0; i < date.length; i++) {
      obj[date[i]] = gykh.gys[date[i]]
    }
    let arr = []
    date.forEach(item => arr.push(item))
    arr = arr.sort((a, b)=> moment(b)- moment(a))
    let init = arr.length > 0 && arr[0]
    let initData = arr.length > 0 && arr[0]
    setInitPage(init)
    setdateArr(arr)
    let initSource = obj[initData]
    setdataSource(initSource)
    setdata(obj)
  };
  const onClickTab = tab => {
    let source = data[tab]
    setdataSource(source)
  }
  useEffect(() => {
    if (!isEmpty(gykh)) {
      initkhChart(top5, gykh);
    }
  }, [top5, gykh]);
  return (
    <Content>
      <Block>
        <FlexDiv align={'center'} justify={'between'}>
          <Title>主要供应商</Title>
          {!showGy &&<Select data={dateArr} initText={ initPage } onChange={onClickTab}></Select>}
        </FlexDiv>
        {showGy ? <Empty /> : <Table>
          <Flex className={'header'} align={'center'} justify={'between'}>
            <div className={'name'}>供应商名称</div>
            <div className={'percent'}>占比</div>
            <div className={'income'}>支付金额(元)</div>
          </Flex>
          {dataSource.map((item, index) => {
            let val = JSON.parse(item.datas)
            return (
              <div key={index}>
                <Flex className={'company'} align={'center'}>
                  <div className={'ranking'}>{item.ranking}</div>
                  <div className={'comp_name'}>{item.comp_name}</div>
                </Flex>
                <Flex className={'header body'} align={'center'} justify={'between'}>
                  <Eprogress className={'name progress'} width={val['供应商收入占比'] === 0}>
                    <Progress percent={val['供应商收入占比']} position="normal" />
                  </Eprogress>
                  <div className={'percent'}>{val['供应商收入占比'] ? Number(val['供应商收入占比']).toFixed(2) + '%' : '未披露'}</div>
                  <div className={'income'}>{val['供应商收入'] === 0 ? '未披露' : formaterNum(val['供应商收入'])}</div>
                </Flex>
              </div>
            )
          }
          )}
        </Table>
        }
        {/* {!showGy && <Tabs data={dateArr} initPage={initPage} onClickTab={onClickTab}></Tabs>} */}
      </Block>
    </Content>
  );
};
const mapStateToProps = (state) => ({
  top5: state.stock.finance.top5,
  gykh: state.stock.finance.gykh,
  showGy: state.stock.finance.showGy
});
export default connect(mapStateToProps)(Customer);
