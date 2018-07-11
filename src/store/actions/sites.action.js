import { FETCHING_SITE, FETCHING_SITE_SUCCESS, FETCHING_SITE_FAILURE } from "../types/sites.type";
import { URL_SITE_LIST } from "../../commons/urls";
import { getData } from "../../commons/preferences";

export const fetchSitesBegin = () => ({
  type: FETCHING_SITE
});

export const fetchSitesSuccess = sites => ({
  type: FETCHING_SITE_SUCCESS,
  payload: { sites }
});

export const fetchSitesFailure = error => ({
  type: FETCHING_SITE_FAILURE,
  payload: { error }
});

export function fetchSites() {
    return dispatch => {
      getData('user')
        .then(user => {
          dispatch(fetchSitesBegin());
          fetch(`${URL_SITE_LIST}${user.mobile_token}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
              console.log('JSON SITES =>', json);
              dispatch(fetchSitesSuccess(json));
            })
            .catch(error => dispatch(fetchSitesFailure(error)));
        })
        .catch(error => dispatch(fetchSitesFailure(error)))
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }