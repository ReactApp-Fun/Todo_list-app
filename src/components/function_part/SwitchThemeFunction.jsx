import React from "react";
import ThemeContext from "../context/ThemeContext";
import './styles/function.css';
import { CoolButton } from "../context/ButtonStyle";
import { CoolButton } from "../context/ButtonStyle";
class ThemeSwitcherFunction extends React.Component {
    render(){
        return(
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
                    <CoolButton onClick={toggleTheme}
                        className="popup">
                        {theme === 'light' ? 'Dark' : 'Light'}
                    </CoolButton>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default ThemeSwitcherFunction;