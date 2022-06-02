import { createGlobalStyle } from 'styled-components';
import { bg_color, modal_color } from '@/styles/theme';
export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: ${bg_color} !important;
  user-select: none;
}
div,p,span, ul,li, table,ol{
  font-family: "PingFang SC"!important;
}
ul, li, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

body :global(.am-tabs-pane-wrap){
  overflow: visible;
}
.am-modal-content{
    background: ${modal_color};
  }
`;
