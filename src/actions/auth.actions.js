export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

export const USER_LOGOUT_PENDING = 'USER_LOGOUT_PENDING';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

const API_URL = process.env.REACT_APP_API;

export const userLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_PENDING });
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const userObject = await response.json();
    if (userObject.error) throw userObject.error;
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userObject,
    });
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: err.message || err,
    });
  }
};

export const userSignup = newUser => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_PENDING });
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
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload: err.message || err,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_PENDING });
    const res = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (res.status !== 205) {
      const parsedRes = await res.json();
      if (parsedRes.error) throw parsedRes.error;
    }
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({
      type: USER_LOGOUT_FAILED,
      payload: err.message || err,
    });
  }
};
