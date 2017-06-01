import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import { localToUTC, UTCToLocal } from '../util';

require('./styles.css');

class AddEdit extends Component {

  constructor({ event }) {
    super();
    this.state = {
      title: event.title,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      location: {
        lng: event.location.longitude || '123',
        lat: event.location.latitude || '456',
      },
    };
  }

  addOrEdit() {
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

  validateForm(e) {
    e.preventDefault();
    let err = '';
    const title = this.state.title;
    const startTime = moment.utc(this.state.start_time);
    const endTime = moment.utc(this.state.end_time);
    const oneDayLater = moment.utc().add(24, 'hours');
    const now = moment.utc();
    if (title.length === 0) {
      err += 'A title is required for every event.\n';
    }
    if (endTime.isBefore(startTime)) {
      err += 'The start time must be before the end time.\n';
    }
    if (endTime.isBefore(now) || startTime.isBefore(now)) {
      err += 'The start time and end times cannot be in the past.\n';
    }
    if (moment(endTime).isAfter(oneDayLater) || moment(startTime).isAfter(oneDayLater)) {
      err += 'The event must start and end within 24 hours of its creation\n';
    }
    if (err.length) {
      alert(err);
      return;
    }
    this.addOrEdit();
  }

  render() {
    return (
      <div className="main">
        <div className="row">
          <h3 className="center">{this.state.title ? `Edit ${this.state.title}` : 'Create an Event'}</h3>
          <hr />
            <form className="col s9" onSubmit={this.validateForm.bind(this)}>
              <div className="row">
                <div className="col s3 input-field">
                  <input
                    className="input-list"
                    id="title-AddEdit"
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                  <label className="active label-list" htmlFor="title-AddEdit">Title:</label>
                </div>
                <div className="col s6 input-field">MAP</div>
                <button className="btn waves-effect waves-light right" type="submit">Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
              <div className="row">
                <div className="col s3 input-field">
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
                <div className="col s3 input-field">
                  <input
                    className="input-list"
                    id="start_time-AddEdit"
                    onChange={e => this.setState({ start_time: localToUTC(e.target.value) })}
                    type="datetime-local"
                    value={UTCToLocal(this.state.start_time)}
                  />
                  <label
                    className="active label-list"
                    htmlFor="start_time-AddEdit"
                  >start time</label>
                </div>
              </div>
              <div className="row">
                <div className="col s3 input-field">
                  <input
                    className="input-list"
                    id="end_time-AddEdit"
                    onChange={e => this.setState({ end_time: localToUTC(e.target.value) })}
                    type="datetime-local"
                    value={UTCToLocal(this.state.end_time)}
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
    _id: PropTypes.string,
  }),
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
