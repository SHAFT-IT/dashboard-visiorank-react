import { FETCHING_DASHBOARD, FETCHING_DASHBOARD_SUCCESS, FETCHING_DASHBOARD_FAILURE } from '../types/dashboard.type'
import { URL_DASHBOARD } from "../../commons/urls";

export const fetchDashboardBegin = () => ({
  type: FETCHING_DASHBOARD
});

export const fetchDashboardSuccess = dashboard => ({
  type: FETCHING_DASHBOARD_SUCCESS,
  payload: dashboard
});

export const fetchDashboardFailure = error => ({
  type: FETCHING_DASHBOARD_FAILURE,
  payload: error
});

export function fetchDashboard(token) {
  return dispatch => {
    dispatch(fetchDashboardBegin());
    return fetch(`${URL_DASHBOARD}${token}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDashboardSuccess(json));
      })
      .catch(error => dispatch(fetchDashboardFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}