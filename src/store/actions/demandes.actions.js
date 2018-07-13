import { URL_DEMANDES } from '../../commons/urls'
import { FETCH_DEMANDES, FETCH_DEMANDES_SUCCESS, FETCH_DEMANDES_FAILURE } from '../types/demandes.types'
import { getData } from "../../commons/preferences";

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
    dispatch({ type: FETCH_DEMANDES_FAILURE, payload: error })
  }
}

export function fetchDemandes() {
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchDemandesBegin());
        fetch(`${URL_DEMANDES}${user.mobile_token}`)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchDemandesSuccess(json.tickets));
          })
          .catch(error => dispatch(fetchDemandesFailure(error)));
      })
      .catch(error => dispatch(fetchDemandesFailure(error)))
  };
}
