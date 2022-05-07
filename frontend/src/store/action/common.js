import * as actions from "../actionType/index";

export const showRightDrawer = (payload) => ({
  type: actions.SHOW_RIGHT_DRAWER,
  payload: payload,
});

export const showLoader = (payload) => {
  return {
    type: actions.CHANGE_GLOBAL_LOADER_VISIBILITY,
    payload: payload,
  };
};

export const openModal = (payload) => {
  return {
    type: actions.SHOW_MODAL,
    payload: payload,
  };
};

export const closeModal = (payload) => {
  return {
    type: actions.HIDE_MODAL,
    payload: payload,
  };
};

export const openToaster = (payload) => {
  return {
    type: actions.SHOW_TOASTER,
    payload,
  };
};

export const closeToaster = (payload) => {
  return {
    type: actions.HIDE_TOASTER,
    payload,
  };
};
