import * as actionType from "../actionType/index";
import { all, put, call, takeLatest } from "redux-saga/effects";

export function* showLoader() {
  yield put({
    type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
    payload: true,
  });
};

export function* hideLoader() {
  yield put({
    type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY,
    payload: false,
  });
};

export function* showToaster(payload) {
  yield put({
    type: actionType.SHOW_TOASTER,
    payload: payload,
  });
};
