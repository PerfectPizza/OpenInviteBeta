import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import ViewRouter from './router';

const App = () => (
  <MultiThemeProvider>
    <Provider store={store}>
      <ViewRouter />
    </Provider>
  </MultiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
