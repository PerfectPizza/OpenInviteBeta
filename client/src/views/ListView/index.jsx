// Main view to see all of your available events
  // Includes both a list of and map of events

import React from 'react';
import { Link } from 'react-router-dom';

const ListView = () => {

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add">Add Event</Link></li>
      <li><Link to="/myEvents">My Events</Link></li>
    </ul>
  );
};

export default ListView;
