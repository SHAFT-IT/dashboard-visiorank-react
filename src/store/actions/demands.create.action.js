import {CREATE_DEMAND, CREATE_DEMAND_FAILURE, CREATE_DEMAND_SUCCESS, CREATE_DEMAND_RESET} from "../types/demandes.types";
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

export function createDemandReset(){
    return function (dispatch) {
        dispatch({type: CREATE_DEMAND_RESET})
    }
}

export function createDemand(demand) {
    const data = new FormData();
    data.append('titre', demand.titre)
    data.append('description', demand.description)
    data.append('priorityId', demand.priorityId)
    data.append('userId', demand.userId)
    data.append('type', demand.type)

    const files = demand.uploads;
    files.forEach((file) => {
            data.append('uploads[]', {
            uri: file.uri,
            type: file.type, 
            name: file.fileName
        });  
    });
    
    return dispatch => {
        getData('user')
            .then(user => {
                dispatch(createDemandBegin());
                fetch(`${URL_DEMAND_CREATE}${user.mobile_token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    },
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
