import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import proptypes from '../proptypes';
import { addAttendee, removeAttendee } from '../actions/events';

const RSVP = ({ event, events, user, addAttendee, removeAttendee }) => {
  function handleJoin() {
    axios.post(`/api/event/${event._id}/attendee`, {
      _id: user._id,
    })
      .then(() => {
        addAttendee(event._id, user._id, user.name, user.picture);
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
  addAttendee: (eventId, userId, userName, userPicture) => {
    dispatch(addAttendee(eventId, userId, userName, userPicture));
  },
  removeAttendee: (eventId, userId) => {
    dispatch(removeAttendee(eventId, userId));
  },
});

// This component expects an event prop from its parent
RSVP.PropTypes = {
  user: proptypes.user.isRequired,
  events: PropTypes.arrayOf(proptypes.event).isRequired,
  userLocation: proptypes.userLocation.isRequired,
  addAttendee: PropTypes.func.isRequired,
  event: proptypes.event.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RSVP));
