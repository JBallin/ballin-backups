import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
    tokenLoginFailure: PropTypes.bool.isRequired,
    APIFetchFailure: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

const mapStateToProps = state => ({
  user: state.auth.user,
  tokenLoginFailure: state.auth.tokenLoginFailure,
  APIFetchFailure: state.api.APIFetchFailure,
});

export default withRouter(connect(mapStateToProps, null)(AppRouter));
