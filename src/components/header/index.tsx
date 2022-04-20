import React from 'react';
import './header.less';

type IProps = Record<string, any>;

const Header: React.FC<IProps> = () => {
  return (
    <div id='header'>
      <span>header</span>
      <div className='nav'>nav</div>
    </div>
  );
}

export default Header;