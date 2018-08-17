import Axios from "axios";
import { baseURL } from "./config";
import { toast } from "@/components/toast/index";
import Store from "@/store";
let accesstoken = () =>
  window.localStorage.getItem("accessToken") || Store.getters.token;
const axios = Axios.create({
  baseURL,
  timeout: 0,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  maxContentLength: 2000
});

axios.interceptors.request.use(
  config => {
    let createTopics = !!~config.url!.indexOf("topics");
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
    if (createTopics && method === "post") {
      toast.loading("发布中...");
    } else {
      toast.loading(`加载中...`);
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => (toast.hide(), response),
  error => {
    console.log(error);
    let message = error.response.data.error_msg;
    toast.hide();
    toast.show({ message, duration: 5000 });
  }
);

export const get = (url: string, params?: object) => axios.get(url, { params });

export const post = (url: string, params?: object) => axios.post(url, params);
