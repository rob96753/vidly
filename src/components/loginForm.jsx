import React from "react";
import Form from "./common/form";
const Joi = require("joi");

class LoginForm extends Form {
  username = React.createRef();
  password = React.createRef();

  state = {
    data: { username: "", password: "" },
    errors: {},
    warnings: {},
  };

  //joi is an lightweight option as a validator
  /**
   * //.regex(RegExp(this.pattern))
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password"),
   */
  schema = {
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().min(8).max(30).required().label("Password"),
  };

  doSubmit = () => {
    // call the server after a submit
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true, "text")}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
