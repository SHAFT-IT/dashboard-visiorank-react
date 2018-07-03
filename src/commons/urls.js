const ENVIRONMENT = 'PREPROD'
const BASE_URL = ENVIRONMENT === 'PREPROD' ? 'http://minceurdunaturel.fr/public' : 'http://dashboard.visiorank.net'

export const URL_USER_LIST = `${BASE_URL}/api/ws_get_all_user`;
export const URL_LOGIN = `${BASE_URL}/api/ws_login`;
