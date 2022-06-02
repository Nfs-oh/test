import styled from "styled-components";
import { color2, color40, back_img, bg_color } from '@/styles/theme';

export const Container = styled.div`
  width: 100%;
  height: 44px;
  .header-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    box-sizing: border-box;
    height: 44px;
    background-color: ${bg_color};
    z-index: 100;
  }
  .header-left-wrap {
    background-image: url(${back_img});
    width: 12px;
    height: 20px;
    background-size: contain;
  }
  .header-content-wrap {
    font-size: 16px;
    font-weight: 600;
    color: ${color2};
  }
  .header-right-wrap {
    font-size: 14px;
    font-weight: 400;
    color: ${color40};
  }
`;