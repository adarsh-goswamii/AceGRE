import axios from "axios";

const baseUrl = "http://localhost:5000";

const instance = axios.create({
  baseURL: baseUrl, 
  timeout: 500000, 
  params: {}
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;

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
  deleteData(endUrl, data, config, apiUrl) {
    let url = apiUrl ? apiUrl : `${endUrl}`;
    return instance.delete(url, data, config);
  }
};

export default api;