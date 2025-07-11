import React from "react";
import "./styles/button.css"
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'; // import default style của thư viện rdp


class InputFunction extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue: props.editingList ? props.editingList.text : '', // tạo trạng thái cho inputValue với giá trị khởi tạo ban đầu là chuỗi rỗng
            selectedDay: undefined, // tạo state cho selectedDay là undefined 
            isOpen: false, // tạo trạng thái ban đầu của isOpen = false nhằm tránh mở day picker từ đầu
            selectedDate: props.editingList ? props.editingList.date: '' // tạo trạng thái cho selectedDate với giá trị khởi tạo ban đầu là chuỗi rỗng
        };
        this.datePickerRef = React.createRef() // tạo ref để lấy giá trị của date picker
    }

    componentDidUpdate = (prevProps) =>{ // tạo một phương thức lifecycle didupdate để render sau khi giá trị được render với tham số prevProps
        //Thêm các toán tử optional chaining (?) vào trước .text nhằm tránh bị xung đột với phần update list (bởi phần update cũng sử dụng input add task để update)
        // Optional chaining lúc này xâu chuỗi các hành động add hoặc update 
        if (this.props.editingList?.text !== prevProps.editingList?.text) {
            this.setState({
                // đặt trạng thái của inputValue với state editingList từ ListFunction component nhằm thực hiện quá trình update với text
                inputValue: this.props.editingList?.text, 
                // selectedDate cũng giống cái trên nhưng với date
                selectedDate: this.props.editingList?.date
            })
        }
        // gán sự kiện "mousedown" được xử lý với hàm callback handleClickOutside sẽ xử lý những lần nhất chuột ra ngoài màn hình để tắt date picker
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    // phương thức xử lý vòng đời của document.removeEventListener sau khi nhấn xong sẽ xoá sự kiện này đi
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // hàm xử lý các thay đổi của input 
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value,
        })
    }

    // hàm submit những gì đã nhập từ input
    handleSubmit = (e) =>{
        e.preventDefault();
        this.submitForm()
    };

    // hàm xử lý nhấn submit bằng nút enter
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            this.submitForm();
        }
    }
    
    // hàm xử lý chức năng submit cho form
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
            this.setState({
                inputValue: '',
                selectedDate: '' 
            });
            this.props.hideInput();
        }
    }

    // xử lý đóng input
    handleCancelInput = () =>{
        this.props.hideInput()
    }

    // xử lý sự kiện bấm ra ngoài màn hình (nằm ngoài phạm vi của day picker) để đóng day picker
    handleClickOutside = (event) => {
        if (this.datePickerRef.current && !this.datePickerRef.current.contains(event.target)) {
        this.setState({ isOpen: false });
        }
    };

    // xử lý hành động trên day picker
    handleDayClick = (day) => {
        this.setState({
            selectedDate: day,
            isOpen: false, // Tự động đóng sau khi chọn ngày
        });
    };

    // xử lý việc nhấn vào day picker
    toggleDayPicker = () => {
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
                        onClick={this.toggleDayPicker}
                        onChange={this.handleChange}
                        placeholder="Pick date...(mm/dd/yy)"
                    />
                    {isOpen && (
                        <div ref={this.datePickerRef}>
                            <DayPicker 
                                captionLayout="dropdown"
                                className="date-table"
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