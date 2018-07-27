import {MENU_CHANGED} from "../types/menu.type";

const initialState = {
    selectedMenuIndex: 0
};

export default function onMenuChangedReducer(state = initialState, action) {
    switch (action.type) {
        case MENU_CHANGED:
            return {
                ...state,
                selectedMenuIndex: action.payload
            };
        default:
            return state;
    }
}
