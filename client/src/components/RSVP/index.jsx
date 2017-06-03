import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addAttendee, removeAttendee } from '../actions/events';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
  addAttendee: (event_id, user_id, userName) => {
    dispatch(addAttendee(event_id, user_id, userName));
  },
  removeAttendee: (event_id, user_id) => {
    dispatch(removeAttendee(event_id, user_id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RSVP));
