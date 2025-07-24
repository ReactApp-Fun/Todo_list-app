import React from "react";
import ReactDOM from 'react-dom'
import '../function_part/styles/function.css'
class CustomPopup extends React.Component{
    render(){
        if(!this.props.isOpen) return null
        return ReactDOM.createPortal(
            <div className="popup" onClick={this.props.onClick}>
                
            </div>,
            document.getElementById('popup-root')
        )
    }
}

export default CustomPopup