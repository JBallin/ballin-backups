import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogout } from '../actions/auth.actions';

const Logout = ({ userLogoutAction }) => {
  document.title = 'Logout | My Sweet Config';
  userLogoutAction();
  return <Redirect push to="/login" />;
};

Logout.propTypes = { userLogoutAction: PropTypes.func.isRequired };

const mapDispatchToProps = dispatch => ({
  userLogoutAction: bindActionCreators(userLogout, dispatch),
});

export default connect(null, mapDispatchToProps)(Logout);
