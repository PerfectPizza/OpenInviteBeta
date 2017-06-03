import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { addAttendee, removeAttendee } from '../actions/events';
import RSVP from '../RSVP';

const Event = ({ event, user, events }) => {
  const { title, start_time: startTime, end_time: endTime, attendees } = event;
  return (
    <div>
      <div className="row">
        <div className="col s8">
          <div className="card">
            <div className="card-content">
              {user._id === event.creator &&
              <Link to={`/edit/${event._id}`}>
                <span className="btn-floating btn-large waves-effect waves-light right">
                  <i className="right material-icons small blue">
                    mode_edit
                  </i>
                </span>
              </Link>}
              <h3 className="center">{title}</h3>
              <div>MAP</div>
            </div>
          </div>
        </div>
        <div className="col s3">
          <div className="card">
            <span className="card-title">Attendees</span>
            <div className="card-action">
              {event.attendees.length ?
                event.attendees.map(attendee =>
                  <span key={attendee._id}>
                    {attendee.name}
                  </span>
                ) : 
                  <span key="0">
                    Be the first to RSVP
                  </span>
              }
              <div className="card-action">
                <RSVP event={event}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    attendees: PropTypes.array.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ events, user }, { match }) => ({
  event: events.find(event => event._id === match.params.event_id),
  user,
  events
});

const mapDispatchToProps = dispatch => ({
  addAttendee: (event_id, user_id, userName) => {
    dispatch(addAttendee(event_id, user_id, userName));
  },
  removeAttendee: (event_id, user_id) => {
    dispatch(removeAttendee(event_id, user_id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
