import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/liked";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Number In Stock" },
    { path: "dailyRentalRate", label: "Daily Rate" },
    {
      key: "liked",
      content: (movie) => (
        <Like movie={movie} onLike={this.props.onSelectLiked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDeleteMovie(movie._id)}
          className="btn btn-danger btn-sm mt-2"
        >
          Delete
        </button>
      ),
    },
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
