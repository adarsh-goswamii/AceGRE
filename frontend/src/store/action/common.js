import * as actions from "../actionType/index";

export const showRightDrawer = (payload) => ({
  type: actions.SHOW_RIGHT_DRAWER, 
  payload: payload,
});

export const showLoader = (payload) => {
  return {
    type: actions.CHANGE_GLOBAL_LOADER_VISIBILITY, 
    payload: payload
  }
}