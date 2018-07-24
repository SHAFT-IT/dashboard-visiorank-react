import { FETCH_DEMANDE_DETAIL, FETCH_DEMANDE_DETAIL_SUCCESS, FETCH_DEMANDE_DETAIL_FAILURE } from "../types/demandes.types";

const initialState = {
    demandDetailResponse: {},
    demandDetailLoading: false,
    demandDetailError: null
  };
  
export default function demandeDetailReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_DEMANDE_DETAIL :
        return {
          ...state,
          demandDetailLoading: true,
          demandDetailError: null
        };
  
      case FETCH_DEMANDE_DETAIL_SUCCESS :
        return {
          ...state,
          demandDetailLoading: false,
          demandDetailResponse: action.payload.data
        };
  
      case FETCH_DEMANDE_DETAIL_FAILURE :
        return {
          ...state,
          demandDetailLoading: false,
          demandDetailError: action.payload.error,
          demandDetailResponse: {}
        };
      default:
        return state;
    }
}
  