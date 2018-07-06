import { FETCHING_APPEL, FETCHING_APPEL_SUCCESS, FETCHING_APPEL_FAILURE } from "../types/appel.type";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function appelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_APPEL :
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCHING_APPEL_SUCCESS :
      return {
        ...state,
        loading: false,
        items: action.payload.appels
      };

    case FETCHING_APPEL_FAILURE :
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
