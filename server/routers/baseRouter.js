const router = require('express').Router();
const path = require('path');

function authCheck(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect('/auth');  // not authenticated
}
// root of app
router.get('/', authCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});
// login page
router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/auth.html'));
});

module.exports = router;
