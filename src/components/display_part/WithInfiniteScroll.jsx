import React, { useState, useEffect, useRef, useCallback } from 'react';

function withInfiniteScroll(WrappedComponent) {
  return function InfiniteScrollWrapper(props) {
    // Khởi tạo state
    const [state, setState] = useState({
      itemsToShow: props.itemsPerPage || 5,
      isLoading: false,
      hasMore: true
    });

    const scrollContainerRef = useRef(null);

    // Destructuring state và props
    const { itemsToShow, isLoading, hasMore } = state;
    const { lists, itemsPerPage } = props;

    // Kiểm tra xem còn item để load không
    const checkIfMoreItems = useCallback(() => {
      setState(prev => ({
        ...prev,
        hasMore: Array.isArray(lists) && prev.itemsToShow < lists.length
      }));
    }, [lists]);

    // Load thêm items
    const loadMoreItems = useCallback(() => {
      if (isLoading || !hasMore) return;

      setState(prev => ({ ...prev, isLoading: true }));

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          itemsToShow: prev.itemsToShow + (itemsPerPage || 5),
          isLoading: false
        }));
      }, 700);
    }, [isLoading, hasMore, itemsPerPage]);

    // Xử lý scroll
    const handleScroll = useCallback(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && !isLoading && hasMore) {
        loadMoreItems();
      }
    }, [isLoading, hasMore, loadMoreItems]);

    // Reset scroll
    const resetInfiniteScroll = useCallback(() => {
      setState({
        itemsToShow: itemsPerPage || 5,
        isLoading: false,
        hasMore: true
      });
    }, [itemsPerPage]);

    // Effect cho componentDidMount và componentWillUnmount
    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
      };
    }, [handleScroll]);

    // Effect cho componentDidUpdate
    useEffect(() => {
      checkIfMoreItems();
    }, [lists, checkIfMoreItems]);

    // Render
    const displayedLists = Array.isArray(lists) ? lists.slice(0, itemsToShow) : [];

    return (
      <div ref={scrollContainerRef} className="infinite-scroll-container">
        <WrappedComponent
          {...props}
          lists={displayedLists}
          handleResetPage={resetInfiniteScroll}
        />
        {isLoading && <div className="loading-message">Loading more items...</div>}
        {!hasMore && lists?.length > 0 && (
          <div className="no-more-items">No more items to load</div>
        )}
      </div>
    );
  };
};

export default withInfiniteScroll;