import React, { Component } from 'react';
import { BtnGroup } from './style';

type IProps = {
  initPage: string;
  Style: Record<string, number | string>;
  data: any[];
  onClickTab: (item: any) => void;
};

type IState = {
  active: string | null;
};

class NewBtn extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: null
    };
  }
  onTabClick = (item) => {
    const { onClickTab } = this.props;
    onClickTab && onClickTab(item);
    this.setState({ active: item.key });
  };
  render() {
    const { data, initPage = '1', Style = {} } = this.props;
    const active = this.state.active ? this.state.active : initPage;
    return (
      <BtnGroup>
        {data &&
          data.map((item) => (
            <div
              key={item.key}
              style={Style}
              className={`${active === item.key ? 'active default' : 'default'}`}
              onClick={() => this.onTabClick(item)}
            >
              {' '}
              <span>{item.title}</span>
            </div>
          ))}
      </BtnGroup>
    );
  }
}

export default NewBtn;
