import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { jumpTo } from '@/utils';
import { useSelector } from 'react-redux';
import bridge from '@/config/JSbridge';
import { wogooRankChange } from '@/api/stock';
import RankingImg from '@/img/membership/ranking-enter.png';

const Container = styled.div`
  width: 113px;
  height: 32px;
  position: absolute;
  right: 0;
  top: 0;
`;

const Img = styled.img`
  width: 113px;
  height: 32px;
`;

const Ranking50Enter = ({ visible }) => {
  const token = useSelector((state) => state.user.accessToken);

  const linkToWogooPoster = () => {
    const url = `${process.env.REACT_APP_DemandUrl}/#/membership?type=wogooRank&paied=0`;
    jumpTo(url);
  };

  const handleClick = useCallback(() => {
    if (token) {
      wogooRankChange({
        page: 1,
        size: 1,
        dimension: 4,
        sortType: 0
      })
        .then(() => {
          const url = `${process.env.REACT_APP_DemandUrl}/#/ranking50`;
          jumpTo(url);
        })
        .catch(() => {
          linkToWogooPoster();
        });
    } else {
      bridge.callHandler(
        'nativeEvent',
        {
          event: 'login',
          params: {
            refreshOnBack: false
          }
        },
        () => {}
      );
    }
  }, [token]);

  return (
    <div>
      {visible ? (
        <Container onClick={handleClick}>
          <Img src={RankingImg} alt="" />
        </Container>
      ) : null}
    </div>
  );
};

export default memo(Ranking50Enter);
