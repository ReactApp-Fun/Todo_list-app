import React from "react";
import './styles/button.css'

//Note: chức năng search hoạt động bằng cách gõ bất cữ chữ cái nào:
// - nếu có chữ cái liên quan thì sẽ hiển thị ra task liên quan
// - nếu không sẽ trả về chuỗi rỗng 
class SearchFunction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchInput: false, // đặt trạng thái ban đầu của thanh search là false tránh hiển thị khi vừa load trang
            searchInputValue: '' // Giá trị ban đầu rỗng để lưu giá trị
        };
    }   

    // xử lý nhập cho thanh search
    toggleInput = () => {
        this.setState(prevState => ({
            showSearchInput: !prevState.showSearchInput,
            searchInputValue: prevState.showSearchInput ? '' : prevState.searchInputValue
        }), () => {
            if (!this.state.showSearchInput) {
                this.props.onSearch('');
            }
        });
    }

     // xử lý thay đổi 
    handleChange = (e) => { 
        const value = e.target.value;
        this.setState({ searchInputValue: value }, () => {
            this.props.onSearch(value);
        });
    }

    // xử lý tránh việc nhập nút enter reload trang
    handlePreventEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    }
    
    render() {
        return (
            <div>
                {!this.state.showSearchInput ? (
                    <button 
                        type="button" 
                        className="add-button-2"
                        onClick={this.toggleInput}
                    >
                        Search
                    </button>
                ) : (
                    <form className="search-container">
                        <input  
                            type="text" 
                            className="search-input"
                            placeholder="Search..."
                            value={this.state.searchInputValue}
                            onChange={this.handleChange}
                            onKeyDown={this.handlePreventEnterKey}
                        />
                        <button 
                            type="button" 
                            className="close-search add-button"
                            onClick={this.toggleInput}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export default SearchFunction;