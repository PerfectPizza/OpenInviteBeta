import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteEvent, addAttendee, removeAttendee } from '../actions/events';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ListItem = ({ event, attending, user, deleteEvent, addAttendee, removeAttendee }) => {
  function handleDelete() {
    axios.delete(`/api/event/${event._id}`)
      .then(() => {
        deleteEvent(event._id);
      })
      .catch((err) => {
        console.error('error deleting event', err);
      });
  }

  function handleJoin() {
    axios.post(`/api/event/${event._id}/attendee`, {
      _id: user._id,
    })
      .then(() => {
        addAttendee(event._id, user._id);
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
    <li key={event._id} className="collection-item">
      <span>
        <Link to={`/event/${event._id}`}>{event.title}</Link>
        { event.attendees.find(attendee => attendee._id === user._id)
          ? <i className="material-icons small right" onClick={() => { handleLeave(); }}>report_problem</i>
          : <i className="material-icons small right" onClick={() => { handleJoin(); }}>add</i>
        }
        { event.creator === user._id &&
          <span>
            <i className="material-icons small right">
              <Link to={`/edit/${event._id}`}>mode_edit</Link>
            </i>
            <i className="material-icons small right" onClick={() => { handleDelete(event._id); }}>
              delete
            </i>
          </span>
        }
        </span>
    </li>
  );
};

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  attending: PropTypes.bool.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  addAttendee: PropTypes.func.isRequired,
  removeAttendee: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  deleteEvent: (_id) => {
    dispatch(deleteEvent(_id));
  },
  addAttendee: (event_id, user_id) => {
    dispatch(addAttendee(event_id, user_id));
  },
  removeAttendee: (event_id, user_id) => {
    dispatch(removeAttendee(event_id, user_id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListItem));
