import * as actionType from "../actionType/index";

export const generateQuiz = () => {
  return {
    type: actionType.GENERATE_QUIZ,
  };
};

export const fetchQuestions = (payload) => {
  return {
    type: actionType.GET_QUIZ_QUESTIONS,
    payload: payload,
  };
};

export const patchSolution = (payload) => {
  return {
    type: actionType.PATCH_QUIZ_SOLUTION,
    payload: payload,
  };
};

export const fetchResults = (payload) => {
  return {
    type: actionType.GET_QUIZ_RESULTS,
    payload: payload,
  };
};

export const endQuiz = (payload) => {
  return {
    type: actionType.END_QUIZ,
    payload: payload,
  };
};
