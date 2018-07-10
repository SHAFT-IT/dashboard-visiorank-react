import { FETCHING_MESSAGE, FETCHING_MESSAGE_SUCCESS, FETCHING_MESSAGE_FAILURE, FETCHING_MESSAGE_DETAIL, FETCHING_MESSAGE_DETAIL_SUCCESS, FETCHING_MESSAGE_DETAIL_FAILURE } from "../types/message.type";
import { URL_MESSAGE_LIST, URL_MESSAGE_DETAIL } from "../../commons/urls";
import { getData } from "../../commons/preferences";

export const fetchMessageBegin = () => ({
  type: FETCHING_MESSAGE
});

export const fetchMessageSuccess = messages => ({
  type: FETCHING_MESSAGE_SUCCESS,
  payload: { messages }
});

export const fetchMessageFailure = error => ({
  type: FETCHING_MESSAGE_FAILURE,
  payload: { error }
});

export const fetchMessageDetailBegin = () => ({
  type: FETCHING_MESSAGE_DETAIL
});

export const fetchMessageDetailSuccess = message => ({
  type: FETCHING_MESSAGE_DETAIL_SUCCESS,
  payload: { message }
});

export const fetchMessageDetailFailure = error => ({
  type: FETCHING_MESSAGE_DETAIL_FAILURE,
  payload: { error }
});

export function fetchMessages() {
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchMessageBegin());
        fetch(`${URL_MESSAGE_LIST}${user.mobile_token}`)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchMessageSuccess(json));
          })
          .catch(error => dispatch(fetchMessageFailure(error)));
      })
      .catch(error => dispatch(fetchMessageFailure(error)))
  };
}

export function detailMessage (id){
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchMessageDetailBegin());
        fetch(`${URL_MESSAGE_DETAIL}${user.mobile_token}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id})
          }
        )
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch (fetchMessageDetailSuccess(json))
          })
          .catch(error => dispatch(fetchMessageDetailFailure(error)));
      })
      .catch(error => dispatch(fetchMessageDetailFailure(error)))
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}