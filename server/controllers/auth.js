const path = require('path');
const passport = require('passport');

module.exports = {
  sendLogin(req, res) {
    res.sendFile(path.join(__dirname, '/../../client/public/auth.html'));
  },
  finishAuth(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/api/login' });
  },
};
