export default {
  path: "/details/:topic",
  name: "TopicDetails",
  component: () => import(/** webpackChunkName: "Details" */ './index.vue'),
  props: true
}