import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ViewRouter from './router';

const App = () => (
  <Provider store={store}>
    <ViewRouter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
