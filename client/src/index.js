import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import 'whatwg-fetch';
import 'babel-polyfill';

ReactDOM.render(
      <Router />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

//The day I change this to register, I will be super happy! :)
serviceWorker.unregister();
