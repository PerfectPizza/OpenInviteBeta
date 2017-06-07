const { Event } = require('../models');
const { parseErr } = require('./util');

module.exports = {
  createEvent(req, res) {
    const event = new Event({ ...req.body, creator: req.user._id });
    event.save()
      .then((savedEvent) => {
        Event.findOne(savedEvent)
        .populate('attendees', '_id name picture')
        .populate('creator', '_id name picture')
        .exec((err, populatedEvent) => {
          if (err) {
            console.error('error in createEvent', parseErr(err));
            res.status(500).send(parseErr(err));
          } else {
            res.send(populatedEvent);
          }
        });
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
      },
      { new: true })
      .populate('attendees', '_id name picture')
      .populate('creator', '_id name picture')
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
      .populate('attendees', '_id name picture')
      .populate('creator', '_id name picture')
      .exec((err, events) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(events);
        }
      });
  },
  addAttendeeByEventId(req, res) {
    Event.findByIdAndUpdate(req.params.event_id,
      { $push: { attendees: req.user._id } },
      { new: true })
      .populate('attendees', '_id name picture')
      .populate('creator', '_id name picture')
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
      { $pull: { attendees: req.user._id } },
      { new: true })
      .populate('attendees', '_id name picture')
      .populate('creator', '_id name picture')
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event.attendees);
        }
      });
  },
  // TAKE THESE CONTROLLERS OUT IN PRODUCTION
  getEvent(req, res) {
    Event.findById(req.params.event_id)
      .populate('attendees', '_id name picture')
      .populate('creator', '_id name picture')
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event);
        }
      });
  },
  getAttendeesByEventId(req, res) {
    Event.findById(req.params.event_id)
      .populate('attendees', '_id name picture')
      .populate('creator', '_id name picture')
      .exec((err, event) => {
        if (err) {
          console.error('error in getEventsByUserId', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(event.attendees);
        }
      });
  },
};
