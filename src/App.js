import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
//import MovieForm from "./components/movieForm";
import NotFound from "./components/notfound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/register";
import AddMovie from "./components/addMovie";

import "./App.css";

function App() {
  // using the /movies/new as the route to new movies triggers
  // the /movies/:id, where "new" is passed as the id. So the
  // Route to handle /movies/new doesn't need to be explicitly
  // identified.
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={AddMovie} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
