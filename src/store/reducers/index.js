import {combineReducers} from 'redux';
import users from './users.reducer';
import login from './login.reducer';
import dashboard from './dashboard.reducer';
import logout from './logout.reducer';
import messages from './message.reducer';
import demandes from './demandes.reducers'
import appels from './appel.reducer'
import campagnes from './campagne.reducer'
import usercreateupdate from './usercreate.reducer'
import sites from './sites.reducer'
import userdelete from './userdelete.reducer'
import status from './status.reducer'
import priorite from './priorite.reducer'
import demandCreate from './demands.create.reducer'
import demandUpdate from './demands.update.reducer'
import demandDetail from './demands.detail.reducer'
import criteria from './demands.criteria.reducer'
import menu from './menu.reducer'
import attachment from './demands.attachment.reducer'

export default combineReducers({
    users,
    login,
    dashboard,
    logout,
    messages,
    demandes,
    appels,
    campagnes,
    usercreateupdate,
    demandCreate,
    demandUpdate,
    sites,
    userdelete,
    status,
    priorite,
    demandDetail,
    menu,
    attachment,
    criteria
});
