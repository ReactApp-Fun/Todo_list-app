import React from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';   
import SearchFunction from '../function_part/SearchFunction';
import ThemeContext from '../context/ThemeContext';
import withPagination from '../display_part/WithPagination';
import withInfiniteScroll from '../display_part/WithInfiniteScroll';
const PaginatedInteractTask = withPagination(InteractTask);
const InfiniteScrollInteractTask = withInfiniteScroll(InteractTask);

class ListFunction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: JSON.parse(localStorage.getItem('lists')) || [], // lưu danh sách đã nhập vào local storage
            editingList: null, // state xử lý trạng thái đang cập nhật với trạng thái null
            showInput: false, // đặt trạng thái hiện thị input là sai tránh hiển thị khi mới load web
            searchQuery: '', // đặt search là chuỗi rỗng nhằm lưu giá trị khi nhập
            defaultIsPagi: true
        };
        // đặt giá trị hiện tại của timeout là null
        this.searchTimeout = null;
    }
    static contextType = ThemeContext;
    
    // hàm xử lý lưu danh sách vào local
    saveToLocalStorage = (lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
        this.setState({ lists });
    }

    // hàm thêm danh sách (text và date đều được thêm)
    addList = (text, date) => {
        const newList = {
            id: Date.now(),
            text,
            date: date || null // đặt giá trị mặc định của date là null tránh bị falsy hoặc undefined
        };
        const updatedLists = [newList, ...this.state.lists];
        this.saveToLocalStorage(updatedLists);
    }
    
    // cập nhật một task 
    updateList = (id, newText, newDate) => {
        const updatedLists = this.state.lists.map(list =>
            list.id === id ? {...list, text: newText, date: newDate} : list 
        );
        this.saveToLocalStorage(updatedLists);
    }

    // xoá một task 
    deleteList = (id) => {
        const updatedLists = this.state.lists.filter(list => list.id !== id);
        this.saveToLocalStorage(updatedLists);
        this.setState({
            showInput: false,
        })
    }

    // trạng thái tiến hành đang cập nhật
    updatingList = (list) => {
        this.setState({
            editingList: list,
            showInput: true 
        });
    }

    // xử lý mở input
    showInput = () => {
        this.setState({
            showInput: true,
            editingList: null,
        });
    }

    // xử lý đóng input
    hideInput = () => {
        this.setState({
            showInput: false,
            editingList: null,
        });
    }

    // Tạo hàm xử lý debounce để nhằm tạo độ trễ trong tìm kiếm nhằm giảm số lượng yêu cầu không cần thiết
    debounce = (funct, delay) => {
        return(...args) => {
            clearTimeout(this.searchTimeout)
            this.searchTimeout = setTimeout(() => {
                funct.apply(this, args)
            }, delay)
        }
    }

    // xử lý tìm kiếm khi sử dụng debounce
    handleSearch = this.debounce((query) => {
        this.setState({
            searchQuery: query,
    }, () => {
            if(this.interactTaskRefForPagination){
                this.interactTaskRefForPagination.resetPagination();
            }
            else if(this.interactTaskRefForInfiniteScroll){
                this.interactTaskRefForInfiniteScroll.resetInfiniteScroll();
            }
        })
    }, 700);

    // tham chiếu đến InteractTask thông qua ref
    setInteractTaskRefForPagination = (ref) => {
        this.interactTaskRefForPagination = ref
    }

    setInteractTaskRefForInfiniteScroll = (ref) => {
        this.interactTaskRefForInfiniteScroll = ref;
    }
    // hàm xử lý chức năng tìm kiếm 
    getFilteredLists = () => {
        const { lists, searchQuery } = this.state;
        if (!searchQuery.trim()) {
            return lists;
        }
        return lists.filter(list =>
            list.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    handleSwitchMode = () => {
        this.setState(prevState => ({
            defaultIsPagi: !prevState.defaultIsPagi
        }), () => {
            if (this.interactTaskRef) {
                this.interactTaskRef.handleResetPage?.();
            }
        });
    }

    render() {
        const filteredLists = this.getFilteredLists();
        const { theme } = this.context;
        const { defaultIsPagi } = this.state;

        return (
            <div className='form' 
                style={{backgroundColor: theme === 'light' ? '#fff' : '#424242ff', 
                        color: theme === 'light' ? '#000' : '#fff',
                        transition: 'background-color 0.3s ease, color 0.3s ease' 
                }}>
                <div className='form-align'>
                    <div className='upper-select'>
                        <div className='task-group'>
                            {!this.state.showInput && (
                                <AddFunction 
                                    onClick={this.showInput}
                                /> 
                            )}
                            
                            {this.state.showInput && (
                                <InputFunction 
                                    hideInput={this.hideInput}
                                    addList={this.addList}
                                    updateList={this.updateList}
                                    editingList={this.state.editingList}
                                />
                            )}
                        </div>
                        <div className="vertical-line"></div>
                        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                            <SearchFunction 
                                onSearch={this.handleSearch}
                            />
                        </div>
                        <button 
                            onClick={this.handleSwitchMode}
                            style={{
                                padding: '5px 10px',
                                cursor: 'pointer',
                                backgroundColor: theme === 'light' ? '#eee' : '#555',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                        >
                            {defaultIsPagi ? 'Switch to Infinite Scroll' : 'Switch to Pagination'}
                        </button>
                    </div>
                    
                    <div className='list-container'>
                        <div className='list'>
                            {defaultIsPagi ? (
                            <PaginatedInteractTask 
                                lists={filteredLists}
                                updatingList={this.updatingList}
                                deleteList={this.deleteList}
                                ref={this.setInteractTaskRefForPagination}
                                searchQuery={this.state.searchQuery}
                                itemsPerPage={5} 
                            />
                        ) : (
                            <InfiniteScrollInteractTask 
                                lists={filteredLists}
                                updatingList={this.updatingList}
                                deleteList={this.deleteList}
                                ref={this.setInteractTaskRefForInfiniteScroll}
                                searchQuery={this.state.searchQuery}
                                itemsPerPage={5} 
                            />
                        )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListFunction