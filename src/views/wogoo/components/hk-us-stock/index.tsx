import React from 'react';
import Viewpoint from './viewpoint';
import { HKStock } from '../../style';
import Company from './company';

const HKUSStock = () => {
  return (
    <HKStock>
      <Viewpoint></Viewpoint>
      <Company></Company>
    </HKStock>
  );
};

export default HKUSStock;
