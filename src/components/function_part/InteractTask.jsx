// InteractTask.jsx
import React from "react";
import withPagination from "../display_part/WithPagination"; // Đường dẫn tới withPagination
import './styles/function.css';
import { CoolButton } from "../context/ButtonStyle";

class InteractTask extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.lists !== this.props.lists) {
      this.props?.handlePageChange(1); // Reset về trang 1 khi danh sách thay đổi
    }
  }

  highlightText = (text, query) => {
    if (!query.trim()) {
      return text;
    }
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  render() {
    const { paginatedLists, searchQuery, updatingList, deleteList } = this.props;

    return (
      <React.Fragment>
        <>
          {paginatedLists.map((list) => (
            <div className="text-list" key={list.id}>
              <div style={{ margin: "0", wordWrap: "break-word", width: "70%" }}>
                <div>{this.highlightText(list.text, searchQuery)}</div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <CoolButton
                  type="button"
                  onClick={() => updatingList(list)}
                >
                  Update
                </CoolButton>
                <CoolButton
                  type="button"
                  onClick={() => deleteList(list.id)}
                >
                  Delete
                </CoolButton>
              </div>
            </div>
          ))}
          <div className="pagination">{this.props.pageNumbers}</div>
        </>
      </React.Fragment>
    );
  }
}

export default withPagination(InteractTask);