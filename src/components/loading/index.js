import React, { Component } from 'react'
import styled from 'styled-components'
import {ellipsis_color, loading_img} from '@/styles/theme'
const LoadingWrap = styled.div`
  height:calc(100vh - 40px ); 
  display: flex; 
  align-items:center; 
  justify-content: center; 
  flex-direction: column;
  .loading-img  .img {
    width: 100px;
    height: 100px;
    background: url(${loading_img}) no-repeat center;
    background-size: 100% ;
  }
  .text {
    margin-top: 12px;
    font-size: 12px;
    line-height: 20px;
    color: ${ellipsis_color};
  }
`
export default class Loading extends Component {
  render() {
    const { text = "买股之前搜一搜" } = this.props
    return (
      <LoadingWrap>
        <div className={"loading-img"}>
          <div className={"img"} ></div>
        </div>
        <div className={'text'}>{text}</div>
      </LoadingWrap>
    )
  }
}