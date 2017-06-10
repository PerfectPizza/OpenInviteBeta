const router = require('express').Router();
const { user, event } = require('../controllers');
const { validateIsCreator } = require('./util');

router.get('/event', user.getEventsByUserId);
router.get('/event/:event_id', event.getEventById);

router.post('/event', event.createEvent);
router.post('/event/:event_id/attendee', event.addAttendeeByEventId);

router.put('/event/:event_id', validateIsCreator, event.updateEvent);

router.delete('/event/:event_id', validateIsCreator, event.deleteEvent);
router.delete('/event/:event_id/attendee', event.removeAttendeeByEventId);

module.exports = router;
