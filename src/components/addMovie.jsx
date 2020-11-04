import React from "react";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";
import { saveMovie, getMovie } from "../services/fakeMovieService";
const Joi = require("joi");

class AddMovie extends Form {
  title = React.createRef();
  genreId = React.createRef();
  numberInStock = React.createRef();
  dailyRentalRate = React.createRef();

  movieId = 0;

  state = {
    data: {
      _id: " ",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: {},
    errors: {},
    warnings: {},
  };

  constructor() {
    super();
    this.state.genres = [...getGenres()];
  }

  schema = {
    _id: Joi.string().label("Id"),
    title: Joi.string().min(1).max(30).required().label("Title"),
    genreId: Joi.label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    console.log("componentDidMount");
    const movieId = this.props.match.params.id;
    console.log("MovieId", movieId);
    if (movieId === "new") return;

    const movie = getMovie(movieId);

    //using replace allows the user to get back to where they
    //were before this page. Using a redirect will cause the
    //user to return to this page if they click the back button
    //where they will be directed to the "not-found" page. That
    //enters them into an infinite loop.
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  onSelect = (event) => {
    const { data } = { ...this.state };
    console.log(event.target);
    data.genreId = event.target.value;
    this.setState({ data });
  };

  doSubmit = () => {
    saveMovie({ ...this.state.data });
    this.setState({ data: {} });
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", true, "text")}
          {this.renderSelect(
            "genreId",
            "Genre",
            this.state.genres,
            this.onSelect,
            "name",
            "_id",
            "Action"
          )}
          {this.renderInput("numberInStock", "Number In Stock", false, "text")}
          {this.renderInput(
            "dailyRentalRate",
            "Daily Rental Rate",
            false,
            "text"
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default AddMovie;
