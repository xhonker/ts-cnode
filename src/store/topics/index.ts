import {
  State,
  topic,
  topicDetails,
  topicScroll,
  changeCollect
} from "@/store/interface/topics";
import { ActionTree, MutationTree, GetterTree } from "vuex";
import { getTopics, getTopicDetails } from "@/api/topics";
import {
  REQUEST__TOPICS,
  CHANGE__TAB,
  REQUEST__TOPIC__DETAILS,
  SET__TOPICS__SCROLL,
  SET__TOPIC__SCROLL,
  CHANGE__COLLECT,
  CHANGE__TABBAR
} from "@/store/topics/type";

let state: State = {
  topics: [],
  currentTab: "all",
  tabbar: "home",
  topicTabs: [
    { id: "all", value: "全部" },
    { id: "good", value: "精华" },
    { id: "share", value: "分享" },
    { id: "ask", value: "问答" },
    { id: "job", value: "招聘" }
  ],
  tabbars: [
    { id: "home", value: "首页" },
    { id: "edit", value: "发布" },
    { id: "message", value: "消息" },
    { id: "user", value: "我的" }
  ],
  openTopics: [],
  topicsScroll: 0
};
let actions: ActionTree<State, any> = {
  async [REQUEST__TOPICS]({ commit }, data = {}) {
    let { tab = "all", page = 1 } = data;
    let topics = await getTopics(tab, page);
    commit(REQUEST__TOPICS, topics);
  },
  [CHANGE__TAB]({ commit }, tab: string) {
    commit(CHANGE__TAB, tab);
  },
  [CHANGE__TABBAR]({ commit }, tab: string) {
    commit(CHANGE__TABBAR, tab);
  },
  async [REQUEST__TOPIC__DETAILS]({ commit }, data) {
    let topic = await getTopicDetails(data);
    topic = Object.assign({}, topic, { scroll: 0 });
    commit(REQUEST__TOPIC__DETAILS, topic);
  },
  [SET__TOPICS__SCROLL]({ commit }, scroll: number) {
    commit(SET__TOPICS__SCROLL, scroll);
  },
  [SET__TOPIC__SCROLL]({ commit }, data: topicScroll) {
    commit(SET__TOPIC__SCROLL, data);
  },
  [CHANGE__COLLECT]({ commit }, data: changeCollect) {
    commit(CHANGE__COLLECT, data);
  }
};
let mutations: MutationTree<State> = {
  [REQUEST__TOPICS](state, data: topic) {
    state.topics = state.topics.concat(data);
  },
  [CHANGE__TAB](state, data) {
    state.currentTab = data;
    state.topics = [];
    state.topicsScroll = 0;
  },
  [CHANGE__TABBAR](state, tab: string) {
    state.tabbar = tab;
  },
  [REQUEST__TOPIC__DETAILS](state, data: topicDetails) {
    state.openTopics.push(data);
  },
  [SET__TOPICS__SCROLL](state, data: number) {
    state.topicsScroll = data;
  },
  [SET__TOPIC__SCROLL](state, data: topicScroll) {
    state.openTopics.map(d => {
      if (d.id === data.id) {
        d.scroll = data.scroll;
      }
    });
  },
  [CHANGE__COLLECT](state, data: changeCollect) {
    data.result &&
      state.openTopics.map(
        d => d.id === data.topic && (d.is_collect = !d.is_collect)
      );
  }
};
let getters: GetterTree<State, any> = {};

export { state, actions, mutations, getters };
