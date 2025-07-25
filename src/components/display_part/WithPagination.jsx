import React, { useState } from "react";

const withPagination = (WrappedComponent) => {
  return (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const resetPagination = () => {
      setCurrentPage(1);
    };

    const getTotalPages = () => {
      const { lists, itemsPerPage } = props;
      if (!Array.isArray(lists)) return 0;
      return Math.ceil(lists.length / itemsPerPage);
    };

    const handlePageChange = (page) => {
      const totalPages = getTotalPages();
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    const renderPageNumbers = () => {
      const totalPages = getTotalPages();
      const pageNumbers = [];
      const maxPagesToShow = 5;

      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (endPage - startPage < maxPagesToShow - 1) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        } else if (endPage === totalPages) {
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
      }

      if (totalPages > maxPagesToShow && currentPage > 3) {
        pageNumbers.push(
          <button
            key="first"
            onClick={() => handlePageChange(1)}
            className={currentPage === 1 ? "disabled" : ""}
          >
            First
          </button>
        );
      }

      pageNumbers.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "disabled" : ""}
        >
          Prev
        </button>
      );

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      pageNumbers.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          Next
        </button>
      );

      if (totalPages > maxPagesToShow && currentPage < totalPages - 2) {
        pageNumbers.push(
          <button
            key="last"
            onClick={() => handlePageChange(totalPages)}
            className={currentPage === totalPages ? "disabled" : ""}
          >
            Last
          </button>
        );
      }

      return pageNumbers;
    };

    const totalPages = getTotalPages();
    const { lists, itemsPerPage } = props;

    if (totalPages <= 1) return <WrappedComponent {...props} />;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedLists = Array.isArray(lists) ? lists.slice(startIndex, endIndex) : [];

    return (
      <div>
        <WrappedComponent
          {...props}
          lists={paginatedLists}
          currentPage={currentPage}
          totalPages={totalPages}
          handleResetPage={resetPagination}
          handlePageChange={handlePageChange}
        />
        <div className="pagination">{renderPageNumbers()}</div>
      </div>
    );
  };
};

export default withPagination;