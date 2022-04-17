import * as actionType from "../actionType/index";
import { put, call, takeLatest, all } from "redux-saga/effects";
import * as api from "../../apis/auth";
import Cookies from "js-cookie";
function* handleUserRegister(action) {
  let payload= action.payload;
  try {
    const results = yield call(api.register, payload);
    localStorage.setItem("email", results?.data?.email);
    localStorage.setItem("role", results?.data?.role);
    localStorage.setItem("token", results?.data?.token);
    Cookies.set("refresh_token", results?.data?.refresh_token);
    yield put({
      type: actionType.REGISTER_USER_SUCCESS, 
      payload: results.data
    });
  } catch (error) {
    yield put({
      type: actionType.REGISTER_USER_FAILURE, 
      payload: error.response.data
    });
  }
}

function* handleUserLogin(action) {
  let payload= action.payload;
  try {
    const results = yield call(api.login, payload);
    localStorage.setItem("email", results?.data?.email);
    localStorage.setItem("role", results?.data?.role);
    localStorage.setItem("token", results?.data?.token);
    Cookies.set("refresh_token", results?.data?.refresh_token);
    yield put({
      type: actionType.LOGIN_USER_SUCCESS, 
      payload: results.data
    });
  } catch (error) {
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