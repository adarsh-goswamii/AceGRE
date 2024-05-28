import axios from "axios";
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

export const getUserProfileFromGoogle = async (payload) => {
  try {
    const result = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${payload.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${payload.access_token}`,
          Accept: "application/json",
        },
      }
    );

    return result?.data;
  } catch (error) {
    throw error;
  }
};
