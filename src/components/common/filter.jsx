import React from "react";

const GroupFilter = (props) => {
  const {
    items,
    onSelectItem,
    selectedItem,
    textProperty,
    valueProperty,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={`li-genre-${item[textProperty]}`}
          className={
            item[valueProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelectItem(item)}
          id={`li-genre-${item[textProperty]}`}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupFilter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default GroupFilter;
