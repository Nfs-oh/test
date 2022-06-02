import React from 'react';
import Wogoo from './index';
import Fund from '../fund';
import get from 'lodash/get';

const NewVersionIndex = (props) => {
  const id = get(props, 'props.match.params.id', '');
  const type = get(props, 'props.match.params.type', '');
  const routeProps = {
    match: {
      params: {
        id
      }
    }
  };
  if (type === '2') {
    // 基金
    return <Fund props={routeProps} />;
  }
  return <Wogoo props={routeProps} />; // 股票
};

export default NewVersionIndex;
