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
    // payload is an object containing an event_id, a user_id and a userName
    const newEvent = state.find(event => event._id === payload.event_id);
    newEvent.attendees.push({ _id: payload.user_id, name: payload.userName });
    return [...state.filter(event => event._id !== payload.event_id), newEvent];
  }
  if (type === 'REMOVE ATTENDEE') {
    // payload is an object containing an event_id, a user_id and a userName
    const newEvent = state.find(event => event._id === payload.event_id);
    newEvent.attendees = newEvent.attendees.filter(attendee => attendee._id !== payload.user_id);
    return [...state.filter(event => event._id !== payload.event_id), newEvent];
  }
  return state;
};

export default eventsReducer;
