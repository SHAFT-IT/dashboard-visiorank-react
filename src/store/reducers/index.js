import { combineReducers } from 'redux';
import users from './users.reducer';
import login from './login.reducer';

export default combineReducers({
    users,
    login
});
