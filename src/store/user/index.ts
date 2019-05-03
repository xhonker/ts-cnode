import * as user from "@/store/interface/user";
import { getUserInfo, getUserCollect, message, login } from "@/api/user";
import * as type from "./type";
import {
  ActionTree,
  MutationTree,
  GetterTree
} from "vuex";
import { CHANGE__COLLECT } from "@/store/topics/type";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from "@/utils";
import { TopicInfo } from "@/store/interface/topics";

let state: user.UserState = {
  accessToken: getLocalStorage("accessToken"),
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
  async [type.USER__LOGIN]({ commit, dispatch }, accessToken: string) {
    let { success, ...data } = await login(accessToken);
    if (!success) return;
    let userInfo = Object.assign({}, data,
      {
        accessToken: accessToken
      })
    dispatch(type.GET__USER__INFO, data.loginname);
    commit(type.USER__LOGIN, userInfo);
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
    collect.sort(sortToLastReplyAT);
    Object.assign(collect, { loginname });
    commit(type.GET__USER__COLLECT, collect);
  }
};
let mutations: MutationTree<user.UserState> = {
  [type.GET__USER__INFO](state, data: user.UserInfo) {
    data.recent_replies.sort(sortToLastReplyAT);
    data.recent_topics.sort(sortToLastReplyAT);
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
    state.avatar_url = "";
    state.id = "";
    state.loginname = "";
    state.message = [];
    removeLocalStorage("accessToken");
    removeLocalStorage("loginName");
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
};

/**
 * 按最后回复时间排序
 * @param {(TopicInfo | user.RecentInfo)} acc
 * @param {(TopicInfo | user.RecentInfo)} curr
 * @return {number}
 */
const sortToLastReplyAT = (
  acc: TopicInfo | user.RecentInfo,
  curr: TopicInfo | user.RecentInfo
) => +new Date(curr.last_reply_at) - +new Date(acc.last_reply_at);

export { state, actions, mutations, getters };
