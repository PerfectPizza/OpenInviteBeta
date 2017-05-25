import { combineReducers } from 'redux';

const eventsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'ADD EVENT':
      // INSERT LOGIC
      return { ...state, ...payload };
    case 'EDIT EVENT':
      // INSERT LOGIC
      return { ...state, ...payload };
    case 'DELETE EVENT':
      // INSERT LOGIC
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default combineReducers({
  eventsReducer,
});
