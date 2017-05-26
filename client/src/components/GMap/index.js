import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
    axios.get(`/api/user/${this.user_id}/event`)
      .then(({ data: events }) => {
        this.props.addEvents(events);
        this.setState({ events });
      });
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.state.events && this.state.events.map(event => <li>{event.title}</li>)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GMap));
