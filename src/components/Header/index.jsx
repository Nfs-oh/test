import React, { memo } from 'react';
import { Container } from './style';

const Header = ({
  contentElem,
  onLeftAction,
  title,
  titleClass,
  wrapClass,
  rightElem
}) => {
  return (
    <Container className={wrapClass || ''}>
      <div className='header-container'>
        {onLeftAction && <div className='header-left-wrap' onClick={onLeftAction} />}
        <div className='header-content-wrap'>{contentElem || (<span className={titleClass || ''}>{title}</span>)}</div>
        <div className='header-right-wrap'>{rightElem || null}</div>
      </div>
    </Container>
  );
}

export default memo(Header);