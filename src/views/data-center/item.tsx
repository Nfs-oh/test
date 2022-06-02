import React, { memo } from 'react';
import { Block, TabWrap, Tab, Titlewrap } from './style';
import Tabs from '@/components/NewBtn';
import NewTabs from '../../components/NewTabs';
import Title from '@/components/Title';
import InitChart from '@/components/initEchart';

type IProps = {
  title?: string;
  tabInitPage?: string;
  tabstyle: Record<string, string | number>;
  height?: string;
  tabs: { title: string; key: string }[];
  newTabs: { title: string; key: string }[];
  initPage: string;
  onTabClick: () => void;
  onClickTab: () => void;
  option: any;
  showTab?: boolean;
  text: string | null;
  onClickMore: () => void;
};

const DataItem: React.FC<IProps> = ({
  title = '我是默认标题',
  tabInitPage = '1',
  tabstyle,
  height = '300px',
  tabs,
  newTabs,
  initPage,
  onTabClick,
  onClickTab,
  option,
  showTab = true,
  text = null,
  onClickMore
}) => {
  return (
    <Block>
      <Titlewrap>
        <Title className={'title'}>{title}</Title>
        <span className={'more'} onClick={() => onClickMore()}>
          更多
        </span>
      </Titlewrap>
      {newTabs && (
        <Tab>
          <NewTabs
            initPage={tabInitPage}
            tabs={newTabs}
            onTabClick={onTabClick && onTabClick}
          ></NewTabs>
        </Tab>
      )}
      {text && (
        <div className={'date'}>
          <span>{text}</span>
        </div>
      )}
      <InitChart option={option} height={height}></InitChart>
      {showTab && (
        <TabWrap tabstyle={tabstyle}>
          <Tabs data={tabs} initPage={initPage} onClickTab={onClickTab && onClickTab}></Tabs>
        </TabWrap>
      )}
    </Block>
  );
};

export default memo(DataItem);
