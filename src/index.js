import React from 'react';
import ReactDOM from 'react-dom/src';
import '../public/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    {/*dont know if needed ^^^^  */}
    <Router history={history}>
      <App />
    </Router>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
