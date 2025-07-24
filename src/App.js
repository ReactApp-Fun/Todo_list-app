import React from 'react';
import TodoTable from './components/display_part/TodoTable';
import ListFunction from './components/function_part/ListFunction';
import CustomPopup from './components/display_part/CustomPopup';
import './components/function_part/styles/function.css';

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
        <button 
        onClick={() => this.setState({ isPopupOpen: true })}
        className="popup"
        >
          Open Popup
        </button>
          
          {/* CustomPopup sử dụng portal */}
          <CustomPopup 
            isOpen={this.state.isPopupOpen} 
            onClose={() => this.setState({ isPopupOpen: false })}
          >
          </CustomPopup>
      </div>
    );
  }
}

export default App;