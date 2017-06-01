const { Event } = require('../models');
const { parseErr } = require('./util');

module.exports = {
  createEvent(req, res) {
    const event = new Event({ ...req.body, creator: req.user._id });
    event.save()
      .then((savedEvent) => {
        res.send(savedEvent);
      })
      .catch((err) => {
        console.error('error creating event', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  updateEvent(req, res) {
    Event.findByIdAndUpdate(req.params.event_id, req.body, { new: true })
      .populate('attendees', '_id name')
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event);
        }
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
  getCreatedEventsByUserId(req, res) {
    Event.find({ creator: req.user._id })
      .populate('attendees', '_id name')
      .exec((err, events) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(events);
        }
      });
  },
  getAttendeesByEventId(req, res) {
    Event.findById(req.params.event_id)
      .populate('attendees', '_id name')
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event.attendees);
        }
      });
  },
  addAttendeeByEventId(req, res) {
    Event.findByIdAndUpdate(req.params.event_id,
      { $push: { attendees: req.body._id } })
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event.attendees);
        }
      });
  },
  removeAttendeeByEventId(req, res) {
    Event.findByIdAndUpdate(req.params.event_id,
      { $pull: { attendees: req.params._id } })
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event.attendees);
        }
      });
  },
  // TAKE THIS CONTROLLER OUT IN PRODUCTION
  getEvent(req, res) {
    Event.findById(req.params.event_id)
      .populate('attendees', '_id name')
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event);
        }
      });
  },
};
