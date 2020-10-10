import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// when refactoring the TableBody, the props onSelectLike and onDeleteMoview
// are no longer needed. They will be passed in the columns.
const Table = ({
  onSort,
  onSelectLike,
  onDeleteMovie,
  sortColumn,
  data,
  columns,
}) => {
  console.log(onSelectLike, onDeleteMovie);
  return (
    <table className="table table-striped table-bordered table-sm">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        data={data}
        onDelete={onDeleteMovie}
        onSelectLike={onSelectLike}
        columns={columns}
      />
    </table>
  );
};

export default Table;
