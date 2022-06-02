import styled from 'styled-components';
import {
  color40,
  borderColor7,
  modal_color,
  ranking_linear_color,
  backgroundColor6,
  ranking_img,
  ranking_bg
} from '@/styles/theme';

export const Container = styled.div`
  padding-bottom: constant(safe-area-inset-bottom);
  .ranking-bg {
    top: 0;
    left: 0;
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: ${ranking_linear_color};
  }
  .ranking-bg-img {
    top: 0;
    left: 0;
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 136px;
    background: url(${ranking_bg}) no-repeat center;
    background-size: cover;
  }
  .header-container {
    background: unset;
  }
  .ranking-body {
    flex: 1;
    overflow-y: scroll;
  }
  .ranking-box {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ranking-explain {
    width: 22px;
    height: 22px;
    background: url(${ranking_img}) no-repeat center;
    background-size: contain;
  }
  .ranking-nav {
    padding-bottom: 80px;
  }
  .ranking-nav-content {
    width: 100%;
    position: fixed;
    top: 44px;
    left: 0;
    z-index: 10;
  }
  .ranking-footer {
    width: 100%;
    padding-top: 5px;
    padding-bottom: 20px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
  }
  .follow-all {
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
  .range {
  }
  .arrow-title {
    margin-right: 4px;
  }

  .ranking-date-range {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    height: 40px;
  }
  .ranking-date-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 26px;
    background: ${backgroundColor6};
    border-radius: 13px;
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
    line-height: 17px;
    margin-right: 8px;
  }
  .ranking-date-item-active {
    color: #ffb000;
    background: rgba(255, 200, 0, 0.1);
    opacity: 0.73;
  }

  .follow-icon {
    width: 24px;
    height: 24px;
  }
  .bg-img {
    background-size: contain;
  }
  .blur-border {
    border-bottom: 1px solid ${borderColor7};
    position: relative;
  }
  .vip-container {
    position: absolute;
    z-index: 99;
    width: 100%;
    left: 0;
    bottom: -62px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .stock-wrap {
    max-width: 108px;
    min-width: 80px;
  }
  .se-active {
    color: #ffb000 !important;
  }
  .stock-name {
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-top: 9px;
  }
  .stock-code-wrap {
    margin-top: 4px;
    display: flex;
    flex-direction: row;
  }
  .stock-prefix {
    width: 15px;
    height: 12px;
    border-radius: 1px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
  }
  .stock-prefix-text {
    font-size: 12px;
    transform: scale(0.75);
    color: #fff;
    font-weight: 600;
  }
  .stock-code {
    font-size: 12px;
    color: #9696a6;
    line-height: 14px;
  }
  .stock-item {
    height: 56px;
    color: ${color40};
  }

  .stock-content-follow {
    min-width: 39px;
  }
  .stock-item-follow {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .stock-number {
    font-size: 15px;
    font-weight: 400;
    line-height: 56px;
    box-sizing: border-box;
  }
  .vip-container {
    position: absolute;
    z-index: 99;
    width: 100%;
    left: 0;
    bottom: -62px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .vip-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon-png {
    width: 30px;
    height: 30px;
    margin-right: 12px;
  }
  .vip-text {
    font-size: 16px;
    font-weight: 500;
    color: #cd9650;
    line-height: 22px;
  }
  .data-visible {
    position: relative;
  }
  .blur-wrap {
    filter: blur(3px);
  }
  td {
    border-bottom: 1px solid ${borderColor7};
  }
  .rank-up {
    color: #ff4058;
  }
  .rank-donw {
    color: #00c8ac;
  }
  .th {
    height: 33px;
  }
`;

export const Tab = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  padding: 0 11px;
  color: #9696a6;
  .tab-active {
    color: #ffc800;
    font-weight: 500;
  }
  .pane {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 15px;
    line-height: 21px;
    margin-right: 20px;
    height: 100%;
  }
  .indicator {
    position: absolute;
    width: 14px;
    height: 3px;
    background: #ffc800;
    border-radius: 2px;
    bottom: 0;
    left: 33px;
  }
`;

export const Alert = styled.div`
  width: 280px;
  background-color: ${modal_color};
  border-radius: 14px;
  backdrop-filter: blur(15px);
  padding: 13px 18px;
  box-sizing: border-box;
  .alert-title {
    color: ${color40};
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
  .alert-content {
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
    line-height: 20px;
    margin-top: 8px;
  }
`;
