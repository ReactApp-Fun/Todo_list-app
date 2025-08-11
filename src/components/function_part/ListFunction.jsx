import React, { useEffect, useRef, useContext } from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';   
import SearchFunction from '../function_part/SearchFunction';
import ThemeContext from '../context/ThemeContext';
import withPagination from '../display_part/WithPagination';
import withInfiniteScroll from '../display_part/WithInfiniteScroll';
import SwitchModeFunction from './SwitchModeFunction';

import { useDispatch, useSelector } from 'react-redux';
import{
  fetchLists,
  saveToMockAPI,
  setEditingList,
  toggleShowInput,
  setSearchQuery,
  togglePagiMode
} from '../../store'
import { API_URL } from '../../APIconfig';

const PaginatedInteractTask = withPagination(InteractTask);
const InfiniteScrollInteractTask = withInfiniteScroll(InteractTask);

function ListFunction() {
  const dispatch = useDispatch();
  const {lists, editingList, showInput, searchQuery, defaultIsPagi} = useSelector(state => state)
  const interactTaskRefForPagination = useRef(null);
  const interactTaskRefForInfiniteScroll = useRef(null);
  const { theme } = useContext(ThemeContext);

  // Lấy dữ liệu từ MockAPI khi component mount
  // xử dụng async / await để xử lý bất đồng bộ
  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  // Thêm danh sách
  const addList = async (text) => {
    const newList = { text };
    await dispatch(saveToMockAPI('post', newList))
  };

  // Cập nhật một task
  const updateList = async (id, newText) => {
    await dispatch(saveToMockAPI('put', {text: newText}, id))
  };

  // Xóa một task
  const deleteList = async (id) => {
    await dispatch(saveToMockAPI('delete', null, id))
  };

  // Trạng thái tiến hành đang cập nhật
  const updatingList = (list) => {
    dispatch(setEditingList(list))
  };

  // Xử lý mở input
  const showUpInput = () => {
    dispatch(toggleShowInput())
  };

  // Xử lý đóng input
  const hideInput = () => {
    dispatch(setEditingList(null))
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
    dispatch(setSearchQuery(query));
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
    dispatch(togglePagiMode());
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
                apiUrl={API_URL}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFunction;