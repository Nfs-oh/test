import React, { useState } from 'react';
import { dpReportItem, callNativePdf } from '@/utils';
import { Flex } from 'antd-mobile';
import { Block, TitleBlock, ListItem } from '../../style';
import Title from '@/components/Title';
import Tabs from '@/components/NewTabs';
const Report = (props) => {
  const { regular, irregular } = props;
  const [activeKey, setActiveKey] = useState('1');
  const openPdf = (data, type) => {
    if (type) {
      const pdfurl = process.env.REACT_APP_PDF_URL;
      data.link = pdfurl + data.PDFid + '.' + data.dataType;
      callNativePdf({ path: data.link, title: data.name + '公告' });
    }
  };
  const regularContent = () => {
    return (
      <div>
        {' '}
        {regular.map((item, index) => {
          if (item.type === 'lirun') {
            return (
              <ListItem key={index}>
                <div className={'title'}>利润表</div>
                {renderItem(dpReportItem(item.list))}
              </ListItem>
            );
          } else if (item.type === 'xianjin') {
            return (
              <ListItem key={index}>
                <div className={'title'}>现金流量表</div>
                {renderItem(dpReportItem(item.list))}
              </ListItem>
            );
          } else if (item.type === 'fuzhai') {
            return (
              <ListItem key={index}>
                <div className={'title'}>资产负债表</div>
                {renderItem(dpReportItem(item.list))}
              </ListItem>
            );
          } else if (item.type === 'zhili') {
            return (
              <ListItem key={index}>
                <div className={'title'}> 公司治理情况</div>
                {renderItem(dpReportItem(item.list))}
              </ListItem>
            );
          } else {
            return '';
          }
        })}
      </div>
    );
  };

  const emptyContent = () => (
    <div>
      <span className={'temp'}>问题不大</span>
    </div>
  );
  const renderItem = (item) => {
    if (item.length === 0) {
      return emptyContent();
    }
    return (
      <div>
        {item.map((temp) => {
          return <div className={temp.value >= 0 ? 'red temp' : 'green temp'}>{temp.text}</div>;
        })}
      </div>
    );
  };
  const irregularContent = (data) => {
    let arr = [];
    arr = data.filter((item) => item.type === 'jgwx');
    arr.push(...data.filter((item) => item.type === 'sszc'));
    arr.push(...data.filter((item) => item.type === 'xs'));
    return arr.map((item, index) => {
      if (item.type === 'jgwx') {
        return (
          <ListItem key={index}>
            <div className={'title'}>近年监管问询函</div> <div>{renderjgwx(item.list)}</div>
          </ListItem>
        );
      } else if (item.type === 'sszc') {
        //
        return (
          <ListItem key={index}>
            <div className={'title'}>12个月内诉讼仲裁情况</div>
            {rendersszc(item.list)}
          </ListItem>
        );
      } else if (item.type === 'xs') {
        //
        return (
          <ListItem key={index}>
            <div className={'title'}>一年内限售股解禁</div>
            {renderxs(item.list)}
          </ListItem>
        );
      } else {
        return '';
      }
    });
  };

  const nodata = () => (
    <div>
      <span className={'temp'}>暂无数据</span>
    </div>
  );
  const renderjgwx = (data) => {
    return data.length === 0
      ? nodata()
      : data.map((item) => (
          <div className={'item'}>
            <span
              className={item.dataType === 'pdf' ? 'link' : 'unlink'}
              onClick={() => openPdf(item, item.dataType === 'pdf')}
            >
              {item.title}
            </span>
            <div className={'date'}>{item.date}</div>
          </div>
        ));
  };
  const rendersszc = (data) => {
    return data.length === 0
      ? nodata()
      : data.map((item) => (
          <div className={'item'}>
            原告方<span>{item.ygf === '--' ? '--' : item.ygf}</span>
            ，被告方<span>{item.bgf === '--' ? '--' : item.bgf}</span>
            ，涉案金额
            <span>{item.saje === '--' ? '--' : parseFloat(item.saje).toFixed(2)}万元</span>
          </div>
        ));
  };
  const renderxs = (data) => {
    return data.length === 0
      ? nodata()
      : data.map((item) => (
          <div className={'item'}>
            <div>
              解禁<span>{item.trad_stocks === '--' ? '--' : item.trad_stocks}</span>万股
              ，占总股本比例
              <span>{parseFloat((item.trad_stocks / item.all_stocks) * 100).toFixed(2)}%</span>
            </div>
            <div className={'date'}>{item.date}</div>
          </div>
        ));
  };
  const tabs = [
    { title: '定期', key: '1' },
    { title: '非定期', key: '2' }
  ];
  const onTabClick = (tab) => {
    setActiveKey(tab.key);
  };
  return (
    <Block>
      <TitleBlock>
        <Flex>
          <Title>重要报告</Title>
        </Flex>
      </TitleBlock>
      <div>
        <Flex align={'center'} justify={'center'} className={'pie'}>
          <Tabs tabs={tabs} onTabClick={onTabClick}></Tabs>
        </Flex>
        {activeKey === '1' ? regularContent(regular) : irregularContent(irregular)}
      </div>
    </Block>
  );
};

export default Report;
