import { FETCHING_STATUS, FETCHING_STATUS_FAILURE, FETCHING_STATUS_SUCCESS } from "../types/status.type";
import { URL_STATUS } from "../../commons/urls";

function fetchStatusSuccess(data) {
    return function (dispatch) {
        dispatch({ type: FETCHING_STATUS_SUCCESS, payload: data })
    }
}

function fetchStatusBegin() {
    return function (dispatch) {
        dispatch({ type: FETCHING_STATUS })
    }
}

function fetchStatusFailure(error) {
    return function (dispatch) {
      dispatch({ type: FETCHING_STATUS_FAILURE, payload: error })
    }
}
  
export function fetchStatus() {
    return dispatch => {
        dispatch(fetchStatusBegin());
        fetch(`${URL_STATUS}`)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchStatusSuccess(json));
        })
        .catch(error => dispatch(fetchStatusFailure(error)));
    };
}
  