
import React from 'react'
const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
  <svg
    className={`am-icon am-icon-${type} am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={require(`./svg/logo.svg`)} />
  </svg>
);
export default CustomIcon