import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEvent, addEvents } from '../actions/events';
import ListItem from './views/ListItem';

require('./styles.css');

class List extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios.get('/api/event/')
      .then(({ data: events }) => {
        this.props.addEvents(events);
        this.setState({ events: [...this.state.events, ...events] });
      });
  }

  deleteEvent(_id) {
    axios.delete(`/api/event/${_id}`)
      .then(() => {
        this.props.deleteEvent(_id);
        this.setState({
          events: this.state.events.filter(event => event._id !== _id),
        });
      })
      .catch(() => {
        alert('There was a problem deleting the event');
      });
  }

  render() {
    return (
      <div className="main">
        <ul className="collection">
          {this.state.events &&
            this.state.events.map(event =>
              <ListItem
                key={event._id}
                event={event}
                deleteEvent={(_id) => { this.deleteEvent.call(this, _id); }}
                user_id={this.props.user._id}
              />,
            )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  deleteEvent: (_id) => {
    dispatch(deleteEvent(_id));
  },
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
  deleteEvent: PropTypes.func.isRequired,
  addEvents: PropTypes.func.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
