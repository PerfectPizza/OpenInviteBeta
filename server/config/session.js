const session = require('express-session');

module.exports = session({
  secret: 'meowmix',
  resave: true,
  saveUninitialized: true,
});
