export default {
  path: "/qrcode",
  name: "qrcode",
  component: () => import(/** webpackChunkName: "Qrcode" */'./index.vue'),
}