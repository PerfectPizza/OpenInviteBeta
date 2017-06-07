import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import { updateEvent } from '../actions/events';
import RSVP from '../RSVP';

require('./styles.css');

class Event extends Component {
  componentDidMount() {
    const googleMapsClient = this.props.map;
    const eventLocation = this.props.event.location;
    document.getElementById('EventMap').innerHTML = '';
    const map = new googleMapsClient.Map(document.getElementById('EventMap'), { zoom: 20, eventLocation });
    new googleMapsClient.Marker({
      position: eventLocation,
      map,
    });
    axios.get(`/api/event/${this.props.event._id}`)
      .then(({ data }) => {
        this.props.updateEvent(data);
      });
  }
  render() {
    const { event, user } = this.props;
    const { title,
      start_time: startTime,
      end_time: endTime,
      attendees,
      creator,
      description,
    } = event;
    return (
      <div>
        <div className="row">
          <div className="col s8">
            <div className="card">
              <div className="card-content">
                {this.props.user._id === creator._id &&
                <Link to={`/edit/${event._id}`}>
                  <span className="btn-floating btn-large waves-effect waves-light right">
                    <i className="right material-icons small blue">
                      mode_edit
                    </i>
                  </span>
                </Link>}
                <h3 className="center">{title}</h3>
                <h5 className="center">posted by {creator.name}</h5>
                <h5 className="center">{moment(startTime).format('HH:MM')}-{moment(endTime).format('HH:MM')}</h5>
                <h6 className="center">{description}</h6>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card">
              <span className="card-title">Attendees</span>
              <div className="card-action">
                {attendees.length ?
                  attendees.map(attendee =>
                    <span key={attendee._id}>
                      {attendee.name}
                      <img className="circle" alt={attendee.name} src={attendee.picture} />
                    </span>
                  ) :
                    creator._id !== user._id &&
                    <span key="0">
                      Be the first to RSVP
                    </span>
                }
                {creator._id !== user._id &&
                <div className="card-action">
                  <RSVP event={event} />
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div id="EventMap" />
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
    _id: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    attendees: PropTypes.array.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  map: PropTypes.object,
  updateEvent: PropTypes.func.isRequired,
};

const mapStateToProps = ({ events, user, map, userLocation }, { match }) => ({
  event: events.find(event => event._id === match.params.eventId),
  user,
  events,
  map,
  userLocation,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: (event) => {
    dispatch(updateEvent(event));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
