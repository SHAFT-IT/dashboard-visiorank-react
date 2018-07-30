import { DELETE_ATTACHMENT, DELETE_ATTACHMENT_SUCCESS, DELETE_ATTACHMENT_FAILURE, DELETE_ATTACHMENT_RESET } from "../types/demandes.types";

const initialState = {
    response: null,
    loading: false,
    error: null
};

export default function deleteAttachmentReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_ATTACHMENT:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_ATTACHMENT_SUCCESS:
            return {
                ...state,
                loading: true,
                response: action.payload
            };
        case DELETE_ATTACHMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                response: null
            };
        case DELETE_ATTACHMENT_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                response: null
            };
        default:
            return state;
    }
}