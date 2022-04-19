import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { exploreSaga } from "./explore";

export default function* rootSaga() {
  yield all([
    authSaga(),
    exploreSaga(),
  ])
};
