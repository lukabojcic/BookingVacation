import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import vacation from './vacation';

export default combineReducers({
  alert,
  auth,
  profile,
  vacation
});
