import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  words: [],
  getWordFailure: null,
  statusUpdateFailure: {},
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
    case actionType.UPDATE_WORD_STATUS_BY_ID_SUCCESS:
      let newWords = state.words.map((word) => {
        if(word._id === action.payload.id) {
          return { ...word , status: action.payload.status };
        }
        else return word;
      }) 
      return Object.assign({}, state, { words: newWords });
    case actionType.UPDATE_WORD_STATUS_BY_ID_FAILURE: 
      return Object.assign({}, state, { statusUpdateFailure: action.payload });
      default:
      return state;
  }
};

export default reducerFn;