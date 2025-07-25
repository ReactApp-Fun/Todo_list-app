import React, { useContext, useRef, useState } from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';   
import SearchFunction from '../function_part/SearchFunction';
import ThemeContext from '../context/ThemeContext';
import withPagination from '../display_part/WithPagination';
import withInfiniteScroll from '../display_part/WithInfiniteScroll';
import SwitchModeFunction from './SwitchModeFunction';
const PaginatedInteractTask = withPagination(InteractTask);
const InfiniteScrollInteractTask = withInfiniteScroll(InteractTask);

function ListFunction({resetPagination}){
    const [state, setState] = useState({
        lists: JSON.parse(localStorage.getItem('lists')) || [],
        editingList: null,
        showInput: false,
        searchQuery: '',
        defaultIsPagi: true
    })
    const {lists, editingList, showInput, searchQuery, defaultIsPagi} = state
    const interactTaskRefForPagination = useRef(null);
    const interactTaskRefForInfiniteScroll = useRef(null)
    const {theme} = useContext(ThemeContext)
    
    // hàm xử lý lưu danh sách vào local
    const saveToLocalStorage = (lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
        setState({ lists });
    }

    // hàm thêm danh sách (text và date đều được thêm)
    const addList = (text, /*date*/ ) => {
        const newList = {
            id: Date.now(),
            text,
            // date: date || null
        };
        const updatedLists = [newList, ...lists];
        saveToLocalStorage(updatedLists);
    }
    
    // cập nhật một task 
    const updateList = (id, newText, /*newDate*/) => {
        const updatedLists = lists.map(list =>
            list.id === id ? {...list, text: newText, /*date: newDate*/} : list 
        );
        saveToLocalStorage(updatedLists);
    }

    // xoá một task 
    const deleteList = (id) => {
        const updatedLists = lists.filter(list => list.id !== id);
        this.saveToLocalStorage(updatedLists);
        setState({
            showInput: false,
        })
    }

    // trạng thái tiến hành đang cập nhật
    const updatingList = (list) => {
        this.setState({
            editingList: list,
            showInput: true 
        });
    }

    // xử lý mở input
    const showUpInput = () => {
        this.setState({
            showInput: true,
            editingList: null,
        });
    }

    // xử lý đóng input
    const hideInput = () => {
        this.setState({
            showInput: false,
            editingList: null,
        });
    }

    // Tạo hàm xử lý debounce để nhằm tạo độ trễ trong tìm kiếm nhằm giảm số lượng yêu cầu không cần thiết
    const debounce = (funct, delay) => {
        let searchTimeout;
        return(...args) => {
            clearTimeout(searchTimeout)
            searchTimeout = setTimeout(() => {
                funct.apply(this, args)
            }, delay)
        }
    }

    // xử lý tìm kiếm khi sử dụng debounce
    const handleSearch = debounce((query) => {
        setState(prevState => ({
            ...prevState,
            searchQuery: query
        }));
        if (interactTaskRefForPagination) {
            interactTaskRefForPagination.resetPagination?.();
        } else if (interactTaskRefForInfiniteScroll) {
            interactTaskRefForInfiniteScroll.resetInfiniteScroll?.();
        }
    }, 700)
    // hàm xử lý chức năng tìm kiếm 
    const getFilteredLists = () => {
        if (!searchQuery?.trim()) {
            return lists;
        }
        return lists.filter(list =>
            list.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    const handleSwitchMode = () => {
        setState(prevState => ({
            ...prevState,
            defaultIsPagi: !defaultIsPagi
        }));
        if (interactTaskRef) {
            interactTaskRef.handleResetPage?.();
        }
    }
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
                        {!showInput && (
                            <AddFunction onClick={showUpInput}/> 
                        )}
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
                    <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                        <SearchFunction onSearch={handleSearch}/>
                        <SwitchModeFunction 
                            onClick={handleSwitchMode} 
                            defaultIsPagi={defaultIsPagi}
                        />
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

export default ListFunction