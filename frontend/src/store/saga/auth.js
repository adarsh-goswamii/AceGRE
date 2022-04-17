import * as actionType from "../actionType/index";
import { put, call, takeLatest, all } from "redux-saga/effects";
import * as api from "../../apis/auth";
import Cookies from "js-cookie";
import {showLoader} from "../action/common";

function* handleUserRegister(action) {
  let payload= action.payload;
  try {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: true
    });
    const results = yield call(api.register, payload);
    localStorage.setItem("email", results?.data?.email);
    localStorage.setItem("role", results?.data?.role);
    localStorage.setItem("token", results?.data?.token);
    Cookies.set("refresh_token", results?.data?.refresh_token);
    yield put({
      type: actionType.REGISTER_USER_SUCCESS, 
      payload: results.data
    });
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: false
    });
  } catch (error) {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: false
    });
    yield put({
      type: actionType.REGISTER_USER_FAILURE, 
      payload: error.response.data
    });
  }
}

function* handleUserLogin(action) {
  let payload= action.payload;
  try {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: true
    });
    const results = yield call(api.login, payload);
    localStorage.setItem("email", results?.data?.email);
    localStorage.setItem("role", results?.data?.role);
    localStorage.setItem("token", results?.data?.token);
    Cookies.set("refresh_token", results?.data?.refresh_token);
    yield put({
      type: actionType.LOGIN_USER_SUCCESS, 
      payload: results.data
    });
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: false
    });
  } catch (error) {
    yield put({
      type: actionType.CHANGE_GLOBAL_LOADER_VISIBILITY, 
      payload: false
    });
    yield put({
      type: actionType.LOGIN_USER_FAILURE, 
      payload: error.response.data
    });
  }
}

function* loginWatcher() {
  yield takeLatest(actionType.LOGIN_USER, handleUserLogin);
}

function* registerWatcher() {
  yield takeLatest(actionType.REGISTER_USER, handleUserRegister);
}

export function* authSaga() {
  yield all([
    loginWatcher(), 
    registerWatcher(),
  ]);
};