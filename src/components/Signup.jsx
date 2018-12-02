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
    const newState = { [e.target.name]: e.target.value };
    if (e.target.name === 'gistId') newState.isValidGist = null;
    await this.setState(newState);
    const { errorMessage } = this.state;
    if (errorMessage) await this.validateForm();
  }

  validateForm = async () => {
    const {
      isValidGist, gistId, password, verifyPassword,
    } = this.state;
    const missing = fields.reduce((missingFields, field) => (
      // eslint-disable-next-line react/destructuring-assignment
      this.state[field] ? missingFields : missingFields.concat(field)
    ), []);
    let errorMessage = '';
    let validGist = isValidGist;
    const checkValidGist = () => fetch(`${validateGistAPI}/${gistId}`)
      .then(r => r.json()).then(j => j.isValid);

    if (!validGist) {
      if (validGist === null && gistId) validGist = await checkValidGist();
      if (validGist === false) errorMessage = 'Invalid Gist ID';
    }

    if (missing.length) {
      if (!errorMessage) errorMessage = 'Missing fields';
    }

    if (password !== verifyPassword) {
      if (!errorMessage) errorMessage = 'Passwords do not match';
    }

    this.setState({
      missing,
      errorMessage,
      isValidGist: validGist,
    });
  }

  userSignup = async (e) => {
    e.preventDefault();
    await this.validateForm();
    const { errorMessage } = this.state;
    const { userSignupAction } = this.props;
    if (!errorMessage) {
      const {
        gistId, name, email, username, password,
      } = this.state;
      userSignupAction({
        gist_id: gistId, name, email, username, password,
      });
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
      <Form onSubmit={this.userSignup}>
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
