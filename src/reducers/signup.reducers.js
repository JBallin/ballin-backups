import {
  INVALID_EMAIL,
  PASSWORD_MISMATCH,
  MISSING_FIELDS,
  INVALID_GIST_ID,
  RESET_INVALID_GIST_ID,
  CLEAR_ERRORS,
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  RESET_SIGNUP,
} from '../actions/signup.actions';

const initialState = {
  isLoading: false,
  showSignupError: false,
  errorMessage: '',
  invalidEmail: false,
  invalidGist: false,
  signupSuccessful: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case INVALID_EMAIL:
      return {
        ...state, errorMessage: 'Invalid email', showSignupError: true, invalidEmail: true,
      };
    case PASSWORD_MISMATCH:
      return {
        ...state, errorMessage: 'Passwords do not match', showSignupError: true, invalidEmail: false,
      };
    case MISSING_FIELDS:
      return {
        ...state, errorMessage: 'Missing fields', showSignupError: true, invalidEmail: false,
      };
    case INVALID_GIST_ID:
      return {
        ...state, invalidGist: true,
      };
    case RESET_INVALID_GIST_ID:
      return {
        ...state, invalidGist: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state, errorMessage: '', showSignupError: false,
      };
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true, invalidEmail: false };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, errorMessage: '', showSignupError: false, signupSuccessful: true,
      };
    case USER_SIGNUP_FAILED:
      return {
        ...state, isLoading: false, errorMessage: action.payload, showSignupError: true,
      };
    case RESET_SIGNUP:
      return initialState;
    default:
      return state;
  }
};
