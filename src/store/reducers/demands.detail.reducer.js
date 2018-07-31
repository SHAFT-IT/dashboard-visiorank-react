import { FETCH_DEMANDE_DETAIL, FETCH_DEMANDE_DETAIL_SUCCESS, FETCH_DEMANDE_DETAIL_FAILURE, FETCH_DEMANDE_DETAIL_RESET } from "../types/demandes.types";

const initialState = {
    demandDetailResponse: null,
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
          demandDetailResponse: null
        };

      case FETCH_DEMANDE_DETAIL_RESET :
        return {
          ...state,
          demandDetailLoading: false,
          demandDetailError: null,
          demandDetailResponse: null
        };

      default:
        return state;
    }
}
  