export default {
  path: '/login',
  name: "Login",
  component: () => import(/* webpackChunkName : "Login" */ './index.vue'),
  props: true
}