import { FETCHING_CAMPAGNE, FETCHING_CAMPAGNE_SUCCESS, FETCHING_CAMPAGNE_FAILURE } from "../types/campagne.type";

const initialState = {
  response: {},
  loading: false,
  error: null
};

export default function campagneReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_CAMPAGNE :
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCHING_CAMPAGNE_SUCCESS :
      return {
        ...state,
        loading: false,
        response: action.payload.campagnes
      };

    case FETCHING_CAMPAGNE_FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        response: {}
      };
    default:
      return state;
  }
}
