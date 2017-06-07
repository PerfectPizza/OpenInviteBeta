const eventsReducer = (state = [], { type, payload }) => {
  if (type === 'ADD EVENTS') {
    // payload is an array of events
    return [...state, ...payload];
  }
  if (type === 'UPDATE EVENT') {
    // payload is an event
    return [...state.filter(event => event._id !== payload._id), payload];
  }
  if (type === 'DELETE EVENT') {
    // payload is an eventId
    return state.filter(event => event._id !== payload);
  }
  if (type === 'ADD ATTENDEE') {
    // payload is an object containing an eventId, a userId and a userName
    const newEvent = state.find(event => event._id === payload.eventId);
    newEvent.attendees.push({ _id: payload.userId, name: payload.userName });
    return [...state.filter(event => event._id !== payload.eventId), newEvent];
  }
  if (type === 'REMOVE ATTENDEE') {
    // payload is an object containing an eventId, a userId and a userName
    const newEvent = state.find(event => event._id === payload.eventId);
    newEvent.attendees = newEvent.attendees.filter(attendee => attendee._id !== payload.userId);
    return [...state.filter(event => event._id !== payload.eventId), newEvent];
  }
  return state;
};

export default eventsReducer;
