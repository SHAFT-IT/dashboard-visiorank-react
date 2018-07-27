import {
    UPDATE_DEMAND,
    UPDATE_DEMAND_FAILURE,
    UPDATE_DEMAND_SUCCESS,
    UPDATE_DEMAND_RESET
} from "../types/demandes.types";

const initialState = {
    response: null,
    loadingOnUpdateUser: false,
    error: null
};

export default function demandUpdateReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DEMAND:
            return {
                ...state,
                loadingOnUpdateUser: true,
                error: null
            };
        case UPDATE_DEMAND_SUCCESS:
            return {
                ...state,
                loadingOnUpdateUser: true,
                response: action.payload
            };
        case UPDATE_DEMAND_FAILURE:
            return {
                ...state,
                loadingOnUpdateUser: false,
                error: action.payload,
                response: null
            };
        case UPDATE_DEMAND_RESET:
            return {
                ...state,
                loadingOnUpdateUser: false,
                error: null,
                response: null
            };
        default:
            return state;
    }
}
