import React, {Component} from "react";

const withPagination = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
      };
    }

    resetPagination = () => {
      this.setState({
        currentPage: 1 
      })
    }
    
    getTotalPages = () => {
      const { lists, itemsPerPage } = this.props;
      if (!Array.isArray(lists)) return 0;
      return Math.ceil(lists.length / itemsPerPage);
    }

    // hàm xử lý thay đổi trang
    handlePageChange = (page) => {
      if(page >= 1 && page <= this.getTotalPages()){
        this.setState({ currentPage: page });
      }
    };

    // Render số trang dựa trên dấu 3 chấm nếu có quá nhiều trang
    renderPageNumbers = () => {
      const totalPages = this.getTotalPages();
      const pageNumbers = [];
      const maxPagesToShow = 5; // Hiển thị tối đa 5 trang 
      // (vd nếu có 10 trang thì sẽ chỉ hiển thị 5 trang và sau đó bấm next/prev để chuyển sang trang cao/thấp)

      let startPage = Math.max(1, this.state.currentPage - 2); // tính toán biến bắt đầu trang với số trang không được nhỏ hơn 1, lấy trang hiện tại trừ 2
      let endPage = Math.min(totalPages, this.state.currentPage + 2); // tính toán biến kết thúc trang với tổng số trang, lấy trang hiện tại cộng 2

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
      if (totalPages > maxPagesToShow && this.state.currentPage > 3) {
        pageNumbers.push(
          <button
            key="first"
            onClick={() => this.handlePageChange(1)}
            className={this.state.currentPage === 1 ? "disabled" : ""}
          >
            First
          </button>
        );
      }

      // Thêm nút prev để quay về trang đầu sau mỗi lần nhấn
      pageNumbers.push(
        <button
          key="prev"
          onClick={() => this.handlePageChange(this.state.currentPage - 1)}
          className={this.state.currentPage === 1 ? "disabled" : ""}
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
            className={this.state.currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      // Thêm nút next để đi sang cuối trang sau mỗi lần nhấn
      pageNumbers.push(
        <button
          key="next"
          onClick={() => this.handlePageChange(this.state.currentPage + 1)}
          className={this.state.currentPage === totalPages ? "disabled" : ""}
        >
          Next
        </button>
      );

      // Thêm nút last để đi về trang cuối cùng
      if (totalPages > maxPagesToShow && this.state.currentPage < totalPages - 2) {
        pageNumbers.push(
          <button
            key="last"
            onClick={() => this.handlePageChange(totalPages)}
            className={this.state.currentPage === totalPages ? "disabled" : ""}
          >
            Last
          </button>
        );
      }

      return pageNumbers;
    };

    render() {
      const totalPages = this.getTotalPages();
      const { lists, itemsPerPage } = this.props;

      if (totalPages <= 1) return <WrappedComponent {...this.props} />;
      
      const startIndex = (this.state.currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedLists = Array.isArray(lists) ? lists.slice(startIndex, endIndex) : [];
      return (
        <div>
          <WrappedComponent
            {...this.props}
            lists = {paginatedLists}
            currentPage={this.state.currentPage}
            totalPages={totalPages}
            handleResetPage={this.handleResetPage}
            handlePageChange={this.handlePageChange}
          />
          <div className="pagination">{this.renderPageNumbers()}</div>
        </div>
      );
    }
  }
}

export default withPagination;