import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout } from '../redux/actions/auth.actions';

class Logout extends React.Component {
  static propTypes = {
    userLogoutAction: PropTypes.func.isRequired,
    showLogoutError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  state = {
    attemptedLogout: false,
  }

  async componentDidMount() {
    const { userLogoutAction } = this.props;
    await userLogoutAction();
    this.setState({ attemptedLogout: true });
  }

  render() {
    document.title = 'Logout | My Sweet Config';
    const { attemptedLogout } = this.state;
    const { showLogoutError, errorMessage } = this.props;
    if (attemptedLogout) {
      if (showLogoutError) return <h1>{errorMessage}</h1>;
      return <Redirect push to="/login" />;
    }
    return null;
  }
}

const mapStateToProps = state => ({
  showLogoutError: state.auth.showLogoutError,
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  userLogoutAction: bindActionCreators(userLogout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
