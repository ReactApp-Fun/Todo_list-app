import React from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';
import SearchFunction from './SearchFunction';

class ListFunction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: JSON.parse(localStorage.getItem('lists')) || [],
            editingList: null,
            showInput: false,
            searchQuery: '',
        };
    }
    
    saveToLocalStorage = (lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
        this.setState({ lists });
    }

    addList = (text, date) => {
        const newList = {
            id: Date.now(),
            text,
            completed: false,
            date: date || null
        };
        const updatedLists = [...this.state.lists, newList];
        this.saveToLocalStorage(updatedLists);
    }
    
    updateList = (id, newText, newDate) => {
        const updatedLists = this.state.lists.map(list =>
            list.id === id ? {...list, text: newText, date: newDate} : list 
        );
        this.saveToLocalStorage(updatedLists);
    }

    deleteList = (id) => {
        const updatedLists = this.state.lists.filter(list => list.id !== id);
        this.saveToLocalStorage(updatedLists);
    }

    updatingList = (list) => {
        this.setState({
            editingList: list,
            showInput: true 
        });
    }

    showInput = () => {
        this.setState({
            showInput: true,
            editingList: null,
        });
    }

    hideInput = () => {
        this.setState({
            showInput: false,
            editingList: null,
        });
    }

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
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