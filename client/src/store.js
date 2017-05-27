import { createStore, combineReducers } from 'redux';
import events from './reducers/events';

const combinedReducers = combineReducers({ events });

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
