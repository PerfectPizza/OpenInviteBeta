const { User } = require('../models');
const { parseErr } = require('./util');

module.exports = {
  getAllUsers(req, res) {
    User.find({})
      .populate('events')
      .exec((err, users) => {
        if (err) {
          console.error('error in getAllUsers', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(users);
        }
      });
  },
  getUser(req, res) {
    User.findById(req.params._id)
      .populate('events')
      .exec((err, user) => {
        if (err) {
          console.error('error in getUser', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          res.send(user);
        }
      });
  },
  createUser(req, res) {
    User.update({ _id: req.body._id },
      { $set: { name: req.body.name, _id: req.body._id } },
      { new: true, upsert: true })
      .then(() => {
        res.send('successfully inserted or updated user');
      })
      .catch((err) => {
        console.error('error creating user', parseErr(err));
        res.status(500).send(parseErr(err));
      });
  },
};
