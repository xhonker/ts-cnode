export default {
  path: "/",
  name: "Home",
  component: () => import(/* webpackChunkName : "Home" */ './index.vue'),
  meta: {
    keepAlive: true
  }
}