import {
  TOKEN_LOGIN_PENDING,
  TOKEN_LOGIN_SUCCESS,
  TOKEN_LOGIN_FAILED,
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_PENDING,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_FETCH_PENDING,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILED,
  INVALID_LOGIN_EMAIL,
} from '../actions/auth.actions';

export const RESET_LOGIN_ERROR = 'RESET_LOGIN_ERROR';

const initialState = {
  isLoading: false,
  user: {},
  showLoginError: false,
  showLogoutError: false,
  errorMessage: '',
  tokenLoginFailure: false,
  isLoggedOut: false,
  userFetchFailure: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case INVALID_LOGIN_EMAIL:
      return {
        ...state, isLoading: false, showLoginError: true, errorMessage: 'Invalid email. Please try again.',
      };
    case TOKEN_LOGIN_PENDING:
      return {
        ...state, isLoading: true,
      };
    case TOKEN_LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, user: action.payload, isLoggedOut: false,
      };
    case TOKEN_LOGIN_FAILED:
      return {
        ...state, isLoading: false, tokenLoginFailure: true,
      };
    case USER_LOGIN_PENDING:
      return {
        ...state, isLoading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, user: action.payload, showLoginError: false, errorMessage: '', isLoggedOut: false,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        showLoginError: true,
        errorMessage: action.payload,
      };
    case USER_LOGOUT_PENDING:
      return {
        ...state, isLoading: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...initialState, tokenLoginFailure: state.tokenLoginFailure, isLoggedOut: true,
      };
    case USER_LOGOUT_FAILED:
      return {
        ...initialState, showLogoutError: true, errorMessage: action.payload,
      };
    case RESET_LOGIN_ERROR:
      return {
        ...state, showLoginError: false, errorMessage: '',
      };
    case USER_FETCH_PENDING:
      return {
        ...state, isLoading: true,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state, isLoading: false, user: action.payload,
      };
    case USER_FETCH_FAILED:
      return {
        ...state, isLoading: false, userFetchFailure: true,
      };
    default:
      return state;
  }
};
