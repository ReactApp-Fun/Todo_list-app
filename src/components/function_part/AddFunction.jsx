import React from 'react';
import './styles/function.css';
import plus from '../../assets/plus-icon.svg'

class AddFunction extends React.Component {
    render(){
        return(
        <div className='add-button-container'>
                <button type='button' onClick={this.props.onClick} className='add-button'>
                    <img src={plus} alt='plus icon' className='icon-plus'/>
                </button>
            </div>
        )
    }
}
export default AddFunction;