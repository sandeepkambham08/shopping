import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// --------------------------------------------    REDUX  --------------------------------------------   //  
import { createStore } from 'redux';          // To initialise store concept 
import reducer from './store/reducer';        // To use reducer file 
import {Provider} from  'react-redux';        // To connect react and redux 

const store = createStore(reducer);

// --------------------------------------------    REDUX  --------------------------------------------   //  

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
