export default {
  path: "/details/:topic",
  name: "TopicDetails",
  component: () => import(/** webpackChunkName: "Details" */ '@/page/details/index.vue'),
  props: true
}