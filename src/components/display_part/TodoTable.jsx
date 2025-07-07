import React from 'react';
import './styles/accessory.css'

const TodoTable = ({ children }) => {
    return(
        <div className='bg-container'>
            <div className="white-bg">
                <div className="title-block">
                    <h1 className="title">Todo List Website</h1>
                </div>
                {children}
            </div>
        </div>
    )
}

export default TodoTable;
