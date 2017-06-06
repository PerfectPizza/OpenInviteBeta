import { createStore, combineReducers } from 'redux';
import events from './reducers/events';
import user from './reducers/user';
import map from './reducers/map';
import userLocation from './reducers/location';
import markers from './reducers/markers';

const combinedReducers = combineReducers({ events, user, map, userLocation, markers });

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
