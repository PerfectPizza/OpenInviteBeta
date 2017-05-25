import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/add">Add Event</Link></li>
    <li><Link to="/myEvents">My Events</Link></li>
  </ul>
);

export default Sidebar;
