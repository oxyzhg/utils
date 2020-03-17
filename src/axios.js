import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

/**
 * @description 默认 request 拦截器
 * @param {object} config
 */
function defaultReqResolveInterceptor(config) {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify(config.data);
  }

  return config;
}

/**
 * @description 默认 response 成功拦截器
 * @param {object} response
 */
function defaultResResolveInterceptor(response) {
  const data = response.data;
  const errCode = data.errCode;

  if (errCode === 0) {
    return data;
  } else {
    notification.error({
      message: 'Error',
      description: data.errMsg
    });
  }

  throw data;
}

/**
 * @description 默认 response 失败拦截器
 * @param {object} error
 * @returns
 */
function defaultResRejectInterceptor(error) {
  if (error) {
    return Promise.reject(error);
  }
}

class Http {
  constructor(baseURL, resInterceptor = defaultResResolveInterceptor, reqInterceptor = defaultReqResolveInterceptor) {
    this.baseURL = baseURL;
    this.resInterceptor = resInterceptor;
    this.reqInterceptor = reqInterceptor;

    // 初始化 XMLHttpRequest
    this.xhr = this.init({
      baseURL: 'http://localhost:5000',
      timeout: 5000
    });
  }

  init(config = {}) {
    const instance = axios.create(config);
    const contentType = 'application/x-www-form-urlencoded;charset=UTF-8';

    instance.defaults.headers.post['Content-Type'] = contentType;
    instance.defaults.headers.put['Content-Type'] = contentType;

    // interceptors
    instance.interceptors.request.use(this.reqInterceptor);
    instance.interceptors.response.use(this.resInterceptor, defaultResRejectInterceptor);

    return instance;
  }

  request({ method, url, params, data, headers }) {
    const options = { method, url, params, headers };

    if (data) options.data = data;

    return this.xhr(options);
  }

  get(url, params, headers) {
    return this.request({
      method: 'get',
      url,
      params,
      headers
    });
  }

  post(url, data, params, headers) {
    return this.request({
      method: 'post',
      url,
      data,
      params,
      headers
    });
  }

  put(url, data, params, headers) {
    return this.request({
      method: 'put',
      url,
      data,
      params,
      headers
    });
  }

  delete(url, params, headers) {
    return this.request({
      method: 'delete',
      url,
      params,
      headers
    });
  }
}

export default Http;
