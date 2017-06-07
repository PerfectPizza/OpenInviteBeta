import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAttendee, removeAttendee } from '../actions/events';

const RSVP = ({ event, events, user, addAttendee, removeAttendee }) => {
  function handleJoin() {
    axios.post(`/api/event/${event._id}/attendee`, {
      _id: user._id,
    })
      .then(() => {
        addAttendee(event._id, user._id, user.name);
      })
      .catch((err) => {
        console.error('error joining event', err);
      });
  }

  function handleLeave() {
    axios.delete(`/api/event/${event._id}/attendee/`, {
      _id: user._id,
    })
      .then(() => {
        removeAttendee(event._id, user._id);
      })
      .catch((err) => {
        console.error('error leaving event', err);
      });
  }
  return (
    !event.attendees.find(attendee => attendee._id === user._id)
      ? (<a className="right" onClick={() => { handleJoin(); }}>JOIN</a>)
      : (<a className="right" onClick={() => { handleLeave(); }}>LEAVE</a>)
  );
};

const mapStateToProps = ({ user, events }) => ({ user, events });

const mapDispatchToProps = dispatch => ({
  addAttendee: (eventId, userId, userName) => {
    dispatch(addAttendee(eventId, userId, userName));
  },
  removeAttendee: (eventId, userId) => {
    dispatch(removeAttendee(eventId, userId));
  },
});

RSVP.PropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    friends: PropTypes.array.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  events: PropTypes.array.isRequired,
  addEvents: PropTypes.func.isRequired,
  addMarkers: PropTypes.func.isRequired,
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  map: PropTypes.object.isRequired,
  event: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RSVP));
