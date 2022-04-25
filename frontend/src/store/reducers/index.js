import { combineReducers } from 'redux';
import common from "./common";
import auth from "./auth";
import explore from "./explore";
import quiz from "./quiz";

const rootReducer= combineReducers({
  common, 
  auth,
  explore,
  quiz,
});

export default rootReducer;