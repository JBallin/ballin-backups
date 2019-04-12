import { API_FETCH_FAILED } from '../reducers/api.reducers';
import validateEmail from '../utils';

export const USER_UPDATE_PENDING = 'USER_UPDATE_PENDING';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export const CURRENT_PASSWORD_INVALID = 'CURRENT_PASSWORD_INVALID';
export const UPDATE_PASSWORD_MISMATCH = 'UPDATE_PASSWORD_MISMATCH';
export const UPDATE_INVALID_EMAIL = 'UPDATE_INVALID_EMAIL';
export const UPDATE_INVALID_GIST_ID = 'UPDATE_INVALID_GIST_ID';
export const UPDATE_RESET_INVALID_GIST_ID = 'UPDATE_RESET_INVALID_GIST_ID';
export const CLEAR_EDIT_ERRORS = 'CLEAR_EDIT_ERRORS';

export const RESET_UPDATE_FORM = 'RESET_UPDATE_FORM';

const API_URL = process.env.REACT_APP_API;

export const resetInvalidGist = () => (dispatch) => {
  dispatch({ type: UPDATE_RESET_INVALID_GIST_ID });
};

export const clearEditErrors = () => dispatch => dispatch({ type: CLEAR_EDIT_ERRORS });

export const validateUpdate = formData => (dispatch) => {
  const {
    email, password, verifyPassword,
  } = formData;
  if (email && !validateEmail(email)) {
    dispatch({ type: UPDATE_INVALID_EMAIL });
  } else if (password !== verifyPassword) {
    dispatch({ type: UPDATE_PASSWORD_MISMATCH });
  } else {
    dispatch({ type: CLEAR_EDIT_ERRORS });
  }
};

export const userUpdate = (userId, updateRequest) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PENDING });
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateRequest),
      credentials: 'include',
    });
    const userUpdates = await response.json();
    if (userUpdates.error) throw userUpdates.error;
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: userUpdates,
    });
  } catch (err) {
    const errorMessage = err.message || err;
    dispatch({
      type: USER_UPDATE_FAILED,
      payload: errorMessage,
    });
    if (err instanceof TypeError) {
      dispatch({ type: API_FETCH_FAILED });
    } else if (errorMessage.includes('gist')) {
      dispatch({ type: UPDATE_INVALID_GIST_ID });
    }
  }
};

export const resetUpdateForm = () => (dispatch) => {
  dispatch({
    type: RESET_UPDATE_FORM,
  });
};
