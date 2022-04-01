import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  rightDrawer: {
    open: false
  }
};

const reducerFn = (state= INIT_INITIAL_STATE, action) => {
  switch(action.type) {
    case actionType.SHOW_RIGHT_DRAWER: 
      return Object.assign({}, state, {rightDrawer: action.payload });
    default:
      return state;
  }
};

export default reducerFn;