import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') middleware.push(logger);

export default () => createStore(rootReducer, applyMiddleware(...middleware));
