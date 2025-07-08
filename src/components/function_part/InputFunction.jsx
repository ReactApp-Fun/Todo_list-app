import React from "react";
import "./styles/button.css"
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'; // import default style của thư viện rdp


class InputFunction extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue: props.editingList ? props.editingList.text : '',
            selectedDay: undefined
        }
    }
    componentDidUpdate = (prevProps) =>{
        if (this.props.editingList?.text !== prevProps.editingList?.text) {
            this.setState({
                inputValue: this.props.editingList?.text
            })
        }
    }
    handleDaySelect = (day) => {
        this.setState({ selectedDay: day });
    };
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.submitForm()
    };
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            this.submitForm();
        }
    }
    submitForm = () =>{
        if (this.state.inputValue.trim()) {
            if (this.props.editingList) {
                this.props.updateList(this.props.editingList.id, this.state.inputValue);
            } else {
                this.props.addList(this.state.inputValue);
            }
            this.setState({ inputValue: '' });
            this.props.hideInput();
        }
    }
    handleCancelInput = () => {
        this.props.hideInput()
    }
    render(){
        const {selectedDay} = this.state
        return( 
            <div className="input-display" onSubmit={this.handleSubmit}>
                <form>
                    <input
                        onKeyPress={this.handleKeyDown}
                        value={this.state.inputValue}
                        onChange={this.handleChange }
                        className="task-input"
                        type="text"
                        placeholder="Type your task here..."
                        autoFocus
                    />
                    <button type="button" className="date-picker-button"> Date </button>
                    <DayPicker className="date-table"
                        mode="single"
                        selected={selectedDay}
                        onSelect={this.handleDaySelect}
                    />
                </form>
                
                <button type="submit" className="add-button-2" >
                    Save
                </button>
                <button type="button" 
                        className="add-button-2"    
                        onClick={this.handleCancelInput}
                >
                    Cancel
                </button>
            </div>
        )
    }
}

export default InputFunction;