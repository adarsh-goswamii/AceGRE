import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  rightDrawer: {
    open: false,
  },
  modal: {
    open: false,
    children: null,
  },
  loader: false,
};

const reducerFn = (state = INIT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.SHOW_RIGHT_DRAWER:
      return Object.assign({}, state, { rightDrawer: action.payload });
    case actionType.CHANGE_GLOBAL_LOADER_VISIBILITY:
      return Object.assign({}, state, { loader: action.payload });
    case actionType.SHOW_MODAL:
      return Object.assign({}, state, {
        modal: { open: true, children: action.payload },
      });
    case actionType.HIDE_MODAL:
      return Object.assign({}, state, { modal: { open: false } });
    default:
      return state;
  }
};

export default reducerFn;
