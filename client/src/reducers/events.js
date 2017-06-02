const eventsReducer = (state = [], { type, payload }) => {
  if (type === 'ADD EVENTS') {
    // payload is an array of events
    return [...state, ...payload];
  }
  if (type === 'EDIT EVENT') {
    // payload is an event
    return [...state.filter(event => event._id !== payload._id), payload];
  }
  if (type === 'DELETE EVENT') {
    // payload is an event
    return state.filter(event => event._id !== payload._id);
  }
  return state;
};

export default eventsReducer;
