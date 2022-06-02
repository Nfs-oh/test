import { Flex } from 'antd-mobile';
import React, { useState } from 'react';
import { Block, Title, Content, ArticleInfo } from '../../style';
import Empty from '@/components/Empty';
import { connect } from 'react-redux';
import { jumpTo } from '@/utils';
import moment from 'moment';
//风云观点
const Viewpoint = ({ viewpoint }) => {
  const [text, setText] = useState('点击展开');
  const getArticle = (url) => {
    jumpTo(url);
  };
  const showMore = (text) => {
    setText(text === '点击收起' ? '点击展开' : '点击收起');
  };
  return (
    <Content>
      <Block>
        <Flex align={'center'} justify={'between'}>
          <Title>风云观点</Title>
        </Flex>
      </Block>
      <Block>
        {viewpoint && viewpoint.length > 0 ? (
          <ArticleInfo>
            {(text === '点击收起' ? viewpoint : viewpoint.slice(0, 5)).map((item, index) => (
              <div className={'content'} key={index}>
                <span onClick={() => getArticle(item.articleUrl)}>{item.title}</span>
                <span className={'date'}>{moment(item.releaseTime).format('YYYY-MM-DD')}</span>
              </div>
            ))}
            {viewpoint.length > 5 && (
              <div className={'show-more'} onClick={() => showMore(text)}>
                <span className={text === '点击收起' ? 'up' : 'down'}>{text}</span>
              </div>
            )}
          </ArticleInfo>
        ) : (
          <Empty></Empty>
        )}
      </Block>
    </Content>
  );
};
const mapStateToProps = (state) => ({
  viewpoint: state.stock.overview.list
});
export default connect(mapStateToProps)(Viewpoint);
