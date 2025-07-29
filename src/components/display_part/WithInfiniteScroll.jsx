import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

function withInfiniteScroll(WrappedComponent) {
  return function InfiniteScrollWrapper(props) {
    const [state, setState] = useState({
      items: [], // Danh sách các item đã tải
      page: 1, // Trang hiện tại
      isLoading: false,
      hasMore: true,
    });

    const scrollContainerRef = useRef(null);
    const { itemsPerPage = 5 } = props; // Mặc định 5 item mỗi trang

    // Load thêm dữ liệu từ API
    const loadMoreItems = useCallback(async () => {
      if (state.isLoading || !state.hasMore) return;

      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const response = await axios.get(`${props.apiUrl || 'https://688741f1071f195ca97ff56f.mockapi.io/lists'}`, {
          params: {
            page: state.page,
            limit: itemsPerPage,
          },
        });
        const newItems = response.data;

        setState(prev => ({
          ...prev,
          items: [...prev.items, ...newItems],
          page: prev.page + 1,
          isLoading: false,
          hasMore: newItems.length === itemsPerPage, // Nếu số item < limit, hết dữ liệu
        }));
      } catch (error) {
        console.error('Error loading more items:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }, [state.isLoading, state.hasMore, state.page, itemsPerPage, props.apiUrl]);

    // Xử lý scroll
    const handleScroll = useCallback(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && !state.isLoading && state.hasMore) {
        loadMoreItems();
      }
    }, [state.isLoading, state.hasMore, loadMoreItems]);

    // Reset scroll
    const resetInfiniteScroll = useCallback(() => {
      setState({
        items: [],
        page: 1,
        isLoading: false,
        hasMore: true,
      });
    }, []);

    // Effect cho scroll event
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

    // Load dữ liệu ban đầu
    useEffect(() => {
      loadMoreItems();
    }, [loadMoreItems]);

    return (
      <div ref={scrollContainerRef} className="infinite-scroll-container">
        <WrappedComponent
          {...props}
          lists={state.items}
          handleResetPage={resetInfiniteScroll}
        />
        {state.isLoading && <div className="loading-message">Loading more items...</div>}
        {!state.hasMore && state.items.length > 0 && (
          <div className="no-more-items">No more items to load</div>
        )}
      </div>
    );
  };
}

export default withInfiniteScroll;