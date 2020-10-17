import React, { Component } from "react";
import Input from "./Input";
const Joi = require("joi");

class Form extends Component {
  state = {
    data: {},
    errors: {},
    warnings: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = [];
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const object = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error: warning } = Joi.validate(object, schema);
    console.log(name, warning);
    return warning ? warning.details[0].message : null;
  };

  handleSubmit = (e) => {
    // prevents a full page refresh
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const warnings = { ...this.state.warnings };
    const warningsMessage = this.validateProperty(input);
    if (warningsMessage) warnings[input.name] = warningsMessage;
    else delete warnings[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, warnings });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary mt-4">
        {label}
      </button>
    );
  };

  renderInput = (name, label, autofocus = "", type = "text") => {
    const { data, errors, warnings } = this.state;
    return (
      <Input
        name={name}
        value={data[{ name }]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        warnings={warnings[name]}
        autofocus={autofocus}
        type={type}
      />
    );
  };
}

export default Form;
