import { combineReducers } from "redux";
import common from "./common";
import auth from "./auth";
import explore from "./explore";
import quiz from "./quiz";
import addWord from "./addWord";

const rootReducer = combineReducers({
  common,
  auth,
  explore,
  quiz,
  addWord,
});

export default rootReducer;
