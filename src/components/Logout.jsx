import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';
import { userLogout } from '../redux/actions/auth.actions';

class Logout extends React.Component {
  static propTypes = {
    userLogoutAction: PropTypes.func.isRequired,
    showLogoutError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isUserDeleted: PropTypes.bool.isRequired,
    username: PropTypes.string,
  };

  static defaultProps = {
    username: '',
  }

  state = {
    attemptedLogout: false,
    username: '',
    isUserDeleted: false,
  }

  async componentDidMount() {
    const { userLogoutAction, username, isUserDeleted } = this.props;
    await userLogoutAction();
    this.setState({ attemptedLogout: true, username, isUserDeleted });
  }

  alertSuccessAndRedirect = () => {
    const { username } = this.state;
    const { isUserDeleted } = this.state;
    if (!isUserDeleted) {
      Swal({
        type: 'success',
        title: `Later ${username}...`,
      });
    }
    return <Redirect push to="/login" />;
  };

  render() {
    document.title = 'Logout | My Sweet Config';
    const { attemptedLogout } = this.state;
    const { showLogoutError, errorMessage } = this.props;
    if (attemptedLogout) {
      if (showLogoutError) return <h1>{errorMessage}</h1>;
      return this.alertSuccessAndRedirect();
    }
    return null;
  }
}

const mapStateToProps = state => ({
  showLogoutError: state.auth.showLogoutError,
  username: state.auth.user.username,
  errorMessage: state.auth.errorMessage,
  isUserDeleted: state.userDelete.isUserDeleted,
});

const mapDispatchToProps = dispatch => ({
  userLogoutAction: bindActionCreators(userLogout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
