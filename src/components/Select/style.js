import styled from "styled-components";
import { color4,bg_color1,color5, color22 } from '@/styles/theme'
import arrow_down from '@/img/overview_slices/arrow_down.png';

export const Text = styled.span`
  position:relative;
  padding-left: 6px;
  font-size: 12px;
  color: ${color4};
  :before{
    content: '';
    position: absolute;
    right: -10px;
    top: 3px;
    width: 6px;
    height: 6px;
    background: url(${props => (props.icon || arrow_down)}) no-repeat center;
    background-size: 100%;
  }
`;
export const Select = styled.div`
  position:relative;
  width: ${props=> props.width? props.width: '100px'};
  .container{
    display: flex;
    justify-content: center;
  }
  .list{
    width: 100%;
    font-size: 12px;
    margin: 0; 
    padding: 6px 4px;
    list-style:none;
    box-sizing:border-box;
    position: absolute;
    top: 18px;
    right: -4px;
    background: ${bg_color1};
    box-shadow: 0px 0px 4px 0px ${color22};
    border-radius: 4px;
    z-index: 99;
    li{
      color: ${color4};
      text-align: center;
      padding: 6px 4px;
     &.se-active{
       color:${color5};
     }
    }
  }
`