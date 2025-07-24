import React from "react";
import {CoolButton} from '../context/ButtonStyle.js';

class SwitchModeFunction extends React.Component {
    render(){
        return(
            <div>
                <CoolButton onClick={this.props.onClick} >
                    {this.props.defaultIsPagi 
                    ? 'Infinite Scroll' 
                    : 'Pagination'}
                </CoolButton>
            </div>
        )
    }
}

export default SwitchModeFunction;