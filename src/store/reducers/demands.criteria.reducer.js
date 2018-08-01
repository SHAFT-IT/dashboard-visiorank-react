import {CRITERIA_DEMAND, CRITERIA_DEMAND_FAILURE, CRITERIA_DEMAND_SUCCESS} from "../types/demandes.types";

const initialState = {
    responseOnFetchingCriteria: null,
    loadingOnFetchingCriteria: false,
    errorOnFetchingCriteria: null
};

export default function criteriaDemandsReducer(state = initialState, action) {
    switch (action.type) {
        case CRITERIA_DEMAND:
            return {
                ...state,
                loadingOnFetchingCriteria: true,
                errorOnFetchingCriteria: null
            };
        case CRITERIA_DEMAND_SUCCESS:
            return {
                ...state,
                loadingOnFetchingCriteria: false,
                responseOnFetchingCriteria: action.payload,
            };
        case CRITERIA_DEMAND_FAILURE:
            return {
                ...state,
                loadingOnFetchingCriteria: false,
                errorOnFetchingCriteria: action.payload,
                responseOnFetchingCriteria: null
            };
        default:
            return state;
    }
}
