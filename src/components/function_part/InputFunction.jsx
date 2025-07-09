import React from "react";
import "./styles/button.css"
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'; // import default style của thư viện rdp


class InputFunction extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue: props.editingList ? props.editingList.text : '',
            selectedDay: undefined,
            isOpen: false,
            selectedDate: props.editingList ? props.editingList.date: ''
        };
        this.datePickerRef = React.createRef()
    }
    componentDidUpdate = (prevProps) =>{
        if (this.props.editingList?.text !== prevProps.editingList?.text) {
            this.setState({
                inputValue: this.props.editingList?.text,
                selectedDate: this.props.editingList?.date
            })
        }
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
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
    submitForm = () => {
        if (this.state.inputValue.trim()) {
            if (this.props.editingList) {
                this.props.updateList(
                    this.props.editingList.id, 
                    this.state.inputValue,
                    this.state.selectedDate
                );
            } else {
                this.props.addList(
                    this.state.inputValue,
                    this.state.selectedDate
                );
            }
            this.setState({ inputValue: '',
                            selectedDate: '' 
                        });
            this.props.hideInput();
        }
    }
    handleCancelInput = () =>{
        this.props.hideInput()
    }

    handleClickOutside = (event) => {
        if (this.datePickerRef.current && !this.datePickerRef.current.contains(event.target)) {
        this.setState({ isOpen: false });
        }
    };

    handleDayClick = (day) => {
        this.setState({
            selectedDate: day,
            isOpen: false, // Tự động đóng sau khi chọn ngày
        });
    };

    toggleDatePicker = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };
    render(){
        const {isOpen, selectedDate} = this.state

        return( 
            <form className="input-display" onSubmit={this.handleSubmit}>
                <div>
                    <input
                        required
                        onKeyDown={this.handleKeyDown}
                        value={this.state.inputValue}
                        onChange={this.handleChange }
                        className="task-input"
                        type="text"
                        placeholder="Type your task here..."
                    />
                    <input 
                        required
                        type="text"
                        className="date-input"
                        value={selectedDate ? new Date(selectedDate).toLocaleDateString() : ''}
                        onClick={this.toggleDatePicker}
                        onChange={this.handleChange}
                        placeholder="Pick date...(mm/dd/yy)"
                    />
                    {isOpen && (
                        <div ref={this.datePickerRef}>
                            <DayPicker 
                                captionLayout="dropdown"
                                className="date-table"
                                disabled={{before: new Date()}}
                                mode="single"
                                onDayClick={this.handleDayClick}
                            />
                        </div>
                    )}
                    
                </div>
                
                <button type="submit" className="add-button-2" >
                    Save
                </button>
                <button type="button" 
                        className="add-button-2"    
                        onClick={this.handleCancelInput}
                >
                    Cancel
                </button>
            </form>
        )
    }
}

export default InputFunction;