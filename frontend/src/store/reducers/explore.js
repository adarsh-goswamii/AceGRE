import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  words: [],
  getWordFailure: null,
  pagination: {
    size: 20,
    page_no: 1,
    total_pages: 10
  }
};

const reducerFn = (state = INIT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.GET_WORD_LIST_SUCCESS:
      return Object.assign({}, state, {
        words: action.payload.data,
        pagination: action.payload.pagination
      });
    case actionType.GET_WORD_LIST_FAILURE:
      return Object.assign({}, state, { getWordFailure: action.payload });
    case actionType.UPDATE_PAGINATION:
      return Object.assign({}, state, { pagination: action.payload });
    default:
      return state;
  }
};

export default reducerFn;