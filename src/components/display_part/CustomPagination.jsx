import React from "react";

class CustomPagination extends React.Component {
  // Tính toán tổng trang dựa trên itemPerPage (5 item mỗi trang)
  getTotalPages = () => {
    return Math.ceil(this.props.totalItems / this.props.itemsPerPage);
  };

  // hàm xử lý thay đổi trang
  handlePageChange = (page) => {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.props.onPageChange(page); // Thông báo cho InteractTask component về sự thay đổi
    }
  };

  // Render số trang dựa trên dấu 3 chấm nếu có quá nhiều trang
  renderPageNumbers = () => {
    const totalPages = this.getTotalPages();
    const { currentPage } = this.props;
    const pageNumbers = [];
    const maxPagesToShow = 5; // Hiển thị tối đa 5 trang 
    // (vd nếu có 10 trang thì sẽ chỉ hiển thị 5 trang và sau đó bấm next/prev để chuyển sang trang cao/thấp)

    let startPage = Math.max(1, currentPage - 2); // tính toán biến bắt đầu trang với số trang không được nhỏ hơn 1, lấy trang hiện tại trừ 2
    let endPage = Math.min(totalPages, currentPage + 2); // tính toán biến kết thúc trang với tổng số trang, lấy trang hiện tại cộng 2

    // Điều chỉnh việc chiếu 5 trang tuỳ vào số trang hiện có
    if (endPage - startPage < maxPagesToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } 
      else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    // Thêm nút First để khi trang được kéo lớn hơn trang thứ 3 thì nút này sẽ xuất hiện với chức năng kéo về trang đầu tiên
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

    // Thêm nút prev để quay về trang đầu sau mỗi lần nhấn
    pageNumbers.push(
      <button
        key="prev"
        onClick={() => this.handlePageChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        Prev
      </button>
    );

    // Thêm số trang đại diện cho mỗi trang chứa 5 items
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

    // Thêm nút next để đi sang cuối trang sau mỗi lần nhấn
    pageNumbers.push(
      <button
        key="next"
        onClick={() => this.handlePageChange(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        Next
      </button>
    );

    // Thêm nút last để đi về trang cuối cùng
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
    if (totalPages <= 1) return null; // Không hiển thị pagination nếu không có trang nào hoặc item nào hoặc ít trang

    return (
      <div className="pagination">
        {this.renderPageNumbers()}
      </div>
    );
  }
}

export default CustomPagination;