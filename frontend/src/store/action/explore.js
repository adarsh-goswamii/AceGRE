import * as actionType from "../actionType/index";
import { LOGIN_TO_ACCESS_THIS_FEATURE } from "../../constants/toastMessage.const";

export const getWordList = (payload) => {
  return {
    type: actionType.GET_WORD_LIST,
    payload: payload,
  };
};

export const updateWordStatus = (payload) => {
  if (localStorage.getItem("token")) {
    return {
      type: actionType.UPDATE_WORD_STATUS_BY_ID,
      payload: payload,
    };
  } else {
    return {
      type: actionType.SHOW_TOASTER,
      payload: {
        status: "error",
        message: LOGIN_TO_ACCESS_THIS_FEATURE,
      },
    };
  }
};

export const updatePagination = (payload) => {
  return {
    type: actionType.UPDATE_PAGINATION,
    payload: payload,
  };
};
