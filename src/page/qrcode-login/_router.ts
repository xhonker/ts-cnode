export default {
  path: "/qrcode",
  name: "qrcode",
  component: () => import(/** webpackChunkName: "User" */'./index.vue'),
}