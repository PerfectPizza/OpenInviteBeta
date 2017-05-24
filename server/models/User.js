const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
  }],
  FBID: { type: String, required: [true, 'a FBID is a required parameter for a user'], unique: true },
  name: { type: String, required: [true, 'a name is a required parameter for a user'] },
});

module.exports = mongoose.model('User', UserSchema);
