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
};
