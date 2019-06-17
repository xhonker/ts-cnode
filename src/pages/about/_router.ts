export default {
  name: "About",
  path: "/about",
  component: () => import(/* webpackChunkName : "About" */ './index.vue')
}