import React, { useEffect } from "react";
import './styles/function.css';
import { CoolButton } from "../context/ButtonStyle";

function InteractTask({ lists, searchQuery, updatingList, deleteList, handleResetPage }) {
  // Debug dữ liệu để kiểm tra ID
  useEffect(() => {
    if (lists) {
      const ids = lists.map(list => list.id);
      const uniqueIds = new Set(ids).size;
      if (uniqueIds !== ids.length) {
        console.warn();
      }
    }
  }, [lists]);

  const highlightText = (text, query) => {
    if (!query?.trim()) {
      return text;
    }
    const regex = new RegExp(`(${query})`, 'gi'); // gi: g:global, i:insensitive
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <React.Fragment>
      <>
        {lists?.map((list, index) => (
          <div className="text-list" key={`${list.id}-${index}`}>
            <div style={{ margin: "0", wordWrap: "break-word", width: "70%" }}>
              <div>{highlightText(list.text, searchQuery)}</div>
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
  );
}

export default React.memo(InteractTask);