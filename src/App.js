import {Provider} from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './layout/Landing.js';
import './App.css'


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Landing/>
    </div>
    </Provider>
  );
}

export default App;
