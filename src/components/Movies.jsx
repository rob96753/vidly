import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/liked";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import GroupFilter from "./common/filter";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [{ _id: "0", name: "All Genre" }, ...getGenres()],
    currentGenre: "0",
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

  handleGoToPrevious = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage > 1 ? currentPage - 1 : 1 });
  };

  handleGoToNext = () => {
    const { currentPage, itemsPerPage } = this.state;
    const { length: count } = this.state.movies;
    const lastPage = Math.ceil(count / itemsPerPage);
    this.setState({
      currentPage: currentPage < lastPage ? currentPage + 1 : lastPage,
    });
  };

  handleFilterSelect = (genre) => {
    console.log(genre);
    const movies = getMovies();
    const movieList = movies.filter(
      (movie) => (genre._id === "0") | (movie.genre._id === genre._id)
    );

    this.setState({ currentGenre: genre._id, movies: movieList });
    console.log(genre.name);
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      movies,
      genres,
      currentGenre,
    } = this.state;

    /* if (!count)
      return (
        <div>
          <h1>No Movies Found!</h1>
        </div>
      ); */

    const moviesPage = paginate(movies, currentPage, itemsPerPage);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <GroupFilter
              genres={genres}
              onSelect={this.handleFilterSelect}
              currentGenre={currentGenre}
            />
          </div>
          <div className="col-sm">
            <h2>There are {count} Movies Returned In Filter</h2>
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
                {moviesPage.map((movie) => (
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
              itemCount={count}
              itemsPerPage={this.state.itemsPerPage}
              currentPage={this.state.currentPage}
              onNext={this.handleGoToNext}
              onPrevious={this.handleGoToPrevious}
              onGoTo={this.handleGoToPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
