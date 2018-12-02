export const PASSWORD_MISMATCH = 'PASSWORD_MISMATCH';
export const MISSING_FIELDS = 'MISSING_FIELDS';
export const INVALID_EMAIL = 'INVALID_EMAIL';
export const INVALID_GIST_ID = 'INVALID_GIST_ID';
export const RESET_INVALID_GIST_ID = 'RESET_INVALID_GIST_ID';

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

const API_URL = process.env.REACT_APP_API;

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const resetInvalidGist = () => (dispatch) => {
  dispatch({ type: RESET_INVALID_GIST_ID });
};

export const validateSignup = formData => (dispatch) => {
  const { email, password, verifyPassword } = formData;
  if (email && !validateEmail(email)) {
    dispatch({ type: INVALID_EMAIL });
  } else if (password !== verifyPassword) {
    dispatch({ type: PASSWORD_MISMATCH });
  } else if (Object.keys(formData).find(key => !formData[key])) {
    dispatch({ type: MISSING_FIELDS });
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
    const errorMessage = err.messag || err;
    if (errorMessage.includes('gist')) {
      dispatch({ type: INVALID_GIST_ID });
    }
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload: errorMessage,
    });
  }
};
