import React, { memo, useCallback, useEffect } from 'react';
import HomePoster from './home';
import Header from '@/components/Header';
import ArticlePoster from './article';
import WogooPoster from './wogoo';
import get from 'lodash/get';
import { useHistory } from 'react-router';
import { Container } from './style';
import { hideNaviBar, popNativePage } from '@/utils';
import { getObjectFormSerach } from '@/utils';

type IProps = Record<string, never>;

const MemberShip: React.FC<IProps> = (props) => {
  const searchStr = get(props, 'props.location.search', '');
  const { type = '', from = '', paied = '' } = getObjectFormSerach(searchStr);
  const history = useHistory();

  useEffect(() => {
    hideNaviBar();
  }, []);

  const renderScreen = useCallback(() => {
    switch (type) {
      case 'vip1':
        return <HomePoster />;
      case 'paidReport':
        return <ArticlePoster />;
      case 'wogooRank':
        return <WogooPoster paied={paied} from={from} />;
      default:
        return <HomePoster />;
    }
  }, [type]);

  const back = useCallback(() => {
    if (from === 'wogoo') {
      history.goBack();
    } else {
      popNativePage();
    }
  }, []);

  return (
    <Container>
      <Header title="权益说明" onLeftAction={back} />
      {renderScreen()}
    </Container>
  );
};

export default memo(MemberShip);
