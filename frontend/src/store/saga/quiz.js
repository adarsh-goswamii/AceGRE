import * as actionType from "../actionType/index";
import { put, call, takeLatest, all } from "redux-saga/effects";
import * as api from "../../apis/quiz";
import { showLoader, hideLoader, showToaster } from "./common";
import {
  SOMETHING_WENT_WRONG,
  QUIZ_SOLUTION_RECORDED_SUCCESSFULLY,
} from "../../constants/toastMessage.const";

function* handleGenerateQuiz(action) {
  try {
    yield* showLoader();
    const results = yield call(api.generateQuiz);
    yield put({
      type: actionType.GENERATE_QUIZ_SUCCESS,
      payload: results?.quiz_id,
    });
    yield* hideLoader();
  } catch (error) {
    yield* hideLoader();
    yield put({
      type: actionType.GENERATE_QUIZ_FAILURE,
      payload: error.response.data,
    });
  }
}

function* handleQuizQuesFetch(action) {
  try {
    const { payload } = action;
    yield* showLoader();
    const results = yield call(api.fetchQuestions, payload);
    yield put({
      type: actionType.GET_QUIZ_QUESTIONS_SUCCESS,
      payload: results?.data,
    });
    yield* hideLoader();
  } catch (error) {
    yield* hideLoader();
    yield put({
      type: actionType.GET_QUIZ_QUESTIONS_FAILURE,
      payload: error.response.data,
    });
  }
}

function* handlePatchSolution(action) {
  try {
    const { payload } = action;
    yield* showLoader();
    const results = yield call(api.patchSolution, payload);
    yield put({
      type: actionType.PATCH_QUIZ_SOLUTION_SUCCESS,
      payload: results,
    });
    yield* hideLoader();
    yield* showToaster({
      status: "success",
      message: QUIZ_SOLUTION_RECORDED_SUCCESSFULLY,
    });
  } catch (error) {
    yield* hideLoader();
    yield put({
      type: actionType.PATCH_QUIZ_SOLUTION_FAILURE,
      payload: error.response.data,
    });
    yield* showToaster({
      status: "error",
      message: SOMETHING_WENT_WRONG,
    });
  }
}

function* handleFetchResults(action) {
  try {
    const { payload } = action;
    yield* showLoader();
    const results = yield call(api.fetchResults, payload);
    yield put({
      type: actionType.GET_QUIZ_RESULTS_SUCCESS,
      payload: results?.data,
    });
    yield* hideLoader();
  } catch (error) {
    yield* hideLoader();
    yield put({
      type: actionType.GET_QUIZ_RESULTS_FAILURE,
      payload: error.response.data,
    });
  }
}

function* handleQuizEnd(action) {
  try {
    const { payload } = action;
    yield* showLoader();
    const results = yield call(api.endQuiz, payload);
    yield put({
      type: actionType.END_QUIZ_SUCCESS,
      payload: results,
    });
    yield* hideLoader();
  } catch (error) {
    yield* hideLoader();
    yield put({
      type: actionType.END_QUIZ_FAILURE,
      payload: error.response.data,
    });
  }
}

function* generateQuizWatcher() {
  yield takeLatest(actionType.GENERATE_QUIZ, handleGenerateQuiz);
}

function* fetchQuizQuestionsWatcher() {
  yield takeLatest(actionType.GET_QUIZ_QUESTIONS, handleQuizQuesFetch);
}

function* patchQuizSolutionWatcher() {
  yield takeLatest(actionType.PATCH_QUIZ_SOLUTION, handlePatchSolution);
}

function* fetchResultsWatcher() {
  yield takeLatest(actionType.GET_QUIZ_RESULTS, handleFetchResults);
}

function* endQuizWatcher() {
  yield takeLatest(actionType.END_QUIZ, handleQuizEnd);
}

export function* quizSaga() {
  yield all([
    generateQuizWatcher(),
    fetchQuizQuestionsWatcher(),
    patchQuizSolutionWatcher(),
    fetchResultsWatcher(),
    endQuizWatcher(),
  ]);
}
