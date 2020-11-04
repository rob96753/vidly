import React from "react";
import Form from "./common/form";
const Joi = require("joi");

class RegisterForm extends Form {
  username = React.createRef();
  password = React.createRef();
  personName = React.createRef();

  emailValidator =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";

  state = {
    data: { username: "", password: "", personname: "" },
    errors: {},
    warnings: {},
  };

  //joi is an lightweight option as a validator
  schema = {
    username: Joi.string()
      .regex(RegExp(this.emailValidator))
      .required()
      .label("Username"),
    password: Joi.string().min(8).max(30).required().label("Password"),
    personname: Joi.string().min(1).max(30).required().label("Your Name"),
  };

  doSubmit = () => {
    // call the server after a submit
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email Address", true, "text")}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("personname", "Your Name", true, "text")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
