import Vue from "vue";
import Router from "vue-router";
import Main from "@/page/main/index.vue";
import Details from "@/page/details/index.vue";
import User from "@/page/user/index.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Main
    },
    {
      path: "/details/:topic",
      name: "topicDetails",
      component: Details,
      props: true
    },
    {
      path: "/user/:loginname",
      name: "user",
      component: User,
      props: true
    }
  ]
});
