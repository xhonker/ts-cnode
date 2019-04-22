import Vue from "vue";
import Vuex from "vuex";
import * as topics from "./topics";
import * as user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    request: false
  },
  mutations: {
    request(state, data) {
      state.request = data;
    }
  },
  modules: {
    topics,
    user
  }
});
