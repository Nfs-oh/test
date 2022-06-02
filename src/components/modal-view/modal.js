import React from "react";
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import  bwmodel from '@/config/bwmodel'

const Container = styled.div`
  .modal-view-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal-view-content {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateZ(1px);
  }
`;

const Modal = ({content, onOverlayClick}) => {
  const handleClickOverlay = () => {
    onOverlayClick && onOverlayClick();
  }
  const theme = bwmodel.theme === '1'? 'dark': 'light';

  return (
    <ThemeProvider theme={{mode: theme}}>
      <Container>
        <div className="modal-view-mask"/>
        <div onClick={handleClickOverlay} className="modal-view-content">
          {content}
        </div>
      </Container>
    </ThemeProvider>
    
  );
}

export default React.memo(Modal)