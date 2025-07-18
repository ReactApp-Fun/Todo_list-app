import React from 'react';
import './styles/accessory.css'
import CustomPopup from './CustomPopup';
import ThemeContext from '../context/ThemeContext';
import SwitchThemeFunction from '../function_part/SwitchThemeFunction';

class TodoTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
            popupOpen: false
        }
    }
    static contextType = ThemeContext;
    handlePopup = () =>{ 
        this.setState(prev => ({popupOpen: !prev.popupOpen}))
    }
    handlePopupClick = () => {
        this.setState({popupOpen: false})
    }
    render(){
        const { theme } = this.context;
        return(
            <div className='bg-container' style={{ backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
                                                   color: theme === 'light' ? '#000' : '#fff',
                                                   transition: 'background-color 0.3s ease, color 0.3s ease' }}>
                <div className="title-block">
                    <h1 className="title">Todo Website</h1>
                </div>
                {this.props.children}
                <button onClick={this.handlePopup}>
                    {this.popupOpen ? 'Hide' : 'Open'}
                </button>
                <CustomPopup 
                    onClick = {this.handlePopupClick}
                    isOpen = {this.state.popupOpen}
                />
                <SwitchThemeFunction />
            </div>
        )
    }
}
export default TodoTable;
