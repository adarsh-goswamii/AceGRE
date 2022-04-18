import * as actionType from "../actionType/index";
import { all, put, call, takeLatest } from "redux-saga/effects";
import * as api from "../../apis/explore";

function* getWordList(action) {
  try {
    const payload = action.payload;
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: true
    });
    const results = yield call(api.getWordList, payload);
    yield put({
      type: actionType.GET_WORD_LIST_SUCCESS, 
      payload: results
    });
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: false 
    });
  } catch(error) {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: false
    });
    yield put({
      type: actionType.GET_WORD_LIST_FAILURE, 
      payload: error.response.data
    });
  }
}

function* getWordListWatcher() {
  yield takeLatest(actionType.GET_WORD_LIST, getWordList);
}

export function* exploreSaga() {
  yield all([
    getWordListWatcher(), 
    // updateWordStatusWatcher(),
  ]);
};