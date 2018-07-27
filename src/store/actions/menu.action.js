import {MENU_CHANGED} from "../types/menu.type";

export function onMenuChanged(selectedMenuIndex) {
    return dispatch => {
        dispatch({
            type: MENU_CHANGED,
            payload: selectedMenuIndex
        })
    }
}
