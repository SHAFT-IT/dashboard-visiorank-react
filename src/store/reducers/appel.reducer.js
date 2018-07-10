import { FETCHING_APPEL, FETCHING_APPEL_SUCCESS, FETCHING_APPEL_FAILURE, UPDATE_APPEL_PERTINANCE, UPDATE_APPEL_PERTINANCE_SUCCESS, UPDATE_APPEL_PERTINANCE_FAILURE } from "../types/appel.type";

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentItem:null
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
    case UPDATE_APPEL_PERTINANCE :
      return {
        ...state,
        loading: true
      };
    case UPDATE_APPEL_PERTINANCE_SUCCESS :
      return {
        ...state,
        loading: false,
        error: null,
        currentItem : action.payload.appel
      };  
    case UPDATE_APPEL_PERTINANCE_FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };        
    default:
      return state;
  }
}
