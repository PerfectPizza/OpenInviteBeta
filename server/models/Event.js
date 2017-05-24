const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  createdAt: { type: Date, expires: 60 * 60 * 24 * 2, default: new Date() },
  attendees: [{ type: String, ref: 'User' }],
});

module.exports = mongoose.model('Event', EventSchema);
