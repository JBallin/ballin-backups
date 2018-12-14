import React from 'react';
import {
  Route, Redirect, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import Profile from './Profile';
import EditProfile from './EditProfile';
import NoMatch from './NoMatch';
import SignupHelp from './SignupHelp';
import Auth from './Auth';
import SiteDown from './SiteDown';

class AppRouter extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    tokenLoginFailure: PropTypes.bool.isRequired,
    APIFetchFailure: PropTypes.bool.isRequired,
    isLoggedOut: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    username: '',
  }

  state = {
    initialPath: '',
  }

  componentDidMount() {
    const { location } = this.props;
    this.setState({ initialPath: location.pathname });
  }

  render() {
    const {
      username, tokenLoginFailure, APIFetchFailure, isLoggedOut,
    } = this.props;
    const { initialPath } = this.state;
    const checkingAuth = !username && !tokenLoginFailure && !APIFetchFailure && !isLoggedOut;
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
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/profile" component={Profile} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username,
  tokenLoginFailure: state.auth.tokenLoginFailure,
  isLoggedOut: state.auth.isLoggedOut,
  APIFetchFailure: state.api.APIFetchFailure,
});

export default withRouter(connect(mapStateToProps, null)(AppRouter));
