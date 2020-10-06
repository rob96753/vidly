import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/liked";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    itemsPerPage: 4,
  };

  deleteMovie = (id) => {
    this.setState({
      movies: this.state.movies.filter((movie) => movie._id !== id),
    });
  };

  handleLiked = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGoToPage = (page) => {
    console.log(`Page: ${page}`);
    this.setState({ currentPage: page });
  };

  handleGoToPrevious = () => {};

  handleGoToNext = () => {};

  render() {
    if (!this.state.movies.length)
      return (
        <div>
          <h1>No Movies Found!</h1>
        </div>
      );

    return (
      <React.Fragment>
        <h2>There are {this.state.movies.length} Movies In The Database</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Number in Stock</th>
              <th scope="col">Daily Rental</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like movie={movie} onLike={this.handleLiked} />
                </td>
                <td>
                  <button
                    onClick={(e) => this.deleteMovie(movie._id, e)}
                    className="btn btn-danger btn-sm mt-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={this.state.movies.length}
          itemsPerPage={this.state.itemsPerPage}
          currentPage={this.state.currentPage}
          onNext={this.handleGoToNext}
          onPrevious={this.handleGoToPrevious}
          onGoTo={this.handleGoToPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
