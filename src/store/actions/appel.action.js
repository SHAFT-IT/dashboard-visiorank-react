import { FETCHING_APPEL, FETCHING_APPEL_SUCCESS, FETCHING_APPEL_FAILURE } from "../types/appel.type";
import { URL_APPEL_LIST } from "../../commons/urls";
import { getData } from "../../commons/preferences";


export const fetchAppelBegin = () => ({
  type: FETCHING_APPEL
});

export const fetchAppelSuccess = appels => ({
  type: FETCHING_APPEL_SUCCESS,
  payload: { appels }
});

export const fetchAppelFailure = error => ({
  type: FETCHING_APPEL_FAILURE,
  payload: { error }
});

export function fetchAppels() {
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchAppelBegin());
        fetch(`${URL_APPEL_LIST}${user.mobile_token}`)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchAppelSuccess(json));
          })
          .catch(error => dispatch(fetchAppelFailure(error)));
      })
      .catch(error => dispatch(fetchAppelFailure(error)))
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}