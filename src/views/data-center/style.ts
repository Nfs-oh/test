import styled from 'styled-components';
import { bg_color, color4, ellipsis_color, color3, linear_color, opacity } from '@/styles/theme';
import ico_rightmore from '@/img/overview_slices/ico_rightmore@2x (1).png';

export const Wrap = styled.div`
  padding-top: 10px;
  background-color: ${bg_color};
  min-height: 100vh;
  padding-bottom: 20px;
  .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content {
    height: auto;
    background-color: ${bg_color};
  }
  .am-grid .am-flexbox {
    background-color: ${bg_color};
  }
`;
export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  .grid-item-img {
    width: 28px;
  }

  .grid-item-text {
    margin-top: 10px;
    color: ${color4};
  }
  .am-flexbox {
    overflow: '';
  }
`;
export const Block = styled.div`
  padding: 14px;
  box-sizing: border-box;
  .date {
    margin-bottom: -6px;
    margin-top: 4px;
    text-align: right;
    span {
      display: inline-block;
      font-size: 12px;
      color: ${color3};
      transform: scale(0.9);
    }
  }
`;
export const Titlewrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    position: relative;
    font-size: 18px;
    font-weight: 500;
    color: ${ellipsis_color};
    &:before {
      position: absolute;
      content: '';
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 14px;
      background: ${linear_color};
      opacity: ${opacity};
    }
  }
  .more {
    padding-right: 10px;
    position: relative;
    font-size: 12px;
    color: ${color3};
    &:before {
      content: '';
      position: absolute;
      right: 0;
      top: 3px;
      width: 6px;
      height: 6px;
      background: url(${ico_rightmore}) no-repeat center;
      background-size: 100%;
    }
  }
`;
export const TabWrap = styled.div`
  margin: ${(props) => (props.tabstyle ? ' 10px auto 14px' : '0 auto')};
  width: 240px;
`;

export const Tab = styled.div`
  width: 164px;
  margin: 0 auto;
  width: 164px;
`;
