import React from 'react';
import './styles/function.css';
import {CoolButton} from '../context/ButtonStyle.js';

function AddFunction({onClick}) {
    return(
        <div className='add-button-container' >
                <CoolButton type='button' onClick={onClick} >
                    New Task
                </CoolButton>
            </div>
    )
}
export default AddFunction;