import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ViewRouter from './router.jsx';
import store from './store';

render(
  <Provider store={store}>
    <ViewRouter />
  </Provider>,
  document.getElementById('app'),
);