import Vue from "vue";
import Router from "vue-router";
import TestComponents from "@/components/test-components.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "testComponents",
      component: TestComponents
    }
  ]
});
