import Vue from "vue";
import "@/directive";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "normalize.css";
import "../style/index.scss";
import * as path from "./path";
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  provide: {
    path
  }
});
