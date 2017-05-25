import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteEvent, addEvents } from './actions';
import ListItem from './views/ListItem';

require('./styles.css');

class List extends Component {
  constructor({ user }) {
    console.log('hello world!');
    super();
    this.state = {
      events: [],
    };
    this.user_id = '987';
  }

  componentDidMount() {
    axios.get(`/api/user/${this.user_id}/event`)
      .then(({ data: events }) => {
        this.props.addEvents(events);
        this.setState({ events: events });
      });
  }

  deleteEvent(_id) {
    axios.delete(`/api/event/${_id}`)
      .then(() => {
        this.props.deleteEvent(_id);
      })
      .catch(() => {
        alert('There was a problem deleting the event');
      });
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.state.events &&
            this.state.events.map(event =>
              <ListItem
                event={event}
                deleteEvent={(_id) => { this.deleteEvent.call(this, _id); }}
              />,
            )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user, events }) => ({
  user,
  events,
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: (_id) => {
    dispatch(deleteEvent(_id));
  },
  addEvents: (events) => {
    dispatch(addEvents(events));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
