export default {
  path: "/message",
  name: "Message",
  component: () => import(/* webpackChunkName : "message" */ './index.vue')
}