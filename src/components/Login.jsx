import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

class Login extends React.Component {
  static propTypes = {
    attemptLogin: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { attemptLogin } = this.props;
    attemptLogin(username, password);
  }

  render() {

    return (
    const { email, password } = this.state;
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="user">Username</Label>
          <Input
            type="text"
            name="username"
            id="user"
            value={username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pass">Password</Label>
          <Input
            type="password"
            name="password"
            id="pass"
            value={password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button>Login</Button>
      </Form>
    );
  }
}

export default Login;
