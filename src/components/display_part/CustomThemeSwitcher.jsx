import React,{useState} from "react";
import ThemeContext from "../context/ThemeContext"; 

function CustomThemeSwitcher({children}){
  const [theme, setTheme] = useState('theme')

  const toggleTheme = () => {
    setTheme((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  );
}

export default CustomThemeSwitcher;