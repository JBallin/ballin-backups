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
    username: PropTypes.string,
    tokenLogin: PropTypes.func.isRequired,
    tokenLoginFailure: PropTypes.bool.isRequired,
    APIFetchFailure: PropTypes.bool.isRequired,
    prevPath: PropTypes.string.isRequired,
  }

  static defaultProps = {
    username: '',
  }

  componentDidMount = async () => {
    const { tokenLogin } = this.props;
    const delay = 700;
    const delayedPromise = new Promise(resolve => setTimeout(resolve, delay));
    await Promise.all([tokenLogin(), delayedPromise]);
    this.setState({ checkedAuth: true });
  }

  getNextPath = () => {
    const nextPathOptions = ['/login', '/logout', '/signup', '/signup/help'];
    const { prevPath } = this.props;
    return nextPathOptions.includes(prevPath) ? prevPath : '/login';
  }

  render() {
    document.title = 'Auth | My Sweet Config';
    const {
      username, tokenLoginFailure, APIFetchFailure,
    } = this.props;
    const { checkedAuth } = this.state;
    if (checkedAuth) {
      if (APIFetchFailure) return <Redirect to="/site-down" />;
      if (tokenLoginFailure) return <Redirect to={this.getNextPath()} />;
      if (username) return <Redirect to="/profile" />;
    }
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username,
  isLoading: state.auth.isLoading,
  tokenLoginFailure: state.auth.tokenLoginFailure,
  errorMessage: state.auth.errorMessage,
  APIFetchFailure: state.api.APIFetchFailure,
});

const mapDispatchToProps = dispatch => ({
  tokenLogin: bindActionCreators(actions.tokenLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
