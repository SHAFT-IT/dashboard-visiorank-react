import { combineReducers } from 'redux';
import users from './users.reducer';
import login from './login.reducer';
import dashboard from './dashboard.reducer';

export default combineReducers({
    users,
    login,
    dashboard
});
