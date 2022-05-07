import * as apiConst from "../constants/api.consts";
import api from "./index";

export const login = async (payload) => {
  try {
    const result = await api.postData(apiConst.AUTH_LOGIN, payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload) => {
  try {
    const result = await api.postData(apiConst.AUTH_REGISTER, payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (payload) => {
  try {
    const result = await api.postData(apiConst.AUTH_LOGOUT, payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (payload) => {
  try {
    const result = await api.postData(apiConst.REFRESH_TOKEN, payload);
    localStorage.setItem("token", result?.data?.token);
  } catch (error) {
    throw error;
  }
};
