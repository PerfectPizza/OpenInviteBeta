const passport = require('passport');
const facebookConfig = require('./facebook');
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
module.exports = (app) => {
  // passport.initialize is invoked on every request & ensures the session contains a user object
  app.use(passport.initialize());
  // passport.session will load the user object onto req.user if a serialized user is found;
  // it also calls passport.deserializeUser, which enables us to load more info onto the user object
  app.use(passport.session());
  // serializing determines what user data will be stored in the session
  // passport.serializeUser is called by the passport.authenticate middleware
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    console.log(cb)
    cb(null, obj);
  });

  facebookConfig();
};
