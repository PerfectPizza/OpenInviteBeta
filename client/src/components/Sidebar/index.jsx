import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import loadGoogleMapsAPI from 'load-google-maps-api';
import { storeUser } from '../actions/user';
import { storeLocation } from '../actions/location';
import { storeMap } from '../actions/map';

require('./styles.css');

class Sidebar extends Component {

  componentDidMount() {
    let showing = false;
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementsByClassName('toggle')[0];
    function show() {
      if (!showing) {
        sidebar.classList.add('active');
        toggle.classList.remove('active');
        showing = true;
      } else {
        sidebar.classList.remove('active');
        toggle.classList.add('active');
        showing = false;
      }
    }
    toggle.addEventListener('click', show);
    sidebar.addEventListener('click', show);

    axios.get('/me')
      .then(({ data: user }) => {
        this.props.storeUser(user);
      })
      .then(() => {
        navigator.geolocation.getCurrentPosition((locationData) => {
          const { latitude, longitude } = locationData.coords;
          this.props.storeLocation({ lat: latitude, lng: longitude });
        },
        null,
        { time: 2000 });
      })
      .then(() => loadGoogleMapsAPI({ libraries: ['places'], key: 'AIzaSyA2RynigysTx4S1q-F33uTwoble1SG6LrU' }))
      .then((googleMapsClient) => {
        this.props.storeMap(googleMapsClient);
      })
      .catch((err) => {
        // gracefully check errors to determine source and give appropriate user feedback
        console.error(err);
      });
  }

  render() {
    return (
      <div className="sidebar">
        <a className="button-collapse toggle active">
          <i className="material-icons" id="menu">menu</i>
        </a>
        <ul className="align-left slide-in" id="sidebar">
          <li><div className="userView">
            <Link to="/list">
              {this.props.user &&
                <img alt="user" className="circle" src={this.props.user.picture} />}
            </Link>
          </div></li>
          <hr />
          <li><Link to="/list"><i className="material-icons large">view_list</i></Link></li>
          <hr />
          <li><Link to="/map"><i className="material-icons large">place</i></Link></li>
          <hr />
          <li><Link to="/edit"><i className="material-icons large">add</i></Link></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  storeUser: (user) => {
    dispatch(storeUser(user));
  },
  storeLocation: (location) => {
    dispatch(storeLocation(location));
  },
  storeMap: (googleMapsClient) => {
    dispatch(storeMap(googleMapsClient));
  },
});

Sidebar.PropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    friends: PropTypes.array.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  storeUser: PropTypes.func.isRequired,
  storeLocation: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
