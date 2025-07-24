import React from "react";
import ThemeContext from "../context/ThemeContext";
import './styles/function.css';
class ThemeSwitcherFunction extends React.Component {
    render(){
        return(
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
                    <button onClick={toggleTheme} className="theme-button">
                        {theme === 'light' ? 'Dark' : 'Light'}
                    </button>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default ThemeSwitcherFunction;