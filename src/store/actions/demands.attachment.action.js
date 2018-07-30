import {URL_ATTACHMENT_DELETE} from '../../commons/urls'
import { DELETE_ATTACHMENT, DELETE_ATTACHMENT_SUCCESS, DELETE_ATTACHMENT_FAILURE, DELETE_ATTACHMENT_RESET } from "../types/demandes.types";
import {getData} from "../../commons/preferences";

function deleteAttachmentBegin() {
    return function (dispatch) {
        dispatch({type: DELETE_ATTACHMENT})
    }
}

function deleteAttachmentSuccess(onDeleteAttachmentSuccess) {
    return function (dispatch) {
        dispatch({type: DELETE_ATTACHMENT_SUCCESS, payload: onDeleteAttachmentSuccess})
    }
}

function deleteAttachmentFailure(onDeleteAttachmentError) {
    return function (dispatch) {
        dispatch({type: DELETE_ATTACHMENT_FAILURE, payload: onDeleteAttachmentError})
    }
}

export function deleteAttachmentReset(){
    return function (dispatch) {
        dispatch({type: DELETE_ATTACHMENT_RESET})
    }
}


export function deleteAttachment(filename) {
    const data = new FormData();
    data.append('filename', filename)
    
    return dispatch => {
        getData('user')
            .then(user => {
                dispatch(deleteAttachmentBegin());
                fetch(`${URL_ATTACHMENT_DELETE}${user.mobile_token}`, {
                    method: 'POST',
                    body: data
                })
                    .then((res) => res.json())
                    .then(json => {
                        dispatch(deleteAttachmentSuccess(json));
                    })
                    .catch((e) => {
                        dispatch(deleteAttachmentFailure(e));
                    });
            })
            .catch(error => console.log(error))
    };
}
