import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import NoMatch from './components/NoMatch';
import SignupHelp from './components/SignupHelp';

const AppRouter = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup/help" component={SignupHelp} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={UserProfile} />
    <Route component={NoMatch} />
  </Switch>
);

export default AppRouter;
