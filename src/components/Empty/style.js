import styled from "styled-components";
import {color4, nodata_img} from '@/styles/theme'
export const EmptyContainer = styled.div`
  margin: 12px 0;
  .txt{
    color:${color4};
    font-size: 12px;
  }
`

export const EmptyImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  .img{
    margin: 10px 0;
    width: 170px;
    height: 110px;
    background: url(${nodata_img}) no-repeat center;
    background-size: 100% ;
  }
  .txt{
    color:${color4};
    font-size: 12px;
  }
`