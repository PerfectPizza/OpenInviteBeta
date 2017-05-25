import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ViewRouter from './router'; // may need to add '.jsx' extension


render(
  <Provider>
    <ViewRouter />
  </Provider>,
  document.getElementById('app'),
);
