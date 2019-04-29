export default {
  path: "/user/:loginname",
  name: "User",
  component: () => import(/** webpackChunkName: "User" */'./index.vue'),
  props: true
}