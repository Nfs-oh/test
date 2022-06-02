import React, { useEffect, useRef } from 'react';
import Modal from './modal'
import ReactDOM from 'react-dom';

const Container = ({
  visible,
  onClose,
  onOverlayClick,
  content
}) => {
  const container = useRef();

  const handleClose = () => {
    if (container.current) {
      ReactDOM.unmountComponentAtNode(container.current);
      container.current.parentNode.removeChild(container.current);
    }
    container.current = null;
  }

  const handleShow = () => {
    container.current = document.createElement('div');
    document.body.appendChild(container.current);
    ReactDOM.render(
      <Modal
        onClose={onClose}
        onOverlayClick={onOverlayClick}
        content={content}
      />,
      container.current
    )
  }

  useEffect(() => {
    if (visible) {
      handleShow();
    } else {
      handleClose()
      onClose && onClose();
    }
    return () => {
      handleClose();
    }
  }, [visible])

  return null;
}

export default React.memo(Container)