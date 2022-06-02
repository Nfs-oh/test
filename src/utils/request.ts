import axios from 'axios';
// import { createStore } from 'redux'
// import { getToken } from '@/utils/auth'
import qs from 'qs';
import store from '@/redux';
import { guid } from 'utils';
import bwmodel from '@/config/bwmodel';
import moment from 'moment';
import { changeRefreshToken, refreshToken } from '@/redux/actions';
const state = store.getState();
// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
  responseType: 'json',
  headers: {
    'X-Device-NO': state.user.deviceNo,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});
// store.dispatch(changeRefreshToken())
// request interceptor
service.interceptors.request.use(
  async (config) => {
    config.headers = {
      'X-Tracking-ID': guid(),
      'X-User-ID': state.user.userId,
      'X-Device-NO': state.user.deviceNo,
      'X-System-Type': bwmodel.system === 'iPhone' ? 2 : bwmodel.system === 'Android' ? 1 : 3,
      'X-Device-Type': state.user.deviceType,
      'X-System-Version': state.user.systemVersion,
      'X-App-Version': 'h5'
    };

    let accessToken = store.getState().user.accessToken;
    let exp = store.getState().user.expires;
    if (accessToken) {
      if (moment().isAfter(exp)) {
        if (state.user.refreshStatus) {
          await store.dispatch(changeRefreshToken());
        } else {
          await store.dispatch(refreshToken());
        }
        accessToken = state.user.accessToken;
      }
      config.headers.Authorization = 'encrypt ' + accessToken;
    }
    if (config.method === 'post' && config.baseURL === process.env.REACT_APP_BASE_API) {
      if (Object.prototype.toString.call(config.data) === '[object Object]') {
        if (config.formType !== '1') {
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;';
          config.data = qs.stringify({ ...config.data });
        }
      }
    }
    if (config.baseURL.indexOf('/chaos/api') === 0) {
      config.baseURL = process.env.REACT_APP_BASE_API_CHAOS + config.baseURL;
    } else if (config.baseURL !== process.env.REACT_APP_BASE_API) {
      config.baseURL = (process.env.REACT_APP_BASE_API || '') + config.baseURL;
    }

    if (config.baseUrl) {
      config.baseURL = config.baseUrl;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    return res;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.resultCode !== '00' && res.state != 'SUCCESS') {
    //   if (response.config.responseType != 1) {
    //     Message({
    //       message: res.resultMsg || 'Error',
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //   }

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.resultCode === '200') {
    //     // to re-login
    //     MessageBox.confirm('身份已失效，是否确定重新登录', '提示', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(res)
    // } else {
    //   return res
    // }
  },
  (error) => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error);
  }
);

export default service;
