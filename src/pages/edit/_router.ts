export default {
  path: '/publish',
  name: 'Publish',
  component: () => import(/* webpackChunkName : "Publish" */ './index.vue')
}