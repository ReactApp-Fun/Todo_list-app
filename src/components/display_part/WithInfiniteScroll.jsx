import React, { Component } from "react";

const withInfiniteScroll = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        itemsToShow: this.props.itemsPerPage || 5,
        isLoading: false,
        hasMore: true,
      };
      this.scrollContainerRef = React.createRef();
    }

    componentDidMount() {
        const scrollContainer = this.scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", this.handleScroll);
        }
        this.checkIfMoreItems();
    }

    componentWillUnmount() {
        const scrollContainer = this.scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.removeEventListener("scroll", this.handleScroll);
        }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.lists !== this.props.lists) {
        this.checkIfMoreItems();
      }
    }

    checkIfMoreItems = () => {
      const { lists } = this.props;
      const { itemsToShow } = this.state;
      this.setState({
        hasMore:  Array.isArray(lists) && itemsToShow < lists.length,
      });
    };

    loadMoreItems = () => {
      if (this.state.isLoading || !this.state.hasMore) return;

      this.setState(
        { isLoading: true },
        () => {
          setTimeout(() => {
            this.setState(
              (prevState) => ({
                itemsToShow: prevState.itemsToShow + (this.props.itemsPerPage || 5),
                isLoading: false,
              }),
              () => {
                this.checkIfMoreItems();
              }
            );
          }, 700);
        });
    };

    handleScroll = () => {
        const scrollContainer = this.scrollContainerRef.current;
        if (!scrollContainer) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

        if (isNearBottom && !this.state.isLoading && this.state.hasMore) {
            this.loadMoreItems();
        }
    };

    resetInfiniteScroll = () => {
      this.setState({
        itemsToShow: this.props.itemsPerPage || 5,
        hasMore: true,
      });
    };

    render() {
      const { itemsToShow } = this.state;
      const { lists } = this.props;
      const displayedLists = Array.isArray(lists) ? lists.slice(0, itemsToShow) : [];

      return (
        <div ref={this.scrollContainerRef}
          className="infinite-scroll-container">
          <WrappedComponent
            {...this.props}
            lists={displayedLists}
            handleResetPage={this.resetInfiniteScroll}
          />
          {this.state.isLoading && <div className="loading-message">Loading more items...</div>}
          {!this.state.hasMore && lists?.length > 0 && (
            <div className="no-more-items">No more items to load</div>
          )}
        </div>
      );
    }
  };
};

export default withInfiniteScroll;