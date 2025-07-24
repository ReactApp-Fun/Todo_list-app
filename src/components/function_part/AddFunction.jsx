import React from 'react';
import './styles/function.css';
import {CoolButton} from '../context/ButtonStyle.jsx';

class AddFunction extends React.Component {
    render(){
        return(
        <div className='add-button-container' >
                <CoolButton type='button' onClick={this.props.onClick} >
                    New Task
                </CoolButton>
            </div>
        )
    }
}
export default AddFunction;