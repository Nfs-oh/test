import styled from 'styled-components';
import styles from '@/styles';
import warn_img from '@/img/overview_slices/ico_warning@2x.png';
import ico_jysj from '@/img/overview_slices/ico_jysj.png';
import ico_PDF from '@/img/overview_slices/ico_PDF@2x.png';
import ico_zhankai from '@/img/overview_slices/ico_zhankai.png';
import ico_shouqi from '@/img/overview_slices/ico_shouqi.png';
import ico_rightmore from '@/img/overview_slices/ico_rightmore@2x (1).png';
import scale2x from '@/img/overview_slices/scale2x.png';
import {
  bg_color,
  ellipsis_color,
  color2,
  color3,
  color4,
  color6,
  color5,
  color11,
  color12,
  color13,
  color14,
  color15,
  color17,
  color18,
  color20,
  color23,
  color38,
  color39,
  borderColor3,
  bgimg1,
  borderColor5,
  report_color,
  cardColor1,
  cardColor2,
  cardColor3,
  cardNodataColor,
  opacity,
  linear_color,
  nodata_img
} from '@/styles/theme';
export const Wrap = styled.div`
  // overflow:hidden;
  background: ${bg_color};
  .tab-wrap {
    position: relative;
    height: 52px;
  }
`;
export const Block = styled.div`
  margin: 0 15px;
  color: ${ellipsis_color};
  height: ${(props) => (props.Height ? props.Height : 'auto')};
  .wrap {
    margin: 20px 0;
  }
  .more {
    font-size: 12px;
    font-weight: 500;
    color: ${color3};
    padding-right: 10px;
    position: relative;
  }
  .more:before {
    content: '';
    position: absolute;
    right: 0;
    top: 3px;
    width: 6px;
    height: 6px;
    background: url(${ico_rightmore}) no-repeat center;
    background-size: 100%;
  }
  .end {
    font-size: 12px;
    position: relative;
    color: ${(props) => (props.end ? color23 : color6)};
    &:before {
      position: absolute;
      content: '';
      width: 12px;
      height: 12px;
      top: 0;
      left: -18px;
      background: ${(props) => (props.end ? `url(${ico_jysj}) no-repeat` : '')};
      background-size: 100%;
    }
  }
  .tab-wraps {
    margin: 0 auto;
    width: 238px;
  }
  .wraps {
    margin: 0 auto;
    width: 320px;
  }
  .pie {
    margin: 0 auto;
    width: 180px;
  }
  .ellipsis-wrap {
    margin: 14px 0;
    font-size: 14px;
    line-height: 1.6;
    color: ${ellipsis_color};
  }
  .text-link {
    color: ${color5};
  }
  .gray {
    color: ${color4};
  }
  .mark {
    span {
      display: inline-block;
      font-size: 14px;
      color: ${color14};
      // transform: scale(1);
    }
  }
  .border-bottom {
    margin-bottom: 10px;
    border-bottom: 1px solid ${borderColor5};
  }
`;
export const Rank = styled.div`
  width: 100%;
  .data-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .data-empty-img {
    width: 170px;
    height: 110px;
    background-image: url(${nodata_img});
    background-size: contain;
  }
  .data-empty-text {
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
    line-height: 17px;
    margin-top: 12px;
  }
`;
export const Cards = styled.div`
  height: 104px;
  padding: 12px;
  background: url(${bgimg1}) no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  color: ${cardColor3};
  .title {
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: ${cardColor3};
  }
  .avarage {
    font-size: 12px;
    color: ${cardColor1};
  }
  .info {
    font-size: 12px;
  }
  .ranking {
    font-size: 38px;
    font-weight: 500;
    color: ${cardColor2};
  }
  .num {
    font-size: 12px;
    font-weight: 500;
  }
  .tip {
    line-height: 14px;
    font-size: 12px;
    color: ${cardNodataColor};
  }
  .delist {
    font-size: 12px;
    font-weight: 400;
    color: ${cardNodataColor};
    line-height: 17px;
  }
`;
export const Footer = styled.div`
  &.footer {
    padding: 20px 10px 60px;
    color: ${color18};
    font-size: 12px;
    line-height: 20px;
  }
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${ellipsis_color};
  position: relative;
  z-index: 88;

  .bg-shadow {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 14px;
    z-index: 1;
    background: ${linear_color};
    opacity: ${opacity};
  }
`;
export const Item = styled.div`
  margin: 6px 0;
  font-size: 12px;
  color: ${color2};
  display: flex;
  .title {
    width: 124px;
    margin-right: 10px;
    color: ${(props) => (props.gray ? color4 : color2)};
  }
  .name {
    width: calc(100% - 134px);
  }
  .text-link {
    color: ${color5};
  }
  .more-than {
    color: ${styles.color11};
  }
  .less-than {
    color: ${styles.color30};
  }
`;
export const TitleBlock = styled(Block)`
  margin: 16px 0 0 0;
`;
export const ListItem = styled(Item)`
  border-bottom: 1px solid ${borderColor3};
  padding: 10px 0;
  font-size: 12px;
  color: ${color2};
  div {
    flex: 3;
    &.title {
      flex: 1;
      line-height: 24px;
      color: ${report_color};
    }
    .item {
      width: 100%;
      margin-bottom: 10px;
    }
    .red {
      color: ${styles.color31};
    }
    .green {
      color: ${styles.color15};
    }
    .temp {
      line-height: 24px;
    }
    .unlink {
      line-height: 24px;
    }
    .link {
      color: ${color5};
      line-height: 20px;
    }
    .date {
      font-weight: 400;
      font-size: 12px;
      color: ${color4};
    }
  }
`;

export const WarnTip = styled.div`
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px 12px 8px 12px;
  box-sizing: border-box;
  background: ${styles.color29};
  .warning {
    position: relative;
    padding-left: 16px;
    font-size: 12px;
    box-sizing: border-box;
    font-weight: 400;
    color: ${styles.color32};
    line-height: 20px;
    &:before {
      position: absolute;
      content: '';
      top: 3px;
      left: 0;
      width: 12px;
      height: 12px;
      line-height: 12px;
      background: url(${warn_img}) no-repeat;
      background-size: 100%;
    }
  }
`;
export const ArticleInfo = styled.div`
  padding: 10px 0;
  .content {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    span {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 24px;
      font-size: 14px;
      color: ${color2};
      &.date {
        font-size: 12px;
        line-height: 20px;
        color: ${color4};
      }
    }
  }

  .show-more {
    text-align: center;
    color: ${color5};
    span {
      position: relative;
      &:before {
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        right: -15px;
        top: 4px;
      }
      &.down:before {
        background: url(${ico_zhankai}) no-repeat;
        background-size: 100%;
      }
      &.up:before {
        background: url(${ico_shouqi}) no-repeat;
        background-size: 100%;
      }
    }
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const CheckboxWrap = styled.div``;
export const BtnWrap = styled.div`
  margin-bottom: 16px;
  display: flex;
  background: ${bg_color};
  flex-wrap: wrap;
  .btn {
    margin: 2px 6px 10px 0;
    width: 22.6%;
    height: 24px;
    border-radius: 12px;
    border: 1px solid ${borderColor5};
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
  }
  .btn:nth-child(4n) {
    margin-right: 0;
  }
  .btn-active {
    color: #ffb000;
    border: 1px solid #ffb000;
  }
`;

export const SubTitle = styled.div`
  margin: 15px 0;
  margin-bottom: ${(props) => (props.mat ? props.mat : '15px')};
  font-size: 12px;
  color: ${color38};
  .point {
    color: ${color6};
  }
  .green {
    color: ${color15};
  }
`;

// 容器类
export const Container = styled.div`
  min-height: calc(100vh - 180px);
`;
export const Content = styled.div`
  margin-bottom: 20px;
  margin-top: ${(props) => (props.margin ? props.margin : '32px')};
  .mark {
    margin-left: 10px;
    font-size: 14px;
    color: ${color14};
    transform: scale(0.8);
  }
  .info {
    margin-top: 10px;
    color: ${color38};
  }
  &.classFily {
    margin-top: 32px;
  }
  .more-than {
    color: ${color11};
  }
  .less-than {
    color: ${color15};
  }
  .tab-wrap {
    margin: 0 auto;
    width: 238px;
  }

  .subTitle {
    margin-top: 10px;
  }
`;

export const TextWrap = styled.div`
  margin: 16px 0;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${styles.backgroundColor1};
`;
export const Blocks = styled(Block)`
  margin: 0 16px;
  .wrap {
    width: 100%;
    margin: 10px 0;
  }
  .flex {
    height: 40px;
    position: relative;
  }
  .tab-wrap {
    position: absolute;
    right: 50%;
    margin-right: -82px;
  }
  .am-tabs {
    justify-content: center;
    width: 164px;
  }
`;

export const Info = styled.div`
  margin: 10px 0;
`;
export const ChartWrap = styled.div`
  position: relative;
  margin: 10px 0;
  .wrap{
    display: flex;
    align-items: 
    margin: 0 0 10px;
    justify-content: ${(props) => (props.position ? props.position : 'space-between')};
    /* text-align: center; */
  }
  .title{
    font-size: 12px;
    text-align: center;
    position: relative;
  }
  .active:before{
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    bottom: 2px;
    background: ${styles.color19};
  }
  .icon-button{
    position: absolute;
    right: 20px;
    bottom: 50px;
    display: flex;
    .icon{
      margin-right: 10px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius:50%;
      background: #F5F8FF;
      color: #357df3;
    }
  }
  .chart{
    position: relative;
  }
  .chart:before{
    position: absolute;
    bottom: 38px;
    right: 8%;
    content: "";
    width: 15px;
    height: 15px;
    background: url(${scale2x}) no-repeat center;
    background-size: 100%;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.right ? 'flex-end' : 'space-between')};
  padding-bottom: 6px;
  .progress {
    .am-progress-bar {
      border-width: 3px;
    }
  }
`;
export const Card = styled.div`
  margin: 15px 0;
  .container {
    padding: 10px 0;
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: space-between;
    color: ${ellipsis_color};
  }
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    flex: 1.8;
    margin-right: 10px;
    justify-content: space-between;
  }
  .right {
    flex: 1;
    justify-content: flex-end;
  }
  .left .title {
    width: 74px;
  }

  .right .per,
  .right .shares,
  .left .title {
    text-align: right;
  }
  .right .per {
    width: 30%;
    margin-left: 10px;
  }
  .right .percent {
    color: ${color23};
  }
  .right.shares {
    width: calc(100% - 30% -10px);
  }
`;
export const GDprogress = styled.div`
  margin-left: 10px;
  flex: 1.5;
  height: 10px;
  .am-progress-outer {
    border-radius: 0 3px 3px 0;
    background: ${color12};
  }
  .am-progress-bar {
    background: ${color13};
    border: 5px solid ${(props) => (props.width ? color12 : color13)};
    border-radius: 0 3px 3px 0;
  }
`;

export const ListCard = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 10px 16px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  color: ${ellipsis_color};
  background: ${color17};
  border-radius: 8px;
  .date {
    font-size: 12px;
    color: ${color4};
  }
  .title {
    flex: 2;
    font-size: 14px;
    line-height: 20px;
    margin-right: 20px;
  }
  .ellipsis {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
export const TabCard = styled.div`
  margin-bottom: 10px;
  border: 1px solid ${color20};
  border-radius: 8px;
  font-size: 12px;
  color: ${ellipsis_color};
  .sub-title {
    display: inline-block;
    font-size: 12px;
    color: ${color5};
    padding: 2px;
    border-radius: 4px;
    transform: scale(0.8);
    border: 1px solid ${color5};
  }
  .card-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-weight: 900;
    box-sizing: border-box;
    background: ${color20};
    height: 36px;
  }
  .card-body {
    padding: 0 16px;
  }
  .info {
    padding: 8px 0;
  }
  .right {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .progress {
      width: 60px;
      height: 6px;
      margin-right: 6px;
      border-radius: 2px;
      margin-bottom: 4px;
    }
    .progresss {
      width: 60px;
      height: 2px;
      margin-right: 12px;
      border-radius: 2px;
      margin-bottom: 4px;
    }
    .progress .am-progress-outer {
      border-radius: 5px;
    }

    .progress .am-progress-bar {
      border-radius: 2px;
      background: ${color13};
      border: 5px solid ${color13};
    }
    .progresss .am-progress-outer {
      border-radius: 3px;
      background-color: ${color12};
    }
    .progresss .am-progress-bar {
      border-radius: 2px;
      background: ${color13};
      border: 3px solid ${color13};
    }
  }
`;

export const Cell = styled.div`
  display: flex;
  height: 100%;
  color: ${ellipsis_color};
  align-items: center;
  &.center {
    text-align: center;
    justify-content: center;
  }
  &.date {
    justify-content: flex-end;
    font-size: 12px;
    color: ${color4};
  }
  &.paixu {
    align-items: baseline;
    justify-content: flex-end;
  }
  .fz12 {
    font-size: 12px;
  }
  &.right {
    box-sizing: border-box;
    justify-content: flex-end;
  }
  &.left {
    box-sizing: border-box;
    justify-content: flex-start;
  }
  &.wrap-cell {
    box-sizing: border-box;
    font-size: 12px;
    line-height: 14px;
    white-space: normal;
  }
  &.text {
    padding: 0 8px;
  }
  .rank {
    color: ${styles.color24};
  }
  .ranks {
    font-size: 12px;
    color: ${color4};
    transform: scale(0.7);
    transform-origin: left;
  }
  .title {
    max-width: 210px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .icon {
    padding-left: 14px;
    padding-top: 14px;
    margin-right: 6px;
    background: url(${ico_PDF}) no-repeat center;
    background-size: 14px;
  }
  .add {
    color: ${styles.color11};
  }
  .reduce {
    color: ${styles.color21};
  }
  .blue {
    color: ${styles.color5};
  }
  &.link {
    color: ${color5};
  }
  .text-ellipsis {
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    line-height: 16px;
    white-space: normal;
    justify-content: start;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .ellipsis {
    white-space: normal;
    justify-content: start;
    display: -webkit-box;
    overflow: hidden;
    line-height: 16px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  &.type {
    justify-content: flex-end;
  }
  .mart {
    margin-bottom: 12px;
  }
  &.rankNum {
    color: ${styles.color35};
  }
  .rank-text {
    margin-top: -22px;
  }
  .name-wrap {
    width: 100%;
  }
  .text {
    padding-top: 18px;
  }
  .text-right {
    text-align: right;
  }
  &.text {
    justify-content: start;
  }
  &.stock {
    padding-top: 6px;
    padding-left: 4px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: flex-start;
    line-height: 15px;
    font-size: 14px;
    .code {
      display: inline-block;
      margin-left: -6px;
      font-size: 12px;
      transform: scale(0.8);
      color: ${color4};
    }
  }
  .cell-wrap {
    padding-right: 10px;
    box-sizing: border-box;
  }
  .num {
    display: block;
    text-align: right;
  }
  .color-icon {
    background: ${(props) => (props.color ? props.color : '')};
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  &.fz12 {
    font-size: 12px;
  }
`;
export const TabCardWrap = styled.div`
  .select {
    margin: 10px 0;
    display: flex;
    display: flex;
    justify-content: flex-end;
  }
`;

export const Message = styled.div`
  display: inline-flex;
  border-radius: 3px;
  height: 24px;
  line-height: 24px;
  background: ${(props) => (props.color ? styles.color27 : '')};
  color: ${styles.color28};
  .text {
    font-size: 12px;
    transform: scale(0.8);
  }
`;
export const TableContainer = styled.div`
  width: 100%;
  margin-top: -20px;
  /* padding: 0 15px; */
  box-sizing: border-box;
`;

export const Table = styled.div`
  margin: 10px 0;
  font-size: 12px;
  border-top: none;
  .header {
    color: ${color4};
    line-height: 30px;
    .name {
      width: calc(100% - 142px);
      padding-left: 18px;
      text-align: left;
    }
    .percent {
      width: 70px;
      text-align: center;
    }
    .income {
      width: 74px;
      text-align: right;
    }
  }
  .ranking {
    width: 18px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
  .comp_name {
    line-height: 20px;
    white-space: normal;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .body {
    color: ${ellipsis_color};
  }
`;

export const Eprogress = styled.div`
  &.progress {
    border-radius: 3px;
  }
  &.progress .am-progress-outer {
    border-radius: 3px;
    background-color: ${color12};
  }
  &.progress .am-progress-bar {
    border: 4px solid ${(props) => (props.width ? color12 : color13)};
    border-radius: 3px 0px 0px 3px;
  }
`;
export const NavContent = styled.div`
  width: 100%;
  margin-top: 122px;
`;
export const Nav = styled.div`
  width: 100%;
  top: 50px;
  left: 0;
  padding: 2px 15px 0;
  box-sizing: border-box;
  position: ${(props) => (props.position ? props.position : 'static')};
  z-index: 9999;
`;

export const HKStock = styled.div`
  min-height: calc(100vh - 160px);
`;

export const SmallText = styled.span`
  display: inline-block;
  font-size: 12px;
  color: ${color39};
  /* transform: scale(.8); */
`;
