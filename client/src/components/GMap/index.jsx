import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEvents } from '../actions/events';

require('./styles.css');

class GMap extends Component {
  constructor({ user }) {
    super();
    this.state = {
      events: [],
    };
    this.user_id = user ? user._id : '987';
  }

  componentDidMount() {
    axios.get('/api/event')
      .then(({ data: events }) => {
        this.props.addEvents(events);
        this.setState({ events });
      });
  }

  render() {
    return (
      <div className="main">
        <ul className="collection">
          {this.state.events && this.state.events.map(
            event => <li className="collection-item">{event.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  addEvents: (events) => {
    dispatch(addEvents(events));
  },
});

GMap.PropTypes = {
  addEdit: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap));
