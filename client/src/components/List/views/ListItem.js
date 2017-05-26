import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const ListItem = ({ event, deleteEvent }) => (
  <li key={event._id} className="collection-item">
    <span className="collection-item article-list">
      <Link to={`/event/${event._id}`}>{event.title}</Link>
      <i className="right material-icons small">
        <Link to={`/addEdit/${event._id}`}>mode_edit</Link>
      </i>
      <i className="right material-icons small" onClick={() => { deleteEvent(event._id); }}>
        delete
      </i>
    </span>
  </li>
);

ListItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    attendees: PropTypes.array.isRequired,
  }).isRequired,
  deleteEvent: PropTypes.func,
};

export default ListItem;
