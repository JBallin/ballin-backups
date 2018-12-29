import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Alert,
  Input,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import * as actions from '../redux/actions/signup.actions';

import FormSpinner from './FormSpinner';

class Signup extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    showSignupError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    invalidGist: PropTypes.bool.isRequired,
    resetInvalidGist: PropTypes.func.isRequired,
    invalidEmail: PropTypes.bool.isRequired,
    userSignup: PropTypes.func.isRequired,
    validateSignup: PropTypes.func.isRequired,
    resetSignup: PropTypes.func.isRequired,
    newUser: PropTypes.string.isRequired,
  }

  state = {
    gistId: '',
    email: '',
    username: '',
    password: '',
    verifyPassword: '',
  }

  handleChange = async (e) => {
    const {
      resetInvalidGist, showSignupError, validateSignup,
    } = this.props;
    const { name } = e.target;
    let { value } = e.target;
    const isPassword = name.toLowerCase().includes('password');
    if (!isPassword) value = value.toLowerCase();
    await this.setState({ [name]: value });
    if (showSignupError) {
      validateSignup(this.state);
      resetInvalidGist();
    }
  }

  formatUser = (user) => {
    const formatted = { ...user, gist_id: user.gistId };
    formatted.gist_id = formatted.gistId;
    delete formatted.gistId;
    delete formatted.verifyPassword;
    return formatted;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      validateSignup, userSignup,
    } = this.props;
    await validateSignup(this.state);
    const { showSignupError } = this.props;
    if (!showSignupError) {
      const newUser = this.formatUser(this.state);
      userSignup(newUser);
    }
  }

  render() {
    document.title = 'Signup | My Sweet Config';
    const {
      gistId, email, username, password, verifyPassword,
    } = this.state;
    const {
      isLoading, showSignupError, errorMessage, invalidEmail, invalidGist, newUser, resetSignup,
    } = this.props;
    const colStyle = ({
      border: '1px solid #c9c5c2',
      padding: 35,
      boxShadow: '3px 3px 47px 0px rgba(0,0,0,0.5)',
    });
    const gistIdField = (
      <FormGroup>
        <Label for="gistId">
          Gist ID
          <Link to="/signup/help" className="ml-1">(Help)</Link>
        </Label>
        <Input
          invalid={
            showSignupError && (!gistId || invalidGist)
          }
          valid={
            showSignupError && !!gistId && !invalidGist
          }
          autoFocus
          type="text"
          name="gistId"
          id="gistId"
          value={gistId}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const usernameField = (
      <FormGroup>
        <Label for="username">
          Username
        </Label>
        <Input
          invalid={
            showSignupError && !username
          }
          valid={
            showSignupError && !!username
          }
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={this.handleChange}
          autoComplete="username"
        />
      </FormGroup>
    );
    const emailField = (
      <FormGroup>
        <Label for="email">
          Email
        </Label>
        <Input
          invalid={
            showSignupError && (!email || invalidEmail)
          }
          valid={
            showSignupError && (!!email && !invalidEmail)
          }
          name="email"
          id="email"
          value={email}
          onChange={this.handleChange}
          autoComplete="email username"
        />
      </FormGroup>
    );
    const passwordField = (
      <FormGroup>
        <Label for="password">
          Password
        </Label>
        <Input
          invalid={
            showSignupError && !password
          }
          valid={
            showSignupError && !!password
          }
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={this.handleChange}
          autoComplete="new-password"
        />
      </FormGroup>
    );
    const verifyPasswordField = (
      <FormGroup>
        <Label for="verifyPassword">
          Verify Password
        </Label>
        <Input
          invalid={
            showSignupError && (!verifyPassword || password !== verifyPassword)
          }
          valid={
            showSignupError && (!!verifyPassword && password === verifyPassword)
          }
          type="password"
          name="verifyPassword"
          id="verifyPassword"
          value={verifyPassword}
          onChange={this.handleChange}
          autoComplete="new-password"
        />
      </FormGroup>
    );
    const errorAlert = (
      <Alert color="danger" className="mt-3">
        {errorMessage}
      </Alert>
    );
    const submitButton = (
      <Button color="primary" disabled={isLoading || showSignupError}>
        Sign Up
      </Button>
    );
    const form = (
      <Form onSubmit={this.handleSubmit}>
        { gistIdField }
        { usernameField }
        { emailField }
        { passwordField }
        { verifyPasswordField }
        { showSignupError && errorAlert }
        { submitButton }
        { isLoading && <FormSpinner /> }
      </Form>
    );
    const styledForm = (
      <Row style={{ marginTop: '10vh', marginBottom: '10vh' }}>
        <Col lg={{ size: 6, offset: 3 }} style={colStyle}>
          { form }
        </Col>
      </Row>
    );
    const alertSuccessAndRedirect = () => {
      Swal({
        type: 'success',
        title: `Welcome ${username}!`,
        confirmButtonText: 'Login',
      })
        .then(resetSignup);
      return <Redirect push to="/login" />;
    };

    return (
      <Container className="main-wrapper">
        { newUser ? alertSuccessAndRedirect() : styledForm }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  showSignupError: state.signup.showSignupError,
  errorMessage: state.signup.errorMessage,
  isLoading: state.signup.isLoading,
  invalidEmail: state.signup.invalidEmail,
  invalidGist: state.signup.invalidGist,
  newUser: state.signup.newUser,
});

const mapDispatchToProps = dispatch => ({
  validateSignup: bindActionCreators(actions.validateSignup, dispatch),
  userSignup: bindActionCreators(actions.userSignup, dispatch),
  resetInvalidGist: bindActionCreators(actions.resetInvalidGist, dispatch),
  resetSignup: bindActionCreators(actions.resetSignup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
