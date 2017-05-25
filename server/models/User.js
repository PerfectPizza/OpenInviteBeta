const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: [true, 'an _id is a required parameter for a user. It should be their FBID'],
    unique: true,
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
  }],
  name: { type: String, required: [true, 'a name is a required parameter for a user'] },
});

module.exports = mongoose.model('User', UserSchema);
