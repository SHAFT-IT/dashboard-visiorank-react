import { FETCHING_LOGIN, FETCHING_LOGIN_SUCCESS, FETCHING_LOGIN_FAILURE, DELETE_USER } from '../types/login.type'

const initialState = {
  item: {},
  loading: false,
  error: null
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case FETCHING_LOGIN:
      return { ...state, loading: true, error: null }
    case FETCHING_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case FETCHING_LOGIN_SUCCESS:
      console.log('REDUCER_LOG', action.payload);
      return { ...state, loading: false, error: null, item: action.payload }
    case DELETE_USER :
      return initialState
  }
  return state;
}