import React, { Component } from "react";
import Table from "./common/table";

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
    // this needs to be refactoted to remove the liked and delete
    // and to pass that in as content in the columns array
    const {
      moviesPage,
      onSelectLiked,
      onDeleteMovie,
      sortColumn,
      onSort,
    } = this.props;

    return (
      <Table
        columns={this.columns}
        data={moviesPage}
        sortColumn={sortColumn}
        onSelectLike={onSelectLiked}
        onDeleteMovie={onDeleteMovie}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
