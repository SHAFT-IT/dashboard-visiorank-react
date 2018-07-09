import { CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from "../types/usercreate.type";

export const createUsersBegin = () => ({
    type: CREATE_USER
  });
  
export const createUsersSuccess = usercreate => ({
    type: CREATE_USER_SUCCESS,
    payload: { usercreate }
});

export const createUsersFailure = error => ({
    type: CREATE_USER_FAILURE,
    payload: { error }
});
  
  