import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import List from './components/List';
import GMap from './components/GMap';
import AddEdit from './components/AddEdit';
import Event from './components/Event';

const ViewRouter = () => (
  <Router>
    <div>
      <Route path="/" component={Sidebar} />
      <Route path="/map" component={GMap} />
      <Route path="/list" component={List} />
      <Route path="/edit/:event_id?" component={AddEdit} />
      <Route path="/event/:event_id?" component={Event} />
    </div>
  </Router>
);

export default ViewRouter;
