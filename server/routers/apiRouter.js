const router = require('express').Router();
const { user, event } = require('../controllers');
const { validateIsCreator } = require('./util');
// START ROUTES TO TAKE OUT IN PRODUCTION
router.get('/user', user.getAllUsers);
router.get('/user/:_id', user.getUser);
router.post('/user', user.createUser);
router.get('/event/:event_id', event.getEvent);
router.get('/event/:event_id/attendee', event.getAttendeesByEventId);
// END ROUTES TO TAKE OUT IN PRODUCTION

router.get('/created', event.getCreatedEventsByUserId);
router.get('/event', user.getEventsByUserId);

router.post('/event', event.createEvent);
router.post('/event/:event_id/attendee', event.addAttendeeByEventId);

router.put('/event/:event_id', validateIsCreator, event.updateEvent);

router.delete('/event/:event_id', validateIsCreator, event.deleteEvent);
router.delete('/event/:event_id/attendee', event.removeAttendeeByEventId);

module.exports = router;
