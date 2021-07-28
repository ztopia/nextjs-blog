/**
 * http配置
 */

import axios from "axios";
import store from "./../store/store";
import noTokenUrl from "./noTokenUrl";
import { getInjectInfo, removeInjectInfo } from "../functions/info";
import { setIsLogin } from "../store/modules/appSlice";
import i18n from "next-i18next";
import { message } from "antd";

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    const apiUrl = config.url;
    let token = "";
    if (noTokenUrl.indexOf(apiUrl) > -1) return config;

    token = getInjectInfo("_authorization");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// http response 拦截器
const filterArr = [0, 1, 2, 3, 1031, 1041, 102190708, 102110705, 102020729];
/**
 * 1,2,3资产用来判断状态
 * 1031 下单用到
 * 1041 撮合未就绪，不显示
 */
axios.interceptors.response.use(
  (response) => {
    const resData = response.data;
    if (resData.hasOwnProperty("code")) {
      const index = filterArr.findIndex((item) => item === resData.code);
      if (index > -1) return response;
      if (resData.code) {
        const msgObj = i18n.t(`ResCode.${resData.code}`);
        message.error(msgObj);
      }
    }
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(setIsLogin(false));
        removeInjectInfo("_authorization");
      }
    }
    return Promise.reject(error.response);
  }
);

export default axios;
