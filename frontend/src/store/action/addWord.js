import * as actions from "../actionType/index";

export const addWord = (payload) => ({
  type: actions.ADD_WORD,
  payload: payload,
});
