import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      id="navbarNavAltMarkup"
    >
      <div className="navbar-nav">
        <Link className="navbar-brand" to="/" id="navbarBrand">
          Vidly
        </Link>
        <NavLink className="nav-item nav-link " to="/movies" id="navbarMovies">
          Movies
        </NavLink>
        <NavLink
          className="nav-item nav-link"
          to="/customers"
          id="navbarCustomers"
        >
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals" id="navbarRentals">
          Rentals
        </NavLink>
        <NavLink className="nav-item nav-link" to="/login" id="navbarLogin">
          Login
        </NavLink>
        <NavLink
          className="nav-item nav-link"
          to="/register"
          id="navbarRegister"
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
