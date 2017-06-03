module.exports = {
  deleteEvent(_id) {
    return {
      type: 'DELETE EVENT',
      payload: _id,
    };
  },
  addEvents(events) {
    return {
      type: 'ADD EVENTS',
      payload: events,
    };
  },
  updateEvent(event) {
    return {
      type: 'UPDATE EVENT',
      payload: event,
    };
  },
  addAttendee(event_id, user_id) {
    return {
      type: 'ADD ATTENDEE',
      payload: { event_id, user_id },
    };
  },
  removeAttendee(event_id, user_id) {
    return {
      type: 'REMOVE ATTENDEE',
      payload: { event_id, user_id },
    };
  },
};
