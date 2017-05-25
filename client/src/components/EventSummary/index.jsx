import React from 'react';

export default EventSummary (props) => {
    const {name, type, startTime, endTime, host, attendees} = this.props.event;

    return (
      <div>
        <h2>{name}</h2>
      </div>
    );
};