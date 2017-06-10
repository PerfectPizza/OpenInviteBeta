module.exports = {
  deleteEvent(id) {
    return {
      type: 'DELETE EVENT',
      payload: id,
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
  addAttendee(eventId, userId, userName, userPicture) {
    return {
      type: 'ADD ATTENDEE',
      payload: { eventId, userId, userName, userPicture },
    };
  },
  removeAttendee(eventId, userId) {
    return {
      type: 'REMOVE ATTENDEE',
      payload: { eventId, userId },
    };
  },
};
