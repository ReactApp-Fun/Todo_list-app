import React, { useState } from "react";
import './styles/button.css'
import { CoolButton } from "../context/ButtonStyle";

function SearchFunction({onSearch}) {
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [searchInputValue, setSeachInputVale] = useState('')

    // xử lý mở thanh search
    const toggleInput = () => {
        setShowSearchInput(prevState => {
            const newShowSearchInput = !prevState;
            const newSearchInputValue = prevState ? '' : searchInputValue
            setSeachInputVale(newSearchInputValue)
            if (setShowSearchInput) {
                onSearch('');
            }
            return newShowSearchInput
        });
    }

    // xử lý nhập vào search input
    const handleChange = (e) => {
        const value = e.target.value;
        setSeachInputVale(value)
        onSearch(value);
    }

    // xử lý tránh việc nhập nút enter reload trang
    const handlePreventEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    }
    
    return (
        <div>
            {!showSearchInput ? (
                <CoolButton 
                    type="button" 
                    className="add-button-2"
                    onClick={toggleInput}
                >
                    Search
                </CoolButton>
            ) : (
                <form className="search-container">
                    <input  
                        type="text" 
                        className="search-input"
                        placeholder="Search..."
                        value={searchInputValue}
                        onChange={handleChange}
                        onKeyDown={handlePreventEnterKey}
                    />
                    <CoolButton 
                        type="button" 
                        onClick={toggleInput}
                    >
                        Cancel
                    </CoolButton>
                </form>
            )}
        </div>
    );

}

export default SearchFunction;