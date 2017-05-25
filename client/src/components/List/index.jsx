import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEvent, addEvents } from './actions';
import ListItem from './views';

require('./styles.css');

class List extends Component {
  constructor({ user }) {
    console.log('hello world!');
    super();
    this.state = {
      events: [],
    };
    this.user_id = user._id;
  }

  componentDidMount() {
    axios.get(`/api/user/${this.user_id}/event`)
      .then((event) => {
        this.props.addEvents(event);
      });
  }

  deleteEvent(_id) {
    axios.delete(`/event/${_id}`)
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
        <h1>List</h1>
        <ul className="collection">
          <li>Hello world! list</li>
          {this.state.events() &&
            this.state.events().map(event =>
              <ListItem
                event={event}
                deletePost={this.deletePost.bind(this)}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
