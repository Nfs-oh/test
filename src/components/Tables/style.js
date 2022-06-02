import styled from "styled-components";
import ico_arrow_up from '../../img/overview_slices/ico_arrow_up.png'
import ico_arrow_down from '../../img/overview_slices/ico_arrow_down.png'
import ico_arrow_n from '../../img/overview_slices/ico_arrow_n.png'
import styles from "@/styles";
export const Sort = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.ico_arrow_up, .ico_arrow_n,.ico_arrow_down {
		position:relative;
		top: -4px;
	}
  .ico_arrow_up:before, .ico_arrow_n:before,.ico_arrow_down:before {
		position: absolute;
		content: '';
		width:  8px;
		height: 8px;
		background: url(${ico_arrow_up}) no-repeat center;
		background-size: 100%;
	}
	.ico_arrow_n:before{
		background-image: url(${ico_arrow_n}) ;
	}
	.ico_arrow_down:before{
		background-image: url(${ico_arrow_down}) ;
	}
	.value{
		color: ${styles.color4};
	}
`