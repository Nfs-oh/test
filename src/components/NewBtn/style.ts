import styled from 'styled-components';
import { color1, color4, borderColor5, nav_active, nav_active_bg } from '@/styles/theme';
export const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .default {
    display: flex;
    width: 56px;
    height: 24px;
    /* background: ${color1}; */
    color: ${color4};
    border-radius: 15px;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    margin: 0 2px;
    border: 1px solid ${borderColor5};
  }
  .default span {
    display: inline-block;
    font-size: 12px;
    transform: scale(0.9);
  }
  .active {
    width: 56px;
    height: 24px;
    color: ${nav_active};
    background: ${nav_active_bg};
    border: none;
  }
`;
