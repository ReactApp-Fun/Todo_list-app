import React from 'react';

const withPagination = (WrappedComponent) => {
  return class WithPagination extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1, // Trang hiện tại bắt đầu từ 1
      };
    }

    getTotalPages = () => {
      return Math.ceil(this.props.totalItems / this.props.itemsPerPage);
    };

    handlePageChange = (page) => {
      if (page >= 1 && page <= this.getTotalPages()) {
        this.setState({ currentPage: page });
      }
    };

    renderPageNumbers = () => {
      const totalPages = this.getTotalPages();
      const { currentPage } = this.state;
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
            onClick={() => this.handlePageChange(1)}
            className={currentPage === 1 ? "disabled" : ""}
          >
            First
          </button>
        );
      }

      pageNumbers.push(
        <button
          key="prev"
          onClick={() => this.handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "disabled" : ""}
        >
          Prev
        </button>
      );

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => this.handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      pageNumbers.push(
        <button
          key="next"
          onClick={() => this.handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          Next
        </button>
      );

      if (totalPages > maxPagesToShow && currentPage < totalPages - 2) {
        pageNumbers.push(
          <button
            key="last"
            onClick={() => this.handlePageChange(totalPages)}
            className={currentPage === totalPages ? "disabled" : ""}
          >
            Last
          </button>
        );
      }

      return pageNumbers;
    };

    render() {
      const totalPages = this.getTotalPages();
      const paginatedProps = {
        currentPage: this.state.currentPage,
        pageNumbers: this.renderPageNumbers(),
        totalPages,
        handlePageChange: this.handlePageChange,
      };

      if (totalPages <= 1) return <WrappedComponent {...this.props} />;

      return (
        <div>
          <WrappedComponent
            {...this.props}
            {...paginatedProps}
            paginatedLists={this.props.lists && this.props.lists.slice(
              (this.state.currentPage - 1) * this.props.itemsPerPage,
              this.state.currentPage * this.props.itemsPerPage
            )}
          />
        </div>
      );
    }
  };
};

export default withPagination;