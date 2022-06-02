import React from 'react';
import { HomeContainer } from './style';
import PosterImg1 from '@/img/membership/poster-1@2x.png';
import TitleIcon1 from '@/img/membership/bt_left@2x.png';
import TitleIcon2 from '@/img/membership/bt_right@2x.png';

import ItemImg1 from '@/img/membership/ico_bibei@2x.png';
import ItemImg2 from '@/img/membership/ico_duli@2x.png';
import ItemImg3 from '@/img/membership/ico_dujia@2x.png';
import ItemImg4 from '@/img/membership/ico_quanmian@2x.png';

import ItemYB1 from '@/img/membership/hyqy_ybjx@2x.png';
import ItemYB2 from '@/img/membership/hyqy_wgyd@2x.png';
import CheckImg from '@/img/membership/check-circle@2x.png';

import FitGroup1 from '@/img/membership/ico_fit-group1@2x.png';
import FitGroup2 from '@/img/membership/ico_fit-group2@2x.png';

import QRTitleImgLeft from '@/img/membership/ewmzs_left@2x.png';
import QRTitleImgRight from '@/img/membership/ewmzs_right@2x.png';
import StormQRCode from '@/img/membership/storm_qrcode.jpg';

const HomePoster = () => {
  return (
    <HomeContainer>
      <img src={PosterImg1} className="poster-1" alt="" />
      <div className="poster-title">
        <img src={TitleIcon1} className="title-icon" alt="" />
        <span className="title-text">内容优势</span>
        <img src={TitleIcon2} className="title-icon" alt="" />
      </div>
      <div className="poster-content">
        <div className="content-item">
          <div>
            <img src={ItemImg1} className="content-item-img" alt="" />
          </div>
          <div className="content-explain">
            <div className="item-title">必备</div>
            <div className="item-desc">注册制时代的优质研究基础设施</div>
          </div>
        </div>
        <div className="content-item">
          <div>
            <img src={ItemImg2} className="content-item-img" alt="" />
          </div>
          <div className="content-explain">
            <span className="item-title">独立</span>
            <span className="item-desc">独立公正，说真话讲事实</span>
          </div>
        </div>
        <div className="content-item">
          <div>
            <img src={ItemImg3} className="content-item-img" alt="" />
          </div>
          <div className="content-explain">
            <span className="item-title">独家</span>
            <span className="item-desc">独家数据库模型和独家方法论</span>
          </div>
        </div>
        <div className="content-item">
          <div>
            <img src={ItemImg4} className="content-item-img" alt="" />
          </div>
          <div className="content-explain">
            <span className="item-title">全面</span>
            <span className="item-desc">历时5年，凝聚3000+公司深度研报</span>
          </div>
        </div>

        <div className="poster-title">
          <img src={TitleIcon1} className="title-icon" alt="" />
          <span className="title-text">会员权益</span>
          <img src={TitleIcon2} className="title-icon" alt="" />
        </div>
      </div>

      <div className="poster-card">
        <div className="card-content">
          <div>
            <img className="card-bg" src={ItemYB1} alt="" />
          </div>

          <div className="card-item-wrap">
            <div className="card-item">
              <img className="card-item-img" src={CheckImg} alt="" />
              <span className="card-item-text">每月会员专属研报</span>
            </div>
            <div className="card-item">
              <img className="card-item-img" src={CheckImg} alt="" />
              <span className="card-item-text">通俗易懂，有趣更有料</span>
            </div>
            <div className="card-item">
              <img className="card-item-img" src={CheckImg} alt="" />
              <span className="card-item-text">有干货有深度，久经考验</span>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div>
            <img className="card-bg" src={ItemYB2} alt="" />
          </div>
          <div className="card-item-wrap">
            <div className="card-item">
              <img className="card-item-img" src={CheckImg} alt="" />
              <span className="card-item-text">覆盖全量的上市公司底层数据</span>
            </div>
            <div className="card-item">
              <img className="card-item-img" src={CheckImg} alt="" />
              <span className="card-item-text">吾股排名每日更新，第一时间追踪最新动态</span>
            </div>
            <div className="card-item">
              <img className="card-item-img" src={CheckImg} alt="" />
              <span className="card-item-text">
                优选吾股排名上升（下降）幅度最大的前50家上市公司
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="more">更多权益敬请期待</div>

      <div className="poster-title title-margin-fixed">
        <img src={TitleIcon1} className="title-icon" alt="" />
        <span className="title-text">团队介绍</span>
        <img src={TitleIcon2} className="title-icon" alt="" />
      </div>

      <div className="team-wrap">
        <div className="team-desc">
          <div className="team-desc-dot">●</div>
          <div>研究团队核心成员主要由基金经理、资深审计师、上市公司董秘、对冲基金研究员等组成</div>
        </div>
        <div className="team-desc">
          <div className="team-desc-dot">●</div>
          <div>研究经验丰富，覆盖A股、港股、美股全球市场</div>
        </div>
      </div>

      <div className="poster-title title-margin-fixed">
        <img src={TitleIcon1} className="title-icon" alt="" />
        <span className="title-text">适合人群</span>
        <img src={TitleIcon2} className="title-icon" alt="" />
      </div>

      <div className="fit">
        <div className="fit-group">
          <img className="fit-img" src={FitGroup1} alt="" />
          <div className="fit-text">长期投资者</div>
        </div>
        <div className="fit-split" />
        <div className="fit-group">
          <img className="fit-img" src={FitGroup2} alt="" />
          <div className="fit-text">金融从业人员</div>
        </div>
      </div>

      <div className="poster-title title-margin-fixed2">
        <img src={QRTitleImgLeft} className="qr-title-icon" alt="" />
        <span className="title-text">企业微信二维码</span>
        <img src={QRTitleImgRight} className="qr-title-icon" alt="" />
      </div>

      <div className="qr-wrap">
        <div className="qr-code-wrap">
          <div>
            <img src={StormQRCode} alt="" className="qr-code-img" />
          </div>
        </div>
        <div className="qr-text">微信扫一扫，添加风云小助手咨询</div>
      </div>
    </HomeContainer>
  );
};

export default HomePoster;
