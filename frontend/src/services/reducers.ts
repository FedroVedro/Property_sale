import { combineReducers } from 'redux';
import { userReducer } from './User/reducer';
import { propertiesReducer } from './Properties/reducer';
import { banksReducer } from './Banks/reducer';
import { requestsReducer } from './Requests/reducer';

export const rootReducer = combineReducers({
  userReducer,
  propertiesReducer,
  banksReducer,
  requestsReducer
});