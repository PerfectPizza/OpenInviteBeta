const { User, Event } = require('./models');

module.exports = {
  getAllUsers(req, res) {
    return User.find({})
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.error('error in getAllUsers', err);
        res.status(500).send(err);
      });
  },
  getUser(req, res) {
    return User.findOne({ FBID: req.params.FBID })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.error('error in getUser', err);
        res.status(500).send(err);
      });
  },
  createUser(req, res) {
    User.findOne({ FBID: req.body.FBID })
      .then((userAlreadyExists) => {
        if (userAlreadyExists) {
          res.send(userAlreadyExists);
        } else {
          const user = new User(req.body);
          user.save()
            .then((savedUser) => {
              res.send(savedUser);
            })
            .catch((err) => {
              console.error('error in createUser', err);
              res.status(500).send(err);
            });
        }
      });
  },
  createEvent(req, res) {
    /* const { start_time, end_time } = req.body;
    const invalidTimesError = invalidateTimes(start_time, end_time);
    if (invalidTimesError) {
      res.status(422).send(invalidTimesError);
    } */
    const event = new Event(req.body);
    event.save()
      .then((savedEvent) => {
        res.send(savedEvent);
      })
      .catch((err) => {
        console.error('error in createEvent', err);
        res.status(500).send(err);
      });
  },
  getEventsByUserId(req, res) {
    Event.find({ creator: req.params.FBID })
      .then((events) => {
        res.send(events);
      })
      .catch((err) => {
        console.error('error in getEventsByUserId', err);
        res.status(500).send(err);
      });
  },
  getEvent(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        res.send(event);
      })
      .catch((err) => {
        console.error('error in getEvent', err);
        res.status(500).send(err);
      });
  },
  getAttendeesByEventId(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        res.send(event.attendees);
      })
      .catch((err) => {
        console.error('error in getAttendeesByEventId', err);
        res.status(500).send(err);
      });
  },
  addAttendeeByEventId(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        event.attendees.push(req.body.FBID);
        event.save()
          .then(res.send(event.attendees))
          .catch((err) => {
            console.error('error saving attendees in addAttendeeByEventId', err);
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        console.error('error finding an event in addAttendeeByEventId', err);
        res.status(500).send(err);
      });
  },
  updateEvent(req, res) {
    Event.findByIdAndUpdate(req.params.event_id, req.body, { new: true })
      .then((event) => {
        res.send(event);
      })
      .catch((err) => {
        console.error('error in updateEvent', err);
        res.status(500).send(err);
      });
  },
  deleteEvent(req, res) {
    Event.findByIdAndRemove(req.params.event_id)
      .then((event) => {
        res.send(event);
      })
      .catch((err) => {
        console.error('error in updateEvent', err);
        res.status(500).send(err);
      });
  },
  removeAttendee(req, res) {
    Event.findById(req.params.event_id)
      .then((event) => {
        event.attendees.pull(req.params.FBID);
        event.save()
          .then((updatedEvent) => {
            res.send(updatedEvent.attendees);
          })
          .catch((err) => {
            console.error('error saving event after removing an attendee', err);
          });
      })
      .catch((err) => {
        console.error('error finding an event in removeAttendee', err);
        res.status(500).send(err);
      });
  },
};
