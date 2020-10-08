import React from "react";
import Like from "./common/liked";

const MoviesTable = (props) => {
  const { moviesPage, onSelectLiked, onDeleteMovie, onSort } = props;
  return (
    <table className="table table-striped table-bordered table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col" onClick={() => onSort("title")} id="th-title">
            Title
          </th>
          <th
            className="th-inner sortable both desc"
            scope="col"
            onClick={() => onSort("genre.name")}
            id="th-genre-name"
          >
            Genre
          </th>
          <th
            className="th-inner sortable both desc"
            scope="col"
            onClick={() => onSort("numberInStock")}
            id="th-number-in-stock"
          >
            Number in Stock
          </th>
          <th
            className="th-inner sortable both desc"
            scope="col"
            onClick={() => onSort("dailyRentalRate")}
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
};

export default MoviesTable;
