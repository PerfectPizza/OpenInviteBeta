import React from 'react';
import { Link } from 'react-router-dom';

require('./styles.css');

const Sidebar = () => (
  <ul id="slide-out" className="side-nav fixed">
    <li><div className="userView">
      <div className="background"></div>
      <Link to="/">
        <img alt="user" className="circle" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/00c/19b/270823d.jpg" />
      </Link>
    </div></li>
    <hr/>
    <li><Link to="/"><i className="material-icons large">view_list</i></Link></li>
    <hr/>
    <li><Link to="/map"><i className="material-icons large">place</i></Link></li>
    <hr/>
    <li><Link to="/edit"><i className="material-icons large">add</i></Link></li>
  </ul>
);

export default Sidebar;