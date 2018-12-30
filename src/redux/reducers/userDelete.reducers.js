import {
  USER_DELETE_PENDING,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
} from '../actions/userDelete.actions';

import { CLEAR_EDIT_ERRORS } from '../actions/userUpdate.actions';

const initialState = {
  isLoading: false,
  showDeleteError: false,
  errorMessage: '',
  isUserDeleted: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case CLEAR_EDIT_ERRORS:
      return {
        ...state, errorMessage: '', showDeleteError: false,
      };
    case USER_DELETE_PENDING:
      return {
        ...state, isLoading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state, isLoading: false, errorMessage: '', isUserDeleted: true,
      };
    case USER_DELETE_FAILED:
      return {
        ...state, isLoading: false, errorMessage: action.payload, showDeleteError: true,
      };
    default:
      return state;
  }
};
