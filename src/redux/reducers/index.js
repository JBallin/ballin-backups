import { combineReducers } from 'redux';
import auth from './auth.reducers';
import signup from './signup.reducers';
import api from './api.reducers';
import userUpdate from './userUpdate.reducers';
import userDelete from './userDelete.reducers';

const appReducer = combineReducers({
  auth,
  signup,
  api,
  userUpdate,
  userDelete,
});

const rootReducer = (state, action) => {
  let updatedState = state;
  if (action.type === 'USER_LOGOUT_SUCCESS') {
    updatedState = undefined;
  }

  return appReducer(updatedState, action);
};

export default rootReducer;
