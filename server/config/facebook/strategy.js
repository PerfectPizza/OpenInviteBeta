const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const User = require('../../models/User');
const { getFriends } = require('./services');

module.exports = () => {
  passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
  },
  (accessToken, refreshToken, { id: _id, displayName: name }, cb) => {
    getFriends(accessToken)
      .then((friends) => {
        User.findOneAndUpdate({ _id }, { name, accessToken, friends }, { new: true, upsert: true })
          .populate({
            path: 'events',
            populate: { path: 'attendees' },
          })
          .populate({
            path: 'friends',
            populate: { path: 'events' },
          })
          .exec()
          .then((user) => {
            cb(null, user);
          })
          .catch((error) => {
            console.error('error updating or saving new user', error);
          });
      })
      .catch((err) => {
        console.error('error getting friends', err);
      });
  }));
};
