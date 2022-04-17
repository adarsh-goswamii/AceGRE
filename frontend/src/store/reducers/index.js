import { combineReducers } from 'redux';
import common from "./common";
import auth from "./auth";

const rootReducer= combineReducers({
  common, 
  auth,
});

export default rootReducer;