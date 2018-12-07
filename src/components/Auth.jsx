import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as actions from '../redux/actions/auth.actions';
import Spinner from './PageSpinner';

class Auth extends React.Component {
  state = {
    checkedAuth: false,
  }

  static propTypes = {
    tokenLogin: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
    tokenLoginFailure: PropTypes.bool.isRequired,
    APIFetchFailure: PropTypes.bool.isRequired,
    prevPath: PropTypes.string.isRequired,
  }

  componentDidMount = async () => {
    const { tokenLogin } = this.props;
    const delay = 700;
    const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
    await Promise.all([tokenLogin(), delayedPromise]);
    this.setState({ checkedAuth: true });
  }

  render() {
    document.title = 'Auth | My Sweet Config';
    const {
      user, tokenLoginFailure, APIFetchFailure, prevPath,
    } = this.props;
    const { checkedAuth } = this.state;
    if (checkedAuth) {
      if (APIFetchFailure) return <Redirect to="/site-down" />;
      if (tokenLoginFailure) {
        let nextPath;
        const nextPathOptions = ['/login', '/logout', '/signup', '/signup/help'];
        if (nextPathOptions.includes(prevPath)) {
          nextPath = prevPath;
        } else {
          nextPath = '/login';
        }
        return <Redirect to={nextPath} />;
      }
      if (user.username) return <Redirect to="/profile" />;
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  tokenLoginFailure: state.auth.tokenLoginFailure,
  errorMessage: state.auth.errorMessage,
  APIFetchFailure: state.api.APIFetchFailure,
});

const mapDispatchToProps = dispatch => ({
  tokenLogin: bindActionCreators(actions.tokenLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
