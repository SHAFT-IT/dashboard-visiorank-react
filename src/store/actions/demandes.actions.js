import { URL_DEMANDES } from '../../commons/urls'
import { FETCH_DEMANDES, 
  FETCH_DEMANDES_SUCCESS, 
  FETCH_DEMANDES_FAILURE, 
  DELETE_DEMANDE, 
  DELETE_DEMANDE_FAILURE, 
  DELETE_DEMANDE_SUCCESS, 
  CHANGE_STATUS_DEMANDE, 
  CHANGE_STATUS_DEMANDE_SUCCESS, 
  CHANGE_STATUS_DEMANDE_FAILURE,
  CHANGE_CURRENT_DEMANDE, 
  CHANGE_PRIORITE_DEMANDE,
  CHANGE_PRIORITE_DEMANDE_SUCCESS,
  CHANGE_PRIORITE_DEMANDE_FAILURE
} from '../types/demandes.types'
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

function deleteDemandeBegin() {
  return function (dispatch) {
    dispatch({ type: DELETE_DEMANDE })
  }
}

function deleteDemandeSuccess(data) {
  return function (dispatch) {
    dispatch({ type: DELETE_DEMANDE_SUCCESS, payload: data })
  }
}

function deleteDemandeFailure(error) {
  return function (dispatch) {
    dispatch({ type: DELETE_DEMANDE_FAILURE, payload: error })
  }
}

function changeStatusDemandeBegin() {
  return function (dispatch) {
    dispatch({ type: CHANGE_STATUS_DEMANDE })
  }
}

function changeStatusDemandeSuccess(data) {
  return function (dispatch) {
    dispatch({ type: CHANGE_STATUS_DEMANDE_SUCCESS, payload: data })
  }
}

function changeStatusDemandeFailure(error) {
  return function (dispatch) {
    dispatch({ type: CHANGE_STATUS_DEMANDE_FAILURE, payload: error })
  }
}

export function changeCurrentDemande(demande) {
  return function (dispatch) {
    dispatch({ type: CHANGE_CURRENT_DEMANDE, payload: demande })
  }
}

function changePriorityDemandeBegin() {
  return function (dispatch) {
    dispatch({ type: CHANGE_PRIORITE_DEMANDE })
  }
}

function changePriorityDemandeSuccess(data) {
  return function (dispatch) {
    dispatch({ type: CHANGE_PRIORITE_DEMANDE_SUCCESS, payload: data })
  }
}

function changePriorityDemandeFailure(error) {
  return function (dispatch) {
    dispatch({ type: CHANGE_PRIORITE_DEMANDE_FAILURE, payload: error })
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

export function deleteDemande(id) {
  return dispatch => {
      getData('user')
      .then(user => {
          dispatch(deleteDemandeBegin());
          fetch(`${URL_DEMANDES}${user.mobile_token}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ticketId: id})
          })
          .then((res) => res.json())
          .then(json => {
              dispatch(fetchDemandes());
          })
          .catch((e) => {
              dispatch(deleteDemandeFailure(e));
          });
      })
      .catch(error => console.log('cannot get user preference'))
  };
}

export function changeStatusDemande(statusId, ticketId) {
  return dispatch => {
    getData('user')
    .then(user => {
        dispatch(changeStatusDemandeBegin());
        fetch(`${URL_DEMANDES}${user.mobile_token}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({statusId: statusId, ticketId: ticketId})
        })
        .then((res) => res.json())
        .then(json => {
            dispatch(fetchDemandes());
        })
        .catch((e) => {
            dispatch(changeStatusDemandeFailure(e));
        });
    })
    .catch(error => console.log('cannot get user preference'))
  };
}

export function changePriorityDemande(priorityId, ticketId) {
  return dispatch => {
    getData('user')
    .then(user => {
        dispatch(changePriorityDemandeBegin());
        fetch(`${URL_DEMANDES}${user.mobile_token}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({priorityId: priorityId, ticketId: ticketId})
        })
        .then((res) => res.json())
        .then(json => {
            dispatch(fetchDemandes());
        })
        .catch((e) => {
            dispatch(changePriorityDemandeFailure(e));
        });
    })
    .catch(error => console.log('cannot get user preference'))
  };
}

