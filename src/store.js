import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default () => {
  const middleware = [thunkMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }
  return createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );
};
