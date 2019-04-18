import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import * as path from "./path";

import "@/directive";
import "../style/index.scss";
import "./common/fastclick";
import "normalize.css";

//@ts-ignore
window.FastClick.attach(document.body); // fix click 300ms

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
