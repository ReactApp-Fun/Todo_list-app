// ListFunction.jsx
import React from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';   
import SearchFunction from '../function_part/SearchFunction';
import ThemeContext from '../context/ThemeContext';

class ListFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: JSON.parse(localStorage.getItem('lists')) || [],
      editingList: null,
      showInput: false,
      searchQuery: '',
    };
    this.searchTimeout = null;
  }
  
  static contextType = ThemeContext;

  saveToLocalStorage = (lists) => {
    localStorage.setItem('lists', JSON.stringify(lists));
    this.setState({ lists });
  }

  addList = (text, date) => {
    const newList = { id: Date.now(), text, date: date || null };
    const updatedLists = [newList, ...this.state.lists];
    this.saveToLocalStorage(updatedLists);
  }
  
  updateList = (id, newText, newDate) => {
    const updatedLists = this.state.lists.map(list =>
      list.id === id ? { ...list, text: newText, date: newDate } : list
    );
    this.saveToLocalStorage(updatedLists);
  }

  deleteList = (id) => {
    const updatedLists = this.state.lists.filter(list => list.id !== id);
    this.saveToLocalStorage(updatedLists);
    this.setState({ showInput: false });
  }

  updatingList = (list) => {
    this.setState({ editingList: list, showInput: true });
  }

  showInput = () => {
    this.setState({ showInput: true, editingList: null });
  }

  hideInput = () => {
    this.setState({ showInput: false, editingList: null });
  }

  debounce = (funct, delay) => {
    return (...args) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        funct.apply(this, args);
      }, delay);
    };
  }

  handleSearch = this.debounce((query) => {
    this.setState({ searchQuery: query }, () => {
      if (this.interactTaskRef) {
        this.interactTaskRef.handlePageChange(1); // Reset trang khi tìm kiếm
      }
    });
  }, 700);

  setInteractTaskRef = (ref) => {
    this.interactTaskRef = ref;
  }

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
    const { theme } = this.context;

    return (
      <div className='form' style={{ 
        backgroundColor: theme === 'light' ? '#fff' : '#424242ff', 
        color: theme === 'light' ? '#000' : '#fff',
        transition: 'background-color 0.3s ease, color 0.3s ease' 
      }}>
        <div className='form-align'>
          <div className='upper-select'>
            <div className='task-group'>
              {!this.state.showInput && (
                <AddFunction onClick={this.showInput} />
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
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <SearchFunction onSearch={this.handleSearch} />
            </div>
          </div>
          
          <div className='list-container'>
            <div className='list custom-scrollbar'>
              <InteractTask 
                lists={filteredLists}
                totalItems={filteredLists.length} // Truyền tổng số item
                itemsPerPage={5} // Số item mỗi trang
                updatingList={this.updatingList}
                deleteList={this.deleteList}
                ref={this.setInteractTaskRef}
                searchQuery={this.state.searchQuery}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListFunction;