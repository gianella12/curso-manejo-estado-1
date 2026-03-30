import { UseState } from './UseState';
import { UseReducer } from './useReducer';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <UseReducer name="use Reducer"/>
    </div>
  );
}

export default App;
