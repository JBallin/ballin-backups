import { combineReducers } from 'redux';
import auth from './auth.reducers';
import signup from './signup.reducers';
import api from './api.reducers';
import userUpdate from './userUpdate.reducers';
import userDelete from './userDelete.reducers';

const rootReducer = combineReducers({
  auth,
  signup,
  api,
  userUpdate,
  userDelete,
});

export default rootReducer;
