import React, { useState } from 'react';
import TextCollapse from '@/components/TextCollapse';

type IProps = {
  text: string;
};

const FundManager: React.FC<IProps> = ({ text }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div style={{ paddingRight: '8px' }}>
      <TextCollapse
        text={text}
        line={5}
        lineHeight={20}
        textClass="manager-content"
        collapseBtn={<span className="text-link">{collapse ? '展开' : '收起'}</span>}
        onCollapse={(collase: boolean) => setCollapse(collase)}
      />
    </div>
  );
};

export default FundManager;
