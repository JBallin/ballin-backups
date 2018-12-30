import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {
  Button, Form, FormGroup, Label, Container, Row, Col, Alert, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';
import * as actions from '../redux/actions/auth.actions';

class Login extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    showLoginError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    userLogin: PropTypes.func.isRequired,
  }

  static defaultProps = {
    username: '',
  }

  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'email') value = value.toLowerCase();
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { userLogin } = this.props;
    userLogin(this.state);
  }

  alertSuccessAndRedirect = () => {
    const { username } = this.props;
    Swal({
      type: 'success',
      title: `Greetings ${username}!`,
    });
    return <Redirect push to="/profile" />;
  };

  render() {
    document.title = 'Login | My Sweet Config';
    const { email, password } = this.state;
    const {
      showLoginError, errorMessage, isLoading, username,
    } = this.props;
    const emailField = (
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          autoFocus
          type="email"
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
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={this.handleChange}
          autoComplete="current-password"
        />
      </FormGroup>
    );
    const errorAlert = <Alert color="primary">{ errorMessage }</Alert>;
    const loginButton = (
      <Button color="primary" className="mr-3" disabled={isLoading}>
        Login
      </Button>
    );
    const signupLink = <Link to="/signup">Not a member?</Link>;
    const loginForm = (
      <Form onSubmit={this.handleSubmit}>
        { emailField }
        { passwordField }
        { showLoginError && errorAlert }
        { loginButton }
        { signupLink }
      </Form>
    );
    const colStyle = ({
      border: '1px solid #c9c5c2',
      padding: 35,
      boxShadow: '3px 3px 47px 0px rgba(0,0,0,.5)',
    });

    return (
      <Container className="main-wrapper">
        <Row style={{ marginTop: '15vh' }}>
          <Col lg={{ size: 6, offset: 3 }} style={colStyle}>
            { username ? this.alertSuccessAndRedirect() : loginForm }
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  showLoginError: state.auth.showLoginError,
  username: state.auth.user.username,
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  userLogin: bindActionCreators(actions.userLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
