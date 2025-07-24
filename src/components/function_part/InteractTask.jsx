import React from "react";
import './styles/function.css'
import { CoolButton } from "../context/ButtonStyle";

class InteractTask extends React.Component {
  handleResetPage = () => {
    this.props.resetPagination();
  }
  // hàm xử lý highlight một kí tự khi được tìm kiếm
  highlightText = (text, query) => {
    if(!query.trim()){
      return text
    }
    const regex = new RegExp(`(${query})`, 'gi'); // Biểu thức chính quy để không phân biệt chữ hoa/thường
    // gi: g:global, i:insensitive
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
    const { lists, searchQuery, updatingList, deleteList } = this.props;

    return (
      <React.Fragment>
        <>
        {lists.map((list) => (
          <div className="text-list" key={list.id}>
            <div style={{ margin: "0", wordWrap: "break-word", width: "70%" }}>
              <div>{this.highlightText(list.text, searchQuery)}</div>
              {/* {list.date && (
                <div>{new Date(list.date).toLocaleDateString()}</div>
              )} */}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <CoolButton
                type="button"
                className="add-button-2"
                onClick={() => updatingList(list)}
              >
                Update
              </CoolButton>
              <CoolButton
                type="button"
                className="add-button-2"
                onClick={() => deleteList(list.id)}
              >
                Delete
              </CoolButton>
            </div>
          </div>
        ))}
        </>
      </React.Fragment>
    )
  }
}

export default InteractTask