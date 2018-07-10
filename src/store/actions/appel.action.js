import { FETCHING_APPEL, FETCHING_APPEL_SUCCESS, FETCHING_APPEL_FAILURE, UPDATE_APPEL_PERTINANCE, UPDATE_APPEL_PERTINANCE_SUCCESS } from "../types/appel.type";
import { URL_APPEL_LIST, URL_APPEL_PRETINANCE } from "../../commons/urls";
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

export const fetchAppelPertinanceBegin = () => ({
  type: UPDATE_APPEL_PERTINANCE
});

export const fetchAppelPertinanceSuccess = appel => ({
  type: UPDATE_APPEL_PERTINANCE_SUCCESS,
  payload: { appel }
});

export const fetchAppelPertinanceFailure = error => alert(error) || ({
  type: UPDATE_APPEL_PERTINANCE_FAILURE,
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

export function setPertinance (id){
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchAppelPertinanceBegin());
        fetch(`${URL_APPEL_PRETINANCE}${user.mobile_token}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id})
          }
        )
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch (fetchAppels())
          })
          .catch(error => dispatch(fetchAppelPertinanceFailure(error)));
      })
      .catch(error => dispatch(fetchAppelPertinanceFailure(error)))
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}