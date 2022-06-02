import styled from 'styled-components';

import {
  color40,
  split_color2,
  split_color3,
  color18,
  ellipsis_color,
  linear_color,
  opacity
} from '@/styles/theme';

export const CardContent = styled.div`
  margin-top: 10px;
`;
export const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${ellipsis_color};
  position: relative;
  z-index: 88;
  line-height: 25px;
  margin-bottom: 12px;
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

export const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #9696a6;
  line-height: 17px;
  margin-right: 10px;
  flex-shrink: 0;
`;

export const Content = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${color40};
  line-height: 17px;
`;

export const Text = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${color40};
  line-height: 22px;
`;

export const Card = styled.div`
  // padding-top: 2px;
  padding-left: 15px;
  padding-right: 7px;
  padding-bottom: 12px;
  .full-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .manager-content {
    font-size: 14px;
    font-weight: 400;
    color: ${color40};
    line-height: 20px;
  }
  .text-link {
    color: #427cff;
  }
`;

export const Split = styled.div`
  height: 8px;
  // background: ${split_color3};
`;

export const Label = styled.div`
  width: 47px;
  height: 16px;
  background: ${(props) => `rgba(${props.color}, 0.1)`};
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  color: ${(props) => `rgb(${props.color})`};
  line-height: 16px;
  text-align: center;
  margin-right: 6px;
`;

export const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #9696a6;
  line-height: 17px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => (props.noMargin ? '0' : '8px')};
`;

export const MangerBox = styled.div`
  .title-wrap {
    padding-left: 15px;
    padding-right: 7px;
    // margin-top: 16px;
  }
  .namager-item {
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 8px;
  }
  .split {
    height: 1px;
    background: ${split_color2};
    margin-top: 8px;
    margin-bottom: 12px;
  }
  .date {
    padding-left: 15px;
    font-size: 12px;
    font-weight: 400;
    color: #9696a6;
    line-height: 17px;
    margin-bottom: 18px;
  }
  .text-link {
    color: #427cff;
  }
  .manager-content {
    font-size: 14px;
    font-weight: 400;
    color: ${color40};
    line-height: 20px;
  }
`;

export const Footer = styled.div`
  padding: 24px 7px 40px 15px;
  font-size: 12px;
  line-height: 18px;
  color: ${color18};
`;
