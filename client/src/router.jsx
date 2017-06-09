import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Sidebar from './components/Sidebar';
import List from './components/List';
import MapList from './components/MapList';
import AddEdit from './components/AddEdit';
import Event from './components/Event';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const ViewRouter = () => (
  <Router>
    <div>
      <Route path="/" component={Sidebar} />
      <Route path="/map" component={MapList} />
      <Route path="/list" component={List} />
      <Route path="/edit/:eventId?" component={AddEdit} />
      <Route path="/event/:eventId" component={Event} />
    </div>
  </Router>
);

export default ViewRouter;
