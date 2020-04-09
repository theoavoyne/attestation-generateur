// import './config/redirect';

import 'normalize.css/normalize.css';
import './static/styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import(
  /* webpackChunkName: 'app' */
  './components/App'
).then(({ default: App }) => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
