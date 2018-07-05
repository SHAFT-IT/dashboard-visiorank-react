import { FETCHING_MESSAGE, FETCHING_MESSAGE_SUCCESS, FETCHING_MESSAGE_FAILURE } from "../types/message.type";
import { URL_MESSAGE_LIST } from "../../commons/urls";


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

export function fetchMessages(token) {
  return dispatch => {
    dispatch(fetchMessageBegin());
    return fetch(`${URL_MESSAGE_LIST}${token}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMessageSuccess(json));
      })
      .catch(error => dispatch(fetchMessageFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}