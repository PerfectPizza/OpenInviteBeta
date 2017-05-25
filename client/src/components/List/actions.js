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
};
