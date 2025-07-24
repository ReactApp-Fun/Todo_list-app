import React from 'react';
import TodoTable from './components/display_part/TodoTable';
import ListFunction from './components/function_part/ListFunction';
import './components/function_part/styles/function.css';
import ThemeSwitcherFunction from './components/function_part/SwitchThemeFunction';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
    };
  }
  render() {
    return (
      <div className="App">
        <TodoTable>
          <ListFunction />
        </TodoTable>
        <ThemeSwitcherFunction />
      </div>
    );
  }
}

export default App;