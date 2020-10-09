import React, { Component } from "react";
import Like from "./liked";

class TableBody extends Component {
  render() {
    // this needs to be refactoted so the columns carries definitions
    // of the delete and liked components; also the rendering of the
    // columns as a map instead of hard coded here.
    const { moviesPage, onDeleteMovie, onSelectLiked, columns } = this.props;
    //console.log(columns);
    return (
      <tbody>
        {moviesPage.map((movie) => (
          //columns.map (column => {});
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
    );
  }
}

export default TableBody;
