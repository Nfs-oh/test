import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HomeContainer = styled.div`
  background-color: #222126;
  color: #ffd3a3;
  overflow-y: scroll;
  .poster-1 {
    width: 100%;
  }
  .poster-title {
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 29px;
  }
  .title-icon {
    width: 34px;
  }
  .title-text {
    font-size: 20px;
    font-weight: normal;
    line-height: 27px;
    padding: 0 8px;
  }
  .poster-content {
    padding: 0 22px;
    margin-bottom: 40px;
  }
  .content-item {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }
  .content-item:last-child {
    margin-bottom: 0;
  }
  .content-item-img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
  .content-explain {
    display: flex;
    flex-direction: column;
  }
  .item-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
  .item-desc {
    font-size: 13px;
    font-weight: 300;
    line-height: 18px;
    margin-top: 2px;
  }
  .poster-card {
    padding: 0 16px;
  }
  .card-content {
    box-sizing: border-box;
    padding: 4px 4px 3px 4px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #564b41;
  }
  .card-bg {
    width: 100%;
    height: 96px;
  }
  .card-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  }
  .card-item-wrap {
    margin-top: 12px;
    padding: 0 8px 13px 11px;
  }
  .card-item:last-child {
    margin-bottom: 0;
  }
  .card-item-img {
    width: 14px;
    height: 14px;
    margin-right: 9px;
  }
  .card-item-text {
    font-size: 12px;
    font-weight: 400;
    color: #d2af89;
    line-height: 17px;
  }
  .more {
    font-size: 12px;
    font-weight: 400;
    color: #6f665f;
    line-height: 17px;
    text-align: center;
    margin-top: 12px;
  }
  .title-margin-fixed {
    margin-top: 40px;
  }
  .team-wrap {
    margin-top: 20px;
    padding: 0 24px;
  }
  .team-desc {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
  }
  .team-desc-dot {
    margin-right: 8px;
  }

  .fit {
    display: flex;
    flex-direction: row;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .fit-group {
    flex: 1;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid #564b41;
  }
  .fit-split {
    width: 15px;
  }
  .fit-img {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
  .fit-text {
    font-size: 14px;
    font-weight: 400;
  }

  .title-margin-fixed2 {
    margin-top: 57px;
  }

  .qr-wrap {
    margin-top: 20px;
    padding-bottom: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .qr-title-icon {
    width: 27px;
  }
  .qr-text {
    margin-top: 20px;
    font-size: 12px;
    font-weight: 400;
  }
  .qr-code-wrap {
    width: 136px;
    height: 136px;
    border-radius: 8px;
    border: 1px solid #63584c;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qr-code-img {
    width: 120px;
    height: 120px;
  }
`;

export const ArticleContainer = styled.div`
  background: #052162;
  color: #5482ff;
  overflow-y: scroll;
  .poster-3 {
    width: 100%;
  }
  .article-title {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .article-title-fixed1 {
    margin-top: 0px;
  }
  .title-icon {
    width: 6px;
    height: 6px;
  }
  .title-text {
    font-size: 18px;
    font-weight: 500;
    color: #5482ff;
    line-height: 25px;
    margin-left: 8px;
    margin-right: 8px;
  }
  .trade-wrap {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 16px;
  }
  .trade-img {
    width: 343px;
  }
  .article-reason {
    margin-top: 24px;
  }
  .article-reason-item {
    display: flex;
    align-items: center;
    padding: 0 19px 0 21px;
    margin-bottom: 27px;
  }
  .reason-img-wrap {
    margin-right: 12px;
  }
  .reason-img {
    width: 36px;
    height: 36px;
  }
  .reason-text {
    font-size: 14px;
    font-weight: 400;
    color: #5482ff;
    line-height: 20px;
  }

  .article-price {
    font-size: 12px;
    font-weight: 400;
    color: #446ee0;
    line-height: 26px;
    text-align: center;
    margin-top: 2px;
  }
  .price-table {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 1px;
    padding-bottom: 68px;
  }
  .price-table-img {
    width: 345px;
  }
`;

export const WogooContainer = styled.div`
  background: #1c1c28;
  color: #ff5040;
  flex: 1;
  overflow-y: scroll;
  .wogoo-poster-body {
    padding-bottom: calc(50px + env(safe-area-inset-bottom));
  }
  .fixed-wogoo-bottom {
    padding-bottom: 70px;
  }
  .wogoo-poster-footer {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    padding-bottom: 20px;
    padding-bottom: env(safe-area-inset-bottom);
    padding-right: 16px;
    box-sizing: border-box;
    padding-left: 16px;
    display: flex;
    justify-content: center;
    background-color: #1c1c28;
  }

  .fixed-bottom {
    padding-bottom: 20px;
  }
  .poster-2 {
    width: 100%;
  }
  .wogoo-title {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 29px;
  }
  .wogoo-title-fixed1 {
    margin-top: 12px;
  }
  .title-icon {
    width: 25px;
  }
  .title-text {
    font-weight: normal;
    padding: 0 8px;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
  }

  .wogoo-avoid {
    padding: 0 16px;
    box-sizing: border-box;
  }
  .wogoo-avoid-img {
    width: 100%;
  }

  .wogoo-card {
    flex: 1;
    height: 173px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: 1px solid #666666;
    overflow: hidden;
  }
  .wogoo-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #373752;
  }
  .reason-img {
    width: 44px;
    height: 44px;
    margin-top: 24px;
  }
  .wogoo-card-title {
    font-size: 14px;
    font-weight: 500;
    color: #e7e7e7;
    line-height: 20px;
    margin-top: 12px;
    margin-bottom: 22px;
  }
  .wogoo-card-desc {
    height: 51px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
    line-height: 17px;
    background: #2a2a42;
    padding: 0 6px;
    text-align: center;
  }
  .card-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding: 0 31px;
  }
  .card-split {
    width: 20px;
  }
  .label-group {
    margin-top: 8px;
    width: 212px;
    height: 17px;
  }
  .wogoo-table {
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .wogoo-table-img {
    width: 100%;
  }
  .wogoo-title-fixed2 {
    margin-bottom: 9px;
  }
  .link-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background: linear-gradient(270deg, #f3bb6d 0%, #f7e2c3 100%);
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
    color: #78511c;
  }
  .wogoo-exp {
    padding: 11px 19px 30px 19px;
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
    line-height: 17px;
  }
`;
