import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

import Like from "./common/liked";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Number In Stock" },
    { path: "dailyRentalRate", label: "Daily Rate" },
    { key: "liked", content: "" },
    { key: "delete", content: "" },
  ];

  render() {
    const {
      moviesPage,
      onSelectLiked,
      onDeleteMovie,
      sortColumn,
      onSort,
    } = this.props;
    return (
      <table className="table table-striped table-bordered table-sm">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          moviesPage={moviesPage}
          onDelete={onDeleteMovie}
          onSelectLike={onSelectLiked}
        />
      </table>
    );
  }
}

export default MoviesTable;
