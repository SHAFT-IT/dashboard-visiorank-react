import { FETCH_DEMANDES, FETCH_DEMANDES_FAILURE, FETCH_DEMANDES_SUCCESS,  CHANGE_CURRENT_DEMANDE, CHANGE_STATUS_DEMANDE, CHANGE_STATUS_DEMANDE_SUCCESS, CHANGE_STATUS_DEMANDE_FAILURE, CHANGE_PRIORITE_DEMANDE, CHANGE_PRIORITE_DEMANDE_SUCCESS, CHANGE_PRIORITE_DEMANDE_FAILURE} from "../types/demandes.types";

const initialState = {
  items: [],
  loading: false,
  error: null,
  current: {}
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_DEMANDES:
      return { ...state, loading: true }
    case FETCH_DEMANDES_SUCCESS:
      return { ...state, loading: false, items: payload }
    case FETCH_DEMANDES_FAILURE:
      return { ...state, loading: false, error: payload }
    case CHANGE_CURRENT_DEMANDE:
        return { ...state, current: payload }
    case CHANGE_PRIORITE_DEMANDE:
        return { ...state, loading: true }
    case CHANGE_PRIORITE_DEMANDE_FAILURE: 
        return { ...state, loading: false }    
    case CHANGE_PRIORITE_DEMANDE_SUCCESS:
        return { ...state, loading: false, items: payload }        
    case CHANGE_STATUS_DEMANDE:
        return { ...state, loading: true }
    case CHANGE_STATUS_DEMANDE_FAILURE: 
        return { ...state, loading: false }    
    case CHANGE_STATUS_DEMANDE_SUCCESS:
        return { ...state, loading: false, items: payload }        
    default :
      return state
  }
}