import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import proptypes from '../proptypes';
import ListItem from '../ListItem';
import { addEvents } from '../actions/events';

require('./styles.css');

class List extends Component {

  constructor() {
    super();
    localStorage.OpenInviteBetaLocation = '/list';
  }

  componentDidMount() {
    axios.get('/api/event')
      .then(({ data: events }) => {
        const oldEvents = JSON.stringify(this.props.events);
        const newEvents = events.filter(event => !oldEvents.includes(event._id));
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
                key={JSON.stringify(event)}
                event={event}
              />,
            )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => ({ events });

const mapDispatchToProps = dispatch => ({
  addEvents: (events) => {
    dispatch(addEvents(events));
  },
});

List.PropTypes = {
  events: proptypes.events.isRequired,
  addEvents: PropTypes.func.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
