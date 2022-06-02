import styled from "styled-components";
import {color5,color39, bg_color, closeImg, ellipsis_color} from "@/styles/theme";

export const ModalWrapper = styled.div`
  & .am-modal-content{
    background: rgba(0, 0, 0, 0.6);
  }
`
export const ModelContainer = styled.div`
  width: 100vw;
  height: 100%;
  border-radius: 14px 14px 0px 0px;
  background: ${bg_color};
  border-top: 1px solid ${color39};
  overflow: auto;
  box-sizing: border-box;
  .header {
    position: absolute;
    top: 0;
    margin: 10px;
    display: flex;
    margin-bottom: 0px;
    position: relative;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color: ${ellipsis_color};
  }
  .model-title{
    font-weight: blod;
  }

  .model-close{
    width: 16px;
    height: 16px;
    background:url(${closeImg}) no-repeat center;
    background-size: 100%;
  }
  .model-body{
    padding: 0 10px;
  }
  .model-subTitle{
    color: ${color5};
  }
`
