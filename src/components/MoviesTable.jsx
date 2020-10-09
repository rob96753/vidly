import React, { Component } from "react";
import Like from "./common/liked";

class MoviesTable extends Component {
  raiseSort = (pathToTargetProperty) => {
    const sortColumn = { ...this.props.sortColumn };

    console.log(`onSort ${pathToTargetProperty} ${sortColumn}`);
    if (pathToTargetProperty === sortColumn.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = pathToTargetProperty;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { moviesPage, onSelectLiked, onDeleteMovie } = this.props;
    return (
      <table className="table table-striped table-bordered table-sm">
        <thead className="thead-dark">
          <tr>
            <th
              scope="col"
              onClick={() => this.raiseSort("title")}
              id="th-title"
            >
              Title
            </th>
            <th
              className="th-inner sortable both desc"
              scope="col"
              onClick={() => this.raiseSort("genre.name")}
              id="th-genre-name"
            >
              Genre
            </th>
            <th
              className="th-inner sortable both desc"
              scope="col"
              onClick={() => this.raiseSort("numberInStock")}
              id="th-number-in-stock"
            >
              Number in Stock
            </th>
            <th
              className="th-inner sortable both desc"
              scope="col"
              onClick={() => this.raiseSort("dailyRentalRate")}
              id="th-daily-rental"
            >
              Daily Rental
            </th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {moviesPage.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like movie={movie} onLike={onSelectLiked} />
              </td>
              <td>
                <button
                  onClick={(e) => onDeleteMovie(movie._id, e)}
                  className="btn btn-danger btn-sm mt-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
