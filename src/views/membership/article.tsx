import React from 'react';
import { ArticleContainer } from './style';
import ArticleBg from '@/img/membership/bg_ybjx@2x.png';

import Dot from '@/img/membership/zs_btyb@2x.png';
import Reason1 from '@/img/membership/ico_bxly1@2x.png';
import Reason2 from '@/img/membership/ico_bxly1@2x.png';
import Reason3 from '@/img/membership/ico_bxly1@2x.png';
import Reason4 from '@/img/membership/ico_bxly1@2x.png';
import Reason5 from '@/img/membership/ico_bxly1@2x.png';

import TradeBG from '@/img/membership/bg_td@2x.png';
import PriceBG from '@/img/membership/price_bg@2x.png';

const ArticlePoster = () => {
  return (
    <ArticleContainer>
      <img src={ArticleBg} className="poster-3" alt="" />

      <div className="article-title article-title-fixed1">
        <img src={Dot} className="title-icon" alt="" />
        <span className="title-text">解决注册制时代交易痛点</span>
        <img src={Dot} className="title-icon" alt="" />
      </div>

      <div className="trade-wrap">
        <img src={TradeBG} alt="" className="trade-img" />
      </div>

      <div className="article-title">
        <img src={Dot} className="title-icon" alt="" />
        <span className="title-text">必选理由</span>
        <img src={Dot} className="title-icon" alt="" />
      </div>

      <div className="article-reason">
        <div className="article-reason-item">
          <div className="reason-img-wrap">
            <img className="reason-img" src={Reason1} alt="" />
          </div>
          <div className="reason-text">历时5年，凝聚3025家公司深度研报，4107家公司独立评级</div>
        </div>
        <div className="article-reason-item">
          <div className="reason-img-wrap">
            <img className="reason-img" src={Reason2} alt="" />
          </div>
          <div className="reason-text">通俗易懂，有趣又有料</div>
        </div>
        <div className="article-reason-item">
          <div className="reason-img-wrap">
            <img className="reason-img" src={Reason3} alt="" />
          </div>
          <div className="reason-text">研究标的覆盖3000多家上市公司</div>
        </div>
        <div className="article-reason-item">
          <div className="reason-img-wrap">
            <img className="reason-img" src={Reason4} alt="" />
          </div>
          <div className="reason-text">独立公正，讲真话说事实</div>
        </div>
        <div className="article-reason-item">
          <div className="reason-img-wrap">
            <img className="reason-img" src={Reason5} alt="" />
          </div>
          <div className="reason-text">研报准确率达到80~90%</div>
        </div>
      </div>

      <div className="article-title">
        <img src={Dot} className="title-icon" alt="" />
        <span className="title-text">每月会员专属研报免费看</span>
        <img src={Dot} className="title-icon" alt="" />
      </div>

      <div className="article-price">（单篇99元，每月至少4篇，解锁会员年省4612元起）</div>
      <div className="price-table">
        <img className="price-table-img" src={PriceBG} alt="" />
      </div>
    </ArticleContainer>
  );
};

export default ArticlePoster;
