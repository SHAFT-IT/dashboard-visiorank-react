import { FETCHING_MESSAGE, FETCHING_MESSAGE_SUCCESS, FETCHING_MESSAGE_FAILURE } from "../types/message.type";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_MESSAGE :
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCHING_MESSAGE_SUCCESS :
      return {
        ...state,
        loading: false,
        items: action.payload.messages
      };

    case FETCHING_MESSAGE_FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    default:
      return state;
  }
}
