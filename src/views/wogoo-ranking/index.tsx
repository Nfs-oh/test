import React, { useCallback, useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import { Container, Tab } from './style';
import { wogooRankChange } from '@/api/stock';
import StockList from './stock-list';
import store from '@/redux';
import { useHistory } from 'react-router';
import bridge from '@/config/JSbridge';
import { popNativePage, hideNaviBar } from '@/utils';
import { setActoken } from '@/redux/actions';
import Loading from '@/components/loading';

const dateTypeEnum = [
  {
    value: 4,
    name: '按年'
  },
  {
    value: 3,
    name: '按季'
  },
  {
    value: 0,
    name: '按日'
  }
];

const wogooSort = [
  {
    name: '上升TOP50',
    value: 0
  },
  {
    name: '下降TOP50',
    value: 1
  }
];

const WogooRanking50 = () => {
  const [dateType, setDateType] = useState(dateTypeEnum[0]);
  const [sortType, setSortType] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();
  const scrollBodyRef = useRef<HTMLDivElement>();

  const fetchData = () => {
    wogooRankChange({
      page: 1,
      size: 50,
      dimension: dateType.value,
      sortType
    })
      .then((res) => {
        setData(res.content || []);
      })
      .finally(() => {
        setPageLoaded(true);
      });
  };

  useEffect(() => {
    hideNaviBar();
    // 请求token
    bridge.callHandler(
      'nativeEvent',
      {
        event: 'userInfo'
      },
      (params) => {
        if (params) {
          try {
            const data = JSON.parse(params);
            if (data.code === 0) {
              store.dispatch(setActoken(data.params));
              fetchData();
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (pageLoaded) {
      fetchData();
    }
  }, [sortType, dateType]);

  const handleFollowAll = () => {
    const stockCodes = data.map((item) => item.stockCode);
    bridge.callHandler(
      'nativeEvent',
      {
        event: 'stockBatchFollow',
        params: {
          stockCode: stockCodes
        }
      },
      (res) => {
        const params = JSON.parse(res);
        if (params.code === 0) {
          const nextData = [...data];
          nextData.forEach((item) => {
            item.isSelected = true;
          });
          setData(nextData);
        }
      }
    );
  };

  const back = useCallback(() => {
    popNativePage();
  }, []);

  const handleSortChange = (sortValue: number) => {
    if (sortValue === sortType) {
      return;
    }
    setSortType(sortValue);
  };

  const handleSelect = useCallback(
    (index) => {
      if (dateType.value === dateTypeEnum[index].value) {
        return;
      }
      setDateType(dateTypeEnum[index]);
      if (scrollBodyRef.current) {
        scrollBodyRef.current.scrollTop = 0;
      }
    },
    [dateType]
  );

  const handleLinkToDetail = () => {
    history.push('/membership?type=wogooRank&from=wogoo');
  };

  return (
    <Container>
      {!pageLoaded ? (
        <Loading />
      ) : (
        <div className="ranking-box">
          <Header
            onLeftAction={back}
            title="吾股异动"
            rightElem={<div className="ranking-explain" onClick={handleLinkToDetail} />}
          />
          <div className="ranking-nav">
            <div className="ranking-nav-content">
              <Tab>
                {wogooSort.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => handleSortChange(item.value)}
                    className="pane"
                  >
                    <span className={sortType === item.value ? 'tab-active' : ''}>{item.name}</span>
                    {sortType === item.value && <div className="indicator" />}
                  </div>
                ))}
              </Tab>
              <div className="ranking-date-range">
                {dateTypeEnum.map((item, index) => (
                  <div
                    key={item.value}
                    onClick={() => handleSelect(index)}
                    className={`ranking-date-item ${
                      item.value === dateType.value ? 'ranking-date-item-active' : ''
                    }`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={scrollBodyRef} className="ranking-body">
            <StockList data={data} type={sortType} dateType={dateType.value} />
          </div>
          <div className="ranking-footer" onClick={handleFollowAll}>
            <div className="follow-all">一键关注</div>
          </div>
        </div>
      )}
      <div className="ranking-bg" />
      <div className="ranking-bg-img" />
    </Container>
  );
};

export default WogooRanking50;
