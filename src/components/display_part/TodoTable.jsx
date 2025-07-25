import React,{useContext} from 'react';
import './styles/accessory.css'
import ThemeContext from '../context/ThemeContext';

function TodoTable({children}){
    const { theme } = useContext(ThemeContext)
    return(
        <div className='bg-container' 
            style={{ backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
                     color: theme === 'light' ? '#000' : '#fff',
                     transition: 'background-color 0.3s ease, color 0.3s ease' }}>
                <div className="title-block">
                    <h1 className="title"
                        style={{
                            color: theme === 'light' ? '#000' : '#fff',
                            transition: 'background-color 0.3s ease, color 0.3s ease'
                        }}>
                        Todo Website</h1>
                </div>
            {children}
        </div>
    )
}   
export default TodoTable;