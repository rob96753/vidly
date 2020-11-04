import React from "react";

const Select = (props) => {
  const {
    name,
    label,
    options,
    error,
    warnings,
    textProperty,
    valueProperty,
    selectedItem,
    onChange,
  } = props;
  console.log("Options", options);
  return (
    <div className="formgroup">
      <div>
        <label> {label}</label>
      </div>
      <select name={name} id={`select-${name}`} onChange={onChange}>
        {options.map((item) => (
          <option
            value={item[valueProperty]}
            onChange={() => onChange(item[textProperty])}
            key={`${name}-${item[textProperty].toLowerCase()}`}
            className={
              item[textProperty] === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            id={`${name}-${item[textProperty].toLowerCase()}`}
          >
            {item[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
      {warnings && <div className="alert alert-warning">{warnings}</div>}
    </div>
  );
};

export default Select;
