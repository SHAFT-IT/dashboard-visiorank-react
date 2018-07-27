import {CREATE_DEMAND, CREATE_DEMAND_FAILURE, CREATE_DEMAND_SUCCESS, CREATE_DEMAND_RESET} from "../types/demandes.types";

const initialState = {
    response: null,
    loadingOnCreateUser: false,
    error: null
};

export default function demandCreateReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_DEMAND:
            return {
                ...state,
                loadingOnCreateUser: true,
                error: null
            };
        case CREATE_DEMAND_SUCCESS:
            return {
                ...state,
                loadingOnCreateUser: true,
                response: action.payload
            };
        case CREATE_DEMAND_FAILURE:
            return {
                ...state,
                loadingOnCreateUser: false,
                error: action.payload,
                response: null
            };
        case CREATE_DEMAND_RESET:
            return {
                ...state,
                loadingOnCreateUser: false,
                error: null,
                response: null
            };
        default:
            return state;
    }
}
