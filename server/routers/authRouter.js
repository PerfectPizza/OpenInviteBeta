const router = require('express').Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
