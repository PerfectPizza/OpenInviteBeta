import { createStore, combineReducers } from 'redux';
import events from './reducers/events';
import user from './reducers/user';

const combinedReducers = combineReducers({ events, user });

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
