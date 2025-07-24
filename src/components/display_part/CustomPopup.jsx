import React from "react";
import ReactDOM from 'react-dom';
import '../function_part/styles/function.css';
import ThemeSwitcherFunction from '../function_part/SwitchThemeFunction';

class CustomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.popupRoot = document.getElementById('popup-root');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (this.popupRoot) {
      this.popupRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.popupRoot) {
      this.popupRoot.removeChild(this.el);
    }
  }

  render() {
    if (!this.props.isOpen) return null;
    
    return ReactDOM.createPortal(
      <div className="popup-overlay" onClick={this.props.onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={this.props.onClose}>×</button>
          <ThemeSwitcherFunction />
          {this.props.children}
        </div>
      </div>,
      this.el
    );
  }
}

export default CustomPopup;