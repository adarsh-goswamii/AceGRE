import * as actionType from "../actionType/index";

export const handleLogin = (payload) => {
  return {
    type: actionType.LOGIN_USER,
    payload: payload,
  };
};

export const handleRegisterUser = (payload) => {
  return {
    type: actionType.REGISTER_USER,
    payload: payload,
  };
};

export const handleLogout = (payload) => {
  return {
    type: actionType.LOGOUT_USER,
    payload: payload,
  };
};
