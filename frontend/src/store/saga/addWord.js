import * as actionType from "../actionType/index";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis/addWord";
import { showLoader, hideLoader, showToaster } from "./common";
import {
  SOMETHING_WENT_WRONG,
  WORD_ADDED_SUCCESSFULLY,
} from "../../constants/toastMessage.const";

function* handleAddWord(action) {
  try {
    const payload = action.payload;
    yield* showLoader();
    const results = yield call(api.addWord, payload);
    yield put({
      type: actionType.ADD_WORD_SUCCESSFULL, 
      payload: results
    });
    yield* showToaster({
      status: "success",
      message: WORD_ADDED_SUCCESSFULLY,
    });
    yield* hideLoader();
  } catch (error) {
    yield* hideLoader();
    yield* showToaster({
      status: "error",
      message: SOMETHING_WENT_WRONG,
    });
  }
}

function* addWordWatcher() {
  yield takeLatest(actionType.ADD_WORD, handleAddWord);
}

export function* addWordSaga() {
  yield all([addWordWatcher()]);
}