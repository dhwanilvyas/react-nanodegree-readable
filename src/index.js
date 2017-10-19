import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './app/redux/store';

axios.defaults.baseURL = 'http://localhost:5001/';
axios.defaults.headers.Authorization = "dKx,dmvnsdflkjdfNkdlkfj";
axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
