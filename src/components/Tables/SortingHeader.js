import React, { useEffect, memo, useState, useCallback } from "react";

import { Sort } from "./style";

const SortingHeader = memo((props) => {
  const [sortState, setSortState] = useState("n");
  const onClick = useCallback(() => {
    props.progressSort();
  });

  useEffect(() => {
    const listener = () => {
      if (props.column.isSortAscending()) {
        setSortState("asc");
      } else if (props.column.isSortDescending()) {
        setSortState("desc");
      } else {
        setSortState("n");
      }
    };
    props.column.addEventListener("sortChanged", listener);
    return () => props.column.removeEventListener("sortChanged", listener);
  }, []);
  const sortIcon = (val) => {
    switch (val) {
      case "asc":
        return <i className={"asc ico_arrow_up"}></i>;
      case "desc":
        return <i className={"desc ico_arrow_down"}></i>;
      case "n":
        return <i className={"n ico_arrow_n"}></i>;
      default:
        return <i className={"n ico_arrow_n"}></i>;
    }
  };
  return (
    <div>
      {props.enableSorting ? (
        <Sort onClick={onClick} >
          <span className={'value'}>{props.displayName}</span> {sortIcon(sortState)}
        </Sort>
      ) : (
        <Sort><span  className={'value'}>{props.displayName}</span> </Sort>
      )}
    </div>
  );
});

export default SortingHeader;
