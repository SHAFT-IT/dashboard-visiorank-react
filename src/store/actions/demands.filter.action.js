import {
    CRITERIA_DEMAND,
    CRITERIA_DEMAND_FAILURE,
    CRITERIA_DEMAND_FILTER,
    CRITERIA_DEMAND_SUCCESS,
} from "../types/demandes.types";
import {URL_CRITERIA} from "../../commons/urls";

function criteriaDemandsBegin() {
    return function (dispatch) {
        dispatch({type: CRITERIA_DEMAND})
    }
}

function criteriaDemandsSuccess(criteriaDemandsSuccess) {
    return function (dispatch) {
        dispatch({type: CRITERIA_DEMAND_SUCCESS, payload: criteriaDemandsSuccess})
    }
}

function criteriaDemandsFailure(criteriaDemandsFailure) {
    return function (dispatch) {
        dispatch({type: CRITERIA_DEMAND_FAILURE, payload: criteriaDemandsFailure})
    }
}

export function fetchCriteria() {
    return dispatch => {
        dispatch(criteriaDemandsBegin());
        fetch(`${URL_CRITERIA}`)
            .then(res => res.json())
            .then(json => {
                dispatch(criteriaDemandsSuccess(json));
            })
            .catch(error => dispatch(criteriaDemandsFailure(error)));
    };
}

export function onDemandsFiltered(demands) {
    return dispatch => {
        dispatch({
            type: CRITERIA_DEMAND_FILTER,
            payload: demands
        })
    }
}