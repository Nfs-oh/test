import React from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import styles from "@/styles";
import {color2, color4, color8 ,color20} from "@/styles/theme";
import Empty from "../Empty";
import Header from './SortingHeader'
const TableContainer = styled.div`
  padding: 10px 0;
  height: ${(props) => (props.Height ? props.Height : "calc(100vh - 100px)")};
  width: 100%;
  font-size: 12px;
  color: ${color2};
  .ag-root-wrapper{
    border-radius: 8px;
    border: 1px solid ${props => props.border? color8 : 'none' };
    .ag-header-viewport{
      background:${props => props.border? color20: 'transparent'}; 
    }
  }
  .center.ag-header-cell  {
    flex: 1;
    justify-content: center;
  }
  .left.ag-header-cell {
    padding-left:4px;
  }
  .right.ag-header-cell  {
    flex: 0.8;
    padding-right:4px;
    box-sizing: border-box;
    justify-content: flex-end;
  }
  .ag-cell {
    font-size: 14px;
  }
  .ag-header-cell {
    box-sizing: border-box;
    border-bottom: 1px solid ${props => props.headerBorder? color8 : 'none' };
  }
  .cell{
    border-bottom: 1px solid ${color8};
  }
  .cell:first-child{
    border-left: none;
  }
  .cell:last-child{
    border-right: none;
  }
  .color {
    /* border-top: 1px solid ${color8}; */
    background: ${color20};
  }
  .color:first-child{
    border-left: 1px solid ${color8};
    border-top-left-radius: 5px;
  }
  .color:last-child{
    border-right: 1px solid ${color8};
    border-top-right-radius: 5px;
  }
  .color.noRadiusright{
    border-top-right-radius: 0;
  }
  .color.noRadiusleft{
    border-top-left-radius: 0;
  }
  .ag-row:last-child .cell{
    border: none;
  }
  .fz10{
    .value {
      color: ${color4};
      font-size: 12px;
      transform: scale(.8);
    }
  }
  .cell.noborderRight{
    border-right: none; 
  }
  .cell.noborderleft{
    border-left: none; 
  }
  .cell.move{
    border-right:1px solid ${color8};
  }
  .ag-pinned-left-header .ag-header-row{
    height: ${props => props.headerHeight ? parseInt(props.headerHeight, 0) + 4 + 'px!important' : ''};
    // border-bottom: 2px solid ${styles.color8};
  }
  //解决设置pinned 堆叠问题
  .ag-pinned-left-header , .ag-pinned-left-cols-container  {
    width: ${props=>props.pinnedWidth? props.pinnedWidth: '0' }; 
    max-width:  ${props=>props.pinnedWidth? props.pinnedWidth: '0' };
    min-width:  ${props=>props.pinnedWidth? props.pinnedWidth: '0' };
  }
  .ag-row-hover{
    background: ${props => props.rowColor ? styles.color36 : ''}
  }
  .ag-row .ag-cell:first-child, .ag-header-row .ag-header-cell:first-child{
    padding-left:  ${props => props.rowColor ? '15px' : '0'};
    box-sizing: border-box;
   }
   .ag-row .ag-cell:nth-child(2), .ag-header-row .ag-header-cell:nth-child(2){
    padding-left:  ${props => props.rowColor ? '15px' : ''};
    box-sizing: border-box;
   }
   .ag-row .ag-cell:last-child ,  .ag-header-row .ag-header-cell:last-child{
    padding-right:  ${props => props.rowColor ? '15px' : ''};
    box-sizing: border-box;
   }
   .ag-header-row .fz10{
    padding-left: 8px;
    &:first-child{
      padding-left: 0!important;;
    }
    .value {
      color: ${styles.color4};
      font-size: 12px;
      /* transform: scale(.8); */
    }
  }
`

export default ({
  dataSource,
  columns,
  onCellClicked,
  height,
  rowHeight = 30,
  lineHeight,
  headerHeight,
  border,
  pinnedWidth,
  domLayout = false,
  onTouchStart,
  onTouchEnd,
  headerBorder = true,
  onRowClicked,
  rowColor
}) => {
  return (
    <TableContainer
      pinnedWidth={pinnedWidth}
      rowColor={rowColor}
      onTouchStart={(e) => onTouchStart && onTouchStart(e)}
      onTouchEnd={(e) => onTouchEnd && onTouchEnd(e)}
      Height={height}
      headerBorder={headerBorder}
      rowHeight={rowHeight}
      lineHeight={lineHeight}
      headerHeight={headerHeight}
      border={border}>
      {dataSource && dataSource.length > 0 ? <AgGridReact
        rowData={dataSource}
        defaultColDef={{
          resizable: false,
          suppressSizeToFit: true,
          suppressMovable: true // 禁用列拖动
        }}
        domLayout={domLayout}
        reactUi={true}
        frameworkComponents={{ agColumnHeader: Header }}
        overlayLoadingTemplate={'数据加载中...'}
        overlayNoRowsTemplate={'暂无数据'}
        columnDefs={columns}
        rowHeight={rowHeight}
        headerHeight={headerHeight || "36"}
        onRowClicked={onRowClicked && onRowClicked}
        onCellClicked={onCellClicked && onCellClicked}
      ></AgGridReact> : <Empty />}
    </TableContainer>
  );
};
