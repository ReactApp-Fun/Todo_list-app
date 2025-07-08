import React from 'react';
import './styles/accessory.css'

const TodoTable = ({ children }) => {
    return(
        <div className='bg-container'>
            <div className="title-block">
                    <h1 className="title">Todo Website</h1>
                </div>
            {children}
        </div>
    )
}

export default TodoTable;
