import React from "react";
import Like from "./common/liked";

const MoviesTable = (props) => {
  const { moviesPage, onSelectLiked, onDeleteMovie, onSort } = props;
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col" onClick={() => onSort()} id="th-title">
            Title
          </th>
          <th scope="col" onClick={() => onSort()} id="th-title">
            Genre
          </th>
          <th scope="col" onClick={() => onSort()} id="th-title">
            Number in Stock
          </th>
          <th scope="col" onClick={() => onSort()} id="th-title">
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
