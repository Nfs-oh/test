import React from 'react'
import { EmptyImgContainer } from './style'
export default (({ text = "暂无数据" }) => {
  return (
    <EmptyImgContainer>
      <div className={'img'} ></div>
      <div className={'txt'}>{text}</div>
    </EmptyImgContainer>
  )
})