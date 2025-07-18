import axios from "axios";

// baseURL: "https://dsa-be-u8w5.onrender.com/api/v1/",
const Axios = axios.create({
  baseURL: "http://localhost:4040/api/v1/",
  timeout: 60000,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
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
      if (
        error.code === "ECONNABORTED" ||
        error.code === "ENOTFOUND" ||
        error.code === "ECONNREFUSED" ||
        error.code === "EACCES" ||
        error.code === "ERR_BAD_REQUEST"
      ) {
        console.log({
          message: error.message,
          ErrorIdentifier: error.name,
          ErrorCode: error.code,
        });

        // Error(error.response.data.message);
      }
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
      if (
        error.code === "ECONNABORTED" ||
        error.code === "ENOTFOUND" ||
        error.code === "ECONNREFUSED" ||
        error.code === "EACCES" ||
        error.code === "ERR_BAD_REQUEST"
      ) {
        // Error(error.response.data.message);
        console.log({
          message: error.message,
          ErrorIdentifier: error.name,
          ErrorCode: error.code,
        });
      }
    }
    // console.log(error);
    return Promise.reject(error);
  }
);

export default Axios;
