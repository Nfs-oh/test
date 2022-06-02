import styled from "styled-components";
import {bg_color, ellipsis_color} from '@/styles/theme'
export const List = styled.div`
	background: ${bg_color};
	margin-bottom: 10px;
	.am-accordion::before, .am-accordion .am-accordion-item .am-accordion-header::after, .am-accordion .am-accordion-item .am-accordion-content .am-accordion-content-box::after  {
		background-color: transparent!important;
	}
	.am-accordion .am-accordion-item .am-accordion-header {
		padding-left: 0;
		background: ${bg_color};
	}
	.am-accordion .am-accordion-item .am-accordion-header i{
		right: 0;
		width: 8px;
		height: 8px;
	}
	.am-accordion .am-accordion-item .am-accordion-header span{
		color: ${ellipsis_color};
	}
	.am-accordion .am-accordion-item .am-accordion-content{
		background: ${bg_color};
	}
`