import { FETCHING_MESSAGE, FETCHING_MESSAGE_SUCCESS, FETCHING_MESSAGE_FAILURE, FETCHING_MESSAGE_DETAIL, FETCHING_MESSAGE_DETAIL_SUCCESS, FETCHING_MESSAGE_DETAIL_FAILURE } from "../types/message.type";

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentItem: {}
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
    case FETCHING_MESSAGE_DETAIL :
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCHING_MESSAGE_DETAIL_SUCCESS :
      return {
        ...state,
        loading: false,
        currentItem : action.payload.message
      };

    case FETCHING_MESSAGE_DETAIL_FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };  
    default:
      return state;
  }
}
