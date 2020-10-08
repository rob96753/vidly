import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import GroupFilter from "./common/filter";
import MoviesTable from "./MoviesTable";
import lodash from "lodash";

const DEFAULT_PAGE = 1;

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: 0,
    currentPage: DEFAULT_PAGE,
    itemsPerPage: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  constructor() {
    super();
    this.state.movies = getMovies();
    this.state.genres = [{ _id: 0, name: "All Genre" }, ...getGenres()];
  }

  handleDeleteMovie = (id) => {
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
    this.setState({ currentGenre: genre._id, currentPage: DEFAULT_PAGE });
  };

  handleOnSort = (pathToTargetProperty) => {
    const sortColumn = { ...this.state.sortColumn };

    console.log(`onSort ${pathToTargetProperty} ${sortColumn.path}`);
    if (pathToTargetProperty === sortColumn.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = pathToTargetProperty;
      sortColumn.order = "asc";
    }

    this.setState({
      sortColumn: sortColumn,
    });
  };

  render() {
    //const { length: count } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      sortColumn,
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

    const movieList = movies.filter(
      (movie) => !currentGenre || movie.genre._id === currentGenre
    );

    const sortedList = lodash.orderBy(
      movieList,
      [sortColumn.path],
      [sortColumn.order]
    );

    const { length: count } = sortedList;

    const moviesPage = paginate(sortedList, currentPage, itemsPerPage);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs mr-3 mt-5">
            <GroupFilter
              items={genres}
              onSelectItem={this.handleFilterSelect}
              selectedItem={currentGenre}
            />
          </div>
          <div className="col">
            <h2>There are {count} Movies Returned In Filter</h2>
            <MoviesTable
              count={count}
              moviesPage={moviesPage}
              onSelectLiked={this.handleLiked}
              onDeleteMovie={this.handleDeleteMovie}
              onSort={this.handleOnSort}
            />
          </div>
        </div>
        <Pagination
          itemCount={count}
          itemsPerPage={this.state.itemsPerPage}
          currentPage={this.state.currentPage}
          onNext={this.handleGoToNext}
          onPrevious={this.handleGoToPrevious}
          onGoTo={this.handleGoToPage}
        />
      </div>
    );
  }
}

export default Movies;
