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
    username: PropTypes.string,
  };

  static defaultProps = {
    username: '',
  }

  state = {
    attemptedLogout: false,
    username: '',
  }

  async componentDidMount() {
    const { userLogoutAction, username } = this.props;
    await userLogoutAction();
    this.setState({ attemptedLogout: true, username });
  }

  alertSuccessAndRedirect = () => {
    const { username } = this.state;
    Swal({
      type: 'success',
      title: `<p>Bye <i>${username}</i>!</p>`,
    });
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
});

const mapDispatchToProps = dispatch => ({
  userLogoutAction: bindActionCreators(userLogout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
