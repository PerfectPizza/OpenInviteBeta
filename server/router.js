const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/user', controllers.getAllUsers);
router.get('/user/:FBID', controllers.getUser);
router.get('/user/:FBID/event', controllers.getEventsByUserId);
router.get('/event/:event_id', controllers.getEvent);
router.get('/event/:event_id/attendee', controllers.getAttendeesByEventId);

router.post('/user', controllers.createUser);
router.post('/user/:FBID/event', controllers.createEvent);
router.post('/event/:event_id/attendee', controllers.addAttendeeByEventId);

router.put('/event/:event_id', controllers.updateEvent);

router.delete('/event/:event_id', controllers.deleteEvent);
router.delete('/event/:event_id/attendee/:FBID', controllers.removeAttendee);

module.exports = router;
