import React from "react";
import CustomPagination from "../display_part/CustomPagination";

class InteractTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1, // Track current page in InteractTask
    };
  }

  // Handle page change
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const itemsPerPage = 5;
    const { lists } = this.props;
    const { currentPage } = this.state;

    // Calculate start and end indices for slicing the list
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedLists = lists.slice(startIndex, endIndex);

    return (
      <>
        {paginatedLists.map((list) => (
          <div className="text-list" key={list.id}>
            <div style={{ margin: "0", wordWrap: "break-word", width: "70%" }}>
              <div>{list.text}</div>
              {list.date && (
                <div>{new Date(list.date).toLocaleDateString()}</div>
              )}
              <hr />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                className="add-button-2"
                onClick={() => this.props.updatingList(list)}
              >
                Update
              </button>
              <button
                type="button"
                className="add-button-2"
                onClick={() => this.props.deleteList(list.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <CustomPagination
          totalItems={lists.length}
          itemsPerPage={itemsPerPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default InteractTask;