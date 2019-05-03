import Axios from "axios";
import { baseURL } from "./config";
import { toast } from "@/components/toast/index";
import Store from "@/store";
import { USER__LOGOUT } from '@/store/user/type';
let accesstoken = () => Store.getters.token;

const axios = Axios.create({
  baseURL,
  timeout: 0,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  maxContentLength: 2000
});

axios.interceptors.request.use(
  config => {
    Store.commit('request', true)
    let login = !!~config.url!.indexOf("accesstoken");
    let method = config.method;
    if (method === "get" && !config.params && accesstoken()) {
      config.params = Object.assign({}, config.params, {
        accesstoken: accesstoken()
      });
    }
    if (method === "post" && !login) {
      // 登录需要传token 其他自动
      config.data = Object.assign({}, config.data, {
        accesstoken: accesstoken()
      });
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    Store.commit('request', false);
    return response;
  },
  ({ response }) => {
    Store.commit('request', false);
    if (response.status === 404) {
      toast.show('API 未开放');
      return;
    }
    let message = (response.data && response.data.error_msg) || '';
    Store.commit(USER__LOGOUT);
    toast.show({ message, duration: 5000 });
  }
);

export const get = (url: string, params?: object) => axios.get(url, { params });

export const post = (url: string, params?: object) => axios.post(url, params);
