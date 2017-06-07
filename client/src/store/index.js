import { createStore, combineReducers } from 'redux';
import events from '../reducers/events';
import user from '../reducers/user';
import map from '../reducers/map';
import userLocation from '../reducers/location';
import markers from '../reducers/markers';
import { saveState, loadState } from './localStorage';

const combinedReducers = combineReducers({ events, user, map, userLocation, markers });

const store = createStore(
  combinedReducers,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
