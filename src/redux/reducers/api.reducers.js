export const API_FETCH_FAILED = 'API_FETCH_FAILED';

const initialState = {
  APIFetchFailure: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case API_FETCH_FAILED:
      return { APIFetchFailure: true };
    default:
      return state;
  }
};
