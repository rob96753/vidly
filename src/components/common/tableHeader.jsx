import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

class TableHeader extends Component {
  raiseSort = (pathToTargetProperty) => {
    const sortColumn = { ...this.props.sortColumn };
    if (pathToTargetProperty === sortColumn.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = pathToTargetProperty;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return (
        <FontAwesomeIcon className="ml-4 mt-2 text-white" icon={faSortUp} />
      );
    return (
      <FontAwesomeIcon className="ml-4 mt-2 text-white" icon={faSortDown} />
    );
  };

  render() {
    const { columns } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {columns.map((header) => (
            <th
              className="clickable"
              key={header.path || header.key}
              onClick={() => this.raiseSort(header.path)}
              id={`th-${header.path || header.key}`}
            >
              {header.label}
              {this.renderSortIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
