import {
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_LOGOUT_PENDING,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
} from '../actions/auth.actions';

const initialState = {
  isLoading: false,
  user: {},
  showLoginError: false,
  showSignupError: false,
  showLogoutError: false,
  errorMessage: '',
};

export default(state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_PENDING:
      return { ...state, isLoading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, user: action.payload, showLoginError: false, errorMessage: '',
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        showLoginError: true,
        errorMessage: action.payload,
      };
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true, showLoginError: false };
    case USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false, errorMessage: '' };
    case USER_SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        showSignupError: true,
        errorMessage: action.payload,
      };
    case USER_LOGOUT_PENDING:
      return { ...state, isLoading: true };
    case USER_LOGOUT_SUCCESS:
      return initialState;
    case USER_LOGOUT_FAILED:
      return { ...initialState, showLogoutError: true, errorMessage: action.payload };
    default:
      return state;
  }
};
