import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { refreshToken } from "./auth";

const baseUrl = "http://localhost:5000";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 500000,
  params: {},
});

instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      const accessTokenExpired = checkExpiration(token);
      // console.log("expired", accessTokenExpired);

      if(accessTokenExpired) {
        if(checkExpiration(Cookies.get("refresh_token"))) {
          // console.log("refresh token is also expired");
          // TODO: somehow logout user.
        } else {
          console.log("refresh token is not expired");
          localStorage.removeItem("token");
          await refreshToken({refresh_token: Cookies.get("refresh_token")});
          token = localStorage.getItem("token");

          if(!checkExpiration(token)) {
            console.log("token good to go");
          } else {
            console.log("Something went wrong", token);
          }
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const api = {
  get(endUrl, config, apiUrl) {
    // if we need to call someother api apart from the acegre one: apiurl
    let url = apiUrl ? apiUrl : `${endUrl}`;
    return instance.get(url, config);
  },
  postData(endUrl, data, config, apiUrl) {
    let url = apiUrl ? apiUrl : `${endUrl}`;
    return instance.post(url, data, config);
  },
  putData(endUrl, data, config, apiUrl) {
    let url = apiUrl ? apiUrl : `${endUrl}`;
    return instance.put(url, data, config);
  },
  patchData(endUrl, data, config, apiUrl) {
    let url = apiUrl ? apiUrl : `${endUrl}`;
    return instance.patch(url, data, config);
  },
  deleteData(endUrl, data, config, apiUrl) {
    let url = apiUrl ? apiUrl : `${endUrl}`;
    return instance.delete(url, data, config);
  },
};

export default api;

// helper functions 

function checkExpiration(token) {
  try {
    const {exp} = jwt(token);
    if (Date.now() >= exp * 1000) {
      return true;
    }
  } catch (err) {
    return true;
  }
  return false;
}