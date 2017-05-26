const eventsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'ADD EVENTS':
    // payload is an array of events
      return [...state, ...payload];
    case 'EDIT EVENT':
    // payload is an event
      return [...state.filter(event => event._id !== payload._id), payload];
    case 'DELETE EVENT':
    // payload is an event
      return state.filter(event => event._id !== payload._id);
    default:
      return state;
  }
};

export default eventsReducer;
