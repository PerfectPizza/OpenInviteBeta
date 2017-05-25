import { createStore, combineReducers } from 'redux';
import ListReducers from './components/List/reducers';

const combinedReducers = combineReducers({ ListReducers });

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
