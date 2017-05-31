const router = require('express').Router();
const passport = require('passport');
const path = require('path');

module.exports = router;


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/public/auth.html'));
});
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
