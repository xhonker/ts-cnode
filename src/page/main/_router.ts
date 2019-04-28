
export default {
  name: "Home",
  path: "/",
  component: () => import(/* webpackChunkName : "Home" */ './index.vue')
}