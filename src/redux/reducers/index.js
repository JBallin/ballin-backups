import { combineReducers } from 'redux';
import auth from './auth.reducers';
import signup from './signup.reducers';
import api from './api.reducers';

const rootReducer = combineReducers({
  auth,
  signup,
  api,
});

export default rootReducer;
