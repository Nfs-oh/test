import React from 'react';
import './index.css';
import echarts from 'echarts';
// import _ from 'lodash';

type IProps = Record<string, any>;

const Hello: React.FC<IProps> = () => {
  React.useEffect(() => {
    echarts.init;
  }, []);

  return (
    <div id='hello'>
      <span>hello</span>
    </div>
  );
}

export default Hello;