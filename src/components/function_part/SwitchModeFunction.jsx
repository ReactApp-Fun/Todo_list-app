import React from "react";
import {CoolButton} from '../context/ButtonStyle.js';

function SwitchModeFunction({onClick, defaultIsPagi}) {
    return(
        <div>
            <CoolButton onClick={onClick} >
                {defaultIsPagi 
                ? 'Infinite Scroll' 
                : 'Pagination'}
            </CoolButton>
        </div>
    )

}

export default SwitchModeFunction;