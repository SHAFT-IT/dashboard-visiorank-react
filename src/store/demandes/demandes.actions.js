import { URL_DEMANDES } from '../../commons/urls'
import { FETCH_DEMANDES, FETCH_DEMANDES_SUCCESS, FETCH_DEMANDES_FAILURE } from './demandes.types'
import axios from 'axios';

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

export function fetchDemandes(token) {
  return dispatch => {
    dispatch(fetchDemandesBegin())
    return axios.get(`${URL_DEMANDES}`)
      .then(res => dispatch(fetchDemandesSuccess(res.data)))
      .catch(error => dispatch(fetchDemandesFailure(error)))
  }
}
