import { FETCHING_USER, FETCHING_USER_SUCCESS, FETCHING_USER_FAILURE } from "../types/users.type";
import { URL_USERS } from "../../commons/urls";
import { getData } from "../../commons/preferences";

export const fetchUsersBegin = () => ({
  type: FETCHING_USER
});

export const fetchUsersSuccess = users => ({
  type: FETCHING_USER_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = error => ({
  type: FETCHING_USER_FAILURE,
  payload: { error }
});

export function fetchUsers() {
  return dispatch => {
    getData('user')
      .then(user => {
        dispatch(fetchUsersBegin());
        fetch(`${URL_USERS}${user.mobile_token}`)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            console.log('JSON USER =>', json);
            dispatch(fetchUsersSuccess(json.users));
          })
          .catch(error => dispatch(fetchUsersFailure(error)));
      })
      .catch(error => dispatch(fetchUsersFailure(error)))
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}