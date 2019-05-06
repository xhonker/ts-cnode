export default {
  name: "NotFound",
  path: "*",
  component: () => import(/* webpackChunkName : "NotFound" */ './index.vue')
}