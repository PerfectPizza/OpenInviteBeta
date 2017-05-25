import React from 'react';

export default Sidebar (props) => {
  
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add">Add Event</Link></li>
      <li><Link to="/myEvents">My Events</Link></li>
    </ul>
  );
};