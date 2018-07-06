import { FETCHING_DASHBOARD, FETCHING_DASHBOARD_SUCCESS, FETCHING_DASHBOARD_FAILURE } from '../types/dashboard.type'
import { URL_DASHBOARD } from "../../commons/urls";
import { getData } from "../../commons/preferences";

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

export function fetchDashboard() {
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchMessageBegin());
        fetch(`${URL_DASHBOARD}${user.mobile_token}`)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchMessageSuccess(json));
          })
          .catch(error => dispatch(fetchMessageFailure(error)));
      })
      .catch(error => dispatch(fetchMessageFailure(error)))
  };    
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}