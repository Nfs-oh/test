import React, { useMemo, useState } from 'react';
import { Block, Container, Cell } from '../../style';
import List from '@/components/List';
import Title from '@/components/Title';
import { connect } from 'react-redux';
import { isEmpty } from '@/utils';
import Important from './important';
import Zicomp from './zicomp';
import Accounts from './accounts';
import Loading from '@/components/loading';
import Table from '@/components/Tables';
const Other = ({ bond }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useMemo(() => {
    if (!isEmpty(bond)) {
      setData(bond);
      setLoading(false);
    }
  }, [bond]);
  const renderContent = (data) => {
    const columns = [
      {
        headerClass: 'center color',
        cellClass: 'cell',
        headerName: '债名',
        field: 'bond_name',
        flex: 1,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}>
            <span> {value}</span>
          </Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell',
        sortable: true,
        unSortIcon: true,
        headerName: '规模',
        field: 'amount',
        flex: 1,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value.toFixed(2)}亿</Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell',
        sortable: true,
        unSortIcon: true,
        headerName: '利率',
        field: 'lv',
        flex: 1,
        cellRendererFramework: ({ value }) => (
          <Cell className={'wrap-cell center'}> {value.toFixed(2)}%</Cell>
        )
      },
      {
        headerClass: 'center color',
        cellClass: 'cell',
        headerName: '到期日',
        field: 'expire_date',
        flex: 1,
        cellRendererFramework: ({ value }) => <Cell className={'wrap-cell center'}> {value}</Cell>
      }
    ];
    return (
      <Table
        dataSource={data}
        sort
        columns={columns}
        border
        domLayout={'autoHeight'}
        height={'100%'}
        headerHeight={'36'}
        rowHeight={64}
      ></Table>
    );
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Block>
          <List
            content={renderContent(bond)}
            title={
              <span>
                <Title top={true}>债券-不含可转债</Title>({data.length})
              </span>
            }
          ></List>
          <Important></Important>
          <Zicomp></Zicomp>
          <Accounts></Accounts>
        </Block>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => ({
  ...state.stock.otherData
});
export default connect(mapStateToProps)(Other);
