const passport = require('passport');
const addFacebookStrategy = require('./facebook/strategy');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  addFacebookStrategy();
};
