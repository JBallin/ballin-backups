import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    const loginError = <Alert color="primary">{ errorMessage }</Alert>;
    const emailField = (
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
    const passwordField = (
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
    const loginForm = (
      <Form onSubmit={this.handleSubmit}>
        { emailField }
        { passwordField }
        { showLoginError && loginError }
        <Button color="primary" className="mr-3" disabled={isLoading}>Login</Button>
        <Link to="/signup">Not a member?</Link>
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
            { loginForm }
          </Col>
        </Row>
      </Container>
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
