const { User } = require('../models');
const { parseErr } = require('./util');

module.exports = {
  getEventsByUserId(req, res) {
    User.findById(req.user._id)
      .populate({
        path: 'events',
        populate: { path: 'attendees', select: 'name _id picture' },
      })
      .populate({
        path: 'events',
        populate: { path: 'creator', select: 'name _id picture' },
      })
      .populate({
        path: 'friends',
        populate: { path: 'events',
          populate: {
            path: 'attendees',
            select: 'name _id picture',
          },
        },
      })
      .populate({
        path: 'friends',
        populate: { path: 'events',
          populate: {
            path: 'creator',
            select: 'name _id picture',
          },
        },
      })
      .exec((err, user) => {
        if (err) {
          console.error('error in getUser', parseErr(err));
          res.status(500).send(parseErr(err));
        } else {
          const userEvents = user.events;
          const friendEvents = [];
          user.friends.forEach((friend) => {
            friendEvents.push(...friend.events);
          });
          res.send([...userEvents, ...friendEvents]);
        }
      });
  },
  // START CONTROLLERS TO TAKE OUT IN PRODUCTION
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
  // END CONTROLLERS TO TAKE OUT IN PRODUCTION
};
