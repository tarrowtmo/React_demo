import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from '@/config/net.config';
let tokenLose = true;

const { baseURL, successCode, invalidCode, requestTimeout, contentType } = config;

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
});

// request interceptor
instance.interceptors.request.use(
  (configItem: AxiosRequestConfig) => configItem,
  (error: AxiosError) =>
    // error处理
    Promise.reject(error)
);

// response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 请求出错处理
    if (res.code === invalidCode && tokenLose) {
      tokenLose = false;
    }

    if (successCode.indexOf(res.code) === -1) {
      console.error(res.msg);
      return Promise.reject(res);
    }
    return res;
  },
  (error: AxiosError) => {
    console.error('请求出错啦！');
    return Promise.reject(error);
  }
);

export default instance;