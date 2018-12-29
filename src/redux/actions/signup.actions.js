import { API_FETCH_FAILED } from '../reducers/api.reducers';
import { RESET_LOGIN_ERROR } from '../reducers/auth.reducers';
import validateEmail from '../utils';

export const PASSWORD_MISMATCH = 'PASSWORD_MISMATCH';
export const MISSING_FIELDS = 'MISSING_FIELDS';
export const INVALID_EMAIL = 'INVALID_EMAIL';
export const INVALID_GIST_ID = 'INVALID_GIST_ID';
export const RESET_INVALID_GIST_ID = 'RESET_INVALID_GIST_ID';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

export const RESET_SIGNUP = 'RESET_SIGNUP';

const API_URL = process.env.REACT_APP_API;

export const resetInvalidGist = () => (dispatch) => {
  dispatch({ type: RESET_INVALID_GIST_ID });
};

export const validateSignup = formData => (dispatch) => {
  dispatch({ type: RESET_LOGIN_ERROR });
  const { email, password, verifyPassword } = formData;
  if (email && !validateEmail(email)) {
    dispatch({ type: INVALID_EMAIL });
  } else if (password !== verifyPassword) {
    dispatch({ type: PASSWORD_MISMATCH });
  } else if (Object.keys(formData).find(key => !formData[key])) {
    dispatch({ type: MISSING_FIELDS });
  } else {
    dispatch({ type: CLEAR_ERRORS });
  }
};

export const userSignup = newUser => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_PENDING });
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const user = await response.json();
    if (user.error) throw user.error;
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: user,
    });
  } catch (err) {
    if (err instanceof TypeError) {
      dispatch({
        type: API_FETCH_FAILED,
      });
    } else {
      const errorMessage = err.message || err;
      if (errorMessage.includes('gist')) {
        dispatch({ type: INVALID_GIST_ID });
      }
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload: errorMessage,
      });
    }
  }
};

export const resetSignup = () => (dispatch) => {
  dispatch({
    type: RESET_SIGNUP,
  });
};
