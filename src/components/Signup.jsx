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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/signup.actions';

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
      resetInvalidGist, errorMessage, validateSignup,
    } = this.props;
    await this.setState({ [e.target.name]: e.target.value });
    if (errorMessage) {
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
    const { errorMessage } = this.props;
    if (!errorMessage) {
      const newUser = this.formatUser(this.state);
      await userSignup(newUser);
    }
  }

  render() {
    document.title = 'Signup | My Sweet Config';
    const {
      gistId, email, username, password, verifyPassword,
    } = this.state;
    const colStyle = ({
      border: '1px solid #c9c5c2',
      padding: 35,
      boxShadow: '3px 3px 47px 0px rgba(0,0,0,0.5)',
    });
    const isFieldInvalid = field => errorMessage !== '' && missing.includes(field);
    const isGistInvalid = () => {
      if (errorMessage) {
        return missing.includes('gistId') || isValidGist === false;
      }
      return false;
    };
    const isPassInvalid = (field) => {
      if (errorMessage) {
        return missing.includes(field) || verifyPassword !== password;
      }
      return false;
    };
    const gistIdField = (
      <FormGroup>
        <Label for="gistId-field">
          Gist ID
          <Link to="/signup/help" className="ml-1">(Help)</Link>
        </Label>
        <Input
          invalid={isGistInvalid()}
          autoFocus
          type="text"
          name="gistId"
          id="gistId-field"
          value={gistId}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const usernameField = (
      <FormGroup>
        <Label for="username-field">
          Username
        </Label>
        <Input
          invalid={isFieldInvalid('username')}
          type="text"
          name="username"
          id="username-field"
          value={username}
          onChange={this.handleChange}
          autoComplete="username"
        />
      </FormGroup>
    );
    const emailField = (
      <FormGroup>
        <Label for="email-field">
          Email
        </Label>
        <Input
          invalid={isFieldInvalid('email')}
          type="email"
          name="email"
          id="email-field"
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
          invalid={isPassInvalid('password')}
          type="password"
          name="password"
          id="password-field"
          value={password}
          onChange={this.handleChange}
          autoComplete="new-password"
        />
      </FormGroup>
    );
    const verifyPasswordField = (
      <FormGroup>
        <Label for="verifyPassword-field">
          Verify Password
        </Label>
        <Input
          invalid={isPassInvalid('verifyPassword')}
          type="password"
          name="verifyPassword"
          id="verifyPassword-field"
          value={verifyPassword}
          onChange={this.handleChange}
          autoComplete="new-password"
        />
        {errorMessage ? (
          <Alert color="danger" className="mt-3">{errorMessage}</Alert>
        ) : null}
      </FormGroup>
    );
    const form = (
      <Form onSubmit={this.handleSubmit}>
        { gistIdField }
        { usernameField }
        { emailField }
        { passwordField }
        { verifyPasswordField }
        <Button color="primary" type="submit">Sign Up</Button>
      </Form>
    );

    return (
      <Container className="main-wrapper">
        <Row style={{ marginTop: '10vh', marginBottom: '10vh' }}>
          <Col lg={{ size: 6, offset: 3 }} style={colStyle}>
            { form }
          </Col>
        </Row>
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
});

const mapDispatchToProps = dispatch => ({
  validateSignup: bindActionCreators(actions.validateSignup, dispatch),
  userSignup: bindActionCreators(actions.userSignup, dispatch),
  resetInvalidGist: bindActionCreators(actions.resetInvalidGist, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
