const { Event } = require('../models');

function parseErr(err) {
  if (!err.errors) return err;
  const errorKeys = Object.keys(err.errors);
  const messages = [];
  for (let i = 0; i < errorKeys.length; i += 1) {
    messages.push(`${errorKeys[i]} error: ${err.errors[errorKeys[i]]}`);
  }
  return messages;
}

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    event.save()
      .then((savedEvent) => {
        res.send(savedEvent);
      })
      .catch((err) => {
        console.error('error creating event', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  getEvent(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        res.send(event);
      })
      .catch((err) => {
        console.error('error in getEvent', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  updateEvent(req, res) {
    Event.findByIdAndUpdate(req.params.event_id, req.body, { new: true })
      .then((event) => {
        res.send(event);
      })
      .catch((err) => {
        console.error('error in updateEvent', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  deleteEvent(req, res) {
    Event.findByIdAndRemove(req.params.event_id)
      .then((event) => {
        res.send(event);
      })
      .catch((err) => {
        console.error('error in updateEvent', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  getEventsByUserId(req, res) {
    Event.find({ creator: req.params.FBID })
      .then((events) => {
        res.send(events);
      })
      .catch((err) => {
        console.error('error in getEventsByUserId', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  getAttendeesByEventId(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        res.send(event.attendees);
      })
      .catch((err) => {
        console.error('error in getAttendeesByEventId', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  addAttendeeByEventId(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        event.attendees.push(req.body.FBID);
        event.save()
          .then(res.send(event.attendees))
          .catch((err) => {
            console.error('error saving attendees in addAttendeeByEventId', parseErr(err));
            res.status(500).send(parseErr(err));
          });
      })
      .catch((err) => {
        console.error('error finding an event in addAttendeeByEventId', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  removeAttendee(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        event.attendees.pull(req.params.FBID);
        event.save()
          .then((updatedEvent) => {
            res.send(updatedEvent.attendees);
          })
          .catch((err) => {
            console.error('error saving event after removing an attendee', parseErr(err));
          });
      })
      .catch((err) => {
        console.error('error finding an event in removeAttendee', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
};
