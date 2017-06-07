import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import proptypes from '../proptypes';
import { addEvents } from '../actions/events';
import { addMarkers } from '../actions/markers';

require('./styles.css');

class MapList extends Component {

  componentDidMount() {
    axios.get('/api/event')
    .then(({ data: events }) => {
      const oldEvents = JSON.stringify(this.props.events);
      const newEvents = events.filter(event => !oldEvents.includes(event._id));
      this.props.addEvents(newEvents);
    })
    .then(() => {
      const googleMapsClient = this.props.map;
      const center = {
        lat: this.props.userLocation.lat,
        lng: this.props.userLocation.lng,
      };
      document.getElementById('ListMap').innerHTML = '';
      const map = new googleMapsClient.Map(document.getElementById('ListMap'), { zoom: 15, center });
      new googleMapsClient.Marker({
        position: center,
        map,
        icon: { url: 'home.png', size: new this.props.map.Size(32, 32) },
      });
      this.props.events && this.props.events.forEach((event) => {
        const infowindow = this.renderInfo(event);
        const marker = new googleMapsClient.Marker({
          position: event.location,
          map,
        });
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    });
  }

  renderInfo(event) {
    // TODO ADD IN LINK TO EVENT ONCE ELEGANTLY HANDLING ROUTING
    const content = `
      <div className="infoContent">
        <h4 className="infoTitle">${event.title}</h4>
        <h5 className="infoCreator">hosted by ${event.creator.name}</h5>
        <p className="infoTime">${moment(event.start_time).format('HH:MM')}-${moment(event.end_time).format('HH:MM')}</p>
        <h6>${event.description}</h6>
      </div>
    `;
    return new this.props.map.InfoWindow({ content });
  }

  render() {
    return (
      <div id="ListMap" />
    );
  }
}

const mapStateToProps = ({ events, map, userLocation, markers }) => ({
  events,
  map,
  userLocation,
  markers,
});

const mapDispatchToProps = dispatch => ({
  addEvents: (events) => {
    dispatch(addEvents(events));
  },
  addMarkers: (markers) => {
    dispatch(addMarkers(markers));
  },
});

MapList.PropTypes = {
  events: proptypes.events.isRequired,
  event: proptypes.event.isRequired,
  addEvents: PropTypes.func.isRequired,
  addMarkers: PropTypes.func.isRequired,
  userLocation: proptypes.userLocation.isRequired,
  map: proptypes.map.isRequired,
};

MapList.defaultProps = {
  userLocation: {
    lat: 30.255077800000002,
    lng: -97.7560985,
  },
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapList));
