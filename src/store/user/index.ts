import {
  user,
  userTab,
  userState,
  ICollect,
  ILogin
} from "@/store/interface/user";
import { getUserInfo, getUserCollect, collect, message } from "@/api/user";
import {
  GET__USER__INFO,
  CHANGE__USER__TAB,
  UPDATE__USER__SCROLL,
  USER__LOGIN,
  USER__LOGOUT,
  GET__MY__MESSAGE
} from "./type";
import {
  ActionTree,
  MutationTree,
  GetterTree
} from "../../../node_modules/vuex";
import { CHANGE__COLLECT } from "@/store/topics/type";
import { setLocalStorage, getLocalStorage } from "@/utils";

let state: userState = {
  accessToken: "", // 89248133-5ea9-4c0d-a50e-ee95b8298f55
  localToken: window.localStorage.getItem("accessToken")!,
  user: [],
  tab: "replies",
  scroll: 0,
  loginname: "",
  avatar_url: "",
  id: "",
  message: []
};
let actions: ActionTree<userState, any> = {
  async [GET__USER__INFO]({ commit }, loginname: string) {
    let user = await getUserInfo(loginname);
    let collect = await getUserCollect(loginname);
    user["collect"] = collect;
    commit(GET__USER__INFO, user);
  },
  [CHANGE__USER__TAB]({ commit }, tab: userTab) {
    commit(CHANGE__USER__TAB, tab);
  },
  [UPDATE__USER__SCROLL]({ commit }, scrollTop: number) {
    commit(UPDATE__USER__SCROLL, scrollTop);
  },
  async [USER__LOGIN]({ commit }, data: ILogin) {
    let messages = await message(data.accessToken);
    data.message = messages;
    commit(USER__LOGIN, data);
  },
  [USER__LOGOUT]({ commit }) {
    commit(USER__LOGOUT);
  },
  async [GET__MY__MESSAGE]({ commit }, accesstoken) {
    let msg = await message(accesstoken);
    commit(GET__MY__MESSAGE, msg);
  }
};
let mutations: MutationTree<userState> = {
  [GET__USER__INFO](state, data: user) {
    state.tab = "replies";
    state.scroll = 0;
    state.user!.push(data);
  },
  [CHANGE__USER__TAB](state, data: userTab) {
    state.tab = data;
  },
  [UPDATE__USER__SCROLL](state, data: number) {
    state.scroll = data;
  },
  [USER__LOGIN](state, data: ILogin) {
    Object.assign(state, data);
    setLocalStorage("accessToken", data.accessToken);
    setLocalStorage("loginName", data.loginname);
  },
  [USER__LOGOUT](state) {
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
    state.user!.length && (state.user![0]["collect"] = topic);
  },
  [GET__MY__MESSAGE](state, data) {
    state.message = data;
  }
};
let getters: GetterTree<userState, any> = {
  ["token"](state) {
    return state.accessToken;
  },
  ["localToken"](state) {
    return state.localToken;
  }
};

export { state, actions, mutations, getters };
