import React from 'react';
import styled from 'styled-components';

type IProps<T, U> = {
  data: Record<string, T>[];
  head?: {
    title: string;
    style: Record<string, string | number>;
  }[];
  columns: Record<string, U>[];
  sticky?: boolean;
  stickyBG?: string;
};

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  .th {
    font-weight: normal;
    color: #9696a6;
  }
`;

const DataTable = <T, U>({ data, head, columns, sticky, stickyBG }: IProps<T, U>) => {
  return (
    <Table style={{ width: '100%' }}>
      <tbody>
        {head && head.length > 0 && (
          <tr
            style={
              sticky
                ? {
                    position: 'sticky',
                    zIndex: 1,
                    left: 0,
                    top: 0,
                    background: stickyBG || 'unset'
                  }
                : {}
            }
          >
            {head.map((item) => {
              return (
                <th className="th" key={item.title} style={item.style}>
                  {item.title}
                </th>
              );
            })}
          </tr>
        )}
        {data.map((item, index) => {
          return (
            <tr key={index}>
              {columns.map((columm) => {
                if (columm.renderItem) {
                  return (
                    <td className="td" key={item.key} style={columm.style}>
                      {columm.renderItem(item, index)}
                    </td>
                  );
                }
                return (
                  <td className="td" key={item.key} style={columm.style}>
                    {item[columm.dataKey]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default React.memo(DataTable);
