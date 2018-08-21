import * as user from "@/store/interface/user";
import { getUserInfo, getUserCollect, message } from "@/api/user";
import * as type from "./type";
import {
  ActionTree,
  MutationTree,
  GetterTree
} from "../../../node_modules/vuex";
import { CHANGE__COLLECT } from "@/store/topics/type";
import { setLocalStorage, getLocalStorage } from "@/utils";

let state: user.UserState = {
  localToken: getLocalStorage("accessToken"),
  accessToken: "",
  users: [],
  tab: "replies",
  scroll: 0,
  loginname: "",
  avatar_url: "",
  id: "",
  message: []
};
let actions: ActionTree<user.UserState, any> = {
  async [type.GET__USER__INFO]({ commit }, loginname: string) {
    let user = await getUserInfo(loginname);
    user["collect"] = [];
    commit(type.GET__USER__INFO, user);
  },
  [type.CHANGE__USER__TAB]({ commit }, tab: user.UserTab) {
    commit(type.CHANGE__USER__TAB, tab);
  },
  [type.UPDATE__USER__SCROLL]({ commit }, scrollTop: number) {
    commit(type.UPDATE__USER__SCROLL, scrollTop);
  },
  async [type.USER__LOGIN]({ commit }, data: user.LoginInfo) {
    let messages = await message(data.accessToken);
    data.message = messages;
    commit(type.USER__LOGIN, data);
  },
  [type.USER__LOGOUT]({ commit }) {
    commit(type.USER__LOGOUT);
  },
  async [type.GET__MY__MESSAGE]({ commit }, accesstoken) {
    let msg = await message(accesstoken);
    commit(type.GET__MY__MESSAGE, msg);
  },
  async [type.GET__USER__COLLECT]({ commit }, loginname: string) {
    let collect = await getUserCollect(loginname);
    Object.assign(collect, { loginname });
    commit(type.GET__USER__COLLECT, collect);
  }
};
let mutations: MutationTree<user.UserState> = {
  [type.GET__USER__INFO](state, data: user.UserInfo) {
    state.tab = "replies";
    state.scroll = 0;
    state.users!.push(data);
  },
  [type.CHANGE__USER__TAB](state, data: user.UserTab) {
    state.tab = data;
  },
  [type.UPDATE__USER__SCROLL](state, data: number) {
    state.scroll = data;
  },
  [type.USER__LOGIN](state, data: user.LoginInfo) {
    Object.assign(state, data);
    setLocalStorage("accessToken", data.accessToken);
    setLocalStorage("loginName", data.loginname);
  },
  [type.USER__LOGOUT](state) {
    state.accessToken = "";
    state.localToken = "";
    state.avatar_url = "";
    state.id = "";
    state.loginname = "";
    state.message = [];
    setLocalStorage("accessToken", "");
    setLocalStorage("loginName", "");
  },
  async [CHANGE__COLLECT](state) {
    let topic = await getUserCollect(
      state.loginname || getLocalStorage("loginName")!
    );
    state.users!.length && (state.users![0]["collect"] = topic);
  },
  [type.GET__MY__MESSAGE](state, data) {
    state.message = data;
  },
  [type.GET__USER__COLLECT](state, data) {
    state.users!.map(
      user => user.loginname === data.loginname && (user.collect = data)
    );
  }
};
let getters: GetterTree<user.UserState, any> = {
  token: state => state.accessToken,
  localToken: state => state.localToken
};

export { state, actions, mutations, getters };
