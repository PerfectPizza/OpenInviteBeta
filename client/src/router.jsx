import React from 'react';
import {
  BrowserRouter as Router,
  browserHistory, // might be able to take out (not sure yet)
  Route,
} from 'react-router-dom';
import {
  EventsDashView,
  EventEditView,
  EventFullView,
} from './views';

// May be able to take out browserHistory (not sure yet)
const ViewRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={EventsDashView} />
    <Route path="/edit" component={EventEditView} />
    <Route path="/event" component={EventFullView} />
  </Router>
);

export default ViewRouter;
