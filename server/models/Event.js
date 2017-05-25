/* eslint-disable no-extend-native */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

const User = require('./User');

const EventSchema = new Schema({
  creator: {
    type: String,
    ref: 'User',
    required: [true, "Creator is a required field. It should be the creator's facebook ID"],
  },
  description: { type: String },
  title: {
    type: String,
    required: [true, 'A title is required for each event'],
  },
  start_time: {
    type: Date,
    required: [true, 'A valid start time is required for each event'],
  },
  end_time: {
    type: Date,
    required: [true, 'A valid end time is required for each event'],
  },
  createdAt: { type: Date, expires: 60 * 60 * 24 * 2, default: Date.now },
  attendees: [{ type: String, ref: 'User' }],
  location: {
    lat: {
      type: String,
      required: [true, 'A valid location is required for each event'],
    },
    lng: {
      type: String,
      required: [true, 'A valid location is required for each event'],
    },
  },
});

EventSchema.pre('validate', function (next) {
  let error = '';
  if (this.start_time > this.end_time) {
    error += 'ERR: End time must come after start time.\n';
  }
  if (this.start_time < this.createdAt) {
    error += 'ERR: Start time cannot be in the past.\n';
  }
  if (this.start_time > this.createdAt.addHours(48)
    || this.end_time > this.createdAt.addHours(48)) {
    error += 'ERR: Start and end time must be within 48 hours after the time of creation.\n';
  }
  if (error.length) {
    next(Error(error));
  } else {
    next();
  }
});

EventSchema.post('save', (event, next) => {
  User.findByIdAndUpdate(event.creator,
    { $push: { events: event._id } })
    .then(next)
    .catch((err) => {
      next(Error(err));
    });
});

module.exports = mongoose.model('Event', EventSchema);
