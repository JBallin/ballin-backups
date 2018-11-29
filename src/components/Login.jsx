import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Container, Row, Col, Alert, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../actions/auth.actions';

class Login extends React.Component {
  static propTypes = {
    showLoginError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userLoginAction } = this.props;
    await userLoginAction(this.state);
  }

  render() {
    document.title = 'Login | My Sweet Config';
    const { email, password } = this.state;
    const { showLoginError, errorMessage, isLoading } = this.props;
    const LoginError = () => <Alert color="primary">{ errorMessage }</Alert>;
    const EmailField = () => (
      <FormGroup>
        <Label for="email-field">Email</Label>
        <Input
          autoFocus
          type="email"
          name="email"
          id="email-field"
          value={email}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const PasswordField = () => (
      <FormGroup>
        <Label for="password-field">Password</Label>
        <Input
          type="password"
          name="password"
          id="password-field"
          value={password}
          onChange={this.handleChange}
        />
      </FormGroup>
    );
    const LoginForm = () => (
      <Form onSubmit={this.handleSubmit}>
        <EmailField />
        <PasswordField />
        { showLoginError && <LoginError /> }
        <Button color="primary" className="mr-3" disabled={isLoading}>Login</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  showLoginError: state.auth.showLoginError,
  user: state.auth.user,
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  userLoginAction: bindActionCreators(userLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
