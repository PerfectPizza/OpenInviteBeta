import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateEvent, addEvent } from '../actions';

require('./styles.css');

class AddEdit extends Component {

  constructor({ event }) {
    super();
    this.state = {
      title: event.title,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      longitude: event.location.longitude,
      latitude: event.location.latitude,
      creator: event.creator,
    };
    this.event_id = event._id;
    console.log('id', event._id)
  }

  addOrEdit(e) {
    e.preventDefault();
    let query;
    let action;
    if (this.event_id) {
      query = axios.put(`/api/event/${this.event_id}`, this.state);
      action = this.props.addEvent;
    } else {
      query = axios.post('/api/event', this.state);
      action = this.props.updateEvent;
    }
    query
      .then(() => {
        this.props[action](this.state);
        this.history.push('/list');
      })
      .catch(() => {
        alert('There was a problem saving this event');
      });
  }

  render() {
    return (
      <div className="row">
        <h3 className="center">{this.state.title ? `Edit ${this.state.title}` : 'Create an Event'}</h3>
        <div className="row">
          <form className="col s12" onSubmit={this.addOrEdit.bind(this)}>
            <div className="row">
              <div className="col s4 input-field">
                <input
                  className="input-list"
                  id="title-mutate"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <label className="active label-list" htmlFor="title-mutate">Title:</label>
              </div>
              <button className="btn waves-effect waves-light right" type="submit">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
            <div className="row">
              <div className="col s4 input-field">
                <textarea
                  className="input-list"
                  id="description-mutate"
                  onChange={e => this.setState({ description: e.target.value })}
                  value={this.state.content}
                />
                <label
                  className="active label-list"
                  htmlFor="description-mutate"
                >Description</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddEdit.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.objectOf(PropTypes.string),
  }),
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

AddEdit.defaultProps = {
  event: {
    title: '',
    creator: '',
    start_time: '',
    end_time: '',
    attendees: [],
    location: {
      latitude: '',
      longitude: '',
    },
  },
  addEvent,
  updateEvent,
};

const mapStateToProps = ({ events }, { match }) => ({
  event: events.find(event => event._id === match.params.event_id),
});

const mapDispatchToProps = dispatch => ({
  addEvent: (_id) => {
    dispatch(addEvent(_id));
  },
  updateEvent: (event) => {
    dispatch(updateEvent(event));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEdit));
