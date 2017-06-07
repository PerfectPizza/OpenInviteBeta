import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import proptypes from '../proptypes';
import { deleteEvent } from '../actions/events';
import RSVP from '../RSVP';

const ListItem = ({ event, user, deleteEvent }) => {
  function handleDelete() {
    axios.delete(`/api/event/${event._id}`)
      .then(() => {
        deleteEvent(event._id);
      })
      .catch((err) => {
        console.error('error deleting event', err);
      });
  }

  return (
    <li key={event._id} className="collection-item">
      <span>
        <Link to={`/event/${event._id}`}>{event.title}</Link>
        {event.creator._id !== user._id && <RSVP event={event} /> }
        { event.creator._id === user._id &&
          <span>
            <i className="material-icons small right">
              <Link to={`/edit/${event._id}`}>mode_edit</Link>
            </i>
            <a onClick={() => { handleDelete(event._id); }}>
              <i className="material-icons small right">delete</i>
            </a>
          </span>
        }
      </span>
    </li>
  );
};

// this component expects an event prop from its parent
ListItem.propTypes = {
  user: proptypes.user.isRequired,
  event: proptypes.event.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, events }) => ({ user, events });

const mapDispatchToProps = dispatch => ({
  deleteEvent: (_id) => {
    dispatch(deleteEvent(_id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListItem));
