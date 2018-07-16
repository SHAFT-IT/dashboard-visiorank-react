import { CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from "../types/usercreate.type";

const initialState = {
  response: {},
  loadingcreateupdate: false,
  error: null
};

export default function userCreateReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loadingcreateupdate: true,
        error: null
      };

    case CREATE_USER_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loadingcreateupdate: false,
        response: action.payload.usercreate
      };

    case CREATE_USER_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loadingcreateupdate: false,
        error: action.payload.error,
        response: {}
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
