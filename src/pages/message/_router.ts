export default {
  path: "/message",
  name: "Message",
  component: () => import(/* webpackChunkName : "Message" */ './index.vue')
}