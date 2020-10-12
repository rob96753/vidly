import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  password = React.createRef();

  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    // prevents a full page refresh
    e.preventDefault();
    const username = this.username.current.value;
    const password = this.password.current.value;
    console.log(e);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { username, password } = this.state.account;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="formgroup">
            <label htmlFor="username">User Name</label>
            <input
              autoFocus
              onChange={this.handleChange}
              value={username}
              ref={this.username}
              name="username"
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              value={password}
              name="password"
              ref={this.password}
              id="password"
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
