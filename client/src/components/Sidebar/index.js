/* global $ */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

require('./styles.css');

class Sidebar extends Component {

  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 200,
      draggable: true,
      closeOnClick: true,
    });
  }

  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="userView">
            <Link to="/list">
              <img alt="user" className="circle" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/005/00c/19b/270823d.jpg" />
            </Link>
          </div></li>
          <hr />
          <li><Link to="/list"><i className="material-icons large">view_list</i></Link></li>
          <hr />
          <li><Link to="/map"><i className="material-icons large">place</i></Link></li>
          <hr />
          <li><Link to="/edit"><i className="material-icons large">add</i></Link></li>
        </ul>
        <a data-activates="slide-out" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidebar;