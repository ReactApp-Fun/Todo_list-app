import React from "react";
// import CustomPagination from "../display_part/CustomPagination";
import './styles/function.css'
import { CoolButton } from "../context/ButtonStyle";

class InteractTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1, // Trang hiện tại bắt đầu từ 1
    };
  }

  // Xử lý thay đổi trang
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  // Tạo lifecycle did update để xét nếu chữ được ghi trên thanh tìm kiếm thì sẽ tiến hành nhảy vào hàm reset
  componentDidUpdate(prevProps){
    if (prevProps.lists !== this.props.lists){
      this.handleResetPage();
    }
  }

  // hàm thực hiện reset về trang đầu khi bắt đầu tìm kiếm
  handleResetPage = () => {
    this.setState({
      currentPage: 1
    })
  }

  // hàm xử lý highlight một kí tự khi được tìm kiếm
  highlightText = (text, query) => {
    if(!query.trim()){
      return text
    }
    const regex = new RegExp(`(${query})`, 'gi'); // Biểu thức chính quy để không phân biệt chữ hoa/thường
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  }
  render() {
    // truyền lists và itemsPerPage qua props
    // const { lists, itemsPerPage = 5, searchQuery } = this.props;
    // const { currentPage } = this.state;

    // Tính toán bắt đầu và kết thúc để cắt danh sách
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const paginatedLists = lists.slice(startIndex, endIndex);

    return (
      <>
        {/* {paginatedLists.map((list) => (
          <div className="text-list" key={list.id}>
            <div style={{ margin: "0", wordWrap: "break-word", width: "70%" }}>
              <div>{this.highlightText(list.text, searchQuery)}</div>
              {list.date && (
                <div>{new Date(list.date).toLocaleDateString()}</div>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <CoolButton
                type="button"
                className="add-button-2"
                onClick={() => this.props.updatingList(list)}
              >
                Update
              </CoolButton>
              <CoolButton
                type="button"
                className="add-button-2"
                onClick={() => this.props.deleteList(list.id)}
              >
                Delete
              </CoolButton>
            </div>
          </div>
        ))}
        <CustomPagination
          totalItems={lists.length} 
          itemsPerPage={itemsPerPage}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        /> */}
      </>
    );
  }
}

export default InteractTask;