import { FETCHING_LOGOUT, FETCHING_LOGOUT_SUCCESS, FETCHING_LOGOUT_FAILURE } from "../types/logout.type";
import { URL_LOGOUT } from "../../commons/urls";
import { deleteUser } from "./login.action";
import { setData, getData } from "../../commons/preferences";

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

export function logout() {
  
  return dispatch => { 
    getData('user')
        .then(user => {
          console.log('LOGOUT TOKEN=>', user.mobile_token);
          if(user && user.mobile_token){
            dispatch(fetchLogoutBegin());
            fetch(URL_LOGOUT, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: user.mobile_token })
            })
              .then((res) => res.json())
              .then(json => {
                dispatch(deleteUser())
                setData('user', null);
                dispatch(fetchLogoutSuccess(json));
              })
              .catch((e) => {
                dispatch(fetchLogoutFailure(e));
              });
          }else{

            dispatch(deleteUser())
            setData('user', null);
            dispatch(fetchLogoutSuccess(null));            
          }

        })
        .catch(error => {
            console.log('cannot get user preference');
            dispatch(deleteUser())
            setData('user', null);
        })
  };
}