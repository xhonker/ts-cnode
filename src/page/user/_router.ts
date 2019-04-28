export default {
  path: "/user/:loginname",
  name: "User",
  component: () => import(/** webpackChunkName: "User" */'@/page/user/index.vue'),
  props: true
}