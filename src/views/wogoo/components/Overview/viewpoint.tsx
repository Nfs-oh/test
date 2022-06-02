import { Flex } from 'antd-mobile';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Block, Content, ArticleInfo } from '../../style';
import Empty from '@/components/Empty';
import Title from '@/components/Title';
import { connect } from 'react-redux';
import { jumpTo, scrollAnimation } from '@/utils';
//风云观点
const Viewpoint = ({ viewpoint }) => {
  const [text, setText] = useState('点击展开');
  const textRef = useRef();
  const getArticle = (url) => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_WOGOO_SERVER + '/szfyApi/data/getNewArticleInformation',
      params: {
        url: url
      }
    })
      .then((res) => {
        let articleUrl = '';
        if (res.data.resultCode === '00') {
          const { path, id, articleType } = res.data.data;
          articleUrl = path + '?articleId=' + id + '&articleType=' + articleType;
        } else {
          articleUrl = `${process.env.REACT_APP_ARTICLE_URL}?articleId=&articleType=`;
        }
        jumpTo(articleUrl);
      })
      .catch((err) => {
        jumpTo(`${process.env.REACT_APP_ARTICLE_URL}?articleId=&articleType=`);
      });
  };
  const showMore = (text) => {
    if (text === '点击收起' && textRef.current) {
      const inity = document.body.scrollTop + document.documentElement.scrollTop;
      scrollAnimation(inity, textRef.current.offsetTop - 100);
    }
    setText(text === '点击收起' ? '点击展开' : '点击收起');
  };
  return (
    <Content>
      <Block ref={textRef}>
        <Flex align={'center'} justify={'between'}>
          <Title>{'风云观点'}</Title>
        </Flex>
      </Block>
      <Block>
        {viewpoint.length > 0 ? (
          <ArticleInfo>
            {(text === '点击收起' ? viewpoint : viewpoint.slice(0, 5)).map((item, index) => (
              <div className={'content'}>
                <span onClick={() => getArticle(item.url)}>{item.title}</span>
                <span className={'date'}>{item.date}</span>
              </div>
            ))}
            {viewpoint.length >= 5 && (
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
  viewpoint: state.stock.overview.viewpoints
});
export default connect(mapStateToProps)(Viewpoint);
