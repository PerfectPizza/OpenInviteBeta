const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const User = require('../../models/User');
const { getFriends } = require('./services');
// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
module.exports = () => {
  passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
  },
  async (accessToken, refreshToken, { id: _id, displayName: name }, cb) => {
    const friends = await getFriends(accessToken, _id);
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
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
  }));
};