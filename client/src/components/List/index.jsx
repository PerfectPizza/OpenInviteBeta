import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { addEvents } from '../actions/events';

require('./styles.css');

class List extends Component {

  componentWillMount() {
    axios.get('/api/event')
      .then(({ data: events }) => {
        const oldEvents = this.props.events;
        const newEvents = events.filter(event => !oldEvents
          .filter(oldEvent => event._id !== oldEvent._id)
          .length);
        this.props.addEvents(newEvents);
      });
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.events &&
            this.props.events.map(event =>
              <ListItem
                key={event._id}
                event={event}
              />,
            )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user, events }) => ({ user, events });

const mapDispatchToProps = dispatch => ({
  addEvents: (events) => {
    dispatch(addEvents(events));
  },
});

List.PropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    friends: PropTypes.array.isRequired,
  }).isRequired,
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  addEvents: PropTypes.func.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
