import { FETCH_DEMANDES, FETCH_DEMANDES_FAILURE, FETCH_DEMANDES_SUCCESS,  CHANGE_CURRENT_DEMANDE} from "../types/demandes.types";

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
    default :
      return state
  }
}
