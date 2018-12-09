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
} from '../actions/auth.actions';

const initialState = {
  isLoading: false,
  user: {},
  showLoginError: false,
  showLogoutError: false,
  errorMessage: '',
  tokenLoginFailure: false,
  isLoggedOut: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
