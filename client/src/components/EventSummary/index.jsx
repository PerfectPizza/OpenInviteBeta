import React, { PropTypes } from 'react';

const EventSummary = (props) => {
  const { title, startTime, endTime, host, attendees } = props.event;
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        <li>{host}</li>
        <li>{startTime}</li>
        <li>{endTime}</li>
        <li>{attendees}</li>
      </ul>
    </div>
  );
};

EventSummary.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    startTime: PropTypes.date.isRequired,
    endTime: PropTypes.date.isRequired,
    attendees: PropTypes.array.isRequired,
  }).isRequired,
};

export default EventSummary;
