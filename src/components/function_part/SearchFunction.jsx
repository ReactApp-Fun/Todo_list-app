import React from "react";
import './styles/button.css'

class SearchFunction extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showSearchInput: false,
            searchInputValue: ''
        }
    }   

    toggleInput = () => {
        this.setState(prevState => ({
            showSearchInput: !prevState.showSearchInput,
            searchInputValue: prevState.showSearchInput ? '' : prevState.searchInputValue
        }))
    }

    handleChange = (e) => {
        this.setState({searchInputValue: e.target.value})
    }

    handlePreventEnterKey = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault();
            return false;
        }
    }
    
    render(){
        return(
            <div>
                {!this.state.showSearchInput ? (
                    <button type="button" 
                            className="add-button-2"
                            onClick={this.toggleInput}
                    >
                        Search
                    </button>
                ) : (
                    <form className="search-container">
                        <input  type="text" 
                                className="search-input"
                                placeholder="Search..."
                                onKeyDown={this.handlePreventEnterKey}
                        />
                        <button type="button" 
                                className="close-search add-button"
                                onClick={this.toggleInput}
                        >
                            Cancle</button>
                    </form>
                    
                )}
                
            </div>
        )
    }
    
}

export default SearchFunction 