import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Sidebar from './components/Sidebar';
import List from './components/List';
import MapList from './components/MapList';
import AddEdit from './components/AddEdit';
import Event from './components/Event';

injectTapEventPlugin();

const browserHistory = createBrowserHistory();

browserHistory.listen((location) => {
  localStorage.setItem('OpenInviteBetaLocation', location.pathname);
});

const ViewRouter = () => (
  <Router>
    <div>
      <Route path="/" component={Sidebar} />
      <Route path="/map" component={MapList} />
      <Route path="/list" component={List} />
      <Route path="/edit/:eventId?" component={AddEdit} />
      <Route path="/event/:eventId" component={Event} />
      <Redirect from="*" to={localStorage['OpenInviteBetaLocation']} />
    </div>
  </Router>
);

export default ViewRouter;
