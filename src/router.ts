import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/home/index.vue";
import Details from "@/page/details/index.vue";
import User from "@/page/user/index.vue";
import Edit from "@/page/edit/index.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
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
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit
    }
  ]
});
