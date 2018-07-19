import {
    UPDATE_DEMAND,
    UPDATE_DEMAND_FAILURE,
    UPDATE_DEMAND_SUCCESS
} from "../types/demandes.types";
import {getData} from "../../commons/preferences";
import {URL_DEMAND_EDIT} from "../../commons/urls";

function updateDemandBegin() {
    return function (dispatch) {
        dispatch({type: UPDATE_DEMAND})
    }
}

function updateDemandSuccess(onUpdateDemandSuccess) {
    return function (dispatch) {
        dispatch({type: UPDATE_DEMAND_SUCCESS, payload: onUpdateDemandSuccess})
    }
}

function updateDemandFailure(onUpdateDemandError) {
    return function (dispatch) {
        dispatch({type: UPDATE_DEMAND_FAILURE, payload: onUpdateDemandError})
    }
}

export function updateDemand(demand) {
    const data = new FormData();
    data.append('titre', demand.titre)
    data.append('description', demand.description)
    data.append('priorityId', demand.priorityId)
    data.append('userId', demand.userId)
    data.append('type', demand.type)
    data.append('ticketId', demand.ticketId)
    /*
    data.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: 'testPhotoName'
    });*/
    return dispatch => {
        getData('user')
            .then(user => {
                dispatch(updateDemandBegin());
                fetch(`${URL_DEMAND_EDIT}${user.mobile_token}`, {
                    method: 'POST',
                    body: data
                })
                    .then((res) => res.json())
                    .then(json => {
                        dispatch(updateDemandSuccess(json));
                    })
                    .catch((e) => {
                        dispatch(updateDemandFailure(e));
                    });
            })
            .catch(error => console.log(error))
    };
}
