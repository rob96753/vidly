import React, { Component } from "react";
import lodash from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return lodash.get(item, column.path);
  };

  render() {
    // refactoted so the columns carries definitions
    // of the delete and liked components; also the rendering of the
    // columns as a map instead of hard coded here.
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={`${item._id}_${column.path || column.key}`}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
