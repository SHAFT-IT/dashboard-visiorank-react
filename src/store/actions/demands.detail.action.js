import {getData} from "../../commons/preferences";
import {URL_DEMANDES} from "../../commons/urls";
import { FETCH_DEMANDE_DETAIL, FETCH_DEMANDE_DETAIL_SUCCESS, FETCH_DEMANDE_DETAIL_FAILURE } from "../types/demandes.types";

function fetchDemandDetailBegin() {
    return function (dispatch) {
        dispatch({type: FETCH_DEMANDE_DETAIL})
    }
}

function fetchDemandDetailSuccess(data) {
    return function (dispatch) {
        dispatch({type: FETCH_DEMANDE_DETAIL_SUCCESS, payload: {data} })
    }
}

function fetchDemandDetailFailure(error) {
    return function (dispatch) {
        dispatch({type: FETCH_DEMANDE_DETAIL_FAILURE, payload: {error} })
    }
}

export function fetchDemandDetail(ticketId) {
    return dispatch => {
      getData('user')
        .then(user => {
          dispatch(fetchDemandDetailBegin());
          fetch(`${URL_DEMANDES}${user.mobile_token}/${ticketId}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
              console.log('JSON DEMAND DETAIL =>', json);
              dispatch(fetchDemandDetailSuccess(json));
            })
            .catch(error => dispatch(fetchDemandDetailFailure(error)));
        })
        .catch(error => console.log('cannot get user'))
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}

