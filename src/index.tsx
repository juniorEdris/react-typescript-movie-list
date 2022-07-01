import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ReduxWrapper = () => (
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);

root.render(
  <React.StrictMode>
    <ReduxWrapper />
  </React.StrictMode>
);


reportWebVitals();
