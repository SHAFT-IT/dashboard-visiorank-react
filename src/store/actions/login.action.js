import { FETCHING_LOGIN, FETCHING_LOGIN_SUCCESS, FETCHING_LOGIN_FAILURE, DELETE_USER } from "../types/login.type";
import { URL_LOGIN } from "../../commons/urls";

export const fetchLoginBegin = () => ({
    type: FETCHING_LOGIN
});

export const fetchLoginSuccess = login => ({
    type: FETCHING_LOGIN_SUCCESS,
    payload: login
});
  
export const fetchLoginFailure = error => ({
    type: FETCHING_LOGIN_FAILURE,
    payload: error
});

export const deleteUser = () => ({
    type: DELETE_USER
});

export function authenticate(email, password) {
    return dispatch => {
      dispatch(fetchLoginBegin());
      return fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        })
        .then((res) => res.json())
        .then(json => {
            console.log(json);
            dispatch(fetchLoginSuccess(json.user));
        })
        .catch((e) => {
            // console.warn(e);
            dispatch(fetchLoginFailure(e));
        });
    };
}

/*return fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then((res) => res.json())
            .then(json => {
                dispatch(fetchLoginSuccess(json));
            return json;
            })
            .catch((e) => {
                // console.warn(e);
                dispatch(fetchLoginFailure(e));
            });*/

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
