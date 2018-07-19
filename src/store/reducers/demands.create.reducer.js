import {CREATE_DEMAND, CREATE_DEMAND_FAILURE, CREATE_DEMAND_SUCCESS} from "../types/demandes.types";

const initialState = {
    response: {},
    loadingOnCreateUser: false,
    error: {}
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
                loadingOnCreateUser: false,
                response: action.payload
            };
        case CREATE_DEMAND_FAILURE:
            return {
                ...state,
                loadingOnCreateUser: false,
                error: action.payload,
                response: {}
            };
        default:
            return state;
    }
}
