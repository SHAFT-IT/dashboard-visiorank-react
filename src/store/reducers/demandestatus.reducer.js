import {CHANGE_STATUS_DEMANDE, CHANGE_STATUS_DEMANDE_SUCCESS, CHANGE_STATUS_DEMANDE_FAILURE} from "../types/demandes.types";

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_STATUS_DEMANDE:
      return { ...state, loading: true }
    case CHANGE_STATUS_DEMANDE_SUCCESS:
      return { ...state, loading: false, items: payload }
    case CHANGE_STATUS_DEMANDE_FAILURE:
      return { ...state, loading: false, error: payload }
    default :
      return state
  }
}