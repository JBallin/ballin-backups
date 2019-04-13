import { API_FETCH_FAILED } from '../reducers/api.reducers';

export const USER_DELETE_PENDING = 'USER_DELETE_PENDING';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILED = 'USER_DELETE_FAILED';

const API_URL = process.env.REACT_APP_API;

export const userDelete = (userId, currentPassword) => async (dispatch) => {
  dispatch({ type: USER_DELETE_PENDING });
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword }),
      credentials: 'include',
    });
    if (res.status !== 204) {
      const resParsed = await res.json();
      if (resParsed.error) throw resParsed.error;
      else throw Error('DELETE status code is not 204 but no error was thrown');
    }
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (e) {
    const errorMessage = e.message || e;
    dispatch({
      type: USER_DELETE_FAILED,
      payload: errorMessage,
    });
    if (e instanceof TypeError) {
      dispatch({
        type: API_FETCH_FAILED,
      });
    }
  }
};
