import { FETCHING_STATUS, FETCHING_STATUS_FAILURE, FETCHING_STATUS_SUCCESS } from "../types/status.type";

const initialState = {
  items: [],
  loading: false,
  error: null
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_STATUS:
      return { ...state, loading: true }
    case FETCHING_STATUS_SUCCESS:
      return { ...state, loading: false, items: payload }
    case FETCHING_STATUS_FAILURE:
      return { ...state, loading: false, error: payload }
    default :
      return state
  }
}
