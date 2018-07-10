import { combineReducers } from 'redux';
import users from './users.reducer';
import login from './login.reducer';
import dashboard from './dashboard.reducer';
import logout from './logout.reducer';
import messages from './message.reducer';
import demandes from '../demandes/demandes.reducers'
import appels from './appel.reducer'
import campagnes from './campagne.reducer'
import usercreateupdate from './usercreate.reducer'

export default combineReducers({
  users,
  login,
  dashboard,
  logout,
  messages,
  demandes,
  appels,
  campagnes,
  usercreateupdate
});
