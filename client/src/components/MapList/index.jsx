import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvents } from '../actions/events';
import { addMarkers } from '../actions/markers';

require('./styles.css');

class GMap extends Component {

  componentDidMount() {
    axios.get('/api/event')
    .then(({ data: events }) => {
      const oldEvents = JSON.stringify(this.props.events);
      const newEvents = events.filter(event => !oldEvents.includes(JSON.stringify(event)));
      this.props.addEvents(newEvents);
    })
    .then(() => {
      const googleMapsClient = this.props.map;
      const center = {
        lat: this.props.userLocation.lat || 30.255077800000002,
        lng: this.props.userLocation.lng || -97.7560985,
      };
      document.getElementById('map').innerHTML = '';
      const map = new googleMapsClient.Map(document.getElementById('map'), { zoom: 12, center });
      new googleMapsClient.Marker({
        position: center,
        map,
        icon: { url: 'home.png', size: new this.props.map.Size(32, 32) },
      });
      this.props.events && this.props.events.forEach(({ location: position }) => {
        new googleMapsClient.Marker({
          position,
          map,
        });
      });
    });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

const mapStateToProps = ({ events, map, userLocation, markers }) => ({ events, map, userLocation, markers });

const mapDispatchToProps = dispatch => ({
  addEvents: (events) => {
    dispatch(addEvents(events));
  },
  addMarkers: (markers) => {
    dispatch(addMarkers(markers));
  },
});

GMap.PropTypes = {
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  addEvents: PropTypes.func.isRequired,
  addMarkers: PropTypes.func.isRequired,
  googleMapsClient: PropTypes.object.isRequired,
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap));
