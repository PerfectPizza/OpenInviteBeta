import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
  AddEdit,
  List,
  GMap,
} from './components';

import Sidebar from './components/Sidebar';

// May be able to take out browserHistory (not sure yet)
const ViewRouter = () => (
  <Router>
    <div>
      <Route path="/" component={Sidebar} />
      <Route path="/list" component={List} />
      <Route path="/edit/:event_id?" component={AddEdit} />
      <Route path="/map" component={GMap} />
      <Route path="/event/:event_id" component={AddEdit} />
      <Route path="*" component={List} />
    </div>
  </Router>
);

export default ViewRouter;
