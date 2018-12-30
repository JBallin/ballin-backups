import {
  USER_UPDATE_PENDING,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,

  UPDATE_INVALID_EMAIL,
  UPDATE_PASSWORD_MISMATCH,
  UPDATE_INVALID_GIST_ID,
  UPDATE_RESET_INVALID_GIST_ID,
  CLEAR_EDIT_ERRORS,
  RESET_UPDATE_FORM,
} from '../actions/userUpdate.actions';

const initialState = {
  isLoading: false,
  showUpdateError: false,
  errorMessage: '',
  invalidEmail: false,
  invalidGist: false,
  userUpdates: {},
};

export default(state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INVALID_EMAIL:
      return {
        ...state, errorMessage: 'Invalid email', showUpdateError: true, invalidEmail: true,
      };
    case UPDATE_PASSWORD_MISMATCH:
      return {
        ...state, errorMessage: 'Passwords do not match', showUpdateError: true, invalidEmail: false,
      };
    case UPDATE_INVALID_GIST_ID:
      return {
        ...state, invalidGist: true,
      };
    case UPDATE_RESET_INVALID_GIST_ID:
      return {
        ...state, invalidGist: false,
      };
    case CLEAR_EDIT_ERRORS:
      return {
        ...state, errorMessage: '', showUpdateError: false,
      };
    case USER_UPDATE_PENDING:
      return {
        ...state, isLoading: true, invalidEmail: false,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state, isLoading: false, errorMessage: '', showUpdateError: false, userUpdates: action.payload,
      };
    case USER_UPDATE_FAILED:
      return {
        ...state, isLoading: false, errorMessage: action.payload, showUpdateError: true,
      };
    case RESET_UPDATE_FORM:
      return initialState;
    default:
      return state;
  }
};
