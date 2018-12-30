import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import Swal from 'sweetalert2';
import * as updateActions from '../redux/actions/userUpdate.actions';
import * as deleteActions from '../redux/actions/userDelete.actions';
import * as authActions from '../redux/actions/auth.actions';

const initialState = {
  gistId: '',
  email: '',
  username: '',
  currentPassword: '',
  password: '',
  verifyPassword: '',
};

class EditProfile extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      gist_id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }).isRequired,
    isUserDeleted: PropTypes.bool.isRequired,
    userUpdates: PropTypes.shape({
      gist_id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      updated_at: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
    isUpdateLoading: PropTypes.bool.isRequired,
    isDeleteLoading: PropTypes.bool.isRequired,
    showUpdateError: PropTypes.bool.isRequired,
    showDeleteError: PropTypes.bool.isRequired,
    updateErrorMessage: PropTypes.string.isRequired,
    deleteErrorMessage: PropTypes.string.isRequired,
    invalidEmail: PropTypes.bool.isRequired,
    invalidGist: PropTypes.bool.isRequired,
    resetInvalidGist: PropTypes.func.isRequired,
    validateUpdate: PropTypes.func.isRequired,
    userUpdate: PropTypes.func.isRequired,
    userDelete: PropTypes.func.isRequired,
    resetUpdateForm: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
  }

  state = { ...initialState }

  handleChange = async (e) => {
    const {
      resetInvalidGist, showUpdateError, validateUpdate,
    } = this.props;
    const { name } = e.target;
    let { value } = e.target;
    const isPassword = name.toLowerCase().includes('password');
    if (!isPassword) value = value.toLowerCase();
    await this.setState({ [name]: value });
    if (showUpdateError) {
      validateUpdate(this.state);
      resetInvalidGist();
    }
  }

  formatUser = (user) => {
    const formatted = { ...user };
    if (user.gistId) formatted.gist_id = user.gistId;
    delete formatted.gistId;
    delete formatted.verifyPassword;
    return formatted;
  }

  confirmUpdate = async () => {
    const {
      validateUpdate, userUpdate, user, clearEditErrors,
    } = this.props;
    const updateRequest = {};
    Object.entries(this.state).forEach(([key, value]) => {
      if (value.length) updateRequest[key] = value;
    });
    const formattedUpdateReq = this.formatUser(updateRequest);
    const updatedFields = Object.keys(formattedUpdateReq);
    if (!updatedFields.length) {
      clearEditErrors();
      Swal({
        type: 'info',
        title: 'Please fill in the fields you would like to update.',
      });
    } else {
      await validateUpdate(this.state);
      const { showUpdateError } = this.props;
      if (!showUpdateError) {
        Swal({
          type: 'warning',
          title: 'Are you sure you want to update the following?',
          text: updatedFields.join(', '),
          input: 'password',
          inputPlaceholder: 'Enter your current password',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off',
            autocomplete: 'current-password',
          },
          inputValidator: value => !value && 'missing password',
          confirmButtonText: 'Update Me!',
          showCancelButton: true,
        })
          .then(({ dismiss, value: currentPassword }) => {
            if (!dismiss) {
              userUpdate(user.id, { currentPassword, ...formattedUpdateReq });
            }
          });
      }
    }
  };

  confirmDelete = async () => {
    const { user, userDelete, clearEditErrors } = this.props;
    clearEditErrors();
    Swal({
      type: 'warning',
      title: 'Are you sure you want to delete your profile?',
      input: 'password',
      inputPlaceholder: 'Enter your current password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
        autocomplete: 'current-password',
      },
      inputValidator: value => !value && 'missing password',
      confirmButtonText: 'Delete Me!',
      showCancelButton: true,
    })
      .then(({ dismiss, value: currentPassword }) => {
        if (!dismiss) userDelete(user.id, currentPassword);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.confirmUpdate();
  }

  render() {
    document.title = 'Edit Profile | My Sweet Config';
    const {
      gistId, email, username, password, verifyPassword,
    } = this.state;
    const {
      isUpdateLoading, isDeleteLoading, showUpdateError, showDeleteError, updateErrorMessage,
      deleteErrorMessage, invalidEmail, invalidGist, user, isUserDeleted, userUpdates,
      resetUpdateForm, fetchUser,
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
            showUpdateError && (!gistId || invalidGist)
          }
          valid={
            showUpdateError && !!gistId && !invalidGist
          }
          type="text"
          name="gistId"
          id="gistId"
          value={gistId}
          onChange={this.handleChange}
          placeholder={user.gist_id}
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
            showUpdateError && !username
          }
          valid={
            showUpdateError && !!username
          }
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={this.handleChange}
          autoComplete="username"
          placeholder={user.username}
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
            showUpdateError && (!email || invalidEmail)
          }
          valid={
            showUpdateError && (!!email && !invalidEmail)
          }
          name="email"
          id="email"
          value={email}
          onChange={this.handleChange}
          autoComplete="email username"
          placeholder={user.email}
        />
      </FormGroup>
    );
    const passwordField = (
      <FormGroup>
        <Label for="password">
          New Password
        </Label>
        <Input
          invalid={
            showUpdateError && !password
          }
          valid={
            showUpdateError && !!password
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
          Verify New Password
        </Label>
        <Input
          invalid={
            showUpdateError && (!verifyPassword || password !== verifyPassword)
          }
          valid={
            showUpdateError && (!!verifyPassword && password === verifyPassword)
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
    const updateErrorAlert = (
      <Alert color="danger" className="mt-3">
        {updateErrorMessage}
      </Alert>
    );
    const deleteErrorAlert = (
      <Alert color="danger" className="mt-3">
        {deleteErrorMessage}
      </Alert>
    );
    const updateButton = (
      <Button
        color="warning"
        disabled={isUpdateLoading || isDeleteLoading}
        onClick={this.confirmUpdate}
      >
        Update Profile
      </Button>
    );
    const deleteButton = (
      <Button
        color="danger"
        disabled={isDeleteLoading || isUpdateLoading}
        className="float-right"
        onClick={this.confirmDelete}
      >
        Delete Profile
      </Button>
    );
    // allows for handling submit on ENTER keydown
    const hiddenSubmitButton = <Button hidden />;
    const form = (
      <Form onSubmit={this.handleSubmit}>
        { gistIdField }
        { usernameField }
        { emailField }
        { passwordField }
        { verifyPasswordField }
        { showUpdateError && updateErrorAlert }
        { showDeleteError && deleteErrorAlert }
        { updateButton }
        { deleteButton }
        { hiddenSubmitButton }
      </Form>
    );
    const styledForm = (
      <Row style={{ marginTop: '10vh', marginBottom: '10vh' }}>
        <Col lg={{ size: 6, offset: 3 }} style={colStyle}>
          { form }
        </Col>
      </Row>
    );
    const updateSuccess = () => {
      Swal({
        type: 'success',
        title: `<p>You've successfully updated your profile <i>${username}</i>!</p>`,
      })
        .then(() => {
          resetUpdateForm();
          fetchUser(user.id);
          this.setState({ ...initialState });
        });
      return null;
    };
    const deleteSuccess = () => {
      Swal({
        type: 'success',
        title: `<p>Goodbye <i>${username}</i>, thanks for checking this out!`,
      });
      return <Redirect push to="/logout" />;
    };

    /* eslint-disable no-nested-ternary, indent */
    return (
      <Container className="main-wrapper">
        {
          Object.keys(userUpdates).length ? updateSuccess()
          : isUserDeleted ? deleteSuccess()
          : styledForm
        }
      </Container>
    );
    /* eslint-enable no-nested-ternary, indent */
  }
}

const mapStateToProps = state => ({
  showUpdateError: state.userUpdate.showUpdateError,
  updateErrorMessage: state.userUpdate.errorMessage,
  isUpdateLoading: state.userUpdate.isLoading,
  invalidEmail: state.userUpdate.invalidEmail,
  invalidGist: state.userUpdate.invalidGist,
  userUpdates: state.userUpdate.userUpdates,
  isDeleteLoading: state.userDelete.isLoading,
  showDeleteError: state.userDelete.showDeleteError,
  deleteErrorMessage: state.userDelete.errorMessage,
  isUserDeleted: state.userDelete.isUserDeleted,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  resetInvalidGist: bindActionCreators(updateActions.resetInvalidGist, dispatch),
  validateUpdate: bindActionCreators(updateActions.validateUpdate, dispatch),
  userUpdate: bindActionCreators(updateActions.userUpdate, dispatch),
  clearEditErrors: bindActionCreators(updateActions.clearEditErrors, dispatch),
  userDelete: bindActionCreators(deleteActions.userDelete, dispatch),
  resetUpdateForm: bindActionCreators(updateActions.resetUpdateForm, dispatch),
  fetchUser: bindActionCreators(authActions.fetchUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
