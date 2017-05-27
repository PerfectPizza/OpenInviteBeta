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
      start_time: event.start_time || new Date(new Date()).setHours(new Date().getHours() + 3),
      end_time: event.end_time || new Date(new Date()).setHours(new Date().getHours() + 5),
      location: {
        lng: event.location.longitude || '123',
        lat: event.location.latitude || '456',
      },
      creator: event.creator || '987',
    };
  }

  addOrEdit(e) {
    e.preventDefault();
    const query = this.props.event._id
    ? axios.put(`/api/event/${this.props.event._id}`, this.state)
    : axios.post('/api/event', this.state);
    query
      .then(() => {
        // No need to dispatch here because the list component will retrieve uptodate events
        this.props.history.push('/list');
      })
      .catch(() => {
        alert('There was an unfamiliar error saving the event. Please try again later');
      });
  }

  render() {
    return (
      <div className="main">
        <div className="row">
          <h3 className="center">{this.state.title ? `Edit ${this.state.title}` : 'Create an Event'}</h3>
          <div className="row">
            <form className="col s12" onSubmit={this.addOrEdit.bind(this)}>
              <div className="row">
                <div className="col s4 input-field">
                  <input
                    className="input-list"
                    id="title-AddEdit"
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                  <label className="active label-list" htmlFor="title-AddEdit">Title:</label>
                </div>
                <div className="col s8 input-field">MAP</div>
                <button className="btn waves-effect waves-light right" type="submit">Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
              <div className="row">
                <div className="col s4 input-field">
                  <textarea
                    className="input-list"
                    id="description-AddEdit"
                    onChange={e => this.setState({ description: e.target.value })}
                    value={this.state.description}
                  />
                  <label
                    className="label-list active"
                    htmlFor="description-AddEdit"
                  >Description</label>
                </div>
              </div>
              <div className="row">
                <div className="col s4 input-field">
                  <input
                    className="input-list"
                    id="start_time-AddEdit"
                    onChange={e => this.setState({ start_time: e.target.value })}
                    value={this.state.content}
                  />
                  <label
                    className="active label-list"
                    htmlFor="start_time-AddEdit"
                  >start time</label>
                </div>
              </div>
              <div className="row">
                <div className="col s4 input-field">
                  <input
                    className="input-list"
                    id="end_time-AddEdit"
                    onChange={e => this.setState({ start_time: e.target.value })}
                    value={this.state.content}
                  />
                  <label
                    className="active label-list"
                    htmlFor="end_time-AddEdit"
                  >end time</label>
                </div>
              </div>
            </form>
          </div>
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
    _id: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
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
};

const mapStateToProps = ({ events }, { match }) => ({
  event: events.find(event => event._id === match.params.event_id),
});

export default withRouter(connect(mapStateToProps)(AddEdit));
