import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  rightDrawer: {
    open: false,
  },
  modal: {
    open: false,
    children: null,
    hideBackdrop: false,
  },
  loader: false,
  toaster: {
    severity: "",
    message: "",
    duration: 4000,
    open: false,
  },
};

const reducerFn = (state = INIT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.SHOW_RIGHT_DRAWER:
      return Object.assign({}, state, { rightDrawer: action.payload });
    case actionType.CHANGE_GLOBAL_LOADER_VISIBILITY:
      return Object.assign({}, state, { loader: action.payload });
    case actionType.SHOW_MODAL:
      return Object.assign({}, state, {
        modal: {
          open: true,
          children: action.payload.children,
          hideBackdrop: action.payload.hideBackdrop,
        },
      });
    case actionType.HIDE_MODAL:
      return Object.assign({}, state, {
        modal: { open: false, hideBackdrop: false },
      });
    case actionType.SHOW_TOASTER:
      return Object.assign({}, state, {
        toaster: {
          severity: action.payload.status,
          message: action.payload.message,
          open: true,
          duration: action.payload.duration,
        },
      });
    case actionType.HIDE_TOASTER:
      return Object.assign({}, state, {
        toaster: {
          severity: "",
          message: "",
          open: false,
          duration: 4000,
        },
      });
    default:
      return state;
  }
};

export default reducerFn;
