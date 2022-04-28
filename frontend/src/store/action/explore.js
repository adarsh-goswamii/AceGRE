import * as actionType from "../actionType/index";

export const getWordList = (payload) => {
  return {
    type: actionType.GET_WORD_LIST,
    payload: payload
  };
};

export const updateWordStatus = (payload) => {
  return {
    type: actionType.UPDATE_WORD_STATUS_BY_ID,
    payload: payload
  };
};

export const updatePagination = (payload) => {
  return {
    type: actionType.UPDATE_PAGINATION,
    payload: payload
  }
};
