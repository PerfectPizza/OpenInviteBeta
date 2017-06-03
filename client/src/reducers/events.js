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
    // payload is an eventId
    return state.filter(event => event._id !== payload);
  }
  if (type === 'ADD ATTENDEE') {
    // payload is an object containing an event_id and a user_id
    const newEvent = state.find(event => event._id === payload.event_id);
    newEvent.attendees.push(payload.user_id);
    return [...state.filter(event => event._id !== payload.event_id), newEvent];
  }
  if (type === 'REMOVE ATTENDEE') {
    // payload is an object containing an event_id and a user_id
    const newEvent = state.find(event => event._id === payload.event_id);
    newEvent.attendees = newEvent.attendees.filter(attendee => attendee !== payload.user_id);
    return [...state.filter(event => event._id !== payload.event_id), newEvent];
  }
  return state;
};

export default eventsReducer;
