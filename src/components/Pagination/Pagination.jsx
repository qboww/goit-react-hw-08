import React from "react";
import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={css.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={css.paginationButton}
      >
        Previous
      </button>
      <span className={css.pageInfo}>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={css.paginationButton}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
