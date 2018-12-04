import React from 'react';
import {
  Route, Redirect, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import NoMatch from './components/NoMatch';
import SignupHelp from './components/SignupHelp';
import Auth from './components/Auth';
import SiteDown from './components/SiteDown';

class AppRouter extends React.Component {
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

  state = {
    initialPath: '',
  }

  componentDidMount() {
    const { location } = this.props;
    this.setState({ initialPath: location.pathname });
  }

  render() {
    const { user, tokenLoginFailure, APIFetchFailure } = this.props;
    const { initialPath } = this.state;
    const checkingAuth = !user.username && !tokenLoginFailure && !APIFetchFailure;
    return (
      <Switch>
        <Route
          path="/auth"
          render={() => <Auth prevPath={initialPath} />}
        />
        { checkingAuth && <Redirect to="/auth" /> }
        <Route path="/site-down" component={SiteDown} />
        { APIFetchFailure && <Redirect to="/site-down" /> }
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup/help" component={SignupHelp} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={UserProfile} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  tokenLoginFailure: state.auth.tokenLoginFailure,
  APIFetchFailure: state.api.APIFetchFailure,
});

export default withRouter(connect(mapStateToProps, null)(AppRouter));
