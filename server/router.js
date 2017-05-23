const router = require('express').Router()
const controllers = require('./controllers.js');

router.get('/user', controllers.getAllUsers);
router.get('/user/:user_id', controllers.getUser);
router.get('/user/:user_id/event', controllers.getEventsByUserId)
router.get('/event/:event_id', controllers.getEvent);
router.get('/event/:event_id/attendee', controllers.getAttendeesByEventId)

router.post('/user', controllers.createUser);
router.post('/user/:user_id/event', controllers.createEvent);
router.post('/event/:event_id/attendee', controllers.addAttendeeByEventId)

router.put('/user/:user_id', controllers.updateUser);
router.put('/event/:event_id', controllers.updateEvent);

router.delete('/user/:user_id', controllers.deleteUser);
router.delete('/event/:event_id', controllers.deleteEvent);

module.exports = router;
