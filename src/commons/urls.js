const ENVIRONMENT = 'PREPROD'
const BASE_URL = ENVIRONMENT === 'PREPROD' ? 'http://minceurdunaturel.fr/public' : 'http://dashboard.visiorank.net'

export const URL_USER_LIST = `${BASE_URL}/api/ws_get_all_user`;
export const URL_LOGIN = `${BASE_URL}/api/ws_login`;
export const URL_LOGOUT = `${BASE_URL}/api/ws_logout`;
export const URL_DASHBOARD = `${BASE_URL}/api/ws_get_data_dashboard/`;
export const URL_MESSAGE_LIST = `${BASE_URL}/api/ws_get_messages/`;
export const URL_MESSAGE_DETAIL = `${BASE_URL}/api/ws_details_message/`;
export const URL_DEMANDES = `${BASE_URL}/api/ws_get_all_user`;
export const URL_APPEL_LIST = `${BASE_URL}/api/ws_get_calls/`;
export const URL_APPEL_PRETINANCE = `${BASE_URL}/api/ws_update_call/`;
export const URL_CAMPAGNE = `${BASE_URL}/api/ws_get_stats/`;
export const URL_USERS = `${BASE_URL}/api/ws_get_users/`;
export const URL_USER_CREATE_UPDATE = `${BASE_URL}/api/ws_save_user/`;

