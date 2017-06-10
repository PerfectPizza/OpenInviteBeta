import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import proptypes from '../proptypes';
import { localToUTC, UTCToLocal, todayOrTomorrow } from '../util';
import { deleteEvent } from '../actions/events';
import TimePicker from 'material-ui/TimePicker';

require('./styles.css');

class AddEdit extends Component {

  constructor({ event, userLocation }) {
    super();
    this.state = {
      title: event.title,
      description: event.description,
      start_time: UTCToLocal(event.start_time),
      end_time: UTCToLocal(event.end_time),
      location: event.location || userLocation,
    };
  }

  componentDidMount() {
    const googleMapsClient = this.props.map;
    const map = new googleMapsClient.Map(document.getElementById('AddEditMap'), {
      center: this.state.location,
      zoom: 18,
    });
    new googleMapsClient.Marker({
      position: this.state.location,
      map,
    });
    const input = document.getElementById('pac-input');
    const searchBox = new googleMapsClient.places.SearchBox(input);
    map.controls[googleMapsClient.ControlPosition.TOP_LEFT].push(input);
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });
    const markers = [];
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places.length) return;

      markers.forEach((marker) => {
        marker.setMap(null);
      });

      const bounds = new googleMapsClient.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          return;
        }
        const icon = {
          url: place.icon,
          size: new googleMapsClient.Size(71, 71),
          origin: new googleMapsClient.Point(0, 0),
          anchor: new googleMapsClient.Point(17, 34),
          scaledSize: new googleMapsClient.Size(25, 25),
        };
        markers.push(new googleMapsClient.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }));
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        this.setState({ location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        } });
      });
      map.fitBounds(bounds);
    });
  }

  addOrEdit() {
    const body = {
      ...this.state,
      start_time: localToUTC(this.state.start_time),
      end_time: localToUTC(this.state.end_time),
    };
    const query = this.props.event._id
    ? axios.put(`/api/event/${this.props.event._id}`, body)
    : axios.post('/api/event', body);
    query
      .then(() => {
        this.props.deleteEvent(this.props.event._id);
        this.props.history.push('/list');
      })
      .catch(() => {
        alert('There was an unfamiliar error saving the event. Please try again later');
      });
  }

  validateForm(e) {
    e.preventDefault();
    let err = '';
    const title = this.state.title;
    const startTime = moment.utc(this.state.start_time);
    const endTime = moment.utc(this.state.end_time);
    const oneDayLater = moment.utc().add(24, 'hours');
    const now = moment.utc();
    if (title.length === 0) {
      err += 'A title is required for every event.\n';
    }
    if (endTime.isBefore(startTime)) {
      err += 'The start time must be before the end time.\n';
    }
    if (endTime.isBefore(now) || startTime.isBefore(now)) {
      err += 'The start time and end times cannot be in the past.\n';
    }
    if (moment(endTime).isAfter(oneDayLater) || moment(startTime).isAfter(oneDayLater)) {
      err += 'The event must start and end within 24 hours of its creation\n';
    }
    if (err.length) {
      alert(err);
      return;
    }
    this.addOrEdit();
  }

  render() {
    return (
      <div className="main">
        <div className="row">
          <h3 className="center">{this.state.title ? `Edit ${this.state.title}` : 'Create an Event'}</h3>
          <hr />
          <form onSubmit={this.validateForm.bind(this)}>
            <div className="row">
              <div className="col s5 input-field">
                <input
                  className="input-list"
                  id="title-AddEdit"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <label className="active label-list" htmlFor="title-AddEdit">Title:</label>
              </div>
              <div className="col s5 input-field">
                <textarea
                  className="input-list"
                  id="description-AddEdit"
                  onChange={e => this.setState({ description: e.target.value })}
                  value={this.state.description}
                />
                <label
                  className="label-list active"
                  htmlFor="description-AddEdit"
                >Description</label>
              </div>
              <button className="btn waves-effect waves-light right" type="submit">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
            <div className="row">
              <div className="col s5 input-field">
                <TimePicker
                  format="24hr"
                  hintText="24hr Format"
                  value={new Date(this.state.start_time)}
                  onChange={(event, time) => this.setState({ start_time: todayOrTomorrow(time) })}
                />
                 <label
                  className="label-list active"
                >start time</label>
              </div>
              <div className="col s5 input-field">
                <TimePicker
                  format="24hr"
                  hintText="24hr Format"
                  value={new Date(this.state.end_time)}
                  onChange={(event, time) => this.setState({ end_time: todayOrTomorrow(time) })}
                />
                 <label
                  className="label-list active"
                >end time</label>
              </div>
            </div>
          </form>
          <div className="row">
            <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
            <div id="AddEditMap" />
          </div>
        </div>
      </div>
    );
  }
}

AddEdit.propTypes = {
  event: proptypes.event,
  map: proptypes.map.isRequired,
  userLocation: proptypes.userLocation.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

AddEdit.defaultProps = {
  event: {
    title: '',
    description: '',
    start_time: new Date(),
    end_time: new Date(),
  },
};

const mapStateToProps = ({ events, map, userLocation }, { match }) => ({
  event: events.find(event => event._id === match.params.eventId),
  map,
  userLocation,
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: (id) => {
    dispatch(deleteEvent(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEdit));
