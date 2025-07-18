import React from "react";
import ThemeContext from "../context/ThemeContext";

class ThemeSwitcherFunction extends React.Component {
    render(){
        return(
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? 'Dark' : 'Light'}
                    </button>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default ThemeSwitcherFunction;