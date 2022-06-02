import React, { Component } from 'react'
import styled from 'styled-components'
import loading from '@/img/overview_slices/layer1.png'
import loading_img from '@/img/overview_slices/layer2.png'
import shadow from '@/img/overview_slices/shadow1.png'
import loading_img1 from '@/img/overview_slices/shadow2.png'
const LoadingWrap = styled.div`
  height: ${props => props.Height ? props.Height : 'calc(100vh - 40px )'}; 
  display:Flex; 
  align-items:center; 
  justify-content: center; 
  .loading-img {
    width: 20px;
    height: 20px;
    position: relative;
  }
  .loading-img  img {
    position: absolute;
    width: 20px;
    height: 20px;
  }
  .loading-img  img.clockwise {
    animation: clockwise 2s linear infinite;
  }
  .loading-img  img.origin1 {
    transform-origin: 9.4px 9.4px;
  }
  .loading-img  img.origin2 {
    transform-origin: 11px 10.9px;
  }
  .loading-img  img.anticlockwise {
    animation: anticlockwise 2s linear infinite;
  }
  @keyframes clockwise {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
  
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes anticlockwise {
    0% {
      transform: rotate(0deg)
    }
    25% {
      transform: rotate(-90deg)
    }
    50% {
      transform: rotate(-180deg)
    }
    75% {
      transform: rotate(-270deg)
    }
    100% {
      transform: rotate(-360deg)
    }
  }
  .text {
    font-size: 12px;
    line-height: 20px;
    display: inline-block;
    margin-left: 7.5px;
  }
`
export default class Loading extends Component {
  render() {
    const { Height, text = "买股之前搜一搜" } = this.props
    return (
      <LoadingWrap Height={Height}>
        <div className={"loading-img"}>
          <img className={"clockwise origin1"} src={loading} alt={''} />
          <img className={"anticlockwise origin1"} src={loading_img} alt={''} />
          <img className={"clockwise origin2"} src={shadow} alt={''} />
          <img className={"anticlockwise origin2"} src={loading_img1} alt={''} />
        </div>
        <div className={'text'}>{text}</div>
      </LoadingWrap>
    )
  }
}