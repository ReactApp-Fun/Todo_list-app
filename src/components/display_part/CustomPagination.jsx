import React from "react";
import "./styles/pagination.css"; // Create this CSS file for styling

class CustomPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1, // Start at page 1
    };
  }

  // Calculate total pages based on items per page (5)
  getTotalPages = () => {
    return Math.ceil(this.props.totalItems / this.props.itemsPerPage);
  };

  // Handle page change
  handlePageChange = (page) => {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.setState({ currentPage: page }, () => {
        this.props.onPageChange(page); // Notify parent component of page change
      });
    }
  };

  // Render page numbers with ellipsis for large lists
  renderPageNumbers = () => {
    const totalPages = this.getTotalPages();
    const { currentPage } = this.state;
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show up to 5 page numbers at a time

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust start and end to always show 5 pages if possible
    if (endPage - startPage < maxPagesToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    // Add "First" button
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

    // Add "Previous" button
    pageNumbers.push(
      <button
        key="prev"
        onClick={() => this.handlePageChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        Prev
      </button>
    );

    // Add page numbers
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

    // Add "Next" button
    pageNumbers.push(
      <button
        key="next"
        onClick={() => this.handlePageChange(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        Next
      </button>
    );

    // Add "Last" button
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
    if (totalPages <= 1) return null; // Don't show pagination for 1 or fewer pages

    return (
      <div className="pagination">
        {this.renderPageNumbers()}
      </div>
    );
  }
}

export default CustomPagination;