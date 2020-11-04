import React from "react";

const Input = ({ name, label, autofocus, error, warnings, ...rest }) => {
  return (
    <div className="formgroup">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
      {warnings && <div className="alert alert-warning">{warnings}</div>}
    </div>
  );
};

export default Input;
