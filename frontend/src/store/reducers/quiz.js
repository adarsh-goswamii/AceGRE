import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  quizQuestions: null,
  fetchQuizQuesFailure: {},
  patchQuizSolutionFailure: {},
  patchQuizSolutionSuccess: {},
  quizGeneratedId: null,
  quizGenerateFailure: {},
  quizResults: null,
  quizResultsFailure: {},
  endQuizSuccess: null,
  endQuizFailure: null,
};

const reducerFn = (state = INIT_INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.GENERATE_QUIZ_SUCCESS:
      return Object.assign({}, state, { quizGeneratedId: action.payload });
    case actionType.GENERATE_QUIZ_FAILURE:
      return Object.assign({}, state, { quizGenerateFailure: action.payload });
    case actionType.GET_QUIZ_QUESTIONS_SUCCESS:
      return Object.assign({}, state, { quizQuestions: action.payload });
    case actionType.GET_QUIZ_QUESTIONS_FAILURE:
      return Object.assign({}, state, { fetchQuizQuesFailure: action.payload });
    case actionType.PATCH_QUIZ_SOLUTION_SUCCESS:
      return Object.assign({}, state, {
        patchQuizSolutionSuccess: action.payload,
      });
    case actionType.PATCH_QUIZ_SOLUTION_FAILURE:
      return Object.assign({}, state, {
        patchQuizSolutionFailure: action.payload,
      });
    case actionType.GET_QUIZ_RESULTS_SUCCESS:
      return Object.assign({}, state, { quizResults: action.payload });
    case actionType.GET_QUIZ_RESULTS_FAILURE:
      return Object.assign({}, state, { quizResultsFailure: action.payload });
    case actionType.END_QUIZ_SUCCESS:
      return Object.assign({}, state, { endQuizSuccess: action.payload });
    case actionType.END_QUIZ_FAILURE:
      return Object.assign({}, state, { endQuizFailure: action.payload });
    default:
      return state;
  }
};

export default reducerFn;
