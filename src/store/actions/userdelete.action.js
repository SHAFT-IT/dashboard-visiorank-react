import { URL_USER_DELETE } from "../../commons/urls";
import { DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from "../types/userdelete.type";
import { getData } from "../../commons/preferences";

export const deleteUserBegin = () => ({
    type: DELETE_USER
  });
  
export const deleteUserSuccess = userdelete => ({
    type: DELETE_USER_SUCCESS,
    payload: { userdelete }
});

export const deleteUserFailure = error => ({
    type: DELETE_USER_FAILURE,
    payload: { error }
});

export function deleteUser(id) {
    return dispatch => {

        getData('user')
        .then(user => {
            
            dispatch(deleteUserBegin());
            fetch(`${URL_USER_DELETE}${user.mobile_token}`, {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { 
                        id: id,
                    }
                )
            })
            .then((res) => res.json())
            .then(json => {
                console.log(`DELETE USER=======> ${JSON.stringify(json)}`);
                dispatch(deleteUserSuccess(json));
            })
            .catch((e) => {
                // console.warn(e);
                dispatch(deleteUserFailure(e));
            });

        })
        .catch(error => console.log('cannot get user preference'))

    };
}