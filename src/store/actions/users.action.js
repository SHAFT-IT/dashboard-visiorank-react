import { FETCHING_USER, FETCHING_USER_SUCCESS, FETCHING_USER_FAILURE } from "../types/users.type";
import { URL_USER_LIST } from "../../commons/urls";
import { setData } from "../../commons/preferences";

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
      dispatch(fetchUsersBegin());
      return fetch(URL_USER_LIST)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            setData('email', json)
                .then(() => dispatch(fetchUsersSuccess(json)))
                .catch(() => dispatch(fetchUsersSuccess(json)))
        })
        .catch(error => dispatch(fetchUsersFailure(error)));
    };
}
  
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}