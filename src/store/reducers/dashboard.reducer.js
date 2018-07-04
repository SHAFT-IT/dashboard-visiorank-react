import { FETCHING_DASHBOARD, FETCHING_DASHBOARD_SUCCESS, FETCHING_DASHBOARD_FAILURE } from '../types/dashboard.type'

const initialState = {
    item: [],
    loading: false,
    error: null
};

export default function dashboardReducers(state = initialState, action) {
    switch(action.type) {
      case FETCHING_DASHBOARD: 
        return {... state, loading: true, error: null}
    case FETCHING_DASHBOARD_FAILURE: 
        return {... state, loading: false, error: action.payload}
    case FETCHING_DASHBOARD_SUCCESS: 
        return {... state, loading: false, error: null, item: action.payload}
    }
    return state;
}