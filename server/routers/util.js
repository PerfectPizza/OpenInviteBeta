const { Event } = require('../models');

module.exports = {
  validateIsCreator(req, res, next) {
    Event.findById(req.params.event_id)
      .then((event) => {
        if (!req.user || event.creator !== req.user._id) {
          const verb = req.method === 'PUT' ? 'update' : 'delete';
          res.status(401).send(`you may only ${verb} your own events`);
        } else {
          next();
        }
      })
      .catch((err) => {
        console.error('error updating an event', err);
      });
  },
};
