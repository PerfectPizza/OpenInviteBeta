const router = require('express').Router();
const { user, event } = require('./controllers');

router.get('/user', user.getAllUsers);
router.get('/user/:FBID', user.getUser);
router.get('/user/:FBID/event', event.getEventsByUserId);
router.get('/event/:event_id', event.getEvent);
router.get('/event/:event_id/attendee', event.getAttendeesByEventId);

router.post('/user', user.createUser);
router.post('/user/:FBID/event', event.createEvent);
router.post('/event/:event_id/attendee', event.addAttendeeByEventId);

router.put('/event/:event_id', event.updateEvent);

router.delete('/event/:event_id', event.deleteEvent);
router.delete('/event/:event_id/attendee/:FBID', event.removeAttendee);

module.exports = router;
