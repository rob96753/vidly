import React from "react";
import lodash from "lodash";

const Pagination = (props) => {
  const {
    itemCount,
    itemsPerPage,
    currentPage,
    onNext,
    onPrevious,
    onGoTo,
  } = props;
  const numberPages = Math.ceil(itemCount / itemsPerPage);
  if (numberPages < 2) return null;
  const pages = lodash.range(1, numberPages + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination" key="pagination">
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          id="pagePrevious"
        >
          <a className="page-link" onClick={() => onPrevious()}>
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
            key={`page${page}`}
            id={`page${page}`}
          >
            <a className="page-link" onClick={() => onGoTo(page)}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === numberPages ? "page-item disabled" : "page-item"
          }
          key="pageNext"
          id="pageNext"
        >
          <a className="page-link" onClick={() => onNext()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
