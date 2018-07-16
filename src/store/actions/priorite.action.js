import { FETCHING_PRIORITE, FETCHING_PRIORITE_FAILURE, FETCHING_PRIORITE_SUCCESS } from "../types/priorite.type";
import { URL_PRIORITE } from "../../commons/urls";

function fetchPrioriteSuccess(data) {
    return function (dispatch) {
        dispatch({ type: FETCHING_PRIORITE_SUCCESS, payload: data })
    }
}

function fetchPrioriteBegin() {
    return function (dispatch) {
        dispatch({ type: FETCHING_PRIORITE })
    }
}

function fetchPrioriteFailure(error) {
    return function (dispatch) {
      dispatch({ type: FETCHING_PRIORITE_FAILURE, payload: error })
    }
}

export function fetchPriorite() {
    return dispatch => {
        dispatch(fetchPrioriteBegin());
        fetch(`${URL_PRIORITE}`)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchPrioriteSuccess(json));
            })
            .catch(error => dispatch(fetchPrioriteFailure(error)));
    };
}
  