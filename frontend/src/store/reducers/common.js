import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  rightDrawer: {
    open: false, 
    wordDetails: {
      id: null,
      word: "", 
      meanings: [],
      status: {}, 
      rootWord: "", 
      partOfSpeech: "", 
      mneumonics: [], 
      sentences: [], 
      funFact: "",
    }
  }
};

const reducerFn = (state= INIT_INITIAL_STATE, action) => {
  switch(action.type) {
    case actionType.SHOW_RIGHT_DRAWER: 
      return Object.assign({}, state, {rightDrawer: action.payload });
  }
};

export default reducerFn;