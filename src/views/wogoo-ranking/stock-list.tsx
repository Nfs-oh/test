import React, { memo, useState, useEffect, useMemo } from 'react';
import { Container } from './style';
import { getStockLabelColor } from '@/utils';
import bridge from '@/config/JSbridge';
import DislikePng from '@/img/overview_slices/ico_dislike@2x.png';
import LikePng from '@/img/membership/ico_like@2x.png';
import DataTable from './data-table';
import styles from '@/styles';

const StockList = ({ data, type, dateType }) => {
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    const nextFollows = data.map((item) => !!item.isSelected);
    setFollows(nextFollows);
  }, [data]);

  const handleLintToStock = (stockCode) => {
    window.location.href = 'storm://app/stock/detail?stockcode=' + stockCode;
  };

  const handleFollowClick = (item, index) => {
    const isFollow = follows[index];
    const stockCode = item.stockCode;
    if (isFollow) {
      cancelFollow(stockCode, () => {
        const nextFollows = [...follows];
        nextFollows[index] = false;
        setFollows(nextFollows);
      });
    } else {
      batchedFollow([stockCode], () => {
        const nextFollows = [...follows];
        nextFollows[index] = true;
        setFollows(nextFollows);
      });
    }
  };

  const batchedFollow = (stockCodes, callback) => {
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
          callback();
        }
      }
    );
  };

  const cancelFollow = (stockCode, callback) => {
    bridge.callHandler(
      'nativeEvent',
      {
        event: 'stockCancelFollow',
        params: {
          stockCode: [stockCode]
        }
      },
      (res) => {
        const params = JSON.parse(res);
        if (params.code === 0) {
          callback();
        }
      }
    );
  };

  const columns = useMemo(
    () => [
      {
        key: 1,
        dataKey: 'stockName',
        renderItem: (item) => {
          return (
            <div
              key={item.id}
              className="stock-item stock-wrap"
              onClick={() => handleLintToStock(item.stockCode)}
            >
              <div className="stock-name">{item.stockName}</div>
              <div className="stock-code-wrap">
                <div
                  className="stock-prefix"
                  style={{ backgroundColor: getStockLabelColor(item.stockCode.split('.')[1]) }}
                >
                  <span className="stock-prefix-text">{item.stockCode.split('.')[1]}</span>
                </div>
                <div className="stock-code">{item.stockCode.split('.')[0]}</div>
              </div>
            </div>
          );
        },
        style: {
          paddingLeft: 16
        }
      },
      {
        key: 2,
        dataKey: 'oldRanking',
        style: {
          minWidth: 70,
          textAlign: 'center'
        },
        renderItem: (item) => {
          return (
            <div
              style={{ textAlign: 'center' }}
              className="stock-number stock-item"
              key={item.id}
              onClick={() => handleLintToStock(item.stockCode)}
            >
              {item.oldRanking ? item.oldRanking : '-'}
            </div>
          );
        }
      },
      {
        key: 3,
        dataKey: 'nowRanking',
        style: {
          textAlign: 'center'
        },
        renderItem: (item) => {
          return (
            <div
              style={{ textAlign: 'center' }}
              className="stock-number stock-item"
              key={item.id}
              onClick={() => handleLintToStock(item.stockCode)}
            >
              {item.nowRanking ? item.nowRanking : '-'}
            </div>
          );
        }
      },
      {
        key: 4,
        dataKey: 'volatility',
        style: {
          textAlign: 'center'
        },
        renderItem: (item) => {
          return (
            <div className="stock-content-score" onClick={() => handleLintToStock(item.stockCode)}>
              <div
                style={{ textAlign: 'center' }}
                className={`stock-number stock-item ${type === 0 ? 'rank-up' : 'rank-donw'}`}
              >
                {item.volatility ? Math.abs(item.volatility) : '-'}
              </div>
            </div>
          );
        }
      },
      {
        key: 5,
        style: {
          minWidth: 40,
          textAlign: 'right',
          paddingRight: 16
        },
        renderItem: (item, index) => {
          return (
            <div className="stock-content-follow">
              <div className="stock-item-follow stock-item" key={item.id}>
                {follows[index] ? (
                  <img
                    onClick={() => handleFollowClick(item, index)}
                    className="follow-icon"
                    src={LikePng}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={() => handleFollowClick(item, index)}
                    className="follow-icon"
                    src={DislikePng}
                    alt=""
                  />
                )}
              </div>
            </div>
          );
        },
        dataKey: 'volatility'
      }
    ],
    [data, follows]
  );

  const head = useMemo(
    () => [
      {
        title: '名称',
        style: {
          textAlign: 'left',
          paddingLeft: 16
        }
      },
      {
        title: dateType === 0 ? '上季' : '上期'
      },
      {
        title: '本期'
      },
      {
        title: type === 0 ? '上升名次' : '下降名次'
      },
      {
        title: '关注',
        style: {
          textAlign: 'right',
          paddingRight: 16
        }
      }
    ],
    [type, dateType]
  );

  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        head={head}
        sticky
        stickyBG={styles.ranking_linear_color1}
      />
    </Container>
  );
};

export default memo(StockList);
