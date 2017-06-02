const { Event } = require('../models');

module.exports = {
  validateUpdate(req, res, next) {
    Event.findById(req.params.event_id)
      .then((event) => {
        if (!req.user || event.creator !== req.user._id) {
          res.status(401).send('you may only update your own events');
        } else {
          next();
        }
      })
      .catch((err) => {
        console.error('error updating an event', err);
      });
  },
};
