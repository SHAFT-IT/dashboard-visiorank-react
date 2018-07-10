import { URL_DEMANDES } from '../../commons/urls'
import { FETCH_DEMANDES, FETCH_DEMANDES_SUCCESS, FETCH_DEMANDES_FAILURE } from './demandes.types'

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
    dispatch(fetchDemandesBegin())
    fetch(URL_DEMANDES)
      .then(res => res.json())
      .then(json => {
        alert(json)
        dispatch(fetchDemandesSuccess(json))
      })
      .catch(error => alert(error) || dispatch(fetchDemandesFailure(error)))
  }
}
