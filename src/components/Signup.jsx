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
import { userSignup } from '../actions/auth.actions';

const validateGistAPI = `${process.env.REACT_APP_API}/validateGist`;
const fields = ['gistId', 'name', 'email', 'username', 'password', 'verifyPassword'];

class Signup extends Component {
  state = {
    isValidGist: null,
    gistId: '',
    name: '',
    email: '',
    username: '',
    password: '',
    verifyPassword: '',
    errorMessage: '',
    missing: [],
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
    this.validateForm();
    const { isValid } = this.state;
    const { userSignupAction } = this.props;
    if (isValid) {
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
      gistId, name, email, username, password, verifyPassword, errorMessage, missing, isValidGist,
    } = this.state;
    const redBoxShadow = { boxShadow: '0 0 5px red' };
    const getGistBoxShadow = () => {
      if (missing.includes('gistId') || isValidGist === false) {
        return redBoxShadow;
      }
      return {};
    };
    const colStyle = ({
      border: '1px solid #c9c5c2',
      padding: 35,
      boxShadow: '3px 3px 47px 0px rgba(0,0,0,0.5)',
    });
    const gistIdField = (
      <FormGroup>
        <Label for="gistId-field">
          Gist ID
          <Link to="/signup/help" className="ml-1">(Help)</Link>
        </Label>
        <Input
          autoFocus
          style={getGistBoxShadow()}
          type="text"
          name="gistId"
          id="gistId-field"
          value={gistId}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const nameField = (
      <FormGroup>
        <Label for="name-field">
          Name
        </Label>
        <Input
          style={missing.includes('name') ? { boxShadow: '0 0 5px red' } : {}}
          type="text"
          name="name"
          id="name-field"
          value={name}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const emailField = (
      <FormGroup>
        <Label for="email-field">
          Email
        </Label>
        <Input
          style={missing.includes('email') ? { boxShadow: '0 0 5px red' } : {}}
          type="email"
          name="email"
          id="email-field"
          value={email}
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
          style={missing.includes('userName') ? { boxShadow: '0 0 5px red' } : {}}
          type="text"
          name="username"
          id="username-field"
          value={username}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const passwordField = (
      <FormGroup>
        <Label for="password">
          Password
        </Label>
        <Input
          style={missing.includes('password') ? { boxShadow: '0 0 5px red' } : {}}
          type="password"
          name="password"
          id="password-field"
          value={password}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const verifyPasswordField = (
      <FormGroup>
        <Label for="verifyPassword-field">
          Verify Password
        </Label>
        <Input
          style={missing.includes('verifyPassword') ? { boxShadow: '0 0 5px red' } : {}}
          type="password"
          name="verifyPassword"
          id="verifyPassword-field"
          value={verifyPassword}
          onChange={this.handleChange}
        />
        {errorMessage ? (
          <Alert color="danger" className="mt-3">{errorMessage}</Alert>
        ) : null}
      </FormGroup>
    );
    const form = (
      <Form onSubmit={this.userSignup}>
        { gistIdField }
        { nameField }
        { emailField }
        { usernameField }
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

const mapDispatchToProps = dispatch => ({
  userSignupAction: bindActionCreators(userSignup, dispatch),
});

export default connect(null, mapDispatchToProps)(Signup);
