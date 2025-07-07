import TodoTable from './components/display_part/TodoTable';
import ListFunction from './components/function_part/ListFunction';


const App = () => {
  return (
    <div className="App">
      <TodoTable>
        <ListFunction />
      </TodoTable>
    </div>
  );
}


export default App;
