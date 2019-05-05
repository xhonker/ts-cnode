export default {
  path: "/qrcode",
  name: "Qrcode",
  component: () => import(/** webpackChunkName: "Qrcode" */'./index.vue'),
  props: true
}