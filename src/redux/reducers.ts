import { combineReducers } from 'redux';
import user from './user';
import stock from './stock/reduce';

export default combineReducers({
  user,
  stock
});
