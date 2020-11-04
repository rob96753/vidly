import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import GroupFilter from "./common/filter";
import MoviesTable from "./MoviesTable";
import SearchBox from "./common/SeachBox";
import lodash from "lodash";

const DEFAULT_PAGE = 1;
const INITIAL_GENRE = null;

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: 0,
    currentPage: DEFAULT_PAGE,
    itemsPerPage: 4,
    searchQuery: "",
    selectedGenre: INITIAL_GENRE,
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

  /* you must set the searchQuery to "". If you set searchQuery
     null or undefined,  then React will think it's an uncontrolled Component.
     React will get confused when you start typing into the component 
     and will think you are trying to convert the component from an 
     uncontrolled component to a controlled component.
    */
  handleFilterSelect = (genre) => {
    this.setState({
      currentGenre: genre._id,
      searchQuery: "",
      currentPage: DEFAULT_PAGE,
    });
  };

  // refactored to move the onnership of the sort to the table
  handleOnSort = (sortColumn) => {
    this.setState({
      sortColumn: sortColumn,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: INITIAL_GENRE,
      currentPage: 1,
    });
  };

  getPagedData = (
    movies,
    currentGenre,
    sortColumn,
    currentPage,
    itemsPerPage,
    searchQuery
  ) => {
    let movieList = movies;

    console.log(`Search Query: ${searchQuery}`);

    if (searchQuery) {
      movieList = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

      console.log(`Search Query: ${searchQuery}`);
      console.log(`MovieList${movieList}`);
    } else if (currentGenre && currentGenre._id) {
      movieList = movies.filter(
        (movie) => !currentGenre || movie.genre._id === currentGenre
      );
    }

    const sortedList = lodash.orderBy(
      movieList,
      [sortColumn.path],
      [sortColumn.order]
    );

    const { length: count } = sortedList;

    const moviesPage = paginate(sortedList, currentPage, itemsPerPage);
    return { filteredCount: count, data: moviesPage };
  };

  moviesTable = (
    count,
    moviesPage,
    onSelectLiked,
    onDeleteMovie,
    sortColumn,
    onSort
  ) => {
    if (!count)
      return (
        <>
          <p>No Movies Found!</p>
        </>
      );

    return (
      <MoviesTable
        count={count}
        moviesPage={moviesPage}
        onSelectLiked={onSelectLiked}
        onDeleteMovie={onDeleteMovie}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  };

  render() {
    const { history } = this.props;
    //const { length: count } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      sortColumn,
      movies,
      genres,
      currentGenre,
      searchQuery,
    } = this.state;

    const { filteredCount, data: moviesPage } = this.getPagedData(
      movies,
      currentGenre,
      sortColumn,
      currentPage,
      itemsPerPage,
      searchQuery
    );

    return (
      <div className="container">
        <h1>Movies</h1>
        <div className="row">
          <div className="col-xs mr-3 mt-5">
            <GroupFilter
              items={genres}
              onSelectItem={this.handleFilterSelect}
              selectedItem={currentGenre}
            />
          </div>

          <div className="col">
            <button
              onClick={() => history.push("/movies/new")}
              className="btn btn-primary btn-sm mb-2"
            >
              Add Movie
            </button>
            <h2>There are {filteredCount} Movies Returned In Filter</h2>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            {this.moviesTable(
              filteredCount,
              moviesPage,
              this.handleLiked,
              this.handleDeleteMovie,
              sortColumn,
              this.handleOnSort
            )}
          </div>
        </div>
        <Pagination
          itemCount={filteredCount}
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
