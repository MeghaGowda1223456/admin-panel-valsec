import axios from 'axios';

const baseURL = 'https://testapp.tempx.ca:8443/';

const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    'content-type': 'application/json',
    // "content-type":
    //   "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    // "content-type": "multipart/form-data",
    ...config.headers,
  };
  return config;
});
export { axiosInstance, baseURL };
