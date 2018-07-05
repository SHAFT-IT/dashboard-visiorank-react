import { URL_DEMANDES } from "../../commons/urls";
import { FETCH_DEMANDES, FETCH_DEMANDES_SUCCESS } from "./demandes.types";

function fetchDemandesBegin() {
  return function (dispatch) {
    dispatch({ type: FETCH_DEMANDES })
  }
}

function fetchDemandesSuccess(data) {
  return function (dispatch) {
    dispatch({ type: FETCH_DEMANDES_SUCCESS, payload: data })
  }
}

function fetchDemandesFailure(error) {
  return function (dispatch) {
    dispatch({ type: FETCH_DEMANDES_SUCCESS, payload: error })
  }
}

export function fetchDemandes(token) {
  return dispatch => {
    dispatch(fetchDemandesBegin());
    return fetch(`${URL_DEMANDES}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDemandesSuccess(json));
      })
      .catch(error => dispatch(fetchDemandesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}