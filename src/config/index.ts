import axios from "axios";
import { Error } from "../utils/toastify";

const Axios = axios.create({
  baseURL: "https://dsa-be-u8w5.onrender.com/api/v1/",
  timeout: 5000,
  headers: { 
    "content-type": "application/json"},
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // if (config.headers.Authorization || config)
    return config;
  },
  function (error) {
    // Do something with request error
    if (error.message) {
      Error(error.message);
      console.log(error.message);
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.message) {
      Error(error.message);
      console.log(error.message);
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default Axios;