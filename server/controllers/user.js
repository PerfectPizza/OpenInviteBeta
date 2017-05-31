const { User } = require('../models');
const { parseErr } = require('./util');

module.exports = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'events',
        populate: { path: 'attendees' },
      })
      .populate({
        path: 'friends',
        populate: { path: 'events' },
      })
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
    User.findById(req.user._id)
      .populate({
        path: 'events',
        populate: { path: 'attendees' },
      })
      .populate({
        path: 'friends',
        populate: { path: 'events' },
      })
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
      { $set: { name: req.body.name, _id: req.body._id, friends: req.body.friends } },
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
