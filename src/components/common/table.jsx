import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const {
    onSort,
    onSelectLike,
    onDeleteMovie,
    sortColumn,
    data,
    columns,
  } = props;

  return (
    <table className="table table-striped table-bordered table-sm">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        moviesPage={data}
        onDelete={onDeleteMovie}
        onSelectLike={onSelectLike}
        columns={columns}
      />
    </table>
  );
};

export default Table;
