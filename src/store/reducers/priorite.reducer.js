import { FETCHING_PRIORITE, FETCHING_PRIORITE_FAILURE, FETCHING_PRIORITE_SUCCESS } from "../types/priorite.type";

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_PRIORITE:
      return { ...state, loading: true }
    case FETCHING_PRIORITE_SUCCESS:
      return { ...state, loading: false, items: payload }
    case FETCHING_PRIORITE_FAILURE:
      return { ...state, loading: false, error: payload }
    default :
      return state
  }
}
