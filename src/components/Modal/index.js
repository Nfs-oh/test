
import React from 'react';
import { Modal } from "antd-mobile";
import { ModelContainer,ModalWrapper } from './style'
export default (({ title, visible, content, text = '', onClose, onChange }) => {
	return (
		<ModalWrapper class="model">
			<Modal visible={visible}>
				<ModelContainer>
					<div className={'header'}><span className={'model-close'} onClick={() => onClose && onClose()}></span><span className={'model-title'} style={{ 'font-weight': '500' }}>{title}</span><span className={'model-subTitle'} onClick={() => onChange(text)}>{text}</span></div>
					<div className={'model-body'}>{content}</div>
				</ModelContainer>
			</Modal>
		</ModalWrapper>
	)
})