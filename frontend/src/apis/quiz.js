import * as apiConst from "../constants/api.consts";
import * as api from "./index";

export const generateQuiz = async () => {
  try {
    const results = await api.get(apiConst.GENERATE_QUIZ);
    return results.data;
  } catch (error) {
    throw error;
  }
};

export const fetchQuestions = async (payload) => {
  try {
    const results = await api.get(`${apiConst.GET_PATCH_QUIZ_QUESTIONS}?id=${payload}`);
    return results.data;
  } catch (error) {
    throw error;
  }
};

export const patchSolution = async (payload) => {
  try {
    const results = await api.patchData(`${apiConst.GET_PATCH_QUIZ_QUESTIONS}?id=${payload}`);
    return results.data;
  } catch (error) {
    throw error;
  }
};

