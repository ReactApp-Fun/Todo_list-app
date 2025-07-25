import React from 'react';
import TodoTable from './components/display_part/TodoTable';
import ListFunction from './components/function_part/ListFunction';
import './components/function_part/styles/function.css';
import SwitchThemeFunction from './components/function_part/SwitchThemeFunction';

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
        <SwitchThemeFunction />
      </div>
    );
  }
}

export default App;