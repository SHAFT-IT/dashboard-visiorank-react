import { FETCHING_MESSAGE, FETCHING_MESSAGE_SUCCESS, FETCHING_MESSAGE_FAILURE } from "../types/message.type";
import { URL_MESSAGE_LIST } from "../../commons/urls";
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

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}