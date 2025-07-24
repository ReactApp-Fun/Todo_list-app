import React from 'react';
import './styles/accessory.css'
import ThemeContext from '../context/ThemeContext';

class TodoTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
            popupOpen: false
        }
    }
    static contextType = ThemeContext;
    render(){
        const { theme } = this.context;
        return(
            <div className='bg-container' 
                 style={{ backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
                        color: theme === 'light' ? '#000' : '#fff',
                        transition: 'background-color 0.3s ease, color 0.3s ease' }}>
                <div className="title-block">
                    <h1 className="title">Todo Website</h1>
                </div>
                {this.props.children}
            </div>
        )
    }
}
export default TodoTable;