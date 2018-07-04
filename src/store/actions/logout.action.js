import { FETCHING_LOGOUT, FETCHING_LOGOUT_SUCCESS, FETCHING_LOGOUT_FAILURE } from "../types/logout.type";
import { URL_LOGOUT } from "../../commons/urls";
import { deleteUser } from "./login.action";

export const fetchLogoutBegin = () => ({
    type: FETCHING_LOGOUT
});

export const fetchLogoutSuccess = logout => ({
    type: FETCHING_LOGOUT_SUCCESS,
    payload: logout
});
  
export const fetchLogoutFailure = error => ({
    type: FETCHING_LOGOUT_FAILURE,
    payload: error
});

export function logout(token) {
    return dispatch => {
      dispatch(fetchLogoutBegin());
      return fetch(URL_LOGOUT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token})
        })
        .then((res) => res.json())
        .then(json => {
            dispatch(deleteUser())
            dispatch(fetchLogoutSuccess(json));
        })
        .catch((e) => {
            dispatch(fetchLogoutFailure(e));
        });
    };
}