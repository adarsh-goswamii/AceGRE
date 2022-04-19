import { combineReducers } from 'redux';
import common from "./common";
import auth from "./auth";
import explore from "./explore";

const rootReducer= combineReducers({
  common, 
  auth,
  explore,
});

export default rootReducer;