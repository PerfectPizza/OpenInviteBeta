/* global $ */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import { storeUser } from '../actions/user';

require('./styles.css');

class Sidebar extends Component {

  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 200,
      draggable: true,
      closeOnClick: true,
    });

    axios.get('/me')
      .then(({ data: user }) => {
        this.props.storeUser(user);
      });
  }

  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="userView">
            <Link to="/list">
              {this.props.user && <img alt="user" className="circle" src={this.props.user.picture} />}
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

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => ({
  storeUser: (user) => {
    dispatch(storeUser(user));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
