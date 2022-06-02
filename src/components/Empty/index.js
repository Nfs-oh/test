import React from 'react'
// import emptyImg from '@/img/overview_slices/qx_sj@2x.png'
import { EmptyContainer } from './style'
export default (({ text = "暂无数据" }) => {
  return (
    <EmptyContainer>
      {/* <img src={emptyImg} alt={text} /> */}
      <div className={'txt'}>{text}</div>
    </EmptyContainer>
  )
})