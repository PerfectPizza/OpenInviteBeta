const { Event } = require('../models');
const { parseErr } = require('./util');

module.exports = {
  createEvent(req, res) {
    const event = new Event({ ...req.body, creator: req.user._id });
    event.save()
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.error('error creating event', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  updateEvent(req, res) {
    Event.findByIdAndUpdate(req.params.event_id,
      {
        title: req.body.title,
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: req.body.location,
      })
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.error('error in getEventsByUserId', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  deleteEvent(req, res) {
    Event.findByIdAndRemove(req.params.event_id)
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.error('error in updateEvent', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  addAttendeeByEventId(req, res) {
    Event.findByIdAndUpdate(req.params.event_id, { $push: { attendees: req.user._id } })
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.error('error in getEventsByUserId', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
  removeAttendeeByEventId(req, res) {
    Event.findByIdAndUpdate(req.params.event_id, { $pull: { attendees: req.user._id } })
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.error('error in getEventsByUserId', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
};
