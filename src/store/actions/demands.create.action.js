import {CREATE_DEMAND, CREATE_DEMAND_FAILURE, CREATE_DEMAND_SUCCESS} from "../types/demandes.types";
import {getData} from "../../commons/preferences";
import {URL_DEMAND_CREATE} from "../../commons/urls";

function createDemandBegin() {
    return function (dispatch) {
        dispatch({type: CREATE_DEMAND})
    }
}

function createDemandSuccess(onCreateDemandSuccess) {
    return function (dispatch) {
        dispatch({type: CREATE_DEMAND_SUCCESS, payload: onCreateDemandSuccess})
    }
}

function createDemandFailure(onCreateDemandError) {
    return function (dispatch) {
        dispatch({type: CREATE_DEMAND_FAILURE, payload: onCreateDemandError})
    }
}

export function createDemand(demand) {
    const data = new FormData();
    data.append('titre', demand.titre)
    data.append('description', demand.description)
    data.append('priorityId', demand.priorityId)
    data.append('userId', demand.userId)
    data.append('type', demand.type)
    /*
    data.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: 'testPhotoName'
    });*/
    return dispatch => {
        getData('user')
            .then(user => {
                dispatch(createDemandBegin());
                fetch(`${URL_DEMAND_CREATE}${user.mobile_token}`, {
                    method: 'POST',
                    body: data
                })
                    .then((res) => res.json())
                    .then(json => {
                        dispatch(createDemandSuccess(json));
                    })
                    .catch((e) => {
                        dispatch(createDemandFailure(e));
                    });
            })
            .catch(error => console.log(error))
    };
}
