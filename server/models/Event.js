/* eslint-disable no-extend-native */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

const EventSchema = new Schema({
  creator: {
    type: String,
    ref: 'User',
    required: [true, 'Creator is a required field. It should be their FBID'],
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
    error += 'End time must come after start time. ';
  }
  if (this.start_time > this.createdAt.addHours(48)
    || this.end_time > this.createdAt.addHours(48)) {
    error += 'Start and end time must be within 48 hours after the time of creation. ';
  }
  if (error.length) {
    next(Error(error));
  } else {
    next();
  }
});

module.exports = mongoose.model('Event', EventSchema);