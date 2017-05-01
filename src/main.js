import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('mount'),
  );
});
