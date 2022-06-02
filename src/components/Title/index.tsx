import React, { memo, ReactElement } from 'react';
import styled from 'styled-components';
import { ellipsis_color, linear_color, opacity } from '@/styles/theme';

type IProps = {
  children: ReactElement;
  top: boolean;
};

const Title = styled.span`
  font-size: 18px;
  display: inline-block;
  font-weight: 500;
  color: ${ellipsis_color};
  position: relative;
  .bg-shadow {
    position: absolute;
    bottom: ${(props: IProps) => (props.top ? '9px' : '0px')};
    left: 0px;
    width: 100%;
    height: 14px;
    z-index: 1;
    background: ${linear_color};
    opacity: ${opacity};
  }
  .text {
    position: relative;
    z-index: 99;
    display: block;
  }
`;

const Component: React.FC<IProps> = ({ children, top }) => (
  <Title top={top}>
    <em className={'bg-shadow'}></em>
    <span className={'text'}>{children}</span>
  </Title>
);

export default memo(Component);
