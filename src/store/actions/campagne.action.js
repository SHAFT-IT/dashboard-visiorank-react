import { FETCHING_CAMPAGNE, FETCHING_CAMPAGNE_SUCCESS, FETCHING_CAMPAGNE_FAILURE } from "../types/campagne.type";
import { URL_CAMPAGNE } from "../../commons/urls";
import { getData } from "../../commons/preferences";

export const fetchCampagneBegin = () => ({
    type: FETCHING_CAMPAGNE
});

export const fetchCampagneSuccess = campagnes => ({
    type: FETCHING_CAMPAGNE_SUCCESS,
    payload: { campagnes }
});

export const fetchCampagneFailure = error => ({
    type: FETCHING_CAMPAGNE_FAILURE,
    payload: { error }
});
  
export function fetchCampagnes() {
    return dispatch => {
      getData('user')
        .then(user => {
          dispatch(fetchCampagneBegin());
          fetch(`${URL_CAMPAGNE}${user.mobile_token}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
              console.log('JSON CAMPAGNE =>', json);
              dispatch(fetchCampagneSuccess(json));
            })
            .catch(error => dispatch(fetchCampagneFailure(error)));
        })
        .catch(error => dispatch(fetchCampagneFailure(error)))
    };
}
  
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}