import { FETCHING_LOGOUT, FETCHING_LOGOUT_SUCCESS, FETCHING_LOGOUT_FAILURE } from '../types/logout.type'

const initialState = {
  item: {},
  loading: false,
  logoutSuccess: false
};

export default function logoutReducers(state = initialState, action) {
  switch (action.type) {
    case FETCHING_LOGOUT:
      return { ...state, loading: true }
    case FETCHING_LOGOUT_FAILURE:
      return { ...state, loading: false }
    case FETCHING_LOGOUT_SUCCESS:
      return { ...state, loading: false, logoutSuccess: true }
  }
  return state;
}