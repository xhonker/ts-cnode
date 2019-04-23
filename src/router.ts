import Vue from "vue";
import Router from "vue-router";
import Main from "@/page/main/index.vue";
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
      component: () => import(/** webpackChunkName: "Details" */ '@/page/details/index.vue'),
      props: true
    },
    {
      path: "/user/:loginname",
      name: "user",
      component: () => import(/** webpackChunkName: "User" */'@/page/user/index.vue'),
      props: true
    },
    {
      path: "/qrcode",
      name: "qrcode",
      component: () => import(/** webpackChunkName: "User" */'@/page/qrcode-login/index.vue'),
    }
  ]
});
