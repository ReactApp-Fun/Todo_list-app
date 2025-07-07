import React from 'react';
import './styles/function.css';
import AddFunction from '../function_part/AddFunction';
import InputFunction from '../function_part/InputFunction';
import InteractTask from '../function_part/InteractTask';

class ListFunction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: JSON.parse(localStorage.getItem('lists')) || [],
            editingList: null,
            showInput: false,
        };
    }
    
    // Lưu lists todo vào localStorage
    saveToLocalStorage = (lists) => {
        localStorage.setItem('lists', JSON.stringify(lists));
        this.setState({ lists });
    }

    // Hàm để thêm một list mới
    addList = (text) => {
        const newList = {
            id: Date.now(),
            text,
            completed: false,
        };
        const updatedLists = [...this.state.lists, newList];
        this.saveToLocalStorage(updatedLists);
    }
    
    // Cập nhật input
    updateList = (id, newText) => {
        const updatedLists = this.state.lists.map(list =>
            list.id === id ? {...list, text: newText} : list 
        )
        this.saveToLocalStorage(updatedLists)
    }

    // Xoá input
    deleteList = (id) => {
        const updatedLists = this.state.lists.filter(list => list.id !== id)
        this.saveToLocalStorage(updatedLists)
    }

    // Hàm để tiến hành update
    updatingList = (list) => {
        this.setState({
            editingList: list,
            showInput: true 
        })
    }

    // Hiển thị input để thêm list mới
    showInput = () => {
        this.setState({
            showInput: true,
            editingList: null,
        });
    }

    // Ẩn input khi ấn cancel
    hideInput = () => {
        this.setState({
            showInput: false,
            editingList: null,
        });
    }
    render(){
        return(
            <div className='form'>
                <div style={{height: '50px'}}>
                    {!this.state.showInput && (
                        <AddFunction 
                            onClick={this.showInput}
                        /> 
                    )}
                    
                    {this.state.showInput &&(
                        <InputFunction 
                            hideInput={this.hideInput}
                            addList={this.addList}
                            updateList = {this.updateList}
                            editingList = {this.state.editingList}
                        />
                    )}
                </div>
                
                <div className='list-container'>
                    <div className='list custom-scrollbar'>
                        <InteractTask 
                            lists = {this.state.lists}
                            updatingList = {this.updatingList}
                            deleteList = {this.deleteList}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default ListFunction;