import React from "react";
import ThemeContext from "../context/ThemeContext"; 

class CustomThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    return (
        <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
            {this.props.children}
        </ThemeContext.Provider>
    );
  }
}

export default CustomThemeSwitcher;