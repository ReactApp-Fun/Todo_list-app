import React from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';   
import SearchFunction from '../function_part/SearchFunction';

class ListFunction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: JSON.parse(localStorage.getItem('lists')) || [], // lưu danh sách đã nhập vào local storage
            editingList: null, // state xử lý trạng thái đang cập nhật với trạng thái null
            showInput: false, // đặt trạng thái hiện thị input là sai tránh hiển thị khi mới load web
            searchQuery: '', // đặt search là chuỗi rỗng nhằm lưu giá trị khi nhập
        };
        this.searchTimeout = null;
    }

    debounce = (funct, delay) => {
        return(...args) => {
            clearTimeout(this.searchTimeout)
            this.searchTimeout = setTimeout(() => {
                funct.apply(this, args)
            }, delay)
        }
    }
    
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
            completed: false, // trạng thái hoàn thành task với mặc định ban đầu là false (-chưa hoàn thiện chức năng này-)
            date: date || null // đặt giá trị mặc định của date là null tránh bị falsy hoặc undefined
        };
        const updatedLists = [...this.state.lists, newList];
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

    // xử lý tìm kiếm 
    handleSearch = this.debounce((query) => {
        this.setState({searchQuery: query})
    }, 700)

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

    render() {
        const filteredLists = this.getFilteredLists();

        return (
            <div className='form'>
                <div className='form-align'>
                    <div className='upper-select'>
                        <div style={{height: '50px'}}>
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

                        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                            <SearchFunction onSearch={this.handleSearch} />
                        </div>
                    </div>
                    
                    <div className='list-container'>
                        <div className='list custom-scrollbar'>
                            <InteractTask 
                                lists={filteredLists}
                                updatingList={this.updatingList}
                                deleteList={this.deleteList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListFunction;