import { combineReducers } from 'redux';
import auth from './auth.reducers';
import signup from './signup.reducers';

const rootReducer = combineReducers({
  auth,
  signup,
});

export default rootReducer;
