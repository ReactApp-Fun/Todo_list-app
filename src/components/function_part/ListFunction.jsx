import React, { useState, useEffect, useRef, useContext } from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';   
import SearchFunction from '../function_part/SearchFunction';
import ThemeContext from '../context/ThemeContext';
import withPagination from '../display_part/WithPagination';
import withInfiniteScroll from '../display_part/WithInfiniteScroll';
import SwitchModeFunction from './SwitchModeFunction';
import axios from 'axios';

const API_URL = 'https://688741f1071f195ca97ff56f.mockapi.io/lists';
const PaginatedInteractTask = withPagination(InteractTask);
const InfiniteScrollInteractTask = withInfiniteScroll(InteractTask);

function ListFunction() {
  const [state, setState] = useState({
    lists: [],
    editingList: null,
    showInput: false,
    searchQuery: '',
    defaultIsPagi: true,
  });
  const { lists, editingList, showInput, searchQuery, defaultIsPagi } = state;
  const interactTaskRefForPagination = useRef(null);
  const interactTaskRefForInfiniteScroll = useRef(null);
  const { theme } = useContext(ThemeContext);

  // Lấy dữ liệu từ MockAPI khi component mount
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(API_URL);
        setState(prev => ({ ...prev, lists: response.data }));
      } catch (error) {
        console.error('Error when tried to get data from MockAPI:', error);
      }
    };
    fetchLists();
  }, []);

  // Hàm lưu dữ liệu lên MockAPI (sử dụng POST cho thêm mới, PUT cho cập nhật từng item)
  const saveToMockAPI = async (method, data, id = null) => {
    try {
      let response;
      if (method === 'post') {
        response = await axios.post(API_URL, data); // Thêm mới
        return response.data; // MockAPI trả về item mới
      } else if (method === 'put' && id) {
        response = await axios.put(`${API_URL}/${id}`, data); // Cập nhật item
        return response.data;
      }
      setState(prev => ({ ...prev, lists: [...prev.lists, response.data] }));
    } catch (error) {
      console.error('Error when save data to MockAPI:', error);
    }
  };

  // Thêm danh sách
  const addList = async (text) => {
    const newList = { text };
    const addedList = await saveToMockAPI('post', newList); // MockAPI tự sinh ID
    setState(prev => ({ ...prev, lists: [...prev.lists, addedList], showInput: false }));
  };

  // Cập nhật một task
  const updateList = async (id, newText) => {
    const updatedList = { id, text: newText };
    const result = await saveToMockAPI('put', updatedList, id);
    setState(prev => ({
      ...prev,
      lists: prev.lists.map(list => (list.id === id ? result : list)),
      showInput: false,
    }));
  };

  // Xóa một task
  const deleteList = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setState(prev => ({
        ...prev,
        lists: prev.lists.filter(list => list.id !== id),
        showInput: false,
      }));
    } catch (error) {
      console.error('Error when deleting from MockAPI:', error);
    }
  };

  // Trạng thái tiến hành đang cập nhật
  const updatingList = (list) => {
    setState(prev => ({ ...prev, editingList: list, showInput: true }));
  };

  // Xử lý mở input
  const showUpInput = () => {
    setState(prev => ({ ...prev, showInput: true, editingList: null }));
  };

  // Xử lý đóng input
  const hideInput = () => {
    setState(prev => ({ ...prev, showInput: false, editingList: null }));
  };

  // Tạo hàm debounce
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Xử lý tìm kiếm với debounce
  const handleSearch = debounce((query) => {
    setState(prev => ({ ...prev, searchQuery: query }));
    if (interactTaskRefForPagination.current?.resetPagination) {
      interactTaskRefForPagination.current.resetPagination();
    } else if (interactTaskRefForInfiniteScroll.current?.resetInfiniteScroll) {
      interactTaskRefForInfiniteScroll.current.resetInfiniteScroll();
    }
  }, 700);

  // Lọc danh sách
  const getFilteredLists = () => {
    if (!searchQuery?.trim()) return lists;
    return lists.filter(list =>
      list.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Xử lý chuyển mode
  const handleSwitchMode = () => {
    setState(prev => ({ ...prev, defaultIsPagi: !prev.defaultIsPagi }));
    if (interactTaskRefForPagination.current?.resetPagination) {
      interactTaskRefForPagination.current.resetPagination();
    } else if (interactTaskRefForInfiniteScroll.current?.resetInfiniteScroll) {
      interactTaskRefForInfiniteScroll.current.resetInfiniteScroll();
    }
  };

  const filteredLists = getFilteredLists();

  return (
    <div className='form' 
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#424242ff', 
        color: theme === 'light' ? '#000' : '#fff',
        transition: 'background-color 0.3s ease, color 0.3s ease' 
      }}>
      <div className='form-align'>
        <div className='upper-select'>
          <div className='task-group'>
            {!showInput && <AddFunction onClick={showUpInput} />}
            {showInput && (
              <InputFunction 
                hideInput={hideInput}
                addList={addList}
                updateList={updateList}
                editingList={editingList}
              />
            )}
          </div>
          <div className="vertical-line"></div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <SearchFunction onSearch={handleSearch} />
            <SwitchModeFunction onClick={handleSwitchMode} defaultIsPagi={defaultIsPagi} />
          </div>
        </div>
        <div className='list-container'>
          <div className='list'>
            {defaultIsPagi ? (
              <PaginatedInteractTask 
                lists={filteredLists}
                updatingList={updatingList}
                deleteList={deleteList}
                ref={interactTaskRefForPagination}
                searchQuery={searchQuery}
                itemsPerPage={5} 
              />
            ) : (
              <InfiniteScrollInteractTask 
                lists={filteredLists}
                updatingList={updatingList}
                deleteList={deleteList}
                ref={interactTaskRefForInfiniteScroll}
                searchQuery={searchQuery}
                itemsPerPage={5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFunction;