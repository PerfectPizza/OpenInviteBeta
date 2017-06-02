const router = require('express').Router();
const path = require('path');

function authCheck(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect('/auth');
}

router.get('/', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/auth.html'));
});

router.get('/me', ({ user }, res) => {
  const { name, friends, _id, picture } = user;
  res.send({ name, friends, _id, picture });
});

module.exports = router;
