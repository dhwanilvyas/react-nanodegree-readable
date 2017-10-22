import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './app/redux/store';
import ENV from './env';

axios.defaults.baseURL = ENV.apiUrl || 'http://localhost:3001/';
axios.defaults.headers.Authorization = ENV.apiKey || 'sdfKdfksjdfmxv,m';
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
