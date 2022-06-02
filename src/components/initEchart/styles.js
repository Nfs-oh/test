import styled from "styled-components";
import { line_color, color2 , color13, color6} from '@/styles/theme'

export const InitChartConter = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 100%;
`
export const InitChartWrap = styled.div`
  width: 100%;
  display: flex;
  height: ${props => props.Height};
`
export const Table = styled.div`
  width: 100%;
  font-size: 12px;
  border-bottom:1px solid ${line_color};
`

// textColor
export const TableColumn = styled.div`
  display: flex;
  align-items:center;
  &.blod{
    font-weight: 500;
  }
  .column{
    width: 25%;
    // flex:1;
    height: 28px;
    overflow: hidden;
    line-height: 28px;
    // padding: 6px 0;
    box-sizing: border-box;
    text-align: center;
    color: ${props => props.textColor ? props.textColor : color2 };
    border:1px solid ${line_color};
    border-right: none;
    border-bottom: none;
    span{
      display:inline-block;
      font-size: 12px;
      // transform:scale(0.8);
    }
    :last-child{
      border-right:1px solid ${line_color};
    }
    &.row{
      width: 100%;
      padding-left: 4px;
      word-break: break-all;
      text-align:left;
      span{
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .text{
      display: inline-block;
      font-size: 12px;
      transform: scale(.8);
      color: ${props => props.textColor ? props.textColor : ''};
    }
  }
  .icon{
    width: ${props=>props.levelWidth ?props.levelWidth : '15px'};
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    text-align: center;
    border:1px solid ${line_color};
    border-right: none;
    border-bottom: none;
  }
  .circle{
    display: inline-block;
    width: 6px;
    margin: 0 auto;
    height: 6px;
    border-radius: 3px;
    background: ${props => props.iconColor ? props.iconColor : color13};
  }
  .hollow-circle{ // 空心圆
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid ${props => props.iconColor ? props.iconColor : color13};
    background: #fff;
  }
  .rank span{
    color: ${color6};
    font-weight: 500;
  }
`
