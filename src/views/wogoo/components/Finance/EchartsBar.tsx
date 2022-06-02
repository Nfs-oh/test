import React, { memo, useImperativeHandle, forwardRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import Title from '@/components/Title'
import { ChartFun } from "@/components/initEchart";
import {Block,  Content ,  FlexDiv} from '../../style';

import { getOptions, getTableData } from '../const';


const EchartsBar = forwardRef((props,ref) => {
  const { name, echartsData } = props;
  const data = useSelector(state => get(state, name, []));
  const { title } = echartsData
  const options = getOptions(echartsData, data);
  const tableData = getTableData(options);

  const showEmpty = !data || data.length === 0;
  
  const containerRef = useRef();
  useImperativeHandle(ref, () => containerRef.current);

  return (
 
  <Content >
    <Block>
      <FlexDiv style={{paddingBottom: 12}} className={'bottom'}>
        <Title>{title}</Title>
      </FlexDiv>
      <ChartFun option={options} data = {tableData}  height={'180px'} showEmpty={showEmpty}></ChartFun>
    </Block>
  </Content>
  )
})
 
// export default memo(EchartsBar);
export default memo(EchartsBar);
