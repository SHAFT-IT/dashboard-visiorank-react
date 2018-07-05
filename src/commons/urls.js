const ENVIRONMENT = 'PREPROD'
const BASE_URL = ENVIRONMENT === 'PREPROD' ? 'http://minceurdunaturel.fr/public' : 'http://dashboard.visiorank.net'

export const URL_USER_LIST = `${BASE_URL}/api/ws_get_all_user`;
export const URL_LOGIN = `${BASE_URL}/api/ws_login`;
export const URL_LOGOUT = `${BASE_URL}/api/ws_logout`;
export const URL_DASHBOARD = `${BASE_URL}/api/ws_get_data_dashboard/`;
export const URL_MESSAGE_LIST = `${BASE_URL}/api/ws_get_messages`;
