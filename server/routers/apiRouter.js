const router = require('express').Router();
const { user, event } = require('../controllers');
const { validateUpdate } = require('./util');
// START ROUTES TO TAKE OUT IN PRODUCTION
router.get('/user', user.getAllUsers);
router.get('/user/:_id', user.getUser);
router.post('/user', user.createUser);
router.get('/event/:event_id', event.getEvent);
// END ROUTES TO TAKE OUT IN PRODUCTION

router.get('/user/created', event.getCreatedEventsByUserId);
router.get('/event/', user.getEventsByUserId);
router.get('/event/:event_id/attendee', event.getAttendeesByEventId);

router.post('/event', event.createEvent);
router.post('/event/:event_id/attendee', event.addAttendeeByEventId);

router.put('/event/:event_id', validateUpdate, event.updateEvent);

router.delete('/event/:event_id', event.deleteEvent);
router.delete('/event/:event_id/attendee/:_id', event.removeAttendeeByEventId);

module.exports = router;
