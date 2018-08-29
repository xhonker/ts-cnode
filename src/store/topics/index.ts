import {
  TopicsState,
  TopicInfo,
  TopicDetails,
  TopicScroll,
  ChangeCollect
} from "@/store/interface/topics";
import { ActionTree, MutationTree, GetterTree } from "vuex";
import { getTopics, getTopicDetails } from "@/api/topics";
import * as type from "@/store/topics/type";

let state: TopicsState = {
  currentTab: "all",
  tabbar: "home",
  topics: [],
  openTopics: [],
  topicsScroll: 0
};
let actions: ActionTree<TopicsState, any> = {
  async [type.REQUEST__TOPICS]({ commit }, data = {}) {
    let { tab = "all", page = 1 } = data;
    let topics = await getTopics(tab, page);
    commit(type.REQUEST__TOPICS, topics);
  },
  [type.TOPICS__CHANGE__TAB]({ commit }, tab: string) {
    commit(type.TOPICS__CHANGE__TAB, tab);
  },
  [type.CHANGE__TABBAR]({ commit }, tab: string) {
    commit(type.CHANGE__TABBAR, tab);
  },
  async [type.REQUEST__TOPIC__DETAILS]({ commit }, topic: string) {
    let topicDetails = await getTopicDetails(topic);
    topicDetails = Object.assign({}, topicDetails, { scroll: 0 });
    commit(type.REQUEST__TOPIC__DETAILS, topicDetails);
  },
  [type.SET__TOPICS__SCROLL]({ commit }, scroll: number) {
    commit(type.SET__TOPICS__SCROLL, scroll);
  },
  [type.SET__TOPIC__SCROLL]({ commit }, data: TopicScroll) {
    commit(type.SET__TOPIC__SCROLL, data);
  },
  [type.CHANGE__COLLECT]({ commit }, data: ChangeCollect) {
    commit(type.CHANGE__COLLECT, data);
  }
};
let mutations: MutationTree<TopicsState> = {
  [type.REQUEST__TOPICS](state, data: TopicInfo) {
    state.topics = state.topics.concat(data);
  },
  [type.TOPICS__CHANGE__TAB](state, data) {
    state.currentTab = data;
    state.topics = [];
    state.topicsScroll = 0;
  },
  [type.CHANGE__TABBAR](state, tab: string) {
    state.tabbar = tab;
  },
  [type.REQUEST__TOPIC__DETAILS](state, data: TopicDetails) {
    let isCollect = false;
    state.openTopics.map(
      topic =>
        topic.id === data.id &&
        (isCollect = true) &&
        (topic.replies = data.replies)
    );
    !isCollect ? state.openTopics.push(data) : null;
  },
  [type.SET__TOPICS__SCROLL](state, data: number) {
    state.topicsScroll = data;
  },
  [type.SET__TOPIC__SCROLL](state, data: TopicScroll) {
    state.openTopics.map(d => {
      if (d.id === data.id) {
        d.scroll = data.scroll;
      }
    });
  },
  [type.CHANGE__COLLECT](state, data: ChangeCollect) {
    data.result &&
      state.openTopics.map(
        d => d.id === data.topic && (d.is_collect = !d.is_collect)
      );
  }
};
let getters: GetterTree<TopicsState, any> = {};

export { state, actions, mutations, getters };
