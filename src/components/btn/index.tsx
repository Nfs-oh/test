import React from 'react';
import { Btn } from './style';

type IProps = {
  onClick: () => void;
  title: string;
};

const Button: React.FC<IProps> = ({
  onClick,
  title,
}) => {
  return (
    <div>
      <Btn onClick={onClick}>{title}</Btn>
    </div>
  );
}

export default Button;