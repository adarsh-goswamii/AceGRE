import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  wordAddedSuccessfully: null
};

const reducerFn = (state = INIT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ADD_WORD_SUCCESSFULL:
      return Object.assign({}, state, {
        wordAddedSuccessfully: action.payload
      });
    default:
      return state;
  }
};

export default reducerFn;