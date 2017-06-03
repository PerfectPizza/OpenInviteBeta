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
    const oldEvent = state.find(event => event._id === payload.event_id);
    return [
      ...state.filter(event => event._id !== payload.event_id),
      { ...oldEvent, attendees: [...oldEvent.attendees, { _id: payload.user_id }] },
    ];
  }
  if (type === 'REMOVE ATTENDEE') {
    // payload is an object containing an event_id and a user_id
    const oldEvent = state.find(event => event._id === payload.event_id);
    return [
      ...state.filter(event => event._id !== payload.event_id),
      { ...oldEvent,
        attendees: oldEvent.attendees.filter(attendee => attendee._id !== payload.user_id),
      }];
  }
  return state;
};

export default eventsReducer;