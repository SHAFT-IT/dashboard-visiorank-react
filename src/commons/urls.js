const ENVIRONMENT = 'PREPROD'
const BASE_URL = ENVIRONMENT === 'PREPROD' ? 'http://minceurdunaturel.fr/public' : 'http://dashboard.visiorank.net'

export const URL_USER_LIST = `${BASE_URL}/api/ws_get_all_user`;
export const URL_LOGIN = `${BASE_URL}/api/ws_login`;
export const URL_LOGOUT = `${BASE_URL}/api/ws_logout`;
export const URL_DASHBOARD = `${BASE_URL}/api/ws_get_data_dashboard/`;
export const URL_MESSAGE_LIST = `${BASE_URL}/api/ws_get_messages/`;
export const URL_MESSAGE_DETAIL = `${BASE_URL}/api/ws_details_message/`;
export const URL_DEMANDES = `${BASE_URL}/api/ws_demandes/`;
export const URL_DEMAND_CREATE = `${URL_DEMANDES}create/`;
export const URL_DEMAND_EDIT = `${URL_DEMANDES}edit/`;
export const URL_APPEL_LIST = `${BASE_URL}/api/ws_get_calls/`;
export const URL_APPEL_PRETINANCE = `${BASE_URL}/api/ws_update_call/`;
export const URL_CAMPAGNE = `${BASE_URL}/api/ws_get_stats/`;
export const URL_USERS = `${BASE_URL}/api/ws_get_users/`;
export const URL_USER_CREATE_UPDATE = `${BASE_URL}/api/ws_save_user/`;
export const URL_SITE_LIST = `${BASE_URL}/api/ws_get_sites/`;
export const URL_USER_DELETE = `${BASE_URL}/api/ws_delete_user/`;
export const URL_STATUS = `${BASE_URL}/api/ws_status_list`;
export const URL_PRIORITE = `${BASE_URL}/api/ws_priorities_list`;
export const URL_DEMANDE_UPDATE_PRIORITY = `${BASE_URL}/api/ws_update_priority/`;